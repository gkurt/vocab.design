import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=8,n=10,r=2,i=400,a=12,o=76,s=52,c=136,l=`repeat(${a}, ${312/a}px)`,u=`max-content max-content 1fr`,d=[{key:`item-a`,label:`Fuel`,bars:[24,18],span:`1 / 5`,cell:`1`},{key:`item-b`,label:`Chart`,bars:[58],token:`harbour-approach-chart.pdf`,span:`5 / 9`,cell:`2`},{key:`item-c`,label:`Notices`,bars:[96,70,84],span:`9 / 13`,cell:`3`}],f=(e,t)=>`
  <div
    data-part="${e.key}"
    ${t?`data-subject data-fit="fits" data-pose="[data-fit=fits]"`:`class="sp-context"`}
    style="grid-row: 1; overflow: hidden; height: ${o}px; padding: 6px; border-radius: 5px;
           background: var(--sp-surface); border: 1px solid ${t?`var(--sp-accent)`:`var(--sp-line)`}"
  >
    <span
      data-part="${e.key}-inner"
      style="display: inline-flex; flex-direction: column; align-items: flex-start; gap: 4px; white-space: nowrap"
    >
      <span style="font-size: 10px; font-weight: 500; line-height: 1.2; color: ${t?`var(--sp-ink)`:`var(--sp-muted)`}">${e.label}</span>
      ${e.token?`<span style="font-size: 12px; line-height: 1.3; color: var(--sp-ink)">${e.token}</span>`:``}
      ${e.bars.map(e=>`<span style="width: ${e}px; height: 5px; border-radius: 3px; background: ${t?`var(--sp-accent-soft)`:`var(--sp-line)`}"></span>`).join(``)}
    </span>
  </div>`;function p(p){p.innerHTML=`
    <div class="sp-app" style="gap: 8px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 216px">
        <sp-segmented data-stage-mode class="sp-segmented" data-part="modes" data-axis="Sizing" data-term="intrinsic" data-value="intrinsic" style="margin-left: auto">
            <button class="sp-segment" type="button" data-part="seg-extrinsic" value="extrinsic"
                    style="padding: 4px 10px; font-size: 11px; white-space: nowrap">extrinsic</button>
            <button class="sp-segment" type="button" data-part="seg-intrinsic" value="intrinsic"
                    style="padding: 4px 10px; font-size: 11px; white-space: nowrap">intrinsic</button>
          </sp-segmented>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; padding: 12px">
          <div
            style="display: flex; flex-direction: column; gap: 8px; width: 424px; padding: ${n}px;
                   background: var(--sp-sunken); border: ${r}px dashed var(--sp-line); border-radius: var(--sp-radius)"
          >
            <div class="sp-row sp-context" data-part="skeleton" style="width: ${i}px; height: 8px; gap: ${t}px">
              ${Array.from({length:a},()=>`<span style="flex: 1 1 0; height: 8px; border-radius: 2px; background: var(--sp-line)"></span>`).join(``)}
            </div>

            <div
              data-part="grid"
              style="display: grid; grid-template-columns: ${u}; grid-template-rows: ${o}px ${s}px;
                     gap: ${t}px; width: ${i}px; height: ${c}px"
            >
              ${d.map(e=>f(e,e.key===`item-b`)).join(``)}
              <div
                data-part="band"
                class="sp-context"
                style="grid-row: 2; grid-column: 1 / -1; display: flex; flex-direction: column; gap: 5px; overflow: hidden;
                       padding: 6px 8px; border-radius: 5px; background: var(--sp-surface); border: 1px solid var(--sp-line)"
              >
                <span class="sp-label" style="font-size: 10px">Approach notes</span>
                <span class="sp-line" style="width: 96%; height: 5px"></span>
                <span class="sp-line" style="width: 74%; height: 5px"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="sp-row sp-context" data-part="readout" style="width: 452px; justify-content: center; gap: 8px">
        ${[`short`,`name`,`tracks`].map(e=>`
          <span
            data-part="val-${e}"
            style="display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 142px; height: 20px;
                   border-radius: 5px; background: var(--sp-sunken); color: var(--sp-muted); font-size: 11px; white-space: nowrap"
          ></span>`).join(``)}
      </div>

      <span
        class="sp-text sp-context"
        data-stage-verdict data-part="note"
        role="status"
        style="display: block; width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center"
      ></span>
    </div>
  `;let m=e(p,`grid`),h=e(p,`note`),g=d.map(t=>e(p,t.key)),_=d.map(t=>e(p,`${t.key}-inner`)),v={short:e(p,`val-short`),name:e(p,`val-name`),tracks:e(p,`val-tracks`)},y=e=>{let t=e===`extrinsic`;m.style.gridTemplateColumns=t?l:u;for(let[e,n]of g.entries()){let r=d[e];r&&(n.style.gridColumn=t?r.span:r.cell)}let n=g.map((e,t)=>{let n=e.clientWidth-12,r=_[t]?.offsetWidth??0,i=r>n+1?`cut`:n-r>24?`stretched`:`fits`;return e.dataset.fit=i,{room:n,natural:r,fit:i}}),r=n[0],i=n[1];v.short.textContent=r?`short item ${r.room}px for ${r.natural}px`:``,v.name.textContent=i?`file name ${i.natural}px in ${i.room}px`:``,v.tracks.textContent=t?`tracks ${a} fixed`:`tracks content sized`,h.textContent=t?`A 12 column skeleton: one item cut, another stretched to fill.`:`Tracks sized from the content: both items get the width they need.`};e(p,`modes`).addEventListener(`change`,e=>y(e.detail)),y(`intrinsic`)}export{p as mount};