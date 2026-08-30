import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * Both axes here are real, in a face that carries both. Roboto Flex ships `GRAD`
 * alongside `wght`, and this site loads the grade cut of it for this specimen, so
 * the two panes below are the browser's own answer rather than a drawing: the
 * grade pane darkens in place, the weight pane darkens and reflows.
 *
 * Nothing is measured, at mount or after. The end marker and the phrase behind it
 * sit in flow after the sample, so where they land IS the line's width, and the
 * difference between the panes is layout's own report on the difference between
 * the axes.
 */
const FACE = "'Roboto Flex Variable', system-ui, sans-serif";
const SAMPLE = 'Handgloves';
const TAIL = 'quick brown fox';

type Stop = { key: string; grade: number; wght: number; gradeRead: string; weightRead: string; verdict: string };

const STOPS: Stop[] = [
  {
    key: 'minus200',
    grade: -200,
    wght: 300,
    gradeRead: 'GRAD -200',
    weightRead: 'wght 300 Light',
    verdict: 'The grade thins the strokes and its marker has not moved. The lighter weight narrows every glyph and pulls its marker left.',
  },
  {
    key: 'zero',
    grade: 0,
    wght: 400,
    gradeRead: 'GRAD 0',
    weightRead: 'wght 400 Regular',
    verdict: 'Both lines are at the family’s own setting, so the two markers start level.',
  },
  {
    key: 'plus150',
    grade: 150,
    wght: 700,
    gradeRead: 'GRAD 150',
    weightRead: 'wght 700 Bold',
    verdict:
      'The grade thickens the strokes and its marker has not moved. The heavier weight widens every glyph and pushes its marker right.',
  },
];

const BASE = STOPS[1] as Stop;

/**
 * Grade specimen: one line darkened twice, once along the grade axis and once
 * along the weight axis, each with an end marker and a following phrase sitting
 * in flow right behind it. The grade pick leaves both exactly where they were;
 * the weight pick pushes them along, which is the whole difference between the
 * two axes.
 *
 * The subject is the graded line (SPEC §5), the narrowest element the term names.
 * Every grade the picker reaches is an honest coordinate on the axis, so no
 * `data-pose` is needed. The weight line is the counter-example and stays in the
 * context register with the labels, the markers and the readouts.
 *
 * The pane labels and the chips print the setting and nothing else. They used to read
 * "grade: strokes only", "weight: the axis people reach for" and "GRAD 0: the family's own
 * grade", which is the article annotating its own picture; the sample line after each marker
 * is ordinary specimen filler for the same reason.
 *
 * Nothing is measured and nothing is reserved, because nothing in the grade pane
 * can move: the marker's position is layout's answer to the sample's width
 * (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const pane = (key: 'grade' | 'weight', label: string, read: string, axis: string) => `
    <div class="sp-stack${key === 'weight' ? ' sp-context' : ''}" style="gap: 6px">
      <div class="sp-row sp-row--between sp-context">
        <span class="sp-label" style="white-space: nowrap">${label}</span>
        <span class="sp-chip" data-part="read-${key}" style="cursor: default; white-space: nowrap; flex: 0 0 auto">${read}</span>
      </div>
      <div class="sp-row" data-part="line-${key}" style="gap: 8px; height: 42px; align-items: center">
        <span data-part="${key}"${key === 'grade' ? ' data-subject' : ''} data-stop="${BASE.key}"
              style="font-family: ${FACE}; font-size: 28px; line-height: 1.2; white-space: nowrap;
                     font-variation-settings: ${axis}">${SAMPLE}</span>
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
          ${pane('grade', 'Grade', BASE.gradeRead, `'GRAD' ${BASE.grade}`)}
          ${pane('weight', 'Weight', BASE.weightRead, `'wght' ${BASE.wght}`)}
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 10px">${BASE.verdict}</p>
      </div>
    </div>
  `;

  const grade = part(root, 'grade');
  const weight = part(root, 'weight');
  const readGrade = part(root, 'read-grade');
  const readWeight = part(root, 'read-weight');
  const caption = part(root, 'caption');

  const apply = (value: string) => {
    const stop = STOPS.find((s) => s.key === value);
    if (!stop) return;
    grade.dataset.stop = stop.key;
    grade.style.fontVariationSettings = `'GRAD' ${stop.grade}`;
    readGrade.textContent = stop.gradeRead;
    weight.dataset.stop = stop.key;
    weight.style.fontVariationSettings = `'wght' ${stop.wght}`;
    readWeight.textContent = stop.weightRead;
    caption.textContent = stop.verdict;
  };

  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
