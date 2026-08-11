import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** How long a fetch takes once it is finally made. */
const FETCH_MS = 620;
/** How far below the fold a block is fetched, the tuning knob the term is about. */
const APPROACH_PX = 24;

const SHOTS = [
  { caption: 'Low tide, west quay', wash: 'linear-gradient(120deg, #2f4f7f, #7fb2c9 62%, #e3d5a1)' },
  { caption: 'Crane, second week', wash: 'linear-gradient(120deg, #5a3f6b, #c1708a 58%, #f0b47a)' },
  { caption: 'Ferry in the channel', wash: 'linear-gradient(120deg, #1f5f52, #6bab8a 60%, #dfe3a6)' },
  { caption: 'Chandlery window', wash: 'linear-gradient(120deg, #7a4326, #d08a4b 55%, #f2ddb8)' },
  { caption: 'Night works, pier four', wash: 'linear-gradient(120deg, #202744, #4c5f96 58%, #9fb0d8)' },
] as const;

const STATE_TEXT = { deferred: 'not requested', loading: 'fetching', loaded: 'loaded' } as const;

function block(index: number): string {
  const shot = SHOTS[index];
  const n = index + 1;
  const subject = n === 1 ? ' data-subject' : '';
  return `
    <figure data-part="shot-${n}" data-state="deferred" style="margin: 0; display: flex; flex-direction: column; gap: 6px">
      <figcaption class="sp-row sp-row--between">
        <span class="sp-text sp-text--ink">${shot?.caption ?? ''}</span>
        <span class="sp-label" data-part="state-${n}">${STATE_TEXT.deferred}</span>
      </figcaption>
      <div data-part="media-${n}"${subject} style="position: relative; height: 84px; border-radius: 6px; overflow: hidden">
        <div class="sp-swatch" data-part="ph-${n}" style="position: absolute; inset: 0; border-radius: 6px"></div>
        <div data-part="img-${n}" style="position: absolute; inset: 0; opacity: 0; transition: opacity 0.35s var(--sp-ease); background: ${shot?.wash ?? ''}"></div>
      </div>
    </figure>`;
}

/**
 * Lazy loading specimen: a feed whose pictures are boxes until the scroller brings
 * them near, then are fetched and faded in. The subject is one media block, not the
 * feed: the term names what an individual resource does about its own fetch, and a
 * feed is only where several of them happen to sit.
 *
 * It is the first block that is marked, deliberately. The blocks further down are
 * where the deferral is watched, but they are below the fold at rest, and a subject
 * the identify ring would have to trace off the edge of the frame is no use to the
 * reader (SPEC §6). The first block is fully on screen and runs the same lifecycle,
 * fetched at mount precisely because it is the one already in view: lazy has never
 * meant late, it means asked for when needed.
 *
 * Every block reserves its box from the start, so a picture landing never moves the
 * caption below it (SPEC §5), and the fade is a transition rather than a scripted
 * animation, so reduced motion flattens it without the demo asking.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 276px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Field notes</span>
          <span class="sp-text" data-part="requests" role="status">0 of ${SHOTS.length} requested</span>
        </div>
        <div class="sp-body sp-context" style="padding: 0">
          <div class="sp-scroll" data-part="feed" style="height: 100%; display: flex; flex-direction: column; gap: 14px; padding: 12px">
            ${SHOTS.map((_, i) => block(i)).join('')}
          </div>
        </div>
        <div class="sp-divider"></div>
        <div class="sp-row sp-context" style="flex: 0 0 auto; padding: 8px 12px">
          <span class="sp-text">Eager loading would have asked for all ${SHOTS.length} before the first paint.</span>
        </div>
      </div>
    </div>
  `;

  const feed = part(root, 'feed');
  const requests = part(root, 'requests');
  const shots = SHOTS.map((_, i) => ({
    fig: part(root, `shot-${i + 1}`),
    media: part(root, `media-${i + 1}`),
    placeholder: part(root, `ph-${i + 1}`),
    image: part(root, `img-${i + 1}`),
    state: part(root, `state-${i + 1}`),
  }));

  let asked = 0;

  const fetchShot = (shot: (typeof shots)[number]) => {
    shot.fig.dataset.state = 'loading';
    shot.state.textContent = STATE_TEXT.loading;
    shot.placeholder.className = 'sp-skeleton';
    asked += 1;
    requests.textContent = `${asked} of ${SHOTS.length} requested`;
    clock.setTimeout(() => {
      shot.fig.dataset.state = 'loaded';
      shot.state.textContent = STATE_TEXT.loaded;
      shot.image.style.opacity = '1';
    }, FETCH_MS);
  };

  const sweep = () => {
    const fold = feed.getBoundingClientRect().bottom + APPROACH_PX;
    for (const shot of shots) {
      if (shot.fig.dataset.state !== 'deferred') continue;
      if (shot.media.getBoundingClientRect().top > fold) continue;
      fetchShot(shot);
    }
  };

  // A placeholder starts flat and only shimmers once the request is out: a skeleton
  // over a box nobody has asked for would claim work that is not happening.
  feed.addEventListener('scroll', sweep);
  sweep();
}
