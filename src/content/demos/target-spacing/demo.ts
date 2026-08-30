import { type IconName, icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type State = 'shipped' | 'tested' | 'spaced';

/** The controls are 20 pixels wide, so the gutter alone decides the offset between centres. */
const SIZE = 20;
const GAP: Record<State, number> = { shipped: 0, tested: 0, spaced: 8 };

const TOOLS: { key: string; name: IconName; label: string }[] = [
  { key: 'edit', name: 'pencil', label: 'Edit' },
  { key: 'copy', name: 'copy', label: 'Duplicate' },
  { key: 'star', name: 'star', label: 'Star' },
  { key: 'heart', name: 'heart', label: 'Favourite' },
  { key: 'share', name: 'share', label: 'Share' },
  { key: 'trash', name: 'trash', label: 'Delete' },
];

const VERDICT: Record<State, string> = {
  shipped: 'Not measured yet',
  tested: 'Circles intersect: 2.5.8 fails',
  spaced: 'Circles clear: 2.5.8 passes on spacing',
};

/**
 * Target spacing specimen: a dense icon toolbar drawn three ways, as shipped, with the 24 pixel
 * circle test laid over every target, and respaced until the circles clear each other. A read-out
 * carries the offset between centres and the verdict.
 *
 * The subject is one target, the narrowest element the term names: the criterion is measured
 * target by target, and a ring around the whole toolbar would name a toolbar. The picker, the
 * neighbouring controls, the document lines and the read-out are scenery (SPEC §5), which is
 * also why every circle but the subject's is drawn in the context register.
 *
 * A caption used to sit under the read-out restating the measurement in the site's voice ("A 24
 * pixel circle centred on each target. The circles intersect, so the exception does not apply
 * and the row fails.", and one line like it per state). The verdict beside the offset already
 * carries the pass or fail, a specimen gets one verdict and no more, and the article carries the
 * reasoning, so the caption went rather than moving.
 *
 * A packed target is the counter-example the subject itself passes through, so the honest
 * condition lives in `data-pose` and the mount state satisfies it: identify refuses to ring a
 * target whose circles intersect and plays on (SPEC §6).
 *
 * The circles are drawn out of flow, so revealing them moves nothing, and the gutter is the one
 * measurement the term is about, so it is the only thing a state change is allowed to move
 * (SPEC §5). The header holds its title and all three segment names on one line at their real
 * widths, which is what sets the title's length and the segments' padding. No timer is needed.
 */
export function mount(root: HTMLElement): void {
  const buttons = TOOLS.map(({ key, name, label }, index) => {
    const subject = index === 2;
    return `
      <button class="sp-icon-button${subject ? '' : ' sp-context'}" type="button" data-part="tool-${key}" aria-label="${label}"
              ${subject ? 'data-subject data-pose="[data-pass]"' : ''}
              style="position: relative; width: ${SIZE}px; height: ${SIZE}px; border-radius: 5px">
        ${icon(name)}
        <span data-part="ring-${key}" hidden
              style="position: absolute; left: 50%; top: 50%; width: 24px; height: 24px; margin: -12px 0 0 -12px;
                     border: 2px dashed var(--sp-accent); border-radius: 50%; pointer-events: none"></span>
      </button>`;
  }).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 10px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Circle test</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="picker" data-value="spaced" data-axis="View" data-term="spaced">
            <button class="sp-segment" type="button" data-part="seg-shipped" value="shipped"
                    style="padding: 4px 8px; font-size: 11.5px; white-space: nowrap">As shipped</button>
            <button class="sp-segment" type="button" data-part="seg-tested" value="tested"
                    style="padding: 4px 8px; font-size: 11.5px; white-space: nowrap">Draw the circles</button>
            <button class="sp-segment" type="button" data-part="seg-spaced" value="spaced"
                    style="padding: 4px 8px; font-size: 11.5px; white-space: nowrap">Space them out</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="scene"
             style="margin-top: 8px; height: 100px; padding: 10px 12px; display: flex; flex-direction: column; gap: 12px">
          <div class="sp-row" data-part="bar" data-gap="8"
               style="height: 24px; gap: ${GAP.spaced}px; align-items: center">${buttons}</div>
          <div class="sp-stack sp-context" style="gap: 7px">
            <div class="sp-line" style="width: 88%"></div>
            <div class="sp-line" style="width: 74%"></div>
            <div class="sp-line" style="width: 51%"></div>
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 8px; height: 16px; gap: 10px">
          <span class="sp-label" data-part="offset" data-px="28" style="flex: 0 0 auto; font-size: 10.5px">Offset between centres: 28 px</span>
          <span class="sp-label" data-stage-verdict data-part="verdict" data-state="spaced" style="flex: 0 0 auto; font-size: 10.5px">${VERDICT.spaced}</span>
        </div>
      </div>
    </div>
  `;

  const bar = part(root, 'bar');
  const subject = part(root, 'tool-star');
  const rings = TOOLS.map(({ key }) => part(root, `ring-${key}`));
  const offset = part(root, 'offset');
  const verdict = part(root, 'verdict');

  const apply = (next: State) => {
    const gap = GAP[next];
    const centres = SIZE + gap;
    bar.dataset.gap = String(gap);
    bar.style.gap = `${gap}px`;
    for (const ring of rings) flag(ring, 'hidden', next === 'shipped');
    flag(subject, 'data-pass', next === 'spaced');
    offset.dataset.px = String(centres);
    offset.textContent = `Offset between centres: ${centres} px`;
    verdict.dataset.state = next;
    verdict.textContent = VERDICT[next];
  };

  apply('spaced');

  // The tools do nothing on purpose: the term is about where the targets sit, and a toolbar that
  // acted would invite the reader to read the doing rather than the spacing.
  part(root, 'picker').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as State);
  });
}
