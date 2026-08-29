import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const PHOTO = { width: 384, height: 216 };
/** Where the guides fall, stated once so the overlay and the composition cannot disagree. */
const THIRD = 100 / 3;
/** Guides are drawn at this thickness because the stage reads a box thinner than 2px as absent. */
const GUIDE = 2;

interface Composition {
  key: string;
  label: string;
  /** Horizon height and sun centre, as percentages of the frame. */
  horizon: number;
  sunX: number;
  sunY: number;
  note: string;
}

const COMPOSITIONS: Composition[] = [
  {
    key: 'thirds',
    label: 'on the thirds',
    horizon: 2 * THIRD,
    sunX: THIRD,
    sunY: THIRD,
    note: 'The horizon rides the lower line and the sun sits on an intersection, which leaves the frame somewhere to travel.',
  },
  {
    key: 'centre',
    label: 'dead centre',
    horizon: 50,
    sunX: 50,
    sunY: 50,
    note: 'Dead centre: the horizon halves the frame, the sun is cut in two by it, and both halves say the same thing.',
  },
];

const line = (at: number, vertical: boolean) => {
  const stop = `${at}%`;
  const edge = vertical ? 'to right' : 'to bottom';
  return `linear-gradient(${edge}, transparent calc(${stop} - ${GUIDE / 2}px), var(--rot-guide) calc(${stop} - ${GUIDE / 2}px),
    var(--rot-guide) calc(${stop} + ${GUIDE / 2}px), transparent calc(${stop} + ${GUIDE / 2}px))`;
};

const node = (x: number, y: number) => `
  <span
    aria-hidden="true"
    style="position: absolute; left: ${x}%; top: ${y}%; width: 12px; height: 12px; translate: -50% -50%;
           border: ${GUIDE}px solid var(--rot-guide); border-radius: 50%"
  ></span>`;

/**
 * Rule of thirds specimen: one drawn seascape with the thirds grid over it, composed on the
 * lines and then dead centre so the difference the rule makes is the thing that changes.
 *
 * The subject is the grid drawn over the frame, `data-part="grid"`: the division into nine
 * cells is the term, it has no element of its own in the picture, so it is given one, sized to
 * the frame it divides (SPEC §5). The picture, the picker and the caption are scenery. The
 * overlay carries `data-pose="[data-mode=thirds]"`, because a ring drawn around the grid while
 * the composition ignores it would identify the counter-example (SPEC §6); the mount state is
 * the honest one, so a pose taken at rest always satisfies it.
 *
 * Guides are drawn at 2px and the overlay is a real box inset over the picture, since the stage
 * treats anything thinner as absent. The picture keeps one box in both compositions, so nothing
 * moves except the two things the rule is about (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const first = COMPOSITIONS[0] as Composition;

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Composed</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="compositions" data-value="${first.key}" data-axis="Placement" data-term="thirds">
            ${COMPOSITIONS.map(
              (composition) => `
              <button class="sp-segment" type="button" data-part="seg-${composition.key}" value="${composition.key}" style="padding: 4px 11px; font-size: 11px">${composition.label}</button>`,
            ).join('')}
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 9px; padding: 10px 12px">
          <div
            class="sp-context"
            data-part="photo"
            style="position: relative; flex: 0 0 auto; width: ${PHOTO.width}px; height: ${PHOTO.height}px; overflow: hidden;
                   border-radius: var(--sp-radius); background: linear-gradient(#8fb4dd, #cfd9e0 58%, #f0cfa4)"
          >
            <span
              data-part="sun"
              aria-hidden="true"
              style="position: absolute; left: ${first.sunX}%; top: ${first.sunY}%; width: 46px; height: 46px; translate: -50% -50%;
                     border-radius: 50%; background: #f6b45a; box-shadow: 0 0 26px 10px rgb(246 180 90 / 0.45);
                     transition: left 0.4s var(--sp-ease), top 0.4s var(--sp-ease)"
            ></span>
            <span
              data-part="sea"
              aria-hidden="true"
              style="position: absolute; left: 0; right: 0; bottom: 0; top: ${first.horizon}%;
                     background: linear-gradient(#2f5f86, #1f4363); transition: top 0.4s var(--sp-ease)"
            ></span>

            <div
              data-part="grid"
              data-subject
              data-mode="${first.key}"
              data-pose="[data-mode=thirds]"
              aria-hidden="true"
              style="--rot-guide: rgb(255 255 255 / 0.82); position: absolute; inset: 0; pointer-events: none;
                     background-image: ${line(THIRD, true)}, ${line(2 * THIRD, true)}, ${line(THIRD, false)}, ${line(2 * THIRD, false)}"
            >
              ${node(THIRD, THIRD)}
              ${node(2 * THIRD, THIRD)}
              ${node(THIRD, 2 * THIRD)}
              ${node(2 * THIRD, 2 * THIRD)}
            </div>
          </div>

          <span class="sp-text sp-context" data-part="note" role="status" style="flex: 0 0 auto; height: 32px; width: 440px; font-size: 12px; line-height: 16px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;

  const grid = part(root, 'grid');
  const sun = part(root, 'sun');
  const sea = part(root, 'sea');
  const note = part(root, 'note');

  const compose = (key: string) => {
    const composition = COMPOSITIONS.find((entry) => entry.key === key);
    if (!composition) return;
    grid.dataset.mode = composition.key;
    sun.style.left = `${composition.sunX}%`;
    sun.style.top = `${composition.sunY}%`;
    sea.style.top = `${composition.horizon}%`;
    note.textContent = composition.note;
  };

  part(root, 'compositions').addEventListener('change', (event) => compose((event as CustomEvent<string>).detail));

  compose(first.key);
}
