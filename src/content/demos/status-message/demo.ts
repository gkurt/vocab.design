import { part } from '#src/kit/parts.ts';

const HEARD = {
  spoken: '“Saved”',
  silent: 'Silence. Nothing was announced.',
} as const;

const FOCUS = {
  idle: 'Nowhere yet',
  kept: 'Still on Save',
} as const;

/**
 * Status message specimen: the same word, "Saved", reported twice. Above, it lands in a
 * marked container and the screen reader line repeats it; below, the identical word is
 * painted into a plain span and the reader hears nothing at all. Neither press moves
 * focus, which the readout states, because a message that took focus would be a different
 * pattern.
 *
 * The subject is the marked status message itself, the narrowest thing the term names: not
 * the row it sits in and not the button that produced it. It ships in the page empty, which
 * is what a reader's software needs in order to notice the text arriving at all, so it has
 * no box until the save happens and identify summons it by fast-forwarding the script
 * (SPEC §6). Its slot holds the room from mount, so arriving moves nothing (SPEC §5). The
 * silent copy below is the counterexample and says so in its own caption; both save buttons
 * and the reader strip are scenery.
 *
 * No timers: politeness and queueing belong to the live region term, and this specimen is
 * about whether the change is announced at all.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 428px">
        <span class="sp-label sp-context">Account settings</span>

        <div class="sp-row sp-row--between" style="margin-top: 10px; gap: 12px">
          <div class="sp-context">
            <span class="sp-text sp-text--ink">Email notifications</span>
            <p class="sp-text" style="margin: 2px 0 0; font-size: 11px">Marked up with role="status"</p>
          </div>
          <div class="sp-row" style="gap: 10px">
            <div style="width: 62px; height: 20px; text-align: right">
              <span class="sp-text sp-text--ink" role="status" data-part="status" data-subject
                    style="font-size: 12px; white-space: nowrap"></span>
            </div>
            <button class="sp-button sp-button--sm sp-context" type="button" data-part="save-good">Save</button>
          </div>
        </div>

        <div class="sp-divider sp-context" style="margin: 12px 0"></div>

        <div class="sp-row sp-row--between sp-context" style="gap: 12px">
          <div>
            <span class="sp-text sp-text--ink">Profile photo</span>
            <p class="sp-text" style="margin: 2px 0 0; font-size: 11px">A plain span (the mistake)</p>
          </div>
          <div class="sp-row" style="gap: 10px">
            <div style="width: 62px; height: 20px; text-align: right">
              <span class="sp-text sp-text--ink" data-part="ghost-status" style="font-size: 12px; white-space: nowrap"></span>
            </div>
            <button class="sp-button sp-button--sm" type="button" data-part="save-bad">Save</button>
          </div>
        </div>

        <div class="sp-surface sp-context" style="margin-top: 14px; padding: 8px 10px">
          <div class="sp-row sp-row--between" style="height: 18px">
            <span class="sp-label">Screen reader</span>
            <span class="sp-text sp-text--ink" data-part="heard" data-state="idle" style="font-size: 12px">Nothing announced yet</span>
          </div>
          <div class="sp-row sp-row--between" style="height: 18px; margin-top: 2px">
            <span class="sp-label">Keyboard focus</span>
            <span class="sp-text sp-text--ink" data-part="focus" style="font-size: 12px">${FOCUS.idle}</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const status = part(root, 'status');
  const ghost = part(root, 'ghost-status');
  const heard = part(root, 'heard');
  const focus = part(root, 'focus');

  const report = (state: keyof typeof HEARD) => {
    heard.dataset.state = state;
    heard.textContent = HEARD[state];
    focus.textContent = FOCUS.kept;
  };

  // Saving is one-way inside a pass, so each button reaches its own state and never undoes
  // the other's (SPEC §8); a remount is what empties both slots again.
  part(root, 'save-good').addEventListener('click', () => {
    status.textContent = 'Saved';
    report('spoken');
  });

  part(root, 'save-bad').addEventListener('click', () => {
    ghost.textContent = 'Saved';
    report('silent');
  });
}
