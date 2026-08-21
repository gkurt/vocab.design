import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

const INSIDE = ['stop-close', 'stop-cancel', 'stop-send'];
const BEHIND = ['page-overview', 'page-members', 'page-trigger'];

const CAPTION = {
  trapped: 'Three stops, and the fourth Tab is the first one again. Nothing behind the scrim is in the sequence at all.',
  released: 'Dismissed, and the constraint goes with it: the page behind is back in the sequence, from the top.',
} as const;

/**
 * Focus trap specimen: an invite dialog over a page, where the tab sequence is exactly the
 * dialog's three controls. Tab walks close, cancel, send, and the fourth press is close
 * again; the page's own controls are behind the scrim and never get the ring. Escape is the
 * documented exit, and taking it hands the page back its tab stops.
 *
 * The subject is the dialog, the region focus is held inside. The page around it, the scrim,
 * the stop counter and the caption are scenery (SPEC §5). Dismissed, the dialog is no longer
 * holding anything, so the honest condition lives in `data-pose` and the mount state
 * satisfies it: identify replays to the open dialog rather than ringing a spent one (SPEC §6).
 *
 * Every control in the scene is a `div` with a role and an explicit `tabindex`, never a
 * `<button>`: a button is in the tab sequence whatever its tabindex says, and the sequence is
 * the whole claim here. That makes the walk the stage's own (SPEC §7) over exactly the
 * elements a browser would walk, so the demo never draws a ring of its own and the sealing it
 * performs is real rather than narrated. The counter is read back out of the DOM for the same
 * reason. Nothing calls `preventDefault` on Tab and nothing calls `.focus()`, so a reader who
 * takes the stage over keeps their keyboard (SPEC §7). Dismissal is explicit and so is
 * opening, so no step depends on the state it finds (SPEC §8), and the counter row and the
 * caption hold their height from mount (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const stop = (key: string, label: string, cls: string, index: number) =>
    `<div class="${cls}" role="button" tabindex="${index}" data-part="${key}">${label}</div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 444px; height: 214px">
        <div class="sp-topbar sp-context" style="padding: 8px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Harbour</span>
          ${stop('page-overview', 'Overview', 'sp-button sp-button--quiet sp-button--sm', -1)}
          ${stop('page-members', 'Members', 'sp-button sp-button--quiet sp-button--sm', -1)}
        </div>

        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 9px">
          <span class="sp-label">Workspace members</span>
          <div class="sp-stack" style="gap: 7px">
            <div class="sp-line" style="width: 72%"></div>
            <div class="sp-line" style="width: 54%"></div>
          </div>
          <div class="sp-row" style="margin-top: 2px">
            ${stop('page-trigger', 'Invite people', 'sp-button sp-button--sm', -1)}
          </div>
        </div>

        <div class="sp-scrim" data-part="scrim" data-open></div>

        <div class="sp-dialog" role="dialog" aria-modal="true" aria-label="Invite people"
             data-part="dialog" data-subject data-pose="[data-trapped]" data-trapped data-open
             style="width: 252px; padding: 14px 16px">
          <div class="sp-row sp-row--between" style="gap: 10px">
            <span class="sp-heading" style="font-size: 14px">Invite people</span>
            <div class="sp-icon-button" role="button" aria-label="Close" tabindex="0" data-part="stop-close">${icon('close')}</div>
          </div>
          <p class="sp-text" style="margin: 8px 0 0; font-size: 12px">
            They will get an email with a link to this workspace.
          </p>
          <div class="sp-row" style="justify-content: flex-end; gap: 8px; margin-top: 14px">
            ${stop('stop-cancel', 'Cancel', 'sp-button sp-button--ghost sp-button--sm', 0)}
            ${stop('stop-send', 'Send invite', 'sp-button sp-button--sm', 0)}
          </div>
          <div class="sp-row" style="justify-content: flex-end; gap: 6px; margin-top: 10px">
            <span class="sp-kbd">Esc</span>
            <span class="sp-text" style="font-size: 11px">closes and gives focus back</span>
          </div>
        </div>
      </div>

      <div class="sp-surface sp-context" style="width: 444px; padding: 7px 10px">
        <div class="sp-row sp-row--between" style="height: 17px; gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">In the tab sequence</span>
          <span class="sp-text sp-text--ink" data-part="count" data-where="dialog"
                style="flex: 0 0 auto; font-size: 12px; white-space: nowrap">3 stops, all inside the dialog</span>
        </div>
        <p class="sp-text" data-part="caption" data-state="trapped"
           style="margin: 4px 0 0; height: 34px; font-size: 11px">${CAPTION.trapped}</p>
      </div>
    </div>
  `;

  const dialog = part(root, 'dialog');
  const scrim = part(root, 'scrim');
  const count = part(root, 'count');
  const caption = part(root, 'caption');

  const seal = (trapped: boolean) => {
    for (const key of INSIDE) part(root, key).tabIndex = trapped ? 0 : -1;
    for (const key of BEHIND) part(root, key).tabIndex = trapped ? -1 : 0;
    flag(dialog, 'data-open', trapped);
    flag(dialog, 'data-trapped', trapped);
    flag(scrim, 'data-open', trapped);
    // Read back out of the DOM, so the counter cannot disagree with the sequence it counts.
    const live = [...root.querySelectorAll<HTMLElement>('[data-part][tabindex="0"]')];
    count.dataset.where = trapped ? 'dialog' : 'page';
    count.textContent = `${live.length} stops, ${trapped ? 'all inside the dialog' : 'all out on the page'}`;
    caption.dataset.state = trapped ? 'trapped' : 'released';
    caption.textContent = trapped ? CAPTION.trapped : CAPTION.released;
  };

  seal(true);

  // Dismissal is explicit and opening is its own control, so neither flips what it finds.
  for (const key of ['stop-close', 'stop-cancel', 'stop-send']) part(root, key).addEventListener('click', () => seal(false));
  part(root, 'page-trigger').addEventListener('click', () => seal(true));
  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') seal(false);
  });
}
