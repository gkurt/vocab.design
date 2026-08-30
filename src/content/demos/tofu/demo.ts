import { flag, part } from '#src/kit/parts.ts';

const KINDS = ['notdef', 'hex', 'fffd'] as const;
type Kind = (typeof KINDS)[number];

const NOTES: Record<Kind, string> = {
  notdef: 'Glyph zero, the shape every font file reserves for a character it cannot draw. It means the font was asked and had nothing.',
  hex: 'A last resort face printing the codepoint it could not set. The most useful box of the three, because it names what went missing.',
  fffd: 'The replacement character, U+FFFD. Not a missing glyph at all: it is what a decoder leaves where the bytes were not valid text.',
};

const NAMES: Record<Kind, string> = { notdef: 'notdef box', hex: 'hex box', fffd: 'U+FFFD' };

/**
 * One tofu box, drawn rather than rendered. A browser sitting on a desktop's full
 * fallback stack finds a glyph for very nearly anything, so a specimen that waited
 * for the platform to produce real tofu would show none at all; these are exhibits,
 * built to the proportions of the rectangle a reader actually meets. A paragraph under
 * the key used to say so out loud ("These boxes are drawn, not rendered...") and it has
 * gone: it was the site explaining its own workshop inside the mock, and this comment is
 * where the next author needs it. All three are drawn to one width, so the key entries line up and
 * the row they sit in is the same size whichever one is picked (SPEC §5).
 */
function box(kind: Kind, h: number): string {
  const w = Math.round(h * 0.72);
  const geometry = `width: ${w}px; height: ${h}px; vertical-align: -${Math.round(h * 0.2)}px; margin: 0 1px`;
  const edge = 'border: 1.5px solid currentcolor; border-radius: 1px';
  if (kind === 'notdef') return `<span aria-hidden="true" style="display: inline-block; ${geometry}; ${edge}"></span>`;
  if (kind === 'hex')
    return `<span aria-hidden="true" style="display: inline-flex; flex-direction: column; justify-content: center; overflow: hidden;
      ${geometry}; ${edge}; font-family: ui-monospace, monospace; font-size: ${(h * 0.32).toFixed(1)}px;
      line-height: ${(h * 0.38).toFixed(1)}px; font-weight: 600; text-align: center"><span>09</span><span>2F</span></span>`;
  return `<span aria-hidden="true" style="display: inline-block; position: relative; ${geometry}">
      <span style="position: absolute; left: 50%; top: 50%; width: ${Math.round(h * 0.62)}px; height: ${Math.round(h * 0.62)}px;
        translate: -50% -50%; rotate: 45deg; border-radius: 1px; background: currentcolor"></span>
      <span style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
        font-size: ${(h * 0.5).toFixed(1)}px; font-weight: 700; line-height: 1; color: var(--sp-surface)">?</span>
    </span>`;
}

const key = (kind: Kind) =>
  `<button class="sp-chip" data-part="key-${kind}" data-kind="${kind}">${box(kind, 15)}<span>${NAMES[kind]}</span></button>`;

/**
 * Tofu specimen: a notification whose sender's name is a run of boxes, and a key
 * naming the three rectangles a reader can meet. The line is the subject, and it is
 * the narrowest thing the term names: the boxes are what the term is, but a single
 * box out of context is a shape rather than a failure, and the run of them standing
 * where a name should be is the failure. It shows notdef boxes and nothing else, so
 * there is no state in which the subject stops being tofu and no pose condition to
 * declare.
 *
 * The key is scenery in the context register: picking an entry explains that box
 * without touching the line, since annotation on the subject belongs to the stage
 * (SPEC §5). That explanation is the author naming what the reader is looking at, so
 * it is marked `data-stage-verdict` and the stage draws it in the strip rather than
 * the inbox printing a glossary under its own notification.
 */
export function mount(root: HTMLElement): void {
  const line = `Message from ${box('notdef', 18).repeat(6)} about Friday`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">inbox</span>
          <span class="sp-label">Latin subset, no fallback</span>
        </div>
        <div class="sp-surface" style="margin-top: 10px; padding: 12px 14px">
          <div data-part="line" data-subject style="font-size: 16px; line-height: 24px; white-space: nowrap">${line}</div>
          <div class="sp-text sp-context" style="margin-top: 4px">2 minutes ago</div>
        </div>
        <div class="sp-row sp-context" style="margin-top: 12px">
          ${key('notdef')}${key('hex')}${key('fffd')}
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="readout" data-showing="notdef" style="margin: 10px 0 0; height: 39px"></p>
      </div>
    </div>
  `;

  const readout = part(root, 'readout');
  const keys = KINDS.map((kind) => part(root, `key-${kind}`));

  const show = (kind: Kind) => {
    readout.dataset.showing = kind;
    readout.textContent = NOTES[kind];
    for (const entry of keys) flag(entry, 'data-selected', entry.dataset.kind === kind);
  };

  for (const entry of keys) entry.addEventListener('click', () => show(entry.dataset.kind as Kind));
  show('notdef');
}
