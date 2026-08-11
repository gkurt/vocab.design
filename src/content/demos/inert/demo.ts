import { flag, part } from '#src/kit/parts.ts';

/**
 * Inert specimen: a settings page sealed behind a dialog. While the dialog is open
 * the page carries `inert`, and pressing Save draft produces nothing at all; close
 * the dialog and the same press produces its receipt. Two presses of one control,
 * two different outcomes, with only the attribute between them.
 *
 * The subject is the sealed region rather than the dialog, since the term names what
 * has been taken out of service. The receipt keeps its room from mount, so the press
 * that lands does not move the row it lands in (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame">
        <div class="sp-topbar sp-context">
          <span class="sp-heading" style="font-size: 14px">Project settings</span>
        </div>
        <div class="sp-body" data-part="page" data-subject style="display: flex; flex-direction: column; gap: 12px">
          <div class="sp-field">
            <label class="sp-label" for="vd-inert-name">Project name</label>
            <input class="sp-input" id="vd-inert-name" value="Harbour" readonly />
          </div>
          <div class="sp-row" style="gap: 8px">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="save">Save draft</button>
            <button class="sp-button sp-button--sm" type="button" data-part="open">Rename</button>
          </div>
          <div style="height: 24px">
            <span class="sp-chip" data-part="receipt" hidden>Draft saved</span>
          </div>
        </div>
        <div class="sp-scrim" data-part="scrim"></div>
        <div class="sp-dialog" role="dialog" aria-modal="true" aria-label="Rename project" data-part="dialog" style="width: 250px">
          <span class="sp-heading" style="font-size: 14px">Rename project</span>
          <input class="sp-input" value="Harbour" readonly style="margin-top: 10px" />
          <div class="sp-row" style="justify-content: flex-end; gap: 8px; margin-top: 14px">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="close">Cancel</button>
            <button class="sp-button sp-button--sm" type="button" data-part="rename">Rename</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const page = part(root, 'page');
  const scrim = part(root, 'scrim');
  const dialog = part(root, 'dialog');
  const receipt = part(root, 'receipt');

  const setOpen = (open: boolean) => {
    flag(dialog, 'data-open', open);
    flag(scrim, 'data-open', open);
    // The whole point of the term, in one attribute: focus order, hit testing and
    // the accessibility tree all go at once, for everything inside this region.
    flag(page, 'inert', open);
  };

  part(root, 'open').addEventListener('click', () => setOpen(true));
  for (const key of ['close', 'rename']) part(root, key).addEventListener('click', () => setOpen(false));

  part(root, 'save').addEventListener('click', (event) => {
    // A real press never reaches this listener while the region is inert: the browser
    // stops it at hit testing. Attract's events are dispatched straight at the element
    // and skip hit testing entirely (SPEC §8), so the specimen asks the question the
    // browser would have asked, and a scripted press is refused for the same reason.
    if ((event.currentTarget as HTMLElement).closest('[inert]')) return;
    receipt.hidden = false;
  });
}
