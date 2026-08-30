import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** One token per beat, then the beat the answer needs to settle before anything is said. */
const TOKEN_MS = 170;
const SETTLE_MS = 320;

type Mode = 'staged' | 'naive';

const REPLY = 'A kestrel hovers by holding its head still while the wind moves the rest of the bird.';
const WORDS = REPLY.split(' ');

const CAPTION = {
  staged:
    'The tokens land in the transcript as they arrive, and the region stays busy while they do. One announcement at the end: the reply is finished, and how long it is.',
  naive: 'The region announces every token, so the reader hears the start of a sentence over and over and never reaches the end of one.',
} as const;

/**
 * Streaming announcement specimen: an assistant reply arriving token by token, with a pick between
 * holding the region quiet until it settles and letting every token speak.
 *
 * The screen reader panel is a portrayal, labelled as one, following the live region and busy state
 * specimens rather than inventing a second convention for the same job. Its count is the cumulative
 * claim (how many times the reader was spoken to), so a claim about the flood is aimed there rather
 * than at the last line, which names one fragment (SPEC §8).
 *
 * The subject is the reply region, the element that carries the quiet flag while it fills: the term
 * names what the region does with the stream, and the bubble is the narrowest element that flag sits
 * on. The picker, the question above it, the transcript and the caption are scenery (SPEC §5). A
 * region announcing every token is the failure this term is named against, and it is a state this
 * region passes through, so the honest condition rides in `data-pose` and the mount state satisfies
 * it (SPEC §6).
 *
 * Every beat comes from the DemoClock, so a pose holds a half-streamed reply still. All the words
 * are laid out at mount and revealed in place, so the bubble never changes size as it fills
 * (SPEC §5).
 *
 * The row above the reply once read "Reply generated token by token", which narrated the
 * mechanic the stream itself performs, so it went and the row now carries only the picker.
 * The reader panel's own label lost its ", portrayed" hedge: the panel draws the utterances
 * and their count, so it is an instrument and names itself as one.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const word = (text: string, index: number) =>
    `<span data-part="w-${index + 1}" style="opacity: 0; transition: opacity 0.12s linear">${text}</span>`;

  const transcriptLine = (index: number) => `
    <p class="sp-text sp-text--ink" data-part="line-${index}"
       style="margin: 0; height: 15px; font-size: 11px; line-height: 15px; white-space: nowrap; overflow: hidden;
              opacity: 0; transition: opacity 0.14s ease"></p>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="staged" data-axis="Spoken" data-term="staged" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-staged" value="staged"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Staged</button>
            <button class="sp-segment" type="button" data-part="seg-naive" value="naive"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Every token</button>
          </sp-segmented>
        </div>

        <p class="sp-text sp-context" style="margin: 9px 0 0; font-size: 11px; text-align: right">You asked: how does a kestrel hover?</p>

        <div class="sp-surface" data-part="region" data-subject data-mode="staged" data-pose="[data-mode=staged]"
             role="status" aria-live="polite" aria-busy="true" style="margin-top: 5px; padding: 8px 10px">
          <div class="sp-row sp-row--between sp-context" style="gap: 10px; height: 14px">
            <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">Assistant</span>
            <span class="sp-label sp-pending" data-part="status"
                  style="flex: 0 0 auto; font-size: 10px">generating</span>
          </div>
          <p class="sp-text sp-text--ink" data-part="reply"
             style="margin: 3px 0 0; height: 34px; font-size: 12px; line-height: 16px">${WORDS.map(word).join(' ')}<span class="sp-caret" data-part="caret"></span></p>
        </div>

        <div class="sp-surface sp-context" style="margin-top: 9px; padding: 8px 10px">
          <div class="sp-row sp-row--between" style="gap: 10px; height: 14px">
            <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">Screen reader</span>
            <span class="sp-label" data-part="count" data-said="none"
                  style="flex: 0 0 auto; font-size: 10px">Spoken 0 times</span>
          </div>
          <div class="sp-stack" style="gap: 0; margin-top: 3px; height: 45px">
            ${transcriptLine(1)}${transcriptLine(2)}${transcriptLine(3)}
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="staged"
           style="margin: 8px 0 0; height: 30px; font-size: 11px; line-height: 1.35">${CAPTION.staged}</p>
      </div>
    </div>
  `;

  const region = part(root, 'region');
  const status = part(root, 'status');
  const caret = part(root, 'caret');
  const count = part(root, 'count');
  const caption = part(root, 'caption');
  const words = WORDS.map((_, index) => part(root, `w-${index + 1}`));
  const lines = [part(root, 'line-1'), part(root, 'line-2'), part(root, 'line-3')];

  let timers: number[] = [];
  let spoken = 0;

  const said = () => {
    spoken += 1;
    count.textContent = `Spoken ${spoken} time${spoken === 1 ? '' : 's'}`;
    count.dataset.said = spoken === 1 ? 'one' : 'many';
  };

  /** The flood: each fragment cuts the one still being read. */
  const flood = (text: string) => {
    const slot = (spoken - 1) % 3;
    const previous = lines[(slot + 2) % 3];
    if (previous?.textContent) {
      previous.setAttribute('data-cut', '');
      previous.style.textDecoration = 'line-through';
      previous.style.color = 'var(--sp-muted)';
    }
    const line = lines[slot];
    if (!line) return;
    line.textContent = text;
    line.style.opacity = '1';
    line.style.textDecoration = 'none';
    line.style.color = '';
    line.removeAttribute('data-cut');
  };

  const stream = (mode: Mode) => {
    for (const timer of timers) clock.clearTimeout(timer);
    timers = [];
    spoken = 0;

    region.dataset.mode = mode;
    flag(region, 'data-quiet', mode === 'staged');
    if (mode === 'staged') region.setAttribute('aria-busy', 'true');
    else region.removeAttribute('aria-busy');
    status.textContent = 'generating';
    status.classList.add('sp-pending');
    count.textContent = 'Spoken 0 times';
    count.dataset.said = 'none';
    caption.dataset.mode = mode;
    caption.textContent = CAPTION[mode];
    for (const el of words) el.style.opacity = '0';
    caret.style.opacity = '1';
    words[0]?.before(caret);
    for (const line of lines) {
      line.textContent = '';
      line.style.opacity = '0';
      line.removeAttribute('data-cut');
      line.style.textDecoration = 'none';
      line.style.color = '';
    }

    WORDS.forEach((_, index) => {
      timers.push(
        clock.setTimeout(
          () => {
            const el = words[index];
            if (el) {
              el.style.opacity = '1';
              el.after(caret);
            }
            if (mode === 'staged') return;
            // No quiet flag, so the region is announced on every write, and the fragment the
            // reader is halfway through is cut by the next one.
            said();
            flood(
              `“${WORDS.slice(0, index + 1)
                .slice(-4)
                .join(' ')}”`,
            );
          },
          (index + 1) * TOKEN_MS,
        ),
      );
    });

    timers.push(
      clock.setTimeout(
        () => {
          flag(region, 'data-quiet', false);
          status.textContent = 'complete';
          status.classList.remove('sp-pending');
          caret.style.opacity = '0';
          if (mode !== 'staged') return;
          region.setAttribute('aria-busy', 'false');
          said();
          flood(`“Reply complete, ${WORDS.length} words. A kestrel hovers by holding its head still…”`);
        },
        WORDS.length * TOKEN_MS + SETTLE_MS,
      ),
    );
  };

  part(root, 'mode').addEventListener('change', (event) => {
    stream((event as CustomEvent<string>).detail as Mode);
  });

  stream('staged');
}
