import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

/**
 * Light dismiss specimen: a share popover that goes away when the reader looks
 * elsewhere. The subject is the popover, since the term names the way this
 * surface closes rather than the button that opened it, and the surface is the
 * thing that has to answer both an outside press and Escape.
 *
 * The trigger opens and only opens (SPEC §8): dismissal is the outside press or
 * the key, which is the whole demonstration. The readout beside it names which
 * of the two closed it last, so the two paths are told apart on screen.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="height: 240px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Q3 report</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="trigger" aria-expanded="false">Share</button>
        </div>
        <div class="sp-body sp-context" data-part="page">
          <div class="sp-stack">
            <div class="sp-line" style="width: 92%"></div>
            <div class="sp-line" style="width: 74%"></div>
            <div class="sp-line" style="width: 84%"></div>
            <div class="sp-line" style="width: 61%"></div>
          </div>
          <div class="sp-row sp-row--between" style="margin-top: 22px">
            <span class="sp-label">Closed by</span>
            <span class="sp-text sp-text--ink" data-part="reason" style="width: 118px; text-align: right">nothing yet</span>
          </div>
        </div>
        <div class="sp-popover" data-part="popover" data-subject role="dialog" aria-label="Share" style="top: 46px; right: 12px; width: 190px; --sp-arrow-x: 150px">
          <span class="sp-label">Anyone with the link</span>
          <div class="sp-stack" style="margin-top: 10px">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button">${icon('copy')} Copy link</button>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button">${icon('share')} Send by email</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const popover = part(root, 'popover');
  const trigger = part(root, 'trigger');
  const reason = part(root, 'reason');

  const setOpen = (open: boolean) => {
    flag(popover, 'data-open', open);
    trigger.setAttribute('aria-expanded', String(open));
  };

  const dismiss = (by: string) => {
    if (!popover.hasAttribute('data-open')) return;
    reason.textContent = by;
    setOpen(false);
  };

  trigger.addEventListener('click', () => setOpen(true));

  // pointerdown, not click: a drag that begins inside the surface and ends outside
  // it is not an outside press, and click would read it as one.
  root.addEventListener('pointerdown', (event) => {
    if (popover.contains(event.target as Node) || trigger.contains(event.target as Node)) return;
    dismiss('outside click');
  });

  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') dismiss('Escape');
  });
}
