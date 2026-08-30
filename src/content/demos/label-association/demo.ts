import { flag, part } from '#src/kit/parts.ts';

const READINGS = {
  idle: 'Nothing read yet',
  tied: '“Email address, edit text.”',
  loose: '“Edit text.”',
} as const;

/**
 * Label association specimen: two fields that look the same and are wired differently.
 * The first has a label pointing at the field's id, so pressing the words reaches the
 * control; the second has words that only sit above a placeholder, so pressing them
 * does nothing at all. The say lane prints what each field announces as.
 *
 * The ring is simulated (`data-sim-focus`), because attract mode never moves real focus
 * (SPEC §7), and both presses are handled by the demo rather than left to the browser's
 * own label behaviour, which a synthesized click would never trigger (SPEC §8).
 *
 * The subject is the associated field as a unit: label plus control, since the term
 * names the link between them and neither half is it alone. The unattached field and the
 * markup captions are scenery (SPEC §5).
 *
 * What each field announces as is speech, so it is `data-stage-announce` and the stage
 * draws it in the say lane. It used to sit in a panel inside the window under the heading
 * "Screen reader, on reaching the field", which is a stage direction dressed as product UI:
 * there is no screen reader in the scene to label. The utterances lost the sentence of
 * explanation each carried after the quote, since a screen reader says only the quote and
 * the article makes the argument. The caption under the unattached field read "no for, no
 * wrapping" and now names the markup the way its partner does.
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
        <span class="sp-label sp-context" style="display: block; margin-top: 4px; font-size: 11px">&lt;span&gt;Postcode&lt;/span&gt;</span>
      </div>
      <p data-stage-announce data-part="readout" data-state="idle">${READINGS.idle}</p>
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
