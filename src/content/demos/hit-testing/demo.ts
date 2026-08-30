import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const STACK = { w: 300, h: 148 };
/** The one spot both runs aim at, so the only thing that changes between them is the rule. */
const AIM = { x: 132, y: 62 };

const ANSWERS: Record<string, string> = {
  card: 'The card answered',
  image: 'The photo answered',
  overlay: 'The gradient overlay answered',
  badge: 'The badge answered',
};

/** A point the browser resolves against the tree that owns it, shadow root or document. */
type Picker = { elementFromPoint(x: number, y: number): Element | null };

/**
 * Hit testing specimen: a photo card with a decorative gradient laid over it and a badge
 * laid over that, where clicking one fixed spot reports which of the three actually
 * answered. The subject is the layered stack: the term names the contest between
 * overlapping boxes rather than any one of them, and the stack is the narrowest element
 * that holds the whole contest. The rule control is instrumentation and the stage draws it. The spot both runs aim at is an unpainted anchor, so the ghost
 * cursor is the only pointer artifact on stage (SPEC §5).
 *
 * The answer is the platform's own, not the demo's: the click handler sits on the stack and
 * asks `elementFromPoint` who is on top at the coordinates the event carried, which is the
 * same walk the browser did to pick the target. That also keeps the specimen honest under
 * attract, where events are dispatched onto an element directly and would otherwise report
 * whatever the script aimed at rather than whatever was really in the way. The aim anchor
 * is itself taken out of the hit test with `pointer-events: none`, which is the very rule
 * the second state applies to the overlay.
 *
 * Nothing moves between the two states: the overlay keeps its paint and only stops
 * answering, and every readout holds its width (SPEC §5).
 *
 * A legend under the card used to read "badge over overlay over photo", which is the site
 * describing its own stack, and the readout opened by telling the reader to "click the card".
 * The legend is gone, the frame shortened to suit, and the readout rests on an empty state:
 * what answered is the only thing it has ever been able to say honestly.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 214px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Gallery</span>
          <span class="sp-text" data-part="readout" data-hit="none" style="width: 214px; text-align: right; white-space: nowrap">Nothing clicked yet</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 12px">
          <div
            class="sp-surface"
            data-part="stack"
            data-subject
            data-layer="card"
            data-rule="auto"
            style="position: relative; width: ${STACK.w}px; height: ${STACK.h}px; overflow: hidden"
          >
            <span
              data-part="image"
              data-layer="image"
              style="position: absolute; inset: 0; background: linear-gradient(150deg, #24303d, #4a7290 58%, #8fb8c9)"
            ></span>
            <span
              data-part="overlay"
              data-layer="overlay"
              style="position: absolute; inset: 0; background: linear-gradient(180deg, rgb(16 24 40 / 0) 44%, rgb(16 24 40 / 0.62))"
            >
              <span style="position: absolute; left: 12px; bottom: 10px; color: #ffffff; font-size: 12px; font-weight: 500">Harbour at dusk</span>
            </span>
            <span class="sp-chip" data-part="badge" data-layer="badge" style="position: absolute; right: 10px; top: 10px; cursor: default">RAW</span>
            <span
              data-part="aim-photo"
              style="position: absolute; left: ${AIM.x - 9}px; top: ${AIM.y - 9}px; width: 18px; height: 18px; pointer-events: none"
            ></span>
          </div>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Overlay" data-part="mode" data-value="auto">
            <button class="sp-segment" data-part="mode-auto" value="auto" style="padding: 5px 10px">pointer-events: auto</button>
            <button class="sp-segment" data-part="mode-none" value="none" style="padding: 5px 10px">none</button>
          </sp-segmented>
        </div>
      </div>
    </div>
  `;

  const stack = part(root, 'stack');
  const overlay = part(root, 'overlay');
  const readout = part(root, 'readout');
  const mode = part(root, 'mode') as HTMLElement & { value: string };

  const scope = stack.getRootNode() as unknown as Partial<Picker>;
  const pick = (x: number, y: number) => (scope.elementFromPoint ? scope.elementFromPoint(x, y) : document.elementFromPoint(x, y));

  const say = (hit: string, text: string) => {
    readout.dataset.hit = hit;
    readout.textContent = text;
  };

  stack.addEventListener('click', (event) => {
    const found = pick(event.clientX, event.clientY)?.closest('[data-layer]');
    const layer = found instanceof HTMLElement ? (found.dataset.layer ?? 'card') : 'card';
    say(layer, ANSWERS[layer] ?? ANSWERS.card ?? '');
  });

  mode.addEventListener('change', () => {
    const ignored = mode.value === 'none';
    overlay.style.pointerEvents = ignored ? 'none' : '';
    stack.dataset.rule = ignored ? 'none' : 'auto';
    // Each rule is judged from the same starting point, so the two clicks are comparable.
    say('none', 'Nothing clicked yet');
  });
}
