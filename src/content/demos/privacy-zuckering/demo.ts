import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'steered' | 'plain';
type Choice = 'public' | 'follow' | 'private';

const CONFIRM: Record<Choice, string> = {
  public: 'Save: everyone',
  follow: 'Save: people you follow',
  private: 'Save: only you',
};

const RESULT: Record<Choice, string> = {
  public: 'Everyone, including search engines.',
  follow: 'The people you follow.',
  private: 'Only you.',
};

/**
 * Privacy zuckering specimen: one visibility setting arranged two ways. Steered puts the
 * permissive answer at the top, preselected and labelled recommended, hides the private
 * answers behind "More options", and commits with a button that names the transition
 * rather than the outcome. Plain shows the same three answers at the same weight, with the
 * private one as the standing setting and a button that says what saving will do.
 *
 * The subject is the choice card, since the pattern lives in how the options and the
 * commit button are arranged rather than in any one row. Plain is a state where the card
 * stops being the term, so the steered condition is declared in `data-pose` and the
 * specimen mounts steered: identify refuses to ring the even-handed version and summons
 * this state instead (SPEC §6). The mode picker and the visibility readout are scenery
 * (SPEC §5).
 *
 * The options block keeps one height across every state, so revealing the answers that
 * were hidden moves nothing below them (SPEC §5), and switching modes resets the readout
 * so the confirm click that follows is the same click in both states (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const option = (name: Choice, partName: string, label: string, extra = '') => `
    <div
      class="sp-option"
      data-part="${partName}"
      data-choice="${name}"
      role="option"
      aria-selected="false"
      style="display: flex; align-items: center; gap: 6px; padding: 4px 8px; font-size: 12px; line-height: 15px"
    >
      <span style="flex: 0 0 auto">${label}</span>${extra}
    </div>
  `;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 460px; height: 282px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Loomly, account setup</span>
          <sp-segmented class="sp-segmented" data-part="mode" data-value="steered" style="flex: 0 0 auto">
            <button class="sp-segment" data-part="mode-steered" type="button" value="steered" style="padding: 4px 9px; font-size: 11.5px">Steered</button>
            <button class="sp-segment" data-part="mode-plain" type="button" value="plain" style="padding: 4px 9px; font-size: 11.5px">Even-handed</button>
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; gap: 9px">
          <div
            class="sp-surface"
            data-part="choice"
            data-subject
            data-pose="[data-mode=steered]"
            data-mode="steered"
            style="flex: 0 0 auto; height: 162px; padding: 10px 11px; display: flex; flex-direction: column"
          >
            <span class="sp-heading" data-part="ask" style="flex: 0 0 auto; height: 18px; font-size: 12.5px">Who can see what you cook?</span>

            <div
              data-part="options"
              role="listbox"
              aria-label="Profile visibility"
              style="flex: 0 0 auto; height: 84px; margin-top: 6px; display: flex; flex-direction: column; gap: 3px"
            >
              ${option('public', 'opt-public', 'Everyone, including search engines', '<span class="sp-label" data-part="recommend" style="flex: 0 0 auto; font-size: 10.5px; color: var(--sp-accent)">Recommended</span>')}
              ${option('follow', 'opt-follow', 'People you follow')}
              ${option('private', 'opt-private', 'Only you')}
              <button
                class="sp-button sp-button--quiet sp-button--sm"
                data-part="more"
                type="button"
                style="align-self: flex-start; display: inline-flex; align-items: center; gap: 4px; padding: 3px 6px; font-size: 11.5px; color: var(--sp-muted); white-space: nowrap"
              >More options${icon('chevronDown')}</button>
            </div>

            <div class="sp-row" style="flex: 0 0 auto; gap: 8px; margin-top: auto">
              <button class="sp-button sp-button--sm" data-part="confirm" type="button" style="flex: 0 0 auto; white-space: nowrap">Continue</button>
              <span class="sp-text" data-part="fineprint" style="flex: 1 1 auto; font-size: 10.5px; line-height: 1.25">You can change this later in Settings, Privacy, Audience.</span>
            </div>
          </div>

          <div class="sp-surface sp-context" data-part="readout" data-state="pending" style="flex: 0 0 auto; height: 46px; padding: 7px 11px">
            <span class="sp-label" style="display: block; height: 15px; font-size: 10.5px">Profile visibility after this screen</span>
            <span class="sp-text sp-text--ink" data-part="result" style="display: block; height: 16px; font-size: 11.5px; line-height: 16px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">Nothing saved yet.</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const choice = part(root, 'choice');
  const optionEls = (
    [
      ['public', 'opt-public'],
      ['follow', 'opt-follow'],
      ['private', 'opt-private'],
    ] as const
  ).map(([name, partName]) => ({ name, el: part(root, partName) }));
  const more = part(root, 'more');
  const recommend = part(root, 'recommend');
  const confirm = part(root, 'confirm');
  const readout = part(root, 'readout');
  const result = part(root, 'result');

  let mode: Mode = 'steered';
  let picked: Choice = 'public';
  let expanded = false;

  const render = () => {
    choice.dataset.mode = mode;
    const buried = mode === 'steered' && !expanded;
    for (const { name, el } of optionEls) {
      el.setAttribute('aria-selected', String(name === picked));
      el.hidden = buried && name !== 'public';
      el.style.fontWeight = mode === 'steered' && name === 'public' ? '600' : '400';
    }
    more.hidden = !buried;
    recommend.hidden = mode !== 'steered';
    confirm.textContent = mode === 'steered' ? 'Continue' : CONFIRM[picked];
  };

  const resetResult = () => {
    readout.dataset.state = 'pending';
    result.textContent = 'Nothing saved yet.';
  };

  for (const { name, el } of optionEls) {
    el.addEventListener('click', () => {
      picked = name;
      render();
    });
  }

  more.addEventListener('click', () => {
    expanded = true;
    render();
  });

  confirm.addEventListener('click', () => {
    readout.dataset.state = picked;
    result.textContent = RESULT[picked];
  });

  part(root, 'mode').addEventListener('change', (event) => {
    mode = (event as CustomEvent<string>).detail === 'plain' ? 'plain' : 'steered';
    expanded = mode === 'plain';
    picked = mode === 'plain' ? 'private' : 'public';
    resetResult();
    render();
  });

  render();
}
