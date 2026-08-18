import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Flow = 'retype' | 'carried';

const FIELDS = [
  { key: 'street', label: 'Street', value: '12 Ash Lane' },
  { key: 'city', label: 'City', value: 'Sheffield' },
  { key: 'postcode', label: 'Postcode', value: 'S1 4QP' },
];

const CAPTION: Record<Flow, string> = {
  retype:
    'The delivery address is the billing address, and the process asks for all of it again. Criterion 3.3.7 is Level A, so this is not a refinement.',
  carried:
    'One control offers what the process already holds. Prefilling the fields outright satisfies the criterion just as well: it asks for either.',
};

const ROW = 'display: flex; align-items: center; gap: 8px; height: 24px';
const LABEL = 'flex: 0 0 54px; font-size: 10.5px';
const INPUT = 'flex: 1 1 auto; min-width: 0; font-size: 11.5px; padding: 3px 8px; height: 24px';

/**
 * Redundant entry specimen: a two step checkout whose first step is already answered, with a
 * segmented control deciding whether the second step asks for the same address again or offers
 * what the process already holds. A read-out counts the fields the reader had to retype.
 *
 * The subject is the second step's first field, the narrowest element the term names: the
 * criterion is about the field that asks a second time, not about the form around it. The picker,
 * the completed first step, the panel headings, the read-out and the caption are scenery
 * (SPEC §5). The field is honestly the term in both flows, since it is the field the rule is
 * measured at whether or not the rule is kept, so it needs no `data-pose`.
 *
 * The offer control has an explicit press and no toggling counterpart (SPEC §8), and choosing a
 * flow empties every field and resets the counter, so a pass joined halfway counts from zero. The
 * control's row keeps its height in both flows, so taking the offer away moves nothing (SPEC §5).
 * No timer is needed.
 */
export function mount(root: HTMLElement): void {
  const given = FIELDS.map(
    ({ key, label, value }) => `
      <div style="${ROW}">
        <span class="sp-label" style="${LABEL}">${label}</span>
        <span class="sp-text sp-text--ink" data-part="given-${key}" style="flex: 1 1 auto; min-width: 0; font-size: 11.5px">${value}</span>
      </div>`,
  ).join('');

  const asked = FIELDS.map(
    ({ key, label }, index) => `
      <div style="${ROW}">
        <span class="sp-label sp-context" style="${LABEL}">${label}</span>
        <input class="sp-input" data-part="${key}" ${index === 0 ? 'data-subject' : ''} aria-label="${label}" style="${INPUT}" />
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 10px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">This checkout</span>
          <sp-segmented class="sp-segmented" data-part="flow" data-value="carried">
            <button class="sp-segment" type="button" data-part="seg-retype" value="retype"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Asks again</button>
            <button class="sp-segment" type="button" data-part="seg-carried" value="carried"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Carries it forward</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="margin-top: 8px; height: 158px; gap: 10px; align-items: stretch">
          <div class="sp-surface sp-context" data-part="step-one"
               style="flex: 1 1 0; min-width: 0; padding: 10px; display: flex; flex-direction: column; gap: 8px;
                      background: var(--sp-sunken)">
            <span class="sp-label" style="font-size: 9.5px">Step 1 of 2, billing address</span>
            <div style="height: 26px; display: flex; align-items: center">
              <span class="sp-text" style="font-size: 10.5px">Answered on the previous screen</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 6px">${given}</div>
          </div>

          <div class="sp-surface" data-part="step-two"
               style="flex: 1 1 0; min-width: 0; padding: 10px; display: flex; flex-direction: column; gap: 8px">
            <span class="sp-label sp-context" style="font-size: 9.5px">Step 2 of 2, delivery address</span>
            <div style="height: 26px; display: flex; align-items: center">
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="use-billing"
                      style="font-size: 11px; padding: 3px 9px">Use the billing address</button>
            </div>
            <div style="display: flex; flex-direction: column; gap: 6px">${asked}</div>
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 8px; height: 16px; gap: 10px">
          <span class="sp-label" data-part="count" data-n="0" style="flex: 0 0 auto; font-size: 10.5px">Fields retyped: 0 of 3</span>
          <span class="sp-label" data-part="offer" data-flow="carried" style="flex: 0 0 auto; font-size: 10.5px">Available to select: yes</span>
        </div>

        <p class="sp-text sp-context" data-part="caption" data-flow="carried"
           style="margin: 8px 0 0; height: 30px; font-size: 10.5px; line-height: 1.35">${CAPTION.carried}</p>
      </div>
    </div>
  `;

  const inputs = FIELDS.map(({ key, value }) => ({ key, value, el: part(root, key) as HTMLInputElement }));
  const useBilling = part(root, 'use-billing');
  const count = part(root, 'count');
  const offer = part(root, 'offer');
  const caption = part(root, 'caption');
  const retyped = new Set<string>();

  const paintCount = () => {
    count.dataset.n = String(retyped.size);
    count.textContent = `Fields retyped: ${retyped.size} of ${FIELDS.length}`;
  };

  const apply = (next: Flow) => {
    retyped.clear();
    for (const { el } of inputs) {
      el.value = '';
      flag(el, 'data-filled', false);
    }
    flag(useBilling, 'hidden', next === 'retype');
    offer.dataset.flow = next;
    offer.textContent = next === 'retype' ? 'Available to select: no' : 'Available to select: yes';
    caption.dataset.flow = next;
    caption.textContent = CAPTION[next];
    paintCount();
  };

  apply('carried');

  // Taking the offer writes the values without an input event, which is the whole claim: nothing
  // was retyped, so the counter does not move.
  useBilling.addEventListener('click', () => {
    for (const { el, value } of inputs) {
      el.value = value;
      flag(el, 'data-filled', true);
    }
  });

  for (const { key, el } of inputs) {
    el.addEventListener('input', () => {
      if (el.value.length > 0) retyped.add(key);
      else retyped.delete(key);
      flag(el, 'data-filled', el.value.length > 0);
      paintCount();
    });
  }

  part(root, 'flow').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Flow);
  });
}
