import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Drives = 'review' | 'focus';

/** Screen order: what the review cursor walks, tab stop or not. */
const REVIEW_ORDER = ['n-heading', 'n-to', 'n-body', 'n-send', 'n-status', 'n-note'] as const;
/** Tab order: the three stops the system focus has. */
const FOCUS_ORDER = ['n-to', 'n-body', 'n-send'] as const;

/** The two cursors start apart, because being apart is the whole of the term. */
const REVIEW_HOME = REVIEW_ORDER.indexOf('n-send');
const FOCUS_HOME = FOCUS_ORDER.indexOf('n-to');

const SAYS: Record<string, string> = {
  'n-heading': '“New message, heading level 2”',
  'n-to': '“To, edit, design team”',
  'n-body': '“Message, edit, multiline”',
  'n-send': '“Send, button”',
  'n-status': '“Draft saved 2 minutes ago”',
  'n-note': '“Attachments over 25 MB are stripped”',
};

const FOCUS_NAME: Record<string, string> = {
  'n-to': 'To field',
  'n-body': 'Message field',
  'n-send': 'Send button',
};

const CAPTION: Record<Drives, string> = {
  review:
    'The review cursor walks the whole screen, including the two lines no tab stop ever visits. Focus has not moved, so the caret stays in the field and the app is never told anything happened.',
  focus:
    'Focus moves and the review cursor stays where it was put. Two cursors on one screen, and only one of them is the one the application knows about.',
};

/**
 * Review cursor specimen: one compose window carrying two cursors at once. The system focus is
 * drawn as a focus ring on the message field; the review cursor is a separate marker that steps
 * through everything on screen, tab stop or not, without the focus following it. A segmented
 * control picks which cursor the Step button drives.
 *
 * The subject is the review cursor marker, the narrowest element the term names: the term is the
 * second cursor, not the reading it produces and not the window it walks. The picker, the compose
 * window, the Step button, the two read-outs and the caption are scenery (SPEC §5). The window
 * stays out of the context register, since the register would reach through it to the marker
 * inside and to the focus ring it has to be told apart from. The marker is the review cursor in
 * every resting state, so no `data-pose` is needed (SPEC §6).
 *
 * Focus is drawn with `data-sim-focus` and nothing here calls `.focus()`: attract never moves
 * real focus (SPEC §7). Picking which cursor the Step button drives returns both cursors to the
 * field they started on, so a pass joined halfway proves the same thing (SPEC §8). The marker is
 * positioned from its target's own layout box, never from a box the demo has just written to, and
 * every read-out holds a reserved height, so no state moves anything (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 10px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">The Step button drives</span>
          <sp-segmented class="sp-segmented" data-part="drives" data-value="review">
            <button class="sp-segment" type="button" data-part="seg-focus" value="focus"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">System focus</button>
            <button class="sp-segment" type="button" data-part="seg-review" value="review"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Review cursor</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="margin-top: 8px; gap: 12px; align-items: stretch">
          <div class="sp-surface" data-part="scene"
               style="position: relative; flex: 0 0 268px; height: 172px; padding: 8px 10px;
                      display: flex; flex-direction: column; gap: 5px">
            <span class="sp-heading" data-part="n-heading" style="font-size: 12.5px">New message</span>
            <div class="sp-input" data-part="n-to" style="height: 22px; padding: 3px 8px; font-size: 11px;
                 display: flex; align-items: center; color: var(--sp-muted)">design team</div>
            <div class="sp-input" data-part="n-body" style="height: 36px; padding: 4px 8px; font-size: 11px;
                 display: flex; align-items: flex-start">Sending the revised deck</div>
            <button class="sp-button sp-button--sm" type="button" data-part="n-send"
                    style="align-self: flex-start; font-size: 11px; padding: 4px 12px; cursor: default">Send</button>
            <span class="sp-label" data-part="n-status" style="font-size: 10px">Draft saved 2 minutes ago</span>
            <span class="sp-label" data-part="n-note" style="font-size: 10px">Attachments over 25 MB are stripped</span>

            <span data-part="marker" data-subject data-at="n-send" aria-hidden="true"
                  style="position: absolute; left: 0; top: 0; width: 0; height: 0; border: 2px dashed var(--sp-ink);
                         border-radius: 5px; pointer-events: none;
                         transition: left 0.22s var(--sp-ease), top 0.22s var(--sp-ease),
                                     width 0.22s var(--sp-ease), height 0.22s var(--sp-ease)"></span>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 auto; min-width: 0; gap: 8px">
            <div class="sp-stack" style="gap: 1px">
              <span class="sp-label" style="font-size: 9.5px">System focus is on</span>
              <span class="sp-text sp-text--ink" data-part="focus-at" data-node="n-to"
                    style="height: 17px; font-size: 11.5px">${FOCUS_NAME['n-to']}</span>
            </div>
            <div class="sp-stack" style="gap: 1px">
              <span class="sp-label" style="font-size: 9.5px">The review cursor reads</span>
              <span class="sp-text sp-text--ink" data-part="reads" data-node="n-send"
                    style="height: 46px; font-size: 11.5px; line-height: 1.35">${SAYS['n-send']}</span>
            </div>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="step"
                    style="align-self: flex-start; font-size: 11.5px">Step</button>
          </div>
        </div>

        <p class="sp-text sp-context" data-part="caption" data-drives="review"
           style="margin: 8px 0 0; height: 44px; font-size: 11px; line-height: 1.35">${CAPTION.review}</p>
      </div>
    </div>
  `;

  const marker = part(root, 'marker');
  const focusAt = part(root, 'focus-at');
  const reads = part(root, 'reads');
  const caption = part(root, 'caption');

  let drives: Drives = 'review';
  let reviewAt = REVIEW_HOME;
  let focusIndex = FOCUS_HOME;

  const paint = () => {
    const reviewNode = REVIEW_ORDER[reviewAt] ?? REVIEW_ORDER[REVIEW_HOME];
    const focusNode = FOCUS_ORDER[focusIndex] ?? FOCUS_ORDER[FOCUS_HOME];
    if (!reviewNode || !focusNode) return;

    // The marker is placed from the target's own layout box. Nothing has been written to that
    // box, so the read is honest (SPEC §5); the marker's own move is a transition.
    const target = part(root, reviewNode);
    marker.style.left = `${target.offsetLeft - 3}px`;
    marker.style.top = `${target.offsetTop - 3}px`;
    marker.style.width = `${target.offsetWidth + 6}px`;
    marker.style.height = `${target.offsetHeight + 6}px`;
    marker.dataset.at = reviewNode;

    for (const name of FOCUS_ORDER) flag(part(root, name), 'data-sim-focus', name === focusNode);

    focusAt.dataset.node = focusNode;
    focusAt.textContent = FOCUS_NAME[focusNode] ?? '';
    reads.dataset.node = reviewNode;
    reads.textContent = SAYS[reviewNode] ?? '';
  };

  // Picking a cursor returns both to the field they started on, so the walk is always the same
  // walk however a pass was joined (SPEC §8).
  const apply = (next: Drives) => {
    drives = next;
    reviewAt = REVIEW_HOME;
    focusIndex = FOCUS_HOME;
    caption.dataset.drives = next;
    caption.textContent = CAPTION[next];
    paint();
  };

  paint();

  part(root, 'step').addEventListener('click', () => {
    if (drives === 'review') reviewAt = Math.min(reviewAt + 1, REVIEW_ORDER.length - 1);
    else focusIndex = Math.min(focusIndex + 1, FOCUS_ORDER.length - 1);
    paint();
  });

  part(root, 'drives').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Drives);
  });
}
