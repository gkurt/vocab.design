import{n as e}from"./parts.C-YLuC7Q.js";import{r as t}from"./measure.DK7AY2_i.js";import{t as n}from"./motion.B5_YXmsy.js";var r={w:200,h:176},i=32,a=24,o=768-r.h,s=.32,c=1300,l=40,u=120,d=260,f=[`Harbour lights`,`Slow ferry`,`Nightjar`,`Paper boats`,`Tin roof`,`Low tide`,`Halfway home`,`Corner shop`,`Second wind`,`Blue hour`,`Long division`,`Gutter song`],p=Array.from({length:a},(e,t)=>{let n=f[t%f.length];return`
    <div class="sp-row" style="gap: 8px; height: ${i}px; padding: 0 10px; flex: 0 0 auto">
      <span class="sp-label" style="width: 16px; text-align: right; font-variant-numeric: tabular-nums">${t+1}</span>
      <span class="sp-text sp-text--ink sp-grow" style="font-size: 12px; white-space: nowrap; overflow: hidden">${n}</span>
    </div>`}).join(``),m=(e,t,n)=>`
  <span
    data-part="${e}"
    style="position: absolute; left: ${t-7}px; top: ${n-7}px; width: 14px; height: 14px; pointer-events: none"
  ></span>`;function h(i,a){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 272px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Library</span>
          <span class="sp-text" data-part="readout" style="width: 350px; text-align: right; white-space: nowrap">Resting at the top of the list</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: flex-start; gap: 12px">
          <div
            class="sp-surface"
            data-part="surface"
            data-subject
            data-carry="idle"
            data-touch
            style="position: relative; flex: 0 0 auto; width: ${r.w}px; height: ${r.h}px; overflow: hidden; touch-action: none; user-select: none"
          >
            <div data-part="track" style="position: absolute; left: 0; right: 0; top: 0; display: flex; flex-direction: column; transform: translateY(0px)">${p}</div>
            <span style="position: absolute; inset: 0; pointer-events: none">
              ${m(`grip`,r.w/2,138)}
              ${m(`grip-end`,r.w/2,48)}
            </span>
          </div>

          <div class="sp-stack sp-context sp-grow" style="gap: 8px; width: 196px">
            <div class="sp-stack" style="gap: 2px">
              <span class="sp-label">Speed at release</span>
              <span class="sp-heading" data-part="velocity" style="font-variant-numeric: tabular-nums">0 px/s</span>
            </div>
            <div class="sp-divider"></div>
            <div class="sp-stack" style="gap: 2px">
              <span class="sp-label">Carried after release</span>
              <span class="sp-heading" data-part="carried" style="font-variant-numeric: tabular-nums">0 px</span>
            </div>
            <div class="sp-divider"></div>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="reset">Back to the top</button>
          </div>
        </div>
      </div>
    </div>
  `;let f=e(i,`surface`),h=e(i,`track`),g=e(i,`readout`),_=e(i,`velocity`),v=e(i,`carried`),y,b=0,x=!1,S=0,C=0,w=[],T=(e,t)=>{f.dataset.carry=e,g.textContent=t},E=e=>{b=Math.max(0,Math.min(o,e)),h.style.transform=`translateY(${-b}px)`},D=()=>{a.clearTimeout(y),y=void 0},O=e=>{D(),_.textContent=`0 px/s`;let t=Math.round(b-e);v.textContent=`${t} px`,T(`settled`,`Carried ${t} px on its own, then stopped`)},k=e=>{D();let t=b,r=e*s;if(_.textContent=`${Math.round(Math.abs(e))} px/s`,n(i))return E(t+r),O(t);T(`coasting`,`Let go at ${Math.round(Math.abs(e))} px/s, still travelling`);let o=0,u=()=>{o+=l;let n=o/1e3;if(E(t+r*(1-Math.exp(-n/s))),_.textContent=`${Math.round(Math.abs(e)*Math.exp(-n/s))} px/s`,o>=c)return O(t);y=a.setTimeout(u,l)};y=a.setTimeout(u,l)};f.addEventListener(`pointerdown`,e=>{e.isTrusted&&f.setPointerCapture(e.pointerId),D(),x=!0,S=t(e,i).y,C=b,w=[{t:performance.now(),y:S}],_.textContent=`0 px/s`,v.textContent=`0 px`,T(`dragging`,`Holding the list, tracking one to one`)}),i.addEventListener(`pointermove`,e=>{if(!x)return;let n=t(e,i).y;E(C+(S-n)),w.push({t:performance.now(),y:n}),T(`dragging`,`Held at ${Math.round(b)} px in`)});let A=()=>{if(!x)return;x=!1;let e=performance.now(),t=w.filter(t=>e-t.t<=u),n=t[0],r=t.at(-1),i=n&&r?r.t-n.t:0,a=n&&r&&i>=12?(n.y-r.y)/i*1e3:0;if(w=[],Math.abs(a)<d)return _.textContent=`${Math.round(Math.abs(a))} px/s`,v.textContent=`0 px`,T(`none`,`Released at rest: the list stopped with the hand`);k(a)};i.addEventListener(`pointerup`,A),i.addEventListener(`pointercancel`,A),e(i,`reset`).addEventListener(`click`,()=>{D(),E(0),_.textContent=`0 px/s`,v.textContent=`0 px`,T(`idle`,`Resting at the top of the list`)})}export{h as mount};