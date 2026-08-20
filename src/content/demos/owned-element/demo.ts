import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'owned' | 'unowned';

const CITIES = ['Kyiv', 'Kraków', 'Kaunas'] as const;

const CAPTION = {
  owned:
    'Same DOM, adopted tree. The three options render outside the toolbar, and the listbox names them, so a reader walks a listbox with three options in it.',
  unowned:
    'Same DOM, honest tree. Nothing names the options, so the listbox is empty and the three options sit in a generic box with no listbox above them.',
} as const;

const NOTE = {
  owned: 'listbox, 3 options',
  unowned: 'listbox, no options',
} as const;

/**
 * Owned element specimen: a search toolbar whose listbox is rendered outside it, drawn as the DOM
 * on one side and the accessibility tree it produces on the other, with a pick between the options
 * being adopted by the listbox and being left where the markup put them. The DOM is identical
 * either way apart from the attribute, which is the whole claim: the reparenting happens in the
 * tree and nowhere else.
 *
 * The subject is the adopted block inside the tree's listbox node, an element of its own sized to
 * the three rows it holds (SPEC §5): the term names the children the tree took in, not the listbox
 * that named them and not the tree view that explains it. The DOM panel, the picker, the orphan
 * rows and the caption are scenery. The block exists only while the options really are owned, so
 * every state it is on stage in is honest and no `data-pose` is needed; in the other state identify
 * summons it (SPEC §6).
 *
 * Both the adopted rows and the orphan rows keep their room in every state, so switching the pick
 * moves nothing (SPEC §5). No timers: the pick is the only state this specimen has.
 */
export function mount(root: HTMLElement): void {
  const node = (label: string, role: string, indent: number, name?: string) => `
    <div class="sp-row" style="height: 15px; gap: 6px; padding-left: ${indent}px">
      <span style="flex: 0 0 auto; font-size: 10.5px; font-weight: 500">${label}</span>
      <span class="sp-label" ${name ? `data-part="${name}"` : ''} style="flex: 0 0 auto; font-size: 9.5px">${role}</span>
    </div>`;

  const options = (indent: number) => CITIES.map((city) => node('option', city, indent)).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Options rendered outside their listbox</span>
          <sp-segmented class="sp-segmented" data-part="mode" data-value="owned" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-owned" value="owned"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Owned</button>
            <button class="sp-segment" type="button" data-part="seg-unowned" value="unowned"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Not owned</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="align-items: stretch; gap: 12px; margin-top: 10px">
          <div class="sp-surface sp-context" style="flex: 1 1 0; min-width: 0; padding: 8px 10px">
            <span class="sp-label" style="font-size: 10px">DOM, unchanged</span>
            <div style="margin-top: 5px">
              ${node('div', 'toolbar', 0)}
              ${node('input', 'combobox', 12)}
              <div class="sp-row" style="height: 15px; gap: 6px; padding-left: 12px">
                <span style="flex: 0 0 auto; font-size: 10.5px; font-weight: 500">div</span>
                <span class="sp-label" style="flex: 0 0 auto; font-size: 9.5px">listbox</span>
                <span class="sp-label" data-part="attr"
                      style="flex: 0 0 auto; font-size: 9.5px; opacity: 0; visibility: hidden;
                             transition: opacity 0.18s, visibility 0.18s">aria-owns</span>
              </div>
              ${node('div', 'suggestions portal', 0)}
              ${options(12)}
            </div>
          </div>

          <div class="sp-surface" style="flex: 1 1 0; min-width: 0; padding: 8px 10px">
            <span class="sp-label sp-context" style="font-size: 10px">Accessibility tree</span>
            <div style="margin-top: 5px">
              <div class="sp-context">
                ${node('toolbar', '', 0)}
                ${node('combobox', 'Search cities', 12)}
                <div class="sp-row" style="height: 15px; gap: 6px; padding-left: 12px">
                  <span style="flex: 0 0 auto; font-size: 10.5px; font-weight: 500">listbox</span>
                  <span class="sp-label" data-part="note" data-mode="owned"
                        style="flex: 0 0 auto; font-size: 9.5px">${NOTE.owned}</span>
                </div>
              </div>
              <div data-part="adopted" data-subject
                   style="opacity: 1; visibility: visible; transition: opacity 0.18s, visibility 0.18s">
                ${options(26)}
              </div>
              <div class="sp-context">
                ${node('generic', 'suggestions portal', 0)}
                <div data-part="orphans"
                     style="opacity: 0; visibility: hidden; transition: opacity 0.18s, visibility 0.18s">
                  ${options(12)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p class="sp-text sp-context" data-part="caption" data-mode="owned"
           style="margin: 10px 0 0; height: 32px; font-size: 11px; line-height: 1.35">${CAPTION.owned}</p>
      </div>
    </div>
  `;

  const attr = part(root, 'attr');
  const adopted = part(root, 'adopted');
  const orphans = part(root, 'orphans');
  const note = part(root, 'note');
  const caption = part(root, 'caption');

  const show = (el: HTMLElement, on: boolean) => {
    el.style.opacity = on ? '1' : '0';
    el.style.visibility = on ? 'visible' : 'hidden';
  };

  const apply = (mode: Mode) => {
    const owned = mode === 'owned';
    show(attr, owned);
    show(adopted, owned);
    show(orphans, !owned);
    note.dataset.mode = mode;
    note.textContent = NOTE[mode];
    caption.dataset.mode = mode;
    caption.textContent = CAPTION[mode];
  };

  part(root, 'mode').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Mode);
  });

  apply('owned');
}
