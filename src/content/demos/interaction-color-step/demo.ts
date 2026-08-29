import { flag, part } from '#src/kit/parts.ts';

/*
 * WCAG relative luminance and CIE L*, written out rather than quoted, so the lightness beside
 * each rung is measured from the colour the browser is actually painting. Nothing here is
 * copied from a table.
 */
const decode = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

const lstar = (hex: string): number => {
  const [r, g, b] = [1, 3, 5].map((i) => decode(Number.parseInt(hex.slice(i, i + 2), 16) / 255));
  const y = 0.2126 * (r ?? 0) + 0.7152 * (g ?? 0) + 0.0722 * (b ?? 0);
  return y > 0.008856 ? 116 * Math.cbrt(y) - 16 : 903.3 * y;
};

/** One scale. Four consecutive rungs, one per interaction state, in scale order. */
const RAMP = [
  { state: 'rest', label: 'Rest', token: 'interactive', step: 'blue-3', hex: '#E7EDFD' },
  { state: 'hovered', label: 'Hovered', token: 'interactive-hover', step: 'blue-4', hex: '#D6DFFB' },
  { state: 'pressed', label: 'Pressed', token: 'interactive-active', step: 'blue-5', hex: '#C5D1F9' },
  { state: 'selected', label: 'Selected', token: 'interactive-selected', step: 'blue-6', hex: '#B4C4F6' },
] as const;

type StateKey = (typeof RAMP)[number]['state'];

const rungOf = (state: StateKey) => RAMP.find((r) => r.state === state) ?? RAMP[0];

/** Dark enough to clear AA on every rung, which is the point of steps that stay pale. */
const INK = '#1B2440';

const CONTROLS = [
  { key: 'filters', label: 'Filters' },
  { key: 'sort', label: 'Sort' },
] as const;

/**
 * Interaction colour step specimen: one scale, four consecutive rungs, and a live pair of
 * controls that walk them. Each rung carries the state it answers for, the token name, the hex,
 * and its measured CIE lightness, so the claim that the states are a ramp rather than four
 * decisions can be read off the numbers.
 *
 * The two live controls are painted straight from the ramp and nothing else: no brightness
 * filter, no overlay. The kit's own button lights up with `filter: brightness()`, which is the
 * technique this term replaces, so the specimen turns that filter off on these two and lets the
 * rung do the work. The rung currently in use is marked, so hovering one control and selecting
 * the other reads as a walk along the scale rather than as four unrelated colours.
 *
 * The subject is the ramp, the narrowest element the term names: the term is about where the
 * state colours come from, not about the controls that use them, so the live pair, the read-out
 * and the caption sit in the context register (SPEC §5). The ramp is a ramp in every state, so
 * identify has nothing to refuse.
 *
 * Every row is a fixed height and only the marker, the paint of two controls and the read-out
 * change, so nothing moves (SPEC §5). Every value comes from the table above, so the specimen
 * renders identically on every run.
 */
export function mount(root: HTMLElement): void {
  const rungRow = (rung: (typeof RAMP)[number]) => `
    <div class="sp-row" data-part="rung-${rung.state}" style="gap: 8px; height: 26px">
      <span data-part="mark-${rung.state}" aria-hidden="true"
            style="flex: 0 0 4px; height: 20px; border-radius: 2px; background: transparent"></span>
      <span style="flex: 0 0 74px; height: 20px; display: flex; align-items: center; justify-content: center;
                   border-radius: 5px; font-size: 9px; font-weight: 600; background: ${rung.hex}; color: ${INK};
                   box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.3)">${rung.step}</span>
      <span style="flex: 0 0 58px; font-size: 10.5px">${rung.label}</span>
      <span class="sp-grow" style="font-size: 10px">${rung.token}</span>
      <span class="sp-text" style="flex: 0 0 118px; text-align: right; font-size: 9.5px;
            font-variant-numeric: tabular-nums">${rung.hex} · L* ${lstar(rung.hex).toFixed(1)}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context" style="height: 20px">
          <span class="sp-label">One scale, four rungs</span>
          <span class="sp-text sp-text--ink" data-part="readout" style="font-size: 10.5px"></span>
        </div>

        <div data-part="ramp" data-subject style="margin-top: 8px">
          ${RAMP.map(rungRow).join('')}
        </div>

        <div class="sp-row sp-context" style="gap: 10px; margin-top: 12px; height: 34px">
          <span class="sp-label" style="flex: 0 0 74px">Live</span>
          ${CONTROLS.map(
            (c) => `<button class="sp-button sp-button--sm" data-part="live-${c.key}" data-state="rest"
                            style="flex: 0 0 92px; filter: none; box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.3)">${c.label}</button>`,
          ).join('')}
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin: 9px 0 0; height: 42px; font-size: 10px; line-height: 1.4">
          Each control is painted straight from a rung: no brightness filter, no overlay. Selection outranks hover, so a
          chosen control never brightens again under the pointer and becomes a fifth colour that nobody named.
        </p>
      </div>
    </div>
  `;

  /*
   * Which control the pointer is on, whether it is down, and which control is selected. That is
   * the whole model: the state attributes the specimen paints from are its own subject matter,
   * so the player's mirror leaves them alone (SPEC §7) and a real pointer drives them too.
   */
  let over: string | undefined;
  let pressing = false;
  let selected: string | undefined;

  const stateOf = (key: string): StateKey => {
    if (over === key && pressing) return 'pressed';
    if (selected === key) return 'selected';
    if (over === key) return 'hovered';
    return 'rest';
  };

  const render = () => {
    for (const control of CONTROLS) {
      const el = part(root, `live-${control.key}`);
      const rung = rungOf(stateOf(control.key));
      el.dataset.state = rung.state;
      el.style.background = rung.hex;
      el.style.color = INK;
    }

    // The rung in use: whatever the pointer is on, or the standing selection, or rest.
    const current: StateKey = over ? stateOf(over) : selected ? 'selected' : 'rest';
    for (const rung of RAMP) {
      const on = rung.state === current;
      flag(part(root, `rung-${rung.state}`), 'data-current', on);
      part(root, `mark-${rung.state}`).style.background = on ? 'var(--sp-ink)' : 'transparent';
    }

    const rung = rungOf(current);
    part(root, 'readout').textContent = `${rung.label} · ${rung.token} · ${rung.step}`;
  };

  for (const control of CONTROLS) {
    const el = part(root, `live-${control.key}`);
    el.addEventListener('pointerenter', () => {
      over = control.key;
      render();
    });
    el.addEventListener('pointerleave', () => {
      if (over === control.key) over = undefined;
      pressing = false;
      render();
    });
    el.addEventListener('pointerdown', () => {
      over = control.key;
      pressing = true;
      render();
    });
    el.addEventListener('pointerup', () => {
      pressing = false;
      render();
    });
    // Absolute, never a toggle: a click selects this control and releases the other (SPEC §8).
    el.addEventListener('click', () => {
      selected = control.key;
      pressing = false;
      render();
    });
  }

  render();
}
