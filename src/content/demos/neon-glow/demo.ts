import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The lit state: a near-white core, and the hue carried entirely by the halos. */
const LIT = {
  color: '#fff1fb',
  borderColor: '#ff5fd2',
  textShadow: '0 0 4px #ffd9f4, 0 0 12px #ff5fd2, 0 0 30px rgb(255 47 194 / 0.75), 0 0 62px rgb(255 47 194 / 0.45)',
  boxShadow:
    '0 0 6px rgb(255 95 210 / 0.9), 0 0 22px rgb(255 47 194 / 0.65), 0 0 54px rgb(255 47 194 / 0.4), inset 0 0 12px rgb(255 95 210 / 0.5)',
};

/** The same saturated colour with every halo removed: filled, not lit. */
const FLAT = {
  color: '#ff5fd2',
  borderColor: '#ff5fd2',
  textShadow: 'none',
  boxShadow: 'none',
};

/**
 * Neon specimen: the sign is the subject, because the term names one treatment that a
 * single element can carry on both its type and its edge, and the wall behind it is
 * scenery. The picker chooses a treatment rather than toggling one (SPEC §8), so a
 * pass interrupted anywhere still ends up lit.
 *
 * Nothing here animates: the glow is a stack of static shadows, and the only thing a
 * flicker would add is a motion risk the term does not need.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" style="padding: 0; gap: 16px">
      <div class="sp-context" data-part="wall" aria-hidden="true"
           style="position: absolute; inset: 0; background-image: repeating-linear-gradient(to bottom, rgb(255 255 255 / 0.035) 0 1px, transparent 1px 26px), repeating-linear-gradient(to right, rgb(255 255 255 / 0.035) 0 1px, transparent 1px 54px), radial-gradient(circle at 50% 42%, #241a2e, #0c0910 76%)"></div>

      <div data-part="sign" data-subject data-lit="neon"
           style="position: relative; padding: 14px 26px 16px; border: 2px solid ${LIT.borderColor}; border-radius: 16px; color: ${LIT.color}; text-align: center; text-shadow: ${LIT.textShadow}; box-shadow: ${LIT.boxShadow}">
        <div data-part="wordmark" style="font-size: 34px; font-weight: 700; letter-spacing: 0.08em; line-height: 1.1">LATE BAR</div>
        <div style="margin-top: 2px; font-size: 12px; font-weight: 600; letter-spacing: 0.34em">OPEN TILL 3</div>
      </div>

      <div class="sp-row sp-context" style="position: relative; gap: 10px">
        <sp-segmented data-stage-mode class="sp-segmented" data-part="treatment" data-value="neon" data-axis="Treatment">
          <button class="sp-segment" data-part="pick-flat" value="flat">Flat</button>
          <button class="sp-segment" data-part="pick-neon" value="neon">Neon</button>
        </sp-segmented>
      </div>
    </div>
  `;

  const sign = part(root, 'sign');
  const picker = part(root, 'treatment');

  picker.addEventListener('change', (event) => {
    const value = (event as CustomEvent<string>).detail;
    const look = value === 'flat' ? FLAT : LIT;
    sign.dataset.lit = value === 'flat' ? 'flat' : 'neon';
    sign.style.color = look.color;
    sign.style.borderColor = look.borderColor;
    sign.style.textShadow = look.textShadow;
    sign.style.boxShadow = look.boxShadow;
  });
}
