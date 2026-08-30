import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Row = { key: string; lang: string; body: string };

/**
 * Three passages, each read by the browser under the language it declares. The `q` elements
 * carry no marks of their own: the browser draws the ones the language uses, which is half
 * the demonstration.
 */
const ROWS: Row[] = [
  { key: 'en', lang: 'en', body: 'She said <q>after you</q> and held the door open.' },
  { key: 'fr', lang: 'fr', body: 'Il a répondu <q>je vous en prie</q> et il a souri.' },
  { key: 'de', lang: 'de', body: 'Die Geschwindigkeitsbeschränkung wurde gestern aufgehoben.' },
];

const CAPTIONS = {
  set: 'Declared per passage: the voice, the quotation marks, and the hyphenation dictionary all follow the language.',
  missing: 'Undeclared, every passage inherits English: the French line is read as English and the German column loses its breaks.',
} as const;

type Mode = keyof typeof CAPTIONS;

/**
 * Language attribute specimen: one page, three passages, and the attribute taken off them
 * and put back. What it drives is shown rather than described. The quotation marks come
 * from the browser's own rules for the declared language, and the German column hyphenates
 * only while a German dictionary is being asked for.
 *
 * The subject is the French passage, the narrowest element that carries the attribute the
 * term names. Its undeclared state is the counter-example the demo exists to show, so the
 * honest condition is declared in `data-pose` and the specimen mounts declared: identify
 * refuses to ring a passage with no language on it and plays on (SPEC §6). The picker and
 * the caption are scenery (SPEC §5).
 *
 * A second column beside each passage once named the synthesizer a reader would hear
 * ("French voice, guillemets"). No speech is drawn here, so that was the site narrating
 * inside the frame; the voice belongs to the article and to the strip's verdict, and the
 * column is gone. What is left beside each passage is its markup.
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
      </div>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 16px">
        <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Markup" data-term="set" data-value="set">
          <button class="sp-segment" data-part="seg-set" value="set" style="font-size: 12px; padding: 5px 10px">lang declared</button>
          <button class="sp-segment" data-part="seg-missing" value="missing" style="font-size: 12px; padding: 5px 10px">no lang</button>
        </sp-segmented>
        <div class="sp-stack" style="gap: 10px">
          ${ROWS.map(row).join('')}
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-case="set"
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
    }
    caption.dataset.case = mode;
    caption.textContent = CAPTIONS[mode];
  };

  apply('set');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail as Mode));
}
