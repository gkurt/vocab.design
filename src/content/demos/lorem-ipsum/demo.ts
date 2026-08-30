const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

/**
 * Lorem ipsum specimen: one profile card filled twice. On the left, placeholder
 * text of exactly the length the layout was drawn for. On the right, the same
 * card holding values of the lengths real values have: a one-word name, a role
 * that is a compound running onto a second line, and a bio nobody filled in.
 *
 * The subject is the block of placeholder text, not the card and not the pair.
 * The term names the text, so ringing the card would claim it names the layout
 * the text is standing in for (SPEC §5). The right-hand card is the comparison
 * that makes the point and sits in the context register with the rest of the
 * scenery.
 *
 * Both cards are fixed in size and clip, so the wrapping role on the right
 * stretches nothing and the empty bio stays a visible hole rather than a
 * collapse (SPEC §5). Nothing changes state.
 *
 * The pair used to be captioned ("filled with placeholder", "filled with what
 * is there") and footed with three chips reading the comparison out loud ("a
 * real name can be one word", and two more). All five were the site talking
 * inside the frame, and none of them were needed: the left card is headed
 * "Lorem Ipsum" and holds lorem text, so it labels itself. The chips' row went
 * with them, and the choreography's claim on it with that.
 */
export function mount(root: HTMLElement): void {
  const card = (variant: 'lorem' | 'real', name: string, role: string, bio: string, bioStyle: string) => `
    <div class="sp-surface" data-part="card-${variant}"
         style="height: 156px; padding: 12px; overflow: hidden; display: flex; flex-direction: column; gap: 6px">
      <span class="sp-heading" data-part="name-${variant}" style="height: 22px">${name}</span>
      <span class="sp-label sp-context" data-part="role-${variant}"
            style="height: 38px; line-height: 1.4; overflow-wrap: anywhere">${role}</span>
      <p class="sp-text" data-part="bio-${variant}"${variant === 'lorem' ? ' data-subject' : ''}
         style="margin: 0; flex: 1 1 auto; ${bioStyle}">${bio}</p>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row" style="gap: 16px; align-items: flex-start">
          <div class="sp-stack" style="width: 200px">
            ${card('lorem', 'Lorem Ipsum', 'Consectetur adipiscing', LOREM, '')}
          </div>
          <div class="sp-stack sp-context" style="width: 200px">
            ${card('real', 'Wei', 'Landesarbeitsgemeinschaftsvorsitzende', 'No bio yet.', 'font-style: italic')}
          </div>
        </div>
      </div>
    </div>
  `;
}
