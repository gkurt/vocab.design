import { part, partsOf } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Lever = {
  width: number;
  height: number;
  font: number;
  /** Accent fill rather than the quiet outline every other state wears. */
  loud: boolean;
  /** The crowd around the action steps back, leaving its space empty. */
  alone: boolean;
  note: string;
};

/** One lever at a time, so the specimen never argues that weight needs all three. */
const LEVERS: Record<string, Lever> = {
  size: {
    width: 150,
    height: 36,
    font: 14,
    loud: false,
    alone: false,
    note: 'Size alone. The biggest thing in the field is reached first.',
  },
  contrast: {
    width: 104,
    height: 26,
    font: 12,
    loud: true,
    alone: false,
    note: 'Contrast alone. One loud element in a quiet field is found instantly.',
  },
  isolation: {
    width: 104,
    height: 26,
    font: 12,
    loud: false,
    alone: true,
    note: 'Isolation alone. Space around it separates it from the crowd.',
  },
  none: {
    width: 104,
    height: 26,
    font: 12,
    loud: false,
    alone: false,
    note: 'No lever. Everything weighs the same and the eye settles nowhere.',
  },
};

const CTA_BASE = 'display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto; padding: 0; cursor: default';

/**
 * Focal point specimen: one landing page whose action is given weight by a single lever at
 * a time, plus the flat state where no lever is pulled at all.
 *
 * The subject is the action itself, the narrowest element the term names: a focal point is
 * a particular element in a composition, not the composition. Everything else on the page
 * is scenery in the context register (SPEC §5). The flat state is the counter-example the
 * term needs, and there the action is not a focal point at all, so it declares
 * `data-lever` as its pose condition: identify refuses to ring an element that is not
 * winning anything (SPEC §6). Mount is the size lever, which satisfies it.
 *
 * Nothing outside the action moves. The action grows inside a slot of fixed size, and the
 * crowd steps back with `visibility`, which keeps the room it was occupying (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-axis="Lever" data-value="size" style="margin-left: auto">
            <button class="sp-segment" type="button" data-part="seg-size" value="size">size</button>
            <button class="sp-segment" type="button" data-part="seg-contrast" value="contrast">contrast</button>
            <button class="sp-segment" type="button" data-part="seg-isolation" value="isolation">isolation</button>
            <button class="sp-segment" type="button" data-part="seg-none" value="none">none</button>
          </sp-segmented>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px">
          <div
            data-part="page"
            style="display: flex; flex-direction: column; gap: 12px; flex: 0 0 auto; width: 444px; height: 186px; padding: 14px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius); overflow: hidden"
          >
            <div class="sp-row sp-row--between sp-context" style="height: 18px">
              <span class="sp-row" style="gap: 7px">
                <span class="sp-swatch" style="width: 16px; height: 16px; --sp-swatch: var(--sp-line)"></span>
                <span class="sp-heading" style="font-size: 12px">Harbour Rooms</span>
              </span>
              <span class="sp-row" style="gap: 12px">
                <span class="sp-label">Rooms</span>
                <span class="sp-label">Rates</span>
                <span class="sp-label">Visit</span>
              </span>
            </div>
            <div class="sp-row sp-context" style="gap: 14px; height: 76px; align-items: stretch">
              <div class="sp-swatch" style="flex: 0 0 auto; width: 150px; height: 76px; --sp-swatch: var(--sp-sunken)"></div>
              <div class="sp-stack" style="flex: 1 1 auto; min-width: 0; justify-content: center; gap: 11px">
                <div class="sp-line" style="width: 88%"></div>
                <div class="sp-line" style="width: 74%"></div>
                <div class="sp-line" data-part="neighbour" style="width: 58%"></div>
              </div>
            </div>
            <div class="sp-row" style="gap: 12px; height: 36px">
              <div class="sp-row sp-context" style="flex: 1 1 auto; min-width: 0; gap: 16px">
                <span class="sp-label" data-part="neighbour">Compare rooms</span>
                <span class="sp-label" data-part="neighbour">Terms apply</span>
              </div>
              <div data-part="slot" style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 150px; height: 36px">
                <button
                  class="sp-button sp-button--ghost"
                  type="button"
                  data-part="cta"
                  data-subject
                  data-pose="[data-lever]"
                  data-lever="size"
                  style="${CTA_BASE}"
                >Reserve</button>
              </div>
            </div>
          </div>
          <span class="sp-text sp-context" data-part="readout" style="height: 22px; max-width: 440px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;

  const cta = part(root, 'cta');
  const readout = part(root, 'readout');
  const neighbours = partsOf(root, 'neighbour');

  const apply = (key: string) => {
    const lever = LEVERS[key];
    if (!lever) return;
    cta.className = lever.loud ? 'sp-button' : 'sp-button sp-button--ghost';
    cta.style.width = `${lever.width}px`;
    cta.style.height = `${lever.height}px`;
    cta.style.fontSize = `${lever.font}px`;
    if (key === 'none') cta.removeAttribute('data-lever');
    else cta.setAttribute('data-lever', key);
    for (const neighbour of neighbours) neighbour.style.visibility = lever.alone ? 'hidden' : '';
    readout.textContent = lever.note;
  };

  // Each segment names the lever the action is given, so a step lands on that lever
  // rather than flipping whichever one it finds (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('size');
}
