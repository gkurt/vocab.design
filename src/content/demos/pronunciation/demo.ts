import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The beat before the voice gets to the word, so the transcript reads as speech. */
const SPEAK_MS = 480;

type Mode = 'default' | 'hint';

const MODE = {
  default: {
    token: 'leed',
    verdict: 'reads as the verb',
    caption:
      'No hint, so the voice picks the commoner reading and the sentence becomes an instruction about following pipes. Nothing on the page looks wrong.',
  },
  hint: {
    token: 'led',
    verdict: 'reads as the metal',
    caption:
      'The written word is hidden from the reader and a respelling put beside it, so the voice says the metal. The page looks exactly the same as before.',
  },
} as const satisfies Record<Mode, unknown>;

/**
 * Pronunciation specimen: one sentence ending in a homograph, and a transcript of the word the
 * voice actually produces. Authoring a hint changes nothing on screen, which is the whole
 * difficulty of the term: the bug is audible only.
 *
 * The transcript is a portrayal, labelled as one, following the live region and atomic live
 * region specimens rather than inventing a second convention for the same job. The hint is
 * shown with the kit's revealed visually-hidden treatment, since that is the technique authors
 * actually use and the specimen has to make it visible to be watchable at all.
 *
 * The subject is the spoken token: pronunciation is what comes out of the voice, so the term
 * names that word and not the sentence that produced it, nor the picker that chose the hint.
 * Both readings are pronunciations, one wrong and one intended, so the subject is honest in
 * every state and needs no `data-pose`. The sentence, the picker, the verdict and the caption
 * are scenery (SPEC §5).
 *
 * The speech delay comes from the DemoClock so a pose can hold the transcript still. The token
 * sits in a box wide enough for the longer reading and the respelling is the last thing on its
 * line, so neither state moves anything (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-grow"></span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-axis="Authored hint" data-value="default">
            <button class="sp-segment" type="button" data-part="seg-default" value="default"
                    style="padding: 4px 12px; font-size: 11.5px">None</button>
            <button class="sp-segment" type="button" data-part="seg-hint" value="hint"
                    style="padding: 4px 12px; font-size: 11.5px">Respelling</button>
          </sp-segmented>
        </div>

        <div class="sp-surface sp-context" style="margin-top: 10px; padding: 10px 12px">
          <p data-part="sentence" style="margin: 0; font-size: 14px; line-height: 1.5">
            The old service pipes are lined with <span data-part="word">lead</span>
            <span class="sp-visually-hidden" data-part="respelling">led</span>
          </p>
        </div>

                              <span class="sp-label" data-stage-verdict data-part="verdict"
                  style="flex: 0 0 auto; width: 120px; text-align: right; font-size: 10px">${MODE.default.verdict}</span>
          
          <p class="sp-text sp-text--ink" data-stage-announce data-part="utterance" data-state="spoken"
             style="margin: 4px 0 0; height: 22px; line-height: 22px; font-size: 12px;
                    white-space: nowrap">“The old service pipes are lined with <span
              data-part="token" data-subject data-mode="default"
              style="font-weight: 600">${MODE.default.token}</span>”</p>
        

        <p class="sp-text sp-context" data-part="caption" data-mode="default"
           style="margin: 8px 0 0; height: 32px; font-size: 11px; line-height: 1.35">${MODE.default.caption}</p>
      </div>
    </div>
  `;

  const word = part(root, 'word');
  const respelling = part(root, 'respelling');
  const utterance = part(root, 'utterance');
  const token = part(root, 'token');
  const verdict = part(root, 'verdict');
  const caption = part(root, 'caption');
  let pending: number | undefined;

  const apply = (mode: Mode) => {
    const rule = MODE[mode];
    const hinted = mode === 'hint';
    // The technique in full: the written word leaves the accessibility tree and the
    // respelling beside it takes its place. On screen the sentence is unchanged, so the
    // revealed hint is the only way a watcher can tell the markup moved at all.
    flag(word, 'aria-hidden', hinted);
    flag(respelling, 'data-revealed', hinted);
    // The voice takes a beat to get there, and the line keeps the last word it said until
    // the new one is out, so the subject is never a placeholder (SPEC §6).
    clock.clearTimeout(pending);
    utterance.dataset.state = 'queued';
    pending = clock.setTimeout(() => {
      utterance.dataset.state = 'spoken';
      token.dataset.mode = mode;
      token.textContent = rule.token;
      verdict.textContent = rule.verdict;
      caption.dataset.mode = mode;
      caption.textContent = rule.caption;
    }, SPEAK_MS);
  };

  part(root, 'mode').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Mode);
  });
}
