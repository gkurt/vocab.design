const OPENING =
  'he harbour master kept a separate book for the winter of 1911, when nine vessels sheltered in the outer ' +
  'basin on a single night, more than the moorings had ever been built to hold. Two of them dragged their ' +
  'anchors before dawn and were beached on the shingle at the eastern end of the bay, where the water runs ' +
  'shallow for a mile.';

/**
 * Drop cap specimen: an article opening whose first letter is sunk into three
 * lines of its own paragraph. The subject is the letter, so it has to be an
 * element the stage can ring, which is why the specimen floats a span rather
 * than styling `::first-letter` (a pseudo-element is nothing to point at).
 *
 * The cap is sized from the paragraph's own rhythm: 13px type on 19.5px lines,
 * so a 68px letter on a 57px line box has its cap height meet the top of line
 * one and its baseline meet line three.
 *
 * The second paragraph used to read "Everything after it is ordinary text again,
 * which is the point: the mark works because it happens once." That was the site
 * explaining its own picture inside a magazine feature, so it now carries on with
 * the article instead. The paragraph itself stays, because the cap only reads as a
 * cap when there is plain text under it.
 *
 * The feature it carried was a history of drop caps, which made the mock article an
 * essay about the thing it was demonstrating. It is a harbour record now, at the same
 * length, so the cap still meets three lines and the paragraph under it still wraps.
 * The opening letter stays a T, since the span holds the letter and the copy holds
 * the rest of the word.
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
          <p class="sp-context" data-part="follow">Salvage crews had both hulls clear of the shingle by the following spring, and the basin was widened the year after that.</p>
        </div>
      </div>
    </div>
  `;
}
