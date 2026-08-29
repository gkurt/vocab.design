import { part, partsOf } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import { displayScale } from '#src/kit/measure.ts';

/*
 * A local serif, not the kit's web font. The trace is measured from the lines as
 * the browser actually broke them, and a face still arriving would rebreak the
 * column a frame after that measurement and leave the channel drawn beside the
 * gaps it was drawn from.
 */
const FAMILY = "Georgia, 'Liberation Serif', 'Nimbus Roman', 'DejaVu Serif', serif";

/* Soft hyphens (U+00AD) mark the permitted breaks, so the hyphenated column
   holds up on a browser with no dictionary for the declared language:
   `hyphens: auto` honours them as well as its own dictionary, `hyphens: none`
   ignores both. Both columns carry the same text; the property is the only
   difference between them. */
const S = '­';
const BODY =
  `Justi${S}fied at a nar${S}row meas${S}ure, the word spaces stretch until every line reaches ` +
  `the mar${S}gin, and where those stretched gaps hap${S}pen to fall near the same place on ` +
  `line after line the eye joins them into a chan${S}nel of white run${S}ning down the col${S}umn.`;

const COLUMN = 152;
const LINE_PX = 17;
/** The room the unhyphenated setting takes, held by both wells so a rebreak moves nothing. */
const LINES = 10;
/** How much two stretched gaps must share horizontally before the eye joins them. */
const MIN_OVERLAP = 2;
/** Two aligned gaps are a coincidence; three in a row are a channel. */
const MIN_RUN = 3;

type Gap = { left: number; right: number; line: number };

/**
 * Every stretched word space in a column, grouped into the lines it fell on.
 * Ranges are read straight after the markup is written and before anything is
 * styled, so the measurement is of the mounted state (SPEC §5).
 */
function gapsByLine(column: HTMLElement): Gap[][] {
  const node = column.firstChild;
  if (!(node instanceof Text)) return [];
  const origin = column.getBoundingClientRect();
  // A range's rect is in the card's pixels, and LINE_PX and the gaps drawn from these
  // are in the specimen's, which a listing preview shows at half size.
  const scale = displayScale(column);
  const range = document.createRange();
  const rows = new Map<number, Gap[]>();
  for (let i = 0; i < node.data.length; i++) {
    if (node.data[i] !== ' ') continue;
    range.setStart(node, i);
    range.setEnd(node, i + 1);
    const rect = range.getBoundingClientRect();
    // A space that fell at a line break collapses to nothing and is not a gap.
    if (rect.width < 2 * scale) continue;
    const line = Math.round((rect.top - origin.top) / scale / LINE_PX);
    const row = rows.get(line) ?? [];
    row.push({ left: (rect.left - origin.left) / scale, right: (rect.right - origin.left) / scale, line });
    rows.set(line, row);
  }
  return [...rows.keys()].sort((a, b) => a - b).map((line) => rows.get(line) ?? []);
}

/**
 * The longest run of gaps that overlap from one line to the next, which is what
 * a reader's eye joins into a channel. Only consecutive lines can extend a run,
 * so each line is chained against the line immediately above it.
 */
function longestChannel(lines: Gap[][]): Gap[] {
  let best: Gap[] = [];
  let above: { gap: Gap; run: Gap[] }[] = [];
  for (const line of lines) {
    const here = line.map((gap) => {
      let run = [gap];
      for (const prev of above) {
        if (prev.gap.line !== gap.line - 1) continue;
        const overlap = Math.min(prev.gap.right, gap.right) - Math.max(prev.gap.left, gap.left);
        if (overlap >= MIN_OVERLAP && prev.run.length + 1 > run.length) run = [...prev.run, gap];
      }
      return { gap, run };
    });
    for (const candidate of here) if (candidate.run.length > best.length) best = candidate.run;
    above = here;
  }
  return best;
}

