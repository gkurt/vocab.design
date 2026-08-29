import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const LIMIT = 40;
/** Where the count stops reassuring and starts warning. */
const WARN_AT = 8;
/** A pause in typing, not a keystroke, is what an announcement waits for. */
const SETTLE_MS = 900;

/**
 * Character counter specimen: the count beside a note field, ticking down toward
 * a short limit. The subject is the counter, not the field it measures.
 *
 * The visible number updates on every keystroke while the announced one waits for
 * a pause, since a live region fired per character reads the field aloud twice.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 320px">
        <div class="sp-heading sp-context">Add a note</div>
        <div class="sp-field" style="margin-top: 14px">
          <div class="sp-row sp-row--between">
            <label class="sp-label sp-context" for="vd-note">Note</label>
            <span
              class="sp-text"
              data-part="counter"
              data-subject
              data-state="ok"
              aria-hidden="true"
              style="font-size: 12px; text-align: right"
            >0/${LIMIT}</span>
          </div>
          <textarea
            class="sp-input sp-context"
            id="vd-note"
            data-part="input"
            rows="3"
            spellcheck="false"
            aria-describedby="vd-note-remaining"
            style="height: 68px; resize: none; line-height: 1.5"
          ></textarea>
          <span class="sp-visually-hidden" id="vd-note-remaining" data-stage-announce data-part="announcement" role="status"></span>
        </div>
        <div class="sp-row sp-row--between sp-context" style="margin-top: 14px">
          <button class="sp-button" data-part="post" type="button">Post note</button>
          <span class="sp-text">Visible to your team</span>
        </div>
      </div>
    </div>
  `;

  const input = part(root, 'input') as HTMLTextAreaElement;
  const counter = part(root, 'counter');
  const announcement = part(root, 'announcement');

  // Measured once (SPEC §5): the widest reading the counter can ever take, held from
  // mount so the number never nudges the label as it grows a digit.
  counter.textContent = `${LIMIT}/${LIMIT}`;
  counter.style.minWidth = `${counter.offsetWidth}px`;
  counter.textContent = `0/${LIMIT}`;

  let timer: number | undefined;
  const update = () => {
    if (input.value.length > LIMIT) input.value = input.value.slice(0, LIMIT);
    const used = input.value.length;
    const left = LIMIT - used;
    counter.textContent = `${used}/${LIMIT}`;
    counter.dataset.state = left <= WARN_AT ? 'warn' : 'ok';
    counter.style.color = left <= WARN_AT ? 'var(--sp-warn)' : '';
    clock.clearTimeout(timer);
    timer = clock.setTimeout(() => {
      announcement.textContent = left === 0 ? 'No characters remaining' : `${left} characters remaining`;
    }, SETTLE_MS);
  };

  input.addEventListener('input', update);
}
