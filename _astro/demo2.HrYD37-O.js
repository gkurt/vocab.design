import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={metered:`46px`,hard:`100%`};function n(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">The Harbour Review</span></div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column; padding: 0">
          <div data-part="article" style="position: relative; flex: 1 1 auto; min-height: 0; overflow: hidden; padding: 12px 16px 0">
            <span class="sp-heading">The quay rebuilds itself, slowly</span>
            <div class="sp-prose" style="margin-top: 6px; --sp-measure: 60ch">
              <p>The crane arrived on a Tuesday and nobody could say who had ordered it.</p>
              <p>By the second week the harbour office had three answers and a folder.</p>
            </div>
            <div data-part="wash" aria-hidden="true"
                 style="position: absolute; left: 0; right: 0; bottom: 0; height: ${t.metered};
                        background: linear-gradient(to bottom, transparent, var(--sp-sunken))"></div>
          </div>
          <div style="flex: 0 0 auto; padding: 0 16px 14px">
            <div class="sp-surface" data-part="wall" data-subject style="padding: 12px 14px; box-shadow: var(--sp-shadow)">
              <div class="sp-stack" style="gap: 8px">
                <span class="sp-heading">Subscribe to keep reading</span>
                <div style="height: 20px">
                  <span class="sp-text" data-part="meter">2 of 3 free articles read this month</span>
                </div>
                <div class="sp-row" style="gap: 8px">
                  <button class="sp-button sp-button--sm" data-part="subscribe" type="button">Subscribe, 4.00 a month</button>
                  <button class="sp-button sp-button--ghost sp-button--sm" data-part="signin" type="button">Sign in</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <sp-segmented data-stage-mode class="sp-segmented sp-context" data-part="placement" data-axis="Type" data-value="metered">
        <button class="sp-segment" data-part="placement-metered" value="metered">Metered</button>
        <button class="sp-segment" data-part="placement-hard" value="hard">Hard</button>
      </sp-segmented>
    </div>
  `;let r=e(n,`wash`),i=e(n,`meter`);e(n,`placement`).addEventListener(`change`,e=>{let n=e.detail===`hard`?`hard`:`metered`;r.style.height=t[n],i.hidden=n===`hard`})}export{n as mount};