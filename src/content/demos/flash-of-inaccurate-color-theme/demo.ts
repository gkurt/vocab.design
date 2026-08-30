import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** How long the wrong theme is on screen before the stored preference lands. */
const FLASH_MS = 1150;

/**
 * The two themes the page paints in, written out because the specimen has to show a scheme
 * the stage is not in. Fixed table, so the load replays identically every time.
 */
const PAINT = {
  light: { surface: '#FFFFFF', ink: '#14171C', muted: '#6B7280', line: '#E5E7EB', accent: '#3557E8', accentInk: '#FFFFFF' },
  dark: { surface: '#151821', ink: '#E9EBEF', muted: '#8E95A2', line: '#2A2F3A', accent: '#7290FF', accentInk: '#10131C' },
} as const;

const STATUS = {
  flash: 'First paint uses the default light theme. The stored preference has not been read yet.',
  settled: 'The script ran after paint and applied dark. The reader already saw the light frame.',
  fixed: 'A blocking inline script in the head set the theme before the first paint. No frame was wrong.',
};

type Phase = 'flash' | 'settled';
type Mode = 'flash' | 'fixed';

/**
 * Flash of inaccurate colour theme specimen: a page load replayed on demand. The reader's
 * stored preference is dark in both modes. Under Flash the page paints light for a beat and
 * then snaps to dark, which is the term; under Fixed a blocking inline script has already
 * resolved the theme, so the first painted frame is the right one and nothing changes after
 * it. The browser frame around the page holds still throughout, so the flash reads as the
 * page's own and not as the whole specimen redrawing.
 *
 * The subject is the page surface that flashes. Because the term IS the flaw, the specimen
 * mounts in the wrong-theme frame and the subject carries `data-pose="[data-phase=flash]"`,
 * so identify refuses to pose the fixed version or the settled page and rings the light
 * frame instead (SPEC §6). The mode control, the replay control and the browser chrome are
 * instrumentation and sit in the context register (SPEC §5).
 *
 * The status line was printed inside the window, under the browser frame, where it read as
 * one more thing the mock was saying about itself. It changes with the mode switch, so it is
 * the verdict and the stage now draws it in the strip. The caption it sat above ("The browser
 * frame never repaints. Only the page inside it does.") never changed with anything and is
 * deleted rather than moved.
 *
 * Every box is fixed size and only paint and text change, so nothing moves (SPEC §5). The
 * repaint is instantaneous by design, with no transition and no scripted animation, so the
 * demonstration is identical under reduced motion.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 13px 18px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Stored preference: Dark</span>
          <div class="sp-row" style="gap: 8px">
            <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="flash" data-axis="First paint" data-term="flash">
              <button class="sp-segment" data-part="seg-flash" value="flash">Flash</button>
              <button class="sp-segment" data-part="seg-fixed" value="fixed">Fixed</button>
            </sp-segmented>
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="replay" type="button">Replay load</button>
          </div>
        </div>

        <div class="sp-context" data-part="browser"
             style="margin-top: 10px; height: 152px; border-radius: 10px; overflow: hidden; border: 1px solid var(--sp-line);
                    background: var(--sp-sunken)">
          <div class="sp-row" style="height: 26px; gap: 6px; padding: 0 10px; border-bottom: 1px solid var(--sp-line)">
            <span style="flex: 0 0 8px; height: 8px; border-radius: 50%; background: var(--sp-line)"></span>
            <span style="flex: 0 0 8px; height: 8px; border-radius: 50%; background: var(--sp-line)"></span>
            <span style="flex: 0 0 8px; height: 8px; border-radius: 50%; background: var(--sp-line)"></span>
            <span class="sp-grow" style="height: 12px; margin-left: 6px; border-radius: 6px; background: var(--sp-line)"></span>
          </div>

          <div data-part="page" data-subject data-mode="flash" data-phase="flash" data-pose="[data-phase=flash]"
               style="height: 125px; padding: 13px 15px; background: #FFFFFF">
            <div data-part="page-title" style="font-size: 15px; font-weight: 600; color: #14171C">Reading list</div>
            <div data-part="page-line-a" style="height: 8px; margin-top: 11px; width: 84%; border-radius: 4px; background: #E5E7EB"></div>
            <div data-part="page-line-b" style="height: 8px; margin-top: 7px; width: 68%; border-radius: 4px; background: #E5E7EB"></div>
            <div class="sp-row" style="gap: 8px; margin-top: 13px">
              <span data-part="page-cta" style="font-size: 11.5px; font-weight: 600; padding: 6px 12px; border-radius: 6px;
                    background: #3557E8; color: #FFFFFF">Continue</span>
              <span data-part="page-meta" style="font-size: 11.5px; color: #6B7280">Saved 4 minutes ago</span>
            </div>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="status"
           style="margin: 8px 0 0; height: 30px; font-size: 10.5px; line-height: 1.4">${STATUS.flash}</p>
      </div>
    </div>
  `;

  const page = part(root, 'page');
  const title = part(root, 'page-title');
  const lineA = part(root, 'page-line-a');
  const lineB = part(root, 'page-line-b');
  const cta = part(root, 'page-cta');
  const meta = part(root, 'page-meta');
  const status = part(root, 'status');

  let mode: Mode = 'flash';
  let pending: number | undefined;

  const paint = (phase: Phase) => {
    const p = phase === 'flash' ? PAINT.light : PAINT.dark;
    page.dataset.phase = phase;
    page.style.background = p.surface;
    title.style.color = p.ink;
    lineA.style.background = p.line;
    lineB.style.background = p.line;
    cta.style.background = p.accent;
    cta.style.color = p.accentInk;
    meta.style.color = p.muted;
    status.textContent = mode === 'fixed' ? STATUS.fixed : STATUS[phase];
  };

  const load = () => {
    clock.clearTimeout(pending);
    page.dataset.mode = mode;
    if (mode === 'fixed') {
      paint('settled');
      return;
    }
    paint('flash');
    pending = clock.setTimeout(() => paint('settled'), FLASH_MS);
  };

  load();

  part(root, 'segmented').addEventListener('change', (event) => {
    mode = (event as CustomEvent<string>).detail === 'fixed' ? 'fixed' : 'flash';
    load();
  });
  part(root, 'replay').addEventListener('click', load);
}
