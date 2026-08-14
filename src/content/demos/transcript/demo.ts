import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

type Entry = { key: string; at: string; seconds: number; speaker: string; line: string };

/** A descriptive transcript: dialogue and the sounds that carried meaning, in one document. */
const ENTRIES: Entry[] = [
  { key: '1', at: '0:04', seconds: 4, speaker: 'MARA', line: 'You kept it, all this time.' },
  { key: '2', at: '0:11', seconds: 11, speaker: 'JUN', line: 'I kept all of them. The kettle is on.' },
  { key: '3', at: '0:18', seconds: 18, speaker: '', line: '[kettle clicks off]' },
  { key: '4', at: '0:24', seconds: 24, speaker: 'MARA', line: 'Then read this one first.' },
];

const RUNTIME = 32;
const HIT = 'var(--sp-accent-soft)';

/**
 * Transcript specimen: the whole of a short scene as text, beside the player it came from.
 * Each passage carries its speaker and the time it starts, the timestamps move the player,
 * and the search field finds a word in a way the audio could never be searched.
 *
 * The subject is the transcript panel, the narrowest element the term names. The player,
 * the search field and the hit count are scenery (SPEC §5): a transcript is a document,
 * and the things that read it are not part of it.
 *
 * Nothing is filtered out by a search, so the panel never re-lays itself: matches take a
 * tint and everything else keeps its place (SPEC §5). Passages are marked as hits from the
 * text they actually carry, so the count cannot claim a match the document does not hold.
 */
export function mount(root: HTMLElement): void {
  const row = (e: Entry) => `
    <li class="sp-row" data-part="entry-${e.key}" data-at="${e.at}"
        style="gap: 8px; align-items: baseline; padding: 5px 6px; border-radius: 5px">
      <button class="sp-button sp-button--quiet sp-button--sm" type="button" data-part="time-${e.key}"
              style="flex: 0 0 auto; padding: 1px 5px; font-size: 11px; color: var(--sp-accent)">${e.at}</button>
      <span class="sp-text sp-text--ink" data-part="text-${e.key}" style="font-size: 12px; line-height: 1.4">
        ${e.speaker ? `<b style="font-weight: 600">${e.speaker}:</b> ` : ''}${e.line}
      </span>
    </li>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-context" data-part="player" style="gap: 10px">
          <div style="flex: 0 0 auto; width: 84px; height: 48px; border-radius: 5px;
                      background: linear-gradient(160deg, #2b3550 0%, #465a7d 62%, #6d7f9c 100%)"></div>
          <div class="sp-grow">
            <span class="sp-label" style="display: block">Kitchen scene, 0:32</span>
            <div class="sp-progress" data-part="progress" style="margin-top: 6px; --sp-value: 0%">
              <div class="sp-progress-fill"></div>
            </div>
          </div>
          <span class="sp-text sp-text--ink" data-part="clock" data-at="0:00"
                style="flex: 0 0 auto; font-size: 12px; font-variant-numeric: tabular-nums">0:00</span>
        </div>

        <div class="sp-surface" data-part="panel" data-subject style="margin-top: 10px; padding: 6px 6px 8px">
          <span class="sp-label" style="display: block; padding: 2px 6px 4px">Transcript</span>
          <ul class="sp-list" data-part="passages" style="gap: 2px">
            ${ENTRIES.map(row).join('')}
          </ul>
        </div>

        <div class="sp-row sp-context" style="margin-top: 10px; gap: 8px">
          <div class="sp-row sp-grow sp-surface" style="gap: 6px; padding: 0 8px">
            ${icon('search')}
            <input class="sp-input" type="text" data-part="search" spellcheck="false" aria-label="Search the transcript"
                   placeholder="Search the transcript" style="border: 0; background: transparent; padding-left: 0" />
          </div>
          <span class="sp-text sp-text--ink" data-part="hits" data-count="0"
                style="flex: 0 0 96px; text-align: right; font-size: 11px; white-space: nowrap">Nothing searched</span>
        </div>
      </div>
    </div>
  `;

  const clock = part(root, 'clock');
  const progress = part(root, 'progress');
  const search = part(root, 'search') as HTMLInputElement;
  const hits = part(root, 'hits');
  const rows = ENTRIES.map((e) => ({ entry: e, el: part(root, `entry-${e.key}`) }));

  const seek = (e: Entry) => {
    clock.dataset.at = e.at;
    clock.textContent = e.at;
    progress.style.setProperty('--sp-value', `${(e.seconds / RUNTIME) * 100}%`);
    for (const row of rows) {
      const current = row.entry === e;
      if (current) row.el.dataset.current = '';
      else delete row.el.dataset.current;
      // An inset rule, so the passage the player is on is marked without moving it.
      row.el.style.boxShadow = current ? 'inset 2px 0 0 var(--sp-accent)' : '';
    }
  };

  for (const { entry } of rows) part(root, `time-${entry.key}`).addEventListener('click', () => seek(entry));

  // Searched against the passage's own words, so a hit is a hit in the document itself.
  search.addEventListener('input', () => {
    const query = search.value.trim().toLowerCase();
    let found = 0;
    for (const row of rows) {
      const text = `${row.entry.speaker} ${row.entry.line}`.toLowerCase();
      const hit = query.length > 0 && text.includes(query);
      if (hit) {
        found += 1;
        row.el.dataset.hit = '';
        row.el.style.background = HIT;
      } else {
        delete row.el.dataset.hit;
        row.el.style.background = '';
      }
    }
    hits.dataset.count = String(found);
    hits.textContent = query.length === 0 ? 'Nothing searched' : `${found} passage${found === 1 ? '' : 's'}`;
  });
}
