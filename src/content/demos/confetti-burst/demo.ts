import { icon } from '#src/kit/icons.ts';
import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The whole celebration, start to gone. Short on purpose: this is the term. */
const BURST_MS = 1100;
const COUNT = 16;
/** Paper colours, stated here because a confetti burst cannot be made of one accent. */
const PAPER = ['#e8534f', '#f2b134', '#3aa76d', '#3557e8', '#c2477f', '#31b0c6'];

const STEPS = [
  ['Pick a workspace name', true],
  ['Invite two teammates', true],
  ['Connect your calendar', false],
] as const;

const rows = STEPS.map(
  ([label, done], i) => `
    <li class="sp-list-item" style="padding: 7px 4px">
      <span
        data-part="mark-${i + 1}"
        style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 18px; height: 18px;
               border-radius: 50%; border: 1px solid var(--sp-line); background: ${done ? 'var(--sp-accent)' : 'transparent'};
               color: var(--sp-accent-ink)"
      >${done ? icon('check') : ''}</span>
      <span class="sp-grow">${label}</span>
    </li>`,
).join('');

/**
 * Confetti burst specimen: finishing the last step of a setup throws a one-shot
 * celebration over the scene. A dozen and a half paper shapes leave the button on
 * randomized arcs, tumble, and fall out of the frame inside about a second, after
 * which the layer is empty again.
 *
 * The subject is the burst layer, not the row that completed: the term names the
 * celebration, and the checklist is what is being celebrated. The layer is the
 * narrowest element that is the confetti (it is the field the particles occupy),
 * and it is deliberately not the demo's wrapper, so identify still points. An empty
 * layer is not a burst, so the honest condition lives in `data-pose` and identify
 * fires the celebration rather than ringing a scene at rest (SPEC §6).
 *
 * Particles go to `element.animate`, which `motion.css` cannot reach, so the demo
 * asks `prefersReducedMotion` itself and marks the completion with a static chip
 * instead: a slower burst would still be a field of objects flying at a reader who
 * asked for none. The layer is out of the flow, clipped, and `pointer-events: none`,
 * so a celebration can neither move the checklist nor eat a click (SPEC §5), and the
 * button keeps its width and its place in both states.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 436px; height: 244px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Set up your workspace</span>
          <span class="sp-text" data-part="readout" style="width: 84px; text-align: right; white-space: nowrap">2 of 3 done</span>
        </div>
        <div class="sp-body" style="position: relative; display: flex; align-items: center; justify-content: center">
          <div class="sp-surface sp-context" style="width: 248px; padding: 10px 14px 14px">
            <ul class="sp-list">${rows}</ul>
            <button class="sp-button" type="button" data-part="finish" style="width: 100%; margin-top: 10px">Finish setup</button>
          </div>
          <span
            data-part="burst"
            data-subject
            data-burst="idle"
            data-pose="[data-burst=fired]"
            aria-hidden="true"
            style="position: absolute; inset: 0; overflow: hidden; pointer-events: none"
          ></span>
        </div>
      </div>
    </div>
  `;

  const burst = part(root, 'burst');
  const finish = part(root, 'finish');
  const readout = part(root, 'readout');
  const mark = part(root, 'mark-3');
  const reduced = prefersReducedMotion(root);

  const throwPaper = (originX: number, originY: number) => {
    for (let i = 0; i < COUNT; i++) {
      const angle = -Math.PI / 2 + (i / (COUNT - 1) - 0.5) * 2.1 + (Math.random() - 0.5) * 0.3;
      const speed = 74 + Math.random() * 84;
      const dx = Math.cos(angle) * speed;
      const dy = Math.sin(angle) * speed;
      const spin = (Math.random() < 0.5 ? -1 : 1) * (220 + Math.random() * 320);
      const width = 5 + Math.random() * 4;

      const flake = document.createElement('span');
      flake.dataset.flake = '';
      flake.style.cssText = `position: absolute; left: ${originX}px; top: ${originY}px; width: ${width.toFixed(1)}px;
        height: ${(width * (1.2 + Math.random() * 0.8)).toFixed(1)}px; border-radius: ${Math.random() < 0.35 ? '50%' : '1px'};
        background: ${PAPER[i % PAPER.length]}; will-change: transform`;
      burst.append(flake);

      const peak = `translate(calc(-50% + ${(dx * 0.6).toFixed(1)}px), calc(-50% + ${dy.toFixed(1)}px)) rotate(${(spin * 0.45).toFixed(0)}deg)`;
      const fall = `translate(calc(-50% + ${(dx * 1.2).toFixed(1)}px), calc(-50% + ${(dy * 0.3 + 150).toFixed(1)}px)) rotate(${spin.toFixed(0)}deg)`;

      // Thrown, then dropped: the launch decelerates and the fall accelerates, which is
      // why the easing is per keyframe rather than one curve over the whole flight. The
      // paper stays opaque until the last fifth, so the burst is read rather than glimpsed.
      flake.animate(
        [
          { transform: 'translate(-50%, -50%) rotate(0deg)', opacity: 1, easing: 'cubic-bezier(0.1, 0.75, 0.35, 1)' },
          { transform: peak, offset: 0.4, easing: 'cubic-bezier(0.45, 0, 0.9, 0.75)' },
          { opacity: 1, offset: 0.8 },
          { transform: fall, opacity: 0 },
        ],
        { duration: BURST_MS * (0.85 + Math.random() * 0.15), easing: 'linear', fill: 'forwards' },
      );
    }
  };

  const chip = () => {
    const done = document.createElement('span');
    done.className = 'sp-chip';
    // Beside the card, not over it: the static stand-in has to be readable, and the
    // room it takes is room the burst layer already owned (SPEC §5).
    done.style.cssText = 'position: absolute; right: 14px; top: 14px; font-weight: 600';
    done.innerHTML = `${icon('check')}Done!`;
    burst.append(done);
  };

  finish.addEventListener('click', () => {
    if (burst.dataset.burst !== 'idle') return;
    // Measured before anything is written, and never after a style write (AGENTS.md):
    // the burst has to leave from the control that was pressed.
    const layer = burst.getBoundingClientRect();
    const source = finish.getBoundingClientRect();
    const originX = source.left + source.width / 2 - layer.left;
    const originY = source.top + source.height / 2 - layer.top;

    burst.dataset.burst = 'fired';
    finish.setAttribute('aria-disabled', 'true');
    finish.dataset.done = '';
    readout.textContent = '3 of 3 done';
    mark.style.background = 'var(--sp-accent)';
    mark.innerHTML = icon('check');

    // A stated motion preference keeps the completion and drops the celebration
    // entirely: the chip stays, since there is no burst to be over (SPEC §7).
    if (reduced) return chip();
    throwPaper(originX, originY);
    clock.setTimeout(() => {
      for (const flake of [...burst.querySelectorAll('[data-flake]')]) flake.remove();
      burst.dataset.burst = 'idle';
    }, BURST_MS + 140);
  });
}
