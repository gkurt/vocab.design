import { flag, part } from '#src/kit/parts.ts';

type Region = { key: string; role: string; label: string };

const REGIONS: Region[] = [
  { key: 'banner', role: 'banner', label: 'banner' },
  { key: 'nav', role: 'navigation', label: 'navigation' },
  { key: 'main', role: 'main', label: 'main' },
  { key: 'aside', role: 'complementary', label: 'complementary' },
  { key: 'footer', role: 'contentinfo', label: 'contentinfo' },
];

const REST = 'Pick a landmark to move to it';

const BOX = 'border: 1px dashed var(--sp-accent); border-radius: 6px; background: var(--sp-surface); padding: 6px 8px; overflow: hidden';

/**
 * Landmark specimen: a page fragment whose five major regions are the real elements
 * that carry the roles, with a rotor beside it that jumps to any one of them the way
 * a screen reader's landmark list does.
 *
 * The subject is the main region, not the map of all five: the term names one region
 * at a time, and main is the one a reader is trying to reach. The other four regions
 * and the rotor are scenery, so their outlines go chroma-free with the context accent
 * while main keeps the kit palette. Selecting a landmark only repaints a fill and
 * swaps a border style, so no box in the fragment changes size (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const lines = (widths: number[]) => widths.map((w) => `<div class="sp-line" style="width: ${w}%; margin-top: 5px"></div>`).join('');

  const rotor = REGIONS.map(
    (region) =>
      `<button class="sp-chip" type="button" data-part="rotor-${region.key}" style="padding: 3px 8px; font-size: 11px">${region.label}</button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 442px">
        <div style="display: grid; grid-template-columns: 88px 1fr 104px; grid-template-rows: auto 1fr auto; gap: 6px;
                    height: 176px; padding: 6px; background: var(--sp-sunken); border-radius: 6px">
          <header class="sp-context" data-part="region-banner" style="grid-column: 1 / -1; ${BOX}">
            <span class="sp-label">banner</span>
            <div class="sp-line" style="width: 46%; margin-top: 5px"></div>
          </header>
          <nav class="sp-context" data-part="region-nav" style="${BOX}">
            <span class="sp-label">navigation</span>
            ${lines([80, 66, 74])}
          </nav>
          <main data-part="region-main" data-subject style="${BOX}">
            <span class="sp-label">main</span>
            <div class="sp-heading" style="font-size: 12px; margin-top: 3px">Grind size</div>
            ${lines([100, 78])}
          </main>
          <aside class="sp-context" data-part="region-aside" style="${BOX}">
            <span class="sp-label">complementary</span>
            ${lines([88, 72])}
          </aside>
          <footer class="sp-context" data-part="region-footer" style="grid-column: 1 / -1; ${BOX}">
            <span class="sp-label">contentinfo</span>
          </footer>
        </div>
        <div class="sp-surface sp-context" style="margin-top: 10px; padding: 8px 10px">
          <span class="sp-label">Screen reader, landmarks rotor</span>
          <div class="sp-row sp-row--wrap" style="gap: 6px; margin-top: 6px">${rotor}</div>
          <p class="sp-text" data-part="readout" style="margin: 8px 0 0; height: 18px; font-size: 12px; white-space: nowrap">${REST}</p>
        </div>
      </div>
    </div>
  `;

  const readout = part(root, 'readout');

  // Each entry reaches its own landmark rather than toggling one (SPEC §8), which is
  // also how a rotor behaves: the list is absolute, and choosing from it is a move.
  const jumpTo = (target: Region) => {
    for (const region of REGIONS) {
      const box = part(root, `region-${region.key}`);
      const current = region === target;
      flag(box, 'data-current', current);
      box.style.borderStyle = current ? 'solid' : 'dashed';
      box.style.background = current ? 'var(--sp-accent-soft)' : 'var(--sp-surface)';
      flag(part(root, `rotor-${region.key}`), 'data-selected', current);
    }
    readout.textContent = `Moved to the ${target.label} landmark`;
  };

  for (const region of REGIONS) {
    part(root, `rotor-${region.key}`).addEventListener('click', () => jumpTo(region));
  }
}
