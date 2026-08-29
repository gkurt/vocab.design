import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * WCAG relative luminance and contrast ratio, written out rather than quoted from a table, so
 * every number printed under a panel is measured from the two colours the browser is actually
 * painting. The claim a container colour makes is that ordinary ink clears on it, and a claim
 * about contrast is only worth making with the ratio beside it.
 */
const decode = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

const luminance = (hex: string): number => {
  const [r, g, b] = [1, 3, 5].map((i) => decode(Number.parseInt(hex.slice(i, i + 2), 16) / 255));
  return 0.2126 * (r ?? 0) + 0.7152 * (g ?? 0) + 0.0722 * (b ?? 0);
};

const ratio = (a: string, b: string): number => {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return ((x ?? 0) + 0.05) / ((y ?? 0) + 0.05);
};

/** AA for body text is 4.5:1; the grade is printed so the number is never left to be read alone. */
const grade = (value: number) => (value >= 7 ? 'AAA' : value >= 4.5 ? 'AA' : 'fails AA');

/**
 * Three roles, each a tonal quartet: the solid accent and its on colour, then the container
 * and its on colour. Tones are Material's, and the hexes are the M3 baseline scheme, so the
 * pair a reader might already know is the pair on screen.
 */
const ROLES = [
  {
    key: 'primary',
    name: 'Primary',
    solid: { token: 'primary', hex: '#6750A4', tone: 40 },
    onSolid: { token: 'on-primary', hex: '#FFFFFF', tone: 100 },
    container: { token: 'primary-container', hex: '#EADDFF', tone: 90 },
    onContainer: { token: 'on-primary-container', hex: '#21005D', tone: 10 },
  },
  {
    key: 'error',
    name: 'Error',
    solid: { token: 'error', hex: '#B3261E', tone: 40 },
    onSolid: { token: 'on-error', hex: '#FFFFFF', tone: 100 },
    container: { token: 'error-container', hex: '#F9DEDC', tone: 90 },
    onContainer: { token: 'on-error-container', hex: '#410E0B', tone: 10 },
  },
  {
    key: 'success',
    name: 'Success',
    solid: { token: 'success', hex: '#386A20', tone: 40 },
    onSolid: { token: 'on-success', hex: '#FFFFFF', tone: 100 },
    container: { token: 'success-container', hex: '#B7F397', tone: 90 },
    onContainer: { token: 'on-success-container', hex: '#0C2000', tone: 10 },
  },
] as const;

const START = 'primary';

const roleOf = (key: string) => ROLES.find((r) => r.key === key) ?? ROLES[0];

/**
 * Container colour specimen: one message region painted twice from the same role, on the solid
 * accent and on its container, with the measured contrast ratio of each fill against the ink it
 * is required to carry printed underneath. The two panels hold identical content, so the only
 * thing that differs between them is how loudly the accent is being spent.
 *
 * The role control moves both panels at once. A container is not "the pale one" of a particular
 * hue: it is a rung every role has, which is why picking Error or Success produces the same
 * arrangement in a different hue rather than a different design. The tone numbers beside each
 * hex are the reason the pale fill can hold body copy at all, and the ratios are measured from
 * the painted values rather than asserted.
 *
 * The subject is the container panel, the narrowest element the term names: the term is the
 * fill, not the text on it and not the role table around it. The solid panel is what it is read
 * against, and the role control, the token labels, the read-outs and the caption are
 * instrumentation, so all of them sit in the context register (SPEC §5). The container panel is
 * a container fill in all three roles, so identify has nothing to refuse and needs no
 * `data-pose`.
 *
 * Both panels are a fixed size and only paint and text change with the role, so nothing moves
 * (SPEC §5). Every value comes from the table above, so the specimen renders identically on
 * every run.
 */
export function mount(root: HTMLElement): void {
  const panel = (kind: string, extra: string) => `
    <div class="sp-stack" style="flex: 1 1 0; min-width: 0; gap: 4px">
      <div class="sp-row sp-row--between sp-context" style="height: 16px">
        <span class="sp-label">${kind === 'solid' ? 'Solid accent' : 'Container'}</span>
        <span class="sp-text" data-part="token-${kind}" style="font-size: 9px"></span>
      </div>
      <div data-part="${kind}-panel" data-role="${START}" ${extra}
           style="height: 104px; padding: 11px 12px; border-radius: 6px;
                  box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.28)">
        <div data-part="${kind}-title" style="font-size: 11.5px; font-weight: 600">Storage almost full</div>
        <div data-part="${kind}-body" style="font-size: 9.5px; line-height: 1.45; margin-top: 5px">
          Back up your library before the next sync runs tonight.
        </div>
        <span data-part="${kind}-chip"
              style="display: inline-flex; align-items: center; margin-top: 9px; padding: 3px 9px;
                     border-radius: 999px; font-size: 9.5px; font-weight: 600; border: 1px solid currentcolor">
          Manage
        </span>
      </div>
      <div class="sp-context" style="height: 26px">
        <div class="sp-text" data-part="fill-${kind}"
             style="font-size: 9px; font-variant-numeric: tabular-nums; height: 13px"></div>
        <div class="sp-text" data-part="ratio-${kind}"
             style="font-size: 9px; font-variant-numeric: tabular-nums; height: 13px"></div>
      </div>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context" style="height: 31px; justify-content: flex-end">
          <sp-segmented class="sp-segmented" data-part="segmented" data-axis="Role" data-value="${START}">
            ${ROLES.map((r) => `<button class="sp-segment" data-part="seg-${r.key}" value="${r.key}">${r.name}</button>`).join('')}
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 10px; align-items: flex-start">
          ${panel('solid', '')}
          ${panel('container', 'data-subject data-tone="90"')}
        </div>

        <p class="sp-text sp-context" data-part="caption"
           style="margin: 8px 0 0; height: 28px; font-size: 10px; line-height: 1.4"></p>
      </div>
    </div>
  `;

  const paint = (key: string) => {
    const role = roleOf(key);
    if (!role) return;

    const pairs = [
      { kind: 'solid', fill: role.solid, ink: role.onSolid },
      { kind: 'container', fill: role.container, ink: role.onContainer },
    ] as const;

    for (const pair of pairs) {
      const el = part(root, `${pair.kind}-panel`);
      el.dataset.role = role.key;
      el.dataset.tone = String(pair.fill.tone);
      el.style.background = pair.fill.hex;
      el.style.color = pair.ink.hex;

      part(root, `token-${pair.kind}`).textContent = pair.fill.token;
      part(root, `fill-${pair.kind}`).textContent = `${pair.fill.hex} · tone ${pair.fill.tone}`;

      const measured = ratio(pair.fill.hex, pair.ink.hex);
      part(root, `ratio-${pair.kind}`).textContent = `${pair.ink.token} ${measured.toFixed(1)}:1 ${grade(measured)}`;
    }

    const solidRatio = ratio(role.solid.hex, role.onSolid.hex);
    const containerRatio = ratio(role.container.hex, role.onContainer.hex);
    part(root, 'caption').textContent =
      `Same hue, two rungs apart. The solid fill carries one weight of ink at ${solidRatio.toFixed(1)}:1; ` +
      `the container carries ordinary copy at ${containerRatio.toFixed(1)}:1.`;
  };
  paint(START);

  part(root, 'segmented').addEventListener('change', (event) => paint((event as CustomEvent<string>).detail));
}
