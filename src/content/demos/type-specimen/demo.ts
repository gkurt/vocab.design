import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * The three faces this site actually loads, so every panel is the file's own drawing
 * rather than whatever the machine happened to have. All three carry a weight axis,
 * which is why the weights row is real rather than synthesized (a face without one
 * would be smeared by the browser, which is the faux-bold specimen's subject).
 */
interface Face {
  name: string;
  stack: string;
  note: string;
}

type FaceKey = 'sans' | 'serif' | 'mono';

const FACES: Record<FaceKey, Face> = {
  sans: { name: 'Geist', stack: "'Geist Variable', ui-sans-serif, system-ui, sans-serif", note: 'Variable, weight 100 to 900' },
  serif: { name: 'Source Serif 4', stack: "'Source Serif 4 Variable', Georgia, serif", note: 'Variable, weight 200 to 900' },
  mono: { name: 'Geist Mono', stack: "'Geist Mono Variable', ui-monospace, monospace", note: 'Variable, one advance width' },
};

const IS_FACE = (value: string): value is FaceKey => value in FACES;

const DISPLAY = 'Handgloves';
const SET = 'AaBbGgQqRr 0123 &?!';
const PROSE = 'A face is judged in the paragraph, at the size the work is really set at.';
const WEIGHTS = [300, 500, 800];

/**
 * Type specimen specimen: one sheet, carrying the four panels a real specimen carries,
 * redrawn for each of the three faces the site loads. The display line is the one that
 * flatters, the paragraph at reading size is the one that judges, and both are on the
 * sheet for that reason.
 *
 * The subject is the sheet, not the whole scene: the picker below it and the caption
 * are the demo's own instrumentation and sit in the context register (SPEC §5). No face
 * is dishonest, so no `data-pose` is needed: a sheet is a specimen whichever file it is
 * set in.
 *
 * Every panel is a fixed box with its overflow contained, so a face that sets wider or
 * needs a third line cannot move the panels under it (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const start = FACES.serif;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-surface" data-part="sheet" data-subject data-face="serif" style="padding: 12px 14px">
          <div class="sp-row sp-row--between" style="height: 22px">
            <span data-part="face-name" style="font-family: ${start.stack}; font-size: 15px; font-weight: 600">${start.name}</span>
            <span class="sp-label" data-part="face-note">${start.note}</span>
          </div>
          <div data-part="display" style="height: 50px; overflow: hidden; display: flex; align-items: center;
               font-family: ${start.stack}; font-size: 38px; line-height: 1; white-space: nowrap">${DISPLAY}</div>
          <div data-part="charset" style="height: 26px; overflow: hidden; display: flex; align-items: center;
               font-family: ${start.stack}; font-size: 16px; letter-spacing: 0.04em; white-space: nowrap">${SET}</div>
          <p data-part="prose" style="margin: 6px 0 0; height: 40px; overflow: hidden;
             font-family: ${start.stack}; font-size: 13px; line-height: 1.5">${PROSE}</p>
          <div class="sp-row" data-part="weights" style="gap: 14px; margin-top: 8px; height: 30px">
            ${WEIGHTS.map(
              (weight) => `
              <div class="sp-stack" style="gap: 0; width: 118px">
                <span data-part="weight-${weight}" style="font-family: ${start.stack}; font-size: 17px; font-weight: ${weight};
                      line-height: 1.1; white-space: nowrap; overflow: hidden">Weight ${weight}</span>
                <span class="sp-label" style="font-size: 10px">${weight}</span>
              </div>`,
            ).join('')}
          </div>
        </div>
        <div class="sp-row sp-row--between sp-context" style="margin-top: 12px; height: 30px; justify-content: flex-end">
          <sp-segmented class="sp-segmented" data-axis="Typeface" data-part="segmented" data-value="serif">
            <button class="sp-segment" data-part="seg-sans" value="sans">sans</button>
            <button class="sp-segment" data-part="seg-serif" value="serif">serif</button>
            <button class="sp-segment" data-part="seg-mono" value="mono">mono</button>
          </sp-segmented>
        </div>
      </div>
    </div>
  `;

  const sheet = part(root, 'sheet');
  const name = part(root, 'face-name');
  const note = part(root, 'face-note');
  const panels = [part(root, 'display'), part(root, 'charset'), part(root, 'prose'), ...WEIGHTS.map((w) => part(root, `weight-${w}`))];

  part(root, 'segmented').addEventListener('change', (event) => {
    const value = (event as CustomEvent<string>).detail;
    if (!IS_FACE(value)) return;
    const face = FACES[value];
    sheet.dataset.face = value;
    name.textContent = face.name;
    name.style.fontFamily = face.stack;
    note.textContent = face.note;
    for (const panel of panels) panel.style.fontFamily = face.stack;
  });
}
