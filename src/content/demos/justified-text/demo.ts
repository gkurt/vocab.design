import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * Soft hyphens (U+00AD) mark the break points inside the long words. `hyphens:
 * auto` honours them as well as its own dictionary, so the demonstration holds
 * on a browser that has no dictionary for the declared language, which is a
 * real possibility and one the article is about. `hyphens: none` ignores both,
 * which is the before state.
 */
const S = '­';
const BODY =
  `Justi${S}fi${S}ca${S}tion stretches the word spaces until every line reaches the mar${S}gin exactly. ` +
  `Un${S}hyphen${S}ated, at a nar${S}row meas${S}ure, the stretch${S}ing becomes un${S}mis${S}tak${S}able: ` +
  `gaps open beside the long${S}est words and line up into rivers run${S}ning down the col${S}umn.`;
const COLUMN = 175;
const LINE_PX = 18;
/** The room the unhyphenated setting takes, held by both columns so a rebreak moves nothing. */
const LINES = 9;

const NOTES: Record<string, string> = {
  none: 'The word spaces carry all of the stretch, and the gaps line up.',
  auto: 'More places to break, so the spacing evens out.',
};

/**
 * Justified text specimen: one paragraph set twice at the same narrow measure,
 * flush left beside flush both. The justified column is the subject and it starts
 * with hyphenation off, which is the state the objection is about: the spaces do
 * all the work and the gaps open. Allowing words to break gives the line breaker
 * somewhere else to go and the spacing evens out.
 *
 * Both columns sit in boxes holding the room the unhyphenated setting takes, so a
 * rebreak cannot move the readout under them (SPEC §5).
 *
 * The subject is the justified block. The term names what is done to a run of
 * text, so the block is the narrowest thing that is it; the ragged twin and the
 * hyphenation control are scenery.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 420px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented class="sp-segmented" data-axis="hyphens" data-part="segmented" data-value="none">
            <button class="sp-segment" data-part="seg-none" value="none">none</button>
            <button class="sp-segment" data-part="seg-auto" value="auto">auto</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 14px; margin-top: 14px; align-items: flex-start">
          <div class="sp-stack sp-context" style="gap: 4px">
            <span class="sp-label">text-align: left</span>
            <div style="width: ${COLUMN}px; height: ${LINE_PX * LINES}px">
              <p class="sp-text" data-part="ragged" lang="en"
                 style="margin: 0; font-size: 12px; line-height: ${LINE_PX}px; text-align: left; -webkit-hyphens: none; hyphens: none">${BODY}</p>
            </div>
          </div>
          <div class="sp-stack" style="gap: 4px">
            <span class="sp-label sp-context">text-align: justify</span>
            <div style="width: ${COLUMN}px; height: ${LINE_PX * LINES}px">
              <p class="sp-text" data-part="justified" data-subject data-hyphens="none" lang="en"
                 style="margin: 0; font-size: 12px; line-height: ${LINE_PX}px; text-align: justify; -webkit-hyphens: none; hyphens: none">${BODY}</p>
            </div>
          </div>
        </div>
        <div class="sp-row sp-context" style="height: 18px; margin-top: 8px">
          <span class="sp-text" data-part="readout"></span>
        </div>
      </div>
    </div>
  `;

  const justified = part(root, 'justified');
  const readout = part(root, 'readout');

  const apply = (value: string) => {
    const note = NOTES[value];
    if (!note) return;
    justified.dataset.hyphens = value;
    justified.style.setProperty('-webkit-hyphens', value);
    justified.style.setProperty('hyphens', value);
    readout.textContent = note;
  };

  apply('none');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
