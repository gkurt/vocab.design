import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=214,n=150,r=4,i=[{key:`ltr`,label:`left to right`,css:`direction: ltr`,resolved:[`border-left`,`padding-left`,`left to right`]},{key:`rtl`,label:`right to left`,css:`direction: rtl`,resolved:[`border-right`,`padding-right`,`right to left`]},{key:`vertical`,label:`vertical`,css:`writing-mode: vertical-rl`,resolved:[`border-top`,`padding-top`,`top to bottom`]}],a=[`border-inline-start`,`padding-inline-start`,`inline axis`],o=e=>`
  <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}" style="padding: 4px 9px; font-size: 11px">
    ${e.label}
  </button>`,s=e=>`
  <div class="sp-surface" data-part="map-${e}" style="display: flex; flex-direction: column; gap: 2px; padding: 6px 8px; min-width: 0">
    <span class="sp-label" style="font-size: 10px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">${a[e]??``}</span>
    <span class="sp-heading" data-part="resolved-${e}" style="font-size: 12px; white-space: nowrap"></span>
  </div>`;function c(a){let c=i[0];a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Card preview</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="modes" data-value="${c.key}" data-axis="Flow">
            ${i.map(o).join(``)}
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px; padding: 10px 12px">
          <div style="display: flex; align-items: flex-start; gap: 14px; flex: 0 0 auto; height: ${n}px">
            <div
              data-part="card"
              data-subject
              data-mode="${c.key}"
              style="display: flex; align-items: center; gap: 10px; flex: 0 0 auto; width: ${t}px; height: ${n}px;
                     padding-inline: 20px 10px; padding-block: 14px; background: var(--sp-surface);
                     border: 1px solid var(--sp-line); border-inline-start: ${r}px solid var(--sp-accent);
                     border-radius: var(--sp-radius); direction: ltr"
            >
              <span class="sp-avatar" data-part="lead" style="width: 26px; height: 26px">HS</span>
              <span class="sp-heading" data-part="title" style="font-size: 13px">Card</span>
              <span class="sp-chip" data-part="badge" style="margin-inline-start: auto; padding: 2px 8px; font-size: 11px">3</span>
            </div>

            <div class="sp-stack sp-context" style="flex: 1 1 auto; min-width: 0; gap: 4px">
              <span class="sp-label">CSS</span>
              <span
                class="sp-surface"
                style="padding: 8px 10px; font-family: ui-monospace, monospace; font-size: 11px; line-height: 1.7; color: var(--sp-ink)"
              >
                border-inline-start: ${r}px;<br />
                padding-inline: 20px 10px;<br />
                margin-inline-start: auto;
              </span>
              <span class="sp-label" style="margin-top: 6px">Mode</span>
              <span
                class="sp-text sp-text--ink"
                data-part="mode-css"
                style="font-family: ui-monospace, monospace; font-size: 11px; height: 18px"
              ></span>
            </div>
          </div>

          <div class="sp-grid sp-context" data-part="mapping" style="flex: 0 0 auto; grid-template-columns: repeat(3, 1fr)">
            ${[0,1,2].map(s).join(``)}
          </div>
        </div>
      </div>
    </div>
  `;let l=e(a,`card`),u=e(a,`mode-css`),d=[0,1,2].map(t=>e(a,`resolved-${t}`)),f=e=>{let t=i.find(t=>t.key===e);if(t){l.dataset.mode=t.key,l.style.direction=t.key===`rtl`?`rtl`:`ltr`,l.style.writingMode=t.key===`vertical`?`vertical-rl`:`horizontal-tb`,u.textContent=t.css;for(let[e,n]of d.entries())n.textContent=t.resolved[e]??``}};e(a,`modes`).addEventListener(`change`,e=>f(e.detail)),f(c.key)}export{c as mount};