import { flag, part } from '#src/kit/parts.ts';

const REPORT = {
  idle: { at: 'Rename (the trigger)', why: 'Resting where the reader left it.' },
  opened: { at: 'Project name, in the dialog', why: 'The dialog opened, so focus moved in.' },
  closed: { at: 'Rename (the trigger)', why: 'The dialog closed, so focus went back.' },
} as const;

type Moment = keyof typeof REPORT;

/**
 * Focus management specimen: the two moments the practice is made of, either side of one
 * dialog. Opening hands the ring to the dialog's first field; closing hands it back to the
 * control that opened it, rather than dropping it at the top of the page. The strip below
 * names each move as it happens.
 *
 * The subject is the dialog, the region focus is handed to and taken back from. Where the
 * ring lands the moment it arrives is initial focus, and holding it inside for as long as
 * the dialog is open is a focus trap; this specimen is about the handover in both
 * directions, so the surface the handover is around is the narrowest honest answer. The
 * page, the trigger, and the strip are scenery (SPEC §5).
 *
 * The ring is drawn with `data-sim-focus` and never with real focus, so a reader scrolling
 * past never loses their keyboard (SPEC §7); the script presses no Tab, so the stage's own
 * simulated focus stays out of the scene. Opening and closing are separate controls, so no
 * step depends on the state it happens to find (SPEC §8), and the strip holds both of its
 * lines from mount so nothing moves when the text changes (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="height: 214px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading" style="font-size: 14px">Harbour</span>
        </div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 12px">
          <div class="sp-field">
            <span class="sp-label">Project</span>
            <span class="sp-text sp-text--ink">Harbour, created 4 March</span>
          </div>
          <div class="sp-row" style="gap: 8px">
            <button class="sp-button sp-button--sm" type="button" data-part="trigger" data-sim-focus>Rename</button>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="archive">Archive</button>
          </div>
        </div>
        <div class="sp-scrim" data-part="scrim"></div>
        <div class="sp-dialog" role="dialog" aria-modal="true" aria-label="Rename project" data-part="dialog" data-subject
             style="width: 244px">
          <span class="sp-heading" style="font-size: 14px">Rename project</span>
          <div class="sp-field" style="margin-top: 10px">
            <label class="sp-label" for="vd-fm-name">Project name</label>
            <input class="sp-input" id="vd-fm-name" data-part="field" value="Harbour" readonly />
          </div>
          <div class="sp-row" style="justify-content: flex-end; gap: 8px; margin-top: 14px">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="cancel">Cancel</button>
            <button class="sp-button sp-button--sm" type="button" data-part="save">Rename</button>
          </div>
        </div>
      </div>
      <div class="sp-surface sp-context" style="width: 380px; padding: 8px 10px">
        <div class="sp-row sp-row--between" style="height: 18px">
          <span class="sp-label">Keyboard focus</span>
          <span class="sp-text sp-text--ink" data-part="at" data-moment="idle"
                style="font-size: 12px; white-space: nowrap">${REPORT.idle.at}</span>
        </div>
        <div class="sp-row sp-row--between" style="height: 18px; margin-top: 2px">
          <span class="sp-label">Because</span>
          <span class="sp-text" data-part="why" style="font-size: 12px; white-space: nowrap">${REPORT.idle.why}</span>
        </div>
      </div>
    </div>
  `;

  const dialog = part(root, 'dialog');
  const scrim = part(root, 'scrim');
  const trigger = part(root, 'trigger');
  const field = part(root, 'field');
  const at = part(root, 'at');
  const why = part(root, 'why');

  const report = (moment: Moment) => {
    at.dataset.moment = moment;
    at.textContent = REPORT[moment].at;
    why.textContent = REPORT[moment].why;
  };

  const setOpen = (open: boolean) => {
    flag(dialog, 'data-open', open);
    flag(scrim, 'data-open', open);
    // The handover, in both directions: the ring is somewhere deliberate at every moment,
    // and never on the body.
    flag(field, 'data-sim-focus', open);
    flag(trigger, 'data-sim-focus', !open);
    report(open ? 'opened' : 'closed');
  };

  trigger.addEventListener('click', () => setOpen(true));
  for (const key of ['cancel', 'save']) part(root, key).addEventListener('click', () => setOpen(false));
}
