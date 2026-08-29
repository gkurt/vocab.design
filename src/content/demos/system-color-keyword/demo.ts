import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** Eight of the keywords, painted with themselves so the swatch is the resolved value. */
const KEYWORDS = ['Canvas', 'CanvasText', 'LinkText', 'ButtonFace', 'ButtonText', 'ButtonBorder', 'Highlight', 'AccentColor'];

const VIEWS = [
  { key: 'text', label: 'Text' },
  { key: 'button', label: 'Button' },
  { key: 'selection', label: 'Selection' },
] as const;

const START = 'text';

const NOTES: Record<string, string> = {
  text: 'Canvas behind, CanvasText on it, LinkText for the link. The page names three keywords and picks none of the values.',
  button: 'ButtonFace with ButtonText on it, and ButtonBorder for the edge, so the control keeps a boundary in any theme.',
  selection: 'Highlight travels with HighlightText, which is why a selected row stays legible without the page knowing either colour.',
};

/**
 * System colour keyword specimen: the keywords painted with themselves, so every swatch is
 * the value this browser and operating system resolve right now rather than a picture of one.
 * Beside them, the same keywords used in their pairs, since a surface keyword is only usable
 * with the text keyword it ships with.
 *
 * The subject is the swatch table. The term names the keywords, and a keyword's only visible
 * form is what it resolves to; the pair control, the preview and the caption are how the
 * specimen is read and stay in the context register (SPEC §5).
 *
 * The three previews are stacked layers in one fixed box and the swatch grid never changes,
 * so switching pair repaints and moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const cells = KEYWORDS.map(
    (word) => `
      <div class="sp-stack" style="gap: 4px">
        <span class="sp-swatch" data-part="sw-${word.toLowerCase()}" style="height: 26px; border-radius: 5px;
              box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.45); --sp-swatch: ${word}"></span>
        <span class="sp-text" style="font-size: 10px; line-height: 1.2">${word}</span>
      </div>`,
  ).join('');

  const layer = (key: string, body: string) => `
    <div data-part="view-${key}" ${key === START ? '' : 'hidden'}
         style="position: absolute; inset: 0; display: flex; align-items: center; gap: 10px; padding: 0 12px;
                border-radius: var(--sp-radius); background: Canvas; border: 1px solid ButtonBorder">${body}</div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 436px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented class="sp-segmented" data-part="segmented" data-axis="Pair" data-value="${START}">
            ${VIEWS.map((v) => `<button class="sp-segment" data-part="seg-${v.key}" value="${v.key}">${v.label}</button>`).join('')}
          </sp-segmented>
        </div>

        <div class="sp-grid" data-part="keywords" data-subject
             style="grid-template-columns: repeat(4, 1fr); gap: 8px; margin-top: 13px">${cells}</div>

        <div class="sp-context" data-part="preview" data-pair="${START}"
             style="position: relative; height: 58px; margin-top: 13px">
          ${layer(
            'text',
            `<span style="font-size: 12px; color: CanvasText">Your session expires in ten minutes.</span>
             <span style="font-size: 12px; color: LinkText; text-decoration: underline">Extend</span>`,
          )}
          ${layer(
            'button',
            `<span style="padding: 5px 12px; border-radius: 6px; font-size: 12px;
                   background: ButtonFace; color: ButtonText; border: 1px solid ButtonBorder">Extend session</span>
             <span style="font-size: 12px; color: CanvasText">or sign out</span>`,
          )}
          ${layer(
            'selection',
            `<span style="flex: 1 1 0; padding: 5px 9px; border-radius: 5px; font-size: 12px;
                   background: Highlight; color: HighlightText">Invoice 4021</span>
             <span style="flex: 1 1 0; padding: 5px 9px; font-size: 12px; color: CanvasText">Invoice 4022</span>`,
          )}
        </div>

        <p class="sp-text sp-context" data-part="note"
           style="margin: 10px 0 0; height: 30px; font-size: 11px; line-height: 1.4">${NOTES[START]}</p>
      </div>
    </div>
  `;

  const preview = part(root, 'preview');
  const note = part(root, 'note');

  const show = (key: string) => {
    if (!VIEWS.some((v) => v.key === key)) return;
    preview.dataset.pair = key;
    for (const view of VIEWS) part(root, `view-${view.key}`).hidden = view.key !== key;
    note.textContent = NOTES[key] ?? '';
  };
  show(START);

  part(root, 'segmented').addEventListener('change', (event) => show((event as CustomEvent<string>).detail));
}
