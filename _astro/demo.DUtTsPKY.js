import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n={even:{within:12,between:12,boxed:!1,note:`Every gap is 12px. The third label is as close to the field above it as to its own, so the pairs have to be read rather than seen.`},spacing:{within:3,between:22,boxed:!1,note:`3px inside a pair, 22px between pairs. Nothing has been drawn, and the three pairs are already obvious.`},boxes:{within:3,between:8,boxed:!0,note:`Enclosure says the same thing, louder: three more borders on the page to make a point the spacing had already made.`}},r=[{label:`Card number`,value:`4242 4242 4242 4242`},{label:`Expiry`,value:`09 / 28`},{label:`Security code`,value:`• • •`}];function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 276px; height: auto">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Grouping</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-value="spacing" data-axis="Method" data-term="spacing">
            <button class="sp-segment" type="button" data-part="seg-even" value="even">even</button>
            <button class="sp-segment" type="button" data-part="seg-spacing" value="spacing">spacing</button>
            <button class="sp-segment" type="button" data-part="seg-boxes" value="boxes">boxes</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; align-items: flex-start; gap: 14px; padding: 12px">
          <div class="sp-surface" data-part="card" style="flex: 0 0 auto; width: 250px; height: 212px; padding: 8px 10px">
            <div class="sp-stack" data-part="fields" data-subject data-mode="spacing" data-pose="[data-mode=spacing]" style="gap: 22px">
              ${r.map((e,t)=>`
      <div class="sp-stack" data-part="group-${t+1}" style="gap: 3px">
        <span class="sp-label" data-part="label-${t+1}">${e.label}</span>
        <div class="sp-input" data-part="field-${t+1}" style="padding: 3px 8px; font-size: 12px; color: var(--sp-muted)">${e.value}</div>
      </div>`).join(``)}
            </div>
          </div>
          <span class="sp-text" data-stage-verdict data-part="readout" style="display: none"></span>
        </div>
      </div>
    </div>
  `;let a=e(i,`fields`),o=e(i,`readout`),s=r.map((t,n)=>e(i,`group-${n+1}`)),c=e=>{let r=n[e];if(r){a.dataset.mode=e,a.style.gap=`${r.between}px`;for(let e of s)e.style.gap=`${r.within}px`,e.style.padding=r.boxed?`5px 8px`:`0`,e.style.border=r.boxed?`1px solid var(--sp-line)`:`1px solid transparent`,e.style.borderRadius=`var(--sp-radius)`,t(e,`data-boxed`,r.boxed);o.textContent=r.note}};e(i,`switcher`).addEventListener(`change`,e=>c(e.detail)),c(`spacing`)}export{i as mount};