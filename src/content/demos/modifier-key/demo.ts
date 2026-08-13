import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

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
 * is about what the held key does to a click that lands there; the legend, the readouts,
 * and the simulated modifier are the apparatus around it.
 *
 * Synthesized clicks carry no modifiers (SPEC §7–8), so the scripted pass arms the
 * modifier through a labelled control with two absolute states. The real key is wired all
 * the same: a reader who takes the stage over and holds Ctrl or Cmd while clicking gets
 * the additive behaviour whatever that control says, which is also why the demo reads
 * `metaKey` and `ctrlKey` together rather than picking a platform.
 *
 * Selection paint is a background, so a row joining or leaving the set moves nothing
 * (SPEC §5), and the counts hold their widths.
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
          <span class="sp-text" data-part="readout" data-mode="start" style="width: 210px; text-align: right">One row selected</span>
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
              <span class="sp-label">add one</span>
              <span class="sp-kbd" style="margin-left: 6px">Shift</span>
              <span class="sp-label">extend a range</span>
            </span>
            <span class="sp-label" data-part="count" style="width: 96px; text-align: right">1 of 5 selected</span>
          </div>
        </div>
      </div>
      <div class="sp-row sp-context" style="gap: 8px">
        <span class="sp-label">Simulated modifier</span>
        <sp-segmented class="sp-segmented" data-part="mode" data-value="plain">
          <button class="sp-segment" data-part="mode-plain" value="plain">Plain click</button>
          <button class="sp-segment" data-part="mode-ctrl" value="ctrl">Ctrl held</button>
        </sp-segmented>
      </div>
    </div>
  `;

  const list = part(root, 'list');
  const readout = part(root, 'readout');
  const count = part(root, 'count');
  const pickKey = part(root, 'key-pick');
  const mode = part(root, 'mode') as HTMLElement & { value: string };

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
      // The real keys first, so takeover behaves like the desktop it borrows from; the
      // simulated control only stands in for a modifier the player cannot hold.
      const additive = event.ctrlKey || event.metaKey || mode.value === 'ctrl';
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
