import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'captions' | 'inset' | 'companion';

/** The stage the video and the signed track share, in pixels. */
const STAGE = { w: 424, h: 160 };
const INSET = { w: 56, h: 72 };
/** The caption strip the inset has to sit clear of. */
const CAPTION_H = 26;
const SPLIT = 209;

/** Where the signed track sits in each provision, and how wide the picture is beside it. */
const RECT = {
  captions: { left: STAGE.w - INSET.w - 8, top: STAGE.h - INSET.h - CAPTION_H - 8, w: INSET.w, h: INSET.h, video: STAGE.w, shown: false },
  inset: { left: STAGE.w - INSET.w - 8, top: STAGE.h - INSET.h - CAPTION_H - 8, w: INSET.w, h: INSET.h, video: STAGE.w, shown: true },
  companion: { left: STAGE.w - SPLIT, top: 0, w: SPLIT, h: STAGE.h, video: SPLIT, shown: true },
} as const satisfies Record<Mode, unknown>;

const NOTE = {
  captions:
    'Captions carry the spoken words in written English. For a reader whose first language is BSL that is a second language, read at speed, while watching.',
  inset:
    'A signed track exists, at a size where the hands and the face cannot be read. Expression is grammar in a signed language, so a thumbnail loses the grammar.',
  companion:
    'The signed track at the size of the picture. Fingerspelling and expression survive, and the reader decides which of the two to watch.',
} as const;

/**
 * Sign language interpretation specimen: one lecture video under three provisions, picked absolutely.
 * The signed track is one element that moves and resizes between them, from absent, to the corner
 * thumbnail that is the usual failure, to a companion stream the same size as the picture. The signer
 * is a drawn abstraction rather than a photograph of a person.
 *
 * The subject is the signed track: the term names the interpreted stream, not the player it arrives
 * in and not the captions it sits beside. It is off stage in the captions-only state, which identify
 * summons it out of, and it is the term in both states it is on stage in (a track too small to read
 * is still a signed track, and saying so is the demonstration), so no `data-pose` is needed.
 *
 * The picture and the track share one reserved box, so the picture narrowing to make room for a
 * companion stream is the only thing that moves (SPEC §5). No timers: each provision is a pick.
 */
export function mount(root: HTMLElement): void {
  /** An abstract signer: head, shoulders, and two hands caught mid-sign. Never a photograph. */
  const signer = (scale: number) => `
    <svg viewBox="0 0 60 76" width="${Math.round(38 * scale)}" height="${Math.round(48 * scale)}" aria-hidden="true"
         style="display: block; overflow: visible">
      <circle cx="30" cy="17" r="11" fill="currentColor" opacity="0.9"/>
      <path d="M9 76c0-16 9.4-26 21-26s21 10 21 26z" fill="currentColor" opacity="0.55"/>
      <circle cx="17" cy="45" r="6" fill="currentColor"/>
      <circle cx="41" cy="33" r="6" fill="currentColor"/>
    </svg>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 11px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Lecture video</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Access" data-part="mode" data-value="captions" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-captions" value="captions"
                    style="padding: 3px 7px; font-size: 10px; white-space: nowrap">Captions only</button>
            <button class="sp-segment" type="button" data-part="seg-inset" value="inset"
                    style="padding: 3px 7px; font-size: 10px; white-space: nowrap">Inset signer</button>
            <button class="sp-segment" type="button" data-part="seg-companion" value="companion"
                    style="padding: 3px 7px; font-size: 10px; white-space: nowrap">Companion stream</button>
          </sp-segmented>
        </div>

        <div data-part="stage" style="position: relative; height: ${STAGE.h}px; margin-top: 9px">
          <div class="sp-context" data-part="video"
               style="position: absolute; left: 0; top: 0; width: ${STAGE.w}px; height: ${STAGE.h}px;
                      overflow: hidden; border-radius: var(--sp-radius); background: var(--sp-sunken);
                      border: 1px solid var(--sp-line); transition: width 0.3s var(--sp-ease)">
            <div style="display: flex; align-items: center; gap: 14px; height: 100%; padding: 0 18px 26px">
              <span style="flex: 0 0 auto; color: var(--sp-muted)">${signer(1)}</span>
              <span class="sp-stack" style="flex: 1 1 auto; min-width: 0; gap: 7px">
                <span class="sp-line" style="width: 78%"></span>
                <span class="sp-line" style="width: 58%"></span>
                <span class="sp-line" style="width: 66%"></span>
              </span>
            </div>
            <div data-part="captions"
                 style="position: absolute; left: 0; right: 0; bottom: 0; height: ${CAPTION_H}px; padding: 4px 8px;
                        background: rgb(16 24 40 / 0.78); color: #ffffff; font-size: 9.5px; line-height: 1.35;
                        text-align: center">…and that is the second reason the harbour silted up.</div>
          </div>

          <div data-part="track" data-mode="captions" data-subject
               style="position: absolute; left: ${RECT.captions.left}px; top: ${RECT.captions.top}px;
                      width: ${INSET.w}px; height: ${INSET.h}px; display: flex; align-items: center;
                      justify-content: center; overflow: hidden; border-radius: 6px;
                      background: var(--sp-accent-soft); border: 1px solid var(--sp-accent);
                      color: var(--sp-accent); opacity: 0; visibility: hidden;
                      transition: left 0.3s var(--sp-ease), top 0.3s var(--sp-ease), width 0.3s var(--sp-ease),
                                  height 0.3s var(--sp-ease), opacity 0.24s, visibility 0.24s">
            <span data-part="figure" style="display: flex">${signer(1)}</span>
          </div>
        </div>

        <p class="sp-text sp-context" data-part="note" data-mode="captions"
           style="margin: 9px 0 0; height: 32px; font-size: 11px; line-height: 1.35">${NOTE.captions}</p>
      </div>
    </div>
  `;

  const video = part(root, 'video');
  const track = part(root, 'track');
  const figure = part(root, 'figure');
  const note = part(root, 'note');

  part(root, 'mode').addEventListener('change', (event) => {
    const mode = (event as CustomEvent<string>).detail as Mode;
    const rect = RECT[mode];
    track.dataset.mode = mode;
    track.style.left = `${rect.left}px`;
    track.style.top = `${rect.top}px`;
    track.style.width = `${rect.w}px`;
    track.style.height = `${rect.h}px`;
    track.style.opacity = rect.shown ? '1' : '0';
    track.style.visibility = rect.shown ? 'visible' : 'hidden';
    // The drawing scales with the box, which is the point: the same signing at thumbnail size.
    figure.innerHTML = signer(mode === 'companion' ? 2 : 1);
    video.style.width = `${rect.video}px`;
    note.dataset.mode = mode;
    note.textContent = NOTE[mode];
  });
}
