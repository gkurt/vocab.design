import{n as e,r as t,t as n}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var r={region:{bordered:!0,gaps:[[0,10,10],[0,10,10]],between:16,note:`Even gaps throughout. The boundary alone says three and three.`},spacing:{bordered:!1,gaps:[[0,10,10],[0,10,10]],between:40,note:`No boundary. Only the gap between them says where one group ends.`},conflict:{bordered:!0,gaps:[[0,6,30],[0,30,6]],between:0,note:`Now the gaps pair them off across the seam. The boundary still wins.`}},i=56,a=()=>`
  <div style="display: flex; flex-direction: column; gap: 6px; flex: 0 0 auto; width: ${i}px; padding: 8px 7px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 6px">
    <span class="sp-swatch" style="width: 16px; height: 16px; --sp-swatch: var(--sp-accent-soft)"></span>
    <span class="sp-line" style="width: 100%; height: 5px"></span>
    <span class="sp-line" style="width: 62%; height: 5px"></span>
  </div>`,o=(e,t)=>`
  <div
    data-part="${e}"
    ${t}
    data-grouped
    style="display: flex; flex: 0 0 auto; padding: 5px; border: 1px solid var(--sp-line); border-radius: 8px; background: var(--sp-sunken)"
  >${[0,1,2].map(()=>`<div data-part="${e}-item">${a()}</div>`).join(``)}</div>`;function s(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-axis="Grouped by" data-term="region" data-value="region" style="margin-left: auto">
            <button class="sp-segment" type="button" data-part="seg-region" value="region">boundary</button>
            <button class="sp-segment" type="button" data-part="seg-spacing" value="spacing">spacing</button>
            <button class="sp-segment" type="button" data-part="seg-conflict" value="conflict">both</button>
          </sp-segmented>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 14px 12px">
          <div data-part="page" style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 446px; height: 148px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)">
            <div class="sp-row" style="gap: 0">
              ${o(`group-a`,`data-subject data-pose="[data-grouped]"`)}
              ${o(`group-b`,``)}
            </div>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="height: 22px; max-width: 440px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;let a=[e(i,`group-a`),e(i,`group-b`)],s=[t(i,`group-a-item`),t(i,`group-b-item`)],c=e(i,`readout`),l=e=>{let t=r[e];if(t){for(let[e,r]of a.entries()){n(r,`data-grouped`,t.bordered),r.style.borderColor=t.bordered?`var(--sp-line)`:`transparent`,r.style.background=t.bordered?`var(--sp-sunken)`:`transparent`,r.style.marginLeft=e===0?`0`:`${t.between}px`;for(let[n,r]of s[e]?.entries()??[])r.style.marginLeft=`${t.gaps[e]?.[n]??0}px`}c.textContent=t.note}};e(i,`switcher`).addEventListener(`change`,e=>l(e.detail)),l(`region`)}export{s as mount};