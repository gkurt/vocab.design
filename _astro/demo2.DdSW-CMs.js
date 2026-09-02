import{n as e}from"./parts.C-YLuC7Q.js";import{r as t}from"./measure.DK7AY2_i.js";var n=6,r={x:70,y:50},i={x:74,y:52},a={x:202,y:110},o=(e,t)=>`<span data-part="${e}" style="position: absolute; left: ${t.x-3}px; top: ${t.y-3}px; width: 6px; height: 6px; pointer-events: none"></span>`,s=[`left: -3px; top: -3px`,`right: -3px; top: -3px`,`left: -3px; bottom: -3px`,`right: -3px; bottom: -3px`].map(e=>`<span aria-hidden="true" style="position: absolute; ${e}; width: 6px; height: 6px; border-radius: 2px; background: var(--sp-accent)"></span>`).join(``);function c(c){c.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 468px; height: 306px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Canvas</span>
          <span
            class="sp-label"
            data-part="readout"
            style="flex: 0 0 auto; width: 152px; text-align: right; white-space: nowrap"
          >Nothing drawn yet</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center">
          <div
            data-part="canvas"
            data-outcome="none"
            style="position: relative; flex: 0 0 auto; width: 442px; height: 196px; border: 1px solid var(--sp-line);
                   border-radius: var(--sp-radius); background-color: var(--sp-surface);
                   background-image: radial-gradient(var(--sp-line) 1px, transparent 1px);
                   background-size: 16px 16px; overflow: hidden; cursor: crosshair; touch-action: none; user-select: none"
          >
            <span
              class="sp-label"
              data-stage-verdict data-part="hint"
              style="position: absolute; left: 0; right: 0; top: 50%; transform: translateY(-50%); text-align: center;
                     font-size: 12px; pointer-events: none"
            >Drag anywhere to draw a frame</span>
            <div
              data-part="drawn"
              data-subject
              data-state="none"
              style="position: absolute; left: ${r.x}px; top: ${r.y}px; width: 0; height: 0; border-radius: 4px;
                     background: var(--sp-accent-soft); box-shadow: inset 0 0 0 2px var(--sp-accent); opacity: 0;
                     pointer-events: none"
            >
              <span data-part="handles" style="position: absolute; inset: 0; opacity: 0">${s}</span>
            </div>
            ${o(`start`,r)}
            ${o(`nudge`,i)}
            ${o(`corner`,a)}
          </div>
        </div>
      </div>
    </div>
  `;let l=e(c,`canvas`),u=e(c,`drawn`),d=e(c,`handles`),f=e(c,`hint`),p=e(c,`readout`),m,h=!1,g=(e,t)=>{u.style.left=`${Math.min(e.x,t.x)}px`,u.style.top=`${Math.min(e.y,t.y)}px`,u.style.width=`${Math.abs(t.x-e.x)}px`,u.style.height=`${Math.abs(t.y-e.y)}px`},_=()=>{u.style.width=`0px`,u.style.height=`0px`,u.style.opacity=`0`,u.removeAttribute(`data-selected`),d.style.opacity=`0`,u.dataset.state=`none`};l.addEventListener(`pointerdown`,e=>{e.isTrusted&&l.setPointerCapture(e.pointerId),m=t(e,l),h=!1,l.dataset.outcome=`drawing`,_()}),l.addEventListener(`pointermove`,e=>{if(!m)return;let r=t(e,l);g(m,r),h=Math.abs(r.x-m.x)>=n&&Math.abs(r.y-m.y)>=n,u.style.opacity=h?`1`:`0`,u.dataset.state=h?`drawing`:`none`,p.textContent=h?`${Math.round(Math.abs(r.x-m.x))} x ${Math.round(Math.abs(r.y-m.y))}`:`Too small to be a frame`});let v=()=>{if(m){if(m=void 0,!h){_(),l.dataset.outcome=`tap`,p.textContent=`Under ${n} px, so a click`;return}u.dataset.state=`made`,u.setAttribute(`data-selected`,``),d.style.opacity=`1`,l.dataset.outcome=`made`,f.style.opacity=`0`,p.textContent=`Frame ${u.style.width.replace(`px`,``)} x ${u.style.height.replace(`px`,``)}`}};l.addEventListener(`pointerup`,v),l.addEventListener(`pointercancel`,v)}export{c as mount};