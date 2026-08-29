import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

/** How many presses the version row wants. Six, because a hand does not do six by accident. */
const TAPS = 6;

const CREW = ['AO', 'PR', 'TG', 'MJ'];

const ROWS = [
  { key: 'version', label: 'Version', value: '4.2.0' },
  { key: 'build', label: 'Build', value: '5813 arm64' },
  { key: 'licenses', label: 'Open source licences', value: '' },
];

/**
 * Easter egg specimen: an About screen with a secret in it. Six presses on the version
 * number, an ordinary row of a settings list that says nothing about itself, and a hidden
 * credit card appears. Nothing counts the presses on screen, which is the term rather than
 * an omission: a progress ring or a "three more to go" line would be the signifier this
 * row deliberately does not have.
 *
 * The subject is the reward, not the row that reaches it, because the term names the thing
 * found and not the action that finds it. It is off stage at mount, which identify handles
 * by summoning it (SPEC §6): the script is fast-forwarded, the six clicks land, and the pose
 * rings the card. No `data-pose` is needed, since a reward is the reward in every state this
 * demo visits.
 *
 * The About screen is scenery in the context register. The reward is out of flow, parked in
 * the empty band under the list rather than over them, so revealing it moves nothing and
 * covers nothing (SPEC §5). No clock: the count is cumulative and nothing here is timed, so
 * a reader who presses three times, reads the licences row, and comes back still gets it,
 * which is also the only honest way a run of taps behaves when nothing on screen is counting.
 *
 * The reward is decorative on purpose. Nothing in this app is behind it, which is the whole
 * of what separates an easter egg from a hidden gesture.
 */
export function mount(root: HTMLElement): void {
  const rows = ROWS.map(({ key, label, value }) => {
    const trailing =
      key === 'licenses'
        ? `<span style="flex: 0 0 auto; display: flex; color: var(--sp-muted)">${icon('chevronRight')}</span>`
        : `<span class="sp-text" style="flex: 0 0 auto; font-size: 12px; font-variant-numeric: tabular-nums">${value}</span>`;

    return `
      <div
        class="sp-list-item"
        data-part="row-${key}"
        style="${key === 'version' ? 'user-select: none; ' : ''}height: 37px"
      >
        <span class="sp-text sp-text--ink sp-grow" style="font-size: 13px; white-space: nowrap">${label}</span>
        ${trailing}
      </div>`;
  }).join('');

  const crew = CREW.map(
    (initials, index) =>
      `<span class="sp-avatar" style="width: 26px; height: 26px; font-size: 10px; border: 2px solid var(--sp-surface); ${index ? 'margin-left: -8px' : ''}">${initials}</span>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 252px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">About</span>
          <span class="sp-label">Lumen Notes</span>
        </div>

        <div class="sp-body" data-part="screen" style="position: relative">
          <div class="sp-surface sp-context" style="overflow: hidden">
            <div class="sp-list">${rows}</div>
          </div>

          <div
            class="sp-surface"
            data-part="reward"
            data-subject
            style="position: absolute; left: 12px; right: 12px; bottom: 12px; display: flex; align-items: center; gap: 12px; padding: 10px 12px; box-shadow: var(--sp-shadow); opacity: 0; visibility: hidden; transform: translateY(8px); transition: opacity 0.26s var(--sp-ease), transform 0.26s var(--sp-ease), visibility 0.26s"
          >
            <span style="flex: 0 0 auto; display: flex; align-items: center">${crew}</span>
            <span class="sp-stack sp-grow" style="gap: 2px">
              <span class="sp-text sp-text--ink" style="font-size: 12.5px; font-weight: 600; white-space: nowrap">Hi from the four of us who built this.</span>
              <span class="sp-text" style="font-size: 11px; white-space: nowrap">Nothing else lives back here.</span>
            </span>
            <span style="flex: 0 0 auto; display: flex; color: var(--sp-accent)">${icon('star', 'sp-icon--filled')}</span>
          </div>
        </div>
      </div>

      <!-- The caption sits outside the frame: a line of app copy naming the trigger would
           be the signifier an easter egg is defined by not having. -->
      <p class="sp-label" data-stage-verdict data-part="caption" style="margin: 0; width: 460px; font-size: 11px">
        ${TAPS} presses on the version number. Nothing in this app is behind it.
      </p>
    </div>
  `;

  const screen = part(root, 'screen');
  const reward = part(root, 'reward');
  let count = 0;

  // Reached, never flipped (SPEC §8): the count only ever climbs, and once the reward is
  // out, further presses on the row are presses that reached something already found.
  part(root, 'row-version').addEventListener('click', () => {
    if (count >= TAPS) return;
    count += 1;
    if (count < TAPS) return;
    flag(screen, 'data-found', true);
    reward.style.opacity = '1';
    reward.style.visibility = 'visible';
    reward.style.transform = 'translateY(0)';
  });
}
