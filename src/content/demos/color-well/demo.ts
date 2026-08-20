import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

/** The palette the picker offers. Stated inline, because choosing a colour is this term's own
 *  claim and the kit has one accent on purpose (SPEC §5). */
const SWATCHES = [
  { key: 'indigo', hex: '#3d4fc4', name: 'Indigo' },
  { key: 'sky', hex: '#2f80ed', name: 'Sky' },
  { key: 'teal', hex: '#1f8f74', name: 'Teal' },
  { key: 'moss', hex: '#4f9c3a', name: 'Moss' },
  { key: 'amber', hex: '#e0a020', name: 'Amber' },
  { key: 'ember', hex: '#d9480f', name: 'Ember' },
  { key: 'rose', hex: '#d63a70', name: 'Rose' },
  { key: 'plum', hex: '#7c3aed', name: 'Plum' },
  { key: 'slate', hex: '#5d6577', name: 'Slate' },
  { key: 'ink', hex: '#1f2933', name: 'Ink' },
] as const;

const START = 'indigo';

/**
 * Colour well specimen: a drawing app's toolbar, where the fill is a small filled square that
 * both reports the shape's current colour and summons the palette. Pressing it opens a compact
 * picker; choosing a swatch closes the picker, repaints the well, and repaints the shape, which
 * is what makes the well a control rather than a label.
 *
 * The subject is the well, the narrowest element the term names: the panel it opens is a colour
 * picker, each cell inside that panel is a swatch, and the word names only the square that shows
 * the value and triggers the panel. It is honestly a well in both states, so no `data-pose`
 * condition is needed. The toolbar's other controls, the artboard and the shape are scenery.
 *
 * The panel is out of flow, so opening it moves nothing (SPEC §5), and the trigger only ever
 * opens: dismissal is choosing a swatch or pressing away from the panel (SPEC §8). The well
 * carries `data-aim`, so the ghost cursor parks at its corner instead of covering the 28px of
 * paint the whole demonstration is about. Evidence of a pick lands on the well and the shape,
 * never on the swatch inside a panel the pick has just closed (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const current = SWATCHES.find((entry) => entry.key === START) ?? SWATCHES[0];

  const cell = ({ key, hex, name }: (typeof SWATCHES)[number]) => `
    <button
      type="button"
      data-part="sw-${key}"
      data-color="${key}"
      aria-label="${name}"
      style="width: 26px; height: 26px; padding: 0; border: 1px solid rgb(16 24 40 / 0.18); border-radius: 5px;
             background: ${hex}; cursor: pointer"
    ></button>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 424px; height: 276px">
        <div class="sp-topbar" style="padding: 8px 12px; overflow: visible">
          <span class="sp-label sp-context" style="font-size: 11px">Fill</span>

          <span style="position: relative; display: flex; flex: 0 0 auto">
            <button
              type="button"
              data-part="well"
              data-subject
              data-aim
              data-color="${START}"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-label="Fill colour"
              style="width: 28px; height: 28px; padding: 0; border: 1px solid rgb(16 24 40 / 0.22); border-radius: 6px;
                     background: ${current?.hex}; cursor: pointer"
            ></button>

            <div
              class="sp-popover"
              data-part="panel"
              role="dialog"
              aria-label="Fill colour"
              style="left: -8px; top: calc(100% + 9px); --sp-arrow-x: 14px; padding: 10px"
            >
              <span class="sp-label sp-context" style="display: block; font-size: 11px">Palette</span>
              <div class="sp-grid" style="grid-template-columns: repeat(5, 26px); gap: 6px; margin-top: 7px">
                ${SWATCHES.map(cell).join('')}
              </div>
            </div>
          </span>

          <span class="sp-label sp-context" data-part="value" style="flex: 0 0 auto; width: 62px; font-size: 11px">${current?.name}</span>

          <span class="sp-grow"></span>

          <span class="sp-row sp-context" style="gap: 2px; flex: 0 0 auto">
            <span class="sp-icon-button" aria-hidden="true">${icon('pencil')}</span>
            <span class="sp-icon-button" aria-hidden="true">${icon('sliders')}</span>
          </span>
        </div>

        <div class="sp-body sp-context" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px">
          <div class="sp-surface" data-part="artboard" style="display: flex; align-items: center; justify-content: center; width: 300px; height: 132px">
            <span
              data-part="shape"
              data-color="${START}"
              style="width: 132px; height: 76px; border-radius: 10px; background: ${current?.hex}; transition: background-color 0.16s"
            ></span>
          </div>
          <span class="sp-label" data-part="caption" style="font-size: 11px">The well is showing the shape's fill</span>
        </div>
      </div>
    </div>
  `;

  const well = part(root, 'well');
  const panel = part(root, 'panel');
  const shape = part(root, 'shape');
  const value = part(root, 'value');

  const setOpen = (open: boolean) => {
    flag(panel, 'data-open', open);
    flag(well, 'data-open', open);
    well.setAttribute('aria-expanded', String(open));
  };

  const apply = (key: string) => {
    const entry = SWATCHES.find((swatch) => swatch.key === key);
    if (!entry) return;
    well.dataset.color = entry.key;
    well.style.background = entry.hex;
    shape.dataset.color = entry.key;
    shape.style.background = entry.hex;
    value.textContent = entry.name;
    setOpen(false);
  };

  // The trigger only ever opens; the panel is dismissed by picking or by pressing away.
  well.addEventListener('click', () => setOpen(true));
  for (const swatch of SWATCHES) part(root, `sw-${swatch.key}`).addEventListener('click', () => apply(swatch.key));

  root.addEventListener('pointerdown', (event) => {
    const target = event.target as Node;
    if (!panel.contains(target) && !well.contains(target)) setOpen(false);
  });
  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
}
