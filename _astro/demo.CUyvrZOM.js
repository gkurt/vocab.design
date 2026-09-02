import{n as e}from"./parts.C-YLuC7Q.js";import{r as t}from"./measure.DK7AY2_i.js";var n=428,r=176,i=150,a=80,o=240,s=118,c=(e,t,n)=>`
  <div
    data-part="mark-${e}"
    aria-hidden="true"
    style="position: absolute; left: ${t}px; top: ${n}px; translate: -50% -50%; z-index: 2; pointer-events: none;
           width: 12px; height: 12px"
  ></div>`;function l(l){l.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 288px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Field notes</span>
          <span class="sp-label">Draft</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">
          <div
            class="sp-context"
            data-part="arena"
            style="position: relative; width: ${n}px; height: ${r}px; border: 1px dashed var(--sp-line); border-radius: 6px"
          >
            ${c(`grow`,386,152)}
            ${c(`min`,108,44)}

            <div
              data-part="panel"
              data-size="set"
              data-axis="both"
              style="position: absolute; left: 0; top: 0; width: ${o}px; height: ${s}px; overflow: hidden;
                     background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 6px"
            >
              <div class="sp-stack" style="gap: 7px; padding: 10px 12px">
                <span class="sp-heading" style="font-size: 13px">Tide log</span>
                <div class="sp-line" style="width: 86%"></div>
                <div class="sp-line" style="width: 72%"></div>
                <div class="sp-line" style="width: 80%"></div>
              </div>
              <span
                class="sp-chip"
                data-part="stop-note"
                style="position: absolute; left: 8px; bottom: 6px; padding: 2px 7px; font-size: 10px; visibility: hidden"
                >Minimum size</span
              >
              <div
                data-part="edge"
                role="separator"
                aria-orientation="vertical"
                aria-label="Resize width"
                style="position: absolute; right: 0; top: 10px; bottom: 26px; width: 8px; cursor: ew-resize; touch-action: none;
                       display: flex; align-items: center; justify-content: center"
              ><span aria-hidden="true" style="width: 2px; height: 22px; border-radius: 999px; background: var(--sp-muted)"></span></div>
              <div
                data-part="corner"
                data-subject
                role="separator"
                aria-label="Resize panel"
                style="position: absolute; right: 0; bottom: 0; width: 16px; height: 16px; cursor: nwse-resize; touch-action: none"
              >
                <span
                  aria-hidden="true"
                  style="position: absolute; inset: 0; background-image: repeating-linear-gradient(-45deg, var(--sp-muted) 0 1.5px, transparent 1.5px 4px); clip-path: polygon(100% 0, 100% 100%, 0 100%)"
                ></span>
              </div>
            </div>
          </div>

          <div class="sp-row sp-context" style="justify-content: flex-end">
            <span class="sp-label" data-part="readout" style="width: 92px; text-align: right; font-variant-numeric: tabular-nums"
              >${o} x ${s}</span
            >
          </div>
        </div>
      </div>
    </div>
  `;let u=e(l,`panel`),d=e(l,`readout`),f=e(l,`stop-note`),p=o,m=s,h,g=(e,t,o)=>{p=Math.round(Math.min(n,Math.max(i,e))),m=Math.round(Math.min(r,Math.max(a,t))),u.style.width=`${p}px`,u.style.height=`${m}px`,u.dataset.axis=o;let s=p===i||m===a;u.dataset.size=s?`min`:p>=340?`grown`:`set`,f.style.visibility=s?`visible`:`hidden`,d.textContent=`${p} x ${m}`},_=e=>n=>{n.isTrusted&&n.currentTarget.setPointerCapture(n.pointerId),h={...t(n,l),w:p,h:m,axis:e}};e(l,`corner`).addEventListener(`pointerdown`,_(`both`)),e(l,`edge`).addEventListener(`pointerdown`,_(`x`)),l.addEventListener(`pointermove`,e=>{if(!h)return;let n=t(e,l),r=h.w+(n.x-h.x),i=h.axis===`x`?h.h:h.h+(n.y-h.y);g(r,i,h.axis)});let v=()=>{h=void 0};l.addEventListener(`pointerup`,v),l.addEventListener(`pointercancel`,v),g(o,s,`both`)}export{l as mount};