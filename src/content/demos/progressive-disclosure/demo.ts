import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

/**
 * Progressive disclosure specimen: the form asks for the two things everyone
 * needs and keeps the rest one click away. The concept is the arrangement, so
 * the specimen is a whole form, with the disclosure as its subject.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 320px">
        <div class="sp-stack sp-context">
          <div class="sp-field">
            <span class="sp-label">Project name</span>
            <span class="sp-input">Northwind</span>
          </div>
          <div class="sp-field">
            <span class="sp-label">Visibility</span>
            <span class="sp-input">Everyone at Acme</span>
          </div>
        </div>
        <div data-part="disclosure" data-subject style="margin-top: 14px">
          <button class="sp-button sp-button--quiet sp-button--sm sp-row" data-part="toggle" aria-expanded="false" aria-controls="advanced">
            ${icon('chevronRight', 'sp-icon--chevron')} Advanced options
          </button>
          <div class="sp-stack" data-part="advanced" id="advanced" hidden style="margin-top: 10px; padding-left: 6px">
            <div class="sp-field">
              <span class="sp-label">Default branch</span>
              <span class="sp-input">main</span>
            </div>
            <div class="sp-field">
              <span class="sp-label">Retention</span>
              <span class="sp-input">90 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const toggle = part(root, 'toggle');
  const advanced = part(root, 'advanced');
  toggle.addEventListener('click', () => {
    const open = advanced.hidden;
    advanced.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
  });
}
