import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const LEVELS = {
  normal: {
    readout: 'Hairline dividers, secondary text set back, a tinted badge.',
    // The card's own tokens, left as the kit states them.
    tokens: { '--sp-line': '', '--sp-muted': '', '--sp-accent-soft': '' },
  },
  more: {
    readout: 'Borders and secondary text at full ink; the tint gets an edge.',
    // Lightness differences only: the accent keeps its hue, and both themes resolve
    // these against their own ink, which is why nothing here is a literal colour.
    tokens: { '--sp-line': 'var(--sp-ink)', '--sp-muted': 'var(--sp-ink)', '--sp-accent-soft': 'transparent' },
  },
} as const;

type Level = keyof typeof LEVELS;

/**
 * Increased contrast specimen: one card rendered at the theme's default and at the
 * stronger version the preference asks for. The switch simulates the system setting:
 * nothing here reads the reader's real preference, because the kit answers that a level
 * up.
 *
 * The subject is the card, since the term names what the preference is done to. The
 * switch and the readout are scenery. Only colours change between the two renderings:
 * every border that strengthens is already drawn at rest, so the card cannot move or
 * resize when the preference comes on (SPEC §5).
 *
 * Nothing but the card is drawn inside the frame now. The readout ("Hairline dividers,
 * secondary text set back, a tinted badge.") is the author's reading of the state and it
 * changes with the switch, so the stage draws it in the strip as the verdict (SPEC §5.1);
 * the line under it that disclosed the simulation ("The switch simulates the setting; the
 * card does not read your real one.") was the site talking inside a billing card, and this
 * docblock is where that belongs.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 424px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-grow"></span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Simulated setting" data-value="normal">
            <button class="sp-segment" data-part="seg-normal" value="normal">No preference</button>
            <button class="sp-segment" data-part="seg-more" value="more">More contrast</button>
          </sp-segmented>
        </div>
        <div class="sp-surface" data-part="card" data-subject data-contrast="normal" style="margin-top: 12px; padding: 12px 14px">
          <div class="sp-row sp-row--between">
            <span class="sp-heading" style="font-size: 14px">Billing</span>
            <span class="sp-chip" data-part="badge" style="cursor: default; background: var(--sp-accent-soft); border-color: var(--sp-accent-soft)">Trial</span>
          </div>
          <p class="sp-text" style="margin: 6px 0 0">Your plan renews on 3 September. Invoices go to the workspace owner.</p>
          <div class="sp-divider" style="margin: 10px 0"></div>
          <div class="sp-row">
            <span class="sp-label sp-grow">Card ending 4417</span>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="change">Change</button>
          </div>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="readout" style="margin-top: 10px; font-size: 12px">
          ${LEVELS.normal.readout}
        </p>
      </div>
    </div>
  `;

  const card = part(root, 'card');
  const badge = part(root, 'badge');
  const readout = part(root, 'readout');

  // Each segment reaches its own level rather than flipping the other's (SPEC §8).
  const apply = (level: Level) => {
    card.dataset.contrast = level;
    for (const [token, value] of Object.entries(LEVELS[level].tokens)) {
      if (value) card.style.setProperty(token, value);
      else card.style.removeProperty(token);
    }
    // The badge carried its meaning in a tint alone, so the stronger rendering gives it
    // an edge instead of a louder fill.
    badge.style.borderColor = level === 'more' ? 'var(--sp-ink)' : 'var(--sp-accent-soft)';
    readout.textContent = LEVELS[level].readout;
  };

  part(root, 'segmented').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail === 'more' ? 'more' : 'normal');
  });
}
