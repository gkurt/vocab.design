import { part } from '#src/kit/parts.ts';

const RECORD = {
  none: 'Nothing recorded yet',
  accepted: 'Analytics cookies: accepted',
  rejected: 'Analytics cookies: rejected',
} as const;

type Choice = keyof typeof RECORD;

/**
 * Cookie consent banner specimen: the notice that arrives before the page has been
 * read. The subject is the banner itself, not the article behind it, and not the
 * line below the frame that says which way the choice went: that line is the
 * demo's own instrumentation, so it is scenery (SPEC §5).
 *
 * Accept and reject carry the same weight, which is the honest arrangement rather
 * than the common one. The banner is out of flow, so dismissing it moves nothing in
 * the page, and the record line holds the room of its longest reading from mount so
 * the control beside it cannot be pushed around (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Northwind Gazette</span></div>
        <div class="sp-body sp-context" style="overflow: hidden">
          <div class="sp-prose" style="--sp-measure: 46ch">
            <p style="margin: 0"><b>Harbour works to finish late</b></p>
            <p>The east quay reopens in spring, two seasons after the original date, with the ferry ramp rebuilt a metre higher than the one it replaces.</p>
            <p>Councillors were told the delay adds little to the final bill.</p>
          </div>
        </div>

        <div class="sp-surface" data-part="banner" data-subject data-view="notice" role="region" aria-label="Cookies on this site"
             style="position: absolute; left: 12px; right: 12px; bottom: 12px; padding: 12px 14px; box-shadow: var(--sp-shadow)">
          <div class="sp-heading">Cookies on this site</div>
          <p class="sp-text" style="margin: 4px 0 10px">Essential cookies keep the site working. We would also like to set analytics cookies to count visits.</p>
          <div class="sp-row" style="gap: 8px">
            <button class="sp-button sp-button--sm" data-part="accept" type="button">Accept analytics</button>
            <button class="sp-button sp-button--sm" data-part="reject" type="button">Reject analytics</button>
            <button class="sp-button sp-button--quiet sp-button--sm" data-part="manage" type="button">Choose purposes</button>
          </div>
          <div data-part="purposes" hidden>
            <div class="sp-divider" style="margin: 12px 0 10px"></div>
            <div class="sp-row sp-row--between">
              <span class="sp-text sp-text--ink">Essential (always on)</span>
              <button class="sp-switch" type="button" role="switch" aria-checked="true" aria-label="Essential cookies" disabled></button>
            </div>
            <div class="sp-row sp-row--between" style="margin-top: 8px">
              <span class="sp-text sp-text--ink">Analytics</span>
              <button class="sp-switch" data-part="analytics" type="button" role="switch" aria-checked="false" aria-label="Analytics cookies"></button>
            </div>
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="save" type="button" style="margin-top: 10px">Save choices</button>
          </div>
        </div>
      </div>

      <div class="sp-row sp-context">
        <span class="sp-text" data-part="record" data-choice="none" role="status">${RECORD.none}</span>
        <button class="sp-button sp-button--ghost sp-button--sm" data-part="reopen" type="button">Reopen notice</button>
      </div>
    </div>
  `;

  const banner = part(root, 'banner');
  const purposes = part(root, 'purposes');
  const analytics = part(root, 'analytics');
  const record = part(root, 'record');

  let reserved = 0;
  for (const text of Object.values(RECORD)) {
    record.textContent = text;
    reserved = Math.max(reserved, record.offsetWidth);
  }
  record.style.minWidth = `${reserved}px`;
  record.textContent = RECORD.none;

  const decide = (choice: Choice) => {
    record.dataset.choice = choice;
    record.textContent = RECORD[choice];
    banner.hidden = choice !== 'none';
  };

  part(root, 'accept').addEventListener('click', () => decide('accepted'));
  part(root, 'reject').addEventListener('click', () => decide('rejected'));
  part(root, 'save').addEventListener('click', () => decide(analytics.getAttribute('aria-checked') === 'true' ? 'accepted' : 'rejected'));

  // Opens the per-purpose route; it never closes it again, so a script resumed
  // mid-pass finds the same banner either way (SPEC §8).
  part(root, 'manage').addEventListener('click', () => {
    banner.dataset.view = 'choices';
    purposes.hidden = false;
  });

  // A switch is the one control here whose flip is its own meaning.
  analytics.addEventListener('click', () => {
    analytics.setAttribute('aria-checked', String(analytics.getAttribute('aria-checked') !== 'true'));
  });

  // Instrumentation: consent can be revisited, which is also how this specimen
  // gets to show both answers in one pass.
  part(root, 'reopen').addEventListener('click', () => {
    banner.dataset.view = 'notice';
    purposes.hidden = true;
    analytics.setAttribute('aria-checked', 'false');
    decide('none');
  });
}
