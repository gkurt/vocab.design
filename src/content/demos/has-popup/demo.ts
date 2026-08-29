import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

type Trigger = { key: string; label: string; kind: string; opens: string };

/** Each trigger, the value it carries, and the surface it actually opens. */
const TRIGGERS: Trigger[] = [
  { key: 'menu', label: 'Actions', kind: 'menu', opens: 'menu' },
  { key: 'listbox', label: 'Country', kind: 'listbox', opens: 'listbox' },
  { key: 'dialog', label: 'Share', kind: 'dialog', opens: 'dialog' },
  { key: 'lie', label: 'Delete', kind: 'menu', opens: 'delete' },
];

const SURFACE_KIND: Record<string, string> = { menu: 'menu', listbox: 'listbox', dialog: 'dialog', delete: 'dialog' };

const OPTIONS = ['opt-gb', 'opt-ie', 'opt-fr'];

const CAPTION = {
  kept: 'Each trigger names the kind of surface it will open, so the announcement is a warning the reader can act on before pressing.',
  broken: 'Delete announces a pop-up menu and opens a dialog. The attribute is a promise, and a false one is worse than none at all.',
} as const;

/**
 * Has popup specimen: three triggers carrying `aria-haspopup` menu, listbox, and dialog,
 * with the line assistive technology adds to each one printed beside what actually opened.
 * A fourth trigger in the scenery carries the same attribute and opens something else, which
 * is the failure the attribute makes possible.
 *
 * The subject is the honest trigger group, the narrowest element that holds the promises the
 * term names. The liar sits outside it on purpose: a demo's counter-example is scenery, never
 * the subject, so no state of the subject is ever dishonest and no `data-pose` is needed
 * (SPEC §5–6). The readout rows and the caption are scenery too.
 *
 * Every surface is opened by its own trigger and dismissed explicitly, by choosing an item or
 * by Cancel, rather than by a trigger that toggles (SPEC §8). The room the surfaces take is
 * reserved from mount, so opening one moves nothing (SPEC §5), and the readout is written
 * from the attribute the trigger actually carries rather than from a table, so it cannot
 * claim an announcement the markup does not produce.
 */
