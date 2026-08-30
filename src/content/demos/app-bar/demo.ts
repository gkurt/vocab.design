import { icon } from '#src/kit/icons.ts';

const ROWS = [
  ['Kestrel', 'berth 12'],
  ['Merlin', 'berth 14'],
  ['Kittiwake', 'berth 3'],
  ['Guillemot', 'berth 7'],
  ['Fulmar', 'berth 9'],
  ['Shearwater', 'berth 1'],
  ['Gannet', 'berth 6'],
  ['Petrel', 'berth 11'],
];

/**
 * App bar specimen: the bar that belongs to the application rather than to the screen.
 * The subject is the bar itself, since the term names that band and nothing under it,
 * and it carries what an app bar carries: identity, the navigation affordance, and two
 * actions that mean the same thing on every screen.
 *
 * The claim is that it stays. The content scrolls in its own scroller, out of the
 * bar's flow, so nothing about the bar changes height or position while it does
 * (SPEC §5).
 *
 * A caption under the frame used to narrate the scroll ("The list is at the top.", then
 * "The list has travelled under a bar that has not moved a pixel."). It was the site
 * describing the demonstration from inside it; the bar standing still while the list moves
 * is the whole claim and needs no sentence, so it is gone along with the scroll listener
 * that swapped it.
 */
export function mount(root: HTMLElement): void {
  const rows = ROWS.map(
    ([name, berth]) => `
      <div class="sp-list-item" style="padding: 7px 10px">
        <span class="sp-grow">${name}</span>
        <span class="sp-label">${berth}</span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 460px; height: 226px">
        <div class="sp-topbar" data-part="bar" data-subject role="banner" style="gap: 8px">
          <button class="sp-icon-button" data-part="nav" aria-label="Open navigation">${icon('menu')}</button>
          <span class="sp-heading sp-grow" style="font-size: 15px">Harbour</span>
          <button class="sp-icon-button" data-part="search" aria-label="Search">${icon('search')}</button>
          <span class="sp-avatar" style="width: 26px; height: 26px; font-size: 11px">RK</span>
        </div>
        <div class="sp-body sp-scroll sp-context" data-part="scroller" style="padding: 10px 12px">
          <div class="sp-heading" style="font-size: 13px; margin-bottom: 8px">Fleet</div>
          <div class="sp-list">${rows}</div>
        </div>
      </div>
    </div>
  `;
}
