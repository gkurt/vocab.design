import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

interface Emoji {
  char: string;
  key: string;
  words: string;
  cat: 'smileys' | 'nature' | 'food';
}

const ALL: Emoji[] = [
  { char: '😀', key: 'grin', words: 'grin happy smile', cat: 'smileys' },
  { char: '😂', key: 'joy', words: 'joy laugh cry', cat: 'smileys' },
  { char: '🙂', key: 'slight', words: 'slight smile fine', cat: 'smileys' },
  { char: '😍', key: 'love', words: 'love hearts adore', cat: 'smileys' },
  { char: '😎', key: 'cool', words: 'cool sunglasses', cat: 'smileys' },
  { char: '🤔', key: 'think', words: 'think hmm doubt', cat: 'smileys' },
  { char: '😅', key: 'sweat', words: 'sweat relief phew', cat: 'smileys' },
  { char: '🥳', key: 'party', words: 'party celebrate', cat: 'smileys' },
  { char: '😴', key: 'sleep', words: 'sleep tired zzz', cat: 'smileys' },
  { char: '👋', key: 'wave', words: 'wave hello hi bye', cat: 'smileys' },
  { char: '👍', key: 'thumbsup', words: 'thumbs up yes ok', cat: 'smileys' },
  { char: '👏', key: 'clap', words: 'clap applause', cat: 'smileys' },
  { char: '🙌', key: 'raised', words: 'raised hands praise', cat: 'smileys' },
  { char: '💪', key: 'muscle', words: 'muscle strong', cat: 'smileys' },
  { char: '🤝', key: 'shake', words: 'handshake deal', cat: 'smileys' },
  { char: '🎉', key: 'tada', words: 'tada party popper', cat: 'smileys' },
  { char: '🌊', key: 'ocean', words: 'ocean sea tide surf', cat: 'nature' },
  { char: '⭐', key: 'star', words: 'star night', cat: 'nature' },
  { char: '🔥', key: 'fire', words: 'fire hot flame', cat: 'nature' },
  { char: '🐙', key: 'octopus', words: 'octopus sea creature', cat: 'nature' },
  { char: '🌙', key: 'moon', words: 'moon night crescent', cat: 'nature' },
  { char: '🍃', key: 'leaf', words: 'leaf wind green', cat: 'nature' },
  { char: '☕', key: 'coffee', words: 'coffee tea hot drink', cat: 'food' },
  { char: '🍉', key: 'melon', words: 'melon fruit summer', cat: 'food' },
  { char: '🍞', key: 'bread', words: 'bread loaf bakery', cat: 'food' },
  { char: '🍜', key: 'noodles', words: 'noodles ramen bowl', cat: 'food' },
  { char: '🍰', key: 'cake', words: 'cake slice birthday', cat: 'food' },
  { char: '🍇', key: 'grapes', words: 'grapes fruit vine', cat: 'food' },
];

const RECENT = ['thumbsup', 'tada', 'slight', 'coffee', 'ocean', 'fire'];

const SECTIONS = [
  { key: 'recent', label: 'Recently used' },
  { key: 'smileys', label: 'Smileys and people' },
  { key: 'nature', label: 'Nature' },
  { key: 'food', label: 'Food and drink' },
] as const;

const BASE = 'Survey went well';

const tile = (e: Emoji) => `
  <button
    class="sp-icon-button"
    type="button"
    data-part="emoji-${e.key}"
    aria-label="${e.words.split(' ')[0]}"
    style="width: 100%; min-width: 0; height: 26px; font-size: 16px; line-height: 1"
  >${e.char}</button>`;

