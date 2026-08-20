import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

type Stage = 'sending' | 'sent' | 'delivered' | 'read';

const LABEL: Record<Stage, string> = {
  sending: 'Sending',
  sent: 'Sent',
  delivered: 'Delivered',
  read: 'Read',
};

const READOUT: Record<Stage, string> = {
  sending: 'Sending: still on this phone, and not yet anybody else’s problem.',
  sent: 'Sent: it left this phone. Nothing at all is known about hers yet.',
  delivered: 'Delivered: it reached her phone. Nobody has necessarily looked at it.',
  read: 'Read: her app reported the message on screen, which is not quite the same as read.',
};

/** How long each stage holds before the next one. The last stage is the resting one. */
const HOLD: Record<Stage, number> = { sending: 900, sent: 1300, delivered: 1600, read: 0 };

const NEXT: Partial<Record<Stage, Stage>> = { sending: 'sent', sent: 'delivered', delivered: 'read' };

const INCOMING = ['Are we still on for Thursday?', 'Bring the tide tables if you have them.'];

/**
 * Read receipt specimen: one outgoing message whose status marker walks the three facts
 * the network can actually report, one tick, two ticks, then two coloured ticks with a
 * time. The walk runs on the stage's clock, so a pose taken mid-walk holds the stage it
 * was taken in rather than running on under the reader's eye.
 *
 * The subject is the marker, given its own element: the term names the status corner,
 * not the bubble it sits in and not the thread. The conversation, the readout and the
 * send control are scenery (SPEC §5), and the control sits outside the chat so it never
 * reads as a chat's own composer.
 *
 * The marker is sized for its widest state from mount and the ticks swap without a fade,
 * so the walk moves nothing (SPEC §5) and no claim is ever made about a mark on its way
 * out (SPEC §8).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const incoming = INCOMING.map(
    (text) => `
      <div class="sp-row sp-context" style="justify-content: flex-start">
        <span class="sp-text sp-text--ink" style="max-width: 220px; padding: 7px 10px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 12px 12px 12px 3px; font-size: 12px">${text}</span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 440px; height: 230px">
        <div class="sp-topbar sp-context">
          <span class="sp-avatar" style="width: 24px; height: 24px; font-size: 10px">ID</span>
          <span class="sp-heading sp-grow" style="font-size: 13px">Ines Duarte</span>
          <span class="sp-text">Thursday</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; justify-content: flex-end; gap: 8px">
          ${incoming}
          <div class="sp-row" style="justify-content: flex-end">
            <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 4px; width: 236px; padding: 7px 10px; background: var(--sp-accent-soft); border-radius: 12px 12px 3px 12px">
              <span class="sp-text sp-text--ink" style="align-self: flex-start; font-size: 12px">Yes, 9am at the harbour office. Tables are in my bag.</span>
              <span
                class="sp-row"
                data-part="marker"
                data-subject
                data-state="sent"
                role="status"
                style="justify-content: flex-end; gap: 4px; width: 96px; height: 14px; color: var(--sp-muted)"
              >
                <span data-part="marker-label" style="font-size: 10px; line-height: 14px; white-space: nowrap">Sent</span>
                <span data-part="marker-time" hidden style="font-size: 10px; line-height: 14px; white-space: nowrap">14:32</span>
                <span data-part="tick-wait" hidden style="display: inline-block; width: 11px; height: 11px; border: 1.6px solid currentColor; border-radius: 50%"></span>
                <span data-part="tick-single" style="display: inline-flex"><svg viewBox="0 0 18 12" width="15" height="10" aria-hidden="true"><path d="M1.8 6.4 5.2 9.8 12.6 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                <span data-part="tick-double" hidden style="display: inline-flex"><svg viewBox="0 0 18 12" width="15" height="10" aria-hidden="true"><path d="M1.4 6.4 4.4 9.6 10.4 2.4M7.2 6.4 10.2 9.6 16.2 2.4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="sp-row sp-context" style="gap: 14px">
        <span class="sp-text" data-part="readout" style="width: 322px; height: 30px; font-size: 11px; line-height: 1.35">${READOUT.sent}</span>
        <button class="sp-button sp-button--ghost sp-button--sm" data-part="send" type="button" style="flex: 0 0 auto; white-space: nowrap">Send again</button>
      </div>
    </div>
  `;

  const marker = part(root, 'marker');
  const label = part(root, 'marker-label');
  const time = part(root, 'marker-time');
  const readout = part(root, 'readout');
  const wait = part(root, 'tick-wait');
  const single = part(root, 'tick-single');
  const double = part(root, 'tick-double');

  let timer: number | undefined;

  const paint = (stage: Stage) => {
    marker.dataset.state = stage;
    label.textContent = LABEL[stage];
    time.hidden = stage !== 'read';
    wait.hidden = stage !== 'sending';
    single.hidden = stage !== 'sent';
    double.hidden = stage !== 'delivered' && stage !== 'read';
    // The colour is this product's convention and nothing more, which is the article's point.
    marker.style.color = stage === 'read' ? 'var(--sp-accent)' : 'var(--sp-muted)';
    readout.textContent = READOUT[stage];
  };

  const walk = (stage: Stage) => {
    paint(stage);
    const next = NEXT[stage];
    if (!next) return;
    timer = clock.setTimeout(() => walk(next), HOLD[stage]);
  };

  // Sending reaches a named stage rather than flipping the one it finds (SPEC §8), so the
  // walk starts from the top however late a pass is picked up.
  part(root, 'send').addEventListener('click', () => {
    clock.clearTimeout(timer);
    walk('sending');
  });

  paint('sent');
}
