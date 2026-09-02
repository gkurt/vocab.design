import{n as e}from"./parts.C-YLuC7Q.js";import{r as t}from"./measure.DK7AY2_i.js";var n={w:300,h:176},r=.4,i=30,a=`linear-gradient(#1b2836 0 52%, #33506b 52%, #4b6b83)`,o=`repeating-linear-gradient(90deg, rgb(255 255 255 / 0.14) 0 1px, transparent 1px 40px)`,s=`repeating-linear-gradient(90deg, rgb(255 255 255 / 0.34) 0 2px, transparent 2px 120px)`,c=(e,t,n)=>`
  <span
    data-part="${e}"
    aria-hidden="true"
    style="position: absolute; left: ${t-4}px; top: ${n-4}px; width: 8px; height: 8px; pointer-events: none"
  ></span>`;function l(l){l.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 288px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Orbit</span>
          <span class="sp-text" data-part="readout" style="width: 250px; text-align: right; white-space: nowrap">Unlocked</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px">
          <div class="sp-row" style="gap: 12px; align-items: stretch">
            <div
              data-part="viewport"
              data-subject
              data-hover-driven
              data-turn="none"
              data-outside="no"
              style="position: relative; flex: 0 0 auto; width: ${n.w}px; height: ${n.h}px; border-radius: var(--sp-radius); overflow: hidden; background: ${a}; cursor: crosshair; touch-action: none; user-select: none"
            >
              <span
                data-part="scene"
                style="position: absolute; inset: -40px 0; background-image: ${o}, ${s}; background-position: 0 0, 0 0"
              ></span>
              <span
                data-part="horizon"
                style="position: absolute; left: 0; right: 0; top: ${n.h*.52}px; height: 1px; background: rgb(255 255 255 / 0.45)"
              ></span>
              <span
                data-part="reticle"
                hidden
                style="position: absolute; left: 50%; top: 50%; width: 26px; height: 26px; margin: -13px 0 0 -13px; border-radius: 50%; border: 1px solid rgb(255 255 255 / 0.8); pointer-events: none"
              >
                <span style="position: absolute; left: 50%; top: 4px; bottom: 4px; width: 1px; margin-left: -0.5px; background: rgb(255 255 255 / 0.8)"></span>
                <span style="position: absolute; top: 50%; left: 4px; right: 4px; height: 1px; margin-top: -0.5px; background: rgb(255 255 255 / 0.8)"></span>
              </span>
              <span
                data-part="pointer"
                style="position: absolute; left: ${n.w/2}px; top: ${n.h/2}px; width: 11px; height: 11px; margin: -6px 0 0 -6px; border-radius: 50%; background: #ffffff; box-shadow: 0 0 0 1px rgb(16 24 40 / 0.5); pointer-events: none"
              ></span>
              ${c(`dot-left`,32,138)}
              ${c(`dot-right`,268,138)}
            </div>

            <div class="sp-stack sp-context" style="width: 124px; gap: 8px">
              <span class="sp-label" data-part="heading" style="font-variant-numeric: tabular-nums">heading 0&deg;</span>
              <div class="sp-divider"></div>
              <span class="sp-label"><span class="sp-kbd">Esc</span> releases</span>
              <div class="sp-row" style="gap: 6px; margin-top: 4px">
                <span data-part="dot-out" aria-hidden="true" style="width: 8px; height: 8px"></span>
              </div>
            </div>
          </div>

          <div class="sp-row sp-context" style="gap: 10px">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="engage">Lock the cursor</button>
          </div>
        </div>
      </div>
    </div>
  `;let u=e(l,`viewport`),d=e(l,`scene`),f=e(l,`horizon`),p=e(l,`reticle`),m=e(l,`pointer`),h=e(l,`readout`),g=e(l,`heading`),_=!1,v,y=0,b=0,x=e=>{h.textContent=e},S=()=>{let e=(y*r%360+360)%360;d.style.backgroundPosition=`${-y}px ${b/2}px, ${-y}px ${b/2}px`,f.style.top=`${n.h*.52+b/2}px`,g.textContent=`heading ${Math.round(e)}°`},C=e=>{let t=u.getBoundingClientRect();return e.clientX>=t.left&&e.clientX<=t.right&&e.clientY>=t.top&&e.clientY<=t.bottom},w=e=>{let r=t(e,u),i=Math.max(0,Math.min(n.w,r.x)),a=Math.max(0,Math.min(n.h,r.y));if(m.style.left=`${i}px`,m.style.top=`${a}px`,i===0||i===n.w||a===0||a===n.h)return x(`Unlocked: the cursor stops at the edge`);x(`Unlocked: the cursor is at ${Math.round(i)}, ${Math.round(a)}`)},T=(e,t)=>{_=e,m.hidden=e,p.hidden=!e,u.style.cursor=e?`none`:`crosshair`,e?u.setAttribute(`data-locked`,``):u.removeAttribute(`data-locked`),u.dataset.outside=`no`,x(t)};l.addEventListener(`pointermove`,e=>{let t=e.movementX||(v?e.clientX-v.x:0),n=e.movementY||(v?e.clientY-v.y:0);if(v={x:e.clientX,y:e.clientY},!_)return w(e);if(t===0&&n===0)return;y+=t,b=Math.max(-30,Math.min(i,b+n)),S(),t!==0&&(u.dataset.turn=t>0?`right`:`left`);let r=!C(e);u.dataset.outside=r?`yes`:`no`;let a=t>0?`+`:``;x(r?`Outside, still turning: ${a}${Math.round(t)}`:`movement ${a}${Math.round(t)}, ${Math.round(n)}`)}),e(l,`engage`).addEventListener(`click`,()=>T(!0,`Locked: cursor hidden, movement only`)),l.addEventListener(`keydown`,e=>{e.key!==`Escape`||!_||T(!1,`Released with Escape`)}),S()}export{l as mount};