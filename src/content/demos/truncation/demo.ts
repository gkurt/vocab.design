const TITLE = 'Quarterly platform reliability review and incident retrospective, payments team';

/**
 * Truncation specimen: one title, one width, three fates. The subject is the
 * single-line cut, the two beneath it are the readings it is judged against
 * (a two-line clamp, and the whole string allowed to wrap). Nothing here
 * changes state, so the comparison itself is the demonstration.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 264px">
        <div class="sp-stack" style="gap: 4px">
          <span class="sp-label sp-context">text-overflow: ellipsis</span>
          <p
            class="sp-text sp-text--ink"
            data-part="single"
            data-subject
            style="margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap"
          >${TITLE}</p>
        </div>
        <div class="sp-divider sp-context" style="margin: 14px 0"></div>
        <div class="sp-stack sp-context" style="gap: 4px">
          <span class="sp-label">line-clamp: 2</span>
          <p
            class="sp-text sp-text--ink"
            data-part="clamp"
            style="margin: 0; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden"
          >${TITLE}</p>
        </div>
        <div class="sp-divider sp-context" style="margin: 14px 0"></div>
        <div class="sp-stack sp-context" style="gap: 4px">
          <span class="sp-label">no limit</span>
          <p class="sp-text sp-text--ink" data-part="full" style="margin: 0">${TITLE}</p>
        </div>
      </div>
    </div>
  `;
}
