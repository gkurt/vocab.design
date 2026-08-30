import { part } from '#src/kit/parts.ts';

const RESULTS = {
  idle: 'Nothing pressed yet.',
  'native-key': 'Space on the button: saved.',
  'native-click': 'Click on the button: saved.',
  'fake-key': 'Space on the div: nothing happened.',
  'fake-click': 'Click on the div: saved.',
} as const;

type Result = keyof typeof RESULTS;

const FACT = 'display: flex; gap: 6px; align-items: baseline; font-size: 11px; height: 15px';

/** Yes and no are drawn as well as coloured, since the kit keeps no error hue (WCAG 1.4.1). */
function fact(mark: '✓' | '✕', text: string): string {
  return `<div style="${FACT}"><span aria-hidden="true" style="width: 9px">${mark}</span><span>${text}</span></div>`;
}

/**
 * First rule of ARIA specimen: the same Save control built twice, once as a `button` and once
 * as a `div` carrying `role="button"`. They are painted identically and both answer a click,
 * which is exactly why the mistake survives review; the keyboard is where they come apart.
 *
 * The subject is the native button, the narrowest element the rule actually names. The rule
 * is advice about which element to reach for, so identify points at the element it says to
 * reach for; the div beside it, the facts under each control and the result strip are
 * scenery (SPEC §5).
 *
 * Three strings came out of the frame: a header reading "One Save control, built two ways",
 * a closing paragraph about the div being reachable by pointer and not by keyboard, and the
 * explanatory half of each result line ("Its keyboard came free."). The strip now reports
 * only what the press did, the way an inspector would, and the article carries the lesson.
 *
 * The keys are simulated, and the specimen says so on screen. Synthesized events never
 * trigger a browser's own activation behaviour (SPEC §8), so a real `button` would sit there
 * as mutely as the div under a scripted Space; each control therefore answers exactly the
 * keys the browser would give it and no others, which is the comparison the term is about.
 * The result strip holds one line of room from mount and every fact row a fixed height, so
 * nothing here moves as the strings change (SPEC §5), and each step reaches a named result
 * rather than toggling one (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 14px 16px">
        <div class="sp-row sp-context" style="justify-content: flex-end">
          <span class="sp-text" style="font-size: 11px">keys simulated</span>
        </div>

        <div class="sp-row" style="margin-top: 8px; gap: 14px; align-items: flex-start">
          <div class="sp-grow">
            <span class="sp-label">&lt;button&gt;</span>
            <div class="sp-surface" style="margin-top: 6px; padding: 10px 12px; height: 110px">
              <button class="sp-button sp-button--sm" type="button" data-part="native" data-subject>Save</button>
              <div style="margin-top: 12px">
                ${fact('✓', 'In the tab order')}
                ${fact('✓', 'Enter and Space activate')}
                ${fact('✓', 'Role and name for free')}
              </div>
            </div>
          </div>
          <div class="sp-grow sp-context">
            <span class="sp-label">&lt;div role="button"&gt;</span>
            <div class="sp-surface" style="margin-top: 6px; padding: 10px 12px; height: 110px">
              <div class="sp-button sp-button--sm" role="button" data-part="fake"
                   style="display: inline-block">Save</div>
              <div style="margin-top: 12px">
                ${fact('✕', 'Not in the tab order')}
                ${fact('✕', 'Enter and Space do nothing')}
                ${fact('✓', 'Role declared, name from text')}
              </div>
            </div>
          </div>
        </div>

        <div class="sp-surface sp-context" style="margin-top: 10px; padding: 8px 10px">
          <span class="sp-label">Last press</span>
          <p class="sp-text sp-text--ink" data-part="result" data-state="idle"
             style="margin: 2px 0 0; height: 18px; font-size: 12px; white-space: nowrap; overflow: hidden">${RESULTS.idle}</p>
        </div>
      </div>
    </div>
  `;

  const result = part(root, 'result');
  const native = part(root, 'native');
  const fake = part(root, 'fake');

  const say = (state: Result) => {
    result.dataset.state = state;
    result.textContent = RESULTS[state];
  };

  const isActivation = (key: string) => key === 'Enter' || key === ' ' || key === 'Space';

  // What the browser gives a `button` and gives a `div` nothing of. The chip the script pops
  // reads "Space"; a real event spells the same key " ", so both spellings are answered.
  native.addEventListener('keydown', (event) => {
    if (isActivation(event.key)) say('native-key');
  });
  native.addEventListener('click', () => say('native-click'));

  // The div's click is the one thing it does answer, which is how the mistake passes review.
  fake.addEventListener('click', () => say('fake-click'));
  // Its key listener never activates anything; it only reports the nothing that happened, the
  // way an inspector would. Saying "the div did nothing" needs something to say it.
  fake.addEventListener('keydown', (event) => {
    if (isActivation(event.key)) say('fake-key');
  });
}
