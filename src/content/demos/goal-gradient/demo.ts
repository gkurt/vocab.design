import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Stage = 'far' | 'mid' | 'near';

const STAGES = {
  far: {
    collected: 2,
    remaining: 8,
    tone: 'quiet',
    fillHeight: 10,
    fillOpacity: '0.5',
    gapEdge: 'transparent',
    goalEdge: 'var(--sp-line)',
    goalFill: 'var(--sp-surface)',
    readout: 'font-size: 12px; font-weight: 400; color: var(--sp-muted)',
  },
  mid: {
    collected: 7,
    remaining: 3,
    tone: 'close',
    fillHeight: 13,
    fillOpacity: '0.8',
    gapEdge: 'var(--sp-line)',
    goalEdge: 'var(--sp-muted)',
    goalFill: 'var(--sp-surface)',
    readout: 'font-size: 13px; font-weight: 500; color: var(--sp-ink)',
  },
  near: {
    collected: 9,
    remaining: 1,
    tone: 'final',
    fillHeight: 17,
    fillOpacity: '1',
    gapEdge: 'var(--sp-accent)',
    goalEdge: 'var(--sp-accent)',
    goalFill: 'var(--sp-accent-soft)',
    readout: 'font-size: 15px; font-weight: 600; color: var(--sp-accent)',
  },
} as const;

const NOTE = {
  far: 'Two cups in. The track is quiet here, the remainder is a plain number, and nothing is asking for a push.',
  mid: 'Past halfway. The stretch left is shorter than the run behind it, and the label has taken the ink.',
  near: 'One to go. The gap is small enough to name, the fill is at its heaviest, and the goal itself is ringed.',
} as const;

/**
 * Goal gradient specimen: one loyalty track shown at three absolute distances from its
 * goal. The fraction is the only thing that moves; everything else is the treatment the
 * pattern earns as the end comes into view, so the same rail reads flat at 2 of 10 and
 * urgent at 9 of 10, and the read-out counts the remainder down rather than the total up.
 *
 * The subject is the track, the narrowest element the term names (SPEC §5). The card
 * around it, the shop name, the endpoint labels and the note row under the frame are
 * scenery. No `data-pose`: a quiet track far from its goal is not a counter-example, it is
 * the low end of the gradient, and identify may honestly ring it at any of the three.
 *
 * The track box holds one height across all three states and the read-out sits in a row of
 * fixed height, so the fill thickening and the label sharpening move nothing (SPEC §5).
 * Each segment reaches an absolute distance rather than stepping from the one it found
 * (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const bar = 'position: absolute; top: 50%; translate: 0 -50%; border-radius: 999px';

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 176px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Kestrel Coffee</span>
          <span class="sp-label" style="font-size: 11px">Rewards</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">

          <div class="sp-surface" style="flex: 0 0 auto; display: flex; flex-direction: column; gap: 9px; padding: 12px 14px 11px">
            <div class="sp-row sp-row--between" style="height: 22px">
              <span class="sp-label sp-context" style="font-size: 11px">Ten cups, the eleventh is on us</span>
              <span data-part="readout" data-tone="quiet" style="${STAGES.far.readout}">8 to go</span>
            </div>

            <div data-part="track" data-subject data-stage="far" style="position: relative; height: 24px">
              <span style="${bar}; left: 0; right: 0; height: 12px; background: var(--sp-sunken)"></span>
              <span
                data-part="fill"
                style="${bar}; left: 0; width: 20%; height: 10px; background: var(--sp-accent); opacity: 0.5;
                       transition: width 0.34s var(--sp-ease), height 0.34s var(--sp-ease), opacity 0.34s"
              ></span>
              <span
                data-part="gap"
                style="${bar}; left: 20%; right: 0; height: 12px; border: 2px dashed transparent;
                       transition: left 0.34s var(--sp-ease), border-color 0.34s"
              ></span>
              <span
                data-part="goal"
                style="${bar}; right: 0; width: 16px; height: 16px; border-radius: 50%; background: var(--sp-surface);
                       border: 2px solid var(--sp-line); transition: border-color 0.34s, background-color 0.34s"
              ></span>
            </div>

            <div class="sp-row sp-row--between sp-context" style="height: 12px">
              <span class="sp-label" style="font-size: 10px">Card opened</span>
              <span class="sp-label" data-part="collected" style="font-size: 10px">2 collected</span>
              <span class="sp-label" style="font-size: 10px">Free cup</span>
            </div>
          </div>

        </div>
      </div>
      <div class="sp-row sp-context" style="gap: 12px">
        <span class="sp-text" data-part="note" style="width: 268px; height: 34px; font-size: 11px">${NOTE.far}</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-axis="Progress" data-part="pick" data-value="far">
          <button class="sp-segment" data-part="pick-far" value="far" style="padding: 5px 9px; font-size: 12px">2 of 10</button>
          <button class="sp-segment" data-part="pick-mid" value="mid" style="padding: 5px 9px; font-size: 12px">7 of 10</button>
          <button class="sp-segment" data-part="pick-near" value="near" style="padding: 5px 9px; font-size: 12px">9 of 10</button>
        </sp-segmented>
      </div>
    </div>
  `;

  const track = part(root, 'track');
  const fill = part(root, 'fill');
  const gap = part(root, 'gap');
  const goal = part(root, 'goal');
  const readout = part(root, 'readout');
  const collected = part(root, 'collected');
  const note = part(root, 'note');

  const show = (stage: Stage) => {
    const it = STAGES[stage];
    const percent = `${it.collected * 10}%`;
    track.dataset.stage = stage;
    fill.style.width = percent;
    fill.style.height = `${it.fillHeight}px`;
    fill.style.opacity = it.fillOpacity;
    gap.style.left = percent;
    gap.style.borderColor = it.gapEdge;
    goal.style.borderColor = it.goalEdge;
    goal.style.background = it.goalFill;
    readout.dataset.tone = it.tone;
    readout.setAttribute('style', it.readout);
    readout.textContent = it.remaining === 1 ? '1 to go' : `${it.remaining} to go`;
    collected.textContent = `${it.collected} collected`;
    note.textContent = NOTE[stage];
  };

  part(root, 'pick').addEventListener('change', (event) => {
    show((event as CustomEvent<string>).detail as Stage);
  });

  show('far');
}
