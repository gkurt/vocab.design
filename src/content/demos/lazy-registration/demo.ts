import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'lazy' | 'upfront';

const TRACKS = [
  ['Coastal Road', 'Ferris Wheel'],
  ['Blue Hour', 'Nadia Sun'],
  ['Slow Ferry', 'The Pilots'],
] as const;

const NOTE: Record<Mode, string> = {
  lazy: 'The work exists first. The account is asked for at the moment the work needs to outlive the session, and the three tracks are named in the ask.',
  upfront:
    'The same product with the ask moved to the front. Nothing has been made yet, so nothing is at stake, and the form is pure cost.',
};

/**
 * Lazy registration specimen: one playlist builder run two ways. In the lazy state the
 * three tracks are already real and the sign-up prompt arrives only when Save is pressed,
 * carrying the playlist's name and count into the ask. In the sign-up-first state the same
 * form stands in front of an empty library.
 *
 * The subject is the deferred prompt itself, the narrowest element the term names: the
 * playlist is the work the prompt is about, and the upfront gate is the counter-example it
 * is being compared with. The prompt is closed at mount, which is honest for a term whose
 * whole claim is about when the ask arrives; identify summons it by replaying the script
 * until Save has been pressed (SPEC §6).
 *
 * Both surfaces are absolutely positioned overlays and the track list keeps its box when it
 * is swapped for the empty state, so nothing in the scene reflows (SPEC §5). Opening and
 * dismissing are separate, explicit steps rather than one toggle, and each segment names an
 * absolute mode (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const rows = TRACKS.map(
    ([title, artist], i) => `<li class="sp-list-item" data-part="track-${i + 1}" style="padding: 7px 8px">
        <span class="sp-avatar" style="width: 22px; height: 22px; font-size: 10px">${i + 1}</span>
        <span class="sp-grow" style="font-size: 12px">${title}</span>
        <span class="sp-label" style="font-size: 11px">${artist}</span>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Tapedeck</span>
          <sp-segmented class="sp-segmented" data-part="mode" data-value="lazy">
            <button class="sp-segment" type="button" data-part="mode-upfront" value="upfront" style="padding: 5px 10px; font-size: 12px">Sign up first</button>
            <button class="sp-segment" type="button" data-part="mode-lazy" value="lazy" style="padding: 5px 10px; font-size: 12px">Lazy</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="position: relative; display: flex; flex-direction: column; justify-content: center">

          <div class="sp-surface" data-part="work" data-mode="lazy" style="padding: 10px 12px">
            <div class="sp-row sp-row--between" style="height: 18px">
              <span class="sp-heading" style="font-size: 13px">Late night drive</span>
              <span class="sp-label" data-part="count" style="font-size: 11px">3 tracks, this session only</span>
            </div>
            <div style="height: 112px; margin-top: 6px">
              <ul class="sp-list" data-part="tracks">${rows}</ul>
              <div class="sp-empty" data-part="empty" style="height: 100%; padding: 0; gap: 6px" hidden>
                <span class="sp-text" style="font-size: 12px">Nothing here yet</span>
                <span class="sp-label" style="font-size: 11px">The library opens after the account does</span>
              </div>
            </div>
            <div class="sp-row sp-row--between" style="height: 30px; margin-top: 4px">
              <span class="sp-label" style="font-size: 11px">No account has been made</span>
              <button class="sp-button sp-button--sm" type="button" data-part="save">Save playlist</button>
            </div>
          </div>

          <div class="sp-scrim" data-part="scrim"></div>

          <div class="sp-dialog" data-part="gate" role="dialog" aria-label="Create an account to start" style="width: 268px; padding: 12px 14px">
            <div class="sp-heading" style="font-size: 14px">Create an account to start</div>
            <div class="sp-text" style="margin-top: 4px; height: 32px; font-size: 11px">Nothing can be played, made, or kept until this is done.</div>
            <input class="sp-input" type="email" placeholder="you@example.com" aria-label="Email address" style="margin-top: 6px" />
            <button class="sp-button sp-button--sm" type="button" style="width: 100%; margin-top: 8px">Create account</button>
          </div>

          <div
            class="sp-dialog"
            data-part="prompt"
            data-subject
            role="dialog"
            aria-label="Keep this playlist"
            style="width: 268px; padding: 12px 14px"
          >
            <div class="sp-heading" style="font-size: 14px">Keep this playlist?</div>
            <div class="sp-text" data-part="carry" style="margin-top: 4px; height: 32px; font-size: 11px">
              Late night drive and its 3 tracks come with you and survive this tab.
            </div>
            <input class="sp-input" type="email" placeholder="you@example.com" aria-label="Email address" style="margin-top: 6px" />
            <div class="sp-row" style="gap: 8px; margin-top: 8px">
              <button class="sp-button sp-button--quiet sp-button--sm" type="button" data-part="not-now" style="color: var(--sp-muted); font-size: 12px">Not now</button>
              <button class="sp-button sp-button--sm sp-grow" type="button" style="text-align: center">Create account</button>
            </div>
          </div>

        </div>
      </div>
      <span class="sp-text sp-context" data-part="note" style="width: 452px; height: 32px; font-size: 11px">${NOTE.lazy}</span>
    </div>
  `;

  const work = part(root, 'work');
  const scrim = part(root, 'scrim');
  const gate = part(root, 'gate');
  const prompt = part(root, 'prompt');
  const tracks = part(root, 'tracks');
  const empty = part(root, 'empty');
  const count = part(root, 'count');
  const save = part(root, 'save');
  const note = part(root, 'note');

  const show = (mode: Mode) => {
    const lazy = mode === 'lazy';
    work.dataset.mode = mode;
    flag(tracks, 'hidden', !lazy);
    flag(empty, 'hidden', lazy);
    flag(gate, 'data-open', !lazy);
    flag(prompt, 'data-open', false);
    flag(scrim, 'data-open', !lazy);
    count.textContent = lazy ? '3 tracks, this session only' : '0 tracks';
    save.toggleAttribute('aria-disabled', !lazy);
    note.textContent = NOTE[mode];
  };

  part(root, 'mode').addEventListener('change', (event) => {
    show((event as CustomEvent<string>).detail === 'upfront' ? 'upfront' : 'lazy');
  });

  save.addEventListener('click', () => {
    if (work.dataset.mode !== 'lazy') return;
    flag(scrim, 'data-open', true);
    flag(prompt, 'data-open', true);
  });

  part(root, 'not-now').addEventListener('click', () => {
    flag(prompt, 'data-open', false);
    flag(scrim, 'data-open', false);
  });
}
