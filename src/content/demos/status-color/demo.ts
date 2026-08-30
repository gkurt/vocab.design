import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

/**
 * Four meanings, four values. They are stated literally for the same reason `.sp-swatch`
 * takes its paint from the demo: the kit keeps one accent and one warn colour on purpose,
 * and a palette that could only show kit tokens could not demonstrate a palette. Every fill
 * clears 4.5:1 against the white it carries, and the warning value is the kit's own
 * `--sp-warn` in its light form.
 */
const STATUSES = [
  { key: 'success', name: 'Success', fill: '#157F3C', mark: 'check', meaning: 'It worked. Nothing is left to do.' },
  { key: 'warning', name: 'Warning', fill: '#B45309', mark: 'alert', meaning: 'It worked, but something needs attention.' },
  { key: 'danger', name: 'Danger', fill: '#C2312B', mark: 'close', meaning: 'It failed, or it is about to destroy something.' },
  { key: 'info', name: 'Info', fill: '#2C5FD0', mark: 'bell', meaning: 'Worth knowing. Nothing has gone wrong.' },
] as const;

const START = 'success';

/**
 * Status colour specimen: the reserved set laid out as one row, each meaning carrying its
 * own colour, its own glyph and its own word, with a banner below repainting to whichever
 * one is chosen.
 *
 * The subject is the row, not a single badge. The term names the set rather than any one of
 * its members, and the row is the smallest thing here that holds all four. The banner is the
 * specimen showing what a chosen status does elsewhere and stays in the context register. It
 * reserves its height, so a longer meaning cannot move what is under it (SPEC §5).
 *
 * Three strings were the site arguing inside the panel and all three went. A header row read
 * "Reserved for outcome" and "Four meanings, four colours", which the four badges say for
 * themselves. Under the banner sat a red Publish button beside "Danger red on a safe action.
 * The palette now says danger where nothing is dangerous." The button existed only to be
 * argued about, so the sentence took it with it; the misuse is the article's to make.
 */
export function mount(root: HTMLElement): void {
  const badges = STATUSES.map(
    ({ key, name, fill, mark }) => `
      <button data-part="chip-${key}" data-status="${key}" type="button"
              style="flex: 1 1 0; display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 9px 4px;
                     border: 1px solid var(--sp-line); border-radius: 8px; background: ${fill}; color: #FFFFFF;
                     font: inherit; font-size: 12px; font-weight: 600; cursor: pointer">
        ${icon(mark)}${name}
      </button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row" data-part="row" data-subject style="gap: 8px">${badges}</div>

        <div class="sp-context" data-part="banner" data-status="${START}"
             style="display: flex; align-items: center; gap: 9px; margin-top: 12px; min-height: 60px; padding: 10px 12px;
                    border-radius: var(--sp-radius); background: var(--sp-sunken); border-left: 4px solid transparent">
          <span data-part="banner-mark" style="display: flex"></span>
          <span class="sp-text sp-text--ink sp-grow" data-part="banner-text">&nbsp;</span>
        </div>
      </div>
    </div>
  `;

  const banner = part(root, 'banner');
  const bannerMark = part(root, 'banner-mark');
  const bannerText = part(root, 'banner-text');
  const picks = STATUSES.map((status) => ({ status, el: part(root, `chip-${status.key}`) }));

  const report = (key: string) => {
    const status = STATUSES.find((s) => s.key === key);
    if (!status) return;
    banner.dataset.status = status.key;
    banner.style.borderLeftColor = status.fill;
    // Never colour alone (WCAG 1.4.1): the glyph and the sentence say it too.
    bannerMark.innerHTML = icon(status.mark);
    bannerMark.style.color = status.fill;
    bannerText.textContent = `${status.name}. ${status.meaning}`;
    for (const pick of picks) {
      const on = pick.status.key === key;
      flag(pick.el, 'data-selected', on);
      pick.el.style.boxShadow = on ? '0 0 0 2px var(--sp-surface), 0 0 0 4px var(--sp-ink)' : '';
    }
  };
  report(START);

  for (const pick of picks) pick.el.addEventListener('click', () => report(pick.status.key));
}
