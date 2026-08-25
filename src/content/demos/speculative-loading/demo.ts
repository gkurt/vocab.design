import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** Hover intent, the eagerness a moderate speculation rule waits out. */
const INTENT_MS = 200;
/** How long the speculative fetch itself takes, off screen and out of the way. */
const SPECULATE_MS = 800;
/** What the same navigation costs when nothing was fetched ahead of it. */
const NAVIGATE_MS = 1100;

const MARK = { idle: 'not fetched', fetching: 'fetching', ready: 'prerendered' } as const;

/**
 * Speculative loading specimen: two links, one covered by a speculation rule and one
 * not. Hovering the covered link spends its hover intent and fetches the page off
 * screen, so the click that follows lands on a page that is already there; the plain
 * link pays the whole navigation after the click, on the demo's own clock. The pair is
 * the demonstration, which is why there is no simulate-a-slow-network control.
 *
 * The subject is the covered link itself, the element the rule names and the fetch is
 * aimed at, rather than the page around it: the rule covers links, one at a time.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const filler = (widths: number[]) => widths.map((w) => `<span class="sp-line" style="width: ${w}%"></span>`).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 252px">
        <div class="sp-topbar sp-context">
          <button class="sp-icon-button" data-part="back" aria-label="Back">${icon('chevronLeft')}</button>
          <span class="sp-text sp-grow" data-part="address">example.site/kit</span>
        </div>
        <div class="sp-body" style="padding: 14px 16px">
          <div data-part="screen" data-state="index" style="height: 100%">
            <div data-part="page-index" class="sp-stack" style="gap: 10px">
              <span class="sp-label sp-context">Read next</span>
              <div class="sp-row">
                <a class="sp-nav-item sp-grow" role="link" tabindex="0" data-part="covered" data-subject style="color: var(--sp-ink); text-decoration: underline; text-underline-offset: 3px">Colour ramps</a>
                <span class="sp-text" data-part="covered-mark" data-state="idle" style="flex: 0 0 92px; text-align: right">${MARK.idle}</span>
              </div>
              <div class="sp-row sp-context">
                <a class="sp-nav-item sp-grow" role="link" tabindex="0" data-part="plain" style="color: var(--sp-ink); text-decoration: underline; text-underline-offset: 3px">Spacing scale</a>
                <span class="sp-text" style="flex: 0 0 92px; text-align: right">no rule</span>
              </div>
              <span class="sp-text sp-context" style="margin-top: 2px">One speculation rule covers the first link. The other is fetched when it is asked for.</span>
            </div>
            <div data-part="page-covered" class="sp-stack" style="gap: 10px" hidden>
              <span class="sp-heading">Colour ramps</span>
              <div class="sp-stack sp-context" style="gap: 7px">${filler([96, 88, 72])}</div>
              <span class="sp-text sp-context">Already fetched and rendered before the click, so the click had nothing left to do.</span>
            </div>
            <div data-part="page-plain" class="sp-stack" style="gap: 10px" hidden>
              <span class="sp-heading">Spacing scale</span>
              <div class="sp-stack sp-context" style="gap: 7px">${filler([92, 80, 64])}</div>
              <span class="sp-text sp-context">Fetched after the click, which is the wait the rule was there to remove.</span>
            </div>
            <div data-part="page-waiting" class="sp-stack sp-context" style="gap: 10px; height: 100%; justify-content: center; align-items: center" hidden>
              <span class="sp-text">Fetching example.site/kit/spacing-scale</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const screen = part(root, 'screen');
  const covered = part(root, 'covered');
  const plain = part(root, 'plain');
  const mark = part(root, 'covered-mark');
  const address = part(root, 'address');
  const pages = {
    index: part(root, 'page-index'),
    covered: part(root, 'page-covered'),
    plain: part(root, 'page-plain'),
    waiting: part(root, 'page-waiting'),
  };

  let intent: number | undefined;
  let trip: number | undefined;
  let speculated = false;

  const show = (state: 'index' | 'instant' | 'waiting' | 'arrived', page: keyof typeof pages, url: string) => {
    screen.dataset.state = state;
    address.textContent = url;
    for (const [name, el] of Object.entries(pages)) el.hidden = name !== page;
  };

  const setMark = (state: keyof typeof MARK) => {
    mark.dataset.state = state;
    mark.textContent = MARK[state];
  };

  // Hover intent is the rule's own trigger, not the demo's flourish: a moderate
  // eagerness waits roughly this long before spending anything on a guess.
  covered.addEventListener('pointerenter', () => {
    if (speculated || intent !== undefined) return;
    intent = clock.setTimeout(() => {
      intent = undefined;
      setMark('fetching');
      clock.setTimeout(() => {
        speculated = true;
        setMark('ready');
      }, SPECULATE_MS);
    }, INTENT_MS);
  });

  covered.addEventListener('pointerleave', () => {
    // A pointer that passed through was never intent. Work already started stands.
    clock.clearTimeout(intent);
    intent = undefined;
  });

  covered.addEventListener('click', () => {
    if (speculated) {
      show('instant', 'covered', 'example.site/kit/colour-ramps');
      return;
    }
    show('waiting', 'waiting', 'example.site/kit/colour-ramps');
    trip = clock.setTimeout(() => show('arrived', 'covered', 'example.site/kit/colour-ramps'), NAVIGATE_MS);
  });

  plain.addEventListener('click', () => {
    show('waiting', 'waiting', 'example.site/kit/spacing-scale');
    trip = clock.setTimeout(() => show('arrived', 'plain', 'example.site/kit/spacing-scale'), NAVIGATE_MS);
  });

  part(root, 'back').addEventListener('click', () => {
    clock.clearTimeout(trip);
    show('index', 'index', 'example.site/kit');
  });
}
