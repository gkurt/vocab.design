import { flag, part } from '#src/kit/parts.ts';

/** The wheel's own paint: one lightness and chroma all the way round, hue as the angle. */
const RING = Array.from({ length: 13 }, (_, i) => `oklch(0.65 0.16 ${i * 30}) ${i * 30}deg`).join(', ');

const PRESETS = [
  { hue: 265, label: 'Indigo and amber' },
  { hue: 25, label: 'Red and cyan' },
  { hue: 145, label: 'Green and magenta' },
];
const START = 265;

const colorAt = (hue: number) => `oklch(0.65 0.16 ${hue})`;
const opposite = (hue: number) => (hue + 180) % 360;

/**
 * Complementary colours specimen: a hue wheel with a diameter drawn across it, so the
 * pair is shown as what it is, one line through the centre. The wheel and its line are
 * the subject; the card beside it is what spending the pair on an interface looks like.
 *
 * The wheel's own geometry is the reason the overlay rotates as one piece: a conic
 * gradient starts at the top and runs clockwise, so a diameter drawn vertically and
 * turned by the chosen hue lands one end on that hue and the other on its opposite
 * without the demo having to compute a second position.
 */
export function mount(root: HTMLElement): void {
  const presets = PRESETS.map(({ hue, label }) => `<button class="sp-chip" data-part="preset-${hue}">${label}</button>`).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-row" style="gap: 18px; align-items: center">
        <div data-part="wheel" data-subject data-pair="${START}"
             style="position: relative; width: 152px; height: 152px; border-radius: 50%; background: conic-gradient(${RING})">
          <div data-part="pair" style="position: absolute; inset: 0; rotate: ${START}deg">
            <span style="position: absolute; left: 50%; top: 17px; bottom: 17px; width: 2px; translate: -50% 0; background: var(--sp-surface)"></span>
            <span data-part="dot-a" style="position: absolute; left: 50%; top: 6px; width: 22px; height: 22px; translate: -50% 0; border: 3px solid var(--sp-surface); border-radius: 50%; background: ${colorAt(START)}"></span>
            <span data-part="dot-b" style="position: absolute; left: 50%; bottom: 6px; width: 22px; height: 22px; translate: -50% 0; border: 3px solid var(--sp-surface); border-radius: 50%; background: ${colorAt(opposite(START))}"></span>
          </div>
        </div>

        <div class="sp-surface sp-context" style="width: 172px; padding: 14px">
          <div class="sp-row sp-row--between">
            <span class="sp-heading" style="font-size: 14px">Evening set</span>
            <span data-part="badge" style="padding: 2px 8px; border-radius: 999px; font-size: 11px; color: #14161a; background: ${colorAt(opposite(START))}">2 left</span>
          </div>
          <p class="sp-text" style="margin: 6px 0 0">Doors at eight, one room, no support.</p>
          <button class="sp-button sp-button--sm" data-part="cta"
                  style="margin-top: 12px; width: 100%; color: #14161a; background: ${colorAt(START)}">Buy a ticket</button>
        </div>
      </div>

      <div class="sp-row sp-context" data-part="presets" style="margin-top: 4px">${presets}</div>
    </div>
  `;

  const wheel = part(root, 'wheel');
  const pair = part(root, 'pair');
  const dotA = part(root, 'dot-a');
  const dotB = part(root, 'dot-b');
  const badge = part(root, 'badge');
  const cta = part(root, 'cta');
  const picks = PRESETS.map((preset) => ({ preset, el: part(root, `preset-${preset.hue}`) }));

  const rotate = (hue: number) => {
    const other = opposite(hue);
    wheel.dataset.pair = String(hue);
    pair.style.rotate = `${hue}deg`;
    dotA.style.background = colorAt(hue);
    dotB.style.background = colorAt(other);
    cta.style.background = colorAt(hue);
    badge.style.background = colorAt(other);
    for (const pick of picks) flag(pick.el, 'data-selected', pick.preset.hue === hue);
  };
  rotate(START);

  for (const pick of picks) pick.el.addEventListener('click', () => rotate(pick.preset.hue));
}
