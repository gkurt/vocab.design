import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var r=[{title:`Lock 4 closure`,from:`Canal office`,body:[`96%`,`88%`,`74%`]},{title:`Winter mooring`,from:`Harbour master`,body:[`92%`,`80%`,`86%`]},{title:`Dredging survey`,from:`Survey team`,body:[`90%`,`76%`,`84%`]},{title:`Bridge repaint`,from:`Works depot`,body:[`94%`,`70%`,`88%`]},{title:`Ferry timetable`,from:`Operations`,body:[`86%`,`92%`,`68%`]}],i={wide:428,narrow:226},a=`148px`;function o(o){let s=r.map((e,t)=>`
      <button
        class="sp-list-item"
        type="button"
        data-part="item-${t}"
        ${t===0?`data-selected`:``}
        style="appearance: none; border: 0; width: 100%; font: inherit; font-size: 13px; text-align: left; background: transparent; cursor: pointer"
      >
        <span class="sp-grow" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">${e.title}</span>
      </button>`).join(``);o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 296px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Window</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Width" data-part="switcher" data-value="wide">
            <button class="sp-segment" type="button" data-part="seg-wide" value="wide">wide</button>
            <button class="sp-segment" type="button" data-part="seg-narrow" value="narrow">narrow</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; justify-content: center; align-items: center">
          <div
            class="sp-grid"
            data-part="region"
            data-subject
            data-width="wide"
            data-pane="detail"
            style="width: ${i.wide}px; height: 186px; gap: 0; grid-template-columns: ${a} 1fr; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius); overflow: hidden"
          >
            <div data-part="list" class="sp-scroll" style="min-width: 0; border-right: 1px solid var(--sp-line)">
              <div class="sp-label" style="padding: 8px 10px 4px">Notices</div>
              <div class="sp-list" style="padding: 0 4px 6px">${s}</div>
            </div>
            <div data-part="detail" data-item="0" style="min-width: 0; display: flex; flex-direction: column; padding: 10px 12px">
              <div class="sp-row" style="gap: 6px">
                <span style="flex: 0 0 auto; width: 26px">
                  <button class="sp-icon-button" type="button" data-part="back" hidden style="width: 24px; height: 24px">
                    ${n(`chevronLeft`)}
                    <span class="sp-visually-hidden">Back to notices</span>
                  </button>
                </span>
                <span class="sp-heading sp-grow" data-part="detail-title" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap"></span>
              </div>
              <span class="sp-label" data-part="detail-from" style="margin: 2px 0 10px 26px"></span>
              <div class="sp-stack" data-part="detail-body" style="gap: 8px"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let c=e(o,`region`),l=e(o,`list`),u=e(o,`detail`),d=e(o,`back`),f=e(o,`detail-title`),p=e(o,`detail-from`),m=e(o,`detail-body`),h=r.map((t,n)=>e(o,`item-${n}`)),g=e=>{let n=r[e];if(n){for(let[n,r]of h.entries())t(r,`data-selected`,n===e);u.dataset.item=String(e),f.textContent=n.title,p.textContent=n.from,m.innerHTML=n.body.map(e=>`<div class="sp-line" style="width: ${e}"></div>`).join(``),c.dataset.width===`narrow`&&_(`detail`)}},_=e=>{c.dataset.pane=e;let t=c.dataset.width===`narrow`;l.hidden=t&&e!==`list`,u.hidden=t&&e!==`detail`,d.hidden=!t},v=e=>{let t=e===`narrow`;c.dataset.width=t?`narrow`:`wide`,c.style.width=`${t?i.narrow:i.wide}px`,c.style.gridTemplateColumns=t?`1fr`:`${a} 1fr`,l.style.borderRight=t?`0`:`1px solid var(--sp-line)`,_(t?`list`:`detail`)};for(let[e,t]of h.entries())t.addEventListener(`click`,()=>g(e));d.addEventListener(`click`,()=>_(`list`)),e(o,`switcher`).addEventListener(`change`,e=>v(e.detail)),g(0),v(`wide`)}export{o as mount};