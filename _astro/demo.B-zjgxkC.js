import{n as e,t}from"./parts.C-YLuC7Q.js";import{r as n}from"./measure.DK7AY2_i.js";var r=48,i=112,a=90;function o(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 320px; height: 202px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Canvas</span>
          <span class="sp-label" data-part="readout" role="status">x 18 &middot; w 64</span>
        </div>
        <div class="sp-body" style="padding: 12px">
          <div data-part="canvas" style="position: relative; height: 100%">

            <div data-part="dock" class="sp-context" aria-hidden="true"
                 style="position: absolute; left: 176px; top: 22px; width: 72px; height: 56px; border: 1px dashed var(--sp-line); border-radius: 8px"></div>
            <div data-part="guide" class="sp-context" aria-hidden="true"
                 style="position: absolute; left: 278px; top: 18px; width: 0; height: 64px; border-left: 1px dashed var(--sp-line)"></div>

            <div
              class="sp-surface"
              data-part="card"
              data-subject
              role="group"
              aria-label="Cover block"
              style="position: absolute; left: 18px; top: 26px; width: 64px; height: 48px; background: var(--sp-accent-soft); border-color: var(--sp-accent); cursor: grab; touch-action: none"
            >
              <span
                data-part="grip"
                aria-hidden="true"
                style="position: absolute; right: 2px; bottom: 2px; width: 12px; height: 12px; border-right: 2px solid var(--sp-accent); border-bottom: 2px solid var(--sp-accent); border-bottom-right-radius: 4px; cursor: se-resize; touch-action: none"
              ></span>
            </div>

            <div class="sp-context" data-part="twin" aria-hidden="true"
                 style="position: absolute; left: 18px; top: 90px; width: 64px; height: 34px; border: 1px dashed var(--sp-context-accent); border-radius: 8px; background: var(--sp-context-accent-soft)"></div>
            <span class="sp-label sp-context" style="position: absolute; left: 90px; top: 98px; font-size: 11px">no handles</span>
          </div>
        </div>
      </div>

      <div class="sp-stack sp-context" style="gap: 6px; width: 294px">
        <span class="sp-label" style="font-size: 11px">Twin block: position and size</span>
        <div class="sp-row" style="gap: 6px">
          <input class="sp-input" data-part="twin-x" type="text" inputmode="numeric" aria-label="Twin x" value="18" style="width: 54px; text-align: center" />
          <input class="sp-input" data-part="twin-y" type="text" inputmode="numeric" aria-label="Twin y" value="90" style="width: 54px; text-align: center" />
          <input class="sp-input" data-part="twin-w" type="text" inputmode="numeric" aria-label="Twin width" value="64" style="width: 54px; text-align: center" />
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="apply" type="button">Apply</button>
        </div>
      </div>
    </div>
  `;let s=e(o,`canvas`),c=e(o,`card`),l=e(o,`grip`),u=e(o,`dock`),d=e(o,`twin`),f=e(o,`readout`),p=(e,t,n)=>Math.min(Math.max(e,t),n),m=()=>{let e=c.offsetLeft,n=c.offsetWidth;f.textContent=`x ${e} · w ${n}`,t(c,`data-wide`,n>=a);let r=e+n/2,i=c.offsetTop+c.offsetHeight/2,o=r>=u.offsetLeft&&r<=u.offsetLeft+u.offsetWidth,s=i>=u.offsetTop&&i<=u.offsetTop+u.offsetHeight;t(c,`data-docked`,o&&s)},h=(e,t)=>{c.style.left=`${p(e,0,s.clientWidth-c.offsetWidth)}px`,c.style.top=`${p(t,0,s.clientHeight-c.offsetHeight)}px`,m()},g=e=>{c.style.width=`${p(e,r,Math.min(i,s.clientWidth-c.offsetLeft))}px`,m()},_,v=(e,t)=>{t.isTrusted&&c.setPointerCapture(t.pointerId),_={kind:e,...n(t,o),left:c.offsetLeft,top:c.offsetTop,width:c.offsetWidth}};l.addEventListener(`pointerdown`,e=>v(`resize`,e)),c.addEventListener(`pointerdown`,e=>{e.target!==l&&v(`move`,e)}),o.addEventListener(`pointermove`,e=>{if(!_)return;let t=n(e,o);_.kind===`move`?h(_.left+(t.x-_.x),_.top+(t.y-_.y)):g(_.width+(t.x-_.x))});let y=()=>{_=void 0};o.addEventListener(`pointerup`,y),o.addEventListener(`pointercancel`,y),e(o,`apply`).addEventListener(`click`,()=>{let t=(t,n)=>{let r=Number.parseInt(e(o,t).value,10);return Number.isFinite(r)?r:n};d.style.left=`${p(t(`twin-x`,18),0,s.clientWidth-d.offsetWidth)}px`,d.style.top=`${p(t(`twin-y`,90),0,s.clientHeight-d.offsetHeight)}px`,d.style.width=`${p(t(`twin-w`,64),r,i)}px`}),m()}export{o as mount};