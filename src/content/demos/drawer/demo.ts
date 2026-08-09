import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

/**
 * Drawer specimen: a panel docked to the edge of the scene, sliding in over it
 * and keeping its own scroll. The edge is the whole point, so the specimen shows
 * the panel arriving from one and leaving the same way.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Orders</span>
        </div>
        <div class="sp-body sp-context">
          <div class="sp-stack">
            <div class="sp-surface sp-row" style="padding: 10px">
              <span class="sp-grow sp-text sp-text--ink">#4417 · Ravensbourne</span>
              <button class="sp-button sp-button--ghost sp-button--sm" data-part="open">Details</button>
            </div>
            <div class="sp-surface sp-row" style="padding: 10px">
              <span class="sp-grow sp-text sp-text--ink">#4416 · Northwind</span>
              <span class="sp-text">Shipped</span>
            </div>
          </div>
        </div>
        <div class="sp-scrim" data-part="scrim"></div>
        <aside class="sp-drawer sp-drawer--right" data-part="drawer" data-subject aria-label="Order details">
          <div class="sp-row">
            <span class="sp-heading sp-grow">Order #4417</span>
            <button class="sp-icon-button" data-part="close" aria-label="Close">${icon('close')}</button>
          </div>
          <div class="sp-stack">
            <span class="sp-label">Customer</span>
            <span class="sp-text sp-text--ink">Ravensbourne Ltd</span>
            <span class="sp-label">Status</span>
            <span class="sp-text sp-text--ink">Packing</span>
          </div>
          <button class="sp-button sp-button--sm" style="margin-top: auto">Print label</button>
        </aside>
      </div>
    </div>
  `;

  const drawer = part(root, 'drawer');
  const scrim = part(root, 'scrim');
  const setOpen = (open: boolean) => {
    flag(drawer, 'data-open', open);
    flag(scrim, 'data-open', open);
  };

  part(root, 'open').addEventListener('click', () => setOpen(true));
  part(root, 'close').addEventListener('click', () => setOpen(false));
  scrim.addEventListener('click', () => setOpen(false));
  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
}
