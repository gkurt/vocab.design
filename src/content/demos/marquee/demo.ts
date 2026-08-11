import { flag, part } from '#src/kit/parts.ts';

const QUOTES = [
  { name: 'FTSE 100', change: '+0.4%', up: true },
  { name: 'Brent crude', change: '78.10', up: true },
  { name: 'Cocoa', change: '-2.1%', up: false },
  { name: 'Copper', change: '+1.1%', up: true },
  { name: 'Gold', change: '2,318.40', up: true },
  { name: 'Yen', change: '-0.3%', up: false },
];

/**
 * Marquee specimen: a ticker strip whose content is wider than the strip, scrolling
 * itself forever. The subject is the strip, since the term names the box that does
 * the scrolling and not the page it sits at the top of.
 *
 * The loop is the kit's (`.sp-marquee`), for the reason the shimmer is: an endless
 * animation has to be one the stage can pause off screen and drop under reduced
 * motion, which is a CSS animation and not an `element.animate` one. The kit's track
 * travels half its own width, so the demo's job is only to supply two identical
 * groups; the copy is decoration and says so with `aria-hidden`.
 *
 * Holding still for a reader is part of the term, and it needs the attribute spelling
 * beside the pseudo-class: attract's synthesized pointer never lights up `:hover`
 * (SPEC §7), so the strip says `data-paused` out loud when the pointer arrives.
 */
export function mount(root: HTMLElement): void {
  const items = QUOTES.map(
    (quote) => `
      <span class="sp-row" style="gap: 6px">
        <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 600; white-space: nowrap">${quote.name}</span>
        <span class="sp-text" style="font-size: 12px; white-space: nowrap; color: ${quote.up ? 'var(--sp-accent)' : 'var(--sp-muted)'}">${quote.change}</span>
      </span>`,
  ).join('');

  const group = (copy: boolean) => `<div class="sp-marquee-group"${copy ? ' aria-hidden="true"' : ''}>${items}</div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 232px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Markets</span>
          <span class="sp-text" style="font-size: 12px">Pointer holds the strip</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 12px">
          <div
            class="sp-marquee sp-surface"
            data-part="strip"
            data-subject
            style="flex: 0 0 auto; height: 34px; align-items: center; --sp-marquee-time: 16s; --sp-marquee-gap: 28px"
          >
            <div class="sp-marquee-track" data-part="track">${group(false)}${group(true)}</div>
          </div>
          <div class="sp-stack sp-context" data-part="page" style="flex: 1 1 auto; gap: 9px">
            <span class="sp-label">Overnight</span>
            <span class="sp-line" style="width: 96%"></span>
            <span class="sp-line" style="width: 88%"></span>
            <span class="sp-line" style="width: 92%"></span>
            <span class="sp-line" style="width: 54%"></span>
          </div>
        </div>
      </div>
    </div>
  `;

  const strip = part(root, 'strip');
  strip.addEventListener('pointerenter', () => flag(strip, 'data-paused', true));
  strip.addEventListener('pointerleave', () => flag(strip, 'data-paused', false));
}
