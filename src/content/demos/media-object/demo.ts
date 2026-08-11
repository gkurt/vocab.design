/**
 * Media object specimen: a fixed size figure beside a body that takes the rest of
 * the row. The subject is the outer media object itself, since the term names the
 * pairing rather than either half of it.
 *
 * Below it, in scenery, the same shape with one nested inside its own body: the
 * property that lets a reply chain be built out of the layout it is already made
 * of, shown rather than claimed.
 */
const MEDIA = 'display: flex; align-items: flex-start; gap: 12px';

export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 420px">
        <span class="sp-label sp-context">Comments</span>
        <div data-part="media" data-subject style="${MEDIA}; margin-top: 10px">
          <span class="sp-avatar" data-part="figure" style="width: 40px; height: 40px; font-size: 13px">RS</span>
          <div class="sp-grow" data-part="body">
            <span class="sp-heading">Rosa Silva</span>
            <div class="sp-text" style="margin-top: 4px">
              The figure keeps its own size and the body takes what is left, so the second line
              wraps under the first line of text instead of sliding under the picture.
            </div>
          </div>
        </div>
        <div class="sp-divider" style="margin: 14px 0"></div>
        <div class="sp-context" data-part="outer" style="${MEDIA}">
          <span class="sp-avatar" style="width: 40px; height: 40px; font-size: 13px">TK</span>
          <div class="sp-grow">
            <span class="sp-heading">Tomas Krall</span>
            <div class="sp-text" style="margin-top: 4px">Nesting is the third property: a body can hold another one.</div>
            <div data-part="nested" style="${MEDIA}; margin-top: 10px; gap: 8px">
              <span class="sp-avatar" style="width: 24px; height: 24px; font-size: 10px">RS</span>
              <div class="sp-grow">
                <span class="sp-text sp-text--ink" style="font-weight: 500">Rosa Silva</span>
                <div class="sp-text">Same layout, one depth down, no new rules.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
