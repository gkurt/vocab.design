import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/*
 * Every break point is written into the copy as a soft hyphen rather than left to
 * `hyphens: auto`, because an automatic dictionary belongs to the browser and is
 * not the same one in every browser: the ladder would form in one engine and not
 * in the next. With the points stated, the line breaker still decides which of
 * them it needs, so the staircase below is its own work at this measure.
 */
const SHY = '\u00AD';
const COPY =
  'Com~po~si~tion rooms for~bade the lad~der out~right: con~sec~u~tive hy~phens un~der~neath one an~oth~er, turn~ing or~di~nary para~graphs in~to dec~o~ra~tion.';
const SOURCE = COPY.replaceAll('~', SHY);

/** Found by walking this copy across the range: at 116px four lines in a row break. */
const MEASURE = 116;
const SIZE = 13;
const LINE = 19;
/** Room for a line more than either setting needs, so a pick moves nothing (SPEC §5). */
const SLOT = 9 * LINE;
/** What `hyphenate-limit-lines: 2` asks for: never a third hyphen in a row. */
const CAP = 2;
/** A ladder starts at three. */
const LADDER = 3;

/** One permitted break point, and where it landed in the rendered string. */
type Point = { source: number; at: number };
/** A break the engine took: the line it ends, and the point that allowed it. */
type Rung = { line: number; source: number };

function build(disabled: ReadonlySet<number>): { text: string; points: Point[] } {
  let text = '';
  const points: Point[] = [];
  for (let i = 0; i < SOURCE.length; i++) {
    if (SOURCE[i] !== SHY) {
      text += SOURCE[i];
      continue;
    }
    if (disabled.has(i)) continue;
    points.push({ source: i, at: text.length });
    text += SHY;
  }
  return { text, points };
}

/** The longest run of consecutive lines in a rung list sorted by line. */
function longestRun(rungs: Rung[]): number {
  let best = 0;
  let run = 0;
  let previous: number | undefined;
  for (const rung of rungs) {
    run = previous !== undefined && rung.line === previous + 1 ? run + 1 : 1;
    previous = rung.line;
    if (run > best) best = run;
  }
  return best;
}

/** The first break that takes a run past the cap, which is the one the limit refuses. */
function pastCap(rungs: Rung[]): number | undefined {
  let run = 0;
  let previous: number | undefined;
  for (const rung of rungs) {
    run = previous !== undefined && rung.line === previous + 1 ? run + 1 : 1;
    previous = rung.line;
    if (run > CAP) return rung.source;
  }
  return undefined;
}

/**
 * Hyphenation ladder specimen: one narrow justified column whose breaks stack into
 * a staircase down the flush right edge, and the same copy with the runs capped at
 * two. The count beside it is measured off the lines as they landed, by asking
 * every permitted break point whether the engine drew a hyphen there, so the
 * specimen can never claim a ladder it did not actually get.
 *
 * The subject is the text column, which is what the term names: a ladder is a
 * property of several lines at once, and no narrower element is it. The picker,
 * the read-out and the caption are the demo's own instrumentation and stay in the
 * context register (SPEC §5). One of the two states is the fix rather than the
 * term, so the honest condition is declared in `data-pose` and the specimen mounts
 * laddered (SPEC §6).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Down the right edge</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Hyphen limit" data-term="default" data-value="default">
            <button class="sp-segment" data-part="seg-default" value="default">default</button>
            <button class="sp-segment" data-part="seg-limited" value="limited">limit 2</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 18px; align-items: flex-start; margin-top: 10px">
          <div style="flex: 0 0 auto; width: ${MEASURE}px; height: ${SLOT}px">
            <p data-part="column" data-subject data-mode="default" data-pose="[data-laddered]"
               style="margin: 0; font-size: ${SIZE}px; line-height: ${LINE}px; text-align: justify; hyphens: manual"></p>
          </div>
          <div class="sp-stack sp-context" data-part="readout" style="flex: 1 1 auto; gap: 2px">
            <span class="sp-label">longest run of hyphenated lines</span>
            <span data-part="rungs" style="font-size: 22px; font-weight: 600; font-variant-numeric: tabular-nums"></span>
            <span class="sp-text" data-stage-verdict data-part="note" style="font-size: 12px"></span>
            <p class="sp-text" data-part="caption" style="margin: 10px 0 0">
              Every break is a real one and no line is too long. The property that caps the stack is
              hyphenate-limit-lines, support for it is thin, so the second setting withholds the third
              break itself.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  const column = part(root, 'column');
  const rungsRead = part(root, 'rungs');
  const note = part(root, 'note');
  let mode = 'default';

  /**
   * Set the copy, then ask each surviving break point whether the engine used it: a
   * soft hyphen it passed over draws nothing, and one it broke at draws a hyphen
   * with a box of its own. Text is not a transitioned property, so the reading may
   * be taken in the same tick as the write (AGENTS.md).
   */
  const layout = (disabled: ReadonlySet<number>): Rung[] => {
    const { text, points } = build(disabled);
    column.textContent = text;
    const node = column.firstChild;
    if (!(node instanceof Text)) return [];
    const range = (column.ownerDocument ?? document).createRange();
    const boxes = (index: number) => {
      range.setStart(node, index);
      range.setEnd(node, Math.min(index + 1, text.length));
      return [...range.getClientRects()];
    };
    const base = boxes(0)[0]?.top ?? 0;
    const rungs: Rung[] = [];
    for (const point of points) {
      const drawn = boxes(point.at).find((box) => box.width > 0.5);
      if (drawn) rungs.push({ line: Math.round((drawn.top - base) / LINE), source: point.source });
    }
    return rungs.sort((a, b) => a.line - b.line);
  };

  const apply = (value: string) => {
    if (value !== 'default' && value !== 'limited') return;
    mode = value;
    const disabled = new Set<number>();
    let rungs = layout(disabled);
    if (value === 'limited') {
      for (let pass = 0; pass < 12; pass++) {
        const refused = pastCap(rungs);
        if (refused === undefined) break;
        disabled.add(refused);
        rungs = layout(disabled);
      }
    }
    const run = longestRun(rungs);
    column.dataset.mode = value;
    flag(column, 'data-laddered', run >= LADDER);
    rungsRead.textContent = run === 1 ? '1 line' : `${run} lines`;
    note.textContent = run >= LADDER ? 'three in a row is a ladder' : 'capped, and the rag still holds';
  };

  apply('default');
  // The webfont may still be arriving, and where the lines break depends on its metrics.
  clock.setTimeout(() => apply(mode), 400);
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
