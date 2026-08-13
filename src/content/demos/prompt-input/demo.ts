import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

/** Three lines of growth, then the box scrolls inside itself. */
const LINE_H = 19;
const MAX_H = LINE_H * 3;

/**
 * Prompt input specimen: the composer at the foot of an assistant window, growing
 * with what is typed and carrying its own strip of controls.
 *
 * The subject is the composer, field and control strip together, not the `textarea`
 * inside it: a bare box would be a text area, and the attach, model and send controls
 * inside the same border are what make this a prompt input. The transcript above is
 * the scene it sits in.
 *
 * The composer is pinned to the bottom of a slot tall enough for its fullest state,
 * so growing a line moves nothing above it (SPEC §5), and the reply it sends lands in
 * a reserved row rather than pushing the conversation about. Send reaches a state
 * rather than flipping one: with content it sends, and with an empty field it does
 * nothing at all.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="height: 280px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Assistant</span>
          <span class="sp-label">Trail survey</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-stack sp-context" data-part="transcript" style="height: 84px; gap: 8px">
            <div class="sp-surface" style="padding: 8px 10px; margin-right: 44px">
              <div class="sp-stack" style="gap: 6px">
                <div class="sp-line" style="width: 92%"></div>
                <div class="sp-line" style="width: 68%"></div>
              </div>
            </div>
            <div style="position: relative; height: 34px">
              <div
                class="sp-surface"
                data-part="sent"
                hidden
                style="position: absolute; inset: 0; margin-left: 64px; padding: 6px 10px;
                       background: var(--sp-accent-soft); border-color: var(--sp-accent-soft)"
              >
                <span
                  class="sp-text sp-text--ink"
                  data-part="sent-text"
                  style="display: block; font-size: 12px; line-height: 20px;
                         white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
                ></span>
              </div>
            </div>
          </div>

          <div style="position: relative; height: 112px; margin-top: auto">
            <div
              class="sp-surface"
              data-part="composer"
              data-subject
              data-state="empty"
              style="position: absolute; left: 0; right: 0; bottom: 0; padding: 8px 10px"
            >
              <textarea
                class="sp-input"
                data-part="prompt"
                rows="1"
                aria-label="Ask the assistant"
                placeholder="Ask anything"
                spellcheck="false"
                style="display: block; height: ${LINE_H}px; padding: 0; border: 0; border-radius: 0;
                       background: transparent; line-height: ${LINE_H}px; resize: none; overflow-y: hidden"
              ></textarea>
              <div class="sp-row" style="margin-top: 8px; gap: 6px">
                <button class="sp-icon-button" type="button" data-part="attach" aria-label="Attach a file">${icon('plus')}</button>
                <button class="sp-chip" type="button" data-part="model">Sonnet ${icon('chevronDown')}</button>
                <span class="sp-grow"></span>
                <button
                  class="sp-button sp-button--sm"
                  type="button"
                  data-part="send"
                  aria-label="Send"
                  aria-disabled="true"
                  style="padding: 5px 9px"
                >${icon('share')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const composer = part(root, 'composer');
  const field = part(root, 'prompt') as HTMLTextAreaElement;
  const send = part(root, 'send');
  const sent = part(root, 'sent');
  const sentText = part(root, 'sent-text');

  /**
   * Height is the one property this box is allowed to write and read in the same
   * breath: nothing in the kit transitions it, so the collapse lands before
   * `scrollHeight` is asked what the content actually needs.
   */
  const grow = () => {
    field.style.height = '0px';
    const needed = field.scrollHeight;
    field.style.height = `${Math.min(needed, MAX_H)}px`;
    field.style.overflowY = needed > MAX_H ? 'auto' : 'hidden';
  };

  const paint = () => {
    const ready = field.value.trim() !== '';
    composer.dataset.state = ready ? 'filled' : 'empty';
    send.setAttribute('aria-disabled', String(!ready));
    grow();
  };

  const submit = () => {
    const text = field.value.trim();
    // Nothing to send is not an error and not a toggle: the control simply rests.
    if (text === '') return;
    sentText.textContent = text;
    sent.hidden = false;
    field.value = '';
    paint();
  };

  field.addEventListener('input', paint);

  // Enter sends, Shift and Enter makes a paragraph: the convention the article is
  // about, wired here so a reader who takes the demo over meets the real one.
  field.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' || event.shiftKey) return;
    event.preventDefault();
    submit();
  });

  send.addEventListener('click', submit);

  paint();
}
