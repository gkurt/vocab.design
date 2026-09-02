import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var r=[{site:`Ashby`,value:74},{site:`Corby`,value:61},{site:`Deal`,value:38},{site:`Ely`,value:29},{site:`Frome`,value:12}],i=`Ashby is highest at 74 tonnes, a third of the total, with Corby behind it at 61. Deal, Ely and Frome are all under 40, and every site is below where it was in 2019.`,a={alt:{utterance:`“Quarterly emissions by site. Chart.”`,verdict:`The name of the picture, and none of its content. There is nowhere else to go.`,status:`None for this figure.`},details:{utterance:`“Quarterly emissions by site. Chart. Has details.”`,verdict:`The same name, plus a pointer the reader can follow to the full account.`,status:`Declared. Open it with Full description.`}};function o(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Figure 3</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="alt" data-axis="Alt" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-alt" value="alt"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Alt only</button>
            <button class="sp-segment" type="button" data-part="seg-details" value="details"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Long description</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="align-items: flex-start; gap: 14px; margin-top: 10px">
          <div class="sp-stack" data-part="figure" style="flex: 0 0 auto; width: 188px; gap: 9px">
            <div class="sp-stack sp-context" data-part="chart" style="gap: 9px">
              <span class="sp-label" style="font-size: 10px">Emissions by site, tonnes</span>
              <div class="sp-row" style="align-items: flex-end; gap: 9px; height: 66px; padding: 0 2px;
                                         border-bottom: 2px solid var(--sp-line)">
                ${r.map(({site:e,value:t})=>`
    <div class="sp-stack" style="flex: 1 1 0; gap: 4px; align-items: center; justify-content: flex-end; min-width: 0">
      <div style="width: 100%; height: ${Math.round(t/80*62)}px; border-radius: 3px 3px 0 0;
                  background: var(--sp-accent)"></div>
      <span class="sp-label" style="font-size: 9.5px">${e}</span>
    </div>`).join(``)}
              </div>
            </div>
            <div class="sp-row sp-context" style="height: 26px">
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="reveal"
                      aria-expanded="false" aria-controls="long-description-panel"
                      style="display: inline-flex; align-items: center; gap: 6px; font-size: 11.5px;
                             padding: 3px 10px; opacity: 0; visibility: hidden;
                             transition: opacity 0.18s, visibility 0.18s">
                ${n(`chevronRight`,`sp-icon--chevron`)}Full description
              </button>
            </div>
          </div>

          <div class="sp-stack" style="flex: 1 1 auto; min-width: 0; gap: 7px">
                          <p class="sp-text sp-text--ink" data-stage-announce data-part="utterance" data-mode="alt"
                 style="margin: 2px 0 0; height: 30px; font-size: 11.5px; line-height: 1.3">${a.alt.utterance}</p>
            
            <div class="sp-context">
              <p class="sp-text" data-stage-verdict data-part="verdict" data-mode="alt"
                 style="margin: 2px 0 0; height: 30px; font-size: 11px; line-height: 1.3">${a.alt.verdict}</p>
            </div>
          </div>
        </div>

        <div class="sp-surface" id="long-description-panel" style="margin-top: 8px; padding: 8px 10px">
          <div class="sp-row sp-row--between sp-context" style="gap: 10px; height: 16px">
            <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">Long description</span>
            <button class="sp-chip" type="button" data-part="hide"
                    style="flex: 0 0 auto; padding: 1px 8px; font-size: 10.5px; opacity: 0; visibility: hidden;
                           transition: opacity 0.18s, visibility 0.18s">Hide</button>
          </div>
          <div style="position: relative; height: 47px; margin-top: 4px">
            <p class="sp-text sp-context" data-part="status" data-mode="alt"
               style="position: absolute; inset: 0; margin: 0; font-size: 11px; line-height: 1.35;
                      transition: opacity 0.2s, visibility 0.2s">${a.alt.status}</p>
            <p class="sp-text sp-text--ink" data-part="description" data-subject
               style="position: absolute; inset: 0; margin: 0; font-size: 11px; line-height: 1.35;
                      opacity: 0; visibility: hidden;
                      transition: opacity 0.2s, visibility 0.2s">${i}</p>
          </div>
        </div>
      </div>
    </div>
  `;let s=e(o,`utterance`),c=e(o,`verdict`),l=e(o,`reveal`),u=e(o,`description`),d=e(o,`status`),f=e(o,`hide`),p=(e,t)=>{e.style.opacity=t?`1`:`0`,e.style.visibility=t?`visible`:`hidden`},m=e=>{p(u,e),p(d,!e),p(f,e),t(u,`data-open`,e),l.setAttribute(`aria-expanded`,String(e))},h=e=>{let t=a[e];s.dataset.mode=e,s.textContent=t.utterance,c.dataset.mode=e,c.textContent=t.verdict,d.dataset.mode=e,d.textContent=t.status,p(l,e===`details`),e===`alt`&&m(!1)};e(o,`mode`).addEventListener(`change`,e=>{h(e.detail)}),l.addEventListener(`click`,()=>m(!0)),f.addEventListener(`click`,()=>m(!1)),h(`alt`)}export{o as mount};