export function mount(root: HTMLElement): void {
  const trigger = (t: Trigger) => `
    <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="trig-${t.key}"
            data-opens="${t.opens}" aria-haspopup="${t.kind}" aria-expanded="false"
            style="display: inline-flex; align-items: center; gap: 4px; padding: 5px 8px">
      ${t.label}${icon('chevronDown')}
    </button>`;

  const [menuTrigger, listTrigger, dialogTrigger, lieTrigger] = TRIGGERS;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 14px 16px">
        <div class="sp-row" style="gap: 8px; align-items: stretch">
          <div class="sp-surface sp-grow" data-part="triggers" data-subject style="padding: 8px 10px">
            <span class="sp-label">Each one says what it opens</span>
            <div class="sp-row" style="margin-top: 6px; gap: 6px">
              ${menuTrigger ? trigger(menuTrigger) : ''}${listTrigger ? trigger(listTrigger) : ''}${dialogTrigger ? trigger(dialogTrigger) : ''}
            </div>
          </div>
          <div class="sp-surface sp-context" style="flex: 0 0 132px; padding: 8px 10px">
            <span class="sp-label" style="font-size: 10px">Also promises a menu</span>
            <div style="margin-top: 6px">${lieTrigger ? trigger(lieTrigger) : ''}</div>
          </div>
        </div>

        <div data-part="room" style="position: relative; height: 104px; margin-top: 8px">
          <div class="sp-menu" data-part="menu" style="left: 0; top: 2px; min-width: 154px">
            <button class="sp-menu-item" type="button" data-part="menu-duplicate">Duplicate</button>
            <button class="sp-menu-item" type="button" data-part="menu-archive">Archive</button>
          </div>
          <ul class="sp-listbox" data-part="listbox" role="listbox" aria-label="Country"
              style="left: 96px; right: auto; top: 2px; width: 158px; max-height: 94px">
            <li class="sp-option" role="option" data-part="opt-gb" aria-selected="true">United Kingdom</li>
            <li class="sp-option" role="option" data-part="opt-ie" aria-selected="false">Ireland</li>
            <li class="sp-option" role="option" data-part="opt-fr" aria-selected="false">France</li>
          </ul>
          <div class="sp-dialog" data-part="dialog" role="dialog" aria-label="Share"
               style="left: 50%; top: 50%; width: 262px; padding: 10px 12px">
            <span class="sp-heading" style="font-size: 13px">Share this report</span>
            <p class="sp-text" style="margin: 4px 0 0; font-size: 11px">Anyone with the link can read it.</p>
            <div class="sp-row" style="margin-top: 8px; justify-content: flex-end; gap: 6px">
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="dialog-cancel">Cancel</button>
            </div>
          </div>
          <div class="sp-dialog" data-part="delete" role="alertdialog" aria-label="Delete"
               style="left: 50%; top: 50%; width: 262px; padding: 10px 12px">
            <span class="sp-heading" style="font-size: 13px">Delete this report?</span>
            <p class="sp-text" style="margin: 4px 0 0; font-size: 11px">A menu was promised. This is a dialog.</p>
            <div class="sp-row" style="margin-top: 8px; justify-content: flex-end; gap: 6px">
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="delete-cancel">Cancel</button>
            </div>
          </div>
        </div>

                  <span class="sp-text sp-text--ink" data-stage-announce data-part="announced" data-kind="menu"
                style="font-size: 11px; white-space: nowrap"></span>
        
        <div class="sp-row sp-row--between sp-context" style="margin-top: 4px; height: 18px">
          <span class="sp-label">Opened</span>
          <span class="sp-text sp-text--ink" data-part="opened" data-state="none" data-match="none"
                style="font-size: 11px; white-space: nowrap">nothing yet</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-case="kept"
           style="margin: 6px 0 0; height: 32px; font-size: 11px">${CAPTION.kept}</p>
      </div>
    </div>
  `;

  const announced = part(root, 'announced');
  const opened = part(root, 'opened');
  const caption = part(root, 'caption');
  const surfaces = ['menu', 'listbox', 'dialog', 'delete'];

  /** Read from the trigger's own attribute, so the strip cannot claim what the markup lacks. */
  const describe = (el: HTMLElement, label: string) => `button, “${label}”, has pop-up ${el.getAttribute('aria-haspopup')}`;

  const closeAll = () => {
    for (const name of surfaces) part(root, name).removeAttribute('data-open');
    for (const t of TRIGGERS) part(root, `trig-${t.key}`).setAttribute('aria-expanded', 'false');
  };

  const open = (t: Trigger) => {
    closeAll();
    const el = part(root, `trig-${t.key}`);
    el.setAttribute('aria-expanded', 'true');
    part(root, t.opens).setAttribute('data-open', '');
    announced.dataset.kind = el.getAttribute('aria-haspopup') ?? '';
    announced.textContent = describe(el, t.label);
    const kind = SURFACE_KIND[t.opens] ?? t.opens;
    const kept = kind === el.getAttribute('aria-haspopup');
    opened.dataset.state = kind;
    opened.dataset.match = kept ? 'kept' : 'broken';
    opened.textContent = kept ? `${kind}, exactly as promised` : `${kind}, and a menu was promised`;
    caption.dataset.case = kept ? 'kept' : 'broken';
    caption.textContent = kept ? CAPTION.kept : CAPTION.broken;
  };

  const dismiss = () => {
    closeAll();
    opened.dataset.state = 'none';
    opened.dataset.match = 'none';
    opened.textContent = 'nothing yet';
  };

  const first = TRIGGERS[0];
  if (first) {
    announced.textContent = describe(part(root, `trig-${first.key}`), first.label);
  }

  for (const t of TRIGGERS) part(root, `trig-${t.key}`).addEventListener('click', () => open(t));

  for (const name of ['menu-duplicate', 'menu-archive', 'dialog-cancel', 'delete-cancel'])
    part(root, name).addEventListener('click', dismiss);

  // Choosing an option is the listbox's own answer as well as its dismissal.
  const options = OPTIONS.map((key) => part(root, key));
  for (const option of options)
    option.addEventListener('click', () => {
      for (const other of options) other.setAttribute('aria-selected', String(other === option));
      // The picked option closes the popup it lives in, so the visible evidence of the
      // pick is mirrored onto the trigger, which is what a script can honestly assert.
      part(root, 'trig-listbox').dataset.choice = option.dataset.part?.replace('opt-', '') ?? '';
      dismiss();
    });
}
