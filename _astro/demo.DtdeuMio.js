import{n as e}from"./parts.C-YLuC7Q.js";import{r as t}from"./measure.DK7AY2_i.js";var n=8,r=320,i=200,a=2,o=400,s=(e,t,n)=>`
  <span
    class="sp-row sp-context"
    data-part="${e}"
    style="position: absolute; ${t}: 0; top: 8px; gap: 6px; pointer-events: none"
  >
    ${t===`right`?`<span class="sp-label" style="font-size: 11px">${n}</span>`:``}
    <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--sp-muted)"></span>
    ${t===`left`?`<span class="sp-label" style="font-size: 11px">${n}</span>`:``}
  </span>`;function c(c){c.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 236px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Inspector</span>
          <span class="sp-text" data-part="readout" style="width: 214px; text-align: right; white-space: nowrap">1 layer selected</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 12px">
          <div class="sp-context" style="position: relative; width: ${o}px; height: 104px">
            <div
              data-part="box"
              style="position: absolute; left: 0; top: 24px; width: ${i}px; height: 56px; border-radius: 6px; background: var(--sp-accent-soft); border: 1px solid var(--sp-accent)"
            ></div>
          </div>
          <div style="position: relative; width: ${o}px; height: 34px">
            ${s(`mark-left`,`left`,`drag left`)}
            ${s(`mark-right`,`right`,`drag right`)}
            <div
              class="sp-row sp-surface"
              data-part="field"
              data-subject
              data-value="${i}"
              data-trend="none"
              style="position: absolute; left: 50%; top: 0; transform: translateX(-50%); gap: 0; padding: 2px; border-radius: 6px"
            >
              <span
                data-part="scrub"
                style="display: flex; align-items: center; justify-content: center; width: 30px; height: 26px; border-radius: 5px; color: var(--sp-muted); font-size: 12px; font-weight: 500; cursor: ew-resize; touch-action: none; user-select: none"
              >W</span>
              <input
                class="sp-input"
                data-part="value"
                type="text"
                inputmode="numeric"
                aria-label="Width"
                value="${i}"
                style="width: 68px; height: 26px; padding: 0 8px; text-align: right; font-variant-numeric: tabular-nums"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let l=e(c,`field`),u=e(c,`scrub`),d=e(c,`box`),f=e(c,`readout`),p=e(c,`value`),m=i,h,g=(e,t,i)=>{m=Math.max(n,Math.min(r,Math.round(e))),d.style.width=`${m}px`,l.dataset.value=String(m),l.dataset.trend=t,f.textContent=i};u.addEventListener(`pointerdown`,e=>{e.isTrusted&&u.setPointerCapture(e.pointerId),h={x:t(e,c).x,value:m},u.style.background=`var(--sp-sunken)`,u.style.color=`var(--sp-ink)`,f.textContent=`Scrubbing`}),c.addEventListener(`pointermove`,e=>{if(!h)return;let n=t(e,c).x-h.x,r=n>0?`up`:n<0?`down`:`none`,i=h.value+n/a;g(i,r,`Scrubbed ${Math.round(n)} px`),p.value=String(m)});let _=()=>{h&&(h=void 0,u.style.background=``,u.style.color=``,f.textContent=`W is ${m}, set by dragging`)};c.addEventListener(`pointerup`,_),c.addEventListener(`pointercancel`,_),p.addEventListener(`pointerdown`,()=>{p.value=``,l.dataset.trend=`typing`,f.textContent=`Typing an exact number`}),p.addEventListener(`input`,()=>{let e=Number(p.value);p.value===``||!Number.isFinite(e)||g(e,`typed`,`W is ${Math.max(n,Math.min(r,Math.round(e)))}, typed exactly`)})}export{c as mount};