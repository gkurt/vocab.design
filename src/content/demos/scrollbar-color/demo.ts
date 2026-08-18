import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * WCAG relative luminance and contrast, written out rather than quoted, because the verdict on
 * screen is measured from the two colours the property is actually being given.
 */
const decode = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

const luminance = (hex: string): number => {
  const [r, g, b] = [1, 3, 5].map((i) => decode(Number.parseInt(hex.slice(i, i + 2), 16) / 255));
  return 0.2126 * (r ?? 0) + 0.7152 * (g ?? 0) + 0.0722 * (b ?? 0);
};

const contrast = (a: string, b: string): number => {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
};

/** WCAG 1.4.11, non-text contrast: a control has to clear 3:1 against what it sits on. */
const FLOOR = 3;

type Mode = {
  key: string;
  name: string;
  surface: string;
  line: string;
  thumb: string;
  track: string;
  note: string;
};

const MODES: Mode[] = [
  {
    key: 'light',
    name: 'Light',
    surface: '#FFFFFF',
    line: '#DDE1E8',
    thumb: '#7E8698',
    track: '#EDEFF3',
    note: 'Close to what the browser would have drawn on its own, which is the case for declaring color-scheme and stopping there.',
  },
  {
    key: 'dark',
    name: 'Dark',
    surface: '#23272F',
    line: '#464E5C',
    thumb: '#7A8394',
    track: '#2C313A',
    note: 'A dark panel inside a light page: the browser cannot know what the bar is sitting on, so the pair is stated.',
  },
  {
    key: 'brand',
    name: 'Brand',
    surface: '#FFFFFF',
    line: '#DDE1E8',
    thumb: '#A9B6FB',
    track: '#EDF0FE',
    note: 'The common failure: a brand tint the eye reads as a decorated gutter rather than as something to grab.',
  },
];

const START = 'light';
/** A thumb below this stops reading as a handle, whatever the ratio says. */
const MIN_THUMB = 24;

const modeOf = (key: string) => MODES.find((m) => m.key === key) ?? MODES[0];

/**
 * Scrollbar colour specimen: a real scrolling region whose bar is painted with the two values
 * `scrollbar-color` takes, thumb then track, with the contrast between them measured and held
 * against the non-text contrast floor.
 *
 * The bar is drawn by the specimen rather than being the browser's own, for the same reason the
 * scrollbar specimen draws one: a native bar is an overlay in current Chromium, painted only
 * while scrolling, taking no layout room and impossible for the stage to ring. What is real is
 * the scroller, the ratio the thumb is sized from, and the position it is placed at, all read
 * from the element itself. The declaration is printed beside it so the property being
 * demonstrated is on screen in the form a stylesheet would take.
 *
 * The theme control is what makes the pair arguable. Light and dark are ordinary tuned pairs; at
 * brand the thumb drops to 1.72:1 against its own track and the read-out flags it. The subject is
 * a scrollbar colour in all three states, a failing pair being no less one than a passing pair,
 * so identify has nothing to refuse.
 *
 * The subject is the scroller, the element the property is set on, which is what separates this
 * specimen from the scrollbar one next door: there the bar is the term, here the colours the
 * scroller hands it are. The theme control, the swatch read-out and the caption are
 * instrumentation and sit in the context register (SPEC §5).
 *
 * The scroller is a fixed size with fixed read-out heights, so nothing moves as the theme
 * changes (SPEC §5). Every colour comes from the table above and every number is derived from
 * it, so the specimen renders identically on every run.
 */
