import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'tricked' | 'plain';

const WORDING: Record<Mode, string> = {
  tricked: 'Untick this box to not stop receiving partner emails.',
  plain: 'Send me partner emails.',
};

const EFFECT: Record<Mode, Record<'on' | 'off', string>> = {
  tricked: {
    on: 'Partner emails: on. The line offers unticking as the way to keep them.',
    off: 'Partner emails: off. Unticking stopped them, which is the opposite of what the line said.',
  },
  plain: {
    on: 'Partner emails: on. The line and the box agree.',
    off: 'Partner emails: off. Unticking stopped them, exactly as written.',
  },
};

const NOTE: Record<Mode, string> = {
  tricked:
    'Two negatives in one line, and its plain reading is the opposite of what the box does. The checkbox is ordinary; the sentence is the trick.',
  plain: 'The same box, the same starting state, the same click. Only the sentence changed, and now it describes what happens.',
};

/**
 * Trick wording specimen: one preference row, one boolean, two sentences for it. The click
 * is identical in both states and so is the outcome; what changes is whether the label
 * predicted it.
 *
 * The subject is the label carrying the wording, not the checkbox beside it and not the
 * preferences panel around it, because the term names the sentence. The plain wording is a
 * state in which the subject is not the term, so the tricked condition is declared in
 * `data-pose` and the specimen mounts tricked: identify refuses to ring the honest sentence
 * and summons this state instead (SPEC §6). The other two rows, the effect readout, the
 * caption and the mode picker are scenery (SPEC §5).
 *
 * The label sits in a row of fixed height with room for the longer sentence on one line, so
 * swapping wordings moves nothing (SPEC §5). Picking a mode always resets the box to ticked,
 * so the click that follows is the same click in both states rather than one that depends on
 * what it finds (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const quietRow = (label: string, checked: boolean) => `
    <div class="sp-row sp-context" style="gap: 10px; height: 30px">
      <span class="sp-checkbox" role="img" aria-label="${checked ? 'ticked' : 'unticked'}" ${checked ? 'data-checked' : ''}></span>
      <span style="font-size: 12px">${label}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 274px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Membership, step 3 of 3</span>
          <sp-segmented class="sp-segmented" data-part="mode" data-value="tricked" data-axis="Version" data-term="tricked" style="flex: 0 0 auto">
            <button class="sp-segment" data-part="mode-tricked" type="button" value="tricked" style="padding: 4px 9px; font-size: 12px">As shipped</button>
            <button class="sp-segment" data-part="mode-plain" type="button" value="plain" style="padding: 4px 9px; font-size: 12px">Made fair</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface" style="padding: 8px 12px; background: var(--sp-surface)">
            ${quietRow('Email me my order receipts.', true)}
            <div class="sp-row" data-part="row" style="gap: 10px; height: 34px; cursor: pointer">
              <button
                class="sp-checkbox"
                data-part="box"
                type="button"
                role="checkbox"
                aria-checked="true"
                aria-label="Partner emails"
                style="flex: 0 0 auto"
              ></button>
              <span
                data-part="label"
                data-subject
                data-pose="[data-mode=tricked]"
                data-mode="tricked"
                style="width: 372px; font-size: 12px; white-space: nowrap"
              >${WORDING.tricked}</span>
            </div>
            ${quietRow('Show my name on reviews I write.', false)}
          </div>

          <div class="sp-surface sp-context" data-part="effect" data-emails="on" style="height: 66px; padding: 9px 11px">
            <span class="sp-label" style="font-size: 10px">What you will actually get</span>
            <span class="sp-text sp-text--ink" data-part="effect-text" style="display: block; margin-top: 2px; font-size: 11px">${EFFECT.tricked.on}</span>
          </div>
        </div>
      </div>
      <span class="sp-text sp-context" data-part="note" style="width: 452px; height: 32px; font-size: 11px; line-height: 1.35">${NOTE.tricked}</span>
    </div>
  `;

  const box = part(root, 'box');
  const label = part(root, 'label');
  const effect = part(root, 'effect');
  const effectText = part(root, 'effect-text');
  const note = part(root, 'note');

  let mode: Mode = 'tricked';

  const render = (ticked: boolean) => {
    box.setAttribute('aria-checked', String(ticked));
    const state = ticked ? 'on' : 'off';
    effect.dataset.emails = state;
    effectText.textContent = EFFECT[mode][state];
  };

  // One handler on the row, so the checkbox and its sentence answer the same click without
  // either of them re-dispatching anything.
  part(root, 'row').addEventListener('click', () => {
    render(box.getAttribute('aria-checked') !== 'true');
  });

  part(root, 'mode').addEventListener('change', (event) => {
    mode = (event as CustomEvent<string>).detail === 'plain' ? 'plain' : 'tricked';
    label.dataset.mode = mode;
    label.textContent = WORDING[mode];
    note.textContent = NOTE[mode];
    // Both wordings are judged from the same starting state, so the pick resets the box.
    render(true);
  });
}
