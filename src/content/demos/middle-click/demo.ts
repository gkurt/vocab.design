import { flag, part } from '#src/kit/parts.ts';

const LINKS = [
  { key: 'ferry', title: 'Ferry timetable, winter', tab: 'Ferry timetable' },
  { key: 'tides', title: 'Tide tables for the harbour', tab: 'Tide tables' },
  { key: 'parking', title: 'Harbour parking permits', tab: 'Parking permits' },
];

/** The one the term is demonstrated on, so the identify pin has a row above and below it. */
const SUBJECT = 'tides';

const TAB_STYLE = [
  'display: flex',
  'align-items: center',
  'flex: 0 0 auto',
  'width: 118px',
  'height: 26px',
  'padding: 0 8px',
  'border-radius: 6px 6px 0 0',
  'font-size: 11px',
  'white-space: nowrap',
  'overflow: hidden',
  'text-overflow: ellipsis',
  'cursor: pointer',
].join('; ');

const tabMarkup = (key: string, label: string, active: boolean) => `
  <span
    data-part="tab-${key}"
    ${active ? 'data-active' : ''}
    style="${TAB_STYLE}; background: ${active ? 'var(--sp-surface)' : 'transparent'}; color: var(--sp-${active ? 'ink' : 'muted'}); box-shadow: ${
      active ? 'inset 0 -2px 0 0 var(--sp-accent)' : 'none'
    }"
  >${label}</span>`;

/**
 * Middle click specimen: a results page where the wheel press opens a link in a background
 * tab and closes a tab, against the primary press that replaces the page you were reading.
 * The subject is the middle link, because the term names a press and a press belongs to the
 * thing being pressed, the same call the secondary click specimen makes. The tab strip, the
 * readout, and the legend are scenery.
 *
 * The player dispatches a real `auxclick` with `button` 1 for a `middleClick` step (SPEC §8),
 * so nothing here is mimed: one handler answers the script and a reader who takes the stage
 * over with an actual wheel. The rows are anchors, since the browser's own middle-click
 * behaviour belongs to a link and never to a div with a click handler, and the demo cancels
 * the middle `mousedown` for the same reason a real page has to, which is that the browser
 * would otherwise start autoscrolling over the specimen.
 *
 * Opening is keyed by link rather than counted, so a resumed pass reaches one tab per link
 * instead of stacking duplicates (SPEC §8), and every row reserves the width of its own mark,
 * so a verdict landing on a row moves no text (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const rows = LINKS.map(
    ({ key, title }) => `
      <a
        class="sp-surface"
        data-part="link-${key}"
        data-link="${key}"
        ${key === SUBJECT ? 'data-subject' : ''}
        role="link"
        tabindex="0"
        style="display: flex; align-items: center; gap: 10px; height: 36px; padding: 0 10px; cursor: pointer; text-decoration: none"
      >
        <span class="sp-grow" style="min-width: 0; color: var(--sp-accent); font-size: 13px">${title}</span>
        <span class="sp-label" data-part="mark-${key}" style="width: 116px; text-align: right"></span>
      </a>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context" style="align-items: flex-end; gap: 2px; padding: 10px 10px 0">
          <span class="sp-row" data-part="tabs" style="gap: 2px">${tabMarkup('results', 'Harbour search', true)}</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-stack" style="gap: 6px">${rows}</div>
          <span
            class="sp-text sp-text--ink"
            data-part="readout"
            data-mode="idle"
            style="min-height: 34px; font-size: 12px"
          >Three results. The primary press and the wheel press do different things to them.</span>
          <span class="sp-label sp-context" style="font-size: 11px; line-height: 1.4">Three jobs, one button: a background tab, closing a tab, and autoscroll.</span>
        </div>
      </div>
    </div>
  `;

  const tabs = part(root, 'tabs');
  const active = part(root, 'tab-results');
  const readout = part(root, 'readout');

  const say = (mode: string, text: string) => {
    readout.dataset.mode = mode;
    readout.textContent = text;
  };

  const mark = (key: string, text: string) => {
    part(root, `mark-${key}`).textContent = text;
  };

  const closeTab = (key: string) => {
    const tab = tabs.querySelector(`[data-part="tab-${key}"]`);
    if (!tab) return;
    tab.remove();
    flag(part(root, `link-${key}`), 'data-opened', false);
    mark(key, '');
  };

  /** Reached, not counted: a link owns at most one background tab, however often it is pressed. */
  const openTab = (key: string, label: string) => {
    if (tabs.querySelector(`[data-part="tab-${key}"]`)) return;
    tabs.insertAdjacentHTML('beforeend', tabMarkup(key, label, false));
  };

  for (const { key, title, tab } of LINKS) {
    const row = part(root, `link-${key}`);

    row.addEventListener('click', () => {
      active.textContent = tab;
      flag(active, 'data-navigated', true);
      for (const other of LINKS) mark(other.key, other.key === key ? 'opened here' : '');
      say('here', `Primary press: ${title} replaced the page you were reading.`);
    });

    row.addEventListener('auxclick', (event) => {
      if ((event as MouseEvent).button !== 1) return;
      event.preventDefault();
      openTab(key, tab);
      flag(row, 'data-opened', true);
      mark(key, 'background tab');
      say('background', `Wheel press: ${tab} opened behind, and you kept your place.`);
    });
  }

  // The wheel press on a tab is the second job, and the window keeps its last tab.
  tabs.addEventListener('auxclick', (event) => {
    if ((event as MouseEvent).button !== 1) return;
    event.preventDefault();
    const tab = (event.target as HTMLElement).closest<HTMLElement>('[data-part^="tab-"]');
    if (!tab) return;
    if (tab === active) return say('kept', 'Wheel press on the last tab: the window keeps it.');
    const key = tab.dataset.part?.slice(4) ?? '';
    closeTab(key);
    say('closed', 'Wheel press on a tab: closed, without aiming at a small target.');
  });

  // A real middle press starts the browser's own autoscroll unless the press is cancelled,
  // which would leave the reader scrolling the page over the top of the specimen.
  root.addEventListener('mousedown', (event) => {
    if (event.button === 1) event.preventDefault();
  });
}
