import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

/**
 * Popover specimen: a trigger opens an anchored surface that holds controls of
 * its own. Unlike a modal it leaves the rest of the scene usable, and unlike a
 * tooltip it survives the pointer leaving the trigger.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="overflow: visible">
        <div class="sp-topbar">
          <span class="sp-heading sp-grow sp-context">Invoices</span>
          <button class="sp-button sp-button--ghost sp-button--sm sp-row" data-part="trigger" aria-expanded="false" aria-haspopup="dialog">
            ${icon('filter')} Filter
          </button>
        </div>
        <div class="sp-body sp-context">
          <div class="sp-stack">
            <div class="sp-surface sp-row" style="padding: 10px"><span class="sp-grow sp-text sp-text--ink">Northwind Ltd</span><span class="sp-text">£1,240</span></div>
            <div class="sp-surface sp-row" style="padding: 10px"><span class="sp-grow sp-text sp-text--ink">Ravensbourne</span><span class="sp-text">£880</span></div>
          </div>
        </div>
        <div class="sp-popover" data-part="popover" data-subject role="dialog" aria-label="Filter invoices"
             style="top: 46px; right: 10px; --sp-arrow-x: 148px">
          <span class="sp-label">Status</span>
          <div class="sp-row sp-row--wrap" style="gap: 6px; margin-top: 8px">
            <button class="sp-chip" data-part="chip-paid" data-selected>Paid</button>
            <button class="sp-chip" data-part="chip-due">Due</button>
            <button class="sp-chip" data-part="chip-draft">Draft</button>
          </div>
          <div class="sp-row" style="justify-content: flex-end; margin-top: 12px">
            <button class="sp-button sp-button--sm" data-part="apply">Apply</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const popover = part(root, 'popover');
  const trigger = part(root, 'trigger');
  const setOpen = (open: boolean) => {
    flag(popover, 'data-open', open);
    trigger.setAttribute('aria-expanded', String(open));
  };

  // The trigger opens; it never flips. Dismissal is explicit (Apply, Escape, a click
  // outside), which keeps the gesture idempotent for a demonstration that repeats.
  trigger.addEventListener('click', () => setOpen(true));
  part(root, 'apply').addEventListener('click', () => setOpen(false));
  for (const chip of ['chip-paid', 'chip-due', 'chip-draft']) {
    const el = part(root, chip);
    el.addEventListener('click', () => flag(el, 'data-selected', !el.hasAttribute('data-selected')));
  }
  root.addEventListener('pointerdown', (event) => {
    const target = event.target as Node;
    if (!popover.contains(target) && !trigger.contains(target)) setOpen(false);
  });
  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
}
