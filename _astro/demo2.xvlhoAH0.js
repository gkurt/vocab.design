import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";import{r as n}from"./measure.DK7AY2_i.js";var r={w:424,h:138},i={w:132,h:92},a=[{key:`save`,x:387,y:13},{key:`field`,x:90,y:61},{key:`alert`,x:341,y:119}],o={x:66,y:58},s={200:`At 200 percent the lens still holds a label and its field together.`,300:`At 300 percent a label and the control it belongs to are already competing for the keyhole.`,400:`At 400 percent the view holds a few words. Anything a reader must compare has to be side by side.`};function c(c){let l=(e,t=``)=>`<div style="position: absolute; ${e}">${t}</div>`,u=e=>`
    ${l(`left: 0; top: 0; width: ${r.w}px; height: 26px; border-bottom: 1px solid var(--sp-line); background: var(--sp-surface)`)}
    ${l(`left: 10px; top: 6px; font-size: 11px; font-weight: 600; color: var(--sp-ink)`,`Invoices`)}
    <div ${e?`data-part="spot-save"`:``}
         style="position: absolute; left: 360px; top: 4px; width: 54px; height: 18px; border-radius: 5px;
                background: var(--sp-accent); color: var(--sp-accent-ink); font-size: 10px; font-weight: 500;
                display: flex; align-items: center; justify-content: center">Save</div>

    ${l(`left: 42px; top: 38px; font-size: 9.5px; color: var(--sp-muted)`,`Reference`)}
    <div ${e?`data-part="spot-field"`:``}
         style="position: absolute; left: 42px; top: 52px; width: 180px; height: 18px; border: 1px solid var(--sp-line);
                border-radius: 5px; background: var(--sp-surface); font-size: 10px; color: var(--sp-ink);
                display: flex; align-items: center; padding: 0 6px">INV-2291</div>

    ${l(`left: 42px; top: 84px; font-size: 9.5px; color: var(--sp-muted)`,`Amount due`)}
    ${l(`left: 42px; top: 98px; font-size: 12px; font-weight: 600; color: var(--sp-ink)`,`248.00`)}

    <div ${e?`data-part="spot-alert"`:``}
         style="position: absolute; left: 268px; top: 108px; width: 146px; height: 22px; border-radius: 6px;
                border: 1px solid var(--sp-line); background: var(--sp-surface); display: flex; align-items: center;
                gap: 5px; padding: 0 7px; font-size: 10px; color: var(--sp-ink)">
      ${t(`alert`)}<span>Payment failed</span>
    </div>`;c.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Magnifier</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Zoom" data-part="segmented" data-value="300">
            <button class="sp-segment" data-part="seg-200" value="200">200%</button>
            <button class="sp-segment" data-part="seg-300" value="300">300%</button>
            <button class="sp-segment" data-part="seg-400" value="400">400%</button>
          </sp-segmented>
        </div>

        <div style="position: relative; width: ${r.w}px; height: ${r.h}px; margin-top: 10px;
                    border: 1px solid var(--sp-line); border-radius: var(--sp-radius); background: var(--sp-sunken);
                    overflow: hidden">
          <!-- The page is scenery in both copies, so the two look alike; the lens itself is
               outside the context register, since the subject is styled normally (SPEC §5). -->
          <div class="sp-context" style="position: absolute; inset: 0">${u(!0)}</div>

          <div data-part="lens" data-subject data-zoom="300" data-showing="field"
               style="position: absolute; width: ${i.w}px; height: ${i.h}px; left: 0; top: 0; overflow: hidden;
                      border: 2px solid var(--sp-accent); border-radius: 10px; background: var(--sp-sunken);
                      box-shadow: 0 0 0 2000px rgb(16 24 40 / 0.42); cursor: grab; touch-action: none">
            <div data-part="magnified" class="sp-context" aria-hidden="true"
                 style="position: absolute; left: 0; top: 0; width: ${r.w}px; height: ${r.h}px;
                        transform-origin: 0 0">
              ${u(!1)}
            </div>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-zoom="300"
           style="margin: 10px 0 0; height: 34px; font-size: 11px">${s[300]}</p>
      </div>
    </div>
  `;let d=e(c,`lens`),f=e(c,`magnified`),p=e(c,`caption`),m=3,h={...o},g=!1,_=(e,t)=>{let n,r=1/0;for(let i of a){let a=Math.hypot(i.x-e,i.y-t);a<r&&(r=a,n=i)}return r<=62?n:void 0},v=()=>{let e={x:i.w/2,y:i.h/2};h.x=Math.min(Math.max(h.x,e.x),r.w-e.x),h.y=Math.min(Math.max(h.y,e.y),r.h-e.y),d.style.left=`${h.x-e.x}px`,d.style.top=`${h.y-e.y}px`,f.style.transform=`translate(${e.x-h.x*m}px, ${e.y-h.y*m}px) scale(${m})`,d.dataset.showing=_(h.x,h.y)?.key??`page`},y=e=>{m=e,d.dataset.zoom=String(e*100),p.dataset.zoom=String(e*100),p.textContent=s[String(e*100)]??``,v()};v();let b=()=>d.offsetParent;d.addEventListener(`pointerdown`,e=>{e.isTrusted&&d.setPointerCapture(e.pointerId),g=!0,d.style.cursor=`grabbing`}),d.addEventListener(`pointermove`,e=>{g&&(h=n(e,b()),v())});let x=()=>{g=!1,d.style.cursor=`grab`};d.addEventListener(`pointerup`,x),d.addEventListener(`pointercancel`,x),e(c,`segmented`).addEventListener(`change`,e=>{y(Number(e.detail)/100)})}export{c as mount};