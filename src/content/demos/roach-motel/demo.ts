import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'trapped' | 'fair';
type Screen = { title: string; body: string; action: string | null };

const SCREENS: Record<Mode, Screen[]> = {
  trapped: [
    { title: 'Account', body: 'No cancel control here. It lives three levels down, under Manage plan.', action: 'Manage plan' },
    { title: 'Before you go, take 20% off', body: 'An offer stands in front of the button you came for.', action: 'No, cancel my plan' },
    {
      title: 'Tell us why you are leaving',
      body: 'Six required questions, and the form will not submit until every one is answered.',
      action: 'Submit and continue',
    },
    { title: 'Call us to finish', body: 'Phone only, weekdays 9 to 5. The last step of the exit is not on the web at all.', action: null },
  ],
  fair: [
    { title: 'Cancel membership', body: 'One control, on the account screen, where the sign-up button was.', action: 'Cancel membership' },
    { title: 'Membership cancelled', body: 'Confirmed on screen, refundable until the period ends. No queue, no survey.', action: null },
  ],
};

const CAPTION = {
  trapped: 'The way out (as shipped)',
  fair: 'The way out (made fair)',
} as const;

const VERDICT = {
  trapped: 'One click in, four screens and a phone call out. The asymmetry is the pattern.',
  fair: 'The exit is the same size as the entrance, in the same place, on the same screen.',
} as const;

const pips = (total: number, at: number): string =>
  Array.from(
    { length: total },
    (_, i) =>
      `<span style="flex: 1 1 0; height: 4px; border-radius: 999px; background: ${i <= at ? 'var(--sp-accent)' : 'var(--sp-line)'}"></span>`,
  ).join('');

function screenMarkup(mode: Mode, step: number): string {
  const screens = SCREENS[mode];
  const screen = screens[step] as Screen;
  const action = screen.action
    ? `<button class="sp-button" data-part="advance" type="button" style="width: 100%">${screen.action}</button>`
    : `<span class="sp-text" style="width: 100%; font-size: 11px; text-align: center">Call 0800 555 0199</span>`;
  return `
    <div class="sp-row sp-row--between" style="height: 16px">
      <span class="sp-label" style="font-size: 11px">Screen ${step + 1} of ${screens.length}</span>
      <span class="sp-label" style="font-size: 11px">Cancelling</span>
    </div>
    <div class="sp-row" style="gap: 3px; height: 4px; margin-top: 8px">${pips(screens.length, step)}</div>
    <div class="sp-heading" style="height: 20px; margin-top: 8px; font-size: 13px">${screen.title}</div>
    <div class="sp-text" style="height: 54px; margin-top: 4px; font-size: 12px">${screen.body}</div>
    <div class="sp-row" style="height: 34px; margin-top: auto">${action}</div>`;
}

/**
 * Roach motel specimen: one entrance beside one exit, drawn at the same scale so the
 * asymmetry is the only thing to look at. Joining is a single button on the left.
 * Leaving walks a numbered path on the right, and the pip trail says up front how long
 * that path is before the first step is taken.
 *
 * The subject is the exit panel, not the account around it: the term names the way out,
 * and the sign-up column is the measuring stick it is compared against, so that column
 * is scenery (SPEC §5). The panel declares the trapped path as its honest condition
 * (`data-pose`), since ringing the one-screen cancellation would be a picture of the
 * opposite word (SPEC §6).
 *
 * The panel holds one height for every screen, and the action sits in a fixed slot with
 * a full-width control, so advancing changes words and never geometry (SPEC §5). Each
 * step reaches the next screen rather than toggling, and picking a mode restores that
 * mode's first screen, which is the state the specimen mounts in (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Streamly</span><span class="sp-label">Account</span></div>
        <div class="sp-body sp-row" style="align-items: stretch; gap: 10px">

          <section class="sp-context" style="display: flex; flex-direction: column; gap: 7px; flex: 0 0 auto; width: 148px">
            <span class="sp-label" style="height: 17px; font-size: 11px">The way in (one screen)</span>
            <div class="sp-row" style="gap: 3px; height: 4px">
              <span style="flex: 1 1 0; height: 4px; border-radius: 999px; background: var(--sp-accent)"></span>
            </div>
            <div class="sp-surface" style="padding: 8px 10px">
              <div class="sp-heading" style="font-size: 13px">Streamly Plus</div>
              <div class="sp-text" style="font-size: 12px">9.99 a month</div>
            </div>
            <button class="sp-button" data-part="join" type="button" style="width: 100%">Start membership</button>
            <span class="sp-text" style="font-size: 11px">One click, saved card.</span>
          </section>

          <div style="display: flex; flex-direction: column; gap: 7px; flex: 1 1 auto; min-width: 0">
            <span class="sp-label sp-context" data-part="caption" style="height: 17px; font-size: 11px">${CAPTION.trapped}</span>
            <section
              class="sp-surface"
              data-part="exit"
              data-subject
              data-pose="[data-mode=trapped]"
              data-mode="trapped"
              data-step="0"
              style="display: flex; flex-direction: column; flex: 1 1 auto; min-height: 0; padding: 10px 12px"
            >${screenMarkup('trapped', 0)}</section>
          </div>

        </div>
      </div>
              <span class="sp-text" data-stage-verdict data-part="verdict" style="width: 296px; font-size: 11px">${VERDICT.trapped}</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="trapped" data-axis="Roach motel" data-term="trapped">
          <button class="sp-segment" data-part="mode-trapped" value="trapped">With</button>
          <button class="sp-segment" data-part="mode-fair" value="fair">Without</button>
        </sp-segmented>
      
    </div>
  `;

  const exit = part(root, 'exit');
  const caption = part(root, 'caption');
  const verdict = part(root, 'verdict');
  const join = part(root, 'join');

  const show = (mode: Mode, step: number) => {
    exit.dataset.mode = mode;
    exit.dataset.step = String(step);
    exit.innerHTML = screenMarkup(mode, step);
    caption.textContent = CAPTION[mode];
    verdict.textContent = VERDICT[mode];
  };

  exit.addEventListener('click', (event) => {
    if (!(event.target as HTMLElement).closest('[data-part="advance"]')) return;
    const mode: Mode = exit.dataset.mode === 'fair' ? 'fair' : 'trapped';
    const next = Number(exit.dataset.step ?? 0) + 1;
    if (next >= SCREENS[mode].length) return;
    show(mode, next);
  });

  join.addEventListener('click', () => {
    if (join.hasAttribute('data-joined')) return;
    join.setAttribute('data-joined', '');
    join.setAttribute('aria-disabled', 'true');
    join.textContent = 'Member since today';
  });

  part(root, 'mode').addEventListener('change', (event) => {
    const next: Mode = (event as CustomEvent<string>).detail === 'fair' ? 'fair' : 'trapped';
    join.removeAttribute('data-joined');
    join.removeAttribute('aria-disabled');
    join.textContent = 'Start membership';
    show(next, 0);
  });
}
