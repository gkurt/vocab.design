import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Route = 'obstructed' | 'direct';

const CAPTION: Record<Route, string> = {
  obstructed: 'Cancelling: the route as shipped',
  direct: 'Cancelling: the same job, one screen',
};

const VERDICT: Record<Route, string> = {
  obstructed: 'Nothing is broken and nothing lied. The way out just costs three screens and a phone call.',
  direct: 'The same cancellation, reached in one click. The friction is gone, not hidden.',
};

/** The buried exit: the sentence that has to be hunted for, written to be overlooked. */
const BURIED = [
  'align-self: flex-start',
  'margin-top: 9px',
  'border: 0',
  'background: transparent',
  'font: inherit',
  'font-size: 10px',
  'color: var(--sp-muted)',
  'padding: 0',
  'text-decoration: underline',
  'cursor: pointer',
].join('; ');

const PREF_ROWS = [
  ['Email digest', 'Weekly'],
  ['Paper delivery', 'Off'],
  ['Partner offers', 'On'],
]
  .map(
    ([label, value]) => `<div class="sp-row sp-row--between" style="height: 21px">
      <span style="font-size: 11px">${label}</span><span class="sp-label" style="font-size: 10px">${value}</span>
    </div>`,
  )
  .join('');

const PLAN = `
  <span class="sp-heading" style="font-size: 13px">Reader plan</span>
  <span class="sp-text" style="margin-top: 3px; font-size: 11px">6.99 a month, renews 4 May.</span>`;

/** Each route is a list of screens, and the term is the difference in how many there are. */
const SCREENS: Record<Route, string[]> = {
  obstructed: [
    `${PLAN}
     <button class="sp-button sp-button--ghost sp-button--sm" data-part="hurdle-1" type="button" style="align-self: flex-start; margin-top: 12px">Manage preferences</button>
     <span class="sp-text" style="margin-top: 9px; font-size: 11px">Nothing on this screen says cancel.</span>`,
    `<span class="sp-heading" style="font-size: 13px">Preferences</span>
     <div style="align-self: stretch; margin-top: 5px">${PREF_ROWS}</div>
     <button data-part="hurdle-2" type="button" style="${BURIED}">cancel or pause your subscription</button>`,
    `<span class="sp-heading" style="font-size: 13px">Are you sure?</span>
     <span class="sp-text" style="margin-top: 4px; font-size: 11px">You would lose 214 saved articles, your reading history, and the crossword archive.</span>
     <div class="sp-row" style="gap: 10px; margin-top: 12px">
       <button class="sp-button" data-part="keep" type="button" style="flex: 0 0 auto">Keep my plan</button>
       <button data-part="hurdle-3" type="button" style="${BURIED}; align-self: center; margin-top: 0">continue to cancel</button>
     </div>`,
    `<span class="sp-heading" style="font-size: 13px">Cancellations are by phone</span>
     <span class="sp-text" data-part="deadend" style="margin-top: 4px; font-size: 11px">Call 0800 000 000, Monday to Thursday, 9am to 4pm. Average wait 24 minutes.</span>
     <span class="sp-text" style="margin-top: 9px; font-size: 11px">Three screens in, and the path ends at an opening hour.</span>`,
  ],
  direct: [
    `${PLAN}
     <button class="sp-button sp-button--sm" data-part="cancel-now" type="button" style="align-self: flex-start; margin-top: 12px">Cancel subscription</button>
     <span class="sp-text" style="margin-top: 9px; font-size: 11px">Runs to the end of the month either way.</span>`,
    `<span class="sp-heading" style="font-size: 13px">Cancelled</span>
     <span class="sp-text" data-part="done" style="margin-top: 4px; font-size: 11px">Confirmation emailed. Your plan runs until 4 May, then stops.</span>`,
  ],
};

/**
 * Obstruction specimen: one cancellation, drawn along the route it usually ships on and
 * along the route it could ship on. The obstructed path is the resting state, because
 * the term names the hurdles: identify pointed at the one-click version would be
 * pointing at a different word, which is what the subject's `data-pose` says out loud.
 *
 * The subject is the path itself, the screen-by-screen way out, not the account page
 * around it. The plan summary, the caption, the verdict line and the route picker are
 * scenery (SPEC §5).
 *
 * The path box holds one height across every screen of both routes, so advancing moves
 * nothing (SPEC §5), and each control reaches a named screen rather than flipping the
 * one it finds (SPEC §8): the route picker names its route, and picking one starts that
 * route at its first screen.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 246px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Account</span><span class="sp-text">You want to cancel</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">
          <span class="sp-label sp-context" data-part="caption">${CAPTION.obstructed}</span>
          <div
            class="sp-surface"
            data-part="path"
            data-subject
            data-pose="[data-route=obstructed]"
            data-route="obstructed"
            data-step="0"
            style="display: flex; flex-direction: column; align-items: flex-start; height: 150px; padding: 12px 14px; background: var(--sp-surface)"
          >${SCREENS.obstructed[0]}</div>
        </div>
      </div>
              <span class="sp-text" data-stage-verdict data-part="verdict" style="width: 306px; height: 30px; font-size: 11px; line-height: 1.35">${VERDICT.obstructed}</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-part="route" data-value="obstructed" data-axis="Obstruction" data-term="obstructed">
          <button class="sp-segment" data-part="route-obstructed" type="button" value="obstructed" style="padding: 4px 10px; font-size: 12px">With</button>
          <button class="sp-segment" data-part="route-direct" type="button" value="direct" style="padding: 4px 10px; font-size: 12px">Without</button>
        </sp-segmented>
      
    </div>
  `;

  const path = part(root, 'path');
  const caption = part(root, 'caption');
  const verdict = part(root, 'verdict');

  const show = (route: Route, step: number) => {
    const screen = SCREENS[route][step];
    if (!screen) return;
    path.dataset.route = route;
    path.dataset.step = String(step);
    path.innerHTML = screen;
    caption.textContent = CAPTION[route];
    verdict.textContent = VERDICT[route];
  };

  // One listener on the path, so a screen that has just been written is answered without
  // rewiring: every step forward is a click on the control that screen happens to carry.
  path.addEventListener('click', (event) => {
    const name = (event.target as HTMLElement).closest<HTMLElement>('[data-part]')?.dataset.part;
    const route = path.dataset.route as Route;
    const step = Number(path.dataset.step);
    if (name === 'hurdle-1' || name === 'hurdle-2' || name === 'hurdle-3' || name === 'cancel-now') show(route, step + 1);
  });

  part(root, 'route').addEventListener('change', (event) => {
    show((event as CustomEvent<string>).detail === 'direct' ? 'direct' : 'obstructed', 0);
  });
}
