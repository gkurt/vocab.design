import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The kit's own chevron, carrying the class that turns it a quarter when its trigger reports open. */
const SUBJECT = icon('chevronRight', 'sp-icon--chevron').replace(
  '<svg ',
  '<svg data-part="chevron" data-subject data-dir="right" style="width: 16px; height: 16px" ',
);

/** No chevronUp in the kit and the kit is frozen: the down glyph turned half a turn is the same drawing. */
const UP = icon('chevronDown').replace('<svg ', '<svg style="width: 14px; height: 14px; transform: rotate(180deg)" ');

const MEANING: Record<string, string> = {
  right: 'Points right: the section is shut.',
  down: 'Points down: its panel is open below.',
};

interface Picker extends HTMLElement {
  value: string;
}

/**
 * Chevron specimen: one settings card carrying the glyph in each of its three conventional
 * directions. A row that goes deeper points right, a select that drops a menu points down,
 * a "Collapse all" control points up, and the disclosure in the middle turns from right to
 * down as its section opens.
 *
 * The subject is that turning glyph itself, the narrowest element the term names: the row
 * is a list item, the control is a disclosure, and the word names only the two strokes that
 * report which way. It is honestly a chevron in both resting states, so no `data-pose`
 * condition is needed. Every other row, the picker and the card chrome are scenery.
 *
 * The rotation is the kit's own `.sp-icon--chevron` rule answering `aria-expanded` on the
 * trigger, which is the mechanism the article is about rather than a transform the demo
 * invented. The segmented control names an absolute state so a pass picked up anywhere
 * lands the same way (SPEC §8); the disclosure row itself may flip, which is the one place
 * a toggle is right, since the flip is what the glyph reports. The panel is drawn into room
 * reserved from mount, so opening moves nothing (SPEC §5).
 *
 * Two rows used to be annotated in the site's voice ("goes deeper", "this opens"), which no
 * settings card prints, and both are gone. The line reading what the glyph is pointing at
 * changes with the switch, so it is that switch's verdict: it carries `data-stage-verdict`
 * and the stage draws it in the strip instead of the card.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 288px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Checkout settings</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="State" data-part="picker" data-value="collapsed">
            <button class="sp-segment" type="button" data-part="seg-collapsed" value="collapsed" style="padding: 4px 10px; font-size: 12px">Collapsed</button>
            <button class="sp-segment" type="button" data-part="seg-expanded" value="expanded" style="padding: 4px 10px; font-size: 12px">Expanded</button>
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; justify-content: center">
          <div class="sp-surface" style="padding: 4px 8px">
            <div class="sp-list-item sp-context" data-part="row-payment">
              <span class="sp-grow">Payment methods</span>
              ${icon('chevronRight')}
            </div>

            <button
              class="sp-list-item"
              type="button"
              data-part="trigger"
              aria-expanded="false"
              aria-controls="vd-chevron-panel"
              style="width: 100%; border: 0; background: transparent; color: inherit; font: inherit; font-size: 13px; text-align: left; cursor: pointer"
            >
              <span class="sp-grow">Delivery options</span>
              <span style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 20px; height: 20px">${SUBJECT}</span>
            </button>

            <div style="position: relative; height: 50px">
              <div
                class="sp-surface sp-context"
                data-part="panel"
                id="vd-chevron-panel"
                style="position: absolute; inset: 2px 6px 4px; padding: 6px 10px; opacity: 0; visibility: hidden;
                       transition: opacity 0.18s, visibility 0.18s"
              >
                <p class="sp-text" style="margin: 0; font-size: 11px">Standard, 2 to 4 working days.</p>
                <p class="sp-text" style="margin: 3px 0 0; font-size: 11px">Named day, Thursday 21st.</p>
              </div>
            </div>

            <div class="sp-list-item sp-context" data-part="row-country">
              <span class="sp-grow">Country</span>
              <span class="sp-row" data-part="select" style="gap: 6px; padding: 3px 8px; border: 1px solid var(--sp-line); border-radius: 6px; background: var(--sp-surface)">
                <span style="font-size: 12px">United Kingdom</span>
                ${icon('chevronDown')}
              </span>
            </div>

            <div class="sp-row sp-context" style="gap: 12px; padding: 6px 2px 4px; justify-content: flex-end">
              <span class="sp-label" data-stage-verdict data-part="meaning" data-dir="right"
                    style="flex: 1 1 auto; min-width: 0; height: 15px; font-size: 11px; line-height: 15px; white-space: nowrap; overflow: hidden">${MEANING.right}</span>
              <button
                class="sp-button sp-button--ghost sp-button--sm"
                type="button"
                data-part="collapse-all"
                style="display: flex; align-items: center; gap: 6px; flex: 0 0 auto; padding: 3px 8px; font-size: 12px"
              >Collapse all ${UP}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const picker = part(root, 'picker') as Picker;
  const trigger = part(root, 'trigger');
  const chevron = part(root, 'chevron');
  const panel = part(root, 'panel');
  const meaning = part(root, 'meaning');

  const setOpen = (open: boolean) => {
    trigger.setAttribute('aria-expanded', String(open));
    // Read back off the glyph's own direction rather than tracking it beside the markup.
    chevron.dataset.dir = open ? 'down' : 'right';
    meaning.dataset.dir = open ? 'down' : 'right';
    panel.style.opacity = open ? '1' : '0';
    panel.style.visibility = open ? 'visible' : 'hidden';
    meaning.textContent = MEANING[open ? 'down' : 'right'] ?? '';
  };

  picker.addEventListener('change', (event) => setOpen((event as CustomEvent<string>).detail === 'expanded'));

  // The disclosure may flip, because here the flip is what the glyph is reporting (SPEC §8).
  // It routes through the picker so the two never disagree about which state is on screen.
  trigger.addEventListener('click', () => {
    picker.value = trigger.getAttribute('aria-expanded') === 'true' ? 'collapsed' : 'expanded';
  });

  part(root, 'collapse-all').addEventListener('click', () => {
    picker.value = 'collapsed';
  });

  setOpen(false);
}
