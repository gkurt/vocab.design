import { flag, part } from '#src/kit/parts.ts';

/** One attribute of the wiring, drawn in the accent because the pair IS the term. */
const attr = (name: string, value: string): string => `<span style="color: var(--sp-accent)">${name}="${value}"</span>`;

const CODE = [
  `&lt;button ${attr('command', 'show-modal')} ${attr('commandfor', 'confirm')}&gt;Delete&lt;/button&gt;`,
  `&lt;dialog id="confirm"<span data-part="open-attr" hidden style="color: var(--sp-accent)"> open</span>&gt;`,
  `  &lt;button ${attr('command', 'close')} ${attr('commandfor', 'confirm')}&gt;Keep&lt;/button&gt;`,
  `  &lt;button ${attr('command', 'close')} ${attr('commandfor', 'confirm')}&gt;Delete&lt;/button&gt;`,
  '&lt;/dialog&gt;',
].join('\n');

/**
 * Invoker command specimen: the button that opens the dialog carries the whole wiring on
 * itself, and the markup panel below prints it, down to the `open` attribute the dialog
 * gains while it is up. The subject is the invoking button, which is the narrowest element
 * the term names: not the dialog, which is only what the command happens to point at.
 *
 * The buttons carry the real `command` and `commandfor` attributes, so the DOM a reader
 * inspects is the markup the panel claims. The EFFECT is stood up in script here for two
 * reasons, neither of them about the API: `showModal()` paints over the whole page rather
 * than the exhibit frame (SPEC §5), and the attract player's synthesized clicks carry no
 * user activation, so no browser-owned activation behaviour fires under them (SPEC §8) any
 * more than it would for a `<summary>` or a `<label>`. The dialog and the record it acts on
 * are scenery; the wiring is the claim.
 *
 * Every control reaches a state rather than flipping one: the outer button only ever opens,
 * and both buttons inside only ever close.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div style="display: flex; flex-direction: column; gap: 8px">
        <div class="sp-frame sp-frame--wide" style="height: 172px">
          <div class="sp-topbar sp-context">
            <span class="sp-heading" style="font-size: 13px">Billing</span>
          </div>
          <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
            <div class="sp-surface sp-context" style="padding: 10px 12px">
              <div class="sp-heading" style="font-size: 13px">Invoice 4127</div>
              <div class="sp-text" style="font-size: 12px">Draft, never sent</div>
            </div>
            <div class="sp-row" style="justify-content: flex-end">
              <button
                class="sp-button sp-button--sm"
                type="button"
                data-part="invoke"
                data-subject
                command="show-modal"
                commandfor="confirm"
              >
                Delete
              </button>
            </div>
          </div>

          <div class="sp-scrim" data-part="scrim"></div>
          <div
            class="sp-dialog sp-context"
            data-part="dialog"
            id="confirm"
            role="dialog"
            aria-label="Delete invoice 4127"
            style="width: 246px; padding: 14px 16px"
          >
            <div class="sp-heading" style="font-size: 14px">Delete invoice 4127?</div>
            <p class="sp-text" style="margin: 6px 0 12px">The draft goes for good.</p>
            <div class="sp-row" style="justify-content: flex-end">
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="keep" command="close" commandfor="confirm">
                Keep
              </button>
              <button class="sp-button sp-button--sm" type="button" data-part="confirm" command="close" commandfor="confirm">Delete</button>
            </div>
          </div>
        </div>

        <pre
          data-part="code"
          class="sp-surface"
          style="margin: 0; padding: 9px 12px; font-family: ui-monospace, monospace; font-size: 10px; line-height: 1.6;
                 color: var(--sp-ink); white-space: pre"
        >${CODE}</pre>
      </div>
    </div>
  `;

  const dialog = part(root, 'dialog');
  const scrim = part(root, 'scrim');
  const openAttr = part(root, 'open-attr');

  const setOpen = (open: boolean) => {
    flag(dialog, 'data-open', open);
    flag(scrim, 'data-open', open);
    openAttr.hidden = !open;
  };

  part(root, 'invoke').addEventListener('click', () => setOpen(true));
  for (const name of ['keep', 'confirm']) part(root, name).addEventListener('click', () => setOpen(false));

  setOpen(false);
}
