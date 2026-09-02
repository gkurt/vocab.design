import{n as e,t}from"./parts.C-YLuC7Q.js";var n=`wght`,r=100,i=400,a=900,o=10,s=30,c=`Continuum`,l=54,u=e=>(e-r)/800*100,d=e=>Math.min(a,Math.max(r,Math.round(e/o)*o)),f=e=>e<=130?`min`:e>=870?`max`:Math.abs(e-i)<=s?`default`:`between`;function p(s){let p=[r,i,a].map(e=>`<span class="sp-text" data-part="stop-${e}" style="position: absolute; left: ${u(e)}%; translate: -50% 0; font-size: 11px">${e}</span>`).join(``),m=[`min`,`default`,`max`].map(e=>`<span class="sp-chip" data-part="chip-${e}" style="cursor: default"></span>`).join(``);s.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Geist Variable</span>
          <span class="sp-label" data-part="declaration"
                style="color: var(--sp-ink); font-variant-numeric: tabular-nums"></span>
        </div>
        <div class="sp-row" data-part="sample-box" style="height: ${l}px">
          <span data-part="sample" data-subject data-at="default"
                style="font-size: 40px; line-height: 1.2; white-space: nowrap; font-variation-settings: '${n}' ${i}">${c}</span>
        </div>
        <div class="sp-field sp-context" style="gap: 2px">
          <div class="sp-slider" data-part="slider" style="touch-action: none">
            <div class="sp-slider-track" data-part="track">
              <div class="sp-slider-fill"></div>
              <span data-part="tick" style="position: absolute; top: -3px; left: ${u(i)}%; width: 2px; height: 10px;
                    background: var(--sp-muted); translate: -50% 0"></span>
              <div class="sp-slider-thumb" data-part="thumb" role="slider" tabindex="0"
                   aria-label="${n} axis" aria-valuemin="${r}" aria-valuemax="${a}"></div>
            </div>
          </div>
          <div data-part="scale" aria-hidden="true" style="position: relative; height: 15px">${p}</div>
        </div>
        <div class="sp-row sp-row--wrap sp-context" data-part="record" style="gap: 6px; margin-top: 8px">
          <span class="sp-chip" data-part="chip-tag" style="cursor: default">tag ${n}</span>
          ${m}
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 10px">
          Registered tags are lowercase and custom ones uppercase. This file carries wght alone: wdth,
          slnt, ital and opsz are registered axes it does not ship.
        </p>
      </div>
    </div>
  `;let h=e(s,`slider`),g=e(s,`track`),_=e(s,`thumb`),v=e(s,`sample`),y=e(s,`declaration`),b={min:e(s,`chip-min`),default:e(s,`chip-default`),max:e(s,`chip-max`)};b.min.textContent=`min ${r}`,b.default.textContent=`default ${i}`,b.max.textContent=`max ${a}`;let x=i,S,C=()=>{let e=`${u(x)}%`;h.style.setProperty(`--sp-to`,e),h.style.setProperty(`--sp-at`,e),_.setAttribute(`aria-valuenow`,String(x)),v.style.fontVariationSettings=`'${n}' ${x}`,v.dataset.at=f(x),y.textContent=`font-variation-settings: '${n}' ${x}`;for(let[e,n]of Object.entries(b))t(n,`data-selected`,e===f(x))},w=e=>{let t=g.getBoundingClientRect();return t.width===0?x:d(r+(e-t.left)/t.width*800)},T=e=>{let t=g.getBoundingClientRect();return t.left+u(e)/100*t.width};C(),h.addEventListener(`pointerdown`,e=>{if(e.isTrusted&&h.setPointerCapture(e.pointerId),e.target===_){S=e.clientX-T(x);return}S=0,x=w(e.clientX),C()}),s.addEventListener(`pointermove`,e=>{if(S===void 0)return;let t=w(e.clientX-S);t!==x&&(x=t,C())}),s.addEventListener(`pointerup`,()=>{S=void 0}),s.addEventListener(`pointercancel`,()=>{S=void 0}),_.addEventListener(`keydown`,e=>{let t={ArrowRight:o,ArrowUp:o,ArrowLeft:-10,ArrowDown:-10}[e.key],n=x;if(t!==void 0)n=d(x+t);else if(e.key===`Home`)n=r;else if(e.key===`End`)n=a;else return;e.preventDefault(),n!==x&&(x=n,C())})}export{p as mount};