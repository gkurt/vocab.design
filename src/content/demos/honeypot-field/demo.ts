import { flag, part } from '#src/kit/parts.ts';

/** What a form filler types into an input it has no reason to understand. */
const BAIT = 'cheap-watches-online';

const RESULT = {
  idle: { text: 'No submission yet. The trap is sitting empty.', badge: 'Waiting' },
  accepted: { text: 'Accepted, and nobody was asked to prove anything.', badge: 'Accepted' },
  rejected: { text: 'Discarded on the server; the sender still sees the thank-you page.', badge: 'Discarded' },
} as const;

type State = keyof typeof RESULT;

/**
 * Honeypot field specimen: a newsletter form with the trap drawn where it really sits,
 * between the fields, in a ghosted box the reader can see. Two labelled submissions run
 * the two cases: a person leaves the bait alone and is let through, and a form filler
 * types into every input it can find, including the one nobody can see.
 *
 * The subject is the hidden field itself, not the form: the term names the input, and
 * the email row beside it is what the form was actually for (SPEC §5). Every state of
 * the field is still the term, empty or baited, so no pose condition is needed
 * (SPEC §6). The result strip keeps one height and the field's box keeps one size
 * whether or not it holds a value, so a submission changes words and never geometry
 * (SPEC §5). Each control reaches its own outcome rather than flipping the other's
 * (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 312px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Newsletter signup</span>
          <span class="sp-label" style="font-size: 11px">No challenge shown</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column">
          <div class="sp-surface" style="display: flex; flex-direction: column; gap: 8px; padding: 10px 12px">
            <div class="sp-field sp-context">
              <span class="sp-label">Email</span>
              <input class="sp-input" data-part="email" value="ana.ferreira@mailbox.test" readonly aria-label="Email" />
            </div>
            <div style="display: flex; flex-direction: column; gap: 4px">
              <span class="sp-label sp-context" style="font-size: 10px">Hidden in the real form, drawn here so it can be looked at</span>
              <div
                class="sp-row"
                data-part="honeypot"
                data-subject
                style="gap: 8px; padding: 7px 9px; border: 1px dashed var(--sp-accent); border-radius: 6px; background: var(--sp-accent-soft)"
              >
                <span class="sp-label" style="width: 58px">website</span>
                <input
                  class="sp-input sp-grow"
                  data-part="bait"
                  value=""
                  placeholder="leave this field empty"
                  readonly
                  aria-label="Website, leave this field empty"
                />
              </div>
              <span class="sp-text sp-context" style="font-size: 10px; white-space: nowrap">
                <code>display: none</code> + <code>aria-hidden</code> + <code>tabindex="-1"</code>, or a real reader falls in too
              </span>
            </div>
            <div class="sp-row sp-context" style="gap: 8px; margin-top: 2px">
              <button class="sp-button sp-button--sm" data-part="as-person" type="button">Submit as a person</button>
              <button class="sp-button sp-button--ghost sp-button--sm" data-part="as-bot" type="button">Submit as a bot</button>
            </div>
          </div>
        </div>
        <div
          class="sp-row sp-row--between sp-context"
          data-part="result"
          data-state="idle"
          style="flex: 0 0 auto; gap: 10px; height: 36px; padding: 0 12px; border-top: 1px solid var(--sp-line); background: var(--sp-surface)"
        >
          <span class="sp-text" data-part="result-text" style="font-size: 11px">${RESULT.idle.text}</span>
          <span class="sp-chip" data-part="result-badge" style="cursor: default">${RESULT.idle.badge}</span>
        </div>
      </div>
    </div>
  `;

  const honeypot = part(root, 'honeypot');
  const bait = part(root, 'bait') as HTMLInputElement;
  const result = part(root, 'result');
  const resultText = part(root, 'result-text');
  const resultBadge = part(root, 'result-badge');

  const settle = (state: State) => {
    result.dataset.state = state;
    resultText.textContent = RESULT[state].text;
    resultBadge.textContent = RESULT[state].badge;
    flag(honeypot, 'data-filled', state === 'rejected');
  };

  part(root, 'as-person').addEventListener('click', () => {
    bait.value = '';
    settle('accepted');
  });

  part(root, 'as-bot').addEventListener('click', () => {
    // A form filler answers every input it can reach, which is the whole tell.
    bait.value = BAIT;
    settle('rejected');
  });
}
