import { part } from '#src/kit/parts.ts';

const DESTINATION = 'example.com/plans';

const TRAIL = {
  none: 'Nothing followed yet',
  'new-tab': `Opened ${DESTINATION} in a new tab`,
  followed: `Followed to ${DESTINATION}`,
} as const;

type Event = keyof typeof TRAIL;

/**
 * Link specimen: a line of prose with one word that goes somewhere. The subject is
 * the anchor alone, since the term names the control and not the sentence holding
 * it, and the scene around it is a browser only so the affordances have somewhere
 * to show: the destination read out under the pointer, a middle click that opens
 * it elsewhere, and the colour change that says this one has been followed.
 *
 * Nothing here actually navigates (a specimen changes nothing outside itself), so
 * both activations are prevented and reported instead. The readouts share one row
 * of fixed height, with the report right-aligned in the space the peek does not
 * take, so a destination appearing moves no text (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="height: 248px">
        <div class="sp-topbar sp-context">
          <span class="sp-chip sp-grow" style="justify-content: flex-start; cursor: default">example.com/help/change-your-plan</span>
        </div>
        <div class="sp-body">
          <div class="sp-surface" style="padding: 12px">
            <div class="sp-heading sp-context" style="font-size: 14px">Changing your plan</div>
            <p class="sp-prose" style="margin: 8px 0 0">
              Every workspace starts on the free tier. Compare what each tier includes on the
              <a
                href="https://example.com/plans"
                data-part="link"
                data-subject
                style="color: var(--sp-accent)"
              >plans page</a>, then upgrade from billing settings.
            </p>
          </div>
          <div class="sp-row sp-context" style="height: 24px; margin-top: 8px">
            <span class="sp-text" data-part="peek" style="font-size: 12px; white-space: nowrap"></span>
            <span
              class="sp-text sp-grow"
              data-part="trail"
              data-event="none"
              role="status"
              style="text-align: right; white-space: nowrap"
            >${TRAIL.none}</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const link = part(root, 'link');
  const peek = part(root, 'peek');
  const trail = part(root, 'trail');

  const report = (event: Event) => {
    trail.dataset.event = event;
    trail.textContent = TRAIL[event];
  };

  // The address readout a browser gives every link and no button: where this goes,
  // before it is pressed.
  link.addEventListener('pointerenter', () => {
    peek.textContent = link.getAttribute('href')?.replace(/^https?:\/\//, '') ?? '';
  });
  link.addEventListener('pointerleave', () => {
    peek.textContent = '';
  });

  link.addEventListener('click', (event) => {
    event.preventDefault();
    // Followed is a one-way state, like the browser's own history of it, so a
    // scripted pass reaches it rather than flipping it (SPEC §8).
    link.setAttribute('data-visited', '');
    // The kit keeps one accent and has no second hue for history, so a followed
    // link steps back to muted ink, the way plenty of sites draw :visited.
    link.style.color = 'var(--sp-muted)';
    report('followed');
  });

  // Middle click is the affordance that most plainly separates a link from a
  // button: a destination can be opened somewhere other than here.
  link.addEventListener('auxclick', (event) => {
    if ((event as MouseEvent).button !== 1) return;
    event.preventDefault();
    report('new-tab');
  });
}
