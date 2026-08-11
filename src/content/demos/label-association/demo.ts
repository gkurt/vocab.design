import { flag, part } from '#src/kit/parts.ts';

const READINGS = {
  tied: '“Email address, edit text.” The words are the name, and the words are a target too.',
  loose: '“Edit text.” Nothing is attached, so nothing names the field and nothing is clickable.',
} as const;

/**
 * Label association specimen: two fields that look the same and are wired differently.
 * The first has a label pointing at the field's id, so pressing the words reaches the
 * control; the second has words that only sit above a placeholder, so pressing them
 * does nothing at all. The panel prints what each field announces as.
 *
 * The ring is simulated (`data-sim-focus`), because attract mode never moves real focus
 * (SPEC §7), and both presses are handled by the demo rather than left to the browser's
 * own label behaviour, which a synthesized click would never trigger (SPEC §8).
 *
 * The subject is the associated field as a unit: label plus control, since the term
 * names the link between them and neither half is it alone. The unattached field, the
 * markup captions, and the panel are scenery (SPEC §5); the panel holds its two lines
 * of room from mount.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 360px">
        <span class="sp-heading sp-context" style="font-size: 14px">Newsletter</span>
        <div class="sp-field" data-part="field-tied" data-subject style="margin-top: 14px">
          <label class="sp-label" for="vd-la-email" data-part="label-tied" style="cursor: pointer; width: fit-content">Email address</label>
          <input class="sp-input" id="vd-la-email" data-part="input-tied" value="ada@example.com" readonly />
        </div>
        <span class="sp-label sp-context" style="display: block; margin-top: 4px; font-size: 11px">&lt;label for="vd-la-email"&gt;</span>
        <div class="sp-field sp-context" data-part="field-loose" style="margin-top: 14px">
          <span class="sp-label" data-part="label-loose" style="cursor: pointer; width: fit-content">Postcode</span>
          <input class="sp-input" data-part="input-loose" placeholder="Postcode" readonly />
        </div>
        <span class="sp-label sp-context" style="display: block; margin-top: 4px; font-size: 11px">no for, no wrapping</span>
        <div class="sp-surface sp-context" style="margin-top: 14px; padding: 8px 10px">
          <span class="sp-label">Screen reader, on reaching the field</span>
          <p class="sp-text sp-text--ink" data-part="readout" data-state="idle" style="margin: 4px 0 0; height: 34px; font-size: 12px">
            Press either set of words
          </p>
        </div>
      </div>
    </div>
  `;

  const readout = part(root, 'readout');
  const tied = part(root, 'input-tied');

  part(root, 'label-tied').addEventListener('click', () => {
    flag(tied, 'data-sim-focus', true);
    readout.dataset.state = 'tied';
    readout.textContent = READINGS.tied;
  });

  part(root, 'label-loose').addEventListener('click', () => {
    // Pressing unattached words is not a no-op the demo invents: the browser has nothing
    // to send the press to, so the ring stays where it was left rather than moving here.
    flag(tied, 'data-sim-focus', false);
    readout.dataset.state = 'loose';
    readout.textContent = READINGS.loose;
  });
}
