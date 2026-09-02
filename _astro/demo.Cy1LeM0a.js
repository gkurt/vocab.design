import{n as e,t}from"./parts.C-YLuC7Q.js";import{r as n}from"./measure.DK7AY2_i.js";var r=434,i=122,a=32,o=8,s=394,c=98,l=106,u=400,d=100,f=2,p=3.4,m=10,h=30,g=[{key:`auth`,label:`Auth`},{key:`search`,label:`Search`},{key:`media`,label:`Media`},{key:`sync`,label:`Sync`}],_=[{key:`a1`,service:`auth`,lat:30,mem:18},{key:`a2`,service:`auth`,lat:45,mem:22},{key:`a3`,service:`auth`,lat:62,mem:15},{key:`a4`,service:`auth`,lat:74,mem:31},{key:`a5`,service:`auth`,lat:105,mem:40},{key:`a6`,service:`auth`,lat:56,mem:30},{key:`a7`,service:`auth`,lat:38,mem:11},{key:`a8`,service:`auth`,lat:66,mem:45},{key:`s1`,service:`search`,lat:120,mem:55},{key:`s2`,service:`search`,lat:150,mem:62},{key:`s3`,service:`search`,lat:186,mem:71},{key:`s4`,service:`search`,lat:216,mem:50},{key:`s5`,service:`search`,lat:268,mem:74},{key:`s6`,service:`search`,lat:100,mem:88},{key:`s7`,service:`search`,lat:330,mem:66},{key:`m1`,service:`media`,lat:142,mem:90},{key:`m2`,service:`media`,lat:175,mem:34},{key:`m3`,service:`media`,lat:232,mem:43},{key:`m4`,service:`media`,lat:236,mem:67},{key:`m5`,service:`media`,lat:302,mem:91},{key:`m6`,service:`media`,lat:358,mem:77},{key:`m7`,service:`media`,lat:72,mem:58},{key:`y1`,service:`sync`,lat:198,mem:15},{key:`y2`,service:`sync`,lat:276,mem:17},{key:`y3`,service:`sync`,lat:312,mem:29},{key:`y4`,service:`sync`,lat:352,mem:24},{key:`y5`,service:`sync`,lat:204,mem:36},{key:`y6`,service:`sync`,lat:162,mem:10}],v={lat:90,mem:78},y={lat:250,mem:26},b=e=>a+e/u*s,x=e=>l-e/d*c,S=e=>Math.round((e-a)/s*u),C=e=>Math.round((l-e)/c*d),w=e=>_.filter(t=>t.service===e).length,T=(e,t)=>{let n=b(e.lat),r=x(e.mem);return n>=t.x1&&n<=t.x2&&r>=t.y1&&r<=t.y2},E=(e,t,n)=>Math.min(Math.max(e,t),n),D=(e,t)=>`
  <span
    data-part="${e}"
    style="position: absolute; z-index: 2; left: ${(b(t.lat)-6).toFixed(1)}px; top: ${(x(t.mem)-6).toFixed(1)}px;
           width: 12px; height: 12px; pointer-events: none"
  ></span>`,O=_.map(e=>`<circle
      data-part="dot-${e.key}"
      data-in
      cx="${b(e.lat).toFixed(1)}" cy="${x(e.mem).toFixed(1)}" r="${p}"
      fill="var(--sp-accent)"
      style="transition: fill 0.2s linear, opacity 0.2s linear"
    />`).join(``),k=[0,50,100].map(e=>`<text x="26" y="${(x(e)+3).toFixed(1)}" text-anchor="end" fill="var(--sp-muted)" font-size="9">${e}</text>`).join(``),A=[0,200,400].map((e,t)=>{let n=t===0?`start`:t===2?`end`:`middle`,r=t===2?`400 ms`:String(e);return`<text x="${b(e).toFixed(1)}" y="118" text-anchor="${n}" fill="var(--sp-muted)" font-size="9">${r}</text>`}).join(``),j=({key:e,label:t})=>`
  <div class="sp-row" style="gap: 8px; height: 13px">
    <span class="sp-label" style="flex: 0 0 auto; width: 44px; font-size: 11px; color: var(--sp-ink)">${t}</span>
    <div class="sp-progress" data-part="bar-${e}" style="flex: 0 0 auto; width: ${w(e)*h}px; --sp-value: 100%">
      <div class="sp-progress-fill"></div>
    </div>
    <span
      data-part="count-${e}"
      data-hits="${w(e)}"
      style="flex: 0 0 auto; width: 44px; font-size: 11px; font-variant-numeric: tabular-nums"
    >${w(e)} / ${w(e)}</span>
  </div>`;function M(s){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 296px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Run explorer</span>
          <span
            class="sp-label"
            data-part="readout"
            data-count="${_.length}"
            role="status"
            style="font-size: 12px; color: var(--sp-ink); font-variant-numeric: tabular-nums; white-space: nowrap"
          >${_.length} of ${_.length} runs</span>
          <button
            class="sp-button sp-button--ghost sp-button--sm"
            data-part="clear"
            type="button"
            style="font-size: 12px; padding: 4px 10px"
          >Clear brush</button>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 8px 12px">
          <div class="sp-surface" style="flex: 0 0 auto; padding: 6px 8px">
            <div
              data-part="plot"
              style="position: relative; width: ${r}px; height: ${i}px; touch-action: none; user-select: none"
            >
              <span
                data-part="brush"
                data-subject
                style="position: absolute; left: 0; top: 0; width: 0; height: 0; opacity: 0;
                       border: ${f}px solid var(--sp-accent); border-radius: 3px; background: var(--sp-accent-soft);
                       transition: opacity 0.12s linear; pointer-events: none"
              ></span>
              <svg
                role="img"
                aria-label="Twenty eight runs plotted by latency and memory"
                viewBox="0 0 ${r} ${i}"
                width="${r}"
                height="${i}"
                style="position: relative; z-index: 1; display: block"
              >
                <line x1="${a}" y1="${l}" x2="426" y2="${l}" stroke="var(--sp-line)" stroke-width="${f}" />
                <line x1="${a}" y1="${o}" x2="${a}" y2="${l}" stroke="var(--sp-line)" stroke-width="${f}" />
                <text x="37" y="16" fill="var(--sp-muted)" font-size="9">MB</text>
                ${k}
                ${A}
                ${O}
              </svg>
              ${D(`brush-start`,v)}
              ${D(`brush-end`,y)}
            </div>
          </div>

          <div class="sp-surface" style="flex: 0 0 auto; width: 452px; padding: 6px 8px">
            <div class="sp-row sp-row--between" style="height: 15px">
              <span class="sp-label" style="font-size: 11px">Brushed runs per service</span>
              <span
                class="sp-label"
                data-part="range"
                style="width: 250px; font-size: 11px; text-align: right; white-space: nowrap; overflow: hidden"
              >No brush: every run is in view</span>
            </div>
            <div class="sp-stack" style="gap: 3px; margin-top: 4px">
              ${g.map(j).join(``)}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let c=e(s,`plot`),u=e(s,`brush`),d=e(s,`readout`),p=e(s,`range`),h=_.map(t=>({run:t,el:e(s,`dot-${t.key}`)})),b=g.map(({key:t})=>({key:t,total:w(t),bar:e(s,`bar-${t}`),count:e(s,`count-${t}`)})),x,M,N=()=>{let e=M,n=e?_.filter(t=>T(t,e)):_,r=new Set(n.map(e=>e.key));for(let e of h){let n=r.has(e.run.key);t(e.el,`data-in`,n),e.el.style.fill=n?`var(--sp-accent)`:`var(--sp-muted)`,e.el.style.opacity=n?`1`:`0.45`}for(let e of b){let t=n.filter(t=>t.service===e.key).length;e.bar.style.setProperty(`--sp-value`,`${(t/e.total*100).toFixed(1)}%`),e.count.dataset.hits=String(t),e.count.textContent=`${t} / ${e.total}`}d.dataset.count=String(n.length),d.textContent=`${n.length} of ${_.length} runs`,p.textContent=e?`Latency ${S(e.x1)} to ${S(e.x2)} ms, memory ${C(e.y2)} to ${C(e.y1)} MB`:`No brush: every run is in view`},P=e=>{u.style.left=`${e.x1.toFixed(1)}px`,u.style.top=`${e.y1.toFixed(1)}px`,u.style.width=`${(e.x2-e.x1).toFixed(1)}px`,u.style.height=`${(e.y2-e.y1).toFixed(1)}px`,u.style.opacity=`1`},F=e=>{let t=n(e,c);return{x:E(t.x,a,426),y:E(t.y,o,l)}},I=()=>{M=void 0,u.style.opacity=`0`};c.addEventListener(`pointerdown`,e=>{e.isTrusted&&c.setPointerCapture(e.pointerId),x=F(e),I(),N()}),s.addEventListener(`pointermove`,e=>{if(!x)return;let t=F(e),n={x1:Math.min(x.x,t.x),y1:Math.min(x.y,t.y),x2:Math.max(x.x,t.x),y2:Math.max(x.y,t.y)};n.x2-n.x1<m||n.y2-n.y1<m?I():(M=n,P(n)),N()});let L=()=>{x&&(x=void 0,N())};s.addEventListener(`pointerup`,L),s.addEventListener(`pointercancel`,L),e(s,`clear`).addEventListener(`click`,()=>{x=void 0,I(),N()}),N()}export{M as mount};