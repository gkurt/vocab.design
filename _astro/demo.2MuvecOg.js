import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={uk:{name:`United Kingdom`,line:`Prices in GBP. Ships from Leeds.`},de:{name:`Germany`,line:`Prices in EUR. Ships from Hamburg.`},jp:{name:`Japan`,line:`Prices in JPY. Ships from Osaka.`}},n={request:`Choosing a region changes nothing. The page reloads when Go is pressed, and not before.`,input:`The pick alone reloads the page. A keyboard reader passing through the options never reaches the one they wanted.`};function r(r){let i=(e,n)=>`
    <li class="sp-option" role="option" data-part="option-${e}" data-region="${e}"
        aria-selected="${n}" style="padding: 4px 8px; font-size: 12px">${t[e].name}</li>`;r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 440px; padding: 14px 16px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Picker reloads" data-term="request" data-part="segmented" data-value="request">
            <button class="sp-segment" data-part="seg-request" value="request">On request</button>
            <button class="sp-segment" data-part="seg-input" value="input">On input</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="picker" data-subject data-pose="[data-mode=request]" data-mode="request"
             style="margin-top: 12px; padding: 10px 12px; display: flex; gap: 12px; align-items: flex-start">
          <div style="flex: 1 1 auto; min-width: 0">
            <span class="sp-label">Delivery region</span>
            <ul class="sp-listbox sp-listbox--static" role="listbox" data-part="options"
                style="margin-top: 6px; box-shadow: none">
              ${i(`uk`,!0)}${i(`de`,!1)}${i(`jp`,!1)}
            </ul>
          </div>
          <div style="position: relative; flex: 0 0 92px; height: 30px; margin-top: 22px">
            <button class="sp-button sp-button--sm" type="button" data-part="go"
                    style="position: absolute; inset: 0">Go</button>
          </div>
        </div>

        <div class="sp-surface sp-context" data-part="page" data-view="uk"
             style="margin-top: 10px; padding: 8px 10px; height: 46px">
          <span class="sp-label">The page</span>
          <p class="sp-text sp-text--ink" data-part="page-line"
             style="margin: 2px 0 0; font-size: 12px; white-space: nowrap">${t.uk.line}</p>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-case="request"
           style="margin: 6px 0 0; height: 34px; font-size: 11px">${n.request}</p>
      </div>
    </div>
  `;let a=e(r,`picker`),o=e(r,`go`),s=e(r,`page`),c=e(r,`page-line`),l=e(r,`caption`),u=e(r,`options`),d=[...u.querySelectorAll(`.sp-option`)],f=`request`,p=`uk`,m=e=>{s.dataset.view=e,c.textContent=t[e].line},h=e=>{p=e;for(let t of d)t.setAttribute(`aria-selected`,String(t.dataset.region===e));f===`input`&&m(e)},g=e=>{f=e,a.dataset.mode=e,o.style.visibility=e===`request`?`visible`:`hidden`,l.dataset.case=e,l.textContent=n[e],h(`uk`),m(`uk`)};u.addEventListener(`click`,e=>{let t=e.target.closest(`.sp-option`)?.dataset.region;t&&h(t)}),o.addEventListener(`click`,()=>m(p)),e(r,`segmented`).addEventListener(`change`,e=>{g(e.detail===`input`?`input`:`request`)})}export{r as mount};