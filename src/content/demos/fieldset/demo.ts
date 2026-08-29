import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The element carries UA defaults a shadow root never resets: a groove border, a margin, and
    a `min-inline-size: min-content` that refuses to shrink inside a flex row. */
const BOX = `margin: 0; padding: 4px 12px 10px; min-inline-size: 0; border: 1px solid var(--sp-line);
             border-radius: var(--sp-radius); background: var(--sp-surface);
             transition: border-color 0.2s ease, background-color 0.2s ease`;

const LEGEND = 'padding: 0 6px; font-size: 11px; font-weight: 600; color: var(--sp-ink)';

const ANNOUNCE: Record<string, string> = {
  grouped: '"Delivery address, group. Street, edit text."',
  flat: '"Street, edit text." Which street?',
};

interface Picker extends HTMLElement {
  value: string;
}

const group = (name: string, legend: string, subject: boolean, street: string, postcode: string) => `
  <fieldset
    data-part="${name}"
    data-mode="grouped"
    ${subject ? 'data-subject data-pose="[data-mode=grouped]"' : 'class="sp-context"'}
    style="${BOX}"
  >
    <legend data-part="${name}-legend" style="${LEGEND}">${legend}</legend>
    <div class="sp-row" style="gap: 10px; align-items: flex-end">
      <div class="sp-field sp-grow" style="gap: 3px">
        <label class="sp-label" for="vd-${name}-street">Street</label>
        <input class="sp-input" id="vd-${name}-street" data-part="${name}-street" type="text" value="${street}" autocomplete="off" spellcheck="false" />
      </div>
      <div class="sp-field" style="gap: 3px; flex: 0 0 auto; width: 116px">
        <label class="sp-label" for="vd-${name}-postcode">Postcode</label>
        <input class="sp-input" id="vd-${name}-postcode" data-part="${name}-postcode" type="text" value="${postcode}" autocomplete="off" spellcheck="false" />
      </div>
    </div>
  </fieldset>`;

/**
 * Fieldset specimen: one checkout form carrying two address groups, each a real `<fieldset>`
 * with a real `<legend>`, and a picker that takes the legends away so the same six controls
 * run flat. Two identical "Street" fields are the point: named, they resolve; unnamed, they
 * do not.
 *
 * The subject is the delivery `<fieldset>` element, the narrowest thing the term names. The
 * flat state is the counter-example the subject itself passes through, so the honest
 * condition lives in `data-pose` and the mount state satisfies it: identify refuses to ring
 * a group with no name and plays on, or resets to mount (SPEC §6). The billing group, the
 * picker, the window chrome and the announcement line are scenery.
 *
 * Flat is drawn by hiding the legend with `visibility`, which is exactly the semantics being
 * demonstrated (a hidden legend leaves the accessibility tree, so the group really does lose
 * its name) and which reserves the row it occupied, so nothing below it moves (SPEC §5). The
 * border fades to transparent rather than being removed for the same reason. The picker names
 * an absolute state rather than flipping what it finds (SPEC §8), and nothing here leans on a
 * browser's own submit or label activation, which synthesized input never triggers.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 296px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Checkout</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Fields" data-term="grouped" data-part="picker" data-value="grouped">
            <button class="sp-segment" type="button" data-part="seg-grouped" value="grouped" style="padding: 4px 10px; font-size: 12px">Grouped</button>
            <button class="sp-segment" type="button" data-part="seg-flat" value="flat" style="padding: 4px 10px; font-size: 12px">Flat</button>
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; justify-content: center">
          <form class="sp-stack" data-part="form" novalidate style="gap: 10px">
            ${group('delivery', 'Delivery address', true, '12 Harbour Lane', 'BS1 4TR')}
            ${group('billing', 'Billing address', false, '4 Mill Row', 'BS8 2QN')}
          </form>

                      <span
              data-stage-announce data-part="announce"
              data-named="true"
              style="height: 16px; font-size: 12px; line-height: 16px; white-space: nowrap; overflow: hidden"
            >${ANNOUNCE.grouped}</span>
          
        </div>
      </div>
    </div>
  `;

  const picker = part(root, 'picker') as Picker;
  const announce = part(root, 'announce');
  const groups = [part(root, 'delivery'), part(root, 'billing')];
  const legends = [part(root, 'delivery-legend'), part(root, 'billing-legend')];

  const setMode = (mode: string) => {
    const grouped = mode !== 'flat';
    for (const box of groups) {
      box.dataset.mode = grouped ? 'grouped' : 'flat';
      box.style.borderColor = grouped ? 'var(--sp-line)' : 'transparent';
      box.style.background = grouped ? 'var(--sp-surface)' : 'transparent';
    }
    for (const legend of legends) legend.style.visibility = grouped ? '' : 'hidden';
    announce.dataset.named = String(grouped);
    announce.textContent = ANNOUNCE[grouped ? 'grouped' : 'flat'] ?? '';
  };

  picker.addEventListener('change', (event) => setMode((event as CustomEvent<string>).detail));

  setMode('grouped');
}