/**
 * Emoji picker specimen: the panel a composer opens, with its search field, its
 * category row, the recently used set it opens on, and a grid that filters as the
 * search is typed a character at a time.
 *
 * The subject is the picker panel, which is what the term names: not the composer that
 * opens it and not one glyph inside it. The thread and the composer are the scene.
 *
 * Picking never closes the panel, because people send more than one, so dismissal is
 * explicit: the close control (SPEC §8, and the article's own claim). Every other
 * control reaches a state too, the trigger always opens and a category chip always
 * selects its own section. The panel is a fixed size with the grid's rows reserved, so
 * filtering from twenty-eight glyphs to one moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const chips = SECTIONS.map(
    (s) => `
    <button class="sp-chip" type="button" data-part="cat-${s.key}" style="padding: 3px 7px; font-size: 11px">${s.key === 'recent' ? 'Recent' : s.label.split(' ')[0]}</button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-avatar">HS</span>
          <span class="sp-heading sp-grow">Harbour survey</span>
          <span class="sp-label">4 people</span>
        </div>
        <div class="sp-body" style="position: relative; display: flex; flex-direction: column; gap: 10px">
          <div class="sp-row sp-context" style="justify-content: flex-start">
            <span style="max-width: 70%; padding: 7px 11px; border-radius: 12px 12px 12px 4px; background: var(--sp-surface); border: 1px solid var(--sp-line); font-size: 13px">
              Low water at six, all measured.
            </span>
          </div>
          <div class="sp-row sp-context" style="justify-content: flex-end">
            <span style="max-width: 70%; padding: 7px 11px; border-radius: 12px 12px 4px 12px; background: var(--sp-accent); color: var(--sp-accent-ink); font-size: 13px">
              Nice, that was quick.
            </span>
          </div>

          <div class="sp-row sp-context" style="margin-top: auto; gap: 8px">
            <div
              class="sp-grow"
              data-part="composer"
              data-count="0"
              style="display: flex; align-items: center; min-height: 32px; padding: 5px 10px; background: var(--sp-surface);
                     border: 1px solid var(--sp-line); border-radius: 8px; font-size: 13px"
            >
              <span data-part="composer-text">${BASE}&nbsp;</span><span class="sp-caret"></span>
            </div>
            <button
              class="sp-icon-button"
              type="button"
              data-part="trigger"
              aria-label="Insert emoji"
              style="flex: 0 0 auto; font-size: 16px; line-height: 1"
            >🙂</button>
            <button class="sp-button sp-button--sm" type="button" style="flex: 0 0 auto">Send</button>
          </div>

          <div
            data-part="picker"
            data-subject
            role="dialog"
            aria-label="Emoji"
            style="position: absolute; right: 12px; bottom: 54px; width: 252px; padding: 8px; background: var(--sp-surface);
                   border: 1px solid var(--sp-line); border-radius: var(--sp-radius); box-shadow: var(--sp-shadow);
                   opacity: 0; visibility: hidden; transform: translateY(6px);
                   transition: opacity 0.18s, visibility 0.18s, transform 0.18s var(--sp-ease)"
          >
            <div class="sp-row" style="gap: 6px">
              <input class="sp-input" type="text" data-part="search" placeholder="Search emoji" style="height: 28px" />
              <button class="sp-icon-button" type="button" data-part="close" aria-label="Close" style="flex: 0 0 auto; width: 24px; height: 24px">${icon('close')}</button>
            </div>
            <div class="sp-row sp-row--wrap" style="gap: 4px; margin-top: 6px">${chips}</div>
            <div class="sp-label" data-part="section" style="margin-top: 6px">Recently used</div>
            <div
              class="sp-grid"
              data-part="grid"
              role="listbox"
              aria-label="Emoji"
              style="grid-template-columns: repeat(8, 1fr); gap: 4px; margin-top: 4px; height: 86px; align-content: start"
            ></div>
          </div>
        </div>
      </div>
    </div>
  `;

  const picker = part(root, 'picker');
  const grid = part(root, 'grid');
  const section = part(root, 'section');
  const search = part(root, 'search') as HTMLInputElement;
  const composer = part(root, 'composer');
  const text = part(root, 'composer-text');

  let picked = 0;

  const wire = () => {
    for (const el of grid.querySelectorAll<HTMLElement>('[data-part^="emoji-"]')) {
      el.addEventListener('click', () => {
        picked += 1;
        text.innerHTML = `${text.innerHTML}${el.textContent ?? ''}`;
        composer.dataset.count = String(picked);
      });
    }
  };

  const show = (list: Emoji[], label: string) => {
    section.textContent = label;
    grid.innerHTML = list.slice(0, 24).map(tile).join('');
    wire();
  };

  const openSection = (key: (typeof SECTIONS)[number]['key']) => {
    for (const s of SECTIONS) {
      const chip = part(root, `cat-${s.key}`);
      if (s.key === key) chip.setAttribute('data-selected', '');
      else chip.removeAttribute('data-selected');
    }
    const found = SECTIONS.find((s) => s.key === key) ?? SECTIONS[0];
    const recent = RECENT.map((k) => ALL.find((e) => e.key === k)).filter((e): e is Emoji => e !== undefined);
    show(key === 'recent' ? recent : ALL.filter((e) => e.cat === key), found.label);
  };

  for (const s of SECTIONS) {
    part(root, `cat-${s.key}`).addEventListener('click', () => {
      search.value = '';
      openSection(s.key);
    });
  }

  // One `input` event per keystroke is what the player sends and what a person makes,
  // so the grid is filtered on every character rather than on a committed string.
  search.addEventListener('input', () => {
    const query = search.value.trim().toLowerCase();
    if (query === '') return openSection('recent');
    for (const s of SECTIONS) part(root, `cat-${s.key}`).removeAttribute('data-selected');
    show(
      ALL.filter((e) => e.words.includes(query) || e.key.includes(query)),
      `Results for “${query}”`,
    );
  });

  const setOpen = (open: boolean) => {
    picker.style.opacity = open ? '1' : '0';
    picker.style.visibility = open ? 'visible' : 'hidden';
    picker.style.transform = open ? 'translateY(0)' : 'translateY(6px)';
  };

  part(root, 'trigger').addEventListener('click', () => setOpen(true));
  part(root, 'close').addEventListener('click', () => setOpen(false));

  openSection('recent');
  setOpen(false);
}
