import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=150,n=t/2,r=t/2,i=62,a=68,o=54,s=41,c=28,l=2,u={continuous:{start:-135,sweep:270,snap:0,endless:!1,ticks:11,note:`A bounded sweep: 270 degrees with a gap at the bottom, so both end stops are visible.`},stepped:{start:-135,sweep:270,snap:10,endless:!1,ticks:11,note:`Detents make a knob usable without reading the number, which is why hardware has them.`},endless:{start:-180,sweep:360,snap:0,endless:!0,ticks:12,note:`An endless encoder reports how far you turned, not where you stopped, so it never ends.`}},d=[`continuous`,`stepped`,`endless`],f=`continuous`,p=40,m=e=>e<36?`low`:e>64?`high`:`mid`,h=[{key:`hi`,angle:100},{key:`mid`,angle:20},{key:`lo`,angle:-85}],g=(e,t)=>{let i=t*Math.PI/180;return{x:n+e*Math.sin(i),y:r-e*Math.cos(i)}},_=(e,t)=>{let{x:n,y:r}=g(e,t);return`${n.toFixed(2)} ${r.toFixed(2)}`},v=(e,t,n)=>{let r=n-t;if(Math.abs(r)<.3)return``;let i=+(Math.abs(r)>180);return`M ${_(e,t)} A ${e} ${e} 0 ${i} ${+(r>0)} ${_(e,Math.min(n,t+359.4))}`},y=e=>Array.from({length:e.ticks},(t,n)=>{let r=e.endless?e.sweep-e.sweep/e.ticks:e.sweep,o=e.start+n/(e.ticks-1||1)*r,s=g(i,o),c=g(a,o);return`<line
      x1="${s.x.toFixed(2)}" y1="${s.y.toFixed(2)}"
      x2="${c.x.toFixed(2)}" y2="${c.y.toFixed(2)}"
      stroke="var(--sp-muted)" stroke-width="${e.snap?3:l}" stroke-linecap="round"
    />`}).join(``);function b(i){let a=u[f],_=h.map(({key:e,angle:t})=>{let n=g(c,t);return`<circle
        data-part="stop-${e}" aria-hidden="true"
        cx="${n.x.toFixed(2)}" cy="${n.y.toFixed(2)}" r="5"
        fill="var(--sp-accent)" fill-opacity="0" style="pointer-events: none"
      />`}).join(``);i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 236px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Bus compressor</span>
          <span class="sp-label" style="font-size: 12px">Insert 2</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div
            class="sp-surface"
            style="display: flex; align-items: center; justify-content: center; gap: 18px; width: 320px; padding: 10px 14px"
          >
            <svg
              data-part="dial"
              viewBox="0 0 ${t} ${t}"
              width="${t}"
              height="${t}"
              style="display: block; flex: 0 0 auto; touch-action: none"
            >
              <g class="sp-context">
                <path
                  data-part="track-arc"
                  d="${v(o,a.start,a.start+a.sweep)}"
                  fill="none" stroke="var(--sp-line)" stroke-width="6" stroke-linecap="round"
                />
                <circle
                  data-part="track-ring"
                  cx="${n}" cy="${r}" r="${o}"
                  fill="none" stroke="var(--sp-line)" stroke-width="6"
                  hidden
                />
                <g data-part="ticks">${y(a)}</g>
              </g>

              ${_}

              <g data-part="knob" data-subject data-mode="${f}">
                <path data-part="value-arc" d="" fill="none" stroke="var(--sp-accent)" stroke-width="6" stroke-linecap="round" />
                <circle cx="${n}" cy="${r}" r="${s}" fill="var(--sp-surface)" stroke="var(--sp-line)" stroke-width="${l}" />
                <line data-part="pointer" x1="0" y1="0" x2="0" y2="0" stroke="var(--sp-accent)" stroke-width="3" stroke-linecap="round" />
                <circle
                  data-part="grip"
                  role="slider"
                  aria-label="Mix"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  cx="0" cy="0" r="7"
                  fill="var(--sp-accent)"
                  style="cursor: grab; touch-action: none"
                />
              </g>
            </svg>

            <div class="sp-stack sp-context" style="gap: 2px; width: 96px">
              <span class="sp-label" style="font-size: 11px">Mix</span>
              <span
                data-part="readout"
                data-value="${p}"
                data-band="${m(p)}"
                data-mode="${f}"
                role="status"
                style="font-size: 30px; font-weight: 600; line-height: 1.1; font-variant-numeric: tabular-nums"
              >${p}%</span>
              <span class="sp-label" data-part="behaviour" style="font-size: 11px; white-space: nowrap">Bounded sweep</span>
            </div>
          </div>
        </div>
      </div>

              <sp-segmented data-stage-mode class="sp-segmented" data-axis="Travel" data-part="picker" data-value="${f}">
          <button class="sp-segment" type="button" data-part="seg-continuous" value="continuous" style="padding: 4px 10px; font-size: 12px">Continuous</button>
          <button class="sp-segment" type="button" data-part="seg-stepped" value="stepped" style="padding: 4px 10px; font-size: 12px">Stepped</button>
          <button class="sp-segment" type="button" data-part="seg-endless" value="endless" style="padding: 4px 10px; font-size: 12px">Endless</button>
        </sp-segmented>
        <span
          class="sp-label"
          data-stage-verdict data-part="note"
          data-mode="${f}"
          role="status"
          style="height: 15px; font-size: 11px; line-height: 15px; white-space: nowrap; overflow: hidden"
        >${a.note}</span>
      
    </div>
  `;let b=e(i,`dial`),x=e(i,`knob`),S=e(i,`value-arc`),C=e(i,`pointer`),w=e(i,`grip`),T=e(i,`track-arc`),E=e(i,`track-ring`),D=e(i,`ticks`),O=e(i,`readout`),k=e(i,`behaviour`),A=e(i,`note`),j={continuous:`Bounded sweep`,stepped:`Ten detents`,endless:`Relative, no stops`},M=f,N=p,P=!1,F=0,I=()=>u[M],L=()=>{let e=I(),t=e.start+N/100*e.sweep;S.setAttribute(`d`,v(o,e.start,t));let n=g(12,t),r=g(c,t);C.setAttribute(`x1`,n.x.toFixed(2)),C.setAttribute(`y1`,n.y.toFixed(2)),C.setAttribute(`x2`,r.x.toFixed(2)),C.setAttribute(`y2`,r.y.toFixed(2));let i=g(c,t);w.setAttribute(`cx`,i.x.toFixed(2)),w.setAttribute(`cy`,i.y.toFixed(2));let a=Math.round(N);w.setAttribute(`aria-valuenow`,String(a)),O.dataset.value=String(a),O.dataset.band=m(a),O.textContent=`${a}%`},R=e=>{let t=I(),n=e;n=t.endless?(n%100+100)%100:Math.max(0,Math.min(100,n)),t.snap&&(n=Math.round(n/t.snap)*t.snap),N=n,L()},z=e=>{if(!d.includes(e))return;M=e;let t=I();x.dataset.mode=e,O.dataset.mode=e,A.dataset.mode=e,A.textContent=t.note,k.textContent=j[e]??``,D.innerHTML=y(t),T.setAttribute(`d`,v(o,t.start,t.start+t.sweep)),t.endless?(T.setAttribute(`hidden`,``),E.removeAttribute(`hidden`)):(E.setAttribute(`hidden`,``),T.removeAttribute(`hidden`)),R(N)},B=e=>{let t=b.getBoundingClientRect(),n=e.clientX-(t.left+t.width/2),r=e.clientY-(t.top+t.height/2);return Math.atan2(n,-r)*180/Math.PI},V=e=>{let t=I(),n=B(e);if(t.endless){let e=((n-F+540)%360-180)/t.sweep;F=n,R(N+e*100);return}let r=Math.max(t.start,Math.min(t.start+t.sweep,n));R((r-t.start)/t.sweep*100)};w.addEventListener(`pointerdown`,e=>{e.isTrusted&&w.setPointerCapture(e.pointerId),P=!0,F=B(e),w.setAttribute(`r`,`8`)}),i.addEventListener(`pointermove`,e=>{P&&V(e)});let H=e=>{P&&(P=!1,w.setAttribute(`r`,`7`),V(e))};i.addEventListener(`pointerup`,H),i.addEventListener(`pointercancel`,H),e(i,`picker`).addEventListener(`change`,e=>z(e.detail)),z(f)}export{b as mount};