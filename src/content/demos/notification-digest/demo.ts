import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Lane = 'digest' | 'separate';

const COMMENTS = [
  { mark: 'PR', who: 'Priya', text: 'I can do Thursday instead', at: '4:02' },
  { mark: 'SA', who: 'Sam', text: 'Thursday works for me too', at: '4:03' },
  { mark: 'JO', who: 'Jo', text: 'Is the 8:15 ferry still running?', at: '4:03' },
  { mark: 'MW', who: 'Max', text: 'Timetable says 8:40 now', at: '4:04' },
  { mark: 'EL', who: 'Ella', text: 'Booking the later one then', at: '4:05' },
  { mark: 'PR', who: 'Priya', text: 'Sent the link to everyone', at: '4:06' },
];

const NOTE: Record<Lane, string> = {
  digest:
    'One row for the same six comments, with the count and the newest line. One interruption, and the reading is done before the app is opened.',
  separate: 'Six comments delivered as six alerts. The same information, six interruptions, and the last one buries the first.',
};

/**
 * Notification digest specimen: the same six comments delivered two ways. The pick is the
 * whole argument of the term, because the count does not change between the lanes and the
 * number of interruptions does, which is the readout above the lanes.
 *
 * The subject is the digest row, the single element that stands for many. The lane box, the
 * six separate alerts, the interruption chip and the note are scenery (SPEC §5), and the
 * specimen mounts digested so the subject is on stage at rest (SPEC §6): in the ungrouped
 * lane there is no digest at all, so identify summons the mount state rather than ringing a
 * counter-example, and no `data-pose` is needed.
 *
 * The lane box is sized once, at mount, to the taller lane (six rows), and both lanes are
 * stacked inside it, so switching replaces content without resizing anything (SPEC §5).
 * Each segment reaches its own named lane rather than flipping the one it finds (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const rows = COMMENTS.map(
    (item) => `
      <div class="sp-surface sp-row" style="gap: 8px; height: 27px; padding: 0 8px; background: var(--sp-surface)">
        <span class="sp-label" style="flex: 0 0 auto; width: 22px; font-size: 10px">${item.mark}</span>
        <span class="sp-grow" style="font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${item.who}: ${item.text}</span>
        <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">${item.at}</span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 276px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Notifications</span>
          <sp-segmented class="sp-segmented" data-part="lane-pick" data-value="digest" data-axis="Delivery" style="flex: 0 0 auto">
            <button class="sp-segment" data-part="pick-digest" type="button" value="digest" style="padding: 4px 9px; font-size: 12px">Digested</button>
            <button class="sp-segment" data-part="pick-separate" type="button" value="separate" style="padding: 4px 9px; font-size: 12px">As they arrive</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">
          <div class="sp-row sp-row--between sp-context" data-part="lane" data-interruptions="1" style="height: 18px">
            <span class="sp-label" style="font-size: 10px">Six comments on one thread, over four minutes</span>
            <span class="sp-label" data-part="cost" style="font-size: 10px">1 interruption</span>
          </div>
          <div data-part="box" style="position: relative; flex: 1 1 auto">

            <div data-part="digest-lane" style="position: absolute; inset: 0">
              <div
                class="sp-surface sp-row"
                data-part="digest"
                data-subject
                style="gap: 10px; height: 54px; padding: 0 10px; background: var(--sp-surface); box-shadow: var(--sp-shadow)"
              >
                ${icon('bell')}
                <span class="sp-grow" style="min-width: 0">
                  <span class="sp-heading" style="display: block; font-size: 12px">6 new comments on Ferry timetable</span>
                  <span class="sp-text" style="display: block; margin-top: 1px; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">Priya: Sent the link to everyone</span>
                </span>
                <span class="sp-chip" style="flex: 0 0 auto; padding: 2px 8px; font-size: 11px; white-space: nowrap; cursor: default">6</span>
              </div>
            </div>

            <div class="sp-stack sp-context" data-part="separate-lane" hidden style="position: absolute; inset: 0; gap: 4px">${rows}</div>

          </div>
        </div>
      </div>
      <span class="sp-text sp-context" data-part="note" style="width: 452px; height: 32px; font-size: 11px; line-height: 1.35">${NOTE.digest}</span>
    </div>
  `;

  const digestLane = part(root, 'digest-lane');
  const separateLane = part(root, 'separate-lane');
  const lane = part(root, 'lane');
  const cost = part(root, 'cost');
  const note = part(root, 'note');

  part(root, 'lane-pick').addEventListener('change', (event) => {
    const next: Lane = (event as CustomEvent<string>).detail === 'separate' ? 'separate' : 'digest';
    flag(digestLane, 'hidden', next !== 'digest');
    flag(separateLane, 'hidden', next !== 'separate');
    lane.dataset.interruptions = next === 'digest' ? '1' : '6';
    cost.textContent = next === 'digest' ? '1 interruption' : '6 interruptions';
    note.textContent = NOTE[next];
  });
}