/**
 * River specimen: one paragraph set twice at the same narrow measure, justified
 * both times, with hyphenation the only difference. The left column has nowhere
 * to put the stretch but the word spaces, and they line up; the right column has
 * break points inside the long words and the gaps even out.
 *
 * The channel is found rather than drawn: every stretched space is measured
 * where the browser actually put it, the overlapping ones are chained line by
 * line, and the longest run is what the trace covers. Both columns are read the
 * same way and both report what was found, so the specimen cannot claim a river
 * the setting does not have.
 *
 * The subject is the trace over the left column, sized to the channel it found.
 * A river is a thing a paragraph has, which is the wrong test for a subject: the
 * term names the channel of white, so the ring goes on the element drawing that
 * channel and not on the column it runs down. The hyphenated twin, the trace
 * control and the readouts are scenery.
 */
export function mount(root: HTMLElement): void {
  const well = (name: string, hyphens: string, subject: boolean) => `
    <div class="sp-stack" style="gap: 4px">
      <span class="sp-label sp-context">hyphens: ${hyphens}</span>
      <div style="position: relative; width: ${COLUMN}px; height: ${LINE_PX * LINES}px">
        <div data-part="trace-${name}"${subject ? ' data-subject' : ''}
             style="position: absolute; left: 0; top: 0; width: ${COLUMN}px; height: ${LINE_PX * LINES}px;
             pointer-events: none; transition: opacity 0.2s, visibility 0.2s"></div>
        <p class="sp-text sp-text--ink" data-part="${name}" lang="en"
           style="position: relative; margin: 0; font-family: ${FAMILY}; font-size: 12px; line-height: ${LINE_PX}px;
                  text-align: justify; -webkit-hyphens: ${hyphens}; hyphens: ${hyphens}">${BODY}</p>
      </div>
      <span class="sp-label sp-context" data-part="readout-${name}" style="width: ${COLUMN}px; height: 16px"></span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 400px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Trace the channel</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Trace" data-part="segmented" data-value="on">
            <button class="sp-segment" data-part="seg-off" value="off">off</button>
            <button class="sp-segment" data-part="seg-on" value="on">on</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 16px; margin-top: 10px; align-items: flex-start">
          ${well('rivered', 'none', true)}
          ${well('fixed', 'auto', false)}
        </div>
      </div>
    </div>
  `;

  for (const name of ['rivered', 'fixed']) {
    const column = part(root, name);
    const run = longestChannel(gapsByLine(column));
    const trace = part(root, `trace-${name}`);
    if (run.length >= MIN_RUN) {
      // The trace is pulled in to the channel's own extent, so the element drawing the
      // river is the size of the river and identify rings the channel, not the column.
      const left = Math.min(...run.map((gap) => gap.left));
      const right = Math.max(...run.map((gap) => gap.right));
      const top = Math.min(...run.map((gap) => gap.line)) * LINE_PX;
      const bottom = (Math.max(...run.map((gap) => gap.line)) + 1) * LINE_PX;
      trace.style.left = `${left}px`;
      trace.style.top = `${top}px`;
      trace.style.width = `${right - left}px`;
      trace.style.height = `${bottom - top}px`;
      trace.innerHTML = run
        .map(
          (gap) => `<span style="position: absolute; left: ${gap.left - left}px; top: ${gap.line * LINE_PX - top}px;
                    width: ${gap.right - gap.left}px; height: ${LINE_PX}px;
                    background: color-mix(in oklab, var(--sp-accent) 24%, transparent)"></span>`,
        )
        .join('');
    }
    part(root, `readout-${name}`).textContent = run.length >= MIN_RUN ? `a channel ${run.length} lines deep` : 'no channel found';
  }

  const apply = (value: string) => {
    if (value !== 'on' && value !== 'off') return;
    for (const trace of partsOf(root, 'trace-rivered').concat(partsOf(root, 'trace-fixed'))) {
      trace.dataset.state = value;
      trace.style.opacity = value === 'on' ? '1' : '0';
      trace.style.visibility = value === 'on' ? 'visible' : 'hidden';
    }
  };

  apply('on');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
