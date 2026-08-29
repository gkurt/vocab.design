import { part, partsOf } from '#src/kit/parts.ts';
import { contactScrub } from '#src/kit/touch.ts';
import '#src/kit/segmented.ts';

type Mode = 'answers' | 'ignores';

const CAPTION = {
  answers: 'The sheet answers the scrub itself, so the gesture closes the sheet and leaves the list underneath exactly where it was.',
  ignores:
    'The sheet ignores it, so the platform takes the scrub instead and steps back a level: the sheet goes, and so does the page it was covering.',
} as const;

/**
 * Escape gesture specimen: a filter sheet over a list, dismissed by a two-finger scrub. The
 * pick decides whether the sheet answers the gesture itself or lets the platform take it,
 * which is the failure the term is about: an overlay that does not answer a dismiss does not
 * merely stay open, it hands the reader's place away.
 *
 * The subject is the sheet (SPEC §5): the gesture has no element of its own, and the sheet is
 * the thing that answers or fails to answer it, so it is the narrowest element the term names.
 * It is a sheet in both states, so no `data-pose` is needed; the list, the picker and the
 * caption are scenery.
 *
 * The gesture is PORTRAYED as itself: `contactScrub` from the kit reads the script's
 * `scrub` step, a real pair of fingers, and a reader's modifier+drag swept side to side
 * through one wiring (SPEC §7). The article carries what the demo cannot, which is that no web
 * page can hear this gesture at all.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div style="display: grid; gap: 10px; width: 476px; margin: 0 auto">
      <sp-segmented class="sp-segmented" data-axis="Scrub" data-part="mode" aria-label="When the sheet is scrubbed">
        <button class="sp-segment" type="button" value="answers" data-part="seg-answers">Sheet answers</button>
        <button class="sp-segment" type="button" value="ignores" data-part="seg-ignores">Sheet ignores</button>
      </sp-segmented>
      <div class="sp-frame sp-frame--wide" data-touch data-part="screen" data-result="open" style="position: relative; height: 168px; overflow: hidden">
        <div class="sp-stack" data-part="list" style="gap: 6px; padding: 12px">
          <span class="sp-label">Bookings</span>
          <div class="sp-row" style="gap: 6px"><span class="sp-chip">Tue 12</span><span class="sp-chip">Wed 13</span></div>
          <div class="sp-row" style="gap: 6px"><span class="sp-chip">Thu 14</span><span class="sp-chip">Fri 15</span></div>
        </div>
        <div class="sp-surface" data-part="sheet" data-subject data-open
          style="position: absolute; inset: auto 0 0 0; height: 118px; border-radius: 12px 12px 0 0; padding: 12px; display: grid; gap: 8px; align-content: start">
          <span class="sp-label">Filter</span>
          <div class="sp-row" style="gap: 6px"><span class="sp-chip">Morning</span><span class="sp-chip">Evening</span></div>
          <p class="sp-text sp-text--quiet" data-part="hint" style="margin: 0; font-size: 11px">Scrub two fingers to dismiss</p>
        </div>
        <div class="sp-surface" data-part="gone" hidden
          style="position: absolute; inset: 0; display: grid; place-items: center; gap: 4px">
          <span class="sp-text sp-text--quiet" style="font-size: 12px">Back at Home</span>
          <span class="sp-text sp-text--quiet" style="font-size: 11px">the bookings list was left behind too</span>
        </div>
      </div>
      <p class="sp-text sp-text--quiet" data-part="caption" style="margin: 0; min-height: 30px; font-size: 12px">${CAPTION.answers}</p>
    </div>`;

  const sheet = part(root, 'sheet');
  const screen = part(root, 'screen');
  const gone = part(root, 'gone');
  const caption = part(root, 'caption');
  const seg = part(root, 'mode') as HTMLElement & { value: string };
  let mode: Mode = 'answers';

  const reset = () => {
    sheet.setAttribute('data-open', '');
    sheet.hidden = false;
    screen.dataset.result = 'open';
    gone.hidden = true;
  };
  /* The outcome is recorded on the screen, which never leaves: a claim about a dismissal
     cannot be made on the dismissed thing (SPEC §8), and the sheet is hidden rather than
     slid out of the frame so nothing is ever clipped instead of gone. */
  const scrubbed = () => {
    sheet.removeAttribute('data-open');
    sheet.hidden = true;
    if (mode === 'answers') {
      // The sheet took the gesture: it closes and the list behind it is untouched.
      screen.dataset.result = 'dismissed';
      return;
    }
    // Nothing answered, so the platform did: back a level, sheet and page both.
    screen.dataset.result = 'stranded';
    gone.hidden = false;
  };

  seg.addEventListener('change', () => {
    mode = seg.value === 'ignores' ? 'ignores' : 'answers';
    for (const el of partsOf(root, 'caption')) el.textContent = CAPTION[mode];
    reset();
  });
  contactScrub(sheet, { onScrub: scrubbed });
  reset();
  caption.textContent = CAPTION.answers;
}
