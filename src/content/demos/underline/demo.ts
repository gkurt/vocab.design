import { flag, part } from '#src/kit/parts.ts';

const HREF = 'https://example.com/guidelines';
const TEXT = 'payment guidelines';
/** The three properties that turn the browser default into something set on purpose. */
const TUNED = [
  'text-decoration-line: underline',
  'text-decoration-skip-ink: auto',
  'text-underline-offset: 0.18em',
  'text-decoration-thickness: 1.5px',
].join('; ');

/**
 * Underline specimen: the web's native link marker, before and after it is set.
 * The scenery line above has the rule with ink-skipping switched off, so it cuts
 * straight through the descenders on `p`, `y` and `g`. The subject has the offset,
 * the thickness, and the skip set, so the rule clears the letters and sits away
 * from the baseline. Below, in the scenery again, the underline-on-hover variant:
 * nothing to scan for at rest, which is the trade that pattern makes.
 *
 * The hover line answers the pointer with an attribute as well as a style write,
 * because synthesized input never lights up `:hover` (SPEC §7), and a text
 * decoration takes no space, so no state here can move anything (SPEC §5).
 *
 * The subject is the tuned link. The term names the rule, and the narrowest thing
 * that carries one is the text it is drawn under; the untuned line and the hover
 * line are what it is read against.
 *
 * The hover line's marker and readout are both restored on leave, so the pass ends at its mount
 * state and the tree persists across attract iterations (`data-loop="keep"`). The readout keeps
 * the room both of its sentences take, two lines at this measure, and sets them from the top, so
 * swapping one for the other moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const line = (name: string, note: string, style: string, subject = false) => `
    <div class="sp-stack" style="gap: 3px">
      <span class="sp-label sp-context">${note}</span>
      <span style="font-size: 21px">
        <a href="${HREF}" data-part="${name}"${subject ? ' data-subject' : ''}
           style="color: var(--sp-accent); ${style}">${TEXT}</a>
      </span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app" data-loop="keep">
      <div class="sp-window" style="width: 460px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">The rule under a link</span>
          <span class="sp-label">21px</span>
        </div>
        <div class="sp-stack" style="gap: 14px; margin-top: 14px">
          <div class="sp-context">
            ${line('link-plain', 'skip-ink: none, offset left to the browser', 'text-decoration-line: underline; text-decoration-skip-ink: none')}
          </div>
          ${line('link-tuned', 'offset 0.18em, thickness 1.5px, skip-ink auto', TUNED, true)}
          <div class="sp-context sp-stack" style="gap: 3px">
            <span class="sp-label">underlined on hover only</span>
            <span style="font-size: 21px">
              <a href="${HREF}" data-part="link-hover" style="color: var(--sp-accent); text-decoration-line: none">${TEXT}</a>
            </span>
          </div>
        </div>
        <div class="sp-row sp-context" style="align-items: flex-start; height: 40px; margin-top: 12px">
          <span class="sp-text" data-part="readout"></span>
        </div>
      </div>
    </div>
  `;

  const hover = part(root, 'link-hover');
  const readout = part(root, 'readout');

  const say = (text: string) => {
    readout.textContent = text;
  };

  say('At rest the third link is marked by colour alone, which is not a marker for every reader.');

  hover.addEventListener('pointerenter', () => {
    flag(hover, 'data-hovered', true);
    hover.style.cssText = `color: var(--sp-accent); ${TUNED}`;
    say('The pointer arrived and the marker appeared with it. Touch never gets this far.');
  });

  hover.addEventListener('pointerleave', () => {
    flag(hover, 'data-hovered', false);
    hover.style.cssText = 'color: var(--sp-accent); text-decoration-line: none';
    say('At rest the third link is marked by colour alone, which is not a marker for every reader.');
  });

  // A specimen changes nothing outside itself, so none of these go anywhere.
  for (const link of [part(root, 'link-plain'), part(root, 'link-tuned'), hover]) {
    link.addEventListener('click', (event) => event.preventDefault());
  }
}
