import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The curve the diagram draws, and the timing the race runs. */
const CURVE = 'cubic-bezier(0.2, 0.8, 0.2, 1)';
/** The kit's `sp-travel` runs for 1.1s; the settle beat is just past it. */
const TRAVEL_MS = 1100;

/**
 * Cubic bezier specimen: one curve drawn with its handles, beside the same curve
 * run against `linear` over one distance. The diagram says what the four numbers
 * are, and the race says what they feel like. Progress is up and time is across,
 * so the dashed diagonal is `linear` in the same picture.
 *
 * The subject is the curve diagram: the term names the description of the motion,
 * not the motion, and the tracks below are the scenery that make the description
 * legible. Their travel is the kit's `.sp-track`/`.sp-dot` animation, which
 * `motion.css` gates on the reader's behalf, so there is no `element.animate` here
 * to gate by hand. `data-running`/`data-settled` are timed on the stage's clock, so
 * a pose cannot let a run finish underneath a reader inspecting it (SPEC §6).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const lane = (id: string, label: string, timing: string) => `
    <div class="sp-stack" style="gap: 5px">
      <span class="sp-label" style="font-size: 11px">${label}</span>
      <div class="sp-row">
        <span class="sp-track" data-part="track-${id}" style="--sp-timing: ${timing}">
          <span class="sp-dot" data-part="dot-${id}"></span>
        </span>
      </div>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 404px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Four numbers, one shape</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div class="sp-row" style="align-items: center; gap: 18px; margin-top: 12px">
          <svg
            data-part="diagram"
            data-subject
            viewBox="-20 -22 140 144"
            style="display: block; width: 156px; height: 160px; flex: 0 0 auto; overflow: visible"
            role="img"
            aria-label="${CURVE} plotted with its two control handles"
          >
            <rect x="0" y="0" width="100" height="100" fill="none" stroke="var(--sp-line)" stroke-width="1" />
            <path d="M0 100 L100 0" fill="none" stroke="var(--sp-line)" stroke-width="1" stroke-dasharray="3 3" />
            <path d="M0 100 L20 20" fill="none" stroke="var(--sp-accent)" stroke-width="1" stroke-dasharray="3 2" opacity="0.7" />
            <path d="M100 0 L20 0" fill="none" stroke="var(--sp-accent)" stroke-width="1" stroke-dasharray="3 2" opacity="0.7" />
            <path d="M0 100 C20 20 20 0 100 0" fill="none" stroke="var(--sp-accent)" stroke-width="2.6" stroke-linecap="round" />
            <circle cx="0" cy="100" r="2.4" fill="var(--sp-muted)" />
            <circle cx="100" cy="0" r="2.4" fill="var(--sp-muted)" />
            <circle cx="20" cy="20" r="3.6" fill="var(--sp-accent)" />
            <circle cx="20" cy="0" r="3.6" fill="var(--sp-accent)" />
            <text x="27" y="23" font-size="8.5" fill="var(--sp-ink)">0.2, 0.8</text>
            <text x="27" y="-4" font-size="8.5" fill="var(--sp-ink)">0.2, 1</text>
            <text x="50" y="115" font-size="8.5" fill="var(--sp-muted)" text-anchor="middle">time</text>
            <text transform="translate(-8 50) rotate(-90)" font-size="8.5" fill="var(--sp-muted)" text-anchor="middle">progress</text>
          </svg>
          <div class="sp-stack sp-context" data-part="race" style="flex: 1 1 auto; gap: 16px">
            ${lane('curve', CURVE, CURVE)}
            ${lane('linear', 'linear', 'linear')}
          </div>
        </div>
      </div>
    </div>
  `;

  const race = part(root, 'race');
  let settling: number | undefined;

  const settle = () => {
    race.removeAttribute('data-running');
    race.setAttribute('data-settled', '');
  };

  const play = () => {
    clock.clearTimeout(settling);
    race.removeAttribute('data-settled');
    race.removeAttribute('data-running');
    void race.offsetWidth; // Flush the removal so the travel restarts from the left.
    race.setAttribute('data-running', '');
    settling = clock.setTimeout(settle, TRAVEL_MS + 80);
  };

  part(root, 'replay').addEventListener('click', play);
  play();
}
