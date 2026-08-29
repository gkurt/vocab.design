import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Which = 'default' | 'authored';

type Strings = { verb: string; helper: string; failure: string; caption: string };

/**
 * Three positions an interface keeps its shortest strings in (the verb on a button,
 * the line under a field, the sentence when something fails), with the same screen
 * shown twice: the strings a control ships with, and strings somebody wrote.
 *
 * The subject is ONE of the three, the verb on the button, which is the instance the
 * definition leads with. The three lines are peer instances of the term rather than a
 * feature of the scene, so the ring stays on one of them instead of climbing to the
 * container holding all three, which would claim the whole specimen is the term and
 * withdraw identify (SPEC §5). Both string sets are honest microcopy, since the term
 * names the class rather than its quality, so no `data-pose` is needed.
 *
 * The situ chrome (the position labels, the field, the cancel button, the caption) is
 * scenery in the context register, and the register stops at the primary button, whose
 * accent is the subject's own paint.
 *
 * Nothing may move when the strings change (SPEC §5), and only runtime knows how wide
 * "Send invite" is or how tall a wrapped line gets, so the button's width and both text
 * slots are measured once on mount against every string either will ever hold.
 */
const SETS: Record<Which, Strings> = {
  default: {
    verb: 'Submit',
    helper: 'Enter value',
    failure: 'Invalid input',
    caption:
      'What a control says when nobody wrote it. Every one of these is correct, generic, and read on every single visit to the screen.',
  },
  authored: {
    verb: 'Send invite',
    helper: 'They get a link that works for 7 days.',
    failure: 'That address is missing the part after the @.',
    caption:
      'The verb names what happens, the line states the rule before it is broken, and the failure says what to do next. Same screen, same components.',
  },
};

export function mount(root: HTMLElement): void {
  const situ = (label: string, body: string, align = 'center') => `
    <div class="sp-row" style="gap: 10px; align-items: ${align}">
      <span class="sp-label sp-context" style="flex: 0 0 94px; font-size: 11px; white-space: nowrap">${label}</span>
      <div class="sp-surface sp-grow" style="padding: 8px 9px">${body}</div>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 456px; padding: 11px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="default" data-axis="Strings">
            <button class="sp-segment" data-part="seg-default" value="default"
                    style="padding: 5px 10px; font-size: 12px; white-space: nowrap">The defaults</button>
            <button class="sp-segment" data-part="seg-authored" value="authored"
                    style="padding: 5px 10px; font-size: 12px; white-space: nowrap">Written</button>
          </sp-segmented>
        </div>

        <div class="sp-stack" style="margin-top: 9px; gap: 8px">
          ${situ(
            'On the button',
            `<div class="sp-row" style="justify-content: flex-end; gap: 8px">
               <button class="sp-button sp-button--quiet sp-button--sm sp-context" type="button">Cancel</button>
               <button class="sp-button sp-button--sm" data-part="action" type="button">
                 <span data-part="verb" data-subject data-set="default">${SETS.default.verb}</span>
               </button>
             </div>`,
          )}
          ${situ(
            'Under the field',
            `<div class="sp-field sp-context" style="gap: 3px">
               <label class="sp-label" for="mc-team" style="font-size: 11px">Team name</label>
               <input class="sp-input" id="mc-team" type="text" value="Northwind" readonly
                      style="font-size: 12px; padding: 4px 8px" />
             </div>
             <div data-part="slot-helper" style="padding-top: 4px">
               <span class="sp-text" data-part="helper" data-set="default"
                     style="display: block; font-size: 11.5px">${SETS.default.helper}</span>
             </div>`,
            'flex-start',
          )}
          ${situ(
            'When it fails',
            `<div data-part="slot-failure">
               <span class="sp-text sp-text--ink" data-part="failure" data-set="default" role="status"
                     style="display: block; font-size: 11.5px">${SETS.default.failure}</span>
             </div>`,
          )}
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-set="default"
           style="margin: 9px 0 0; height: 34px; font-size: 11px">${SETS.default.caption}</p>
      </div>
    </div>
  `;

  const action = part(root, 'action');
  const verb = part(root, 'verb');
  const helper = part(root, 'helper');
  const failure = part(root, 'failure');
  const caption = part(root, 'caption');
  const slotHelper = part(root, 'slot-helper');
  const slotFailure = part(root, 'slot-failure');

  const reserve = (line: HTMLElement, slot: HTMLElement, pick: (set: Strings) => string) => {
    let tallest = 0;
    for (const set of Object.values(SETS)) {
      line.textContent = pick(set);
      tallest = Math.max(tallest, slot.offsetHeight);
    }
    slot.style.height = `${tallest}px`;
  };

  let widest = 0;
  for (const set of Object.values(SETS)) {
    verb.textContent = set.verb;
    widest = Math.max(widest, action.offsetWidth);
  }
  action.style.minWidth = `${widest}px`;

  reserve(helper, slotHelper, (set) => set.helper);
  reserve(failure, slotFailure, (set) => set.failure);

  const apply = (which: Which) => {
    const set = SETS[which];
    for (const [el, text] of [
      [verb, set.verb],
      [helper, set.helper],
      [failure, set.failure],
      [caption, set.caption],
    ] as const) {
      el.dataset.set = which;
      el.textContent = text;
    }
  };

  apply('default');

  part(root, 'segmented').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Which);
  });
}
