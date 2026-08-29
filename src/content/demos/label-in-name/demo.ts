import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Naming = 'contains' | 'replaces';

type Case = { name: string; contains: boolean; answer: string };

/** The visible label never changes. Only the accessible name set on the control does. */
const VISIBLE = 'Send';

const CASES: Record<Naming, Case> = {
  contains: { name: 'Send message', contains: true, answer: '“Send” matched. The button activates.' },
  replaces: { name: 'Submit form', contains: false, answer: 'No match. Nothing here is called Send.' },
};

const CAPTION: Record<Naming, string> = {
  contains: 'Contain, not equal. The name may say more than the button does, as long as the words on the button are somewhere inside it.',
  replaces:
    'aria-label replaces the content rather than adding to it, so a well meant clarification deletes the only words the user can say.',
};

/**
 * Label in name specimen: one Send button whose visible label never changes, under a
 * segmented control that picks the accessible name it carries. A fixed spoken command reads
 * the visible word, and the button either answers it or cannot be addressed at all, which is
 * the whole of criterion 2.5.3 in one control.
 *
 * The subject is the button, the narrowest element the term names: the rule is a constraint
 * on one control's name, not on the form around it. The segmented control, the form, the
 * comparison row, the spoken command, the answer line and the caption are scenery (SPEC §5).
 * The mismatch is the pedagogical point and it is a state the subject itself passes through,
 * so the honest condition lives in `data-pose` and the mount state satisfies it: identify
 * refuses to ring a button whose name has swallowed its label, and plays on until the
 * compliant state comes round again (SPEC §6).
 *
 * The `aria-label` is really set, so the subject snapshot records what the control actually
 * claims. Each segment reaches its own naming rather than toggling (SPEC §8), every readout
 * holds a reserved height, and no timer is needed.
 */
export function mount(root: HTMLElement): void {
  const cell = (label: string, part_: string, value: string) => `
    <div class="sp-stack" style="flex: 1 1 0; min-width: 0; gap: 1px">
      <span class="sp-label" style="font-size: 9.5px">${label}</span>
      <span class="sp-text sp-text--ink" data-part="${part_}"
            style="font-size: 11.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${value}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="contains" data-axis="Accessible name" data-term="contains">
            <button class="sp-segment" data-part="seg-contains" value="contains"
                    style="padding: 5px 10px; font-size: 12px">“Send message”</button>
            <button class="sp-segment" data-part="seg-replaces" value="replaces"
                    style="padding: 5px 10px; font-size: 12px">“Submit form”</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" style="margin-top: 9px; padding: 9px 11px">
          <div class="sp-context">
            <span class="sp-heading" style="font-size: 12.5px">New message</span>
            <div class="sp-stack" style="margin-top: 7px; gap: 6px">
              <div class="sp-line" style="width: 72%"></div>
              <div class="sp-line" style="width: 48%"></div>
            </div>
          </div>
          <div class="sp-row" style="margin-top: 11px; gap: 8px">
            <button class="sp-button sp-button--ghost sp-button--sm sp-context" type="button" data-part="cancel"
                    style="font-size: 12px; cursor: default">Cancel</button>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="send" data-subject
                    data-pose="[data-name=contains]" data-name="contains" data-selected
                    aria-label="${CASES.contains.name}" style="font-size: 12px; cursor: default">${VISIBLE}</button>
          </div>
        </div>

        <div class="sp-row sp-context" style="margin-top: 9px; gap: 10px; height: 30px">
          ${cell('Visible label', 'visible', VISIBLE)}
          ${cell('Accessible name', 'aname', `“${CASES.contains.name}”`)}
          ${cell('Name contains label', 'contains', 'Yes')}
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; height: 17px; gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">The reader says “Click Send”</span>
          <span class="sp-text sp-text--ink" data-part="answer" data-ok="yes"
                style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap">${CASES.contains.answer}</span>
        </div>

        <p class="sp-text sp-context" data-part="caption" data-name="contains"
           style="margin: 7px 0 0; height: 32px; font-size: 11px">${CAPTION.contains}</p>
      </div>
    </div>
  `;

  const send = part(root, 'send');
  const aname = part(root, 'aname');
  const contains = part(root, 'contains');
  const answer = part(root, 'answer');
  const caption = part(root, 'caption');

  const apply = (naming: Naming) => {
    const spec = CASES[naming];
    send.dataset.name = naming;
    send.setAttribute('aria-label', spec.name);
    flag(send, 'data-selected', spec.contains);
    aname.textContent = `“${spec.name}”`;
    contains.dataset.ok = spec.contains ? 'yes' : 'no';
    contains.textContent = spec.contains ? 'Yes' : 'No';
    answer.dataset.ok = spec.contains ? 'yes' : 'no';
    answer.textContent = spec.answer;
    caption.dataset.name = naming;
    caption.textContent = CAPTION[naming];
  };

  apply('contains');

  part(root, 'segmented').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Naming);
  });
}
