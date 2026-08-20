import { part } from '#src/kit/parts.ts';

type Scope = 'none' | 'page' | 'all';

const ROWS = [
  { id: 1, from: 'Harbour office', subject: 'Berth renewal paperwork' },
  { id: 2, from: 'Ines Duarte', subject: 'Chart corrections, week 14' },
  { id: 3, from: 'Chandlery', subject: 'Order 4471 has shipped' },
  { id: 4, from: 'Tide desk', subject: 'Spring tides, April' },
  { id: 5, from: 'Ferry ops', subject: 'Crew rota, next fortnight' },
] as const;

const MATCHING = '1,204';

/**
 * Select all across pages specimen: the header checkbox takes the five rows on screen,
 * and the banner that appears says so and offers the wider scope as a second, separate
 * act. Taking that offer changes the banner rather than the rows, because a selection
 * reaching past the viewport has no other way to show its size.
 *
 * The subject is the banner: the term names the offer to extend, not the table under it
 * and not the checkbox that started the sequence. The table, the topbar, and the caption
 * are scenery (SPEC §5).
 *
 * The banner's row is reserved at mount, so revealing it moves no row (SPEC §5), and
 * every control reaches an absolute scope rather than flipping the one it finds
 * (SPEC §8): the header box reaches the page, the offer reaches everything matching,
 * and Clear is the explicit dismissal.
 */
export function mount(root: HTMLElement): void {
  const rows = ROWS.map(
    ({ id, from, subject }) => `
      <tr data-part="row-${id}">
        <td style="width: 34px"><button class="sp-checkbox" data-part="cb-${id}" type="button" role="checkbox" aria-checked="false" aria-label="Select mail from ${from}"></button></td>
        <td class="sp-text--ink" style="width: 124px">${from}</td>
        <td class="sp-text--ink">${subject}</td>
      </tr>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 272px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Mail: label "harbour"</span><span class="sp-text">${MATCHING} matching</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 0; padding: 0">
          <div style="position: relative; flex: 0 0 auto; height: 33px; border-bottom: 1px solid var(--sp-line)">
            <div
              class="sp-row"
              data-part="banner"
              data-subject
              data-scope="none"
              role="status"
              style="position: absolute; inset: 0; gap: 8px; padding: 0 10px; background: var(--sp-accent-soft); visibility: hidden; opacity: 0; transition: opacity 0.16s, visibility 0.16s"
            >
              <span class="sp-text sp-text--ink" data-part="banner-text" style="font-size: 12px; white-space: nowrap">All 5 on this page are selected.</span>
              <button class="sp-button sp-button--quiet sp-button--sm" data-part="extend" type="button" style="flex: 0 0 auto; white-space: nowrap; text-decoration: underline">Select all ${MATCHING} matching</button>
              <button class="sp-button sp-button--quiet sp-button--sm" data-part="clear" type="button" hidden style="flex: 0 0 auto; white-space: nowrap; text-decoration: underline">Clear selection</button>
            </div>
          </div>
          <div class="sp-scroll sp-context" style="flex: 1 1 auto; min-height: 0; background: var(--sp-surface)">
            <table class="sp-table" style="--sp-cell-pad: 6px 10px">
              <thead>
                <tr>
                  <th style="width: 34px"><button class="sp-checkbox" data-part="cb-all" type="button" role="checkbox" aria-checked="false" aria-label="Select everything on this page"></button></th>
                  <th style="width: 124px">From</th>
                  <th>Subject</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="sp-context" data-part="caption" style="width: 440px; height: 16px; color: var(--sp-muted); font-size: 11px">The box takes the page. Everything past it has to be asked for.</div>
    </div>
  `;

  const banner = part(root, 'banner');
  const bannerText = part(root, 'banner-text');
  const extend = part(root, 'extend');
  const clear = part(root, 'clear');
  const all = part(root, 'cb-all');

  const paint = (scope: Scope) => {
    banner.dataset.scope = scope;
    const held = scope !== 'none';
    for (const { id } of ROWS) part(root, `cb-${id}`).setAttribute('aria-checked', String(held));
    for (const { id } of ROWS) {
      if (held) part(root, `row-${id}`).setAttribute('data-selected', '');
      else part(root, `row-${id}`).removeAttribute('data-selected');
    }
    all.setAttribute('aria-checked', String(held));
    bannerText.textContent =
      scope === 'all' ? `All ${MATCHING} conversations matching this label are selected.` : 'All 5 on this page are selected.';
    extend.hidden = scope !== 'page';
    clear.hidden = scope !== 'all';
    banner.style.visibility = held ? 'visible' : 'hidden';
    banner.style.opacity = held ? '1' : '0';
  };

  all.addEventListener('click', () => paint('page'));
  extend.addEventListener('click', () => paint('all'));
  clear.addEventListener('click', () => paint('none'));
}
