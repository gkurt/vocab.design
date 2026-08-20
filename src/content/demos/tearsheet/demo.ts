import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

/** The viewport the sheets are measured against: the term is a fraction of a screen, so the screen is stated. */
const VIEW = { w: 476, h: 292 };
/** How far below the top edge each sheet stops. The second one stops lower, which is the stack. */
const TOP_1 = 40;
const TOP_2 = 78;
const RISE = 'transform 0.3s var(--sp-ease), visibility 0.3s';

/**
 * Tearsheet specimen: a cloud console at a quarter scale, with a creation flow rising from the
 * bottom edge of the viewport and stopping short of the top, so the page it came from is still
 * there above it. The flow has two steps, and its second step needs a key that does not exist
 * yet, which is the excuse the component exists for: a second tearsheet opens over the first and
 * the first stays visible at the top, stepped back, still waiting.
 *
 * The subject is the primary tearsheet, the surface the term names. The stacked sheet is the same
 * component doing the stacking and stays in the context register with the console behind it, so
 * one surface answers "which part of this is the term". It is honestly a tearsheet at every step
 * the script visits, so no `data-pose` condition is needed.
 *
 * Every surface is out of flow, so nothing behind moves as a sheet rises (SPEC §5), and both step
 * bodies are overlaid in a box that reserves the taller one, so advancing a step moves nothing.
 * The trigger only opens and dismissal is always explicit, by Cancel or the close control, which
 * is what a half-finished creation flow deserves (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const closer = (name: string, label: string) => `
    <button class="sp-icon-button" type="button" data-part="${name}" aria-label="${label}" style="width: 24px; height: 24px">${icon('close')}</button>
  `;

  const field = (label: string, value: string) => `
    <div class="sp-field">
      <span class="sp-label" style="font-size: 11px">${label}</span>
      <input class="sp-input" value="${value}" aria-label="${label}" style="padding: 5px 9px" />
    </div>
  `;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: ${VIEW.w}px; height: ${VIEW.h}px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Cloud console</span>
          <span class="sp-avatar" style="width: 22px; height: 22px; font-size: 10px">RH</span>
        </div>

        <div class="sp-body sp-context" style="padding: 12px">
          <div class="sp-row sp-row--between" style="margin-bottom: 8px">
            <span class="sp-heading" style="font-size: 13px">Services</span>
            <button class="sp-button sp-button--sm" type="button" data-part="open">Create service</button>
          </div>
          <div class="sp-surface" style="padding: 2px 8px">
            <div class="sp-list-item"><span class="sp-grow">object-store</span><span class="sp-label" style="font-size: 11px">Running</span></div>
            <div class="sp-list-item"><span class="sp-grow">queue-eu</span><span class="sp-label" style="font-size: 11px">Running</span></div>
          </div>
        </div>

        <div class="sp-scrim" data-part="scrim"></div>

        <div
          class="sp-surface"
          data-part="sheet-service"
          data-subject
          data-step="1"
          role="dialog"
          aria-label="Create service"
          style="position: absolute; left: 26px; right: 26px; top: ${TOP_1}px; bottom: 0; display: flex; flex-direction: column;
                 border-radius: 8px 8px 0 0; border-bottom: 0; box-shadow: var(--sp-shadow); transform: translateY(100%);
                 visibility: hidden; transition: ${RISE}"
        >
          <div class="sp-row" style="flex: 0 0 auto; padding: 6px 10px 6px 12px; border-bottom: 1px solid var(--sp-line)">
            <span class="sp-heading sp-grow" style="font-size: 13px">Create service</span>
            <span class="sp-label" data-part="progress" style="font-size: 11px; white-space: nowrap">Step 1 of 2</span>
            ${closer('service-close', 'Close create service')}
          </div>

          <div class="sp-grow" style="position: relative">
            <div data-part="step-1" class="sp-stack" style="position: absolute; inset: 12px; gap: 10px; transition: opacity 0.16s">
              ${field('Service name', 'billing-events')}
              ${field('Region', 'eu-central-1')}
            </div>
            <div
              data-part="step-2"
              class="sp-stack"
              style="position: absolute; inset: 12px; gap: 10px; opacity: 0; visibility: hidden; transition: opacity 0.16s, visibility 0.16s"
            >
              <span class="sp-label" style="font-size: 11px">Authentication</span>
              <span class="sp-text" style="font-size: 12px">This service needs an API key. There is not one yet, so make it here without losing this form.</span>
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="add-key" style="align-self: flex-start">Create API key</button>
            </div>
          </div>

          <div class="sp-row" style="flex: 0 0 auto; justify-content: flex-end; gap: 8px; padding: 10px 12px; border-top: 1px solid var(--sp-line)">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="service-cancel">Cancel</button>
            <button class="sp-button sp-button--sm" type="button" data-part="next" style="min-width: 74px">Next</button>
          </div>
        </div>

        <div
          class="sp-surface sp-context"
          data-part="sheet-key"
          role="dialog"
          aria-label="Create API key"
          style="position: absolute; left: 14px; right: 14px; top: ${TOP_2}px; bottom: 0; display: flex; flex-direction: column;
                 border-radius: 8px 8px 0 0; border-bottom: 0; box-shadow: var(--sp-shadow); transform: translateY(100%);
                 visibility: hidden; transition: ${RISE}"
        >
          <div class="sp-row" style="flex: 0 0 auto; padding: 6px 10px 6px 12px; border-bottom: 1px solid var(--sp-line)">
            <span class="sp-heading sp-grow" style="font-size: 13px">Create API key</span>
            <span class="sp-label" style="font-size: 11px; white-space: nowrap">Stacked over the flow</span>
            ${closer('key-close', 'Close create API key')}
          </div>
          <div class="sp-stack sp-grow" style="gap: 10px; padding: 12px">
            ${field('Key name', 'billing-writer')}
            <span class="sp-text" style="font-size: 12px">Finishing here returns you to step 2 of the service, with the form as you left it.</span>
          </div>
          <div class="sp-row" style="flex: 0 0 auto; justify-content: flex-end; gap: 8px; padding: 10px 12px; border-top: 1px solid var(--sp-line)">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="key-cancel">Cancel</button>
            <button class="sp-button sp-button--sm" type="button" data-part="key-create" style="min-width: 74px">Create</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const scrim = part(root, 'scrim');
  const service = part(root, 'sheet-service');
  const key = part(root, 'sheet-key');
  const step1 = part(root, 'step-1');
  const step2 = part(root, 'step-2');
  const progress = part(root, 'progress');
  const next = part(root, 'next');

  const raise = (sheet: HTMLElement, open: boolean) => {
    flag(sheet, 'data-open', open);
    sheet.style.transform = open ? 'translateY(0)' : 'translateY(100%)';
    sheet.style.visibility = open ? 'visible' : 'hidden';
    flag(scrim, 'data-open', service.hasAttribute('data-open') || key.hasAttribute('data-open'));
  };

  const setStep = (step: '1' | '2') => {
    service.dataset.step = step;
    progress.textContent = `Step ${step} of 2`;
    next.textContent = step === '1' ? 'Next' : 'Create';
    step1.style.opacity = step === '1' ? '1' : '0';
    step1.style.visibility = step === '1' ? 'visible' : 'hidden';
    step2.style.opacity = step === '2' ? '1' : '0';
    step2.style.visibility = step === '2' ? 'visible' : 'hidden';
  };

  part(root, 'open').addEventListener('click', () => {
    setStep('1');
    raise(service, true);
  });

  // The primary advances the flow, then finishes it: a creation flow's own explicit dismissal.
  next.addEventListener('click', () => {
    if (service.dataset.step === '1') {
      setStep('2');
      return;
    }
    raise(key, false);
    raise(service, false);
  });
  part(root, 'add-key').addEventListener('click', () => raise(key, true));

  for (const name of ['key-cancel', 'key-close', 'key-create']) {
    part(root, name).addEventListener('click', () => raise(key, false));
  }
  for (const name of ['service-cancel', 'service-close']) {
    part(root, name).addEventListener('click', () => {
      raise(key, false);
      raise(service, false);
    });
  }
}
