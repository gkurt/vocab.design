import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=[{key:`search`,label:`Search`,glyph:`search`,tabindex:0},{key:`filter`,label:`Filter`,glyph:`filter`,tabindex:0},{key:`sort`,label:`Sort`,glyph:`sliders`,tabindex:-1},{key:`save`,label:`Save`,glyph:`check`,tabindex:0}],r={tab:`Tab stops at the three controls carrying tabindex 0 and passes straight over Sort, every pass, in both directions.`,script:`Script put the ring on Sort. Its tabindex is still -1, so it is focusable and not tabbable: no Tab will ever land here.`,none:`Four controls, one of them out of the tab sequence. Press Tab and watch which one the ring never visits.`};function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Focus ring is on</span>
          <span class="sp-text sp-text--ink" data-part="readout" data-at="search" data-via="none"
                style="flex: 0 0 auto; width: 210px; text-align: right; font-size: 11.5px;
                       white-space: nowrap">Search, tabindex 0</span>
        </div>

        <div class="sp-surface" data-part="bar" role="toolbar" aria-label="Library"
             style="margin-top: 10px; padding: 6px; display: flex; gap: 6px; justify-content: center">
          ${n.map(({key:e,label:n,glyph:r,tabindex:i})=>`
    <div class="sp-button sp-button--quiet sp-button--sm" role="button" aria-label="${n}"
         tabindex="${i}" data-part="${e}" data-control="${e}"
         ${e===`sort`?`data-subject`:``}
         style="display: flex; flex-direction: column; align-items: center; gap: 3px;
                width: 88px; padding: 7px 0; cursor: pointer">
      ${t(r)}
      <span style="font-size: 11.5px">${n}</span>
      <span class="sp-label" style="font-size: 9px; line-height: 1">tabindex ${i}</span>
    </div>`).join(``)}
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 10px; gap: 10px; justify-content: flex-end">
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="script"
                  style="flex: 0 0 auto; font-size: 11.5px">Focus Sort</button>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-via="none"
           style="margin: 9px 0 0; height: 32px; font-size: 11px; line-height: 1.35">${r.none}</p>
      </div>
    </div>
  `;let a=e(i,`readout`),o=e(i,`caption`),s=e(i,`sort`),c=n.map(t=>e(i,t.key)),l=(e,t)=>{let n=e?.closest(`[data-control]`),i=n?.dataset.control??`other`,s=n?.getAttribute(`aria-label`)??`a control outside the toolbar`,c=n?.getAttribute(`tabindex`);a.dataset.at=i,a.dataset.via=t,a.textContent=n?`${s}, tabindex ${c}, via ${t===`tab`?`Tab`:`script`}`:`${s}, via Tab`,o.dataset.via=t,o.textContent=t===`tab`?r.tab:r.script};i.addEventListener(`keydown`,e=>{e.key!==`Tab`||e.isTrusted||(s.removeAttribute(`data-sim-focus`),l(e.target,`tab`))}),i.addEventListener(`focusin`,e=>{s.removeAttribute(`data-sim-focus`),l(e.target,`tab`)}),e(i,`script`).addEventListener(`click`,()=>{for(let e of c)e.removeAttribute(`data-sim-focus`);s.setAttribute(`data-sim-focus`,``),l(s,`script`)});let u=n[0];u&&e(i,u.key).setAttribute(`data-sim-focus`,``)}export{i as mount};