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
 * state and the tree persists across attract iterations (`data-loop="keep"`). The readout is one
 * line of reserved height and both of its strings fit it, so swapping one for the other moves
 * nothing (SPEC §5).
 *
 * The sheet was headed "The rule under a link", the third line was labelled "underlined on hover
 * only", and the readout argued the case ("At rest the third link is marked by colour alone,
 * which is not a marker for every reader."). All three were the site talking over its own sheet.
 * The heading now names what the sheet holds, the third label states its rule the way the two
 * above it state theirs, and the readout reports whether a rule is currently drawn. The argument
 * is the article's, and it makes it at length.
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
          <span class="sp-heading">Link styles</span>
          <span class="sp-label">21px</span>
        </div>
        <div class="sp-stack" style="gap: 14px; margin-top: 14px">
          <div class="sp-context">
            ${line('link-plain', 'skip-ink: none, offset left to the browser', 'text-decoration-line: underline; text-decoration-skip-ink: none')}
          </div>
          ${line('link-tuned', 'offset 0.18em, thickness 1.5px, skip-ink auto', TUNED, true)}
          <div class="sp-context sp-stack" style="gap: 3px">
            <span class="sp-label">text-decoration-line: none until :hover</span>
            <span style="font-size: 21px">
              <a href="${HREF}" data-part="link-hover" style="color: var(--sp-accent); text-decoration-line: none">${TEXT}</a>
            </span>
          </div>
        </div>
        <div class="sp-row sp-context" style="align-items: flex-start; height: 20px; margin-top: 12px">
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

  say('Third line at rest: no underline drawn');

  hover.addEventListener('pointerenter', () => {
    flag(hover, 'data-hovered', true);
    hover.style.cssText = `color: var(--sp-accent); ${TUNED}`;
    say('Third line hovered: underline drawn');
  });

  hover.addEventListener('pointerleave', () => {
    flag(hover, 'data-hovered', false);
    hover.style.cssText = 'color: var(--sp-accent); text-decoration-line: none';
    say('Third line at rest: no underline drawn');
  });

  // A specimen changes nothing outside itself, so none of these go anywhere.
  for (const link of [part(root, 'link-plain'), part(root, 'link-tuned'), hover]) {
    link.addEventListener('click', (event) => event.preventDefault());
  }
}
