import{n as e}from"./parts.C-YLuC7Q.js";import{r as t}from"./measure.DK7AY2_i.js";import{t as n}from"./motion.B5_YXmsy.js";var r=400,i=120,a=10,o=6e-4,s=16,c=.08,l=40,u=100,d=400,f=12,p=[`linear-gradient(150deg, #24303d, #4a7290)`,`linear-gradient(150deg, #4a7290, #8fb8c9)`,`linear-gradient(150deg, #d8c39a, #9c7c53)`,`linear-gradient(150deg, #b6603f, #e8b17a)`,`linear-gradient(150deg, #2f4a3a, #7fa06a)`,`linear-gradient(150deg, #7fa06a, #d9d7a6)`,`linear-gradient(150deg, #5b4a7a, #9d84c4)`,`linear-gradient(150deg, #1e222c, #57606f)`],m=p.length*130-a,h=m-r,g=(e,t)=>`
  <span
    data-part="${e}"
    style="position: absolute; left: ${t-7}px; top: 51px; width: 14px; height: 14px; pointer-events: none"
  ></span>`;function _(_,v){_.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Recent captures</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 12px">
          <div
            data-part="strip"
            data-subject
            data-phase="idle"
            data-coast="none"
            style="position: relative; overflow: hidden; width: ${r}px; height: 116px; border-radius: var(--sp-radius); border: 1px solid var(--sp-line); background: var(--sp-surface); cursor: grab; touch-action: none"
          >
            <div
              data-part="track"
              style="position: absolute; inset: 6px auto 6px 0; display: flex; gap: ${a}px; width: ${m}px; transform: translateX(0px)"
            >${p.map((e,t)=>`
      <span
        data-part="card-${t}"
        style="flex: 0 0 auto; width: ${i}px; height: 100%; border-radius: 6px; background: ${e}"
      ></span>`).join(``)}</div>
            ${g(`grip`,300)}
            ${g(`grip-end`,150)}
          </div>
          <div class="sp-row sp-context" style="gap: 10px">
            <div class="sp-progress" data-part="ruler" style="flex: 1 1 auto">
              <div class="sp-progress-fill" data-part="ruler-fill" style="--sp-value: 0%; transition: none"></div>
            </div>
            <span
              class="sp-label"
              data-part="travelled"
              style="width: 150px; text-align: right; font-variant-numeric: tabular-nums"
            >0 px after the lift</span>
          </div>
        </div>
      </div>
    </div>
  `;let y=e(_,`strip`),b=e(_,`track`),x=e(_,`ruler-fill`),S=e(_,`travelled`),C=0,w=0,T,E,D=[],O=e=>Math.min(h,Math.max(0,e)),k=()=>{b.style.transform=`translateX(${-C}px)`,x.style.setProperty(`--sp-value`,`${C/h*100}%`)},A=e=>{y.dataset.phase=e},j=()=>{v.clearTimeout(T),T=void 0,y.dataset.coast=w>=l?`some`:`none`,S.textContent=`${Math.round(w)} px after the lift`,A(`rest`)},M=e=>{let t=e,n=()=>{let e=C;if(C=O(C+t*s),w+=Math.abs(C-e),S.textContent=`${Math.round(w)} px after the lift`,k(),t-=Math.sign(t)*o*s,Math.abs(t)<c/4||C===0||C===h)return j();A(`coast`),T=v.setTimeout(n,s)};n()};y.addEventListener(`pointerdown`,e=>{e.isTrusted&&y.setPointerCapture(e.pointerId),v.clearTimeout(T),T=void 0,w=0,y.dataset.coast=`none`,S.textContent=`0 px after the lift`,E={x:t(e,_).x,at:performance.now()},D=[{x:E.x,at:E.at}],A(`drag`)}),_.addEventListener(`pointermove`,e=>{let n=D[D.length-1];if(!E||!n)return;let r=performance.now(),i=t(e,_).x;for(C=O(C-(i-n.x)),D.push({x:i,at:r});D.length>2&&r-(D[0]?.at??r)>d;)D.shift();k(),A(`drag`)});let N=()=>{if(!E)return;E=void 0;let e=performance.now(),t=D.filter(t=>e-t.at<=u);D=[];let r=t[0],i=t[t.length-1];if(!i||!r)return j();let a=i.at-r.at,s=a>=f?-(i.x-r.x)/a:0;if(Math.abs(s)<c)return j();if(A(`coast`),!n(_))return M(s);let l=O(C+s*s*Math.sign(s)/(2*o));w=Math.abs(l-C),C=l,k(),j()};_.addEventListener(`pointerup`,N),_.addEventListener(`pointercancel`,N)}export{_ as mount};