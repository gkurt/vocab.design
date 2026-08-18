import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Position = 'hidden' | 'partial' | 'clear';

/**
 * Where the scrolled page sits behind the docked bar. The focused field starts 135px down the
 * page column and the bar's top edge is 111px down the viewport, so these three offsets put the
 * field entirely under the bar, half under it, and clear of it.
 */
const TOP: Record<Position, number> = { hidden: -16, partial: -36, clear: -52 };

const VERDICT: Record<Position, { minimum: string; enhanced: string }> = {
  hidden: { minimum: 'Fails 2.4.11', enhanced: 'Fails 2.4.12' },
  partial: { minimum: 'Passes 2.4.11', enhanced: 'Fails 2.4.12' },
  clear: { minimum: 'Passes 2.4.11', enhanced: 'Passes 2.4.12' },
};

const CAPTION: Record<Position, string> = {
  hidden:
    'The ring is drawn and nobody can see it. The Minimum criterion asks only that the control not be entirely covered, and this fails even that.',
  partial:
    'Half of the control is enough for the Minimum criterion and not enough to read the label, which is why the Enhanced version asks for all of it.',
  clear:
    'Reserving the bar’s height on the scroll container is the repair, because then every scroll the browser makes for focus stops short of the covered strip.',
};

/**
 * Focus not obscured specimen: a checkout form scrolled to the field a keyboard reader has just
 * tabbed to, with a consent bar docked to the bottom of the viewport. A segmented control moves
 * the scroll position so the same focused field is entirely under the bar, half under it, and
 * clear of it, and two read-outs name what each position does to criteria 2.4.11 and 2.4.12.
 *
 * The subject is the focused field, the narrowest element the term names: the criterion is about
 * whether the control receiving focus can be seen, not about the bar sitting on it. The picker,
 * the rest of the form, the consent bar, the verdicts and the caption are scenery (SPEC §5). The
 * page column stays out of the context register, since the register would reach through it and
 * neutralize the focus ring on the subject inside.
 *
 * Being buried is the counter-example and it is a state the field itself passes through, so the
 * honest condition lives in `data-pose` and the mount state satisfies it: identify refuses to ring
 * a field nobody can see and plays on (SPEC §6).
 *
 * The ring is drawn with `data-sim-focus` in every state and nothing here calls `.focus()`:
 * attract never moves real focus (SPEC §7), and the ring has to be identical in all three
 * positions for the comparison to be about position alone. Only the page's scroll offset changes,
 * on a transition, so nothing is measured after a write and no part of the scene resizes
 * (SPEC §5). No timer is needed.
 */
export function mount(root: HTMLElement): void {
  const filled = (label: string, value: string) => `
    <div class="sp-stack" style="gap: 2px">
      <span class="sp-label" style="font-size: 9.5px">${label}</span>
      <div class="sp-input" style="height: 24px; padding: 3px 8px; font-size: 11px; display: flex;
           align-items: center; color: var(--sp-muted)">${value}</div>
    </div>`;

  const cell = (label: string, name: string, value: string) => `
    <div class="sp-stack" style="flex: 1 1 0; min-width: 0; gap: 1px">
      <span class="sp-label" style="font-size: 9.5px">${label}</span>
      <span class="sp-text sp-text--ink" data-part="${name}" data-position="partial"
            style="font-size: 11.5px; white-space: nowrap">${value}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 10px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">The focused field is</span>
          <sp-segmented class="sp-segmented" data-part="position" data-value="partial">
            <button class="sp-segment" type="button" data-part="seg-hidden" value="hidden"
                    style="padding: 4px 9px; font-size: 11.5px; white-space: nowrap">Fully covered</button>
            <button class="sp-segment" type="button" data-part="seg-partial" value="partial"
                    style="padding: 4px 9px; font-size: 11.5px; white-space: nowrap">Half covered</button>
            <button class="sp-segment" type="button" data-part="seg-clear" value="clear"
                    style="padding: 4px 9px; font-size: 11.5px; white-space: nowrap">Clear</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="viewport"
             style="position: relative; margin-top: 8px; height: 152px; overflow: hidden">
          <div data-part="page" data-position="partial"
               style="position: absolute; left: 0; right: 0; top: ${TOP.partial}px; padding: 0 12px;
                      display: flex; flex-direction: column; gap: 6px;
                      transition: top 0.3s var(--sp-ease)">
            <div class="sp-stack sp-context" style="gap: 6px">
              <span class="sp-heading" style="font-size: 12.5px">Payment</span>
              ${filled('Name on card', 'A. Okonkwo')}
              ${filled('Billing postcode', 'EH8 9YL')}
            </div>
            <div class="sp-stack" style="gap: 2px">
              <span class="sp-label" style="font-size: 9.5px">Card number</span>
              <div class="sp-input" data-part="field" data-subject data-position="partial" data-visible
                   data-pose="[data-visible]" data-sim-focus
                   style="height: 24px; padding: 3px 8px; font-size: 11px; display: flex; align-items: center">
                4242 4242 4242
              </div>
            </div>
            <button class="sp-button sp-button--sm sp-context" type="button" data-part="continue"
                    style="align-self: flex-start; margin-top: 2px; font-size: 11.5px; cursor: default">Continue</button>
          </div>

          <div class="sp-row sp-row--between sp-context" data-part="bar"
               style="position: absolute; left: 0; right: 0; bottom: 0; height: 40px; gap: 10px;
                      padding: 0 12px; background: var(--sp-surface); border-top: 1px solid var(--sp-line)">
            <span class="sp-text" style="font-size: 10.5px">We use cookies to improve this site.</span>
            <div class="sp-row" style="flex: 0 0 auto; gap: 6px">
              <button class="sp-button sp-button--quiet sp-button--sm" type="button"
                      style="font-size: 10.5px; padding: 3px 7px; cursor: default">Options</button>
              <button class="sp-button sp-button--sm" type="button"
                      style="font-size: 10.5px; padding: 3px 9px; cursor: default">Accept</button>
            </div>
          </div>
        </div>

        <div class="sp-row sp-context" style="margin-top: 8px; height: 30px; gap: 12px">
          ${cell('Focus Not Obscured (Minimum)', 'minimum', VERDICT.partial.minimum)}
          ${cell('Focus Not Obscured (Enhanced)', 'enhanced', VERDICT.partial.enhanced)}
        </div>

        <p class="sp-text sp-context" data-part="caption" data-position="partial"
           style="margin: 7px 0 0; height: 30px; font-size: 11px; line-height: 1.35">${CAPTION.partial}</p>
      </div>
    </div>
  `;

  const page = part(root, 'page');
  const field = part(root, 'field');
  const minimum = part(root, 'minimum');
  const enhanced = part(root, 'enhanced');
  const caption = part(root, 'caption');

  const apply = (position: Position) => {
    page.dataset.position = position;
    page.style.top = `${TOP[position]}px`;
    field.dataset.position = position;
    flag(field, 'data-visible', position !== 'hidden');
    for (const [el, value] of [
      [minimum, VERDICT[position].minimum],
      [enhanced, VERDICT[position].enhanced],
    ] as [HTMLElement, string][]) {
      el.dataset.position = position;
      el.textContent = value;
    }
    caption.dataset.position = position;
    caption.textContent = CAPTION[position];
  };

  apply('partial');

  part(root, 'position').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Position);
  });
}
