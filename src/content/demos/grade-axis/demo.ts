import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * Measured in the browser before authoring: no face here carries a GRAD axis.
 * Geist Variable and Source Serif 4 Variable expose `wght` and nothing else, and
 * `font-variation-settings: 'GRAD' 150` against `'GRAD' -200` is pixel-for-pixel
 * identical in both, so a specimen built on the real axis would be two identical
 * panes. The grade here is therefore SIMULATED by stroking the outlines, which is
 * paint and cannot touch an advance width: the exact property the term is about.
 * The caption says so.
 *
 * The weight pane beside it is real: `wght` moves, and the reflow it causes is
 * the browser's own layout rather than anything this demo draws. Nothing is
 * measured, at mount or after: the end marker and the text after it sit in flow
 * behind the sample, so where they land IS the line's width.
 */
const SAMPLE = 'Handgloves';
const TAIL = 'then this follows';

type Stop = { key: string; grade: string; wght: number; stroke: string; gradeRead: string; weightRead: string };

const STOPS: Stop[] = [
  {
    key: 'minus50',
    grade: '-50',
    wght: 300,
    stroke: '0.4px var(--sp-surface)',
    gradeRead: 'GRAD -50: lighter, same widths',
    weightRead: 'wght 300: lighter and narrower',
  },
  {
    key: 'zero',
    grade: '0',
    wght: 400,
    stroke: '0 currentcolor',
    gradeRead: 'GRAD 0: the family’s own grade',
    weightRead: 'wght 400: the family’s Regular',
  },
  {
    key: 'plus150',
    grade: '150',
    wght: 700,
    stroke: '0.55px currentcolor',
    gradeRead: 'GRAD 150: darker, same widths',
    weightRead: 'wght 700: darker and wider',
  },
];

const BASE = STOPS[1] as Stop;

/**
 * Grade specimen: one line darkened twice, once along a grade axis and once along
 * the weight axis, each with an end marker and a following phrase sitting in flow
 * right behind it. The grade pick leaves both exactly where they were; the weight
 * pick pushes them along, which is the whole difference between the two axes.
 *
 * The subject is the graded line (SPEC §5), the narrowest element the term names.
 * Every grade the picker reaches is an honest coordinate on the axis, so no
 * `data-pose` is needed. The weight line is the counter-example and stays in the
 * context register with the labels, the markers and the readouts.
 *
 * Nothing is measured and nothing is reserved, because nothing in the grade pane
 * can move: the marker's position is layout's answer to the sample's width
 * (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const pane = (key: 'grade' | 'weight', label: string, read: string, style: string) => `
    <div class="sp-stack${key === 'weight' ? ' sp-context' : ''}" style="gap: 6px">
      <div class="sp-row sp-row--between sp-context">
        <span class="sp-label" style="white-space: nowrap">${label}</span>
        <span class="sp-chip" data-part="read-${key}" style="cursor: default; white-space: nowrap; flex: 0 0 auto">${read}</span>
      </div>
      <div class="sp-row" data-part="line-${key}" style="gap: 8px; height: 42px; align-items: center">
        <span data-part="${key}"${key === 'grade' ? ' data-subject' : ''} data-stop="${BASE.key}"
              style="font-size: 28px; line-height: 1.2; white-space: nowrap; ${style}">${SAMPLE}</span>
        <span data-part="mark-${key}" style="flex: 0 0 auto; width: 2px; height: 34px; background: var(--sp-accent)"></span>
        <span class="sp-text sp-context" data-part="tail-${key}" style="white-space: nowrap">${TAIL}</span>
      </div>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="GRAD" data-value="${BASE.key}">
            ${STOPS.map((stop) => `<button class="sp-segment" data-part="seg-${stop.key}" value="${stop.key}">${stop.grade}</button>`).join(
              '',
            )}
          </sp-segmented>
        </div>
        <div class="sp-stack" style="gap: 12px; margin-top: 10px">
          ${pane('grade', 'grade: strokes only', BASE.gradeRead, `-webkit-text-stroke: ${BASE.stroke}`)}
          ${pane('weight', 'weight: the axis people reach for', BASE.weightRead, `font-variation-settings: 'wght' ${BASE.wght}`)}
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 10px">
          No face here carries a GRAD axis, so the grade is drawn by stroking the outlines, which is paint and
          cannot change an advance. The weight pane is real, and the marker it pushes is the reflow.
        </p>
      </div>
    </div>
  `;

  const grade = part(root, 'grade');
  const weight = part(root, 'weight');
  const readGrade = part(root, 'read-grade');
  const readWeight = part(root, 'read-weight');

  const apply = (value: string) => {
    const stop = STOPS.find((s) => s.key === value);
    if (!stop) return;
    grade.dataset.stop = stop.key;
    grade.style.webkitTextStroke = stop.stroke;
    readGrade.textContent = stop.gradeRead;
    weight.dataset.stop = stop.key;
    weight.style.fontVariationSettings = `'wght' ${stop.wght}`;
    readWeight.textContent = stop.weightRead;
  };

  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
