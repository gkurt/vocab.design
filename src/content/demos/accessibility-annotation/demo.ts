import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'bare' | 'annotated';

/** The four things a comp cannot say, each pinned to the element it is about. */
const NOTES = [
  { n: 1, text: 'Alt text: “Merino coat, grey, front view”.' },
  { n: 2, text: 'Heading level 2. Set small, still second in the outline.' },
  { n: 3, text: 'Focus order 1 of 2, reached before Save.' },
  { n: 4, text: 'Button, name “Save for later”. The heart says nothing.' },
] as const;

/** Where each pin sits in the mockup's reserved left gutter. */
const PINS = [
  { n: 1, top: 24 },
  { n: 2, top: 64 },
  { n: 3, top: 106 },
  { n: 4, top: 138 },
] as const;

const CAPTION = {
  bare: 'A comp says how it looks. Heading level, focus order, roles, and alt text are not visible properties, so nothing in the file carries them.',
  annotated:
    'The same comp with the invisible decisions written down: what each element is, what it is called, and in what order it is reached.',
} as const;

/**
 * Accessibility annotation specimen: one handoff card with a pick between the bare mockup a
 * developer usually receives and the annotated one, where the four things a picture cannot show are
 * stated in the file.
 *
 * The subject is the annotation layer, the column of notes that travels with the design. The pins in
 * the mockup are the layer's anchors and stay in the context register with the mockup they sit on
 * (SPEC §5): the ring belongs around the notes, which are what the term names and what a handoff
 * actually contains. The mockup, the pins, the picker and the caption are scenery. The notes are off
 * stage in the bare state, which identify summons out of, and they are the term in every state they
 * are on stage in, so no `data-pose` is needed.
 *
 * The panel holds the notes and the bare-state placeholder in the same reserved box, so switching
 * moves nothing (SPEC §5). The placeholder is the panel's empty state and says only that ("No
 * notes on this file."): it used to explain what a comp cannot carry, which is the article's job
 * and not something a handoff tool would print in an empty list. No timers: both states are
 * reached by a pick.
 */
export function mount(root: HTMLElement): void {
  const badge = (n: number, extra: string) => `
    <span style="display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto;
                 width: 15px; height: 15px; border-radius: 50%; background: var(--sp-accent);
                 color: var(--sp-accent-ink); font-size: 9px; font-weight: 600; ${extra}">${n}</span>`;

  const noteRow = ({ n, text }: { n: number; text: string }) => `
    <div class="sp-row" data-part="note-${n}" style="align-items: flex-start; gap: 8px; height: 28px">
      ${badge(n, 'margin-top: 1px')}
      <span class="sp-text sp-text--ink" style="flex: 1 1 auto; min-width: 0; font-size: 10.5px; line-height: 1.3">${text}</span>
    </div>`;

  const pin = ({ n, top }: { n: number; top: number }) => `
    <span data-part="pin-${n}" style="position: absolute; left: 7px; top: ${top}px; opacity: 0;
                                      transition: opacity 0.2s ease">${badge(n, '')}</span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 11px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Handoff, one product card</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="bare" data-axis="Version" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-bare" value="bare"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Bare mockup</button>
            <button class="sp-segment" type="button" data-part="seg-annotated" value="annotated"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Annotated</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="align-items: stretch; gap: 12px; margin-top: 9px">
          <div class="sp-surface sp-context" data-part="mockup"
               style="position: relative; flex: 0 0 auto; width: 176px; height: 170px;
                      padding: 10px 10px 10px 28px">
            <div style="height: 46px; border-radius: 5px; background: var(--sp-line)"></div>
            <div class="sp-heading" style="margin-top: 6px; font-size: 13px; line-height: 16px">Merino coat</div>
            <div class="sp-label" style="margin-top: 2px; font-size: 11px; line-height: 14px">&#163;180.00</div>
            <button class="sp-button sp-button--sm" type="button" data-part="buy"
                    style="width: 100%; height: 26px; margin-top: 6px; font-size: 11.5px">Add to basket</button>
            <button class="sp-icon-button" type="button" data-part="save"
                    style="margin-top: 6px; width: 26px; height: 26px">${icon('heart')}</button>
            ${PINS.map(pin).join('')}
          </div>

          <div class="sp-surface" style="flex: 1 1 auto; min-width: 0; height: 170px; padding: 8px 10px">
            <span class="sp-label sp-context" style="font-size: 10px">Notes on the file</span>
            <div style="position: relative; height: 138px; margin-top: 5px">
              <p class="sp-text sp-context" data-part="placeholder"
                 style="position: absolute; inset: 0; margin: 0; font-size: 11px; line-height: 1.4;
                        transition: opacity 0.2s, visibility 0.2s">
                No notes on this file.</p>
              <div class="sp-stack" data-part="notes" data-subject
                   style="position: absolute; inset: 0; gap: 6px; opacity: 0; visibility: hidden;
                          transition: opacity 0.2s, visibility 0.2s">
                ${NOTES.map(noteRow).join('')}
              </div>
            </div>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="bare"
           style="margin: 9px 0 0; height: 30px; font-size: 11px; line-height: 1.35">${CAPTION.bare}</p>
      </div>
    </div>
  `;

  const notes = part(root, 'notes');
  const placeholder = part(root, 'placeholder');
  const caption = part(root, 'caption');
  const pins = PINS.map((p) => part(root, `pin-${p.n}`));

  const show = (el: HTMLElement, on: boolean) => {
    el.style.opacity = on ? '1' : '0';
    el.style.visibility = on ? 'visible' : 'hidden';
  };

  part(root, 'mode').addEventListener('change', (event) => {
    const mode = (event as CustomEvent<string>).detail as Mode;
    const on = mode === 'annotated';
    show(notes, on);
    show(placeholder, !on);
    for (const p of pins) p.style.opacity = on ? '1' : '0';
    caption.dataset.mode = mode;
    caption.textContent = CAPTION[mode];
  });
}
