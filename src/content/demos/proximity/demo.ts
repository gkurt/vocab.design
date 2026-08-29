import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The three ways this specimen can arrange the same six items. */
const MODES: Record<string, { within: number; between: number; boxed: boolean; note: string }> = {
  even: {
    within: 12,
    between: 12,
    boxed: false,
    note: 'Every gap is 12px. The third label is as close to the field above it as to its own, so the pairs have to be read rather than seen.',
  },
  spacing: {
    within: 3,
    between: 22,
    boxed: false,
    note: '3px inside a pair, 22px between pairs. Nothing has been drawn, and the three pairs are already obvious.',
  },
  boxes: {
    within: 3,
    between: 8,
    boxed: true,
    note: 'Enclosure says the same thing, louder: three more borders on the page to make a point the spacing had already made.',
  },
};

const FIELDS = [
  { label: 'Card number', value: '4242 4242 4242 4242' },
  { label: 'Expiry', value: '09 / 28' },
  { label: 'Security code', value: '• • •' },
];

/**
 * Proximity specimen: one set of six items (three labels and the three fields they belong
 * to), arranged three ways. Only the gaps change between the states. No rule, no fill and
 * no reordering, so whatever the reader sees grouping in the middle state is the spacing.
 *
 * The subject is the field set, the narrowest element the term names: the card it sits on,
 * the switcher and the reading beside it are the scene it is read against (SPEC §5).
 *
 * Two of the three states are counter-examples the subject itself passes through: the even
 * one groups nothing, and the boxed one groups by enclosure rather than by nearness. The
 * honest state is declared in `data-pose`, so identify keeps playing rather than ringing
 * either of them, and the mount state satisfies it (SPEC §6).
 */
export function mount(root: HTMLElement): void {
  const groups = FIELDS.map(
    (field, index) => `
      <div class="sp-stack" data-part="group-${index + 1}" style="gap: 3px">
        <span class="sp-label" data-part="label-${index + 1}">${field.label}</span>
        <div class="sp-input" data-part="field-${index + 1}" style="padding: 3px 8px; font-size: 12px; color: var(--sp-muted)">${field.value}</div>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 470px; height: 296px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Grouping</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-value="spacing" data-axis="Method" data-term="spacing">
            <button class="sp-segment" type="button" data-part="seg-even" value="even">even</button>
            <button class="sp-segment" type="button" data-part="seg-spacing" value="spacing">spacing</button>
            <button class="sp-segment" type="button" data-part="seg-boxes" value="boxes">boxes</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; align-items: flex-start; gap: 14px; padding: 12px">
          <div class="sp-surface" data-part="card" style="flex: 0 0 auto; width: 250px; height: 212px; padding: 8px 10px">
            <div class="sp-stack" data-part="fields" data-subject data-mode="spacing" data-pose="[data-mode=spacing]" style="gap: 22px">
              ${groups}
            </div>
          </div>
          <div class="sp-stack sp-context" style="flex: 1 1 auto; min-width: 0; gap: 6px">
            <span class="sp-label">what the reader gets for free</span>
            <span class="sp-text" data-part="readout" style="height: 150px; font-size: 12px"></span>
          </div>
        </div>
      </div>
    </div>
  `;

  const fields = part(root, 'fields');
  const readout = part(root, 'readout');
  const groupParts = FIELDS.map((_, index) => part(root, `group-${index + 1}`));

  const apply = (key: string) => {
    const mode = MODES[key];
    if (!mode) return;
    fields.dataset.mode = key;
    fields.style.gap = `${mode.between}px`;
    for (const group of groupParts) {
      group.style.gap = `${mode.within}px`;
      group.style.padding = mode.boxed ? '5px 8px' : '0';
      group.style.border = mode.boxed ? '1px solid var(--sp-line)' : '1px solid transparent';
      group.style.borderRadius = 'var(--sp-radius)';
      flag(group, 'data-boxed', mode.boxed);
    }
    readout.textContent = mode.note;
  };

  // Each segment names an arrangement, so the switch lands on that arrangement
  // rather than flipping whichever one it finds (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('spacing');
}
