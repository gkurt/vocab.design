const OPENING =
  'he opening letter of an article has been drawn oversized since scribes illuminated manuscripts by hand, ' +
  'long before there were presses to set type on. Sinking it into the first lines gives the page a place to ' +
  'start reading, which is the whole job: someone scanning a spread should find the beginning without being ' +
  'told where it is.';

/**
 * Drop cap specimen: an article opening whose first letter is sunk into three
 * lines of its own paragraph. The subject is the letter, so it has to be an
 * element the stage can ring, which is why the specimen floats a span rather
 * than styling `::first-letter` (a pseudo-element is nothing to point at).
 *
 * The cap is sized from the paragraph's own rhythm: 13px type on 19.5px lines,
 * so a 68px letter on a 57px line box has its cap height meet the top of line
 * one and its baseline meet line three.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 400px">
        <span class="sp-label sp-context">Feature</span>
        <div class="sp-prose" style="max-width: none; margin-top: 10px">
          <p data-part="opening" style="margin: 0"><span
            data-part="cap"
            data-subject
            style="float: left; font-size: 68px; line-height: 57px; margin: 1px 8px 0 0"
          >T</span><span class="sp-context">${OPENING}</span></p>
          <p class="sp-context" data-part="follow">Everything after it is ordinary text again, which is the point: the mark works because it happens once.</p>
        </div>
      </div>
    </div>
  `;
}
