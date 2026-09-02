import{n as e}from"./parts.C-YLuC7Q.js";import{r as t}from"./measure.DK7AY2_i.js";import{t as n}from"./motion.B5_YXmsy.js";var r=234,i=196,a=148,o=76,s=124,c=48,l=88,u=46,d=`scale(1.13, 0.82)`,f=[{transform:d},{transform:`scale(0.93, 1.11)`,offset:.4},{transform:`scale(1.03, 0.97)`,offset:.72},{transform:`none`}],p=60,m=14;function h(e,t){return`<span aria-hidden="true"
                style="position: absolute; left: 50%; top: 50%; width: ${e}px; height: ${t}px; translate: -50% -50%;
                       border: 2px dashed var(--sp-line); border-radius: 26px"></span>`}function g(e,t,n,r){return`
    <div class="sp-row" style="gap: 8px; align-items: center">
      <span class="sp-label" style="flex: 0 0 52px; font-size: 11px">${t}</span>
      <span style="position: relative; flex: 0 0 128px; height: 50px">
        ${h(l,u)}
        <span class="sp-clay" data-part="${e}"${n}
              style="position: absolute; left: 50%; top: 50%; width: ${l}px; height: ${u}px;
                     translate: -50% -50%; transform: ${r}"></span>
      </span>
    </div>`}function _(l){l.innerHTML=`
    <div class="sp-app" style="gap: 9px">
      <div class="sp-window" style="width: 466px; padding: 11px 14px 13px">
        <span class="sp-heading" data-part="heading" style="display: block; margin-bottom: 9px">Clay button</span>

        <div class="sp-row" data-part="tour" style="gap: 14px; align-items: flex-start; justify-content: center">
          <div data-part="ground"
               style="position: relative; flex: 0 0 ${r}px; height: ${i}px; border-radius: var(--sp-radius);
                      background: var(--sp-sunken); box-shadow: inset 0 0 0 1px var(--sp-line)">
            <span class="sp-label sp-context" style="position: absolute; left: 14px; top: 12px">Preview</span>

            <span style="position: absolute; left: 8px; top: 40px; width: ${a}px; height: ${o}px">
              ${h(s,c)}
              <button type="button" class="sp-clay" data-part="squish" data-subject
                      style="position: absolute; left: 50%; top: 50%; width: ${s}px; height: ${c}px;
                             translate: -50% -50%; font: inherit; font-size: 13px; font-weight: 600; cursor: pointer">
                Hold me
              </button>
            </span>

            <span class="sp-context" data-part="socket" aria-hidden="true"
                  style="position: absolute; right: 12px; bottom: 16px; width: 52px; height: 52px; border-radius: 18px;
                         background: var(--sp-surface); box-shadow: inset 0 2px 6px rgb(16 24 40 / 0.2)"></span>
          </div>

          <div class="sp-stack sp-context" data-part="states" style="flex: 0 0 190px; gap: 8px">
            <span class="sp-label" style="color: var(--sp-ink); font-size: 12px">States</span>
            ${g(`state-rest`,`Rest`,``,`none`)}
            ${g(`state-pressed`,`Held`,` data-pressed`,d)}
            ${g(`state-dragged`,`Dragged`,` data-pressed`,`${d} skewX(-9deg) translateX(6px)`)}
          </div>
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 466px; margin: 0; text-align: center">
        Wider as it gets shorter, held for the length of the press, then springing past rest.
      </p>
    </div>
  `;let u=e(l,`squish`),_=!1,v=0,y=0,b=e=>{if(e!==_){if(_=e,e){v=performance.now(),u.style.transform=d;return}u.style.removeProperty(`transform`),!(performance.now()-v<p||n(l))&&u.animate(f,{duration:430,easing:`cubic-bezier(0.2, 0.8, 0.3, 1)`})}};new MutationObserver(()=>b(u.hasAttribute(`data-pressed`))).observe(u,{attributeFilter:[`data-pressed`]}),u.addEventListener(`pointerdown`,e=>{y=t(e,l).x,e.isTrusted&&u.setPointerCapture(e.pointerId),b(!0)}),u.addEventListener(`pointermove`,e=>{if(!_)return;let n=Math.max(-14,Math.min(m,(t(e,l).x-y)*.14));u.style.transform=`${d} skewX(${(-n*.7).toFixed(1)}deg) translateX(${(n*.5).toFixed(1)}px)`}),u.addEventListener(`pointerup`,()=>b(!1)),u.addEventListener(`pointercancel`,()=>b(!1))}export{_ as mount};