export function mount(root: HTMLElement): void {
  const WIDTHS = [100, 86, 94, 72, 100, 90, 66, 98, 82, 100, 76, 92, 100, 88, 70, 96, 84, 100, 74, 90];
  // `flex: 0 0 auto`, or a column flex container would shrink the rows to fit and leave
  // nothing to scroll, which is the one thing this specimen needs to be real.
  const filler = WIDTHS.map((w, i) => `<span class="sp-line" data-part="line-${i}" style="flex: 0 0 8px; width: ${w}%"></span>`).join('');

  const pairRow = (which: string, label: string) => `
    <div class="sp-row" style="gap: 6px; height: 18px">
      <span class="sp-label" style="flex: 0 0 38px">${label}</span>
      <span class="sp-swatch" data-part="chip-${which}" style="flex: 0 0 22px; height: 13px;
            box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.4)"></span>
      <span class="sp-text" data-part="hex-${which}" style="font-size: 9.5px; font-variant-numeric: tabular-nums"></span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Theme</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="${START}">
            ${MODES.map((m) => `<button class="sp-segment" data-part="seg-${m.key}" value="${m.key}">${m.name}</button>`).join('')}
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 14px; margin-top: 11px; align-items: flex-start">
          <div class="sp-stack" style="flex: 0 0 252px; gap: 4px">
            <div data-part="scroller" data-subject data-mode="${START}" data-verdict="pass"
                 style="display: flex; height: 150px; border-radius: 6px; overflow: hidden;
                        box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.5)">
              <div class="sp-stack" data-part="viewport" tabindex="0" aria-label="Release notes"
                   style="flex: 1 1 auto; min-width: 0; gap: 9px; padding: 10px; overflow-y: scroll;
                          scrollbar-width: none; overscroll-behavior: contain">
                ${filler}
              </div>
              <div data-part="bar" style="position: relative; flex: 0 0 14px; padding: 3px">
                <div data-part="track" style="position: relative; height: 100%">
                  <div data-part="thumb" style="position: absolute; left: 0; top: 0; width: 8px; height: ${MIN_THUMB}px;
                       border-radius: 999px; cursor: grab"></div>
                </div>
              </div>
            </div>
            <span class="sp-text sp-context" style="height: 26px; font-size: 9px; line-height: 1.35">
              The bar is drawn here: a browser's own is an overlay that paints only while scrolling.
            </span>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 0; min-width: 0; gap: 4px">
            ${pairRow('thumb', 'Thumb')}
            ${pairRow('track', 'Track')}
            <span class="sp-text sp-text--ink" data-part="declaration"
                  style="margin-top: 6px; height: 28px; font-size: 9.5px; line-height: 1.45; font-variant-numeric: tabular-nums"></span>
            <span class="sp-row" style="gap: 5px; height: 18px">
              <span class="sp-text" data-part="ratio" style="font-size: 9.5px; font-variant-numeric: tabular-nums"></span>
              <span data-part="mark" style="flex: 0 0 14px; display: flex"></span>
            </span>
          </div>
        </div>

        <p class="sp-text sp-context" data-part="caption" style="margin: 8px 0 0; height: 28px; font-size: 10px; line-height: 1.4"></p>
      </div>
    </div>
  `;

  const scroller = part(root, 'scroller');
  const viewport = part(root, 'viewport');
  const bar = part(root, 'bar');
  const track = part(root, 'track');
  const thumb = part(root, 'thumb');

  const span = () => Math.max(viewport.scrollHeight - viewport.clientHeight, 0);

  /** Length from the ratio, position from the scroll offset: both read off the real scroller. */
  const sync = () => {
    const trackH = track.clientHeight;
    const max = span();
    const thumbH = Math.max(MIN_THUMB, Math.round(trackH * (viewport.clientHeight / viewport.scrollHeight)));
    const at = max > 0 ? viewport.scrollTop / max : 0;
    thumb.style.height = `${thumbH}px`;
    thumb.style.top = `${Math.round(at * (trackH - thumbH))}px`;
    flag(scroller, 'data-scrolled', viewport.scrollTop > 8);
  };

  viewport.addEventListener('scroll', sync);

  const apply = (key: string) => {
    const mode = modeOf(key);
    if (!mode) return;
    const ratio = contrast(mode.thumb, mode.track);
    const pass = ratio >= FLOOR;

    scroller.dataset.mode = mode.key;
    scroller.dataset.verdict = pass ? 'pass' : 'low';
    viewport.style.background = mode.surface;
    for (let i = 0; i < WIDTHS.length; i++) part(root, `line-${i}`).style.background = mode.line;

    // The two values of the property, in the order it takes them.
    bar.style.background = mode.track;
    thumb.style.background = mode.thumb;
    part(root, 'chip-thumb').style.setProperty('--sp-swatch', mode.thumb);
    part(root, 'chip-track').style.setProperty('--sp-swatch', mode.track);
    part(root, 'hex-thumb').textContent = mode.thumb;
    part(root, 'hex-track').textContent = mode.track;
    part(root, 'declaration').textContent = `scrollbar-color: ${mode.thumb} ${mode.track}`;
    part(root, 'ratio').textContent = `${ratio.toFixed(2)}:1 ${pass ? 'clears' : 'under'} ${FLOOR}:1`;
    part(root, 'mark').innerHTML = pass ? icon('check') : icon('alert');
    part(root, 'caption').textContent = mode.note;
  };
  apply(START);
  sync();

  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
