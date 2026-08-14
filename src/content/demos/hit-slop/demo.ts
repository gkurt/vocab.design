import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const CARD = { w: 320, h: 132 };
/** The artwork, the slop around it, and the region the two add up to. */
const ART = 18;
const SLOP = 13;
const TARGET = ART + SLOP * 2;

const ADD = { x: 284, y: 14 };
const MORE = { x: 238, y: 14 };
const CENTRE = { x: ADD.x + ART / 2, y: ADD.y + ART / 2 };

const slop = (name: string) => `
  <span
    data-part="${name}"
    style="position: absolute; left: ${-SLOP}px; top: ${-SLOP}px; right: ${-SLOP}px; bottom: ${-SLOP}px; border-radius: 8px; border: 1px dashed transparent"
  ></span>`;

/** An aiming mark, drawn as a ring so it never covers the artwork it is aimed at. */
const dot = (name: string, x: number, y: number) => `
  <span
    data-part="${name}"
    style="position: absolute; left: ${x - 7}px; top: ${y - 7}px; width: 14px; height: 14px; border-radius: 50%; border: 1px dashed var(--sp-ink); pointer-events: none"
  ></span>`;

/** A point the browser resolves against the tree that owns it, shadow root or document. */
type Picker = { elementFromPoint(x: number, y: number): Element | null };

/**
 * Hit slop specimen: an 18 px add button on a photo card whose activatable region is 44 px,
 * with three fixed taps that land on the artwork, in the invisible extension, and just past
 * it. A labelled inspection state draws the region that is otherwise only a fact about
 * events.
 *
 * The subject is the add button, since the term names a property of one control: the box
 * that answers is its, not the card's. The card, the more button beside it, the aiming dots
 * and the inspection control are the scene around it and carry the context register.
 *
 * The verdict is the platform's, not the demo's. The click handler sits on the card and asks
 * `elementFromPoint` who is really on top at the coordinates the event carried, which is the
 * same walk the browser does to choose a target, and it keeps the specimen honest under
 * attract, where an event dispatched straight onto a dot would otherwise report whatever the
 * script aimed at. The extension itself is an absolutely positioned child pinned with
 * negative insets, so the region grows without the layout box growing with it.
 *
 * The two buttons are spaced 46 px between centres, two more than the region is wide, which
 * is the one rule slop has: extended regions that overlap trade taps invisibly. Inspecting
 * draws borders on boxes that were already there, so nothing moves when the state changes
 * (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Album</span>
          <span class="sp-text" data-part="readout" style="width: 262px; text-align: right; white-space: nowrap">Tap one of the three dots</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 12px">
          <div
            class="sp-surface"
            data-part="card"
            data-mode="drawn"
            style="position: relative; width: ${CARD.w}px; height: ${CARD.h}px; padding: 14px"
          >
            <div class="sp-context">
              <span class="sp-heading" style="font-size: 13px">Harbour at dusk</span>
              <div class="sp-stack" style="margin-top: 10px; gap: 8px; width: 200px">
                <div class="sp-line" style="width: 88%"></div>
                <div class="sp-line" style="width: 62%"></div>
              </div>
            </div>

            <button
              class="sp-icon-button sp-context"
              type="button"
              data-part="more"
              aria-label="More actions"
              style="position: absolute; left: ${MORE.x}px; top: ${MORE.y}px; width: ${ART}px; height: ${ART}px; border-radius: 4px"
            >
              ${slop('slop-more')}
              <span style="position: relative; z-index: 1; display: flex">${icon('meatball', 'sp-icon--dots')}</span>
            </button>

            <button
              class="sp-icon-button"
              type="button"
              data-part="add"
              data-subject
              data-hit="none"
              aria-label="Add to album"
              style="position: absolute; left: ${ADD.x}px; top: ${ADD.y}px; width: ${ART}px; height: ${ART}px; border-radius: 4px"
            >
              ${slop('slop-add')}
              <span data-part="glyph" style="position: relative; z-index: 1; display: flex">${icon('plus')}</span>
            </button>

            <span class="sp-context" style="position: absolute; inset: 0; pointer-events: none">
              ${dot('dot-art', CENTRE.x, CENTRE.y)}
              ${dot('dot-slop', CENTRE.x - 15, CENTRE.y + 13)}
              ${dot('dot-miss', CENTRE.x, CENTRE.y + 38)}
            </span>
          </div>

          <span class="sp-label sp-context">Three taps, top to bottom: on the glyph, in the slop, past it.</span>

          <div class="sp-row sp-context" style="gap: 10px">
            <span class="sp-label">Show</span>
            <sp-segmented class="sp-segmented" data-part="mode" data-value="drawn">
              <button class="sp-segment" type="button" data-part="mode-drawn" value="drawn" style="padding: 5px 10px">the ${ART} px drawn</button>
              <button class="sp-segment" type="button" data-part="mode-area" value="area" style="padding: 5px 10px">the ${TARGET} px that answer</button>
            </sp-segmented>
          </div>

          <span class="sp-label sp-context">Neighbours are spaced so the two ${TARGET} px regions never overlap.</span>
        </div>
      </div>
    </div>
  `;

  const card = part(root, 'card');
  const add = part(root, 'add');
  const glyph = part(root, 'glyph');
  const readout = part(root, 'readout');
  const mode = part(root, 'mode') as HTMLElement & { value: string };

  const scope = card.getRootNode() as unknown as Partial<Picker>;
  const pick = (x: number, y: number) => (scope.elementFromPoint ? scope.elementFromPoint(x, y) : document.elementFromPoint(x, y));

  const say = (hit: string, text: string) => {
    add.dataset.hit = hit;
    readout.textContent = text;
  };

  card.addEventListener('click', (event) => {
    const box = add.getBoundingClientRect();
    // How far past the artwork the tap landed, on whichever axis it left it by.
    const past = (value: number, from: number) => Math.max(0, Math.abs(value - from) - ART / 2);
    const out = Math.round(Math.max(past(event.clientX, box.left + box.width / 2), past(event.clientY, box.top + box.height / 2)));
    const found = pick(event.clientX, event.clientY);
    if (!found || !add.contains(found)) return say('none', `${out} px out: past the region`);
    add.setAttribute('data-added', '');
    glyph.innerHTML = icon('check');
    if (out === 0) return say('artwork', 'On the glyph: added to the album');
    say('slop', `${out} px outside the glyph: added anyway`);
  });

  mode.addEventListener('change', () => {
    const drawn = mode.value !== 'area';
    card.dataset.mode = drawn ? 'drawn' : 'area';
    for (const name of ['slop-add', 'slop-more']) {
      const region = part(root, name);
      region.style.borderColor = drawn ? 'transparent' : 'var(--sp-accent)';
      region.style.background = drawn ? '' : 'var(--sp-accent-soft)';
    }
  });
}
