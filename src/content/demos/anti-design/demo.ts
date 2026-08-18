/**
 * Anti-design specimen: one product card set twice, once in a house style and once in the
 * anti-design register, side by side so the break reads as a decision rather than as a
 * rendering fault. The wrecked copy carries the register's whole checklist: two system faces
 * that have no business together, elements set off the grid and rotated, unmodulated
 * saturated colour, a control left in its raw bevelled system state, and a photograph
 * stretched out of its aspect ratio.
 *
 * The paint is inline because the clash is the term. The kit is one accent, one radius, one
 * type scale and a set of neutrals chosen to agree with each other, so a card assembled from
 * kit tokens cannot disagree with itself, which is the only thing this specimen has to show.
 *
 * The subject is the anti-design card, not the pair and not the house copy: the term names a
 * register spent on a design, and the card is the narrowest thing on stage that actually is
 * one (SPEC §5). The house card, the labels and the caption are the scenery that makes the
 * break legible.
 *
 * The ink stays legible on purpose. The article's own point is that a statement nobody can
 * operate is not read as a statement, so the type here is saturated and clashing but still
 * carries contrast against its ground, and the buy control is still the biggest target.
 *
 * Static: a card has no states, so there is nothing to animate and no clock to take.
 */
const GROUND = '#00e0c8';
const HOT = '#ff1f8f';
const DEEP = '#1b0140';
const ACID = '#ffd400';
const LINK = '#0000ee';
const SYSTEM_FACE = "'Comic Sans MS', 'Chalkboard SE', cursive";
const BOOK_FACE = "'Times New Roman', Times, serif";
const TYPEWRITER = "'Courier New', Courier, monospace";

const W = 206;
const H = 164;

/** One column of the pair: the card, then what it is showing. */
function column(label: string, note: string, body: string, quiet: boolean): string {
  return `
    <div class="sp-stack${quiet ? ' sp-context' : ''}" style="flex: 0 0 ${W}px; gap: 5px; align-items: stretch">
      ${body}
      <span class="sp-label" style="color: var(--sp-ink); font-size: 12px">${label}</span>
      <span class="sp-text" style="margin: 0; font-size: 11px; line-height: 1.35">${note}</span>
    </div>`;
}

export function mount(root: HTMLElement): void {
  const house = `
    <div data-part="card-house"
         style="display: flex; flex-direction: column; gap: 7px; width: ${W}px; height: ${H}px; padding: 12px;
                background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)">
      <span data-part="house-photo" aria-hidden="true"
            style="position: relative; display: block; height: 54px; border-radius: 6px; overflow: hidden;
                   background: var(--sp-sunken)">
        <span style="position: absolute; left: 50%; top: 50%; width: 44px; height: 44px; border-radius: 50%;
                     background: var(--sp-line); translate: -50% -50%"></span>
      </span>
      <span class="sp-heading" data-part="house-heading" style="font-size: 15px">Bell stool</span>
      <span class="sp-text" style="font-size: 11px; line-height: 1.3">Powder-coated steel, three heights.</span>
      <div class="sp-row sp-row--between" style="margin-top: auto">
        <span style="font-size: 13px; font-weight: 600">£140</span>
        <button type="button" class="sp-button sp-button--sm" data-part="house-button">Add to bag</button>
      </div>
    </div>`;

  const anti = `
    <div data-part="card-anti" data-subject
         style="position: relative; width: ${W}px; height: ${H}px; overflow: hidden; background: ${GROUND};
                border: 3px solid ${DEEP}">
      <span data-part="anti-photo" aria-hidden="true"
            style="position: absolute; left: 8px; top: 8px; width: 112px; height: 56px; overflow: hidden;
                   background: ${ACID}; border: 2px solid ${DEEP}; rotate: -4deg">
        <span style="position: absolute; left: 50%; top: 50%; width: 46px; height: 46px; border-radius: 50%;
                     background: ${DEEP}; translate: -50% -50%; scale: 2.1 0.6"></span>
      </span>

      <span data-part="anti-price"
            style="position: absolute; left: 100px; top: 44px; padding: 3px 7px 4px; background: ${HOT}; color: #ffffff;
                   font-family: ${TYPEWRITER}; font-size: 15px; font-weight: 700; line-height: 1.1; rotate: 4deg">
        140.00
      </span>

      <span data-part="anti-heading"
            style="position: absolute; left: -3px; top: 72px; font-family: ${BOOK_FACE}; font-size: 31px; font-weight: 700;
                   letter-spacing: -0.015em; line-height: 1; color: ${DEEP}; rotate: -3deg">
        Bell stool
      </span>

      <span data-part="anti-sub"
            style="position: absolute; left: 15px; top: 108px; font-family: ${SYSTEM_FACE}; font-size: 13px;
                   line-height: 1.2; color: #a3004f">
        steel!!! 3 heights
      </span>

      <span data-part="anti-link"
            style="position: absolute; left: 15px; top: 130px; font-family: ${BOOK_FACE}; font-size: 13px;
                   line-height: 1.2; color: ${LINK}; text-decoration: underline">
        more info
      </span>

      <button type="button" data-part="anti-button"
              style="position: absolute; right: 8px; bottom: 10px; padding: 5px 12px 6px; border: 3px outset #e8e6e0;
                     background: #c8c4bc; color: #000000; font-family: ${BOOK_FACE}; font-size: 15px; line-height: 1.1;
                     cursor: pointer; rotate: 2deg">
        BUY
      </button>
    </div>`;

  root.innerHTML = `
    <div class="sp-app" style="gap: 9px">
      <div class="sp-window" style="width: 466px; padding: 11px 14px 13px">
        <span class="sp-heading" data-part="heading" style="display: block; margin-bottom: 9px">One card, two attitudes</span>

        <div class="sp-row" data-part="tour" style="gap: 14px; align-items: flex-start; justify-content: center">
          ${column('House style', 'One scale, one accent, all on grid.', house, true)}
          ${column('Anti-design', 'Same card, rules broken on purpose.', anti, false)}
        </div>
      </div>

      <p class="sp-text sp-context" data-part="caption" style="max-width: 466px; margin: 0; text-align: center">
        A break reads as a decision only if something nearby is still under control.
      </p>
    </div>
  `;
}
