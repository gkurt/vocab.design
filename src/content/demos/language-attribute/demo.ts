import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Row = { key: string; lang: string; voice: string; fallback: string; body: string };

/**
 * Three passages, each with the voice the declared language would summon and the voice it
 * gets when nothing is declared. The `q` elements carry no marks of their own: the browser
 * draws the ones the language uses, which is half the demonstration.
 */
const ROWS: Row[] = [
  {
    key: 'en',
    lang: 'en',
    voice: 'English voice, English hyphens',
    fallback: 'English voice: nothing changed, the page is English',
    body: 'She said <q>after you</q> and held the door open.',
  },
  {
    key: 'fr',
    lang: 'fr',
    voice: 'French voice, guillemets',
    fallback: 'English voice reading French: not words in either language',
    body: 'Il a répondu <q>je vous en prie</q> et il a souri.',
  },
  {
    key: 'de',
    lang: 'de',
    voice: 'German voice, German dictionary',
    fallback: 'English voice, and no dictionary: the long word drops whole',
    body: 'Die Geschwindigkeitsbeschränkung wurde gestern aufgehoben.',
  },
];

const CAPTIONS = {
  set: 'Declared per passage: the voice, the quotation marks, and the hyphenation dictionary all follow the language.',
  missing: 'Undeclared, every passage inherits English: the French line is read as English and the German column loses its breaks.',
} as const;

type Mode = keyof typeof CAPTIONS;

/**
 * Language attribute specimen: one page, three passages, and the attribute taken off them
 * and put back. What it drives is shown rather than described. The quotation marks come
 * from the browser's own rules for the declared language, the German column hyphenates
 * only while a German dictionary is being asked for, and the voice column names the
 * synthesizer a reader would hear.
 *
 * The subject is the French passage, the narrowest element that carries the attribute the
 * term names. Its undeclared state is the counter-example the demo exists to show, so the
 * honest condition is declared in `data-pose` and the specimen mounts declared: identify
 * refuses to ring a passage with no language on it and plays on (SPEC §6). The picker, the
 * voice column, and the caption are scenery (SPEC §5).
 *
 * Every box keeps the room its tallest setting needs from mount, so a passage that
 * rebreaks when the dictionary goes away moves nothing below it (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const row = (r: Row) => `
    <div class="sp-row" style="gap: 12px; align-items: flex-start">
      <p class="sp-text sp-text--ink" data-part="text-${r.key}" lang="${r.lang}"
         ${r.key === 'fr' ? 'data-subject data-pose="[lang=fr]"' : ''}
         style="margin: 0; width: 190px; height: 54px; font-size: 12px; line-height: 18px;
                -webkit-hyphens: auto; hyphens: auto">${r.body}</p>
      <div class="sp-stack sp-context" style="gap: 2px; width: 218px">
        <span class="sp-label" data-part="tag-${r.key}" style="font-size: 11px">lang="${r.lang}"</span>
        <span class="sp-text" data-part="voice-${r.key}" data-state="${r.lang}"
              style="height: 32px; font-size: 11px; line-height: 15px">${r.voice}</span>
      </div>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 16px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">One page, three languages</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-axis="Markup" data-term="set" data-value="set">
            <button class="sp-segment" data-part="seg-set" value="set" style="font-size: 12px; padding: 5px 10px">lang declared</button>
            <button class="sp-segment" data-part="seg-missing" value="missing" style="font-size: 12px; padding: 5px 10px">no lang</button>
          </sp-segmented>
        </div>
        <div class="sp-stack" style="gap: 6px; margin-top: 10px">
          ${ROWS.map(row).join('')}
        </div>
        <p class="sp-text sp-context" data-part="caption" data-case="set"
           style="margin: 8px 0 0; height: 30px; font-size: 11px">${CAPTIONS.set}</p>
      </div>
    </div>
  `;

  const caption = part(root, 'caption');

  const apply = (mode: Mode) => {
    for (const r of ROWS) {
      const passage = part(root, `text-${r.key}`);
      if (mode === 'set') passage.setAttribute('lang', r.lang);
      else passage.removeAttribute('lang');
      part(root, `tag-${r.key}`).textContent = mode === 'set' ? `lang="${r.lang}"` : 'no lang, inherits en';
      const voice = part(root, `voice-${r.key}`);
      voice.dataset.state = mode === 'set' ? r.lang : 'en';
      voice.textContent = mode === 'set' ? r.voice : r.fallback;
    }
    caption.dataset.case = mode;
    caption.textContent = CAPTIONS[mode];
  };

  apply('set');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail as Mode));
}
