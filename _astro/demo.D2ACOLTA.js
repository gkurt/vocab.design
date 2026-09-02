import{n as e}from"./parts.C-YLuC7Q.js";import{r as t}from"./measure.DK7AY2_i.js";var n=340,r=10,i=10,a=208,o=412,s=400,c=[{title:`Tides`,lines:[88,62]},{title:`Berths`,lines:[74,54]},{title:`Fuel`,lines:[82,48]}];function l(l){l.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 258px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-label sp-grow" style="font-size: 11px">Threshold ${n}px</span>
          <span class="sp-label" data-part="readout" role="status" style="flex: 0 0 auto; font-size: 11px; white-space: nowrap"></span>
        </div>

        <div class="sp-body" style="display: flex; align-items: flex-start; justify-content: center; padding: 12px">
          <div style="position: relative; display: flex; align-items: flex-start; gap: 2px; width: 426px; height: 100%">
            <div
              data-part="switcher"
              data-subject
              data-axis="row"
              style="display: flex; flex-wrap: wrap; align-items: stretch; gap: ${i}px; flex: 0 0 auto;
                     width: ${s}px; padding: ${r}px;
                     background: var(--sp-accent-soft); border-radius: var(--sp-radius)"
            >${c.map((e,t)=>`
      <div
        class="sp-surface"
        data-part="card-${t+1}"
        style="flex-grow: 1; flex-basis: calc((${n}px - 100%) * 999); min-width: 0; padding: 8px 10px"
      >
        <span class="sp-label" style="display: block; color: var(--sp-ink); font-weight: 600; font-size: 12px; line-height: 1.25">${e.title}</span>
        <div class="sp-stack" style="gap: 4px; margin-top: 6px">
          ${e.lines.map(e=>`<div class="sp-line" style="width: ${e}%; height: 6px"></div>`).join(``)}
        </div>
      </div>`).join(``)}</div>

            <div
              data-part="handle"
              role="separator"
              aria-label="Container width"
              style="flex: 0 0 auto; width: 8px; height: 44px; margin-top: 14px; border-radius: 999px;
                     background: var(--sp-line); cursor: ew-resize; touch-action: none"
            ></div>

            <span data-part="aim-narrow" aria-hidden="true" style="position: absolute; top: 36px; left: 246px; width: 4px; height: 4px; translate: -50% -50%; pointer-events: none"></span>
            <span data-part="aim-wide" aria-hidden="true" style="position: absolute; top: 36px; left: 406px; width: 4px; height: 4px; translate: -50% -50%; pointer-events: none"></span>
          </div>
        </div>
      </div>
    </div>
  `;let u=e(l,`switcher`),d=e(l,`handle`),f=e(l,`readout`),p=c.map((t,n)=>e(l,`card-${n+1}`)),m=()=>{let e=new Set(p.map(e=>Math.round(e.offsetTop))).size;u.dataset.axis=e===1?`row`:`column`,f.textContent=`${Math.round(u.offsetWidth)}px`},h=e=>{u.style.width=`${Math.round(Math.min(Math.max(e,a),o))}px`,m()},g=null;d.addEventListener(`pointerdown`,e=>{g={x:t(e,l).x,width:u.offsetWidth},e.isTrusted&&d.setPointerCapture(e.pointerId)}),d.addEventListener(`pointermove`,e=>{g&&h(g.width+(t(e,l).x-g.x))});let _=()=>{g=null};d.addEventListener(`pointerup`,_),d.addEventListener(`pointercancel`,_),m()}export{l as mount};