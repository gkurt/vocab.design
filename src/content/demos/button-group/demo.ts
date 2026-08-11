import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

const RADIUS = 'var(--sp-radius)';

const ACTIONS = [
  { key: 'copy', label: 'Copy link', glyph: 'copy', status: 'Link copied', radius: `${RADIUS} 0 0 ${RADIUS}` },
  { key: 'duplicate', label: 'Duplicate', glyph: 'plus', status: 'Duplicated', radius: '0' },
  { key: 'archive', label: 'Archive', glyph: 'inbox', status: 'Moved to archive', radius: `0 ${RADIUS} ${RADIUS} 0` },
] as const;

/**
 * Button group specimen: three actions on the same file, set flush so they read as
 * one object. The subject is the container, since the term names the joinery and
 * not any button inside it.
 *
 * Every member reaches an absolute state (SPEC §8): a press reports that action,
 * whatever the last press was. The report line has its room from mount, so a longer
 * message never moves the group above it (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const buttons = ACTIONS.map(
    ({ key, label, glyph, radius }, index) =>
      `<button
        class="sp-button sp-button--ghost sp-button--sm sp-row"
        data-part="act-${key}"
        data-key="${key}"
        style="gap: 6px; border-radius: ${radius}; margin-left: ${index === 0 ? '0' : '-1px'}"
      >${icon(glyph)}<span>${label}</span></button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Brand assets</span></div>
        <div class="sp-body">
          <div class="sp-surface sp-context" style="padding: 12px">
            <div class="sp-row">
              <span class="sp-avatar" aria-hidden="true">PD</span>
              <span class="sp-grow">
                <span class="sp-heading" style="font-size: 13px">Poster draft.pdf</span>
                <span class="sp-text" style="display: block">2.4 MB, edited yesterday</span>
              </span>
            </div>
          </div>
          <div data-part="group" data-subject role="group" aria-label="File actions" style="display: inline-flex; margin-top: 14px">
            ${buttons}
          </div>
          <div class="sp-row sp-context" style="height: 20px; margin-top: 12px">
            <span class="sp-text" data-part="status" data-action="none" role="status">No actions yet</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const status = part(root, 'status');

  // Nothing here stays pressed: a button group reports what happened, never what is on.
  for (const action of ACTIONS) {
    part(root, `act-${action.key}`).addEventListener('click', () => {
      status.dataset.action = action.key;
      status.textContent = action.status;
    });
  }
}
