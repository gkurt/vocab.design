import { prefersReducedMotion } from '#src/kit/motion.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const MOVES = {
  full: {
    transition: 'opacity 0.26s var(--sp-ease), transform 0.26s var(--sp-ease), visibility 0.26s',
    closed: 'translateY(18px)',
    readout: 'Entrance: slides up 18px and fades, 260ms.',
  },
  reduce: {
    transition: 'opacity 0.16s linear, visibility 0.16s',
    closed: 'none',
    readout: 'Entrance: a cross fade in place, 160ms.',
  },
} as const;

const REAL_NOTE = 'Your system asks for reduced motion, so the stage already stopped playing this by itself.';
const SIM_NOTE = 'The switch simulates the setting; the real one is read by the stage, not by this demo.';

type Mode = keyof typeof MOVES;

/**
 * Reduced motion specimen: one panel with two entrances, the travelling one and the
 * cross fade that replaces it when the reader has asked for less movement. The switch
 * simulates the preference so both can be watched side by side, and says so: the real
 * preference is answered a level up, where it stops attract mode outright (SPEC §7).
 *
 * The subject is the panel, since the term names what the movement is done to. The list
 * behind it, the two controls that reach the panel's states, and the switch itself are
 * scenery. The panel is positioned over the scene rather than in its flow, so neither
 * entrance moves anything that did not change (SPEC §5). The scene is as tall as the
 * three rows behind the panel, so the list it plays over is whole rather than cut.
 */
export function mount(root: HTMLElement): void {
  const rows = ['Unread', 'Flagged', 'Sent'].map(
    (label) =>
      `<li class="sp-list-item" style="padding: 6px 10px"><span class="sp-grow">${label}</span><span class="sp-label">24</span></li>`,
  );

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 430px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-grow"></span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-axis="Simulated setting" data-value="full">
            <button class="sp-segment" data-part="seg-full" value="full">No preference</button>
            <button class="sp-segment" data-part="seg-reduce" value="reduce">Reduce motion</button>
          </sp-segmented>
        </div>
        <div class="sp-surface" data-part="scene" data-motion="full"
             style="position: relative; height: 118px; margin-top: 10px; padding: 4px 8px; background: var(--sp-sunken); overflow: hidden">
          <ul class="sp-list sp-context" style="margin: 0; padding: 0; list-style: none">${rows.join('')}</ul>
          <div class="sp-surface" data-part="panel" data-subject
               style="position: absolute; left: 12px; right: 12px; bottom: 12px; padding: 10px 12px; box-shadow: var(--sp-shadow);
                      opacity: 0; visibility: hidden; transform: translateY(18px); transition: ${MOVES.full.transition}">
            <span class="sp-heading" style="font-size: 13px">Filters</span>
            <p class="sp-text" style="margin: 4px 0 0">Unread first, flagged pinned, everything else by date.</p>
          </div>
        </div>
        <div class="sp-row sp-context" style="margin-top: 10px">
          <button class="sp-button sp-button--sm" type="button" data-part="show">Show panel</button>
          <button class="sp-button sp-button--sm sp-button--ghost" type="button" data-part="hide">Hide panel</button>
        </div>
        <p class="sp-text sp-context" data-part="readout" style="margin-top: 8px; font-size: 12px"></p>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const panel = part(root, 'panel');
  const readout = part(root, 'readout');
  // The reader's actual answer, asked of the realm the specimen is in. It cannot change
  // what the switch demonstrates, and it is the one thing the specimen must not pretend
  // about, so the demo states which of the two it is looking at.
  const note = prefersReducedMotion(root) ? REAL_NOTE : SIM_NOTE;

  let mode: Mode = 'full';
  let open = false;

  const apply = () => {
    const move = MOVES[mode];
    scene.dataset.motion = mode;
    panel.style.transition = move.transition;
    panel.style.transform = open ? 'none' : move.closed;
    panel.style.opacity = open ? '1' : '0';
    panel.style.visibility = open ? 'visible' : 'hidden';
    flag(panel, 'data-open', open);
    readout.textContent = `${move.readout} ${note}`;
  };

  apply();

  // Two controls reaching two states, rather than one control flipping between them
  // (SPEC §8): a pass can be joined halfway, and a toggle would then play it backwards.
  part(root, 'show').addEventListener('click', () => {
    open = true;
    apply();
  });

  part(root, 'hide').addEventListener('click', () => {
    open = false;
    apply();
  });

  part(root, 'segmented').addEventListener('change', (event) => {
    mode = (event as CustomEvent<string>).detail === 'reduce' ? 'reduce' : 'full';
    apply();
  });
}
