import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'soft' | 'hard';

/** The stops Tab can reach with each spelling. The middle one is the whole question. */
const STOPS: Record<Mode, string[]> = {
  soft: ['back', 'submit', 'help'],
  hard: ['back', 'help'],
};

const WHERE: Record<string, string> = {
  back: 'Back button',
  submit: 'Submit order button',
  help: 'Help button',
};

const SAY: Record<string, string> = {
  back: '“Back, button”',
  submit: '“Submit order, unavailable. Add an address.”',
  help: '“Help, button”',
};

const CAPTION: Record<Mode, string> = {
  soft: 'Both spellings draw the same dimmed button. This one stays in the sequence, so the reader lands on it and hears what is missing.',
  hard: 'The disabled attribute takes it out of the sequence, so one Tab crosses the whole row. The reason it is off is on screen, and never reached.',
};

/**
 * Focusable disabled specimen: a checkout footer whose Submit order button is unavailable
 * either way, under a segmented control picking which spelling says so. The Press Tab button
 * walks a simulated ring along the row, so the ring lands on the button in one spelling and
 * steps over it in the other, and the announcement line shows what is lost with it: the
 * description that explains why the order cannot be placed.
 *
 * The subject is the unavailable button, the narrowest element the term names. A ring around
 * the row would name the footer and a ring around the window would name the screen. The
 * segmented control, the Back and Help buttons, the total, the hint, the Press Tab button,
 * the readouts and the caption are scenery (SPEC §5). The `disabled` spelling is the
 * counter-example, so the honest condition lives in `data-pose` and the mount state satisfies
 * it: identify refuses to ring a button that has left the sequence, and plays on (SPEC §6).
 *
 * The ring is `data-sim-focus` and nothing here calls `.focus()`: attract never moves real
 * focus (SPEC §7). Tab is a button for the same reason, since the player's own Tab would walk
 * every focusable element in the root. The walk clamps at the last stop and each segment
 * reaches its own spelling rather than toggling (SPEC §8). The button keeps its box in both
 * spellings and every readout is a reserved row, so nothing moves (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Switched off with" data-term="soft" data-value="soft" style="margin-left: auto">
            <button class="sp-segment" data-part="seg-soft" value="soft">aria-disabled</button>
            <button class="sp-segment" data-part="seg-hard" value="hard">disabled</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" style="margin-top: 9px; padding: 10px 12px">
          <div class="sp-row sp-row--between sp-context" style="gap: 10px; height: 18px">
            <span class="sp-label" style="flex: 0 0 auto">Order total</span>
            <span class="sp-text sp-text--ink" style="flex: 0 0 auto; font-size: 12px">$48.20</span>
          </div>

          <div class="sp-row" style="margin-top: 10px; gap: 8px">
            <button class="sp-button sp-button--ghost sp-button--sm sp-context" type="button" data-part="back">Back</button>
            <button class="sp-button sp-button--sm" type="button" data-part="submit" data-subject
                    data-pose="[data-soft]" data-soft aria-disabled="true" aria-describedby="why-off">Submit order</button>
            <button class="sp-button sp-button--ghost sp-button--sm sp-context" type="button" data-part="help">Help</button>
          </div>

          <p class="sp-label sp-context" id="why-off" data-part="hint"
             style="margin: 9px 0 0; font-size: 10.5px">Add a delivery address to continue.</p>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; gap: 10px">
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="tab">Press Tab</button>
          <span class="sp-text sp-text--ink" data-part="where" data-at="back"
                style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap">${WHERE.back}</span>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; height: 18px; gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Announced</span>
          <span class="sp-text sp-text--ink" data-part="say" data-at="back"
                style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap">${SAY.back}</span>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="soft"
           style="margin: 6px 0 0; height: 34px; font-size: 11px">${CAPTION.soft}</p>
      </div>
    </div>
  `;

  const submit = part(root, 'submit') as HTMLButtonElement;
  const where = part(root, 'where');
  const say = part(root, 'say');
  const caption = part(root, 'caption');

  let mode: Mode = 'soft';
  let at = 0;

  const paint = () => {
    const stops = STOPS[mode];
    const here = stops[at] ?? stops[0] ?? 'back';

    for (const key of ['back', 'submit', 'help']) flag(part(root, key), 'data-sim-focus', key === here);

    where.dataset.at = here;
    where.textContent = WHERE[here] ?? '';
    say.dataset.at = here;
    say.textContent = SAY[here] ?? '';
  };

  const apply = (next: Mode) => {
    mode = next;
    at = 0;

    // Both spellings are written for real, so the demo is the difference rather than a
    // description of it: one leaves the button in the sequence, the other removes it.
    const soft = next === 'soft';
    flag(submit, 'data-soft', soft);
    submit.disabled = !soft;
    if (soft) submit.setAttribute('aria-disabled', 'true');
    else submit.removeAttribute('aria-disabled');

    caption.dataset.mode = next;
    caption.textContent = CAPTION[next];
    paint();
  };

  apply('soft');

  // The walk clamps at the last stop, so a pass joined halfway proves the same route.
  part(root, 'tab').addEventListener('click', () => {
    at = Math.min(at + 1, STOPS[mode].length - 1);
    paint();
  });

  part(root, 'segmented').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Mode);
  });
}
