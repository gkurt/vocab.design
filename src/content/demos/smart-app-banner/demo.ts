import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'strip' | 'full';

const NOTE: Record<Mode | 'none', string> = {
  strip: 'A strip: 44px off the top of the page, a close button on it, and the article still readable underneath.',
  full: 'The same offer covering the page. Search engines treat this as an intrusive interstitial, so the installs cost ranking.',
  none: 'Dismissed. The room it held stays reserved, so the article does not jump when the banner goes.',
};

/**
 * Smart app banner specimen: a mobile page whose top strip pushes the native app, and the
 * same offer escalated to a full-page cover. Both are the term; the escalation is the story.
 *
 * The subject is the banner itself, one element in both modes, so identify rings the strip
 * or the cover depending on which the stage is holding. The picker, the browser chrome, the
 * article and the note are scenery (SPEC §5).
 *
 * The banner is positioned rather than in flow, and the page keeps a spacer of the strip's
 * height in every state, so escalating it or dismissing it never moves the article
 * (SPEC §5). Both modes carry an explicit dismissal (the close button on the strip, the
 * "Continue in browser" link on the cover), and picking a mode always shows the banner, so
 * no step depends on the state it finds (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const lines = [96, 88, 74, 92, 80, 86].map((width) => `<div class="sp-line" style="width: ${width}%"></div>`).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-row sp-row--between sp-context" style="width: 452px; flex: 0 0 auto; justify-content: flex-end">
        <sp-segmented data-stage-mode class="sp-segmented" data-axis="Banner style" data-part="mode" data-value="strip" style="flex: 0 0 auto">
          <button class="sp-segment" data-part="seg-strip" type="button" value="strip" style="padding: 4px 10px; font-size: 11.5px">Strip</button>
          <button class="sp-segment" data-part="seg-full" type="button" value="full" style="padding: 4px 10px; font-size: 11.5px">Full page</button>
        </sp-segmented>
      </div>

      <div class="sp-row" style="width: 452px; flex: 0 0 auto; align-items: stretch; gap: 14px">
        <div class="sp-frame" style="flex: 0 0 auto; width: 272px; height: 234px">
          <div class="sp-topbar sp-context" style="padding: 6px 8px; gap: 6px">
            <span class="sp-chip" style="flex: 1 1 auto; justify-content: center; padding: 2px 8px; font-size: 10.5px; cursor: default; background: var(--sp-sunken)">loomly.example/leeks</span>
            <span class="sp-icon-button" style="flex: 0 0 auto; width: 22px; height: 22px">${icon('menu')}</span>
          </div>

          <div data-part="page" data-banner="strip" style="position: relative; flex: 1 1 auto; min-height: 0; overflow: hidden; background: var(--sp-surface)">
            <div data-part="slot" style="height: 44px"></div>
            <div class="sp-context" style="padding: 8px 12px 12px">
              <span class="sp-heading" style="font-size: 13px">Braised leeks, hazelnuts</span>
              <span class="sp-label" style="display: block; margin-top: 2px; font-size: 10.5px">40 minutes, serves four</span>
              <div class="sp-stack" style="margin-top: 9px">${lines}</div>
            </div>

            <div data-part="banner" data-subject data-mode="strip">
              <div class="sp-row" data-part="strip-body" style="height: 100%; padding: 0 8px; gap: 8px">
                <span data-part="badge" style="flex: 0 0 auto; display: flex; align-items: center; justify-content: center; width: 26px; height: 26px; border-radius: 6px; background: var(--sp-accent-soft); color: var(--sp-accent); font-size: 13px; font-weight: 700">L</span>
                <span style="flex: 1 1 auto; min-width: 0">
                  <span class="sp-text sp-text--ink" style="display: block; font-size: 11.5px; font-weight: 600; line-height: 14px">Loomly</span>
                  <span class="sp-text" style="display: block; font-size: 10px; line-height: 13px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">Free, on the App Store</span>
                </span>
                <button class="sp-button sp-button--sm" data-part="install" type="button" style="flex: 0 0 auto; padding: 3px 10px; font-size: 11px; white-space: nowrap">Open</button>
                <button class="sp-icon-button" data-part="dismiss" data-aim type="button" style="flex: 0 0 auto; width: 22px; height: 22px">${icon('close')}</button>
              </div>

              <div data-part="full-body" hidden style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 7px; padding: 12px 16px; text-align: center">
                <span style="display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 10px; background: var(--sp-accent-soft); color: var(--sp-accent); font-size: 19px; font-weight: 700">L</span>
                <span class="sp-heading" style="font-size: 13px">Loomly is better in the app</span>
                <span class="sp-text" style="font-size: 10.5px; line-height: 1.3">Saved recipes, offline shopping lists, timers that keep running.</span>
                <button class="sp-button sp-button--sm" data-part="install-full" type="button" style="white-space: nowrap">Install the app</button>
                <button class="sp-button sp-button--quiet sp-button--sm" data-part="proceed" type="button" style="padding: 2px 6px; font-size: 10.5px; color: var(--sp-muted); white-space: nowrap">Continue in browser</button>
              </div>
            </div>
          </div>
        </div>

        <span class="sp-text sp-context" data-stage-verdict data-part="note" style="flex: 1 1 auto; align-self: flex-start; font-size: 11px; line-height: 1.4">${NOTE.strip}</span>
      </div>
    </div>
  `;

  const page = part(root, 'page');
  const banner = part(root, 'banner');
  const stripBody = part(root, 'strip-body');
  const fullBody = part(root, 'full-body');
  const note = part(root, 'note');

  const STRIP =
    'position: absolute; top: 0; left: 0; right: 0; height: 44px; z-index: 2; background: var(--sp-surface); border-bottom: 1px solid var(--sp-line)';
  const FULL = 'position: absolute; inset: 0; z-index: 2; background: var(--sp-surface)';

  let mode: Mode = 'strip';

  const render = (shown: boolean) => {
    banner.hidden = !shown;
    banner.dataset.mode = mode;
    banner.style.cssText = mode === 'strip' ? STRIP : FULL;
    stripBody.hidden = mode !== 'strip';
    fullBody.hidden = mode === 'strip';
    page.dataset.banner = shown ? mode : 'none';
    note.textContent = shown ? NOTE[mode] : NOTE.none;
  };

  part(root, 'dismiss').addEventListener('click', () => render(false));
  part(root, 'proceed').addEventListener('click', () => render(false));

  part(root, 'mode').addEventListener('change', (event) => {
    mode = (event as CustomEvent<string>).detail === 'full' ? 'full' : 'strip';
    render(true);
  });

  render(true);
}
