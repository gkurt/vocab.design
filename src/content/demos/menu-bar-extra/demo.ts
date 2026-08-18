import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const FRAME_W = 476;
const PANEL_W = 212;
/** How long the scripted backup takes, so the item returns to rest on its own. */
const RUN_MS = 2200;

const STATE: Record<string, { label: string; detail: string; progress: number }> = {
  idle: { label: 'Idle', detail: 'Last backup 12 minutes ago', progress: 100 },
  running: { label: 'Backing up', detail: 'Copying 4,182 files to Vault', progress: 38 },
};

/**
 * Menu bar extra specimen: a desktop menu bar with four status items at its right end,
 * one of which belongs to a backup agent and opens that agent's panel underneath its own
 * icon. Clicking Back up now closes the panel and puts the item into its running state,
 * which the item shows in the bar without anything else being open; it settles back to
 * idle on the stage's clock when the run finishes.
 *
 * The subject is the status item, `data-part="item"`: the one icon in the bar that belongs
 * to an application rather than to the system. The bar itself, the system's own items, the
 * window on the desktop behind it and the panel the item opens are all scenery, since the
 * term names the handle in the strip and not the surface it summons.
 *
 * The panel is anchored once on mount from the item's real position, so it hangs out of
 * flow and opening it moves nothing on the desktop under it (SPEC §5). The trigger only
 * ever opens: dismissal is choosing a command, Escape, or a press outside (SPEC §8), which
 * is what makes a pass picked up mid-script land in the same place as one from the start.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: ${FRAME_W}px; height: 268px">
        <div
          class="sp-row"
          data-part="bar"
          style="flex: 0 0 auto; gap: 4px; padding: 3px 8px; border-bottom: 1px solid var(--sp-line); background: var(--sp-surface)"
        >
          <span class="sp-row sp-context sp-grow" style="gap: 10px">
            <span class="sp-heading" style="font-size: 12px">Studio</span>
            <span class="sp-label" style="font-size: 12px">File &nbsp; Edit &nbsp; View</span>
          </span>

          <button
            class="sp-icon-button"
            type="button"
            data-part="item"
            data-subject
            data-state="idle"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-label="Backhaul, idle"
            style="position: relative; width: 24px; height: 22px"
          >
            ${icon('inbox')}
            <span
              data-part="pip"
              aria-hidden="true"
              style="position: absolute; top: 1px; right: 1px; width: 6px; height: 6px; border-radius: 50%;
                     background: var(--sp-accent); opacity: 0; transition: opacity 0.18s"
            ></span>
          </button>
          <span class="sp-row sp-context" style="gap: 4px">
            <button class="sp-icon-button" type="button" data-part="sys-bell" aria-label="Notifications" style="width: 24px; height: 22px">${icon('bell')}</button>
            <button class="sp-icon-button" type="button" data-part="sys-search" aria-label="Search" style="width: 24px; height: 22px">${icon('search')}</button>
            <span class="sp-label" style="font-size: 12px; font-variant-numeric: tabular-nums">82%</span>
            <span class="sp-label" style="font-size: 12px; font-variant-numeric: tabular-nums">Tue 9:41</span>
          </span>
        </div>

        <div class="sp-body sp-context" data-part="desktop" style="display: flex; align-items: center; justify-content: center">
          <div class="sp-surface" style="width: 292px; height: 150px; overflow: hidden">
            <div class="sp-topbar" style="padding: 6px 10px">
              <span class="sp-heading sp-grow" style="font-size: 12px">Notes</span>
            </div>
            <div class="sp-stack" style="padding: 12px; gap: 9px">
              <span class="sp-line" style="width: 84%"></span>
              <span class="sp-line" style="width: 96%"></span>
              <span class="sp-line" style="width: 62%"></span>
              <span class="sp-line" style="width: 90%"></span>
              <span class="sp-line" style="width: 44%"></span>
            </div>
          </div>
        </div>

        <div class="sp-popover sp-context" data-part="panel" role="dialog" aria-label="Backhaul" style="width: ${PANEL_W}px; padding: 10px">
          <div class="sp-row sp-row--between">
            <span class="sp-heading" style="font-size: 13px">Backhaul</span>
            <span class="sp-chip" data-part="badge" style="cursor: default; padding: 2px 8px">Idle</span>
          </div>
          <div class="sp-text" data-part="detail" style="margin-top: 6px; font-size: 12px">${STATE.idle?.detail}</div>
          <div class="sp-progress" data-part="meter" style="margin-top: 8px; --sp-value: 100%">
            <div class="sp-progress-fill"></div>
          </div>
          <div class="sp-divider" style="margin: 10px 0"></div>
          <div class="sp-row" style="gap: 6px">
            <button class="sp-button sp-button--sm sp-grow" type="button" data-part="run">Back up now</button>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="open">Open</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const bar = part(root, 'bar');
  const item = part(root, 'item');
  const pip = part(root, 'pip');
  const panel = part(root, 'panel');
  const badge = part(root, 'badge');
  const detail = part(root, 'detail');
  const meter = part(root, 'meter');

  // Anchored once from the item's real geometry, before anything is written: the panel is
  // out of flow, so this is the only measurement it needs.
  const centre = item.offsetLeft + item.offsetWidth / 2;
  const left = Math.min(Math.max(centre - PANEL_W / 2, 8), FRAME_W - PANEL_W - 10);
  panel.style.top = `${bar.offsetTop + bar.offsetHeight + 6}px`;
  panel.style.left = `${left}px`;
  panel.style.setProperty('--sp-arrow-x', `${(centre - left - 4).toFixed(1)}px`);

  const setOpen = (open: boolean) => {
    flag(panel, 'data-open', open);
    flag(item, 'data-open', open);
    item.setAttribute('aria-expanded', String(open));
  };

  const setState = (name: string) => {
    const next = STATE[name];
    if (!next) return;
    item.dataset.state = name;
    item.setAttribute('aria-label', `Backhaul, ${next.label.toLowerCase()}`);
    pip.style.opacity = name === 'running' ? '1' : '0';
    badge.textContent = next.label;
    detail.textContent = next.detail;
    meter.style.setProperty('--sp-value', `${next.progress}%`);
  };

  // The trigger only ever opens, so a pass resumed at any point cannot close it (SPEC §8).
  item.addEventListener('click', () => setOpen(true));

  part(root, 'run').addEventListener('click', () => {
    setOpen(false);
    setState('running');
    clock.setTimeout(() => setState('idle'), RUN_MS);
  });

  part(root, 'open').addEventListener('click', () => setOpen(false));

  root.addEventListener('keydown', (event) => {
    if ((event as KeyboardEvent).key === 'Escape') setOpen(false);
  });

  part(root, 'desktop').addEventListener('pointerdown', () => setOpen(false));

  setState('idle');
  setOpen(false);
}
