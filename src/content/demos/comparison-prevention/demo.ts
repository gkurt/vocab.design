import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'prevented' | 'comparable';

interface Plan {
  key: string;
  name: string;
  price: string;
  billing: string;
  rows: [string, string, string];
}

const PLANS: Record<Mode, Plan[]> = {
  prevented: [
    { key: 'starter', name: 'Starter', price: '£7 / month', billing: 'monthly', rows: ['Up to 3 seats', 'Basic exports', 'Email support'] },
    { key: 'team', name: 'Team', price: '£84 / year', billing: 'yearly', rows: ['Reporting suite', 'Fair-use seats', 'Priority queue'] },
    {
      key: 'scale',
      name: 'Scale',
      price: 'Talk to us',
      billing: 'quoted',
      rows: ['Everything in Team', 'Full list on request', 'Terms apply'],
    },
  ],
  comparable: [
    { key: 'starter', name: 'Starter', price: '£7 / month', billing: 'monthly', rows: ['Seats: 3', 'Exports: CSV', 'Support: email'] },
    { key: 'team', name: 'Team', price: '£19 / month', billing: 'monthly', rows: ['Seats: 20', 'Exports: CSV, API', 'Support: email'] },
    {
      key: 'scale',
      name: 'Scale',
      price: '£49 / month',
      billing: 'monthly',
      rows: ['Seats: unlimited', 'Exports: CSV, API', 'Support: phone'],
    },
  ],
};

const VERDICT: Record<Mode, { answer: string; text: string }> = {
  prevented: { answer: 'unknown', text: 'Cheapest per seat per month: not answerable from this page.' },
  comparable: { answer: 'team', text: 'Cheapest per seat per month: Team, at 95p. Read straight across.' },
};

const NOTE: Record<Mode, string> = {
  prevented: 'Nothing here is false. One price is yearly, one is a phone call, and no two feature rows measure the same thing.',
  comparable: 'Same three plans, one billing period, the same three rows in the same order. Now the columns can be read across.',
};

/**
 * Comparison prevention specimen: one pricing page arranged two ways. The prevented
 * arrangement mixes billing periods, names each plan's features differently, and puts one
 * plan's detail behind a request, so the question underneath ("which is cheapest per seat")
 * has no answer on the page. The comparable arrangement changes no plan and no price, only
 * the units, the wording and the order.
 *
 * The subject is the plan set as one element rather than any single plan, because the
 * prevention is a property of the arrangement: every column here is individually truthful,
 * and a ring around one of them would identify a price rather than the term. The comparable
 * arrangement is a state in which the subject stops being the term, so that condition is
 * declared in `data-pose` and the specimen mounts prevented (SPEC §6). The verdict line,
 * the mode picker and the caption are scenery (SPEC §5).
 *
 * The three columns and every row inside them keep fixed boxes across both modes, so
 * switching arrangements rewrites text and moves nothing (SPEC §5). Each segment reaches its
 * own named arrangement rather than flipping the one it finds (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const column = (plan: Plan) => `
    <div
      class="sp-surface"
      data-part="plan-${plan.key}"
      data-billing="${plan.billing}"
      style="flex: 1 1 0; min-width: 0; padding: 9px 10px; background: var(--sp-surface)"
    >
      <span class="sp-heading" style="display: block; height: 17px; line-height: 17px; font-size: 12.5px">${plan.name}</span>
      <span
        data-part="price-${plan.key}"
        style="display: block; height: 20px; line-height: 20px; font-size: 12px; font-weight: 600; color: var(--sp-accent); white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
      >${plan.price}</span>
      <div class="sp-divider" style="margin: 7px 0"></div>
      ${plan.rows
        .map(
          (text, index) => `
        <span
          data-part="row-${plan.key}-${index}"
          class="sp-text"
          style="display: block; height: 28px; font-size: 10.5px; line-height: 1.3; overflow: hidden"
        >${text}</span>`,
        )
        .join('')}
    </div>`;

  const columns = (mode: Mode) => PLANS[mode].map(column).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 262px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Pick a plan</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="prevented" data-axis="Comparison prevention" data-term="prevented" style="flex: 0 0 auto">
            <button class="sp-segment" data-part="mode-prevented" type="button" value="prevented" style="padding: 4px 9px; font-size: 11.5px">With</button>
            <button class="sp-segment" data-part="mode-comparable" type="button" value="comparable" style="padding: 4px 9px; font-size: 11.5px">Without</button>
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; gap: 9px">
          <div
            class="sp-row"
            data-part="plans"
            data-subject
            data-pose="[data-mode=prevented]"
            data-mode="prevented"
            style="flex: 0 0 auto; align-items: stretch; gap: 8px; height: 160px"
          >${columns('prevented')}</div>

          <div data-stage-verdict class="sp-row sp-context" data-part="verdict" data-answer="unknown" style="flex: 1 1 auto; gap: 8px; min-height: 0">
            <span
              class="sp-text sp-text--ink sp-grow"
              data-part="verdict-text"
              style="font-size: 11px; line-height: 1.3; overflow: hidden"
            >${VERDICT.prevented.text}</span>
          </div>
        </div>
      </div>

      <span class="sp-text sp-context" data-part="note" style="width: 452px; height: 30px; font-size: 11px; line-height: 1.35">${NOTE.prevented}</span>
    </div>
  `;

  const plans = part(root, 'plans');
  const verdict = part(root, 'verdict');
  const verdictText = part(root, 'verdict-text');
  const note = part(root, 'note');

  part(root, 'mode').addEventListener('change', (event) => {
    const mode: Mode = (event as CustomEvent<string>).detail === 'comparable' ? 'comparable' : 'prevented';
    plans.dataset.mode = mode;
    plans.innerHTML = columns(mode);
    verdict.dataset.answer = VERDICT[mode].answer;
    verdictText.textContent = VERDICT[mode].text;
    note.textContent = NOTE[mode];
  });
}
