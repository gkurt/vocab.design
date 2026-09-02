import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{t}from"./motion.B5_YXmsy.js";var n={w:434,h:140},r={w:310,h:62},i=62,a=9,o=620,s={apart:{offsets:[-118,0,118],note:`Apart: each falloff dies before it reaches the next one.`},touching:{offsets:[-54,0,54],note:`Touching: the falloffs overlap and a neck forms between them.`},merged:{offsets:[-26,0,26],note:`Merged: one silhouette, from three shapes nothing has deformed.`}},c=0;function l(l,u){let d=`sp-goo-${++c}`,f=(e,t)=>`
    <span
      data-part="blob-${e+1}"
      style="position: absolute; left: 50%; top: 0; width: ${i}px; height: ${i}px; margin-left: ${-62/2}px;
             border-radius: 50%; background: var(--sp-accent); transform: translateX(${t}px)"
    ></span>`;l.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="scene" data-gap="touching" data-state="rested" style="height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Spacing</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="touching" data-axis="Gap">
            <button class="sp-segment" type="button" data-part="seg-apart" value="apart">Apart</button>
            <button class="sp-segment" type="button" data-part="seg-touching" value="touching">Touching</button>
            <button class="sp-segment" type="button" data-part="seg-merged" value="merged">Merged</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px">
          <svg width="0" height="0" aria-hidden="true" style="position: absolute">
            <filter id="${d}" color-interpolation-filters="sRGB">
              <feGaussianBlur in="SourceGraphic" stdDeviation="${a}" result="blurred" />
              <feColorMatrix in="blurred" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -11" />
            </filter>
          </svg>

          <div data-part="stage" style="position: relative; width: ${n.w}px; height: ${n.h}px">
            <div data-part="layer" style="position: absolute; inset: 0; filter: url(#${d})">
              <div
                data-part="blob" data-subject data-pose=":not([data-gap=apart])" data-gap="touching"
                style="position: absolute; left: 50%; top: 50%; width: ${r.w}px; height: ${r.h}px;
                       margin: ${-r.h/2}px 0 0 ${-r.w/2}px"
              >${s.touching.offsets.map((e,t)=>f(t,e)).join(``)}</div>
            </div>
          </div>

          <span
            class="sp-text sp-text--ink sp-context"
            data-stage-verdict
            data-part="claim"
            style="font-size: 12px; line-height: 1.35"
          >${s.touching.note}</span>
        </div>
      </div>
    </div>
  `;let p=e(l,`scene`),m=e(l,`blob`),h=e(l,`claim`),g=[e(l,`blob-1`),e(l,`blob-2`),e(l,`blob-3`)],_=t(l),v=`touching`,y=[],b,x=e=>{for(let e of y)e.cancel();y=[],g.forEach((t,n)=>{t.style.transform=`translateX(${s[e].offsets[n]??0}px)`}),p.dataset.state=`rested`},S=e=>{u.clearTimeout(b);let t=s[v].offsets,n=s[e].offsets;if(v=e,p.dataset.gap=e,m.dataset.gap=e,h.textContent=s[e].note,_)return x(e);for(let e of y)e.cancel();p.dataset.state=`moving`,y=g.map((e,r)=>e.animate([{transform:`translateX(${t[r]??0}px)`},{transform:`translateX(${n[r]??0}px)`}],{duration:o,easing:`cubic-bezier(0.4, 0.05, 0.25, 1)`,fill:`forwards`})),b=u.setTimeout(()=>x(e),690)};e(l,`mode`).addEventListener(`change`,e=>S(e.detail)),x(`touching`)}export{l as mount};