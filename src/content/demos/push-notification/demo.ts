import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

const NOTICES = [
  { title: 'Gate closed on Ridge Path', body: 'Take the west approach instead', top: 92 },
  { title: 'Survey window opens Friday', body: 'Three sections still need a walker', top: 158 },
];

const tile = (size: number, radius: number) => `display: flex; align-items: center; justify-content: center; flex: 0 0 auto;
  width: ${size}px; height: ${size}px; border-radius: ${radius}px; background: rgb(255 255 255 / 0.92); color: #24355e`;

const card = (index: number, title: string, body: string, top: number) => `
  <div
    class="sp-glass sp-row"
    data-part="notice-${index + 1}"
    ${index === 0 ? 'data-subject' : ''}
    role="status"
    style="position: absolute; left: 10px; right: 10px; top: ${top}px; gap: 9px; padding: 8px 10px;
           align-items: flex-start; opacity: 0; visibility: hidden; transform: translateY(-14px);
           transition: opacity 0.26s var(--sp-ease), transform 0.26s var(--sp-ease), visibility 0.26s"
  >
    <span aria-hidden="true" style="${tile(22, 7)}">${icon('bell')}</span>
    <span class="sp-grow" style="min-width: 0">
      <span style="display: block; font-size: 10px; letter-spacing: 0.05em; opacity: 0.85">RIDGE TRAILS</span>
      <span style="display: block; font-size: 12px; font-weight: 600; line-height: 1.3; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">${title}</span>
      <span style="display: block; font-size: 11px; line-height: 1.3; opacity: 0.9; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">${body}</span>
    </span>
    <button
      class="sp-icon-button"
      type="button"
      data-part="dismiss-${index + 1}"
      aria-label="Dismiss ${title}"
      style="width: 20px; height: 20px; flex: 0 0 auto; color: inherit"
    >${icon('close')}</button>
  </div>`;

/**
 * Push notification specimen: a locked phone the app is not running on, receiving
 * messages the system draws for it and keeping the count on the icon.
 *
 * The subject is the first notification card. Not the phone (that is the platform,
 * not the term), and not the pair (two cards are two notifications). The second card
 * is a sibling instance rather than scenery, so it keeps its own paint; the clock, the
 * dock and the panel of instrumentation beside the phone are the scene.
 *
 * The cards are placed at fixed positions and fade in where they will sit, so a second
 * arrival never moves the first (SPEC §5). Title and body each hold one line and truncate
 * with an ellipsis the way the platform's own cards do, which is what keeps a card at the
 * height its slot reserved instead of growing down over the one below it. Their motion
 * is a CSS transition rather than a scripted one, which is what puts it under the kit's
 * reduced-motion rule for free. The badge keeps a literal red because that is the platform's own spelling of a
 * count nobody has read yet, and the kit reserves its one second hue for measurement.
 *
 * Deliver hands over the next undelivered message rather than toggling anything, so a
 * pass picked up half way through still ends with both on screen (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-row" style="gap: 18px; align-items: center">
        <div
          data-part="phone"
          style="position: relative; flex: 0 0 auto; width: 172px; height: 292px;
                 border: 1px solid var(--sp-line); border-radius: 26px; overflow: hidden"
        >
          <div class="sp-aurora" style="--sp-aurora-wash: linear-gradient(155deg, #24355e, #5b4a86 52%, #a8697e)"></div>
          <div class="sp-context" style="position: absolute; left: 0; right: 0; top: 20px; text-align: center; color: #ffffff">
            <span style="display: block; font-size: 30px; font-weight: 600; line-height: 1.1">9:41</span>
            <span style="display: block; font-size: 11px; opacity: 0.85">Tuesday 14 April</span>
          </div>
          ${NOTICES.map((n, i) => card(i, n.title, n.body, n.top)).join('')}
          <div class="sp-row sp-context" style="position: absolute; left: 0; right: 0; bottom: 16px; justify-content: center; gap: 16px">
            <span style="position: relative; display: block">
              <span aria-hidden="true" style="${tile(42, 12)}">${icon('bell')}</span>
              <span
                data-part="badge"
                data-count="0"
                aria-label="0 unread"
                hidden
                style="position: absolute; top: -5px; right: -5px; display: flex; align-items: center; justify-content: center;
                       min-width: 18px; height: 18px; padding: 0 5px; border-radius: 999px;
                       background: #e5484d; color: #ffffff; font-size: 11px; font-weight: 600"
              >0</span>
            </span>
            <span aria-hidden="true" style="display: block; width: 42px; height: 42px; border-radius: 12px; background: rgb(255 255 255 / 0.34)"></span>
          </div>
        </div>

        <div class="sp-stack sp-context" style="width: 152px; gap: 8px">
          <span class="sp-label">The app is not running</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="deliver">Deliver</button>
          <p class="sp-text" style="margin: 0; font-size: 12px">A server sends it, the system draws it, and the icon keeps the count.</p>
        </div>
      </div>
    </div>
  `;

  const badge = part(root, 'badge');
  const notices = NOTICES.map((_, index) => ({
    el: part(root, `notice-${index + 1}`),
    dismiss: part(root, `dismiss-${index + 1}`),
    shown: false,
  }));

  const paintBadge = () => {
    const count = notices.filter((notice) => notice.shown).length;
    badge.textContent = String(count);
    badge.dataset.count = String(count);
    badge.setAttribute('aria-label', `${count} unread`);
    badge.hidden = count === 0;
  };

  const setShown = (notice: (typeof notices)[number], on: boolean) => {
    notice.shown = on;
    notice.el.style.opacity = on ? '1' : '0';
    notice.el.style.visibility = on ? 'visible' : 'hidden';
    notice.el.style.transform = on ? 'translateY(0)' : 'translateY(-14px)';
    paintBadge();
  };

  part(root, 'deliver').addEventListener('click', () => {
    const next = notices.find((notice) => !notice.shown);
    if (!next) return;
    setShown(next, true);
  });

  for (const notice of notices) notice.dismiss.addEventListener('click', () => setShown(notice, false));

  paintBadge();
}
