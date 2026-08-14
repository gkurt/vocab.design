import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'steered' | 'fair';

/** The refusal set at the edge of body text: small, thin, low contrast, out of the path. */
const DEMOTED = [
  'border: 0',
  'background: transparent',
  'font: inherit',
  'font-size: 11px',
  'color: var(--sp-muted)',
  'opacity: 0.6',
  'padding: 0',
  'cursor: pointer',
  'text-decoration: underline',
].join('; ');

const ACTIONS = {
  steered: `
    <button class="sp-button" data-part="decline" type="button" style="${DEMOTED}">Reject all</button>
    <span style="flex: 1 1 auto"></span>
    <button
      class="sp-button"
      data-part="accept"
      type="button"
      style="padding: 11px 24px; font-size: 15px; box-shadow: 0 0 0 4px var(--sp-accent-soft), 0 6px 14px rgb(53 87 232 / 0.35)"
    >Accept all</button>`,
  fair: `
    <button class="sp-button sp-button--ghost" data-part="decline" type="button" style="padding: 8px 16px; font-size: 13px">Reject all</button>
    <button class="sp-button" data-part="accept" type="button" style="padding: 8px 16px; font-size: 13px">Accept all</button>
    <span style="flex: 1 1 auto"></span>`,
} as const;

const CAPTION = {
  steered: 'Consent choice (as shipped)',
  fair: 'Consent choice (equal weight)',
} as const;

const ORDER = {
  steered: 'Refusal reads as small print',
  fair: 'Both read as buttons',
} as const;

const VERDICT = {
  steered: 'Same two words, same two clicks. Only the drawing decides which one gets found.',
  fair: 'Equal consequences, equal weight: same size, same contrast, same place in the path.',
} as const;

/**
 * Misdirection specimen: a consent choice whose wording is neutral on both sides, so the
 * only variable left is how the two answers are drawn. Accept all is a filled button
 * where the reading path ends; Reject all is small underlined grey at the far edge.
 *
 * The subject is the choice block. The article text behind it, the caption, and the
 * measurement chips are scenery (SPEC §5), and the block declares the steered drawing as
 * its honest condition (`data-pose`), since ringing the balanced version would identify
 * the opposite word (SPEC §6).
 *
 * The chips are measured rather than asserted: each render inserts the controls and then
 * reads their boxes and type sizes, which is measuring the state it just mounted rather
 * than a style written onto a live element (SPEC §5, AGENTS gotcha). The block and the
 * chip row hold one height in both modes, so switching moves nothing.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Grinder Coffee</span><span class="sp-label">Journal</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">

          <div class="sp-stack sp-context" style="gap: 8px">
            <div class="sp-line" style="width: 82%"></div>
            <div class="sp-line" style="width: 64%"></div>
          </div>

          <span class="sp-label sp-context" data-part="caption" style="height: 17px; font-size: 11px">${CAPTION.steered}</span>

          <section
            class="sp-surface"
            data-part="choice"
            data-subject
            data-pose="[data-mode=steered]"
            data-mode="steered"
            style="display: flex; flex-direction: column; height: 104px; padding: 10px 12px"
          >
            <span class="sp-heading" style="font-size: 14px">We use cookies</span>
            <span class="sp-text" style="margin-top: 2px; font-size: 12px">Analytics and advertising partners.</span>
            <div class="sp-row" data-part="actions" style="height: 44px; margin-top: auto; gap: 12px">${ACTIONS.steered}</div>
          </section>

          <div class="sp-row sp-context" style="height: 26px; gap: 6px">
            <span class="sp-chip" data-part="chip-area" style="width: 96px">area</span>
            <span class="sp-chip" data-part="chip-type" style="width: 112px">type</span>
            <span class="sp-chip sp-grow" data-part="chip-order">${ORDER.steered}</span>
          </div>

        </div>
      </div>
      <div class="sp-row sp-context" style="gap: 12px">
        <span class="sp-text" data-part="verdict" style="width: 296px; font-size: 11px">${VERDICT.steered}</span>
        <sp-segmented class="sp-segmented" data-part="mode" data-value="steered">
          <button class="sp-segment" data-part="mode-steered" value="steered">As shipped</button>
          <button class="sp-segment" data-part="mode-fair" value="fair">Made fair</button>
        </sp-segmented>
      </div>
    </div>
  `;

  const choice = part(root, 'choice');
  const actions = part(root, 'actions');
  const caption = part(root, 'caption');
  const verdict = part(root, 'verdict');
  const chipArea = part(root, 'chip-area');
  const chipType = part(root, 'chip-type');
  const chipOrder = part(root, 'chip-order');

  const area = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    return rect.width * rect.height;
  };
  const typeSize = (el: HTMLElement) => Math.round(Number.parseFloat(getComputedStyle(el).fontSize));

  const show = (mode: Mode) => {
    choice.dataset.mode = mode;
    actions.innerHTML = ACTIONS[mode];
    const accept = part(actions, 'accept');
    const decline = part(actions, 'decline');
    const ratio = area(decline) > 0 ? area(accept) / area(decline) : 0;
    chipArea.textContent = `Area ${ratio.toFixed(1)}x`;
    chipType.textContent = `Type ${typeSize(accept)} vs ${typeSize(decline)} px`;
    chipOrder.textContent = ORDER[mode];
    caption.textContent = CAPTION[mode];
    verdict.textContent = VERDICT[mode];
  };

  part(root, 'mode').addEventListener('change', (event) => {
    show((event as CustomEvent<string>).detail === 'fair' ? 'fair' : 'steered');
  });

  show('steered');
}
