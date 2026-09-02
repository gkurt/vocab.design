import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=268,n=184,r=[{key:`wide`,label:`wide`,columns:`62px 1fr 58px`,rows:`28px 1fr 1fr 24px`,areas:[`head head head`,`nav  main side`,`nav  main side`,`foot foot foot`]},{key:`medium`,label:`medium`,columns:`74px 1fr`,rows:`28px 1fr 1fr 24px`,areas:[`head head`,`nav  main`,`nav  side`,`foot foot`]},{key:`narrow`,label:`narrow`,columns:`1fr`,rows:`28px 1fr 40px 34px 24px`,areas:[`head`,`main`,`side`,`nav`,`foot`]}],i=[{area:`head`,label:`header`},{area:`nav`,label:`nav`},{area:`main`,label:`main`},{area:`side`,label:`aside`},{area:`foot`,label:`footer`}],a=e=>`
  <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}" style="padding: 4px 10px; font-size: 11px">
    ${e.label}
  </button>`,o=(e,t)=>`
  <div
    class="sp-surface"
    data-part="area-${e.area}"
    style="display: flex; align-items: center; justify-content: center; gap: 6px; min-width: 0; overflow: hidden;
           grid-area: ${e.area}; background: var(--sp-accent-soft); border-color: var(--sp-accent-soft)"
  >
    <span class="sp-label" style="font-size: 11px; color: var(--sp-ink); overflow: hidden; text-overflow: ellipsis; white-space: nowrap">${e.label}</span>
    <span
      class="sp-avatar"
      data-part="order-${e.area}"
      style="width: 16px; height: 16px; font-size: 10px; background: var(--sp-surface)"
    >${t+1}</span>
  </div>`;function s(s){let c=r[0];s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 252px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">grid-template-areas</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="templates" data-value="${c.key}" data-axis="Layout">
            ${r.map(a).join(``)}
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px; padding: 10px 12px">
          <div style="display: flex; align-items: flex-start; gap: 12px; flex: 0 0 auto; height: ${n}px">
            <div class="sp-stack sp-context" style="flex: 0 0 auto; width: 164px; gap: 4px">
              <span
                class="sp-surface"
                data-part="listing"
                style="display: block; height: 130px; padding: 8px 10px; font-family: ui-monospace, monospace; font-size: 11px;
                       line-height: 1.55; color: var(--sp-ink); white-space: pre; overflow: hidden"
              ></span>
            </div>

            <div
              class="sp-grid"
              data-part="grid"
              data-subject
              data-template="${c.key}"
              style="flex: 0 0 auto; width: ${t}px; height: ${n}px; gap: 6px"
            >
              ${i.map(o).join(``)}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let l=e(s,`grid`),u=e(s,`listing`),d=e=>{let t=r.find(t=>t.key===e);t&&(l.dataset.template=t.key,l.style.gridTemplateColumns=t.columns,l.style.gridTemplateRows=t.rows,l.style.gridTemplateAreas=t.areas.map(e=>`"${e}"`).join(` `),u.textContent=t.areas.map(e=>`"${e}"`).join(`
`))};e(s,`templates`).addEventListener(`change`,e=>d(e.detail)),d(c.key)}export{s as mount};