import{n as e}from"./parts.C-YLuC7Q.js";import{r as t}from"./measure.DK7AY2_i.js";var n={w:284,h:172},r={w:640,h:400},i={x:-140,y:-110},a=[{x:180,y:40,w:104,label:`Interviews`},{x:340,y:40,w:88,label:`Sign-off`},{x:490,y:40,w:92,label:`Handoff`},{x:150,y:110,w:96,label:`Kickoff`},{x:320,y:110,w:86,label:`Ship it`},{x:470,y:110,w:86,label:`Review`},{x:190,y:180,w:100,label:`Research`},{x:360,y:180,w:80,label:`Notes`},{x:505,y:180,w:80,label:`Retro`},{x:160,y:244,w:118,label:`Wireframes`},{x:340,y:244,w:92,label:`Backlog`},{x:480,y:244,w:88,label:`Launch`}].map(({x:e,y:t,w:n,label:r},i)=>`
    <span
      class="sp-surface"
      data-part="node-${i}"
      style="position: absolute; left: ${e}px; top: ${t}px; width: ${n}px; padding: 7px 9px; font-size: 11px; box-shadow: var(--sp-shadow)"
    >${r}</span>`).join(``),o=(e,t,n)=>`
  <span
    data-part="${e}"
    aria-hidden="true"
    style="position: absolute; left: ${t-7}px; top: ${n-7}px; width: 14px; height: 14px; pointer-events: none; z-index: 4"
  ></span>`;function s(s){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 240px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Board</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: flex-start; gap: 12px">
          <div class="sp-stack" style="gap: 8px">
            <div
              data-part="canvas"
              tabindex="0"
              aria-label="Board canvas: hold Space to pan"
              data-subject
              data-mode="select"
              data-did="none"
              style="position: relative; width: ${n.w}px; height: ${n.h}px; overflow: hidden; border: 1px solid var(--sp-line); border-radius: var(--sp-radius); background: var(--sp-surface); touch-action: none; user-select: none; cursor: crosshair"
            >
              <div
                data-part="world"
                style="position: absolute; left: 0; top: 0; width: ${r.w}px; height: ${r.h}px; transform: translate(${i.x}px, ${i.y}px); background-image: radial-gradient(var(--sp-line) 1.6px, transparent 1.7px); background-size: 26px 26px"
              >${a}</div>

              <span
                data-part="marquee"
                style="position: absolute; left: 0; top: 0; width: 0; height: 0; border: 1px solid var(--sp-accent); background: var(--sp-accent-soft); opacity: 0; visibility: hidden; pointer-events: none; z-index: 3"
              ></span>

              <span
                class="sp-chip"
                data-part="mode-chip"
                style="position: absolute; left: 8px; top: 8px; z-index: 5; cursor: default; background: var(--sp-accent); border-color: var(--sp-accent); color: var(--sp-accent-ink); opacity: 0; visibility: hidden; transition: opacity 0.12s, visibility 0.12s"
              >Pan</span>

              <span style="position: absolute; inset: 0; pointer-events: none">
                ${o(`mark-a`,30,20)}
                ${o(`mark-b`,196,150)}
                ${o(`pan-to`,244,112)}
              </span>
            </div>
          </div>

          <div class="sp-stack sp-context sp-grow" style="gap: 8px">
            <span
              class="sp-kbd"
              data-part="key-cap"
              style="display: flex; align-items: center; justify-content: center; width: 100%; height: 46px; font-size: 13px; font-weight: 500"
            >Space</span>
            <div class="sp-divider"></div>
            <div class="sp-stack" style="gap: 2px">
              <span class="sp-label">Mode</span>
              <span class="sp-heading" data-part="mode-value" style="font-size: 14px">Select</span>
            </div>
            <div class="sp-stack" style="gap: 2px">
              <span class="sp-label" style="white-space: nowrap">Last hold</span>
              <span class="sp-heading" data-part="held-for" style="font-size: 14px; font-variant-numeric: tabular-nums">0 ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let c=e(s,`canvas`),l=e(s,`world`),u=e(s,`marquee`),d=e(s,`mode-chip`),f=e(s,`key-cap`),p=e(s,`mode-value`),m=e(s,`held-for`),h=!1,g=0,_,v,y={x:i.x,y:i.y},b=(e,t)=>{e.style.opacity=t?`1`:`0`,e.style.visibility=t?`visible`:`hidden`},x=(e,t)=>{y={x:Math.max(n.w-r.w,Math.min(0,e)),y:Math.max(n.h-r.h,Math.min(0,t))},l.style.transform=`translate(${y.x}px, ${y.y}px)`},S=()=>{h||(h=!0,g=performance.now(),c.dataset.mode=`pan`,c.style.cursor=`grab`,p.textContent=`Pan`,f.style.background=`var(--sp-accent)`,f.style.borderColor=`var(--sp-accent)`,f.style.color=`var(--sp-accent-ink)`,b(d,!0))},C=()=>{if(!h)return;h=!1,_=void 0;let e=Math.round(performance.now()-g);m.textContent=`${e} ms`,c.dataset.mode=`select`,c.style.cursor=`crosshair`,p.textContent=`Select`,f.style.background=``,f.style.borderColor=``,f.style.color=``,b(d,!1)},w=e=>e.code===`Space`||e.key===` `||e.key===`Space`;s.addEventListener(`keydown`,e=>{w(e)&&(e.preventDefault(),S())}),s.addEventListener(`keyup`,e=>{w(e)&&C()}),c.addEventListener(`pointerdown`,e=>{if(e.isTrusted&&c.setPointerCapture(e.pointerId),h){_={x:e.clientX,y:e.clientY,ox:y.x,oy:y.y};return}v=t(e,c),u.style.left=`${v.x}px`,u.style.top=`${v.y}px`,u.style.width=`0px`,u.style.height=`0px`,b(u,!0),c.dataset.did=`none`}),s.addEventListener(`pointermove`,e=>{if(_){x(_.ox+(e.clientX-_.x),_.oy+(e.clientY-_.y));return}if(!v)return;let{x:n,y:r}=t(e,c);u.style.left=`${Math.min(v.x,n)}px`,u.style.top=`${Math.min(v.y,r)}px`,u.style.width=`${Math.abs(n-v.x)}px`,u.style.height=`${Math.abs(r-v.y)}px`});let T=()=>{_&&(_=void 0,h&&(c.dataset.did=`panned`)),v&&(v=void 0,b(u,!1),c.dataset.did=`selected`)};s.addEventListener(`pointerup`,T),s.addEventListener(`pointercancel`,T)}export{s as mount};