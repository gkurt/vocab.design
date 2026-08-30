import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Box = { left: number; top: number; width: number; height: number };
type Arrangement = { blocks: Record<string, Box>; tilt: number; balanced: boolean; note: string };

/** Absolute boxes inside a 440 x 136 composition whose own box never changes. */
const ARRANGEMENTS: Record<string, Arrangement> = {
  symmetric: {
    blocks: {
      'block-big': { left: 170, top: 22, width: 100, height: 92 },
      'block-one': { left: 56, top: 45, width: 64, height: 46 },
      'block-two': { left: 320, top: 45, width: 64, height: 46 },
    },
    tilt: 0,
    balanced: true,
    note: 'Mirrored across the axis. The easy case: equal weight in equal places.',
  },
  asymmetric: {
    blocks: {
      'block-big': { left: 34, top: 22, width: 140, height: 92 },
      'block-one': { left: 248, top: 26, width: 86, height: 44 },
      'block-two': { left: 248, top: 80, width: 124, height: 34 },
    },
    tilt: 0,
    balanced: true,
    note: 'One large block answered by two small ones, further out. Still level.',
  },
  lopsided: {
    blocks: {
      'block-big': { left: 24, top: 22, width: 140, height: 92 },
      'block-one': { left: 174, top: 22, width: 74, height: 44 },
      'block-two': { left: 174, top: 70, width: 74, height: 44 },
    },
    tilt: -7,
    balanced: false,
    note: 'Everything crowds one side. Nothing answers it, so the beam tips.',
  },
};

const BLOCK =
  'position: absolute; background: var(--sp-accent-soft); border: 1px solid var(--sp-accent); border-radius: 6px; transition: left 0.32s var(--sp-ease), top 0.32s var(--sp-ease), width 0.32s var(--sp-ease), height 0.32s var(--sp-ease)';

/** The mount arrangement is written into the markup, so the first paint is a state
 * rather than a slide from the corner the browser would otherwise start from. */
const at = (box: Box) => `left: ${box.left}px; top: ${box.top}px; width: ${box.width}px; height: ${box.height}px`;

/**
 * Visual balance specimen: the same three blocks arranged three ways over one drawn axis,
 * with a beam under the composition reporting whether the weight actually settles.
 *
 * The subject is the composition, since balance is a property of an arrangement and no
 * single block is the term (SPEC §5). The axis control and the beam are scenery in the
 * context register. The line under the beam reads as the author's verdict on the state
 * the switch produced ("One large block answered by two small ones, further out. Still
 * level."), so it is marked `data-stage-verdict` and the stage draws it in the strip
 * instead of inside the frame (SPEC §5.1). The lopsided state is the counter-example the term
 * needs, and there the composition is not balanced at all, so it declares `data-balanced`
 * as its pose condition: identify refuses to ring an arrangement that has tipped over
 * (SPEC §6). Mount is the asymmetric arrangement, which satisfies it.
 *
 * Every block is absolutely placed inside a composition whose own box is fixed, so a
 * rearrangement moves nothing outside it, and the beam turns about its own centre inside a
 * row tall enough to hold the swing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <sp-segmented data-stage-mode class="sp-segmented" data-axis="Arrangement" data-part="switcher" data-value="asymmetric">
            <button class="sp-segment" type="button" data-part="seg-symmetric" value="symmetric">symmetric</button>
            <button class="sp-segment" type="button" data-part="seg-asymmetric" value="asymmetric">asymmetric</button>
            <button class="sp-segment" type="button" data-part="seg-lopsided" value="lopsided">lopsided</button>
          </sp-segmented>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px">
          <div
            data-part="composition"
            data-subject
            data-pose="[data-balanced]"
            data-balanced
            data-mode="asymmetric"
            style="position: relative; flex: 0 0 auto; width: 440px; height: 136px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius); overflow: hidden"
          >
            <div
              data-part="axis"
              style="position: absolute; left: 219px; top: 0; width: 2px; height: 100%; background: repeating-linear-gradient(to bottom, var(--sp-line) 0 6px, transparent 6px 12px)"
            ></div>
            ${Object.entries(ARRANGEMENTS.asymmetric?.blocks ?? {})
              .map(([name, box]) => `<div data-part="${name}" style="${BLOCK}; ${at(box)}"></div>`)
              .join('')}
          </div>
          <div class="sp-context" data-part="scale" style="position: relative; flex: 0 0 auto; width: 240px; height: 38px">
            <div
              data-part="beam"
              style="position: absolute; left: 0; top: 16px; width: 240px; height: 6px; border-radius: 999px; background: var(--sp-context-accent); transform-origin: 50% 50%; transition: rotate 0.32s var(--sp-ease)"
            ></div>
            <div
              style="position: absolute; left: 50%; top: 22px; width: 0; height: 0; margin-left: -10px; border-left: 10px solid transparent; border-right: 10px solid transparent; border-bottom: 14px solid var(--sp-muted)"
            ></div>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="height: 22px; max-width: 448px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;

  const composition = part(root, 'composition');
  const beam = part(root, 'beam');
  const readout = part(root, 'readout');

  const arrange = (key: string) => {
    const arrangement = ARRANGEMENTS[key];
    if (!arrangement) return;
    composition.dataset.mode = key;
    for (const [name, box] of Object.entries(arrangement.blocks)) {
      const block = part(root, name);
      block.style.left = `${box.left}px`;
      block.style.top = `${box.top}px`;
      block.style.width = `${box.width}px`;
      block.style.height = `${box.height}px`;
    }
    beam.style.rotate = `${arrangement.tilt}deg`;
    if (arrangement.balanced) composition.setAttribute('data-balanced', '');
    else composition.removeAttribute('data-balanced');
    readout.textContent = arrangement.note;
  };

  // Each segment names an arrangement, so a step lands on that arrangement rather than
  // flipping whichever one it finds (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => arrange((event as CustomEvent<string>).detail));

  arrange('asymmetric');
}
