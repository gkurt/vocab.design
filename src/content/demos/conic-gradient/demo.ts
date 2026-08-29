import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Shape = {
  key: string;
  label: string;
  title: string;
  paint: string;
  code: string;
  /** The punch a donut needs; empty for the solid discs. */
  mask: string;
  note: string;
};

/**
 * Three jobs, one function. Each state is a complete stop list, so a pass picked up
 * anywhere paints the same disc rather than depending on what came before it.
 */
const SHAPES: Shape[] = [
  {
    key: 'wheel',
    label: 'Wheel',
    title: 'Hue wheel',
    paint: 'conic-gradient(from 0deg, #e5484d, #e2a336, #46a758, #12a5b0, #3557e8, #8e4ec6, #e5484d)',
    code: 'conic-gradient(from 0deg, red, amber, green, cyan, blue, violet, red)',
    mask: '',
    note: 'Smooth all the way round. The last stop repeats the first, so the seam has nothing to show.',
  },
  {
    key: 'pie',
    label: 'Pie',
    title: 'Pie chart',
    paint: 'conic-gradient(#3557e8 0 42%, #7aa2f7 42% 68%, #b9c8f6 68% 87%, #dfe2e8 87% 100%)',
    code: 'conic-gradient(#3557e8 0 42%, #7aa2f7 42% 68%, ...)',
    mask: '',
    note: 'Two stops at one position leave no room to blend, so a single fill draws four flat slices.',
  },
  {
    key: 'ring',
    label: 'Ring',
    title: 'Progress ring',
    paint: 'conic-gradient(#3557e8 0 68%, #dfe2e8 68% 100%)',
    code: 'conic-gradient(accent 0 68%, track 0) + radial mask',
    mask: 'radial-gradient(closest-side, transparent 0 62%, #000 63% 100%)',
    note: 'The same hard stop, with a radial mask punching the middle out. 68 percent, drawn as an angle.',
  },
];

const START = 'wheel';

/**
 * Conic gradient specimen: one disc that keeps its size and its centre while the stop list
 * under it changes job. The subject is the disc, which is the narrowest element the term
 * actually names: the sweep is a paint, and the element carrying it is the only thing on
 * stage that is one. The picker, the syntax line and the note are instrumentation and stay
 * in the context register (SPEC §5).
 *
 * Every state is an absolute stop list rather than a nudge to the last one, and the disc,
 * the code line and the note all sit in fixed boxes, so switching states moves nothing.
 */
export function mount(root: HTMLElement): void {
  const start = SHAPES.find((s) => s.key === START) ?? SHAPES[0];
  if (!start) return;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 438px; padding: 13px 18px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Stop list" data-value="${START}">
            ${SHAPES.map((s) => `<button class="sp-segment" data-part="seg-${s.key}" value="${s.key}">${s.label}</button>`).join('')}
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 18px; margin-top: 14px; align-items: center">
          <div data-part="disc" data-subject data-shape="${START}"
               style="flex: 0 0 auto; width: 138px; height: 138px; border-radius: 50%;
                      background-image: ${start.paint}"></div>

          <div class="sp-stack" style="flex: 1 1 0; min-width: 0; gap: 7px">
            <span class="sp-heading" data-part="title" style="font-size: 14px">${start.title}</span>
            <span class="sp-context" data-part="code"
                  style="display: block; height: 30px; font-size: 10.5px; line-height: 1.4; color: var(--sp-muted);
                         overflow-wrap: break-word">${start.code}</span>
            <span class="sp-text sp-context" data-stage-verdict data-part="note"
                  style="height: 58px; font-size: 11px; line-height: 1.45">${start.note}</span>
          </div>
        </div>

        <p class="sp-text sp-context" style="margin: 10px 0 0; font-size: 10.5px; line-height: 1.4">
          The angle from the centre decides the colour, so the same function is a wheel, a chart and a meter.
        </p>
      </div>
    </div>
  `;

  const disc = part(root, 'disc');
  const title = part(root, 'title');
  const code = part(root, 'code');
  const note = part(root, 'note');

  const draw = (key: string) => {
    const shape = SHAPES.find((s) => s.key === key);
    if (!shape) return;
    disc.dataset.shape = shape.key;
    disc.style.backgroundImage = shape.paint;
    disc.style.setProperty('mask-image', shape.mask || 'none');
    disc.style.setProperty('-webkit-mask-image', shape.mask || 'none');
    title.textContent = shape.title;
    code.textContent = shape.code;
    note.textContent = shape.note;
  };
  draw(START);

  part(root, 'segmented').addEventListener('change', (event) => draw((event as CustomEvent<string>).detail));
}
