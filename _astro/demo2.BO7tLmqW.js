import{n as e}from"./parts.C-YLuC7Q.js";import{r as t}from"./measure.DK7AY2_i.js";var n=176,r=152,i=4,a=214,o=392,s=388,c=168,l=e=>`<div class="sp-line" style="width: ${e}; height: 6px"></div>`,u=(e,t,a)=>`
  <div data-part="${e}" style="display: inline-block; vertical-align: top; width: 100%;
       max-width: ${n}px; min-width: ${r}px; margin: 0 ${i}px; padding: 8px 9px;
       background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 6px">
    <span class="sp-label" style="display: block; color: var(--sp-ink); font-weight: 600; font-size: 11px; line-height: 1.4">${t}</span>
    <div class="sp-stack" style="gap: 5px; margin-top: 6px">${a.map(l).join(``)}</div>
  </div>`;function d(l){l.innerHTML=`
    <div class="sp-app" style="gap: 9px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 268px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 12px">Column: 100%, max ${n}px, min ${r}px</span>
          <span class="sp-label" data-part="readout" role="status" style="flex: 0 0 auto; font-size: 11px; white-space: nowrap"></span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 9px; padding: 8px 10px">
          <div style="position: relative; display: flex; align-items: flex-start; gap: 2px; width: 404px">
            <div data-part="fluid" data-subject data-flow="row"
                 style="flex: 0 0 auto; width: ${s}px; height: ${c}px; padding: 8px 4px;
                        background: var(--sp-accent-soft); border-radius: var(--sp-radius); overflow: hidden;
                        font-size: 0; line-height: 0">
              <div style="margin: 0 ${i}px 8px; padding: 6px 9px; background: var(--sp-surface);
                          border: 1px solid var(--sp-line); border-radius: 6px">
                <span class="sp-label" style="color: var(--sp-ink); font-weight: 600; font-size: 11px; line-height: 1.4">Northwind weekly</span>
              </div>
              ${u(`col-1`,`Harbour`,[`100%`,`82%`])}${u(`col-2`,`Tides`,[`100%`,`66%`])}
            </div>

            <div data-part="handle" role="separator" aria-label="Container width"
                 style="flex: 0 0 auto; width: 8px; height: 40px; margin-top: 12px; border-radius: 999px;
                        background: var(--sp-line); cursor: ew-resize; touch-action: none"></div>

            <span data-part="aim-narrow" aria-hidden="true"
                  style="position: absolute; top: 32px; left: 222px; width: 4px; height: 4px; translate: -50% -50%; pointer-events: none"></span>
            <span data-part="aim-wide" aria-hidden="true"
                  style="position: absolute; top: 32px; left: 394px; width: 4px; height: 4px; translate: -50% -50%; pointer-events: none"></span>
          </div>

          <div class="sp-stack sp-context" data-part="ghost" style="gap: 4px; width: ${o}px">
            <span class="sp-label" style="font-size: 10px; line-height: 1.3">Ghost tables, MSO only: fixed at ${n}px, never reflowing</span>
            <div class="sp-row" style="gap: 8px">
              <div data-part="ghost-1" style="width: ${n}px; height: 18px; border: 2px dashed var(--sp-muted); border-radius: 5px"></div>
              <div data-part="ghost-2" style="width: ${n}px; height: 18px; border: 2px dashed var(--sp-muted); border-radius: 5px"></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  `;let d=e(l,`fluid`),f=e(l,`handle`),p=e(l,`readout`),m=[e(l,`col-1`),e(l,`col-2`)],h=()=>{let e=new Set(m.map(e=>Math.round(e.offsetTop))).size;d.dataset.flow=e===1?`row`:`column`,p.textContent=`${Math.round(d.offsetWidth)}px: ${e===1?`two across`:`stacked`}`},g=e=>{d.style.width=`${Math.round(Math.min(Math.max(e,a),o))}px`,h()},_=null;f.addEventListener(`pointerdown`,e=>{_={x:t(e,l).x,width:d.offsetWidth},e.isTrusted&&f.setPointerCapture(e.pointerId)}),f.addEventListener(`pointermove`,e=>{_&&g(_.width+(t(e,l).x-_.x))});let v=()=>{_=null};f.addEventListener(`pointerup`,v),f.addEventListener(`pointercancel`,v),h()}export{d as mount};