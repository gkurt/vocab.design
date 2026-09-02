var e=[{title:`Field notebook`,meta:`12 pages`},{title:`Tide log`,meta:`4 pages`},{title:`Survey report with a long title`,meta:`31 pages`},{title:`Weekly digest`,meta:`2 pages`},{title:`Harbour map`,meta:`1 page`},{title:`Species index`,meta:`18 pages`}];function t(t){t.innerHTML=`
    <div class="sp-app" data-loop="keep">
      <div class="sp-window" style="width: 432px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Templates</span>
          <span class="sp-label">6 of 24</span>
        </div>
        <ul
          class="sp-grid"
          data-part="grid"
          data-subject
          style="margin: 12px 0 0; padding: 0; list-style: none; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr))"
        >
          ${e.map((e,t)=>`
      <li class="sp-surface" data-part="card-${t+1}" style="padding: 8px; overflow: hidden">
        <div style="height: 46px; border-radius: 5px; background: var(--sp-sunken)"></div>
        <div class="sp-text sp-text--ink" data-part="title-${t+1}"
             style="margin-top: 8px; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">${e.title}</div>
        <div class="sp-label" style="margin-top: 2px">${e.meta}</div>
      </li>`).join(``)}
        </ul>
      </div>
    </div>
  `}export{t as mount};