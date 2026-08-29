import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/**
 * Visual hierarchy specimen: identical copy in two cards. The subject is the ranked
 * card, where size, weight, colour and grouping put the title first, the accent action
 * second, and the body copy third; the flat twin beside it is scenery, set at one size
 * and one weight so nothing leads.
 *
 * The gaze chips sit in a gutter column the ranked card always reserves, so revealing
 * them cannot move a line (SPEC §5), and they are addressed as absolute settings by the
 * segmented control rather than toggled (SPEC §8). Their order is deliberately not
 * top to bottom: the accent button outranks the paragraph above it.
 */
const COPY = {
  eyebrow: 'Workshop',
  title: 'Typography for interfaces',
  meta: 'Thursday 14 March, Studio 2',
  body: 'Two hours on measure, leading, and scale.',
  action: 'Reserve a seat',
};

export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-row" style="align-items: flex-start; gap: 18px">
        <div class="sp-stack" style="gap: 8px">
          <div class="sp-surface" data-part="card-ranked" data-subject
               style="display: grid; grid-template-columns: 20px 1fr; align-items: start; row-gap: 2px; width: 216px; padding: 13px 13px 12px">
            <span style="grid-column: 2; font-size: 10px; font-weight: 600; letter-spacing: 0.14em; color: var(--sp-muted)">${COPY.eyebrow.toUpperCase()}</span>

            <span class="sp-chip" data-part="chip-1" aria-hidden="true"
                  style="grid-column: 1; justify-self: start; margin-top: 5px; padding: 0; width: 15px; height: 15px; justify-content: center; border-color: var(--sp-accent); background: var(--sp-accent-soft); font-size: 10px; font-weight: 700; opacity: 0; transition: opacity 0.2s var(--sp-ease)">1</span>
            <span style="grid-column: 2; margin-top: 2px; font-size: 18px; font-weight: 700; line-height: 1.15; letter-spacing: -0.015em">${COPY.title}</span>

            <span style="grid-column: 2; margin-top: 5px; font-size: 11px; color: var(--sp-muted)">${COPY.meta}</span>

            <span class="sp-chip" data-part="chip-3" aria-hidden="true"
                  style="grid-column: 1; justify-self: start; margin-top: 12px; padding: 0; width: 15px; height: 15px; justify-content: center; border-color: var(--sp-accent); background: var(--sp-accent-soft); font-size: 10px; font-weight: 700; opacity: 0; transition: opacity 0.2s var(--sp-ease)">3</span>
            <p style="grid-column: 2; margin: 10px 0 0; font-size: 12px; line-height: 1.45; color: var(--sp-muted)">${COPY.body}</p>

            <span class="sp-chip" data-part="chip-2" aria-hidden="true"
                  style="grid-column: 1; justify-self: start; margin-top: 18px; padding: 0; width: 15px; height: 15px; justify-content: center; border-color: var(--sp-accent); background: var(--sp-accent-soft); font-size: 10px; font-weight: 700; opacity: 0; transition: opacity 0.2s var(--sp-ease)">2</span>
            <button class="sp-button sp-button--sm" data-part="ranked-action" type="button"
                    style="grid-column: 2; justify-self: start; margin-top: 14px">${COPY.action}</button>
          </div>
          <span class="sp-label" style="text-align: center">ranked</span>
        </div>

        <div class="sp-stack sp-context" style="gap: 8px">
          <div class="sp-surface" data-part="card-flat"
               style="display: flex; flex-direction: column; gap: 6px; width: 216px; padding: 13px 13px 12px; font-size: 13px; line-height: 1.35">
            <span>${COPY.eyebrow}</span>
            <span>${COPY.title}</span>
            <span>${COPY.meta}</span>
            <p style="margin: 0; font-size: 13px; line-height: 1.35">${COPY.body}</p>
            <span style="align-self: start; padding: 4px 8px; border: 1px solid var(--sp-line); border-radius: 6px">${COPY.action}</span>
          </div>
          <span class="sp-label" style="text-align: center">flat</span>
        </div>
      </div>

      <div class="sp-row sp-context" data-part="tools" style="gap: 10px">
        <sp-segmented data-stage-mode class="sp-segmented" data-axis="Gaze order" data-part="switcher" data-value="off">
          <button class="sp-segment" type="button" data-part="seg-off" value="off">Hidden</button>
          <button class="sp-segment" type="button" data-part="seg-on" value="on">Numbered</button>
        </sp-segmented>
      </div>
    </div>
  `;

  const chips = [part(root, 'chip-1'), part(root, 'chip-2'), part(root, 'chip-3')];

  part(root, 'switcher').addEventListener('change', (event) => {
    const shown = (event as CustomEvent<string>).detail === 'on';
    for (const chip of chips) chip.style.opacity = shown ? '1' : '0';
  });
}
