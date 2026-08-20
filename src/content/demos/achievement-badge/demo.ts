import { type IconName, icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

interface Award {
  key: string;
  name: string;
  glyph: IconName;
  earned: boolean;
}

const AWARDS: Award[] = [
  { key: 'first', name: 'First recipe', glyph: 'check', earned: true },
  { key: 'saves', name: 'Ten saved', glyph: 'heart', earned: true },
  { key: 'night', name: 'Night owl', glyph: 'eye', earned: true },
  { key: 'weeks', name: 'Five weeks', glyph: 'calendar', earned: false },
  { key: 'batch', name: 'Big batch', glyph: 'inbox', earned: false },
  { key: 'mentor', name: 'Ten answers', glyph: 'share', earned: false },
];

const EARNED = { background: 'var(--sp-accent-soft)', border: '1px solid var(--sp-accent)', color: 'var(--sp-accent)' };
const LOCKED = { background: 'var(--sp-sunken)', border: '1px dashed var(--sp-line)', color: 'var(--sp-muted)' };

function paint(el: HTMLElement, look: typeof EARNED): void {
  el.style.background = look.background;
  el.style.border = look.border;
  el.style.color = look.color;
}

/**
 * Achievement badge specimen: a profile's set of six awards, three earned, three still
 * locked and named, with the milestone one filling in when the fifth week is logged. Both
 * halves of the pattern stay on screen, which is the point of showing the locked ones.
 *
 * The subject is the badge that gets awarded, the narrowest element the term names: the
 * marker itself rather than the tile, the grid or the profile (SPEC §5). It is honest in
 * both states, since a locked achievement badge is still an achievement badge, so no pose
 * is needed. The profile row and the milestone button are scenery in the context register.
 * The grid itself is not dimmed: earned against locked is the term's own picture, and
 * draining the accent out of the earned markers would erase it.
 *
 * Every tile carries a status line at mount, so the awarded badge changes words in place
 * and nothing below it moves (SPEC §5). The milestone can only be logged once, so the
 * scripted click reaches a state rather than flipping one (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const tile = (award: Award) => `
    <div class="sp-stack" data-part="tile-${award.key}" style="align-items: center; gap: 4px; text-align: center">
      <span
        data-part="medal-${award.key}"
        data-state="${award.earned ? 'earned' : 'locked'}"
        ${award.key === 'weeks' ? 'data-subject' : ''}
        style="flex: 0 0 auto; display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; transition: background-color 0.24s var(--sp-ease), border-color 0.24s var(--sp-ease), color 0.24s var(--sp-ease)"
      >${icon(award.glyph)}</span>
      <span class="sp-text sp-text--ink" style="flex: 0 0 auto; height: 14px; font-size: 10.5px; line-height: 14px; white-space: nowrap">${award.name}</span>
      <span class="sp-text" data-part="status-${award.key}" style="flex: 0 0 auto; height: 13px; font-size: 10px; line-height: 13px">${award.earned ? 'Earned' : 'Locked'}</span>
    </div>
  `;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 460px; height: 292px">
        <div class="sp-topbar sp-context" style="padding: 8px 12px">
          <span class="sp-avatar" style="flex: 0 0 auto; width: 26px; height: 26px; font-size: 11px">DR</span>
          <span class="sp-grow" style="min-width: 0">
            <span class="sp-heading" style="display: block; font-size: 12.5px; line-height: 15px">Dana Ruiz</span>
            <span class="sp-label" style="display: block; font-size: 10px; line-height: 12px">Cooking since 2024</span>
          </span>
          <span class="sp-chip" data-part="count" data-earned="3" style="flex: 0 0 auto; padding: 2px 9px; font-size: 10.5px; cursor: default; white-space: nowrap">3 of 6 earned</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; gap: 9px">
          <div class="sp-surface" style="flex: 0 0 auto; padding: 12px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px">
            ${AWARDS.map(tile).join('')}
          </div>

          <div class="sp-row sp-context" style="flex: 0 0 auto; gap: 9px">
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="advance" type="button" style="flex: 0 0 auto; padding: 4px 9px; font-size: 11px; white-space: nowrap">Log a fifth week</button>
            <span class="sp-text" data-part="note" style="flex: 1 1 auto; font-size: 10.5px; line-height: 1.3">The fifth week is the milestone the dashed marker is waiting for.</span>
          </div>
        </div>
      </div>
    </div>
  `;

  for (const award of AWARDS) paint(part(root, `medal-${award.key}`), award.earned ? EARNED : LOCKED);

  const medal = part(root, 'medal-weeks');
  const status = part(root, 'status-weeks');
  const count = part(root, 'count');
  const advance = part(root, 'advance');
  const note = part(root, 'note');

  advance.addEventListener('click', () => {
    if (medal.dataset.state === 'earned') return;
    medal.dataset.state = 'earned';
    paint(medal, EARNED);
    status.textContent = 'Earned just now';
    count.dataset.earned = '4';
    count.textContent = '4 of 6 earned';
    advance.textContent = 'Fifth week logged';
    advance.setAttribute('aria-disabled', 'true');
    note.textContent = 'Awarded, dated, and not the kind of marker that goes away when the streak does.';
  });
}
