import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=1200,i=60,a=[{key:`tool-line`,label:`Line`,glyph:`minus`},{key:`dwell`,label:`Draw`,glyph:`pencil`},{key:`tool-stamp`,label:`Stamp`,glyph:`star`}],o=[`position: absolute`,`left: 50%`,`top: 50%`,`width: 38px`,`height: 38px`,`margin: -19px 0 0 -19px`,`border-radius: 50%`,`pointer-events: none`,`opacity: 0`,`transition: opacity 0.12s`,`background: conic-gradient(var(--sp-accent) calc(var(--sp-dwell, 0) * 1turn), var(--sp-sunken) 0)`,`mask: radial-gradient(circle, transparent 16px, #000 17px)`].join(`; `);function s(s,c){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 278px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Notes</span>
          <span class="sp-text" data-part="readout" style="width: 246px; text-align: right; white-space: nowrap">Line selected</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px">
          <div
            class="sp-row sp-surface"
            data-part="toolbar"
            data-outcome="idle"
            style="gap: 6px; padding: 6px"
          >${a.map(({key:e,label:t,glyph:r})=>{let i=e===`dwell`;return`
      <button
        class="sp-button sp-button--ghost${i?``:` sp-context`}"
        type="button"
        data-part="${e}"
        ${i?`data-subject`:``}
        aria-label="${t}"
        style="position: relative; width: 46px; height: 46px; padding: 0; display: flex; align-items: center; justify-content: center"
      >
        ${n(r)}
        <span data-part="ring-${e}" style="${o}"></span>
      </button>`}).join(``)}</div>

          <div
            class="sp-surface sp-context"
            data-part="away"
            style="display: flex; flex-direction: column; justify-content: space-between; width: 400px; height: 132px; padding: 12px"
          >
            <div class="sp-stack" style="gap: 8px">
              <div class="sp-line" style="width: 88%"></div>
              <div class="sp-line" style="width: 64%"></div>
              <div class="sp-line" style="width: 78%"></div>
            </div>
            <span class="sp-label">Last edited 2 minutes ago</span>
          </div>
        </div>
      </div>
    </div>
  `;let l=e(s,`toolbar`),u=e(s,`readout`),d,f=0,p,m=(e,t)=>{l.dataset.outcome=e,u.textContent=t},h=(t,n,r)=>{let i=e(s,`ring-${t}`);i.style.setProperty(`--sp-dwell`,String(n)),i.style.opacity=r?`1`:`0`},g=()=>{c.clearTimeout(d),d=void 0,p&&h(p,0,!1),p=void 0,f=0},_=n=>{let i=a.find(e=>e.key===n)?.label??``;g();for(let r of a)t(e(s,r.key),`data-selected`,r.key===n);m(`activated`,`${i} chosen by resting ${r} ms`)},v=e=>{if(f+=i,h(e,Math.min(f/r,1),!0),f>=r)return _(e);m(`dwelling`,`Dwelling: ${f} of ${r} ms`),d=c.setTimeout(()=>v(e),i)};for(let{key:t,label:n}of a){let r=e(s,t);r.addEventListener(`pointerenter`,()=>{g(),p=t,h(t,0,!0),m(`dwelling`,`Dwelling on ${n}`),d=c.setTimeout(()=>v(t),i)}),r.addEventListener(`pointerleave`,()=>{if(p!==t)return;let e=f;g(),m(`cancelled`,`Left after ${e} ms: the ring emptied`)})}t(e(s,`tool-line`),`data-selected`,!0)}export{s as mount};