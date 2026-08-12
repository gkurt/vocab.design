import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

const STEPS = ['Details', 'Region', 'Review'];
const REGIONS = [
  { key: 'eu', label: 'Europe (Frankfurt)' },
  { key: 'us', label: 'US East (Virginia)' },
];
const MISSING = 'Give the workspace a name.';

/**
 * Wizard specimen: one task cut into three ordered steps, with the order enforced.
 * The subject is the wizard panel, since the term names the whole flow (the step
 * header, the fragment on show, and the Back and Next controls) rather than any one
 * of its parts; the application window around it is scenery.
 *
 * Leaving a step validates it, which is the claim the specimen exists to make: Next
 * on an empty name reports rather than advances. Answers are kept, so Back shows what
 * was typed and the review step reads it back. The step body is a fixed height and
 * the message slot is reserved, so changing step and failing validation both leave
 * the footer exactly where it was (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const header = STEPS.map(
    (title, index) => `
      <div class="sp-row" data-part="step-${index + 1}" style="gap: 6px">
        <span
          data-part="badge-${index + 1}"
          aria-hidden="true"
          style="display: flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; font-size: 11px; font-weight: 600"
        >${index + 1}</span>
        <span class="sp-label" style="font-size: 12px">${title}</span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 400px; height: 316px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Console</span><span class="sp-label">acme.io</span></div>
        <div class="sp-body sp-context">
          <section
            class="sp-surface"
            data-part="wizard"
            data-subject
            data-step="1"
            role="group"
            aria-label="Create a workspace"
            style="padding: 14px"
          >
            <div class="sp-row" data-part="steps" style="gap: 14px">${header}</div>
            <div class="sp-divider" style="margin: 12px 0"></div>
            <div data-part="body" style="height: 118px"></div>
            <div class="sp-row sp-row--between" style="margin-top: 12px">
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="back" aria-disabled="true">Back</button>
              <button class="sp-button sp-button--sm" type="button" data-part="next">Next</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  `;

  const wizard = part(root, 'wizard');
  const body = part(root, 'body');
  const back = part(root, 'back');
  const next = part(root, 'next');

  let index = 0;
  let name = '';
  let region = 'eu';
  let complained = false;
  let created = false;

  const details = () => `
    <div class="sp-stack" style="gap: 4px">
      <label class="sp-label" for="vd-wz-name">Workspace name</label>
      <input class="sp-input" id="vd-wz-name" data-part="name" type="text" autocomplete="off" spellcheck="false"
        aria-describedby="vd-wz-error" value="${name}" />
      <div style="height: 24px">
        <p class="sp-text sp-text--ink sp-row" id="vd-wz-error" data-part="error" role="alert" style="gap: 6px; margin: 4px 0 0; font-size: 12px" ${complained ? '' : 'hidden'}>
          ${icon('alert')}<span>${MISSING}</span>
        </p>
      </div>
    </div>`;

  const regionStep = () => `
    <div class="sp-stack" style="gap: 6px">
      <span class="sp-label" id="vd-wz-region">Region</span>
      <ul class="sp-listbox sp-listbox--static" role="listbox" aria-labelledby="vd-wz-region" style="box-shadow: none">
        ${REGIONS.map(
          ({ key, label }) =>
            `<li class="sp-option" role="option" data-part="region-${key}" data-region="${key}" aria-selected="${key === region}">${label}</li>`,
        ).join('')}
      </ul>
    </div>`;

  const review = () => `
    <div class="sp-stack" style="gap: 8px">
      ${created ? '<p class="sp-text sp-text--ink" style="margin: 0">Workspace created.</p>' : ''}
      <div class="sp-row sp-row--between">
        <span class="sp-label">Name</span>
        <span class="sp-text sp-text--ink" data-part="review-name" data-value="${name}">${name}</span>
      </div>
      <div class="sp-divider"></div>
      <div class="sp-row sp-row--between">
        <span class="sp-label">Region</span>
        <span class="sp-text sp-text--ink" data-part="review-region" data-value="${region}">${REGIONS.find((entry) => entry.key === region)?.label ?? ''}</span>
      </div>
    </div>`;

  const draw = () => {
    body.innerHTML = [details, regionStep, review][index]?.() ?? '';
    wizard.dataset.step = String(index + 1);
    for (const [position] of STEPS.entries()) {
      const step = part(root, `step-${position + 1}`);
      flag(step, 'data-current', position === index);
      flag(step, 'data-done', position < index);
      step.setAttribute('aria-current', position === index ? 'step' : 'false');
      const badge = part(root, `badge-${position + 1}`);
      const reached = position <= index;
      badge.style.background = reached ? 'var(--sp-accent)' : 'var(--sp-sunken)';
      badge.style.color = reached ? 'var(--sp-accent-ink)' : 'var(--sp-muted)';
    }
    back.setAttribute('aria-disabled', String(index === 0));
    next.textContent = index === STEPS.length - 1 ? 'Create workspace' : 'Next';
    next.setAttribute('aria-disabled', String(created));
    flag(wizard, 'data-created', created);
  };

  // Delegated: the step body is rewritten every time the flow moves.
  body.addEventListener('input', (event) => {
    const field = event.target as HTMLInputElement;
    if (field.dataset.part !== 'name') return;
    name = field.value;
    if (!complained || name.trim() === '') return;
    // The complaint is answered the moment the answer arrives.
    complained = false;
    part(root, 'error').hidden = true;
  });

  body.addEventListener('click', (event) => {
    const picked = (event.target as HTMLElement).closest<HTMLElement>('[data-region]')?.dataset.region;
    if (!picked) return;
    region = picked;
    for (const { key } of REGIONS) part(root, `region-${key}`).setAttribute('aria-selected', String(key === region));
  });

  next.addEventListener('click', () => {
    if (created) return;
    // A step is judged as it is left: the flow reports rather than advances, and the
    // button that would advance is never the thing that goes quiet (a disabled control
    // cannot explain itself).
    if (index === 0 && name.trim() === '') {
      complained = true;
      part(root, 'error').hidden = false;
      part(root, 'name').setAttribute('aria-invalid', 'true');
      return;
    }
    if (index === STEPS.length - 1) {
      created = true;
      draw();
      return;
    }
    index += 1;
    draw();
  });

  back.addEventListener('click', () => {
    if (index === 0 || created) return;
    index -= 1;
    draw();
  });

  draw();
}
