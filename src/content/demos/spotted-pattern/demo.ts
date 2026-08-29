import { flag, part, partsOf } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import { localBox } from '#src/kit/measure.ts';

/** The page under the traces, at a size the demo states rather than measures. */
const PAGE_W = 444;
const PAGE_H = 176;

type Mode = 'formatted' | 'flat';

const PROSE =
  'Berths are released every Monday at 09:00 and held for 48 hours. Short stay pontoons take a 16 A supply and the outer wall is 32 A only. A season ticket is £1,240 and includes the winter lift out. Everything else, including the deposit and the cancellation window, is set out in the berth application, which the office countersigns on the day you arrive.';

/** The words a hunting eye can find without reading: bolded keywords, a numeral, a link. */
const BOLD = ['Monday', '32'];
const NUMERAL = ['£1,240'];
const LINK = ['berth', 'application'];

const NOTES: Record<Mode, string> = {
  formatted: 'A keyword hunt: isolated fixations, each one on a word that looks different from its neighbours.',
  flat: 'Unformatted, the same words give the hunt nothing to land on, and it dies after two lines.',
};

/** A word and whatever punctuation trails it: only the word itself carries the formatting. */
const split = (word: string): [string, string] => {
  const match = /^(.*?)([.,;:]?)$/.exec(word);
  return [match?.[1] ?? word, match?.[2] ?? ''];
};

/**
 * Spotted pattern specimen: a paragraph of harbour rules with the fixations drawn where a
 * hunting eye stopped, and the same paragraph with its formatting removed.
 *
 * The subject is the spray of fixations, the decision the F pattern and Z pattern specimens
 * made: the term names where fixations land rather than a component, so the narrowest element
 * it names is the figure tracing them, and the paragraph underneath is the scene (SPEC §5).
 * The flat paragraph carries its own trace as context, so nothing pretends a failed hunt is
 * the pattern. Neither overlay takes pointer events, so a reader's click reaches the page.
 */
export function mount(root: HTMLElement): void {
  const words = (mode: Mode) =>
    PROSE.split(' ')
      .map((word) => {
        const [key, tail] = split(word);
        if (mode === 'flat') return `<span data-part="word">${word}</span>`;
        if (BOLD.includes(key)) return `<span data-part="word" data-spot style="font-weight: 700">${key}</span>${tail}`;
        if (NUMERAL.includes(key))
          return `<span data-part="word" data-spot style="font-weight: 600; padding: 0 4px; border: 1px solid var(--sp-line); border-radius: 4px; background: var(--sp-sunken)">${key}</span>${tail}`;
        if (LINK.includes(key))
          return `<span data-part="word"${key === 'application' ? ' data-spot' : ''} style="font-weight: 500; text-decoration: underline; text-underline-offset: 2px">${key}</span>${tail}`;
        return `<span data-part="word">${word}</span>`;
      })
      .join(' ');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Reader asking what it costs</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Text" data-part="switcher" data-value="formatted">
            <button class="sp-segment" type="button" data-part="seg-formatted" value="formatted">formatted</button>
            <button class="sp-segment" type="button" data-part="seg-flat" value="flat">flat</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div data-part="page" style="position: relative; flex: 0 0 auto; width: ${PAGE_W}px; height: ${PAGE_H}px; overflow: hidden; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)">
            <div class="sp-context" style="padding: 12px 16px 0">
              <div class="sp-row sp-row--between">
                <span class="sp-heading" style="font-size: 12px">Berthing rules</span>
                <span class="sp-label">page 3 of 7</span>
              </div>
            </div>
            <p class="sp-context" data-part="prose" style="margin: 0; padding: 10px 16px 14px; font-size: 12.5px; line-height: 1.75"></p>
            <div data-part="spray" data-subject style="position: absolute; pointer-events: none"></div>
            <div data-part="stalled" hidden style="position: absolute; pointer-events: none"></div>
          </div>
          <span class="sp-text sp-context" data-part="readout" style="height: 40px; max-width: 434px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;

  const page = part(root, 'page');
  const prose = part(root, 'prose');
  const spray = part(root, 'spray');
  const stalled = part(root, 'stalled');
  const readout = part(root, 'readout');

  /**
   * Both traces are measured rather than stated: a fixation lands on a word, and only the
   * rendered line breaks know where the words are. Word spans are static text boxes with
   * nothing transitioned on them, and the read happens after the paragraph carries the words
   * being measured.
   */
  const plot = (host: HTMLElement, targets: HTMLElement[], size: number) => {
    const spots = targets.map((el) => {
      const box = localBox(el, page);
      return { x: box.left + box.width / 2, y: box.top + box.height / 2 };
    });
    if (!spots.length) return;

    const pad = size;
    const left = Math.min(...spots.map((s) => s.x)) - pad;
    const top = Math.min(...spots.map((s) => s.y)) - pad;
    const right = Math.max(...spots.map((s) => s.x)) + pad;
    const bottom = Math.max(...spots.map((s) => s.y)) + pad;

    host.style.left = `${left}px`;
    host.style.top = `${top}px`;
    host.style.width = `${right - left}px`;
    host.style.height = `${bottom - top}px`;
    host.innerHTML = spots
      .map(
        ({ x, y }) =>
          `<span style="position: absolute; left: ${x - left - size / 2}px; top: ${y - top - size / 2}px; width: ${size}px; height: ${size}px; border-radius: 50%; background: var(--sp-accent); opacity: 0.44"></span>`,
      )
      .join('');
  };

  /** The first word of each of the first two lines: where a hunt with nothing to find stops. */
  const lineStarts = (count: number) => {
    const rows = new Map<number, HTMLElement>();
    for (const word of partsOf(prose, 'word')) {
      const box = word.getBoundingClientRect();
      const row = Math.round(box.top);
      if (!rows.has(row)) rows.set(row, word);
    }
    return [...rows.values()].slice(0, count);
  };

  const apply = (mode: Mode) => {
    prose.innerHTML = words(mode);
    readout.textContent = NOTES[mode];
    flag(spray, 'hidden', mode !== 'formatted');
    flag(stalled, 'hidden', mode !== 'flat');
    if (mode === 'formatted') plot(spray, [...prose.querySelectorAll<HTMLElement>('[data-spot]')], 20);
    else plot(stalled, lineStarts(2), 20);
  };

  // Each segment names a version of the paragraph, so the switch lands on that version rather
  // than flipping whichever one it finds (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail as Mode));

  apply('formatted');
}
