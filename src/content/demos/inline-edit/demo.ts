import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

const START = 'Harbour';
/** Both modes live in this box, so the swap cannot move the rows around it (SPEC §5). */
const FIELD_W = 196;
const FIELD_H = 30;

const staticRow = (label: string, value: string) => `
  <div class="sp-row sp-context" style="height: ${FIELD_H}px; gap: 10px">
    <span class="sp-label" style="width: 92px; flex: 0 0 auto">${label}</span>
    <span class="sp-text sp-text--ink sp-grow">${value}</span>
  </div>`;

/**
 * Inline edit specimen: a settings row whose value is text until its own control turns
 * it into an input, with save and cancel beside it. The subject is the editable field
 * region, since the term names the value that changes mode and not the settings card
 * it sits in; the rows either side are scenery.
 *
 * The region is one box of fixed size holding both modes, so the pencil, the input,
 * and the pair of commit buttons all occupy room that was already there. The pencil
 * carries `data-aim`, since the ghost cursor would otherwise sit on top of the only
 * artwork that says the text can be edited.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="height: 244px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Project settings</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center">
          <div class="sp-surface sp-grow" style="padding: 8px 12px">
            ${staticRow('Owner', 'Rosa Marin')}
            <div class="sp-divider"></div>
            <div class="sp-row" style="height: ${FIELD_H}px; gap: 10px">
              <span class="sp-label sp-context" id="vd-ie-label" style="width: 92px; flex: 0 0 auto">Project name</span>
              <div
                data-part="field"
                data-subject
                data-mode="view"
                style="position: relative; width: ${FIELD_W}px; height: ${FIELD_H}px"
              >
                <div class="sp-row" data-part="view" style="height: 100%; gap: 6px">
                  <span class="sp-text sp-text--ink sp-grow" data-part="value" data-value="${START}">${START}</span>
                  <button
                    class="sp-icon-button"
                    type="button"
                    data-part="edit"
                    data-aim
                    aria-label="Edit project name"
                  >${icon('pencil')}</button>
                </div>
                <div class="sp-row" data-part="edit-mode" hidden style="height: 100%; gap: 4px">
                  <input
                    class="sp-input sp-grow"
                    type="text"
                    data-part="input"
                    aria-labelledby="vd-ie-label"
                    style="height: 28px; padding: 4px 8px"
                  />
                  <button class="sp-icon-button" type="button" data-part="save" aria-label="Save">${icon('check')}</button>
                  <button class="sp-icon-button" type="button" data-part="cancel" aria-label="Cancel">${icon('close')}</button>
                </div>
              </div>
            </div>
            <div class="sp-divider"></div>
            ${staticRow('Time zone', 'Europe/Lisbon')}
          </div>
        </div>
      </div>
    </div>
  `;

  const field = part(root, 'field');
  const view = part(root, 'view');
  const editMode = part(root, 'edit-mode');
  const value = part(root, 'value');
  const input = part(root, 'input') as HTMLInputElement;

  const open = () => {
    // Edit mode starts from what is on screen, which is what makes it an edit rather
    // than a re-entry.
    input.value = value.dataset.value ?? '';
    view.hidden = true;
    editMode.hidden = false;
    field.dataset.mode = 'edit';
  };

  const close = (commit: boolean) => {
    if (commit) {
      const next = input.value.trim() || (value.dataset.value ?? '');
      value.textContent = next;
      value.dataset.value = next;
    }
    editMode.hidden = true;
    view.hidden = false;
    field.dataset.mode = 'view';
  };

  // The pencil opens; save and cancel are the two ways out, so nothing here reaches a
  // mode by flipping whatever it found (SPEC §8).
  part(root, 'edit').addEventListener('click', () => open());
  part(root, 'save').addEventListener('click', () => close(true));
  part(root, 'cancel').addEventListener('click', () => close(false));

  field.addEventListener('keydown', (event) => {
    const key = (event as KeyboardEvent).key;
    if (field.dataset.mode !== 'edit') return;
    if (key === 'Escape') close(false);
    if (key === 'Enter') close(true);
  });
}
