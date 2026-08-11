import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

/**
 * Password reveal toggle specimen: the eye inside the field, switching the value
 * between masked and readable. The subject is the toggle, not the field.
 *
 * Here the flip is the term (SPEC §8), so the control toggles and the script
 * drives both directions. The glyph swap happens inside a fixed-size button and
 * the field's padding already holds that room, so nothing moves when it flips.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 300px">
        <div class="sp-heading sp-context">Sign in</div>
        <div class="sp-field" style="margin-top: 14px">
          <label class="sp-label sp-context" for="vd-password">Password</label>
          <div style="position: relative">
            <input
              class="sp-input sp-context"
              id="vd-password"
              data-part="input"
              type="password"
              value="hunter2-rides-again"
              autocomplete="off"
              spellcheck="false"
              style="padding-right: 36px"
            />
            <button
              class="sp-icon-button"
              data-part="toggle"
              data-subject
              type="button"
              aria-pressed="false"
              aria-controls="vd-password"
              aria-label="Show password"
              style="position: absolute; right: 3px; top: 50%; transform: translateY(-50%); width: 26px; height: 26px"
            >${icon('eye')}</button>
          </div>
        </div>
        <div class="sp-row sp-row--between sp-context" style="margin-top: 14px">
          <button class="sp-button" data-part="signin" type="button">Sign in</button>
          <span class="sp-text">Forgot password?</span>
        </div>
      </div>
    </div>
  `;

  const input = part(root, 'input') as HTMLInputElement;
  const toggle = part(root, 'toggle');

  const show = (revealed: boolean) => {
    input.type = revealed ? 'text' : 'password';
    // One convention at a time: the pressed state carries the change, so the
    // accessible name stays "Show password" rather than contradicting it.
    toggle.setAttribute('aria-pressed', String(revealed));
    toggle.innerHTML = icon(revealed ? 'eyeOff' : 'eye');
  };

  toggle.addEventListener('click', () => show(toggle.getAttribute('aria-pressed') !== 'true'));
}
