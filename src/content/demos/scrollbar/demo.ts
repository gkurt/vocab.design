import { part } from '#src/kit/parts.ts';

const SECTIONS: [string, number][] = [
  ['Release 4.2', 3],
  ['Release 4.1', 4],
  ['Release 4.0', 3],
  ['Release 3.9', 4],
  ['Release 3.8', 3],
];

/** A thumb below this stops reading as a handle, whatever the ratio says. */
const MIN_THUMB = 22;

/**
 * Scrollbar specimen: a scrolling panel whose native bar is hidden and whose bar is
 * drawn by the demo instead, so the track and thumb are elements the stage can ring.
 *
 * The subject is the bar, not the panel it reports on. That is a deliberately narrow
 * subject, fourteen pixels of it, because the term names the bar and nothing else: the
 * content beside it is what is being scrolled, not part of the control. The bar sits in
 * the layout rather than over the content, which is the classic arrangement the term is
 * usually pictured in; the overlay kind is the same component with different paint.
 *
 * The thumb is sized from the ratio the panel reports (visible height over total
 * height) and placed from its scroll position, both read at the moment they are needed
 * and never after a style write (SPEC §5). Dragging the thumb sets the position, which
 * is the half of the term a still image cannot show.
 */
export function mount(root: HTMLElement): void {
  const body = SECTIONS.map(
    ([title, lines], i) => `
      <div style="margin-top: ${i === 0 ? 0 : 14}px">
        <span class="sp-label sp-text--ink">${title}</span>
        <div class="sp-stack" style="gap: 6px; margin-top: 6px">
          ${Array.from({ length: lines }, (_, n) => `<div class="sp-line" style="width: ${92 - n * 9}%"></div>`).join('')}
        </div>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="height: 264px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Changelog</span>
          <span class="sp-label">5 releases</span>
        </div>
        <div class="sp-body" style="padding: 12px">
          <div class="sp-surface" style="display: flex; height: 100%; overflow: hidden">
            <div
              class="sp-context"
              data-part="viewport"
              tabindex="0"
              aria-label="Changelog"
              style="flex: 1 1 auto; min-width: 0; overflow-y: scroll; scrollbar-width: none;
                     overscroll-behavior: contain; padding: 10px 12px"
            >${body}</div>
            <div
              data-part="scrollbar"
              data-subject
              data-at="start"
              style="position: relative; flex: 0 0 auto; width: 14px; padding: 3px;
                     background: var(--sp-sunken); border-left: 1px solid var(--sp-line)"
            >
              <div data-part="track" style="position: relative; height: 100%">
                <div
                  data-part="thumb"
                  style="position: absolute; left: 0; top: 0; width: 8px; height: ${MIN_THUMB}px;
                         border-radius: 999px; background: var(--sp-muted); cursor: grab"
                ></div>
                <span
                  data-part="track-foot"
                  aria-hidden="true"
                  style="position: absolute; left: 0; right: 0; bottom: 0; height: 20px; pointer-events: none"
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const viewport = part(root, 'viewport');
  const bar = part(root, 'scrollbar');
  const track = part(root, 'track');
  const thumb = part(root, 'thumb');

  const span = () => Math.max(viewport.scrollHeight - viewport.clientHeight, 0);

  const sync = () => {
    const trackH = track.clientHeight;
    const max = span();
    // Length is the ratio of what is visible to what there is: the thumb says how much
    // content there is, not just where in it the reader stands.
    const thumbH = Math.max(MIN_THUMB, Math.round(trackH * (viewport.clientHeight / viewport.scrollHeight)));
    const at = max > 0 ? viewport.scrollTop / max : 0;
    thumb.style.height = `${thumbH}px`;
    thumb.style.top = `${Math.round(at * (trackH - thumbH))}px`;
    if (max <= 0) bar.dataset.at = 'none';
    else if (at <= 0.01) bar.dataset.at = 'start';
    else if (at >= 0.99) bar.dataset.at = 'end';
    else bar.dataset.at = 'middle';
  };

  viewport.addEventListener('scroll', sync);

  let from: { y: number; top: number } | null = null;

  thumb.addEventListener('pointerdown', (event) => {
    // Mandatory guard: the player's synthetic pointers cannot be captured and the call throws (SPEC §7).
    if (event.isTrusted) thumb.setPointerCapture(event.pointerId);
    from = { y: (event as PointerEvent).clientY, top: viewport.scrollTop };
  });

  thumb.addEventListener('pointermove', (event) => {
    if (!from) return;
    const trackH = track.clientHeight;
    const travel = trackH - thumb.clientHeight;
    if (travel <= 0) return;
    const moved = ((event as PointerEvent).clientY - from.y) / travel;
    viewport.scrollTop = Math.min(Math.max(from.top + moved * span(), 0), span());
  });

  const release = () => {
    from = null;
  };
  thumb.addEventListener('pointerup', release);
  thumb.addEventListener('pointercancel', release);

  sync();
}
