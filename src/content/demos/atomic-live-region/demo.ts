import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The beat between the region changing and a polite queue getting to read it out. */
const SPEAK_MS = 600;

/** The gate keeps moving, so every press of the button reaches a new state (SPEC §8). */
const GATES = ['B4', 'B7', 'B12', 'C3'];

const FLIGHT = 'AA21';
const TIME = '14:20';

const CAPTION = {
  true: 'The whole region is one unit, so changing the gate has the reader say the flight and the time again. The new gate arrives with something to attach it to.',
  false:
    'The default. Only the node that changed is announced, so the reader hears a gate number with no flight and no time anywhere near it.',
} as const;

/**
 * Atomic live region specimen: a departure line whose gate keeps moving, beside a transcript
 * of what a screen reader would say each time. With `aria-atomic="true"` the whole line is
 * read back; with the attribute's default of `false` the reader gets the gate number alone,
 * which is a fact with nothing attached to it.
 *
 * The transcript is an instrument this specimen draws, so it is titled with the instrument's
 * name. It read "Screen reader, polite queue", which explained the mechanism in the site's
 * voice over a pane that already shows the queue waiting its turn.
 *
 * The subject is the region element that carries `aria-atomic`. It is a container, and it is
 * still the narrowest element the term names: the setting is an attribute on the marked
 * region, and ringing the gate value would identify the fragment rather than the region whose
 * announcement is at stake. The button, the picker, the transcript and the caption are
 * scenery (SPEC §5). A region set to `false` is not what the term names, and it is a state
 * this region passes through, so the honest condition is declared in `data-pose` and the mount
 * state satisfies it (SPEC §6).
 *
 * The queue's delay comes from the DemoClock, so a pose can hold the transcript still. Every
 * changing value sits in a box of its own reserved width, so nothing moves (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const field = (label: string, value: string, name?: string, width = 'auto') => `
    <div class="sp-stack" style="gap: 2px; flex: 0 0 auto">
      <span class="sp-label" style="font-size: 9.5px">${label}</span>
      <span class="sp-text sp-text--ink" ${name ? `data-part="${name}"` : ''}
            style="font-size: 13.5px; font-weight: 500; width: ${width}">${value}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="change"
                  style="flex: 0 0 auto; font-size: 11.5px">Gate change</button>
          <div class="sp-row" style="gap: 8px; flex: 0 0 auto">
            <sp-segmented data-stage-mode class="sp-segmented" data-axis="aria-atomic" data-term="true" data-part="atomic" data-value="true">
              <button class="sp-segment" type="button" data-part="seg-true" value="true"
                      style="padding: 4px 12px; font-size: 11.5px">true</button>
              <button class="sp-segment" type="button" data-part="seg-false" value="false"
                      style="padding: 4px 12px; font-size: 11.5px">false</button>
            </sp-segmented>
          </div>
        </div>

        <div class="sp-surface" data-part="region" data-subject data-atomic="true" data-pose="[data-atomic=true]"
             role="status" aria-live="polite" aria-atomic="true"
             style="margin-top: 10px; padding: 10px 14px">
          <div class="sp-row" style="gap: 34px">
            ${field('Flight', FLIGHT)}
            ${field('Gate', GATES[0] ?? '', 'gate', '38px')}
            ${field('Departs', TIME)}
          </div>
        </div>

        <div class="sp-surface sp-context" style="margin-top: 10px; padding: 8px 10px">
          <span class="sp-label">Screen reader</span>
          <p class="sp-text" data-part="heard" data-state="idle" data-mode="whole"
             style="margin: 4px 0 0; height: 20px; font-size: 11.5px">Nothing announced yet</p>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-atomic="true"
           style="margin: 8px 0 0; height: 32px; font-size: 11px; line-height: 1.35">${CAPTION.true}</p>
      </div>
    </div>
  `;

  const region = part(root, 'region');
  const gate = part(root, 'gate');
  const heard = part(root, 'heard');
  const caption = part(root, 'caption');

  let atomic = true;
  let index = 0;
  let pending: number | undefined;

  const idle = () => {
    clock.clearTimeout(pending);
    heard.dataset.state = 'idle';
    heard.className = 'sp-text';
    heard.textContent = 'Nothing announced yet';
  };

  const apply = (next: boolean) => {
    atomic = next;
    index = 0;
    region.dataset.atomic = String(next);
    region.setAttribute('aria-atomic', String(next));
    gate.textContent = GATES[0] ?? '';
    heard.dataset.mode = next ? 'whole' : 'fragment';
    caption.dataset.atomic = String(next);
    caption.textContent = next ? CAPTION.true : CAPTION.false;
    idle();
  };

  part(root, 'change').addEventListener('click', () => {
    index = (index + 1) % GATES.length;
    const value = GATES[index] ?? '';
    gate.textContent = value;

    // The queue is not the page: what the reader hears arrives a beat later, and how much
    // of the region it covers is the whole of what aria-atomic decides.
    clock.clearTimeout(pending);
    heard.dataset.state = 'queued';
    heard.className = 'sp-text';
    heard.textContent = 'queued';
    pending = clock.setTimeout(() => {
      heard.dataset.state = 'spoken';
      heard.className = 'sp-text sp-text--ink';
      heard.textContent = atomic ? `“Flight ${FLIGHT}, gate ${value}, departs ${TIME}”` : `“${value}”`;
    }, SPEAK_MS);
  });

  part(root, 'atomic').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail === 'true');
  });

  apply(true);
}
