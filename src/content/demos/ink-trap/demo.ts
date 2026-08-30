import { flag, part, partsOf } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * The N is drawn here rather than set in a face. None of the files this site
 * loads carries ink traps, and a specimen of a feature silently absent would be
 * a specimen of the wrong term, so the letter is built the way a trapped letter
 * is built: filled strokes, with a wedge taken out of each acute joint.
 *
 * Cap line 16, baseline 116, stems 20 wide, the diagonal 22 wide measured
 * horizontally. The two acute joints fall where the diagonal's edges reach the
 * stems: (36, 48) at the lower left and (80, 84) at the upper right.
 */
const BOARD = { w: 116, h: 132 };
const INK = `
      <path d="M16 16 H36 V116 H16 Z"/>
      <path d="M80 16 H100 V116 H80 Z"/>
      <path d="M16 16 L38 16 L100 116 L78 116 Z"/>`;

/** A wedge at each acute joint, mouth in the counter, point buried in the ink. */
const TRAPS = `
      <path d="M70 72 L82 72 L78 96 Z"/>
      <path d="M32 60 L44 60 L38 36 Z"/>`;

/** The upper right joint, cropped and enlarged. */
const JOINT = '58 58 46 46';
/** Ink gain: every edge thickened, which is what spreading ink does to a printed letter. */
const GAIN = 2.5;

/**
 * One drawing, three views. Each gets its own mask, since a mask is referenced
 * by id and three panels cannot share one instance of the cut.
 */
function panel(id: string, view: string, size: number, gain: boolean): string {
  const height = view === JOINT ? size : Math.round((size * BOARD.h) / BOARD.w);
  const body = `<g mask="url(#cut-${id})" fill="currentColor">${INK}</g>`;
  return `
    <svg viewBox="${view}" width="${size}" height="${height}" aria-hidden="true" style="display: block">
      <defs>
        <mask id="cut-${id}">
          <rect x="0" y="0" width="${BOARD.w}" height="${BOARD.h}" fill="#fff"/>
          <g data-part="traps" fill="#000">${TRAPS}</g>
        </mask>
        ${
          gain
            ? `<filter id="gain-${id}" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
          <feMorphology operator="dilate" radius="${GAIN}"/>
        </filter>`
            : ''
        }
      </defs>
      ${gain ? `<g filter="url(#gain-${id})">${body}</g>` : body}
    </svg>`;
}

const READS = {
  trap: 'the notch takes the gain, the joint stays open',
  plain: 'the ink meets in the corner and fills the joint',
} as const;

type Mode = keyof typeof READS;

const IS_MODE = (value: string): value is Mode => value in READS;

/**
 * Ink trap specimen: one acute joint of an N, shown whole, magnified, and
 * magnified again with the ink gain of a small setting applied to it. The trap
 * is a real hole in the letter (a mask, not a patch of background paint), so the
 * simulated gain eats into it the way spreading ink would, which is the only way
 * the third panel can be evidence rather than an assertion.
 *
 * The subject is the magnified joint: the term names a notch at a junction, not
 * the letter and not the specimen. The whole letter beside it says where that
 * junction is and the gained view says what the notch is for, so both are
 * scenery in the context register (SPEC §5). The untrapped setting is the
 * counter-example the subject itself passes through, so the honest condition is
 * declared in `data-pose` and the specimen mounts trapped (SPEC §6).
 *
 * The reading of the two settings ("the notch takes the gain, the joint stays open")
 * is the author's verdict on the switch rather than anything a type specimen would print,
 * so it is marked `data-stage-verdict` and the stage draws it in the strip. The label
 * beside it, "6 pt: gain simulated", was deleted: the panel underneath already says which
 * size it is showing, and the docblock above is where the simulation is admitted.
 *
 * Nothing moves when the setting changes: the panels are fixed boxes and only
 * the mask inside them is switched (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Joint" data-term="trap" data-value="trap" style="margin-left: auto">
            <button class="sp-segment" data-part="seg-trap" value="trap">with trap</button>
            <button class="sp-segment" data-part="seg-plain" value="plain">without</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 18px; align-items: flex-end; margin-top: 10px; height: 132px">
          <div class="sp-stack sp-context" data-part="whole" style="gap: 6px; align-items: center">
            ${panel('whole', `0 0 ${BOARD.w} ${BOARD.h}`, 88, false)}
            <span class="sp-label">the letter</span>
          </div>
          <div class="sp-stack" data-part="joint-panel" style="gap: 6px; align-items: center">
            <svg data-part="joint" data-subject data-mode="trap" data-trapped data-pose="[data-trapped]"
                 viewBox="${JOINT}" width="112" height="112" role="img"
                 aria-label="The upper right joint of an N, magnified"
                 style="display: block">
              <defs>
                <mask id="cut-joint">
                  <rect x="0" y="0" width="${BOARD.w}" height="${BOARD.h}" fill="#fff"/>
                  <g data-part="traps" fill="#000">${TRAPS}</g>
                </mask>
              </defs>
              <g mask="url(#cut-joint)" fill="currentColor">${INK}</g>
            </svg>
            <span class="sp-label sp-context">the joint at 48 pt</span>
          </div>
          <div class="sp-stack sp-context" data-part="gained" style="gap: 6px; align-items: center">
            ${panel('gain', JOINT, 112, true)}
            <span class="sp-label">the same joint at 6 pt</span>
          </div>
        </div>
        <div class="sp-row sp-context" style="margin-top: 10px">
          <span class="sp-text" data-stage-verdict data-part="readout">${READS.trap}</span>
        </div>
      </div>
    </div>
  `;

  const joint = part(root, 'joint');
  const readout = part(root, 'readout');
  const cuts = partsOf(root, 'traps');

  part(root, 'segmented').addEventListener('change', (event) => {
    const value = (event as CustomEvent<string>).detail;
    if (!IS_MODE(value)) return;
    const on = value === 'trap';
    flag(joint, 'data-trapped', on);
    joint.dataset.mode = value;
    for (const cut of cuts) cut.setAttribute('fill', on ? '#000' : '#fff');
    readout.textContent = READS[value];
  });
}
