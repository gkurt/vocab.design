import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** Seconds the reader is charged before the way onward is allowed. */
const COUNT = 2;

const HEADLINES = ['Tide tables for October', 'Slipway repairs begin Monday', 'Ferry timetable, winter'];

/**
 * Interstitial specimen: a full screen standing between a link and the article it
 * promised. The subject is the interstitial page itself, not the browser frame or the
 * article behind it, and it is absent until the link is followed, so identify summons
 * it by playing the script up to the moment it appears (SPEC §6).
 *
 * The three screens are peers in one fixed box, each occupying the whole content area
 * the way a page does, so nothing reflows as the journey moves through them (SPEC §5).
 * The countdown runs on the stage's clock, which is what lets a pose hold the screen
 * still instead of inspecting a number that keeps moving.
 *
 * A caption under the frame once read "The page you asked for is behind a page you did
 * not." That is the site explaining the term, not anything the browser or the site being
 * browsed would print, and the article carries the point, so it was deleted.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const index = HEADLINES.map(
    (title, i) => `
      <li class="sp-list-item" style="padding: 7px 4px">
        <span class="sp-grow ${i === 0 ? 'sp-text sp-text--ink' : 'sp-text'}"
              ${i === 0 ? 'data-part="link" role="link" tabindex="0" style="text-decoration: underline; cursor: pointer"' : ''}>${title}</span>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-icon-button" aria-hidden="true" style="width: 22px; height: 22px">${icon('chevronLeft')}</span>
          <span class="sp-chip sp-grow" data-part="url" style="justify-content: flex-start; cursor: default">harbour-times.example</span>
        </div>
        <div class="sp-body" style="position: relative; padding: 0">
          <div class="sp-context" data-part="site" style="height: 100%; padding: 10px 12px">
            <span class="sp-heading" style="font-size: 14px">Harbour Times</span>
            <ul class="sp-list" style="margin-top: 4px">${index}</ul>
          </div>
          <div
            data-part="ad"
            data-subject
            role="group"
            aria-label="Sponsored message"
            hidden
            style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;
                   gap: 8px; padding: 18px; text-align: center; background: var(--sp-surface)"
          >
            <span class="sp-label" style="font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase">Advertisement</span>
            <span class="sp-heading" style="font-size: 16px">Harbour Times Premium</span>
            <span class="sp-text" style="max-width: 260px">Every tide table, every slipway notice, on any device.</span>
            <button class="sp-button" type="button" data-part="offer" style="margin-top: 2px">Subscribe for 4.00 a month</button>
            <button
              class="sp-button sp-button--quiet sp-button--sm"
              type="button"
              data-part="skip"
              aria-disabled="true"
              style="width: 210px; color: var(--sp-muted)"
            >Continue in ${COUNT}</button>
          </div>
          <div class="sp-context" data-part="article" hidden style="position: absolute; inset: 0; background: var(--sp-surface); padding: 10px 12px">
            <span class="sp-heading" style="font-size: 14px">${HEADLINES[0]}</span>
            <div class="sp-stack" style="margin-top: 10px">
              <div class="sp-line" style="width: 96%"></div>
              <div class="sp-line" style="width: 88%"></div>
              <div class="sp-line" style="width: 92%"></div>
              <div class="sp-line" style="width: 61%"></div>
            </div>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="back" style="margin-top: 14px">Back to the index</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const site = part(root, 'site');
  const ad = part(root, 'ad');
  const article = part(root, 'article');
  const skip = part(root, 'skip');
  const url = part(root, 'url');

  let left = COUNT;
  let tick: number | undefined;

  const drawSkip = () => {
    skip.textContent = left > 0 ? `Continue in ${left}` : 'Continue to the article';
    skip.setAttribute('aria-disabled', String(left > 0));
    skip.style.color = left > 0 ? 'var(--sp-muted)' : 'var(--sp-ink)';
    flag(skip, 'data-ready', left === 0);
  };

  const countdown = () => {
    if (left <= 0) return;
    tick = clock.setTimeout(() => {
      left -= 1;
      drawSkip();
      countdown();
    }, 1000);
  };

  const show = (screen: 'site' | 'ad' | 'article') => {
    clock.clearTimeout(tick);
    site.hidden = screen !== 'site';
    ad.hidden = screen !== 'ad';
    article.hidden = screen !== 'article';
    url.textContent = screen === 'ad' ? 'harbour-times.example/interstitial' : 'harbour-times.example';
    if (screen !== 'ad') return;
    left = COUNT;
    drawSkip();
    countdown();
  };

  part(root, 'link').addEventListener('click', () => show('ad'));
  skip.addEventListener('click', () => {
    if (left > 0) return;
    show('article');
  });
  part(root, 'back').addEventListener('click', () => show('site'));
}
