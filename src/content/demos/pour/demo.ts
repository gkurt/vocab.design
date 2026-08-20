import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Principle = 'perceivable' | 'operable' | 'understandable' | 'robust';

/** One screen, four barriers, one bucket each. */
const BUCKETS = {
  perceivable: {
    letter: 'P',
    name: 'Perceivable',
    criterion: 'WCAG 1.1.1 Non-text content',
    target: 'fail-p',
    why: 'The photo carries the only picture of the room and has no text alternative, so the information does not reach a reader who cannot see it.',
    test: 'Test: can the information arrive in some form at all?',
  },
  operable: {
    letter: 'O',
    name: 'Operable',
    criterion: 'WCAG 2.1.1 Keyboard',
    target: 'fail-o',
    why: 'The budget can only be set by dragging the handle. There is no keyboard path to the same value, so the control cannot be worked without a pointer.',
    test: 'Test: can every control be worked, by any input?',
  },
  understandable: {
    letter: 'U',
    name: 'Understandable',
    criterion: 'WCAG 3.3.2 Labels or instructions',
    target: 'fail-u',
    why: 'The field is labelled in trade jargon. A reader can perceive it and can type in it, and still cannot tell what is being asked for.',
    test: 'Test: is the content, and what it wants, comprehensible?',
  },
  robust: {
    letter: 'R',
    name: 'Robust',
    criterion: 'WCAG 4.1.2 Name, role, value',
    target: 'fail-r',
    why: 'Submit is a styled div with no role and no keyboard behaviour. It works where the software guesses well and disappears where it does not.',
    test: 'Test: will it survive other software reading it?',
  },
} as const satisfies Record<Principle, unknown>;

const ORDER: Principle[] = ['perceivable', 'operable', 'understandable', 'robust'];

/**
 * POUR specimen: one booking screen carrying four real barriers, and a pick over the four
 * principles that files the matching failure under the one it breaks. The vocabulary is for
 * classifying, so the demonstration is the classification rather than any one of the failures.
 *
 * The subject is the classification card: the term names the four buckets and the act of sorting a
 * problem into one, not the barriers themselves. A ring around the unlabelled photo would identify
 * a missing alternative, and the subject would have to move between four unrelated elements to keep
 * up with the pick, so the honest narrowest element is the one that states the bucket. The screen,
 * its four failures, the flag ring and the picker are scenery (SPEC §5). The card is on stage and is
 * the term in every state, so no `data-pose` is needed.
 *
 * The card holds every bucket's text in the same reserved boxes, so a pick moves nothing (SPEC §5).
 * No timers: each state is reached by a pick.
 */
export function mount(root: HTMLElement): void {
  const segment = (key: Principle) => `
    <button class="sp-segment" type="button" data-part="seg-${key}" value="${key}"
            style="flex: 1 1 auto; padding: 3px 6px; font-size: 10.5px; white-space: nowrap">${BUCKETS[key].name}</button>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 11px 14px">
        <sp-segmented class="sp-segmented" data-part="mode" data-value="perceivable" style="display: flex; width: 100%">
          ${ORDER.map(segment).join('')}
        </sp-segmented>

        <div class="sp-row" style="align-items: stretch; gap: 12px; margin-top: 9px">
          <div class="sp-surface sp-context" style="flex: 0 0 auto; width: 210px; height: 188px; padding: 10px">
            <div data-part="fail-p"
                 style="height: 40px; border-radius: 5px; background: var(--sp-line); outline-offset: 2px"></div>

            <div class="sp-stack" data-part="fail-o" style="gap: 2px; margin-top: 10px; outline-offset: 3px">
              <span class="sp-label" style="font-size: 10px">Budget</span>
              <div class="sp-slider" style="height: 16px">
                <div class="sp-slider-track" style="--sp-from: 0%; --sp-to: 46%">
                  <div class="sp-slider-fill"></div>
                  <span class="sp-slider-thumb" style="--sp-at: 46%"></span>
                </div>
              </div>
            </div>

            <div class="sp-stack" data-part="fail-u" style="gap: 2px; margin-top: 10px; outline-offset: 3px">
              <span class="sp-label" style="font-size: 10px">MSRP ex. VAT, POA</span>
              <div class="sp-input" style="height: 24px; padding: 4px 8px; font-size: 11px; color: var(--sp-muted)">0.00</div>
            </div>

            <div class="sp-button sp-button--sm" data-part="fail-r"
                 style="display: flex; align-items: center; justify-content: center; height: 26px; margin-top: 12px;
                        font-size: 11.5px; outline-offset: 3px">Submit</div>
          </div>

          <div class="sp-surface" data-part="card" data-mode="perceivable" data-subject
               style="flex: 1 1 auto; min-width: 0; height: 188px; padding: 10px">
            <div class="sp-row" style="gap: 8px; height: 24px">
              <span data-part="letter"
                    style="display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto;
                           width: 22px; height: 22px; border-radius: 50%; background: var(--sp-accent);
                           color: var(--sp-accent-ink); font-size: 12px; font-weight: 600">P</span>
              <span class="sp-heading" data-part="name" style="flex: 1 1 auto; min-width: 0; font-size: 13px">Perceivable</span>
            </div>
            <div class="sp-label" data-part="criterion" style="height: 14px; font-size: 10px; white-space: nowrap">${BUCKETS.perceivable.criterion}</div>
            <p class="sp-text" data-part="why" style="margin: 6px 0 0; height: 68px; font-size: 10.5px; line-height: 1.35">${BUCKETS.perceivable.why}</p>
            <div class="sp-divider" style="margin: 6px 0 0"></div>
            <div class="sp-row" style="gap: 6px; height: 32px">
              <span style="display: flex; flex: 0 0 auto; color: var(--sp-accent)">${icon('search')}</span>
              <span class="sp-text sp-text--ink" data-part="test"
                    style="flex: 1 1 auto; min-width: 0; font-size: 10.5px; line-height: 1.3">${BUCKETS.perceivable.test}</span>
            </div>
          </div>
        </div>

        <p class="sp-text sp-context" style="margin: 9px 0 0; height: 30px; font-size: 11px; line-height: 1.35">
          All four are real barriers on the same screen. Which principle a failure breaks is what decides who
          is blocked, and what kind of fix is owed.</p>
      </div>
    </div>
  `;

  const card = part(root, 'card');
  const letter = part(root, 'letter');
  const name = part(root, 'name');
  const criterion = part(root, 'criterion');
  const why = part(root, 'why');
  const test = part(root, 'test');
  const targets = ORDER.map((key) => part(root, BUCKETS[key].target));

  const apply = (key: Principle) => {
    const bucket = BUCKETS[key];
    card.dataset.mode = key;
    letter.textContent = bucket.letter;
    name.textContent = bucket.name;
    criterion.textContent = bucket.criterion;
    why.textContent = bucket.why;
    test.textContent = bucket.test;
    for (const [index, target] of targets.entries()) {
      const on = ORDER[index] === key;
      flag(target, 'data-flagged', on);
      target.style.outline = on ? '2px solid var(--sp-accent)' : 'none';
    }
  };

  part(root, 'mode').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Principle);
  });

  apply('perceivable');
}
