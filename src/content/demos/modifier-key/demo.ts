import { flag, part } from '#src/kit/parts.ts';

const FILES = [
  { key: 'brief', name: 'campaign-brief.md', size: '4 KB' },
  { key: 'notes', name: 'kickoff-notes.md', size: '11 KB' },
  { key: 'budget', name: 'budget-q3.csv', size: '38 KB' },
  { key: 'deck', name: 'launch-deck.key', size: '6.2 MB' },
  { key: 'photo', name: 'hero-shot.png', size: '2.4 MB' },
];

const START = 'brief';

/**
 * Modifier key specimen: a file list where a plain click replaces the selection and a
 * click with the pick modifier held adds to it. The subject is the list, since the term
 * is about what the held key does to a click that lands there; the legend and the
 * readouts are the apparatus around it. The legend once carried a second chip, Shift
 * labelled "extend a range", for a behaviour this demo never implemented; a hint for a
 * key that does nothing here is a claim the specimen cannot keep, so it went, and the
 * one chip left is the key the list really answers. Its caption read "add one", the site
 * telling the reader what to do with the key; it names the command the key carries now, the
 * way a shortcut legend does.
 *
 * One wiring answers everything: the demo reads `ctrlKey` and `metaKey` off the click
 * (both, rather than picking a platform), the script performs the held key with a
 * `withKey` scope (SPEC §8), and a reader who takes over holds the real key. The legend
 * chip lights from the same keydown/keyup either way, so the held key is visible while
 * it is down, scripted or real.
 *
 * Selection paint is a background, so a row joining or leaving the set moves nothing
 * (SPEC §5), and the counts hold their widths. The readout is one nowrap line cut for the
 * longest verdict it can reach (the longest filename, dropped), since a second line there
 * would push the topbar down onto the list the term is about.
 */
export function mount(root: HTMLElement): void {
  const rows = FILES.map(
    ({ key, name, size }) => `
      <li
        class="sp-list-item"
        data-part="row-${key}"
        data-key="${key}"
        ${key === START ? 'data-selected' : ''}
        role="option"
        aria-selected="${key === START}"
        style="height: 30px; padding: 0 10px; cursor: default"
      >
        <span aria-hidden="true" style="flex: 0 0 auto; width: 13px; height: 16px; border-radius: 2px; background: var(--sp-line)"></span>
        <span class="sp-grow" style="min-width: 0">${name}</span>
        <span class="sp-label">${size}</span>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 252px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Assets</span>
          <span class="sp-text" data-part="readout" data-mode="start" style="width: 270px; text-align: right; white-space: nowrap">One row selected</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <ul
            class="sp-list sp-surface"
            data-part="list"
            data-subject
            data-count="1"
            role="listbox"
            aria-multiselectable="true"
            aria-label="Assets"
            style="padding: 2px"
          >${rows}</ul>
          <div class="sp-row sp-row--between sp-context">
            <span class="sp-row" style="gap: 6px">
              <span class="sp-kbd" data-part="key-pick">Ctrl or Cmd</span>
              <span class="sp-label">Add to selection</span>
            </span>
            <span class="sp-label" data-part="count" style="width: 96px; text-align: right">1 of 5 selected</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const list = part(root, 'list');
  const readout = part(root, 'readout');
  const count = part(root, 'count');
  const pickKey = part(root, 'key-pick');

  const chosen = new Set([START]);

  const draw = () => {
    for (const { key } of FILES) {
      const row = part(root, `row-${key}`);
      flag(row, 'data-selected', chosen.has(key));
      row.setAttribute('aria-selected', String(chosen.has(key)));
    }
    list.dataset.count = String(chosen.size);
    count.textContent = `${chosen.size} of ${FILES.length} selected`;
  };

  const say = (kind: string, text: string) => {
    readout.dataset.mode = kind;
    readout.textContent = text;
  };

  for (const { key, name } of FILES) {
    part(root, `row-${key}`).addEventListener('click', (event) => {
      // Ctrl and Cmd read together, so the desktop this borrows from can be either.
      const additive = event.ctrlKey || event.metaKey;
      if (!additive) {
        chosen.clear();
        chosen.add(key);
        say('replace', `Plain click: ${name} only`);
      } else if (chosen.has(key)) {
        chosen.delete(key);
        say('add', `Modified click: ${name} dropped`);
      } else {
        chosen.add(key);
        say('add', `Modified click: ${name} added`);
      }
      draw();
    });
  }

  // A held key is invisible, so the legend answers the real one: the chip lights while
  // the key is down and goes out when it is released.
  const lightKey = (on: boolean) => {
    pickKey.style.borderColor = on ? 'var(--sp-accent)' : '';
    pickKey.style.color = on ? 'var(--sp-ink)' : '';
    flag(pickKey, 'data-held', on);
  };

  root.addEventListener('keydown', (event) => {
    if (event.key === 'Control' || event.key === 'Meta') lightKey(true);
  });
  root.addEventListener('keyup', (event) => {
    if (event.key === 'Control' || event.key === 'Meta') lightKey(false);
  });

  draw();
}
