import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * A serif this site actually ships, so the rows are the loaded file's own
 * behaviour rather than whatever the machine happened to have. Written out as a
 * local stack for the reason every type specimen is: the kit has one sans on
 * purpose (SPEC §5) and a feature table cannot be demonstrated in a face that
 * does not carry one.
 */
const FACE = "'Source Serif 4 Variable', Georgia, serif";
const CODE = 'font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px';

/**
 * Verified against the loaded face rather than assumed: `liga` and `frac` visibly
 * change what is drawn, `smcp` does nothing at all because this file carries no
 * small-caps table. The third row is kept for exactly that reason: a tag the font
 * does not have is not an error, it is silence, which is the term's real trap.
 * `tnum` is left out because tabular figures are their own term on this site.
 */
type Row = { tag: string; text: string; note: string };

const ROWS: Row[] = [
  { tag: 'liga', text: 'waffle office', note: 'the f pairs fuse' },
  { tag: 'frac', text: '1/2 and 3/4', note: 'digits build a fraction' },
  { tag: 'smcp', text: 'small caps', note: 'silence: no smcp table' },
];

/**
 * OpenType features specimen: three tags asked of one file, switched together so
 * the before and after of each sits in the same place. Two of them answer and one
 * stays silent, which is the part a feature chart never shows.
 *
 * The subject is the block of feature rows, not the window around it: the term
 * names the capabilities inside the font, and the picker and the caption are the
 * demo's own instrumentation (SPEC §5). Each sample sits in a fixed-width cell,
 * left aligned, so a fraction collapsing to a third of its width cannot drag the
 * note beside it (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const row = ({ tag, text, note }: Row) => `
    <div class="sp-row" style="gap: 10px; height: 34px">
      <span data-part="tag-${tag}" style="${CODE}; flex: 0 0 54px; color: var(--sp-muted)">"${tag}"</span>
      <span data-part="sample-${tag}" style="flex: 0 0 176px; font-family: ${FACE}; font-size: 21px; white-space: nowrap">${text}</span>
      <span class="sp-text sp-grow" data-part="note-${tag}" style="font-size: 12px; white-space: nowrap">${note}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 460px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">font-feature-settings</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="off">
            <button class="sp-segment" data-part="seg-off" value="off">0</button>
            <button class="sp-segment" data-part="seg-on" value="on">1</button>
          </sp-segmented>
        </div>
        <div class="sp-stack" data-part="rows" data-subject data-features="off" style="gap: 2px; margin-top: 10px">
          ${ROWS.map(row).join('')}
        </div>
        <p class="sp-text sp-context" data-part="caption" style="margin-top: 8px">
          The text never changes: the string stays "1/2 and 3/4" and only the drawing is swapped.
          A tag the file does not carry fails quietly, which is why a face has to be checked.
        </p>
      </div>
    </div>
  `;

  const rows = part(root, 'rows');
  const samples = ROWS.map(({ tag }) => [tag, part(root, `sample-${tag}`)] as const);

  const apply = (value: string) => {
    if (value !== 'off' && value !== 'on') return;
    rows.dataset.features = value;
    for (const [tag, sample] of samples) sample.style.fontFeatureSettings = `"${tag}" ${value === 'on' ? 1 : 0}`;
  };

  apply('off');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
