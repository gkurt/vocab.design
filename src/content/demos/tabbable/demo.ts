import { type IconName, icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

type Control = { key: string; label: string; glyph: IconName; tabindex: 0 | -1 };

/**
 * Three controls in the tab sequence and one out of it. The skipped control is a `div` with
 * `role="button"`, never a real `<button>`: the stage's own Tab walks anything a browser would
 * walk, and a `<button tabindex="-1">` is still a button. Here the attribute is the whole claim,
 * so the element has to be one the attribute decides.
 */
const CONTROLS: Control[] = [
  { key: 'search', label: 'Search', glyph: 'search', tabindex: 0 },
  { key: 'filter', label: 'Filter', glyph: 'filter', tabindex: 0 },
  { key: 'sort', label: 'Sort', glyph: 'sliders', tabindex: -1 },
  { key: 'save', label: 'Save', glyph: 'check', tabindex: 0 },
];

const CAPTION = {
  tab: 'Tab stops at the three controls carrying tabindex 0 and passes straight over Sort, every pass, in both directions.',
  script: 'Script put the ring on Sort. Its tabindex is still -1, so it is focusable and not tabbable: no Tab will ever land here.',
  none: 'Four controls, one of them out of the tab sequence. Press Tab and watch which one the ring never visits.',
} as const;

/**
 * Tabbable specimen: a toolbar of four controls where Sort carries `tabindex="-1"`. Tab walks
 * the other three and skips it, pass after pass; the Focus from script control then puts the
 * ring on the very element Tab refuses, which is the whole distinction the word carries.
 *
 * The subject is the skipped control. It is the one element in the scene that holds the state
 * the term names, focusable but not tabbable, and it holds it in every state the demo can rest
 * in, so no `data-pose` is needed. The other three controls, the readout, the script button and
 * the caption are scenery (SPEC §5).
 *
 * The walk is the stage's own: a scripted Tab advances `data-sim-focus` over exactly the
 * elements a browser would walk, so the skip is performed rather than asserted by the demo.
 * A real reader gets the browser's own walk instead, because the three tabbable controls really
 * do carry `tabindex="0"` and the container never swallows a Tab: nothing here calls
 * `preventDefault` on it, so the specimen cannot become a keyboard trap. Nothing calls
 * `.focus()` either, since attract must never move real focus (SPEC §7); the script button
 * paints the ring the same way the stage does.
 *
 * Every control holds a fixed width and every readout a fixed box, so no state moves anything
 * (SPEC §5). No timer is needed.
 */
export function mount(root: HTMLElement): void {
  const control = ({ key, label, glyph, tabindex }: Control) => `
    <div class="sp-button sp-button--quiet sp-button--sm" role="button" aria-label="${label}"
         tabindex="${tabindex}" data-part="${key}" data-control="${key}"
         ${key === 'sort' ? 'data-subject' : ''}
         style="display: flex; flex-direction: column; align-items: center; gap: 3px;
                width: 88px; padding: 7px 0; cursor: pointer">
      ${icon(glyph)}
      <span style="font-size: 11.5px">${label}</span>
      <span class="sp-label" style="font-size: 9px; line-height: 1">tabindex ${tabindex}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Focus ring is on</span>
          <span class="sp-text sp-text--ink" data-part="readout" data-at="search" data-via="none"
                style="flex: 0 0 auto; width: 210px; text-align: right; font-size: 11.5px;
                       white-space: nowrap">Search, waiting for Tab</span>
        </div>

        <div class="sp-surface" data-part="bar" role="toolbar" aria-label="Library"
             style="margin-top: 10px; padding: 6px; display: flex; gap: 6px; justify-content: center">
          ${CONTROLS.map(control).join('')}
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 10px; gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Tab reaches three of the four</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="script"
                  style="flex: 0 0 auto; font-size: 11.5px">Focus Sort from script</button>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-via="none"
           style="margin: 9px 0 0; height: 32px; font-size: 11px; line-height: 1.35">${CAPTION.none}</p>
      </div>
    </div>
  `;

  const readout = part(root, 'readout');
  const caption = part(root, 'caption');
  const sort = part(root, 'sort');
  const controls = CONTROLS.map((c) => part(root, c.key));

  const report = (el: Element | null, via: 'tab' | 'script') => {
    const control = el?.closest<HTMLElement>('[data-control]');
    const key = control?.dataset.control ?? 'other';
    const label = control?.getAttribute('aria-label') ?? 'a control outside the toolbar';
    const index = control?.getAttribute('tabindex');
    readout.dataset.at = key;
    readout.dataset.via = via;
    readout.textContent = control ? `${label}, tabindex ${index}, via ${via === 'tab' ? 'Tab' : 'script'}` : `${label}, via Tab`;
    caption.dataset.via = via;
    caption.textContent = via === 'tab' ? CAPTION.tab : CAPTION.script;
  };

  // The stage advances its own ring before the key is dispatched, so the element the keydown
  // arrives on IS the one the ring just reached. A real reader's Tab is answered by focusin
  // below instead, because a trusted keydown fires before the browser has moved anything.
  root.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab' || event.isTrusted) return;
    sort.removeAttribute('data-sim-focus');
    report(event.target as Element, 'tab');
  });

  root.addEventListener('focusin', (event) => {
    sort.removeAttribute('data-sim-focus');
    report(event.target as Element, 'tab');
  });

  part(root, 'script').addEventListener('click', () => {
    for (const el of controls) el.removeAttribute('data-sim-focus');
    sort.setAttribute('data-sim-focus', '');
    report(sort, 'script');
  });

  // Where the walk starts, so the stage's first Tab agrees with what is already on screen.
  const first = CONTROLS[0];
  if (first) part(root, first.key).setAttribute('data-sim-focus', '');
}
