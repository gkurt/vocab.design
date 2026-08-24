import { localPoint, localSize } from '#src/kit/measure.ts';
import { part } from '#src/kit/parts.ts';

const CARD = { w: 330, h: 172 };
/** Where the script parks the pointer inside the card. No paint: these are aim anchors only. */
const AIMS = [
  { key: 'left', x: 46, y: 44 },
  { key: 'mid', x: 165, y: 96 },
  { key: 'right', x: 286, y: 52 },
] as const;

const ZONES = ['left', 'mid', 'right'] as const;

/**
 * Spotlight hover specimen: one dark card with a light under the pointer. A single
 * `pointermove` on the root writes the pointer's position into two custom properties on the
 * glow layer, and the layer's radial gradient is redrawn at that origin. Nothing is
 * restyled and nothing changes size, which is exactly the article's point about why this is
 * motion rather than colour.
 *
 * The subject is the glow layer, the element that traces the feature the term names (SPEC
 * §5). The card under it, its contents and the caption are the scene.
 *
 * The card carries `data-hover-driven`: moving a pointer across it IS this term's interaction,
 * so a reader's dwell there takes the stage over without a click (SPEC §7).
 *
 * No hover listeners are wired to repaint a control: the stage's player mirrors its own
 * pointer into the kit's attribute spellings already (SPEC §7). The two listeners here are
 * the term's own business, since whether the light is on at all is what the term claims. The
 * card's rectangle is read inside the move handler only through `getBoundingClientRect` on an
 * element nothing has just restyled, so no measurement follows a style write.
 *
 * `data-zone` reports which third of the card the light is centred in, which is how the
 * choreography proves the glow moved rather than merely appeared. The fade is a CSS
 * transition, so `motion.css` drops it for a reader who asked for less movement and the light
 * simply is or is not there; nothing waits on `transitionend`.
 *
 * The light goes out when the pointer leaves the card, so the pass ends at its mount state and
 * the tree persists across attract iterations (`data-loop="keep"`).
 */
export function mount(root: HTMLElement): void {
  const aim = (a: (typeof AIMS)[number]) =>
    `<span data-part="aim-${a.key}" aria-hidden="true"
           style="position: absolute; left: ${a.x - 8}px; top: ${a.y - 8}px; width: 16px; height: 16px; pointer-events: none"></span>`;

  root.innerHTML = `
    <div class="sp-app" data-loop="keep" style="gap: 9px">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Plans</span>
          <span class="sp-label" data-part="readout">dark</span>
        </div>
        <div
          class="sp-body"
          style="background: #0e1220; display: flex; align-items: center; justify-content: center"
        >
          <div
            class="sp-context"
            data-part="card"
            data-hover-driven
            style="position: relative; width: ${CARD.w}px; height: ${CARD.h}px; overflow: hidden;
                   border-radius: 12px; border: 1px solid #2a3149; background: #161b2c"
          >
            <span
              data-part="glow"
              data-subject
              data-zone="mid"
              aria-hidden="true"
              style="position: absolute; inset: 0; opacity: 0; pointer-events: none;
                     transition: opacity 220ms linear;
                     background: radial-gradient(170px circle at var(--x, 50%) var(--y, 50%),
                       rgb(132 162 255 / 0.58), rgb(132 162 255 / 0.16) 42%, transparent 70%)"
            ></span>

            <div
              style="position: relative; height: 100%; padding: 16px 18px; display: flex; flex-direction: column; gap: 9px"
            >
              <span
                style="align-self: flex-start; padding: 3px 9px; border-radius: 999px; font-size: 11px;
                       font-weight: 600; color: #cdd8ff; background: rgb(132 162 255 / 0.16)"
              >Studio</span>
              <span data-part="price" style="font-size: 22px; font-weight: 600; color: #f2f5ff">£24 a month</span>
              <span style="height: 8px; width: 78%; border-radius: 4px; background: rgb(210 220 255 / 0.22)"></span>
              <span style="height: 8px; width: 54%; border-radius: 4px; background: rgb(210 220 255 / 0.22)"></span>
              <button
                type="button"
                data-part="cta"
                style="margin-top: auto; align-self: flex-start; padding: 7px 14px; border: 0; border-radius: 8px;
                       font: inherit; font-weight: 500; color: #10142a; background: #dfe6ff; cursor: pointer"
              >Choose Studio</button>
            </div>

            ${AIMS.map(aim).join('')}
          </div>
        </div>
      </div>

      <p class="sp-text sp-context" data-part="caption" style="max-width: 460px; margin: 0; text-align: center">
        Two numbers change; the gradient is simply drawn somewhere else.
      </p>
    </div>
  `;

  const card = part(root, 'card');
  const glow = part(root, 'glow');
  const readout = part(root, 'readout');

  const darken = (): void => {
    glow.style.opacity = '0';
    readout.textContent = 'dark';
  };

  root.addEventListener('pointermove', (event) => {
    const target = event.target;
    const inside = target instanceof Element && target.closest('[data-part="card"]') !== null;
    if (!inside) {
      darken();
      return;
    }
    const box = localSize(card);
    const { x, y } = localPoint(event, card);
    glow.style.setProperty('--x', `${x}px`);
    glow.style.setProperty('--y', `${y}px`);
    glow.style.opacity = '1';
    const zone = ZONES[Math.min(2, Math.max(0, Math.floor((x / box.width) * 3)))] as string;
    glow.dataset.zone = zone;
    readout.textContent = zone;
  });

  // A pointer that has left the specimen entirely is not over the card either.
  root.addEventListener('pointerleave', darken);
}
