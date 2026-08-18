import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The primitive scale. Written once, never re-pointed: this is the layer the term names. */
const PRIMITIVES = [
  { key: 'blue-300', hex: '#8FA8F7', ink: '#14171C' },
  { key: 'blue-500', hex: '#3557E8', ink: '#FFFFFF' },
  { key: 'white', hex: '#FFFFFF', ink: '#14171C' },
  { key: 'slate-900', hex: '#14171C', ink: '#F1F3F8' },
] as const;

type PrimitiveKey = (typeof PRIMITIVES)[number]['key'];

/** Which primitive each role points at, per theme. Only this table moves. */
const ROLES: Record<string, Record<string, PrimitiveKey>> = {
  light: { 'color-action': 'blue-500', 'color-surface': 'white' },
  dark: { 'color-action': 'blue-300', 'color-surface': 'slate-900' },
};

/** Component tokens name a role and never a primitive, which is the rule the layering is for. */
const COMPONENTS = [
  { key: 'button-bg', role: 'color-action' },
  { key: 'card-bg', role: 'color-surface' },
] as const;

const ROLE_KEYS = ['color-action', 'color-surface'] as const;
const START = 'light';

const primitive = (key: PrimitiveKey) => PRIMITIVES.find((p) => p.key === key) ?? PRIMITIVES[1];

/* Fixed geometry, so the arrows are drawn from a hand-written table rather than measured
   after a style write (SPEC §5). Slots are the primitive rows; the two role rows sit
   between them. */
const ROW_H = 24;
const SLOT = 30;
const DIAGRAM_H = 114;
const slotMid = (i: number) => i * SLOT + ROW_H / 2;
const ROLE_TOP = [12, 72];
const roleMid = (i: number) => (ROLE_TOP[i] ?? 0) + ROW_H / 2;
const GAP_A = 38;
const GAP_B = 32;

/** One reference, drawn as a curve into an arrowhead. Nothing thinner than 2px (SPEC §8). */
const link = (w: number, from: number, to: number) =>
  `M 1 ${from} C ${w * 0.55} ${from}, ${w * 0.45} ${to}, ${w - 9} ${to} M ${w - 14} ${to - 4.5} L ${w - 9} ${to} L ${w - 14} ${to + 4.5}`;

const arrowsToRoles = (theme: string) =>
  ROLE_KEYS.map((role, i) => {
    const target = ROLES[theme]?.[role] ?? 'blue-500';
    const at = PRIMITIVES.findIndex((p) => p.key === target);
    return `<path data-part="arrow-${role}" d="${link(GAP_A, slotMid(at), roleMid(i))}" fill="none"
                  stroke="var(--sp-muted)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`;
  }).join('');

/**
 * Primitive colour token specimen: the three token layers drawn as three columns, with the
 * references between them drawn as arrows. A theme control re-points the semantic layer, and
 * the whole demonstration is what does not move when it does: the primitive scale keeps its
 * names and its hexes, the component layer keeps naming a role, and only the arrows in the
 * middle swing to a different rung.
 *
 * The subject is the `blue-500` chip: one primitive token, the narrowest thing on stage that
 * the term actually names. It stays a primitive token in both themes (in dark it is simply
 * the rung nothing currently points at, which is the term's own argument), so there is no
 * state identify has to refuse. The other two columns are the context this token is read
 * against, and the theme control, readout and caption are instrumentation, so all of them
 * sit in the context register (SPEC §5).
 *
 * Every row is absolutely placed at a fixed height and only paint, arrow geometry and the
 * readout change with the theme, so nothing moves (SPEC §5). The geometry comes from the
 * table above, so the specimen draws itself the same on every run.
 */
