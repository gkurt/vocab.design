import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

const SETUP = ['Choose who gets paged', 'Connect a Slack channel', 'Pick your quiet hours'];

const ALERTS = [
  ['Disk usage above 80%', 'Paging'],
  ['Error rate spike', 'Slack'],
  ['Latency p99 over 400 ms', 'Email'],
];

/**
 * Welcome mat specimen: a console whose Alerts tab is being opened for the first time by this
 * admin. The mat takes the content area rather than floating over it, so there is no scrim and
 * nothing to escape: it lists the three things to set up, offers one primary action, and offers
 * the permanent way out beside it. Dismissing it reveals the feature underneath, which already
 * has three alerts a teammate configured, because the mat reports "you have not been here yet"
 * and not "there is nothing here" (an empty state's claim).
 *
 * The subject is the mat itself, the panel the term names. The window chrome, the tab row and
 * the alert list it covers are scenery. It is honestly a welcome mat whenever it is on stage,
 * so no `data-pose` condition is needed; identify summons it after the pass has dismissed it.
 *
 * The mat and the feature share one box, the mat laid over it and opaque, so dismissal reveals
 * rather than reflows and nothing under it ever moves (SPEC §5). Dismissal is explicit and one
 * way, by the skip control or by the primary action, never a toggle: the loop's remount is what
 * brings the mat back, since a "show it again" control would be a mat that broke its promise.
 */
export function mount(root: HTMLElement): void {
  const tab = (name: string, current: boolean) => `
    <span class="sp-nav-item" data-part="tab-${name.toLowerCase()}" ${current ? 'data-current' : ''} style="padding: 4px 10px; font-size: 12px">${name}</span>
  `;

  const item = (text: string) => `
    <div class="sp-row" style="gap: 8px">
      <span
        style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 18px; height: 18px;
               border-radius: 50%; background: var(--sp-accent-soft); color: var(--sp-accent)"
        >${icon('check').replace('class="sp-icon"', 'class="sp-icon" style="width: 12px; height: 12px"')}</span
      >
      <span class="sp-text sp-text--ink" style="font-size: 12px">${text}</span>
    </div>
  `;

  const alert = ([name, route]: string[]) => `
    <div class="sp-list-item" style="padding: 8px 4px; font-size: 12px">
      <span class="sp-grow">${name}</span>
      <span class="sp-label" style="font-size: 11px">${route}</span>
    </div>
  `;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 302px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Acme Cloud</span>
          <span class="sp-avatar" style="width: 22px; height: 22px; font-size: 10px">DL</span>
        </div>

        <div class="sp-row sp-context" style="flex: 0 0 auto; gap: 2px; padding: 6px 10px; border-bottom: 1px solid var(--sp-line)">
          ${tab('Overview', false)}${tab('Usage', false)}${tab('Alerts', true)}
        </div>

        <div class="sp-body" style="position: relative; padding: 12px 14px">
          <div class="sp-stack sp-context" data-part="feature" data-state="covered" aria-hidden="true" style="gap: 8px">
            <div class="sp-row sp-row--between">
              <span class="sp-heading" style="font-size: 13px">Alerts</span>
              <span class="sp-button sp-button--sm" style="font-size: 12px">New alert</span>
            </div>
            <div class="sp-surface" style="padding: 2px 8px">${ALERTS.map(alert).join('')}</div>
          </div>

          <div
            class="sp-surface"
            data-part="mat"
            data-subject
            style="position: absolute; inset: 8px 10px; display: flex; flex-direction: column; gap: 9px;
                   padding: 12px 16px; background: var(--sp-surface); transition: opacity 0.22s ease, visibility 0.22s"
          >
            <div class="sp-stack" style="gap: 3px">
              <span class="sp-label" style="font-size: 10.5px; letter-spacing: 0.06em; text-transform: uppercase">First time here</span>
              <span class="sp-heading" style="font-size: 15px">Set up Alerts</span>
            </div>

            <span class="sp-text" style="font-size: 12px">Three things to decide, and then this page pages the right people.</span>

            <div class="sp-stack" style="gap: 7px">${SETUP.map(item).join('')}</div>

            <span class="sp-grow"></span>

            <div class="sp-row" style="gap: 10px; flex: 0 0 auto">
              <button class="sp-button sp-button--sm" type="button" data-part="start" style="font-size: 12px">Start setup</button>
              <button class="sp-button sp-button--quiet sp-button--sm" type="button" data-part="skip" style="font-size: 12px; color: var(--sp-muted)">
                Do not show again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const mat = part(root, 'mat');
  const feature = part(root, 'feature');

  /** One way, and permanent for this visit: the loop's remount is the only thing that brings it back.
   *  The feature under the mat is not the reader's to use until the mat has gone, which is the one
   *  thing a mat has in common with a modal and the reason it says so out loud. */
  const dismiss = () => {
    mat.style.opacity = '0';
    mat.style.visibility = 'hidden';
    feature.dataset.state = 'live';
    feature.removeAttribute('aria-hidden');
  };

  part(root, 'skip').addEventListener('click', dismiss);
  part(root, 'start').addEventListener('click', dismiss);
}
