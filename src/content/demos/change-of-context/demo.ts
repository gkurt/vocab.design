import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type RegionKey = 'uk' | 'de' | 'jp';

const REGIONS: Record<RegionKey, { name: string; line: string }> = {
  uk: { name: 'United Kingdom', line: 'Prices in GBP. Ships from Leeds.' },
  de: { name: 'Germany', line: 'Prices in EUR. Ships from Hamburg.' },
  jp: { name: 'Japan', line: 'Prices in JPY. Ships from Osaka.' },
};

const CAPTION = {
  request: 'Choosing a region changes nothing. The page reloads when Go is pressed, and not before.',
  input: 'The pick alone reloads the page. A keyboard reader passing through the options never reaches the one they wanted.',
} as const;

type Mode = keyof typeof CAPTION;

/**
 * Change of context specimen: a region picker wired the conforming way, then wired to fire
 * on input. The scene, the options, and the destination are identical in both; the only
 * difference is which event is allowed to reload the page, which is the whole of WCAG 3.2.2.
 *
 * The subject is the picker region, the narrowest element that holds the control and the
 * step that confirms it. The state control, the page panel it changes, and the caption are
 * scenery (SPEC §5). The failing wiring is a state the subject itself passes through, so the
 * honest condition lives in `data-pose` and the mount state satisfies it: identify refuses to
 * ring the version that asks before it acts (SPEC §6).
 *
 * Nothing moves between states. The Go button and the note that replaces it share one slot
 * of fixed size, and the page panel holds its height whatever region it shows (SPEC §5).
 * Picking an option reaches that option rather than cycling, and each segment reaches its own
 * wiring, so a pass joined halfway ends where a whole one does (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const option = (key: RegionKey, selected: boolean) => `
    <li class="sp-option" role="option" data-part="option-${key}" data-region="${key}"
        aria-selected="${selected}" style="padding: 4px 8px; font-size: 12px">${REGIONS[key].name}</li>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 440px; padding: 14px 16px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">The picker reloads</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="request">
            <button class="sp-segment" data-part="seg-request" value="request">On request</button>
            <button class="sp-segment" data-part="seg-input" value="input">On input</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="picker" data-subject data-pose="[data-mode=request]" data-mode="request"
             style="margin-top: 12px; padding: 10px 12px; display: flex; gap: 12px; align-items: flex-start">
          <div style="flex: 1 1 auto; min-width: 0">
            <span class="sp-label">Delivery region</span>
            <ul class="sp-listbox sp-listbox--static" role="listbox" data-part="options"
                style="margin-top: 6px; box-shadow: none">
              ${option('uk', true)}${option('de', false)}${option('jp', false)}
            </ul>
          </div>
          <div style="position: relative; flex: 0 0 92px; height: 30px; margin-top: 22px">
            <button class="sp-button sp-button--sm" type="button" data-part="go"
                    style="position: absolute; inset: 0">Go</button>
            <span class="sp-text" data-part="auto-note"
                  style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
                         font-size: 11px; text-align: center; visibility: hidden">no Go step</span>
          </div>
        </div>

        <div class="sp-surface sp-context" data-part="page" data-view="uk"
             style="margin-top: 10px; padding: 8px 10px; height: 46px">
          <span class="sp-label">The page</span>
          <p class="sp-text sp-text--ink" data-part="page-line"
             style="margin: 2px 0 0; font-size: 12px; white-space: nowrap">${REGIONS.uk.line}</p>
        </div>

        <p class="sp-text sp-context" data-part="caption" data-case="request"
           style="margin: 6px 0 0; height: 34px; font-size: 11px">${CAPTION.request}</p>
      </div>
    </div>
  `;

  const picker = part(root, 'picker');
  const go = part(root, 'go');
  const autoNote = part(root, 'auto-note');
  const page = part(root, 'page');
  const pageLine = part(root, 'page-line');
  const caption = part(root, 'caption');
  const list = part(root, 'options');
  const options = [...list.querySelectorAll<HTMLElement>('.sp-option')];

  let mode: Mode = 'request';
  let chosen: RegionKey = 'uk';

  /** The context change itself: the page the reader was on is replaced by another one. */
  const navigate = (key: RegionKey) => {
    page.dataset.view = key;
    pageLine.textContent = REGIONS[key].line;
  };

  const choose = (key: RegionKey) => {
    chosen = key;
    for (const el of options) el.setAttribute('aria-selected', String(el.dataset.region === key));
    if (mode === 'input') navigate(key);
  };

  const apply = (next: Mode) => {
    mode = next;
    picker.dataset.mode = next;
    // The confirm step is what the wiring removes, so the slot keeps its room and the note
    // takes the button's place rather than the row closing up (SPEC §5).
    go.style.visibility = next === 'request' ? 'visible' : 'hidden';
    autoNote.style.visibility = next === 'request' ? 'hidden' : 'visible';
    caption.dataset.case = next;
    caption.textContent = CAPTION[next];
    // Both wirings are demonstrated from the same starting page, so the second one is read
    // as the pick firing rather than as a destination left over from the first.
    choose('uk');
    navigate('uk');
  };

  list.addEventListener('click', (event) => {
    const el = (event.target as HTMLElement).closest<HTMLElement>('.sp-option');
    const key = el?.dataset.region as RegionKey | undefined;
    if (key) choose(key);
  });

  go.addEventListener('click', () => navigate(chosen));

  part(root, 'segmented').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail === 'input' ? 'input' : 'request');
  });
}
