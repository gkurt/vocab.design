import{n as e}from"./parts.C-YLuC7Q.js";import{r as t}from"./measure.DK7AY2_i.js";var n={w:300,h:160},r=70,i={x:150,y:80},a=.5,o=.35,s=60,c={azimuth:24,elevation:16},l=[{name:`front`,transform:`translateZ(${r/2}px)`,wash:`rgb(255 255 255 / 0.1)`},{name:`back`,transform:`rotateY(180deg) translateZ(${r/2}px)`,wash:`rgb(0 0 0 / 0.28)`},{name:`right`,transform:`rotateY(90deg) translateZ(${r/2}px)`,wash:`rgb(0 0 0 / 0.18)`},{name:`left`,transform:`rotateY(-90deg) translateZ(${r/2}px)`,wash:`rgb(0 0 0 / 0.1)`},{name:`top`,transform:`rotateX(90deg) translateZ(${r/2}px)`,wash:`rgb(255 255 255 / 0.3)`},{name:`bottom`,transform:`rotateX(-90deg) translateZ(${r/2}px)`,wash:`rgb(0 0 0 / 0.36)`}].map(e=>`
    <span
      style="position: absolute; inset: 0; background: var(--sp-accent); box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.24), inset 0 0 0 ${r}px ${e.wash}; transform: ${e.transform}"
    ></span>`).join(``),u=(e,t,n)=>`
  <span
    data-part="${e}"
    aria-hidden="true"
    style="position: absolute; left: ${t-7}px; top: ${n-7}px; width: 14px; height: 14px; pointer-events: none"
  ></span>`;function d(d){d.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 258px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Viewer</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: flex-start; gap: 10px">
          <div
            class="sp-surface"
            data-part="viewport"
            data-view="home"
            data-clamped="no"
            style="position: relative; flex: 0 0 auto; width: ${n.w+2}px; height: ${n.h+2}px; overflow: hidden; background: var(--sp-sunken); perspective: 620px; touch-action: none; user-select: none; cursor: grab"
          >
            <span
              class="sp-context"
              style="position: absolute; left: ${i.x-70}px; top: ${i.y+30}px; width: 140px; height: 34px; border-radius: 50%; background: var(--sp-line)"
            ></span>

            <div
              data-part="model"
              data-subject
              style="position: absolute; left: ${i.x-r/2}px; top: ${i.y-r/2}px; width: ${r}px; height: ${r}px; transform-style: preserve-3d; transform: rotateX(${c.elevation}deg) rotateY(${c.azimuth}deg)"
            >${l}</div>

            <span style="position: absolute; inset: 0; pointer-events: none; z-index: 2">
              ${u(`grip`,60,130)}
              ${u(`grip-right`,240,130)}
              ${u(`grip-up`,60,30)}
            </span>
          </div>

          <div class="sp-stack sp-context" style="width: 118px; gap: 6px">
            <span class="sp-label">Azimuth</span>
            <span class="sp-heading" data-part="azimuth" style="font-size: 14px; font-variant-numeric: tabular-nums">24 deg</span>
            <span class="sp-label">Elevation</span>
            <span class="sp-heading" data-part="elevation" style="font-size: 14px; font-variant-numeric: tabular-nums">16 deg</span>
            <div class="sp-divider"></div>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="reset">Reset view</button>
          </div>
        </div>
      </div>
    </div>
  `;let f=e(d,`viewport`),p=e(d,`model`),m=e(d,`azimuth`),h=e(d,`elevation`),g=c.azimuth,_=c.elevation,v,y=()=>{p.style.transform=`rotateX(${_}deg) rotateY(${g}deg)`,m.textContent=`${Math.round((g%360+360)%360)} deg`,h.textContent=`${Math.round(_)} deg`;let e=Math.round(g)===c.azimuth&&Math.round(_)===c.elevation;f.dataset.view=e?`home`:`turned`};f.addEventListener(`pointerdown`,e=>{e.isTrusted&&f.setPointerCapture(e.pointerId),v={...t(e,d),azimuth:g,elevation:_},f.dataset.clamped=`no`,f.style.cursor=`grabbing`}),d.addEventListener(`pointermove`,e=>{if(!v)return;let n=t(e,d);g=v.azimuth+(n.x-v.x)*a;let r=v.elevation-(n.y-v.y)*o;_=Math.max(-60,Math.min(s,r));let i=Math.abs(r)>s;f.dataset.clamped=i?`yes`:`no`,y()});let b=()=>{v&&(v=void 0,f.style.cursor=`grab`)};f.addEventListener(`pointerup`,b),f.addEventListener(`pointercancel`,b),e(d,`reset`).addEventListener(`click`,()=>{g=c.azimuth,_=c.elevation,f.dataset.clamped=`no`,y()})}export{d as mount};