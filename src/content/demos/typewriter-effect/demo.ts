import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const LINE = 'Two fades sharing one span, so both are visible at the midpoint.';
const CHAR_MS = 30;

/**
 * Typewriter specimen: a console answer written a character at a time, with the
 * kit's `.sp-caret` trailing the last letter. The caret is a kit primitive
 * rather than a local one because an endless blink has to answer the stage: the
 * kit's own sheet pauses it off screen and drops it under reduced motion, which
 * a keyframe set built here would escape.
 *
 * The line's box is the full two lines from the first character, so the scenery
 * prompt underneath cannot creep upward as the sentence grows (SPEC §5). The
 * finished string is what assistive technology gets, from the `aria-label` on
 * the line, instead of sixty separate mutations.
 *
 * Under reduced motion the sentence is simply printed. Nothing is lost: the
 * animation was reporting that text was arriving, and the text has arrived.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 384px; height: 214px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Console</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div class="sp-body">
          <p class="sp-text sp-text--ink sp-context" style="margin: 0">$ vocab define crossfade</p>
          <p
            class="sp-text sp-text--ink"
            data-part="line"
            data-subject
            aria-label="${LINE}"
            style="margin: 10px 0 0; height: 46px; line-height: 1.6"
          ><span data-part="typed" aria-hidden="true"></span><span class="sp-caret"></span></p>
          <p class="sp-text sp-context" data-part="prompt" style="margin: 4px 0 0">$</p>
        </div>
      </div>
    </div>
  `;

  const line = part(root, 'line');
  const typed = part(root, 'typed');
  const view = root.ownerDocument.defaultView ?? window;
  let tick: number | undefined;

  const finish = () => {
    typed.textContent = LINE;
    line.removeAttribute('data-typing');
    line.setAttribute('data-done', '');
  };

  const run = () => {
    clock.clearTimeout(tick);
    if (view.matchMedia('(prefers-reduced-motion: reduce)').matches) return finish();

    line.setAttribute('data-typing', '');
    line.removeAttribute('data-done');
    typed.textContent = '';

    const next = () => {
      const count = (typed.textContent ?? '').length;
      if (count >= LINE.length) return finish();
      typed.textContent = LINE.slice(0, count + 1);
      tick = clock.setTimeout(next, CHAR_MS);
    };

    next();
  };

  part(root, 'replay').addEventListener('click', run);
  run();
}
