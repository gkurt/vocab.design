import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

/**
 * Visually hidden specimen: two icon-only buttons that look identical and read
 * completely differently. The transcript is what a screen reader would announce;
 * the reveal control gives the hidden text its layout back so you can see where
 * it was all along. The whole scene is the subject, since the term names text
 * that has no geometry to point at.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" data-subject>
      <div class="sp-window" style="width: 400px">
        <div class="sp-row sp-row--between">
          <span class="sp-heading">Message actions</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="reveal" aria-pressed="false">Reveal hidden text</button>
        </div>
        <div class="sp-row" style="gap: 14px; margin-top: 14px">
          <button class="sp-button sp-button--ghost sp-row" data-part="labelled" style="position: relative">
            ${icon('trash')}<span class="sp-visually-hidden" data-part="label">Delete message</span>
          </button>
          <button class="sp-button sp-button--ghost sp-row" data-part="unlabelled">
            ${icon('star')}
          </button>
        </div>
        <div class="sp-surface" style="margin-top: 14px; padding: 10px">
          <span class="sp-label">Screen reader announces</span>
          <p class="sp-text sp-text--ink" data-part="transcript" style="margin-top: 4px">Focus a button.</p>
        </div>
      </div>
    </div>
  `;

  const transcript = part(root, 'transcript');
  const label = part(root, 'label');
  const reveal = part(root, 'reveal');
  const labelled = part(root, 'labelled');

  // Hold the room the label will need before it needs it, so revealing the text moves
  // nothing but the text itself, and both buttons keep looking alike (SPEC §5).
  flag(label, 'data-revealed', true);
  labelled.style.marginRight = `${label.offsetWidth + 6}px`;
  flag(label, 'data-revealed', false);

  labelled.addEventListener('click', () => {
    transcript.textContent = '“Delete message, button”';
  });
  part(root, 'unlabelled').addEventListener('click', () => {
    transcript.textContent = '“button” (nothing to read out)';
  });
  reveal.addEventListener('click', () => {
    const on = !label.hasAttribute('data-revealed');
    flag(label, 'data-revealed', on);
    reveal.setAttribute('aria-pressed', String(on));
    flag(reveal, 'data-selected', on);
  });
}
