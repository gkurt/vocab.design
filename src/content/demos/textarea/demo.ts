import { flag, part } from '#src/kit/parts.ts';

/**
 * Text area specimen: a report box holding an answer that runs past the room it
 * was given. The subject is the `<textarea>` itself and nothing around it, since
 * the label, the readout, and the Post button are scenery this box needs in
 * order to be watchable, not part of what the word names.
 *
 * The demonstration is that the box keeps the height it mounted with. Text past
 * the third row scrolls inside it instead of pushing the row below down, which
 * is the whole distinction from an auto-growing field, and the readout reports
 * both facts so the claim is checkable rather than asserted (SPEC §5, §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 380px; height: 220px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Maintenance report</span>
          <span class="sp-text">Draft</span>
        </div>
        <div class="sp-body">
          <div class="sp-field">
            <label class="sp-label sp-context" for="vd-textarea-note">What happened?</label>
            <textarea
              class="sp-input"
              id="vd-textarea-note"
              data-part="box"
              data-subject
              rows="3"
              spellcheck="false"
              placeholder="Describe the problem in as much detail as you need"
              style="height: 75px; line-height: 1.55; resize: vertical"
            ></textarea>
          </div>
          <div class="sp-row sp-row--between sp-context" style="margin-top: 10px">
            <span class="sp-text" data-part="measure"></span>
            <button class="sp-button sp-button--sm" data-part="post" type="button">Post</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // The line height is pinned rather than inherited because the box is sized in
  // rows: three of them visible, and a fourth is what the scrolling is made of.
  const box = part(root, 'box') as HTMLTextAreaElement;
  const measure = part(root, 'measure');

  // The height to hold everything against. Read once, from the box as mounted, so
  // a reader dragging the resize grip is reported honestly rather than silently.
  const mounted = box.offsetHeight;

  const report = () => {
    const steady = box.offsetHeight === mounted;
    const overflowing = box.scrollHeight > box.clientHeight + 1;
    flag(measure, 'data-steady', steady);
    flag(measure, 'data-overflow', overflowing);
    measure.textContent = steady
      ? `Box ${mounted}px, unchanged. ${overflowing ? 'Text scrolls inside it.' : 'Text fits.'}`
      : `Box ${box.offsetHeight}px, resized by hand.`;
  };

  box.addEventListener('input', () => {
    // What a real caret does on its own: typing keeps the newest line in view.
    box.scrollTop = box.scrollHeight;
    report();
  });

  // Posting reaches one state rather than flipping between two (SPEC §8): the box
  // is emptied and back to the height it never left.
  part(root, 'post').addEventListener('click', () => {
    box.value = '';
    box.scrollTop = 0;
    report();
  });

  report();
}
