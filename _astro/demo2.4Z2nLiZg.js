import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import{t as n}from"./motion.B5_YXmsy.js";var r=1100,i=25,a=25,o={selection:{name:`Selection`,call:`selectionChanged()`},impact:{name:`Impact`,call:`impactOccurred(.light)`},success:{name:`Notification`,call:`notificationOccurred(.success)`}};function s(s,c){let l=[0,1,2,3,4].map(e=>`
        <span
          data-part="detent-${e}"
          style="position: absolute; left: ${e*i}%; top: 0; width: 6px; height: 6px; translate: -50% 0; border-radius: 50%; background: var(--sp-line)"
        ></span>`).join(``);s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 288px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Haptics</span>
          <span class="sp-text" data-part="count" style="width: 96px; text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap">0 ticks</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; gap: 14px">
          <div
            class="sp-surface sp-context"
            data-part="phone"
            style="flex: 0 0 auto; width: 172px; height: 208px; padding: 12px; border-radius: 20px; background: var(--sp-surface); display: flex; flex-direction: column; gap: 12px"
          >
            <div class="sp-row" style="gap: 8px">
              ${t(`bell`)}
              <span class="sp-heading sp-grow" style="font-size: 13px">Alarm</span>
              <span class="sp-label">07:10</span>
            </div>
            <div class="sp-stack" style="gap: 4px">
              <div class="sp-row sp-row--between">
                <span class="sp-label">Volume</span>
                <span class="sp-label" data-part="volume" style="font-variant-numeric: tabular-nums">${a}</span>
              </div>
              <div class="sp-slider" data-part="slider" style="touch-action: none">
                <div class="sp-slider-track" data-part="track" style="--sp-from: 0%; --sp-to: ${a}%">
                  <div class="sp-slider-fill"></div>
                  <button
                    class="sp-slider-thumb"
                    data-part="thumb"
                    type="button"
                    role="slider"
                    aria-label="Volume"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow="${a}"
                    style="--sp-at: ${a}%; touch-action: none; cursor: grab"
                  ></button>
                </div>
              </div>
              <div style="position: relative; height: 8px">${l}</div>
            </div>
            <div class="sp-row" style="gap: 6px; margin-top: auto">
              <button class="sp-button sp-button--ghost sp-button--sm sp-grow" data-part="add" type="button">Add alarm</button>
              <button class="sp-button sp-button--sm" data-part="save" type="button">Save</button>
            </div>
          </div>
          <div class="sp-stack" style="width: 228px; gap: 8px">
            <span class="sp-label">Haptic tick</span>
            <div style="position: relative; height: 52px">
              <div
                class="sp-surface sp-context"
                data-part="silent"
                style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 12px; color: var(--sp-muted)"
              >Nothing to feel right now</div>
              <div
                class="sp-surface"
                data-part="tick"
                data-subject
                data-kind="none"
                style="position: absolute; inset: 0; display: flex; align-items: center; gap: 10px; padding: 0 12px; border-color: var(--sp-accent); opacity: 0; visibility: hidden; transition: opacity 0.14s, visibility 0.14s"
              >
                <span
                  data-part="tick-dot"
                  style="flex: 0 0 auto; width: 12px; height: 12px; border-radius: 50%; background: var(--sp-accent)"
                ></span>
                <span class="sp-stack" style="gap: 2px">
                  <span class="sp-heading" data-part="tick-name" style="font-size: 13px">Selection</span>
                  <span class="sp-label" data-part="tick-call" style="font-size: 11px">selectionChanged()</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let u=e(s,`phone`),d=e(s,`tick`),f=e(s,`tick-dot`),p=e(s,`tick-name`),m=e(s,`tick-call`),h=e(s,`silent`),g=e(s,`count`),_=e(s,`track`),v=e(s,`thumb`),y=e(s,`volume`),b,x=0,S=a/i,C=!1,w=e=>{c.clearTimeout(b),x+=1,d.dataset.kind=e,p.textContent=o[e].name,m.textContent=o[e].call,d.style.opacity=`1`,d.style.visibility=`visible`,h.style.opacity=`0`,g.textContent=`${x} tick${x===1?``:`s`}`,n(s)||(u.animate([{translate:`0 0`},{translate:`-2px 0`},{translate:`2px 0`},{translate:`0 0`}],{duration:170,easing:`ease-out`}),f.animate([{scale:`1`},{scale:`1.6`},{scale:`1`}],{duration:260,easing:`ease-out`})),b=c.setTimeout(()=>{d.dataset.kind=`none`,d.style.opacity=`0`,d.style.visibility=`hidden`,h.style.opacity=`1`},r)},T=e=>{if(e===S)return;S=e;let t=S*i;_.style.setProperty(`--sp-to`,`${t}%`),v.style.setProperty(`--sp-at`,`${t}%`),v.setAttribute(`aria-valuenow`,String(t)),y.textContent=String(t),w(`selection`)};v.addEventListener(`pointerdown`,e=>{e.isTrusted&&v.setPointerCapture(e.pointerId),C=!0}),v.addEventListener(`pointermove`,e=>{if(!C)return;let t=_.getBoundingClientRect();if(t.width===0)return;let n=Math.min(1,Math.max(0,(e.clientX-t.left)/t.width));T(Math.round(n*100/i))});let E=()=>{C=!1};v.addEventListener(`pointerup`,E),v.addEventListener(`pointercancel`,E),e(s,`add`).addEventListener(`click`,()=>w(`impact`)),e(s,`save`).addEventListener(`click`,()=>w(`success`))}export{s as mount};