export function mount(root: HTMLElement): void {
  const chip = (p: (typeof PRIMITIVES)[number], i: number) => `
    <div class="sp-row" data-part="prim-${p.key}" ${p.key === 'blue-500' ? 'data-subject' : ''}
         style="position: absolute; top: ${i * SLOT}px; left: 0; width: 134px; height: ${ROW_H}px; gap: 6px;
                padding: 0 7px; border-radius: 6px; border: 1px solid var(--sp-line); background: var(--sp-surface)">
      <span class="sp-swatch" style="flex: 0 0 12px; height: 12px; border-radius: 3px;
            box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.4); --sp-swatch: ${p.hex}"></span>
      <span class="sp-grow" style="font-size: 10.5px">${p.key}</span>
      <span class="sp-text" style="font-size: 9.5px; font-variant-numeric: tabular-nums">${p.hex}</span>
    </div>`;

  const roleRow = (role: string, i: number) => `
    <div class="sp-row" data-part="role-${role}"
         style="position: absolute; top: ${ROLE_TOP[i]}px; left: 0; width: 100px; height: ${ROW_H}px; gap: 6px;
                padding: 0 7px; border-radius: 6px; border: 1px dashed var(--sp-line); background: var(--sp-surface)">
      <span class="sp-swatch" data-part="role-chip-${role}" style="flex: 0 0 12px; height: 12px; border-radius: 3px;
            box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.4)"></span>
      <span class="sp-grow" style="font-size: 10.5px">${role}</span>
    </div>`;

  const componentRow = (c: (typeof COMPONENTS)[number], i: number) => `
    <div data-part="comp-${c.key}"
         style="position: absolute; top: ${ROLE_TOP[i]}px; left: 0; width: 104px; height: ${ROW_H}px; display: flex;
                align-items: center; padding: 0 9px; border-radius: 6px; font-size: 10.5px;
                box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.4)">${c.key}</div>`;

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

        <div class="sp-row sp-context" style="gap: 0; margin-top: 12px; align-items: flex-end">
          <span class="sp-label" style="width: 134px">Primitive</span>
          <span style="width: ${GAP_A}px"></span>
          <span class="sp-label" style="width: 100px">Semantic</span>
          <span style="width: ${GAP_B}px"></span>
          <span class="sp-label" style="width: 104px">Component</span>
        </div>

        <div class="sp-row" data-part="diagram" data-mode="${START}"
             style="gap: 0; margin-top: 6px; height: ${DIAGRAM_H}px; align-items: flex-start">
          <div style="position: relative; width: 134px; height: ${DIAGRAM_H}px">
            ${PRIMITIVES.map(chip).join('')}
          </div>
          <svg data-part="arrows-primitive" width="${GAP_A}" height="${DIAGRAM_H}" viewBox="0 0 ${GAP_A} ${DIAGRAM_H}"
               aria-hidden="true" style="flex: 0 0 ${GAP_A}px; display: block">${arrowsToRoles(START)}</svg>
          <div class="sp-context" style="position: relative; width: 100px; height: ${DIAGRAM_H}px">
            ${ROLE_KEYS.map(roleRow).join('')}
          </div>
          <svg data-part="arrows-role" width="${GAP_B}" height="${DIAGRAM_H}" viewBox="0 0 ${GAP_B} ${DIAGRAM_H}"
               aria-hidden="true" style="flex: 0 0 ${GAP_B}px; display: block">
            ${ROLE_KEYS.map(
              (_, i) => `<path d="${link(GAP_B, roleMid(i), roleMid(i))}" fill="none" stroke="var(--sp-muted)"
                               stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`,
            ).join('')}
          </svg>
          <div class="sp-context" style="position: relative; width: 104px; height: ${DIAGRAM_H}px">
            ${COMPONENTS.map(componentRow).join('')}
          </div>
        </div>

        <p class="sp-text sp-context" data-part="readout"
           style="margin: 10px 0 0; height: 30px; font-size: 10.5px; line-height: 1.4"></p>
      </div>
    </div>
  `;

  const diagram = part(root, 'diagram');
  const arrows = part(root, 'arrows-primitive');
  const readout = part(root, 'readout');

  const apply = (theme: string) => {
    const table = ROLES[theme] ?? ROLES.light;
    if (!table) return;
    diagram.dataset.mode = theme;
    arrows.innerHTML = arrowsToRoles(theme);

    for (const role of ROLE_KEYS) {
      const target = table[role] ?? 'blue-500';
      const chipEl = part(root, `role-chip-${role}`);
      chipEl.style.setProperty('--sp-swatch', primitive(target).hex);
      part(root, `role-${role}`).dataset.points = target;
    }

    for (const c of COMPONENTS) {
      const target = table[c.role] ?? 'blue-500';
      const p = primitive(target);
      const el = part(root, `comp-${c.key}`);
      el.style.background = p.hex;
      el.style.color = p.ink;
      el.dataset.resolves = target;
    }

    const chain = COMPONENTS.map((c) => {
      const target = table[c.role] ?? 'blue-500';
      return `${c.key} = ${c.role} = ${target} ${primitive(target).hex}`;
    });
    readout.textContent = `${chain.join('. ')}. The primitive scale is identical in both themes.`;
  };
  apply(START);

  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
