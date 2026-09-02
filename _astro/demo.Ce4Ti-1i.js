import{n as e}from"./parts.C-YLuC7Q.js";import{r as t}from"./measure.DK7AY2_i.js";import{t as n}from"./motion.B5_YXmsy.js";var r={w:434,h:108},i={w:96,h:64,top:12},a=10,o=74,s=24,c=14,l=.18,u=.12,d=40,f=.88,p=.5,m=1,h=1.4,g=(e,t)=>`
  <span
    data-part="${e}"
    style="position: absolute; left: ${t-4}px; top: 84px; width: 8px; height: 8px; border-radius: 50%;
           background: var(--sp-ink); opacity: 0.5"
  ></span>`,_=(e,t,n)=>`
  <div class="sp-stack" style="gap: 2px; width: 136px">
    <span class="sp-label" style="font-size: 11px">${t}</span>
    <span class="sp-label sp-text--ink" data-part="read-${e}" style="font-size: 13px; font-variant-numeric: tabular-nums">${n}</span>
  </div>`;function v(v,y){v.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Lane</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="reset">Put it back</button>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px; padding: 12px">
          <div
            data-part="lane"
            style="position: relative; flex: 0 0 auto; width: ${r.w}px; height: ${r.h}px; border-radius: 6px;
                   border: 1px solid var(--sp-line); background: var(--sp-surface); overflow: hidden;
                   touch-action: none; user-select: none"
          >
            <span class="sp-context">
              ${g(`spot-a`,o)}
              ${g(`spot-b`,160)}
              ${g(`spot-c`,366)}
            </span>
            <div
              data-part="card" data-subject data-motion="square" data-peak="none" data-versus="none"
              style="position: absolute; left: ${-i.w/2}px; top: ${i.top}px; width: ${i.w}px; height: ${i.h}px;
                     display: flex; align-items: center; justify-content: center; border-radius: 8px;
                     background: var(--sp-accent); color: var(--sp-accent-ink); font-size: 12px; font-weight: 600;
                     cursor: grab; transform-origin: 50% 50%; transform: translateX(${o}px); will-change: transform"
            >drag me</div>
          </div>

          <div class="sp-row sp-context" data-part="readout" style="flex: 0 0 auto; gap: 8px">
            ${_(`v`,`velocity`,`0.00 px/ms`)}
            ${_(`skew`,`skewX`,`0.0°`)}
            ${_(`stretch`,`scaleX`,`1.00`)}
          </div>
          <span
            class="sp-text sp-context" data-stage-verdict data-part="note"
            style="flex: 0 0 auto; height: 32px; font-size: 12px; line-height: 1.35"
          >Nothing is animating: the shape is the current speed, and the speed is currently nothing.</span>
        </div>
      </div>
    </div>
  `;let b=e(v,`card`),x=e(v,`read-v`),S=e(v,`read-skew`),C=e(v,`read-stretch`),w=e(v,`note`),T=n(v),E=i.w/2+a,D=r.w-2-i.w/2-a,O=o,k=0,A=0,j,M=!1,N=0,P=0,F,I=(e,t,n)=>Math.min(Math.max(e,t),n),L=()=>{let e=T?0:I(k*s,-14,c),t=T?0:Math.min(Math.abs(k)*l,u);b.style.transform=`translateX(${O.toFixed(1)}px) skewX(${(-e).toFixed(2)}deg) scaleX(${(1+t).toFixed(3)})`,b.dataset.motion=Math.abs(e)<p?`square`:`distorting`,x.textContent=`${k.toFixed(2)} px/ms`,S.textContent=T?`held at 0.0°`:`${e.toFixed(1)}°`,C.textContent=T?`held at 1.00`:(1+t).toFixed(2),Math.abs(e)>A&&(A=Math.abs(e)),b.dataset.peak=A<m?`none`:`some`},R=()=>{y.clearTimeout(F),F=void 0},z=()=>{if(k*=f,Math.abs(k*s)<p&&(k=0),L(),k===0&&!M){R(),w.textContent=`Back to square. The decay had no target to reach, only a rate to fade at.`;return}F=y.setTimeout(z,d)},B=()=>{F===void 0&&(F=y.setTimeout(z,d))};v.addEventListener(`pointerdown`,e=>{b.contains(e.target)&&(e.isTrusted&&b.setPointerCapture(e.pointerId),M=!0,A=0,k=0,N=t(e,v).x,P=performance.now(),L(),w.textContent=`Holding. Speed, not distance, is what the shape reads.`,B())}),v.addEventListener(`pointermove`,e=>{if(!M)return;let n=performance.now(),r=Math.max(n-P,8),i=t(e,v).x,a=i-N;N=i,P=n,O=I(O+a,E,D),k=I(a/r,-2,2),L(),w.textContent=`Moving at ${Math.abs(k).toFixed(2)} px per millisecond, and leaning by that much.`});let V=()=>{if(!M)return;M=!1;let e=A>(j??0)*h?`faster`:A*h<(j??0)?`slower`:`similar`;b.dataset.versus=j===void 0?`first`:e,j=A,w.textContent=`Let go. The lean is decaying back to square on its own.`,B()};v.addEventListener(`pointerup`,V),v.addEventListener(`pointercancel`,V),e(v,`reset`).addEventListener(`click`,()=>{R(),M=!1,k=0,A=0,O=o,L(),w.textContent=`Put back. The shape is the current speed, and the speed is nothing again.`}),L(),T&&(w.textContent=`Reduced motion: the card still moves with the pointer, and never distorts.`)}export{v as mount};