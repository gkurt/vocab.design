/*
 * One serif at one size for the whole specimen, written as a local stack for
 * the reason every type specimen is: the kit has one sans on purpose (SPEC §5),
 * and a mark whose width is the argument cannot be shown in it. The serif is
 * chosen because its dashes carry side bearings a reader can see.
 */
const FACE = "Georgia, 'Liberation Serif', 'Nimbus Roman', serif";
const TEXT = 19;
const GLYPH = 28;
const ROW = 28;

type Job = { part: string; label: string; line: string };

const JOBS: Job[] = [
  { part: 'job-range', label: 'range', line: '2019–2024, pages 44–51' },
  { part: 'job-score', label: 'score', line: 'the vote came in 51–49' },
  { part: 'job-link', label: 'connection', line: 'the London–Paris route' },
];

/* The em dash is named here rather than spelled: it is written as an entity so
   the glyph appears only where it is set, never in this file's own text. */
const MARKS = [
  { part: 'mark-hyphen', name: 'hyphen', glyph: '-', code: 'U+002D' },
  { part: 'mark-en', name: 'en dash', glyph: '–', code: 'U+2013' },
  { part: 'mark-em', name: 'em dash', glyph: '&mdash;', code: 'U+2014' },
];

/**
 * En dash specimen: the three jobs the mark actually does, one to a line, with
 * the job names ruled off to the left, and a width row underneath that sets the
 * family side by side. Each mark in that row sits on a tinted ground covering
 * exactly its advance width, so the widths are the font's measurement rather
 * than a bar the demo drew.
 *
 * The subject is the block of usage lines, not one dash inside them. The
 * neighbouring em-dash specimen already rings a single glyph, because there the
 * mark's width is the term; here the term is what the mark is for, and no
 * single character shows a range, a score, and a relation at once. The labels
 * beside the lines, the width row, and the heading are scenery (SPEC §5).
 *
 * Nothing changes state: the comparison is the demonstration.
 */
export function mount(root: HTMLElement): void {
  const labels = JOBS.map((job) => `<span class="sp-label" style="height: ${ROW}px; line-height: ${ROW}px">${job.label}</span>`).join('');

  const lines = JOBS.map(
    (job) => `
      <span data-part="${job.part}"
            style="height: ${ROW}px; line-height: ${ROW}px; white-space: nowrap;
                   font-family: ${FACE}; font-size: ${TEXT}px">${job.line}</span>`,
  ).join('');

  const marks = MARKS.map(
    (mark) => `
      <div class="sp-stack" data-part="${mark.part}" style="gap: 2px; align-items: center; width: 108px">
        <span style="background: var(--sp-accent-soft); font-family: ${FACE}; font-size: ${GLYPH}px; line-height: 1.1">${mark.glyph}</span>
        <span class="sp-label">${mark.name}</span>
        <span class="sp-label" style="font-size: 11px">${mark.code}</span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Three jobs for the middle dash</span>
          <span class="sp-label">U+2013</span>
        </div>
        <div class="sp-row" style="gap: 16px; margin-top: 12px; align-items: flex-start">
          <div class="sp-stack sp-context" data-part="jobs-labels" style="gap: 6px; width: 96px">${labels}</div>
          <div class="sp-stack" data-part="jobs" data-subject style="gap: 6px">${lines}</div>
        </div>
        <div class="sp-divider sp-context" style="margin: 14px 0"></div>
        <div class="sp-row sp-context" data-part="widths" style="gap: 4px; justify-content: center">${marks}</div>
        <p class="sp-text sp-context" data-part="caption" style="margin-top: 12px">
          A hyphen joins, an en dash spans, and the longest mark breaks a sentence open. Reaching for the
          hyphen in a range is the common slip, and it reads as one compound word rather than as two ends.
        </p>
      </div>
    </div>
  `;
}
