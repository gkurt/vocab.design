import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'sensory' | 'named';

const COPY = {
  sensory: {
    instruction: 'To submit, press the round button on the right.',
    verdict: 'Without the arrangement there is nothing to resolve: no shape, no side, and no name to match against.',
  },
  named: {
    instruction: 'To submit, press Continue, the round button on the right.',
    verdict: 'The name is in the sentence and on the control, so the instruction resolves in any arrangement.',
  },
} as const satisfies Record<Mode, unknown>;

/** The three controls, in the order they are reached. */
const CONTROLS = ['Save draft', 'Continue', 'Cancel'] as const;

/**
 * Sensory characteristics specimen: one instruction over one row of controls, and the same row as it
 * arrives to a reader who does not have the arrangement. The pick is between an instruction that
 * points by shape and side and the same instruction with the control's name added, and the claim is
 * what each one resolves to in the second column.
 *
 * The subject is the instruction line: the failure is in the copy, not in the controls, which are
 * perfectly good buttons either way. The screen, the linearized list, the match ring, the verdict and
 * the picker are scenery (SPEC §5). Adding the name is a counter-example the subject itself passes
 * through, so the honest condition is declared in `data-pose` and the mount state satisfies it
 * (SPEC §6).
 *
 * Both instructions are held in one reserved box sized for the longer of them, so a pick moves
 * nothing (SPEC §5). No timers: each state is reached by a pick.
 */
export function mount(root: HTMLElement): void {
  const nameRow = (label: string, index: number) => `
    <div class="sp-row" data-part="name-${index + 1}"
         style="gap: 6px; height: 22px; padding: 0 7px; border-radius: 5px; background: var(--sp-sunken);
                outline-offset: 2px">
      <span class="sp-label" style="flex: 0 0 auto; font-size: 9.5px">${index + 1}</span>
      <span class="sp-text sp-text--ink" style="flex: 1 1 auto; min-width: 0; font-size: 11px">${label}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 11px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Help copy, one claim form</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="sensory" data-axis="Refers by" data-term="sensory" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-sensory" value="sensory"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Shape and side</button>
            <button class="sp-segment" type="button" data-part="seg-named" value="named"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Named</button>
          </sp-segmented>
        </div>

        <p class="sp-text sp-text--ink" data-part="instruction" data-mode="sensory" data-subject
           data-pose="[data-mode=sensory]"
           style="margin: 9px 0 0; height: 32px; padding: 6px 10px; border-radius: 6px;
                  background: var(--sp-accent-soft); font-size: 12px; line-height: 1.4;
                  white-space: nowrap; overflow: hidden">${COPY.sensory.instruction}</p>

        <div class="sp-row" style="align-items: stretch; gap: 12px; margin-top: 9px">
          <div class="sp-surface sp-context" style="flex: 0 0 auto; width: 238px; height: 114px; padding: 9px 10px">
            <span class="sp-label" style="font-size: 10px">As drawn</span>
            <div class="sp-row" style="gap: 8px; margin-top: 9px">
              <button class="sp-button sp-button--ghost sp-button--sm" type="button"
                      style="flex: 0 0 auto; font-size: 11px; white-space: nowrap">Save draft</button>
              <button class="sp-button sp-button--ghost sp-button--sm" type="button"
                      style="flex: 0 0 auto; font-size: 11px; white-space: nowrap">Cancel</button>
              <button class="sp-button sp-button--sm" type="button" data-part="drawn"
                      style="flex: 0 0 auto; border-radius: 999px; font-size: 11px; white-space: nowrap;
                             outline: 2px solid var(--sp-accent); outline-offset: 3px">Continue</button>
            </div>
            <p class="sp-text" style="margin: 9px 0 0; font-size: 10px; line-height: 1.3">
              Round, primary, last in the row. A reader who can see the row has three cues to go on.</p>
          </div>

          <div class="sp-surface sp-context" style="flex: 1 1 auto; min-width: 0; height: 114px; padding: 9px 10px">
            <span class="sp-label" style="font-size: 10px">As it arrives, in order</span>
            <div class="sp-stack" style="gap: 4px; margin-top: 7px">
              ${CONTROLS.map(nameRow).join('')}
            </div>
          </div>
        </div>

                  <p class="sp-text" data-stage-verdict data-part="verdict" data-mode="sensory"
             style="flex: 1 1 auto; min-width: 0; margin: 0; font-size: 11px; line-height: 1.35">${COPY.sensory.verdict}</p>
        
      </div>
    </div>
  `;

  const instruction = part(root, 'instruction');
  const verdict = part(root, 'verdict');
  const match = part(root, 'name-2');

  part(root, 'mode').addEventListener('change', (event) => {
    const mode = (event as CustomEvent<string>).detail as Mode;
    instruction.dataset.mode = mode;
    instruction.textContent = COPY[mode].instruction;
    verdict.dataset.mode = mode;
    verdict.textContent = COPY[mode].verdict;
    // The named instruction reaches exactly one of the three, which is the whole difference.
    flag(match, 'data-matched', mode === 'named');
    match.style.outline = mode === 'named' ? '2px solid var(--sp-accent)' : 'none';
  });
}
