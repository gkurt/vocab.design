import { flag, part, partsOf } from '#src/kit/parts.ts';

const PHONE_W = 198;
const FEED_H = 176;
/** Where the gaze is parked, measured down from the top of the feed's viewport. */
const HOLD_Y = 84;

const POSTS: [string, string[]][] = [
  ['Marcy Vane', ['92%', '68%']],
  ['Port office', ['84%', '74%']],
  ['Tidal watch', ['96%', '62%']],
  ['Ferry crew', ['78%', '86%']],
  ['Ada Whitlow', ['90%', '70%']],
  ['Harbour master', ['86%', '80%']],
  ['Crane lift 4', ['94%', '64%']],
  ['Night berth', ['82%', '76%']],
  ['Gull watch', ['88%', '72%']],
  ['Lock keeper', ['90%', '66%']],
];

/**
 * Marking pattern specimen: a phone feed streaming under a gaze that does not move.
 *
 * The subject is the held fixation point. The term names where the eye rests rather than a
 * component, so the narrowest element it names is the figure marking that spot (SPEC §5),
 * and the phone and its feed are the scene. The point is drawn over the feed and takes no
 * pointer events, so a reader's own scroll reaches the feed underneath, which is the whole
 * demonstration: the content moves and the point does not.
 */
export function mount(root: HTMLElement): void {
  const post = (name: string, widths: string[]) => `
    <div data-part="post" class="sp-row" style="align-items: flex-start; gap: 8px; padding: 10px 11px; border-bottom: 1px solid var(--sp-line)">
      <span class="sp-avatar" style="flex: 0 0 auto; width: 24px; height: 24px; font-size: 10px">${name.slice(0, 1)}</span>
      <div class="sp-stack" style="flex: 1 1 auto; min-width: 0; gap: 6px">
        <span data-part="name" style="font-size: 11px; font-weight: 600">${name}</span>
        ${widths.map((w) => `<div class="sp-line" style="width: ${w}; height: 6px"></div>`).join('')}
      </div>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Feed on a phone</span>
          <span class="sp-label">gaze recorded</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div class="sp-row" style="gap: 14px; align-items: flex-start">
            <div style="position: relative; flex: 0 0 auto; width: ${PHONE_W}px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 18px; overflow: hidden">
              <div class="sp-context sp-row sp-row--between" style="padding: 7px 12px; border-bottom: 1px solid var(--sp-line)">
                <span class="sp-label">Harbour feed</span>
                <span class="sp-label">9:41</span>
              </div>
              <div class="sp-scroll sp-context" data-part="feed" data-aim style="height: ${FEED_H}px">
                ${POSTS.map(([name, widths]) => post(name, widths)).join('')}
              </div>
              <div
                data-part="hold"
                data-subject
                style="position: absolute; left: 0; right: 0; top: ${HOLD_Y + 30}px; height: 24px; pointer-events: none; display: flex; align-items: center"
              >
                <span style="flex: 1 1 auto; height: 2px; background: var(--sp-accent); opacity: 0.5"></span>
                <span style="position: absolute; left: 50%; margin-left: -11px; width: 22px; height: 22px; border-radius: 50%; border: 3px solid var(--sp-accent); background: var(--sp-accent); opacity: 0.34"></span>
              </div>
            </div>
            <div class="sp-surface sp-stack" style="flex: 1 1 auto; padding: 11px 12px; gap: 9px">
              <div class="sp-stack" style="gap: 2px">
                <span class="sp-label">Gaze</span>
                <span data-part="gaze" style="font-size: 12px; font-weight: 600">held at y = ${HOLD_Y} px</span>
              </div>
              <div class="sp-stack" style="gap: 2px">
                <span class="sp-label">Under the point</span>
                <span data-part="under" style="font-size: 12px; font-weight: 600; white-space: nowrap">&nbsp;</span>
              </div>
              <div class="sp-stack" style="gap: 2px">
                <span class="sp-label">Posts passed through it</span>
                <span data-part="passed" style="font-size: 12px; font-weight: 600">0</span>
              </div>
            </div>
          </div>
          <span class="sp-text sp-context" data-part="readout" style="height: 22px; max-width: 440px; text-align: center">The point stays put and the feed streams through it.</span>
        </div>
      </div>
    </div>
  `;

  const feed = part(root, 'feed');
  const hold = part(root, 'hold');
  const under = part(root, 'under');
  const passed = part(root, 'passed');

  let baseline: number | undefined;

  const update = () => {
    const line = hold.getBoundingClientRect();
    const y = line.top + line.height / 2;
    const posts = partsOf(feed, 'post');
    let gone = 0;
    for (const item of posts) {
      const box = item.getBoundingClientRect();
      if (box.bottom < y) gone += 1;
      if (box.top <= y && box.bottom >= y) under.textContent = part(item, 'name').textContent ?? '';
    }
    // Counted from where the feed started, so the number is how many posts the gaze has
    // watched go by rather than how many happen to sit above it.
    baseline ??= gone;
    const through = gone - baseline;
    passed.textContent = String(through);
    // Cumulative state, so a choreography can claim the feed moved without timing a frame.
    flag(passed, 'data-moved', through > 0);
    flag(feed, 'data-scrolled', feed.scrollTop > 20);
  };

  feed.addEventListener('scroll', update);
  update();
}
