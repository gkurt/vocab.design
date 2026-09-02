import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n=54,r=40,i=135,a=`M 25.7 82.3 A 40 40 0 1 1 82.3 82.3`,o={both:`The arc is quicker for anyone who can trace it, and the two buttons reach the same value with one contact and no path. Both routes, same control.`,gesture:`The buttons are gone, so the only way to this value is a stroke around the dial. A head pointer, a switch or one unsteady finger can no longer set it at all.`},s=e=>({left:n+r*Math.sin(e*Math.PI/180)-7,top:n-r*Math.cos(e*Math.PI/180)-7}),c=(e,t,n)=>Math.max(t,Math.min(n,e)),l=e=>e<34?`low`:e>66?`high`:`mid`;function u(n){let r=(e,t)=>{let{left:n,top:r}=s(t);return`<span data-part="${e}" style="position: absolute; left: ${n}px; top: ${r}px; width: 14px; height: 14px"></span>`};n.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 1 auto; min-width: 0">Brightness</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-axis="Controls" data-value="both" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-both" value="both"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Gesture and buttons</button>
            <button class="sp-segment" type="button" data-part="seg-gesture" value="gesture"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Gesture only</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="align-items: center; gap: 18px; margin-top: 10px">
          <div data-part="dial" style="position: relative; flex: 0 0 auto; width: 108px; height: 108px;
                                       touch-action: none; cursor: grab">
            <svg viewBox="0 0 108 108" width="108" height="108" aria-hidden="true" style="position: absolute; inset: 0">
              <path d="${a}" fill="none" stroke="var(--sp-line)" stroke-width="7" stroke-linecap="round"/>
              <path data-part="arc" d="${a}" fill="none" stroke="var(--sp-accent)" stroke-width="7" stroke-linecap="round"/>
            </svg>
            <div class="sp-stack" style="position: absolute; inset: 0; align-items: center; justify-content: center; gap: 0">
              <span class="sp-text sp-text--ink" data-part="value" data-band="mid"
                    style="font-size: 22px; font-weight: 600; line-height: 26px">50</span>
              <span class="sp-label sp-context" style="font-size: 9.5px">percent</span>
            </div>
            ${r(`stop-1`,-120)}
            ${r(`stop-2`,-60)}
            ${r(`stop-3`,0)}
            ${r(`stop-4`,60)}
            ${r(`stop-5`,110)}
          </div>

          <div class="sp-stack" style="flex: 1 1 auto; min-width: 0; gap: 10px">
            <div class="sp-surface sp-context" style="padding: 7px 10px">
              <span class="sp-label" style="font-size: 10px">Last change came from</span>
              <p class="sp-text sp-text--ink" data-part="source" data-by="none"
                 style="margin: 3px 0 0; height: 16px; line-height: 16px; font-size: 11.5px; white-space: nowrap">Nothing yet. The dial is resting at 50.</p>
            </div>

            <div class="sp-row" data-part="alt" data-subject style="gap: 8px; height: 32px;
                 transition: opacity 0.18s, visibility 0.18s">
              <button class="sp-icon-button" type="button" data-part="minus" aria-label="Less brightness"
                      style="flex: 0 0 auto; width: 30px; height: 30px">${t(`minus`)}</button>
              <button class="sp-icon-button" type="button" data-part="plus" aria-label="More brightness"
                      style="flex: 0 0 auto; width: 30px; height: 30px">${t(`plus`)}</button>
            </div>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="both"
           style="margin: 10px 0 0; height: 32px; font-size: 11px; line-height: 1.35">${o.both}</p>
      </div>
    </div>
  `;let u=e(n,`dial`),d=e(n,`value`),f=e(n,`source`),p=e(n,`alt`),m=e(n,`caption`),h=n.querySelector(`[data-part=arc]`);if(!(h instanceof SVGPathElement))return;let g=h.getTotalLength();h.style.strokeDasharray=String(g);let _=50,v=!1,y=e=>{d.textContent=String(Math.round(_)),d.dataset.band=l(_),h.style.strokeDashoffset=String(g*(1-_/100)),e!==`none`&&(f.dataset.by=e,f.textContent=e===`gesture`?`A stroke around the dial, ending at ${Math.round(_)}.`:`A press of a button, one step to ${Math.round(_)}.`)},b=e=>{let t=u.getBoundingClientRect(),n=e.clientX-(t.left+t.width/2),r=e.clientY-(t.top+t.height/2);_=c((Math.atan2(n,-r)*180/Math.PI+i)/270*100,0,100),y(`gesture`)};u.addEventListener(`pointerdown`,e=>{e.isTrusted&&u.setPointerCapture(e.pointerId),v=!0,b(e)}),n.addEventListener(`pointermove`,e=>{v&&b(e)});let x=()=>{v=!1};n.addEventListener(`pointerup`,x),n.addEventListener(`pointercancel`,x);let S=e=>{_=c(Math.round(_/10)*10+e,0,100),y(`button`)};e(n,`minus`).addEventListener(`click`,()=>S(-10)),e(n,`plus`).addEventListener(`click`,()=>S(10)),e(n,`mode`).addEventListener(`change`,e=>{let t=e.detail,n=t===`both`;p.style.opacity=n?`1`:`0`,p.style.visibility=n?`visible`:`hidden`,m.dataset.mode=t,m.textContent=o[t]}),y(`none`)}export{u as mount};