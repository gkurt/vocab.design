import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";function n(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Orders</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="show-filters">Show filters</button>
        </div>
        <div class="sp-body">
          <div style="height: 104px">
            <div class="sp-surface" data-part="panel" style="height: 100%; padding: 10px 12px">
              <div class="sp-row sp-row--between">
                <span class="sp-heading sp-context">Filters</span>
                <button class="sp-icon-button" type="button" data-part="close" data-subject aria-label="Close filters">
                  ${t(`close`)}
                </button>
              </div>
              <div class="sp-row sp-row--wrap sp-context" style="margin-top: 12px">
                <span class="sp-chip" style="cursor: default">Unfulfilled</span>
                <span class="sp-chip" style="cursor: default">Last 30 days</span>
                <span class="sp-chip" style="cursor: default">Paid</span>
              </div>
            </div>
          </div>
          <div class="sp-stack sp-context" style="margin-top: 12px; gap: 10px">
            <div class="sp-line" style="width: 82%"></div>
            <div class="sp-line" style="width: 64%"></div>
            <div class="sp-line" style="width: 73%"></div>
          </div>
        </div>
      </div>
    </div>
  `;let r=e(n,`panel`);e(n,`close`).addEventListener(`click`,()=>{r.hidden=!0}),e(n,`show-filters`).addEventListener(`click`,()=>{r.hidden=!1})}export{n as mount};