import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import{r}from"./measure.DK7AY2_i.js";import{t as i}from"./motion.B5_YXmsy.js";var a=300,o={w:42,h:36},s=3,c=s,l=a-o.w-s,u=l-c,d=.82,f=300,p=(e,t)=>`<span data-part="${e}" style="position: absolute; left: ${t-4}px; top: 16px; width: 8px; height: 8px; pointer-events: none"></span>`;function m(m){m.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 468px; height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Device</span>
          <span class="sp-text" data-part="readout" data-outcome="idle" style="flex: 0 0 auto; width: 264px; text-align: right; white-space: nowrap">Not erased</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px">
          <div class="sp-surface sp-context" style="width: 100%; padding: 9px 12px">
            <div class="sp-heading" style="font-size: 13px">Erase this device</div>
            <div class="sp-text" style="font-size: 12px">Two accounts, 41 GB of files, and every saved password.</div>
          </div>

          <div
            data-part="slider"
            data-subject
            data-state="idle"
            style="position: relative; width: ${a}px; height: ${o.h+6}px; border-radius: ${(o.h+6)/2}px;
                   background: var(--sp-sunken); box-shadow: inset 0 0 0 1px var(--sp-line); overflow: hidden"
          >
            <span
              data-part="fill"
              style="position: absolute; left: 0; top: 0; bottom: 0; width: ${c+o.w/2}px; background: var(--sp-accent-soft)"
            ></span>
            <span
              class="sp-label"
              data-part="label"
              style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 12px; white-space: nowrap"
            >Slide to erase</span>
            ${p(`short`,c+o.w/2+u*.35)}
            ${p(`end`,l+o.w/2)}
            <span
              data-part="thumb"
              style="position: absolute; left: 0; top: ${s}px; width: ${o.w}px; height: ${o.h}px; border-radius: ${o.h/2}px;
                     display: flex; align-items: center; justify-content: center; background: var(--sp-accent); color: var(--sp-accent-ink);
                     transform: translateX(${c}px); cursor: grab; touch-action: none; user-select: none"
            >${n(`chevronRight`)}</span>
          </div>

          <div class="sp-row sp-context" style="gap: 8px; align-items: center">
            <span class="sp-label" style="font-size: 10px">Cannot drag?</span>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="alt" style="white-space: nowrap; flex: 0 0 auto">Erase</button>
          </div>

          <div style="position: relative; width: 100%; height: 30px">
            <div
              class="sp-surface sp-context"
              data-part="receipt-empty"
              style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 11px"
            >Nothing has been erased</div>
            <div
              class="sp-surface"
              data-part="receipt"
              hidden
              style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 12px"
            >Device erased</div>
          </div>
        </div>
      </div>
    </div>
  `;let h=e(m,`slider`),g=e(m,`thumb`),_=e(m,`fill`),v=e(m,`label`),y=e(m,`readout`),b=i(m),x=c,S,C=!1,w=e=>{x=Math.max(c,Math.min(l,e)),g.style.transform=`translateX(${x}px)`,_.style.width=`${x+o.w/2}px`,v.style.opacity=String(Math.max(0,1-(x-c)/u*1.6))},T=(e,t)=>{y.dataset.outcome=e,y.textContent=t},E=n=>{C||(C=!0,w(l),h.dataset.state=`done`,t(h,`data-done`,!0),v.style.opacity=`1`,v.textContent=`Erased`,g.style.cursor=`default`,e(m,`receipt`).hidden=!1,e(m,`receipt-empty`).hidden=!0,T(`done`,n===`slide`?`Slid the whole way: erased`:`Erased from the button instead`))},D=e=>{h.dataset.state=`sprung`,w(c),!b&&g.animate([{transform:`translateX(${e}px)`},{transform:`translateX(0px)`,offset:.72},{transform:`translateX(${c}px)`}],{duration:f,easing:`cubic-bezier(0.22, 0.9, 0.3, 1)`})};g.addEventListener(`pointerdown`,e=>{C||(e.isTrusted&&g.setPointerCapture(e.pointerId),S={x:r(e,m).x,at:x},h.dataset.state=`sliding`,_.style.transition=`none`,g.style.cursor=`grabbing`,T(`sliding`,`Sliding: it commits at the far end`))}),g.addEventListener(`pointermove`,e=>{if(!S)return;w(S.at+(r(e,m).x-S.x));let t=Math.round((x-c)/u*100);T(`sliding`,`${t}% along, still nothing done`)});let O=()=>{if(!S)return;let e=x;if(S=void 0,g.style.cursor=`grab`,_.style.transition=`width ${f}ms var(--sp-ease)`,(e-c)/u>=d)return E(`slide`);D(e),T(`sprung`,`Let go at ${Math.round((e-c)/u*100)}%: nothing happened`)};g.addEventListener(`pointerup`,O),g.addEventListener(`pointercancel`,O),e(m,`alt`).addEventListener(`click`,()=>E(`button`))}export{m as mount};