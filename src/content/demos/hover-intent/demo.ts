import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** Inside Baymard's 300 to 500 ms window: long enough to filter a pass through. */
const DWELL_MS = 450;
/** The same forgiveness on the way out: a one pixel gap must not kill an open menu. */
const CLOSE_GRACE_MS = 140;

const MENUS: Record<string, string[]> = {
  eager: ['Overview', 'Pricing', 'Changelog'],
  gated: ['Guides', 'API reference', 'Community'],
};

/**
 * Hover intent specimen: two triggers with the same menu behind them, one acting
 * on the hover the instant it lands and one holding it for a dwell first. The
 * subject is the gated trigger, since the intent test belongs to the trigger that
 * applies it, not to the panel it eventually opens.
 *
 * Both panels are drawn out of flow, so a menu arriving never moves the bar it
 * hangs from (SPEC §5), and the dwell is measured on the stage's clock so a pose
 * cannot open the menu while the reader is inspecting the closed trigger.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const menu = (key: string) => `
    <div class="sp-menu" data-part="menu-${key}" role="menu" aria-label="${key} menu">
      ${MENUS[key]?.map((label) => `<button class="sp-menu-item" role="menuitem" type="button">${label}</button>`).join('') ?? ''}
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 230px">
        <div class="sp-topbar">
          <span class="sp-heading sp-context">Atlas</span>
          <button class="sp-button sp-button--quiet sp-button--sm sp-context" type="button" data-part="eager" aria-haspopup="menu" aria-expanded="false">
            Products
          </button>
          <button class="sp-button sp-button--quiet sp-button--sm" type="button" data-part="gated" data-subject aria-haspopup="menu" aria-expanded="false">
            Resources
          </button>
        </div>
        <div class="sp-body sp-context" data-part="page">
          <div class="sp-stack">
            <div class="sp-line" style="width: 88%"></div>
            <div class="sp-line" style="width: 70%"></div>
            <div class="sp-line" style="width: 79%"></div>
          </div>
          <div class="sp-row" style="margin-top: 18px">
            <span class="sp-label" data-part="rule">Products opens on contact. Resources waits ${DWELL_MS} ms of held hover.</span>
          </div>
        </div>
        ${menu('eager')}
        ${menu('gated')}
      </div>
    </div>
  `;

  const panels = new Map<string, HTMLElement>();
  /** One open timer and one close timer per trigger: the pointer is only ever on one. */
  const timers = new Map<string, { open?: number; close?: number }>();

  const place = (trigger: HTMLElement, panel: HTMLElement) => {
    panel.style.left = `${trigger.offsetLeft}px`;
    panel.style.top = `${trigger.offsetTop + trigger.offsetHeight + 8}px`;
  };

  const setOpen = (key: string, open: boolean) => {
    const trigger = part(root, key);
    const panel = panels.get(key);
    if (!panel) return;
    if (open) place(trigger, panel);
    if (open) panel.setAttribute('data-open', '');
    else panel.removeAttribute('data-open');
    trigger.setAttribute('aria-expanded', String(open));
  };

  const timersFor = (key: string) => {
    const found = timers.get(key) ?? {};
    timers.set(key, found);
    return found;
  };

  const cancel = (key: string) => {
    const found = timersFor(key);
    clock.clearTimeout(found.open);
    clock.clearTimeout(found.close);
    found.open = undefined;
    found.close = undefined;
  };

  const closeNow = (key: string) => {
    cancel(key);
    setOpen(key, false);
  };

  const closeAll = () => {
    for (const key of Object.keys(MENUS)) closeNow(key);
  };

  for (const key of Object.keys(MENUS)) {
    const panel = part(root, `menu-${key}`);
    panels.set(key, panel);
    const trigger = part(root, key);
    const other = key === 'eager' ? 'gated' : 'eager';

    trigger.addEventListener('pointerenter', () => {
      cancel(key);
      closeNow(other);
      // The whole term is here: one trigger acts on the hover it is handed, the
      // other waits to see whether the pointer meant it.
      if (key === 'eager') {
        setOpen(key, true);
        return;
      }
      timersFor(key).open = clock.setTimeout(() => {
        timersFor(key).open = undefined;
        setOpen(key, true);
      }, DWELL_MS);
    });

    // The close gets a grace of its own, so the gap between a trigger and its panel
    // is not a place the menu can die in.
    trigger.addEventListener('pointerleave', () => {
      cancel(key);
      timersFor(key).close = clock.setTimeout(() => closeNow(key), CLOSE_GRACE_MS);
    });

    panel.addEventListener('pointerenter', () => cancel(key));
    panel.addEventListener('pointerleave', () => closeNow(key));

    // Focus is deliberate by definition, so it never waits out a dwell.
    trigger.addEventListener('focus', () => setOpen(key, true));
    trigger.addEventListener('blur', () => closeNow(key));
  }

  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeAll();
  });
}
