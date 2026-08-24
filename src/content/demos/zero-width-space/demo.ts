import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import { displayScale, localSize } from '#src/kit/measure.ts';

/*
 * The term has no ink and no width, so there is nothing in the text to point at:
 * what the character produces is a break, and the break is what this specimen
 * draws. The tick under the line is the demo's own annotation, sized to the extent
 * of a thing with no extent (SPEC §5), and the text itself carries no mark at all,
 * which is the claim.
 *
 * The column clips rather than spilling: in the state with no break opportunity
 * the name genuinely runs past its box, and the clipping is the failure being
 * shown rather than a layout accident (SPEC §5).
 */
const MONO = "'Geist Mono Variable', ui-monospace, monospace";
const SIZE = 19;
/** The column's inner width, chosen so the name needs two lines and gets none. */
const COLUMN = 210;
/** Room for the tallest state, so a pick moves nothing below it (SPEC §5). */
const BOX = 80;

const SEGMENTS = ['Product', 'Catalog', 'Sync', 'Scheduler'] as const;

const MODES = {
  none: { joiner: '', read: 'no legal break here, so the name runs past its column' },
  shy: { joiner: '­', read: 'a soft hyphen breaks it, and draws a hyphen where it broke' },
  zwsp: { joiner: '​', read: 'a zero-width space breaks it, and draws nothing at all' },
} as const;

type Mode = keyof typeof MODES;
const IS_MODE = (value: string): value is Mode => value in MODES;

/**
 * Zero-width space specimen: one long identifier in a narrow column, under a pick
 * between the three things you can put between its words. With nothing there the
 * name has no break opportunity and overruns the column. With a soft hyphen it
 * wraps and a hyphen appears. With a zero-width space it wraps and the text is
 * untouched, which is the whole point of the character.
 *
 * The subject is the break point (SPEC §5), a character with no width and no
 * glyph, so it is given an element: a tick under the line at the position the
 * break actually landed, placed from a measurement rather than guessed. The soft
 * hyphen produces a break too, so the honest condition is declared in `data-pose`
 * and the specimen mounts on the zero-width space (SPEC §6).
 *
 * Measurement happens twice and never after a style write that transitions
 * (AGENTS.md): the three candidate prefix widths are read at mount, from the
 * mounted state, and each pick then reads the line boxes the browser produced for
 * new text content, which is not an animated property. Comparing the two says
 * whether a hyphen was drawn: a line box wider than the prefix it ends with has
 * something extra in it, and that something is the hyphen.
 */
type Line = { width: number; right: number; bottom: number };

/**
 * The line boxes the browser produced, one entry per visual line. Rects are not
 * lines: a drawn hyphen arrives as a rect of its own beside the run it follows,
 * which is exactly the leftover width that gives the hyphen away, so rects sharing
 * a top edge are summed rather than counted.
 */
function linesOf(el: HTMLElement): Line[] {
  const node = el.firstChild;
  if (!node) return [];
  const range = el.ownerDocument.createRange();
  range.selectNodeContents(node);
  // Client rects, in the specimen's own pixels: every width here is compared against a
  // constant or a prefix measured in them, and a listing shows this specimen at half size.
  const scale = displayScale(el);
  const rects = [...range.getClientRects()].map((r) => ({
    width: r.width / scale,
    right: r.right / scale,
    top: r.top / scale,
    bottom: r.bottom / scale,
  }));
  const lines: Line[] = [];
  let top = Number.NaN;
  for (const rect of rects.filter((r) => r.width > 0.5).sort((a, b) => a.top - b.top)) {
    const line = lines.at(-1);
    if (line && Math.abs(rect.top - top) < 4) {
      line.width += rect.width;
      line.right = Math.max(line.right, rect.right);
      line.bottom = Math.max(line.bottom, rect.bottom);
      continue;
    }
    top = rect.top;
    lines.push({ width: rect.width, right: rect.right, bottom: rect.bottom });
  }
  return lines;
}

export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label" style="white-space: nowrap">between the words</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="zwsp" style="flex: 0 0 auto">
            <button class="sp-segment" data-part="seg-none" value="none" style="white-space: nowrap">nothing</button>
            <button class="sp-segment" data-part="seg-shy" value="shy" style="white-space: nowrap">soft hyphen</button>
            <button class="sp-segment" data-part="seg-zwsp" value="zwsp" style="white-space: nowrap">ZWSP</button>
          </sp-segmented>
        </div>
        <span class="sp-label sp-context" style="display: block; margin-top: 12px">a name too long for its column</span>
        <div data-part="column"
             style="position: relative; width: ${COLUMN + 24}px; height: ${BOX}px; margin-top: 4px; padding: 10px 12px;
                    background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius);
                    overflow: hidden">
          <p data-part="string" data-mode="zwsp" data-lines="1"
             style="margin: 0; width: ${COLUMN}px; font-family: ${MONO}; font-size: ${SIZE}px; line-height: 1.55"></p>
          <span data-part="break" data-subject data-mode="zwsp" data-pose="[data-mode=zwsp]"
                style="position: absolute; width: 3px; height: 9px; background: var(--sp-accent); border-radius: 1px"></span>
          <span data-part="ruler" aria-hidden="true"
                style="position: absolute; top: 0; left: 0; visibility: hidden; white-space: pre;
                       font-family: ${MONO}; font-size: ${SIZE}px">${SEGMENTS[0]}</span>
        </div>
        <div class="sp-row sp-context" style="height: 30px; margin-top: 6px">
          <span class="sp-chip" data-part="readout" style="cursor: default">${MODES.zwsp.read}</span>
        </div>
        <p class="sp-text sp-context" data-part="caption" style="margin-top: 2px">
          The tick is this stage's annotation for a character with no extent of its own: it marks where the line
          was allowed to break. Nothing is drawn there, and nothing is added to the width.
        </p>
      </div>
    </div>
  `;

  const string = part(root, 'string');
  const mark = part(root, 'break');
  const column = part(root, 'column');
  const readout = part(root, 'readout');
  const ruler = part(root, 'ruler');

  /* Read at mount, on the mounted state: how wide each prefix of the name is, so a
     line box can later be matched to the words it ends with. */
  const prefixes = SEGMENTS.map((_, i) => {
    ruler.textContent = SEGMENTS.slice(0, i + 1).join('');
    return localSize(ruler).width;
  });
  ruler.textContent = SEGMENTS[0];

  const apply = (value: string) => {
    if (!IS_MODE(value)) return;
    const { joiner, read } = MODES[value];
    string.textContent = SEGMENTS.join(joiner);
    string.dataset.mode = value;
    readout.textContent = read;

    const lines = linesOf(string);
    string.dataset.lines = String(Math.max(lines.length, 1));

    const first = lines[0];
    const broke = lines.length > 1 && first !== undefined;
    flag(mark, 'hidden', !broke);
    mark.dataset.mode = value;
    if (!broke || !first) {
      string.dataset.hyphen = 'no';
      return;
    }
    /* A drawn hyphen is width the words alone do not account for: match the line
       against the prefixes measured at mount and see what is left over. */
    const nearest = prefixes.reduce((a, b) => (Math.abs(b - first.width) < Math.abs(a - first.width) ? b : a));
    string.dataset.hyphen = first.width - nearest > 4 ? 'yes' : 'no';
    // `first` is already in specimen pixels; the column's own left edge is not.
    const box = column.getBoundingClientRect();
    const scale = displayScale(column);
    mark.style.left = `${Math.min(first.right - box.left / scale, COLUMN + 18)}px`;
    mark.style.top = `${first.bottom - box.top / scale - 4}px`;
  };

  apply('zwsp');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
