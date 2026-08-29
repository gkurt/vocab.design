import { flag, part } from '#src/kit/parts.ts';

/** The band's height, fixed for every app so a focus move can never resize it. */
const BAND = 116;

/**
 * Three apps on the home row, in the two styles the surface offers: a banner is a poster and
 * nothing else, sectioned content is items a viewer can move the highlight into and open.
 */
const APPS = [
  {
    key: 'ridgeline',
    name: 'Ridgeline',
    style: 'banner',
    art: 'linear-gradient(118deg, #123A4B, #1E6F7C 52%, #E4B15C)',
    accent: '#F0C273',
    line: 'Season three, all eight episodes',
    items: [],
  },
  {
    key: 'kitchen',
    name: 'Kitchen Table',
    style: 'sections',
    art: 'linear-gradient(118deg, #2A1526, #5C2340 60%, #8E4A3C)',
    accent: '#EE9B7A',
    line: 'Continue cooking',
    items: ['Braised short rib', 'Sourdough, day four', 'Winter greens'],
  },
  {
    key: 'nocturne',
    name: 'Nocturne Radio',
    style: 'banner',
    art: 'linear-gradient(118deg, #191A3C, #3B2F72 55%, #6E7BD4)',
    accent: '#AEB7F5',
    line: 'Tonight: the small hours mix',
    items: [],
  },
] as const;

/**
 * Top shelf specimen: a television home screen whose top band belongs to whichever app the
 * remote is on. Arrow keys move the highlight along the row of three apps and the band changes
 * to match, which is the whole claim of the term: an app is seen before anyone opens it.
 *
 * The two styles are both here, so the change is not only a change of artwork. Two apps fill the
 * band with an inset banner, a poster and nothing else; the middle one fills it with sectioned
 * content, rows of items a viewer could move up into and open directly.
 *
 * The subject is the BAND, the narrowest element the term names (SPEC §5). It is one placement
 * rather than the screen it sits on, so the icon row, the clock line and the caption are scenery
 * in the context register. Every app fills the band honestly, so the subject never stops being
 * the term and no `data-pose` is needed: identify can land at any resting state (SPEC §6, §7).
 *
 * The screen carries `tabindex="0"` and refuses the default of the two keys it claims, so a
 * reader's own arrow keys drive it exactly as the script's do without also scrolling the page
 * (SPEC §8). Attract never moves real focus, so the demo tracks the highlighted app itself rather
 * than reading `document.activeElement`.
 *
 * Nothing moves when the band changes: it is a fixed height at every app, both styles are built
 * once and swapped by the `hidden` attribute, and the tile row is laid out independently of it
 * (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const banner = (app: (typeof APPS)[number]) => `
    <div data-part="banner-${app.key}" ${app.style === 'banner' ? '' : 'hidden'}
         style="display: flex; flex-direction: column; justify-content: flex-end; height: 100%;
                padding: 14px 18px; gap: 3px">
      <span data-part="banner-title-${app.key}"
            style="font-size: 21px; font-weight: 700; color: #FFFFFF; letter-spacing: -0.01em">${app.name}</span>
      <span style="font-size: 12px; color: rgb(255 255 255 / 0.82)">${app.line}</span>
    </div>`;

  const sections = (app: (typeof APPS)[number]) => `
    <div data-part="sections-${app.key}" ${app.style === 'sections' ? '' : 'hidden'}
         style="display: flex; flex-direction: column; height: 100%; padding: 11px 16px 13px; gap: 7px">
      <span style="font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase;
                   color: rgb(255 255 255 / 0.72)">${app.line}</span>
      <div class="sp-row" style="gap: 10px; align-items: stretch">
        ${app.items
          .map(
            (item, i) => `
          <div data-part="item-${i}"
               style="flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; justify-content: flex-end;
                      height: 64px; padding: 7px 9px; border-radius: 5px; background: rgb(255 255 255 / 0.14);
                      box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.2)">
            <span style="font-size: 10.5px; font-weight: 500; color: #FFFFFF; overflow: hidden;
                         text-overflow: ellipsis; white-space: nowrap">${item}</span>
          </div>`,
          )
          .join('')}
      </div>
    </div>`;

  const tile = (app: (typeof APPS)[number], i: number) => `
    <div class="sp-row" data-part="tile-${i}" ${i === 0 ? 'data-focused' : ''}
         style="flex: 0 0 auto; width: 104px; height: 62px; padding: 0 10px; border-radius: 8px;
                background: ${app.art}; outline: 3px solid transparent; outline-offset: 3px;
                transition: outline-color 0.16s var(--sp-ease)">
      <span style="font-size: 11px; font-weight: 600; color: #FFFFFF; line-height: 1.2">${app.name}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app" style="gap: 8px">
      <div class="sp-frame sp-frame--wide" data-part="screen" tabindex="0" role="application"
           aria-label="Television home screen"
           style="height: 250px; background: #0B0D12; border-color: #262B36; padding: 13px 0 0">
        <div data-part="shelf" data-subject data-app="${APPS[0].key}"
             style="flex: 0 0 auto; height: ${BAND}px; margin: 0 13px; border-radius: 8px;
                    background: ${APPS[0].art}; overflow: hidden;
                    box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.16)">
          ${APPS.map((app) => (app.style === 'banner' ? banner(app) : sections(app))).join('')}
        </div>

        <div class="sp-context" style="flex: 1 1 auto; min-height: 0; padding: 0 13px">
          <div class="sp-row sp-row--between" style="height: 26px">
            <span data-part="row-label" style="font-size: 10px; letter-spacing: 0.07em; text-transform: uppercase;
                                               color: rgb(232 234 239 / 0.5)">Apps</span>
            <span style="font-size: 10px; color: rgb(232 234 239 / 0.5)">9:41</span>
          </div>
          <div class="sp-row" data-part="tiles" style="gap: 14px">
            ${APPS.map(tile).join('')}
          </div>
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption"
         style="max-width: 458px; margin: 0; text-align: center; font-size: 10px">
        The remote moves along the row and the band follows: a poster for two of these apps, and rows you can
        open directly for the third.
      </p>
    </div>
  `;

  const shelf = part(root, 'shelf');
  const tiles = APPS.map((_, i) => part(root, `tile-${i}`));
  let index = 0;

  const paint = (): void => {
    const app = APPS[index];
    if (!app) return;
    shelf.dataset.app = app.key;
    shelf.style.background = app.art;
    shelf.style.boxShadow = `inset 0 0 0 1px ${app.accent}59`;
    for (const other of APPS) {
      const fill = root.querySelector<HTMLElement>(`[data-part=${other.style === 'banner' ? 'banner' : 'sections'}-${other.key}]`);
      if (fill) fill.hidden = other.key !== app.key;
    }
    for (const [i, el] of tiles.entries()) {
      el.style.outlineColor = i === index ? app.accent : 'transparent';
      flag(el, 'data-focused', i === index);
    }
  };

  const MOVES: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };

  // Only the two keys the remote's row actually uses are claimed, and both have their default
  // refused: an arrow that drove the demo and scrolled the page at once would be half a control.
  part(root, 'screen').addEventListener('keydown', (event) => {
    const move = MOVES[event.key];
    if (move === undefined) return;
    event.preventDefault();
    index = Math.min(Math.max(index + move, 0), APPS.length - 1);
    paint();
  });

  paint();
}
