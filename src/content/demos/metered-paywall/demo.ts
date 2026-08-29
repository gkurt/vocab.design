import { flag, part } from '#src/kit/parts.ts';

const FREE = 3;

const HEADLINES = [
  'The harbour that outlived its fleet',
  'What the tide gauges have been saying',
  'A ferry timetable, read as history',
  'The last chandlery on the quay',
] as const;

const NOTE = {
  counting: 'The count is public before it matters, so the reader knows a limit exists while they still have room in it.',
  spent: 'The allowance is gone and the wall says so, with the headline and the opening lines still readable behind it.',
} as const;

/**
 * Metered paywall specimen: a magazine that gives three articles a month and prints how
 * many are left. Read next article opens the next piece and spends one, the meter counts
 * down in place, and the fourth request puts the subscribe panel over the article with
 * the headline and the first lines still visible behind it.
 *
 * The subject is the meter, not the subscribe panel. The panel is the ordinary paywall
 * this pattern shares with every other kind, and the counting is the whole difference
 * (SPEC §5): a reader who never sees a number is being hard-blocked with extra steps.
 * The masthead, the article, and the Reset control under the frame are scenery, and the
 * Reset is instrumentation, never subject.
 *
 * No `data-pose`: the meter is honest in every state it reaches, including the spent one
 * where it reads zero and names the date it comes back, which is exactly what identify
 * should be free to ring mid-play (SPEC §6).
 *
 * The meter row and the action row hold fixed heights and the wall is drawn over the
 * article rather than inserted into it, so counting down and putting the wall up move
 * nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const lines = ['96%', '88%', '93%', '79%', '90%', '84%'].map((width) => `<span class="sp-line" style="width: ${width}"></span>`).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 264px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">The Kestrel Review</span>
          <span class="sp-label" style="font-size: 11px">Sign in</span>
        </div>
        <div class="sp-body" style="position: relative; display: flex; flex-direction: column; gap: 10px; padding: 12px">

          <div
            class="sp-surface sp-row"
            data-part="meter"
            data-subject
            data-left="2"
            role="status"
            style="flex: 0 0 auto; gap: 10px; height: 34px; padding: 0 10px"
          >
            <span class="sp-text sp-text--ink sp-grow" data-part="meter-count" style="min-width: 0; font-size: 12px">
              2 of ${FREE} free articles left this month
            </span>
            <div class="sp-progress sp-progress--meter" data-part="meter-bar" data-zone="ok" style="width: 74px; --sp-value: 33%">
              <div class="sp-progress-fill"></div>
            </div>
          </div>

          <div class="sp-context sp-stack" style="flex: 1 1 auto; min-height: 0; gap: 8px">
            <span class="sp-heading" data-part="headline" style="font-size: 14px">${HEADLINES[0]}</span>
            <div class="sp-stack" style="gap: 7px">${lines}</div>
          </div>

          <div class="sp-row sp-row--between sp-context" style="flex: 0 0 auto; height: 30px">
            <span class="sp-label" style="font-size: 11px">Resets 1 March</span>
            <button class="sp-button sp-button--sm" data-part="read-next" type="button">Read next article</button>
          </div>

          <div
            data-part="wall"
            style="position: absolute; left: 0; right: 0; top: 88px; bottom: 0; display: flex; flex-direction: column;
                   opacity: 0; visibility: hidden; transition: opacity 0.24s, visibility 0.24s"
          >
            <span style="flex: 0 0 auto; height: 26px; background: linear-gradient(to bottom, rgb(0 0 0 / 0), var(--sp-sunken))"></span>
            <div
              class="sp-stack"
              style="flex: 1 1 auto; align-items: center; justify-content: center; gap: 5px; padding: 0 14px 10px; background: var(--sp-sunken); text-align: center"
            >
              <span class="sp-heading" data-part="wall-title" style="font-size: 13px">That was your third free article</span>
              <span class="sp-text" style="font-size: 11px; max-width: 300px">
                The meter resets on 1 March. Until then, a subscription is 4.00 a month.
              </span>
              <button class="sp-button sp-button--sm" data-part="subscribe" type="button" style="margin-top: 2px">Subscribe</button>
            </div>
          </div>

        </div>
      </div>
      <div class="sp-row sp-context" style="gap: 12px">
        <span class="sp-text" data-stage-verdict data-part="note" style="width: 330px; font-size: 11px">${NOTE.counting}</span>
        <button class="sp-button sp-button--ghost sp-button--sm" data-part="reset" type="button">Reset the meter</button>
      </div>
    </div>
  `;

  const meter = part(root, 'meter');
  const count = part(root, 'meter-count');
  const bar = part(root, 'meter-bar');
  const headline = part(root, 'headline');
  const wall = part(root, 'wall');
  const readNext = part(root, 'read-next');
  const note = part(root, 'note');

  /** Articles opened since the specimen mounted; the fourth is the one that is walled. */
  let read = 0;

  const show = () => {
    const walled = read >= FREE;
    const left = Math.max(0, FREE - 1 - read);
    meter.dataset.left = String(left);
    count.textContent =
      left === 0 ? `0 of ${FREE} free articles left. Resets 1 March.` : `${left} of ${FREE} free articles left this month`;
    bar.dataset.zone = left <= 1 ? 'warn' : 'ok';
    bar.style.setProperty('--sp-value', `${Math.round(((FREE - left) / FREE) * 100)}%`);
    headline.textContent = HEADLINES[Math.min(read, HEADLINES.length - 1)] ?? HEADLINES[0];
    flag(wall, 'data-open', walled);
    wall.style.opacity = walled ? '1' : '0';
    wall.style.visibility = walled ? 'visible' : 'hidden';
    readNext.setAttribute('aria-disabled', String(walled));
    note.textContent = walled ? NOTE.spent : NOTE.counting;
  };

  // Reading only ever spends the allowance and Reset only ever restores it, so neither
  // control can land the specimen in the state the script did not ask for (SPEC §8).
  readNext.addEventListener('click', () => {
    if (read >= FREE) return;
    read += 1;
    show();
  });

  part(root, 'reset').addEventListener('click', () => {
    read = 0;
    show();
  });

  show();
}
