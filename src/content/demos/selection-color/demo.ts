import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const NOTES: Record<string, string> = {
  selected: 'The top run was restyled by the page. The bottom one is whatever the platform hands out.',
  none: 'Nothing selected, so there is nothing to paint: the rule applies only while a range is held.',
};

const START = 'selected';

/** A branded wash that still leaves the ink on it readable, which is the whole duty of restyling. */
const WASH = 'color-mix(in oklab, var(--sp-accent) 26%, var(--sp-surface))';

const SENTENCE = (name: string, extra = '') =>
  `Selecting text used to be <span data-part="${name}" ${extra} style="padding: 0 1px; border-radius: 2px">the operating
   system's decision</span>, and now it is the page's.`;

/**
 * Selection colour specimen: the same sentence twice, once with the highlight the page
 * chose and once with the highlight the platform gives away, switched between held and
 * released as absolute states.
 *
 * The highlight is drawn rather than selected for hire, for two reasons worth stating. A
 * demo ships no stylesheet (SPEC §5), and `::selection` cannot be written inline; and a
 * real range would not survive the specimen anyway, since the next synthesized press
 * collapses any selection the page is holding. So the subject run carries the paint the
 * rule would produce, and the untouched twin carries the platform's own `Highlight` and
 * `HighlightText` system colours rather than an invented blue.
 *
 * The subject is the styled run itself, the narrowest element the term names: not the
 * paragraph it sits in, which is ordinary text, and not the card around it. Because the
 * released state is a run with no highlight at all, the subject declares the held state as
 * its pose condition, and mount satisfies it. The control, the default twin and the caption
 * stay in the context register. Both runs keep their padding in every state, so releasing
 * repaints and moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const paragraph = (markup: string) => `
    <p class="sp-prose" style="margin: 0; max-width: none; padding: 9px 10px; border-radius: var(--sp-radius);
       border: 1px solid var(--sp-line); background: var(--sp-surface); color: var(--sp-ink)">${markup}</p>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Selection" data-term="selected" data-part="segmented" data-value="${START}">
            <button class="sp-segment" data-part="seg-selected" value="selected">Held</button>
            <button class="sp-segment" data-part="seg-none" value="none">Released</button>
          </sp-segmented>
        </div>

        <div class="sp-stack" style="gap: 4px; margin-top: 12px">
          <span class="sp-label">Page styled, ::selection</span>
          ${paragraph(SENTENCE('run', 'data-subject data-pose="[data-selected]" data-selected'))}
        </div>

        <div class="sp-stack sp-context" style="gap: 4px; margin-top: 10px">
          <span class="sp-label">Untouched, the platform's own</span>
          ${paragraph(SENTENCE('default-run', 'data-selected'))}
        </div>

        <p class="sp-text sp-context" data-part="note" style="margin: 10px 0 0; min-height: 39px">&nbsp;</p>
      </div>
    </div>
  `;

  const run = part(root, 'run');
  const twin = part(root, 'default-run');
  const note = part(root, 'note');

  const hold = (mode: string) => {
    const on = mode === 'selected';
    flag(run, 'data-selected', on);
    flag(twin, 'data-selected', on);
    run.style.background = on ? WASH : 'transparent';
    run.style.color = on ? 'var(--sp-ink)' : 'inherit';
    twin.style.background = on ? 'Highlight' : 'transparent';
    twin.style.color = on ? 'HighlightText' : 'inherit';
    note.textContent = NOTES[mode] ?? '';
  };
  hold(START);

  part(root, 'segmented').addEventListener('change', (event) => hold((event as CustomEvent<string>).detail));
}
