import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const HINT = 'This cannot be undone.';
const NAME = 'Delete project';
const MISSING = '(none)';

const STRATEGIES = {
  describedby: {
    caption: 'The sentence on screen is the description, joined to the button by id. The sturdiest of the three.',
  },
  title: {
    caption: 'A title attribute is the last fallback. It describes the button, and shows nothing to touch or keyboard.',
  },
  none: {
    caption: 'The sentence is on screen and joined to nothing, so only sighted readers get it. The mistake.',
  },
} as const;

type Strategy = keyof typeof STRATEGIES;

const HINT_ID = 'vd-ad-hint';

/**
 * Accessible description specimen: one destructive button, three ways of giving it the same
 * extra sentence, and the strings a browser computes in each case. The name never changes,
 * which is the point of the pairing: the description is what arrives after it, and it is the
 * only one of the two that can go missing without the button looking any different.
 *
 * The subject is the description row of the readout, not the whole panel. Name, role, value
 * marks its panel because that term names all three facts at once; this one names a single
 * string, so the honest subject is the row that string is printed in. The row keeps its box
 * in every state, printing "(none)" when nothing computes, so the subject is on stage even
 * in the build that has no description at all (SPEC §5, §6). The button, the sentence beside
 * it, the announcement line, and the strategy control are scenery.
 *
 * The description is read back off the button's own attributes rather than written out, so
 * the panel cannot claim a description the element does not have. Every row holds a fixed
 * height and the hint keeps its room when it is not shown, so switching strategies moves
 * nothing (SPEC §5), and each segment reaches its own strategy (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 448px">
        <div class="sp-row sp-row--between sp-context">
          <sp-segmented class="sp-segmented" data-part="segmented" data-axis="Description from" data-value="describedby" style="margin-left: auto">
            <button class="sp-segment" data-part="seg-describedby" value="describedby">describedby</button>
            <button class="sp-segment" data-part="seg-title" value="title">title</button>
            <button class="sp-segment" data-part="seg-none" value="none">nothing</button>
          </sp-segmented>
        </div>

        <div class="sp-surface sp-context" style="margin-top: 12px; padding: 10px 12px">
          <div class="sp-row sp-row--between" style="gap: 12px">
            <div style="min-width: 0">
              <span class="sp-text sp-text--ink">Atlas rebrand</span>
              <p class="sp-text" data-part="hint" id="${HINT_ID}" style="margin: 2px 0 0; font-size: 11px">${HINT}</p>
            </div>
            <button class="sp-button sp-button--sm" type="button" data-part="control"
                    aria-describedby="${HINT_ID}">${NAME}</button>
          </div>
        </div>

        <div class="sp-surface" style="margin-top: 12px; padding: 10px 12px">
          <span class="sp-label">What the browser computes</span>
          <div class="sp-row sp-row--between" style="height: 20px; margin-top: 6px">
            <span class="sp-label">Name</span>
            <span class="sp-text sp-text--ink" data-part="name" data-state="named"
                  style="font-size: 12px; white-space: nowrap">“${NAME}”</span>
          </div>
          <div class="sp-row sp-row--between" data-part="desc-row" data-subject data-pose="[data-state=present]"
               data-state="present" style="height: 20px">
            <span class="sp-label">Description</span>
            <span class="sp-text sp-text--ink" data-part="desc" data-state="present" data-from="describedby"
                  style="font-size: 12px; white-space: nowrap">“${HINT}”</span>
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 12px; height: 18px">
          <span class="sp-label">Announced on arrival</span>
          <span class="sp-text sp-text--ink" data-part="announced" style="font-size: 12px; white-space: nowrap"></span>
        </div>
        <p class="sp-text sp-context" data-part="caption" data-case="describedby"
           style="margin: 6px 0 0; height: 30px; font-size: 11px">${STRATEGIES.describedby.caption}</p>
      </div>
    </div>
  `;

  const control = part(root, 'control');
  const hint = part(root, 'hint');
  const descRow = part(root, 'desc-row');
  const desc = part(root, 'desc');
  const announced = part(root, 'announced');
  const caption = part(root, 'caption');

  /** The description computation, in the order the browser runs it (describedby, then title). */
  const readout = () => {
    const ids = control.getAttribute('aria-describedby');
    const referenced = ids ? (root.querySelector(`#${ids}`)?.textContent?.trim() ?? '') : '';
    const titled = control.getAttribute('title') ?? '';
    const text = referenced || titled;
    desc.dataset.state = text ? 'present' : 'missing';
    // The row carries the state as well, since it is the subject: identify refuses to ring
    // a description that is not there and plays on until one is (SPEC §6).
    descRow.dataset.state = desc.dataset.state;
    desc.dataset.from = referenced ? 'describedby' : titled ? 'title' : 'nothing';
    desc.textContent = text ? `“${text}”` : MISSING;
    announced.textContent = text ? `“${NAME}, button. ${text}”` : `“${NAME}, button.”`;
  };

  const apply = (strategy: Strategy) => {
    if (strategy === 'describedby') control.setAttribute('aria-describedby', HINT_ID);
    else control.removeAttribute('aria-describedby');
    if (strategy === 'title') control.setAttribute('title', HINT);
    else control.removeAttribute('title');
    // A title carries the sentence itself, so the visible copy would be saying it twice;
    // it keeps its room either way, and the layout never moves (SPEC §5).
    hint.style.visibility = strategy === 'title' ? 'hidden' : 'visible';
    caption.dataset.case = strategy;
    caption.textContent = STRATEGIES[strategy].caption;
    readout();
  };

  readout();

  part(root, 'segmented').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Strategy);
  });
}
