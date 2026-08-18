import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** One primitive scale, written once. Nothing below ever re-points it: that is the demonstration. */
const SCALE = [
  { key: 'amber-100', rung: '100', hex: '#FEF3D6', ink: '#241C08' },
  { key: 'amber-200', rung: '200', hex: '#FCE3A4', ink: '#241C08' },
  { key: 'amber-300', rung: '300', hex: '#F7C948', ink: '#241C08' },
  { key: 'amber-400', rung: '400', hex: '#DE9B12', ink: '#241C08' },
  { key: 'amber-500', rung: '500', hex: '#B45309', ink: '#FFFFFF' },
  { key: 'amber-600', rung: '600', hex: '#7C3A06', ink: '#FFFFFF' },
] as const;

type RungKey = (typeof SCALE)[number]['key'];

const rung = (key: RungKey) => SCALE.find((r) => r.key === key) ?? SCALE[4];

/** The two aliases, and the component token that names each one rather than a value. */
const ALIASES = [
  { key: 'warning', name: 'color-warning', component: 'banner-warning-bg' },
  { key: 'pending', name: 'color-pending', component: 'chip-pending-bg' },
] as const;

/** The alias table: the only thing a theme swap edits. */
const THEMES: Record<string, Record<string, RungKey>> = {
  light: { warning: 'amber-500', pending: 'amber-200' },
  dark: { warning: 'amber-300', pending: 'amber-600' },
};

const START = 'light';
const GUTTER = 102;

/**
 * Colour alias specimen: one amber scale printed with its rung names and its hexes, and two
 * aliases pointing into it at once. `color-warning` and `color-pending` are different meanings
 * served by the same palette, which is the whole argument for a second layer of names.
 *
 * The theme control moves both markers along the scale and repaints the component chips, and
 * the demonstration is what does not move with them: every rung keeps its name and its hex,
 * and each component token keeps naming its alias rather than a value. Only the middle layer
 * is edited.
 *
 * The subject is the alias layer, the pair of rows carrying an alias name and the rung it
 * currently resolves to. That is the narrowest element the term names: one alias alone could
 * not show a scale answering to two meanings, and the scale, the component chips, the theme
 * control and the caption are all things the term is read against, so they sit in the context
 * register (SPEC §5). The alias layer is an alias layer in both themes, so there is no state
 * identify has to refuse.
 *
 * Every row is a fixed height and only paint and text change with the theme, so nothing moves
 * (SPEC §5). All values come from the tables above, so the specimen renders identically on
 * every run.
 */
export function mount(root: HTMLElement): void {
  const cells = (inner: (r: (typeof SCALE)[number], i: number) => string) =>
    `<div class="sp-row" style="flex: 1 1 auto; gap: 3px; min-width: 0">${SCALE.map(inner).join('')}</div>`;

  const railCells = (alias: string) =>
    cells(
      (r) => `<span data-part="mark-${alias}-${r.key}"
                    style="flex: 1 1 0; min-width: 0; height: 5px; border-radius: 3px;
                           background: rgb(127 137 156 / 0.22)"></span>`,
    );

  const aliasRow = (alias: (typeof ALIASES)[number]) => `
    <div class="sp-row" data-part="alias-${alias.key}" data-points="${THEMES[START]?.[alias.key]}"
         style="gap: 0; height: 28px">
      <span style="flex: 0 0 ${GUTTER}px; line-height: 1.25">
        <span style="display: block; font-size: 10.5px">${alias.name}</span>
        <span class="sp-text" data-part="points-${alias.key}"
              style="display: block; font-size: 9px; font-variant-numeric: tabular-nums"></span>
      </span>
      ${railCells(alias.key)}
    </div>`;

  const componentChip = (alias: (typeof ALIASES)[number]) => `
    <div class="sp-row" style="flex: 1 1 0; min-width: 0; gap: 7px">
      <span class="sp-swatch" data-part="comp-${alias.component}" data-resolves="${THEMES[START]?.[alias.key]}"
            style="flex: 0 0 44px; height: 24px; display: flex; align-items: center; justify-content: center;
                   font-size: 9px; font-weight: 600; box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.35)">Aa</span>
      <span style="font-size: 10px">${alias.component}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 448px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Theme</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="${START}">
            <button class="sp-segment" data-part="seg-light" value="light">Light</button>
            <button class="sp-segment" data-part="seg-dark" value="dark">Dark</button>
          </sp-segmented>
        </div>

        <div class="sp-context" data-part="scale" style="margin-top: 10px">
          <div class="sp-row" style="gap: 0; height: 14px">
            <span class="sp-label" style="flex: 0 0 ${GUTTER}px">Primitive scale</span>
            <span class="sp-text" style="font-size: 9.5px">amber, identical in both themes</span>
          </div>
          <div class="sp-row" style="gap: 0; margin-top: 4px">
            <span style="flex: 0 0 ${GUTTER}px"></span>
            ${cells(
              (r) => `<span class="sp-swatch" data-part="rung-${r.key}"
                            style="flex: 1 1 0; min-width: 0; height: 34px; --sp-swatch: ${r.hex};
                                   box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.35)"></span>`,
            )}
          </div>
          <div class="sp-row" style="gap: 0">
            <span style="flex: 0 0 ${GUTTER}px"></span>
            ${cells(
              (r) => `<span style="flex: 1 1 0; min-width: 0; height: 11px; text-align: center; font-size: 9.5px;
                                   font-variant-numeric: tabular-nums">${r.rung}</span>`,
            )}
          </div>
          <div class="sp-row" style="gap: 0">
            <span style="flex: 0 0 ${GUTTER}px"></span>
            ${cells(
              (r) => `<span class="sp-text" style="flex: 1 1 0; min-width: 0; height: 11px; text-align: center;
                                   font-size: 8.5px; font-variant-numeric: tabular-nums">${r.hex}</span>`,
            )}
          </div>
        </div>

        <div data-part="alias-layer" data-subject style="margin-top: 10px">
          ${ALIASES.map(aliasRow).join('')}
        </div>

        <div class="sp-row sp-context" style="gap: 14px; margin-top: 8px; height: 32px">
          ${ALIASES.map(componentChip).join('')}
        </div>

        <p class="sp-text sp-context" data-part="caption"
           style="margin: 6px 0 0; height: 28px; font-size: 10px; line-height: 1.4"></p>
      </div>
    </div>
  `;

  const apply = (theme: string) => {
    const table = THEMES[theme] ?? THEMES.light;
    if (!table) return;

    for (const alias of ALIASES) {
      const target = table[alias.key] ?? 'amber-500';
      const value = rung(target);

      part(root, `alias-${alias.key}`).dataset.points = target;
      part(root, `points-${alias.key}`).textContent = `= ${target} ${value.hex}`;

      for (const r of SCALE) {
        const mark = part(root, `mark-${alias.key}-${r.key}`);
        const on = r.key === target;
        mark.style.height = on ? '14px' : '5px';
        mark.style.background = on ? value.hex : 'rgb(127 137 156 / 0.22)';
        mark.style.boxShadow = on ? 'inset 0 0 0 1px rgb(127 137 156 / 0.4)' : 'none';
      }

      const chip = part(root, `comp-${alias.component}`);
      chip.dataset.resolves = target;
      chip.style.setProperty('--sp-swatch', value.hex);
      chip.style.color = value.ink;
    }

    const chain = ALIASES.map((alias) => `${alias.component} = ${alias.name} = ${table[alias.key]}`);
    part(root, 'caption').textContent = `${chain.join('. ')}. Only the middle line changed.`;
  };
  apply(START);

  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
