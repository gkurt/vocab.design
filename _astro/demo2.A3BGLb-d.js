import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=10,n=[`harbour`,`tide tables`,`berth 4`,`winter`,`moorings and anchorages`,`RNLI`],r=[{key:`narrow`,label:`narrow`,width:210},{key:`medium`,label:`medium`,width:300},{key:`wide`,label:`wide`,width:420}];function i(i){let a=n.map((e,t)=>`<span class="sp-chip" data-part="tag-${t}" style="cursor: default; background: var(--sp-surface)">${e}</span>`).join(``);i.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 268px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Tags</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="widths" data-axis="Width" data-value="narrow">
            ${r.map(e=>`
              <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}" style="padding: 4px 11px; font-size: 11px">${e.label}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 12px">
          <div
            data-part="cluster"
            data-subject
            data-width="narrow"
            data-lines="0"
            style="display: flex; flex-wrap: wrap; align-items: center; justify-content: flex-start; gap: ${t}px;
                   width: ${r[0]?.width}px; padding: ${t}px; background: var(--sp-accent-soft); border-radius: var(--sp-radius)"
          >${a}</div>
        </div>
      </div>
    </div>
  `;let o=e(i,`cluster`),s=n.map((t,n)=>e(i,`tag-${n}`)),c=e=>{let t=r.find(t=>t.key===e);if(!t)return;o.style.width=`${t.width}px`,o.dataset.width=t.key;let n=new Set(s.map(e=>Math.round(e.offsetTop))).size;o.dataset.lines=String(n)};e(i,`widths`).addEventListener(`change`,e=>c(e.detail)),c(`narrow`)}export{i as mount};