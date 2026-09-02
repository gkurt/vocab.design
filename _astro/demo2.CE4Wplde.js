import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import{r}from"./measure.DK7AY2_i.js";var i=800,a=60,o={w:200,h:224},s=48,c=[12,76,140],l=[12,84,156],u={x:c[1],y:l[1]},d={x:c[2],y:l[2]},f={left:8,top:8,w:184,h:206},p=[`inset(${u.y-f.top}px`,`${f.left+f.w-u.x-s}px`,`${f.top+f.h-u.y-s}px`,`${u.x-f.left}px round 13px)`].join(` `),m=[{key:`notes`,name:`Notes`,glyph:`pencil`,wash:`linear-gradient(160deg, #f2b134, #d18e12)`,x:c[0],y:l[0]},{key:`music`,name:`Music`,glyph:`heart`,wash:`linear-gradient(160deg, #f0736a, #cf4136)`,x:c[1],y:l[0]},{key:`starred`,name:`Starred`,glyph:`star`,wash:`linear-gradient(160deg, #b48ae0, #7d55bb)`,x:c[2],y:l[0]},{key:`search`,name:`Search`,glyph:`search`,wash:`linear-gradient(160deg, #4fc3a1, #1f8f74)`,x:c[0],y:l[1]},{key:`shared`,name:`Shared`,glyph:`share`,wash:`linear-gradient(160deg, #61c1e8, #2b8cc0)`,x:c[2],y:l[1]},{key:`settings`,name:`Settings`,glyph:`sliders`,wash:`linear-gradient(160deg, #8b93a5, #5f6779)`,x:c[0],y:l[2]},{key:`alerts`,name:`Alerts`,glyph:`bell`,wash:`linear-gradient(160deg, #5b8def, #2f5bd0)`,x:c[1],y:l[2]}],h=[{name:`Mail`,glyph:`inbox`,wash:`linear-gradient(160deg, #5b8def, #2f5bd0)`},{name:`Calendar`,glyph:`calendar`,wash:`linear-gradient(160deg, #ef7c5c, #d1492f)`},{name:`Files`,glyph:`copy`,wash:`linear-gradient(160deg, #4fc3a1, #1f8f74)`}],g=[12,70,128],_=[`display: block`,`margin-top: 3px`,`font-size: 10px`,`line-height: 13px`,`text-align: center`,`color: #ffffff`,`text-shadow: 0 1px 2px rgb(16 24 40 / 0.55)`,`white-space: nowrap`,`overflow: hidden`,`text-overflow: ellipsis`].join(`; `);function v(e,t,r=s){return`<span style="display: flex; align-items: center; justify-content: center; width: ${r}px; height: ${r}px;
            border-radius: 13px; background: ${e}; color: #ffffff; box-shadow: 0 2px 6px rgb(16 24 40 / 0.34)"
          >${n(t)}</span>`}function y(n,c){let l=h.map(({wash:e},t)=>`
      <span style="position: absolute; left: ${t%2?26:6}px; top: ${t>1?26:6}px; width: 16px; height: 16px;
        border-radius: 5px; background: ${e}"></span>`).join(``),y=h.map(({name:e,glyph:t,wash:n},r)=>`
      <div style="position: absolute; left: ${g[r]}px; top: 40px; width: 44px">
        ${v(n,t,44)}
        <span style="${_}; color: var(--sp-ink); text-shadow: none">${e}</span>
      </div>`).join(``),b=g.map((e,t)=>`
      <div style="position: absolute; left: ${e}px; top: 104px; width: 44px">
        <span
          data-part="landing-${t}"
          style="display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 13px;
                 border: 1px dashed var(--sp-line); opacity: ${t===0?1:.36}"
        ></span>
        <span data-part="landing-name-${t}" style="${_}; color: var(--sp-ink); text-shadow: none"></span>
      </div>`).join(``),x=m.map(({key:e,name:t,glyph:n,wash:r,x:i,y:a})=>`
      <div
        class="sp-context"
        data-part="app-${e}"
        data-at="home"
        style="position: absolute; left: ${i}px; top: ${a}px; width: ${s}px; z-index: 4; touch-action: none;
               user-select: none; transition: opacity 0.2s ease"
      >
        <div data-part="lift-${e}" style="transition: transform 0.14s var(--sp-ease), filter 0.14s ease">
          ${v(r,n)}
          <span style="${_}">${t}</span>
        </div>
      </div>`).join(``);n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 260px; height: 304px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Home screen</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; padding: 6px 12px">
          <div
            data-part="screen"
            data-touch
            style="position: relative; flex: 0 0 auto; width: ${o.w}px; height: ${o.h}px; border-radius: 16px;
                   overflow: hidden; background: linear-gradient(165deg, #2f3550 0%, #4a4f74 55%, #6f6a95 100%)"
          >
            <div
              class="sp-context"
              data-part="free"
              style="position: absolute; left: ${d.x}px; top: ${d.y}px; width: ${s}px; height: ${s}px;
                     border: 1px dashed rgb(255 255 255 / 0.34); border-radius: 13px"
            ></div>

            <div
              data-part="folder-tile"
              data-subject
              style="position: absolute; left: ${u.x}px; top: ${u.y}px; width: ${s}px"
            >
              <span
                data-part="folder"
                style="position: relative; display: block; width: ${s}px; height: ${s}px; border-radius: 13px;
                       background: rgb(255 255 255 / 0.26); box-shadow: 0 2px 6px rgb(16 24 40 / 0.28)"
              >
                ${l}
                <span
                  data-part="folder-added"
                  style="position: absolute; left: 26px; top: 26px; width: 16px; height: 16px; border-radius: 5px;
                         opacity: 0; transition: opacity 0.18s ease"
                ></span>
                <span
                  data-part="ring"
                  style="position: absolute; left: -14px; top: -14px; width: 76px; height: 76px; border-radius: 50%; opacity: 0;
                         transition: opacity 0.12s;
                         background: conic-gradient(var(--sp-accent) calc(var(--sp-dwell, 0) * 1turn), rgb(255 255 255 / 0.42) 0);
                         mask: radial-gradient(circle, transparent 29px, #000 31px)"
                ></span>
              </span>
              <span style="${_}">Work</span>
            </div>

            ${x}

            <div
              class="sp-surface"
              data-part="folder-open"
              style="position: absolute; left: ${f.left}px; top: ${f.top}px; width: ${f.w}px; height: ${f.h}px;
                     z-index: 6; border-radius: 14px; box-shadow: 0 8px 24px rgb(16 24 40 / 0.4); opacity: 0;
                     pointer-events: none; clip-path: ${p};
                     transition: clip-path 0.26s var(--sp-ease), opacity 0.18s ease"
            >
              <span class="sp-heading" style="position: absolute; left: 12px; top: 10px; font-size: 13px">Work</span>
              <span class="sp-label" data-part="folder-count" style="position: absolute; right: 12px; top: 12px; font-size: 11px"
                >3 apps</span
              >
              ${y}
              ${b}
            </div>

            <span style="position: absolute; left: 50%; bottom: 5px; display: flex; gap: 5px; transform: translateX(-50%)">
              <span style="width: 5px; height: 5px; border-radius: 50%; background: rgb(255 255 255 / 0.85)"></span>
              <span style="width: 5px; height: 5px; border-radius: 50%; background: rgb(255 255 255 / 0.34)"></span>
            </span>
          </div>

          <span
            class="sp-label sp-context"
            data-part="readout"
            style="width: 236px; height: 28px; text-align: center; font-size: 11px; line-height: 14px"
          ></span>
        </div>
      </div>
    </div>
  `;let S=e(n,`folder`),C=e(n,`folder-open`),w=e(n,`folder-added`),T=e(n,`folder-count`),E=e(n,`free`),D=e(n,`ring`),O=e(n,`readout`),k,A={x:0,y:0},j,M=0,N=!1,P=0,F=e=>{O.textContent=e},I=(e,t,n)=>{let r=e.getBoundingClientRect();return t>=r.left&&t<=r.right&&n>=r.top&&n<=r.bottom},L=()=>{c.clearTimeout(j),j=void 0,M=0,D.style.setProperty(`--sp-dwell`,`0`),D.style.opacity=`0`},R=e=>{N=e,L(),t(C,`data-open`,e),C.style.opacity=e?`1`:`0`,C.style.clipPath=e?`inset(0 round 14px)`:p},z=()=>{if(M+=a,D.style.setProperty(`--sp-dwell`,String(Math.min(M/i,1))),M>=i){R(!0),F(`Dwell paid: Work sprang open over the screen`);return}j=c.setTimeout(z,a)},B=()=>{N||j!==void 0||(M=0,D.style.setProperty(`--sp-dwell`,`0`),D.style.opacity=`1`,F(`Over Work: the dwell is counting`),j=c.setTimeout(z,a))},V=(t,r,i)=>{if(P>=g.length)return`Work is full: ${t.name} went back`;let a=e(n,`landing-${P}`);a.innerHTML=v(t.wash,t.glyph,42),a.style.border=`0`,a.style.opacity=`1`,e(n,`landing-name-${P}`).textContent=t.name,P++;let o=n.querySelector(`[data-part="landing-${P}"]`);return o&&(o.style.opacity=`1`),r.dataset.at=`folder`,r.style.opacity=`0`,w.style.background=t.wash,w.style.opacity=`1`,T.textContent=`${h.length+P} apps`,i?`Filed ${t.name} inside: Work closed itself again`:`Dropped on Work: ${t.name} filed without it ever opening`};for(let t of m){let i=e(n,`app-${t.key}`),a=e(n,`lift-${t.key}`);i.addEventListener(`pointerdown`,e=>{i.dataset.at===`folder`||k||(e.isTrusted&&i.setPointerCapture(e.pointerId),k={el:i,lift:a,tile:t,from:i.dataset.at??`home`},i.dataset.at=`carried`,A=r(e,n),i.style.zIndex=`8`,a.style.transform=`scale(1.1)`,a.style.filter=`drop-shadow(0 7px 10px rgb(16 24 40 / 0.5))`,F(`Carrying ${t.name}`))})}n.addEventListener(`pointermove`,e=>{if(!k)return;let t=r(e,n);if(k.el.style.transform=`translate(${t.x-A.x}px, ${t.y-A.y}px)`,I(S,e.clientX,e.clientY))return B();j!==void 0&&(F(M?`Crossed Work in ${M} ms: it stayed shut`:`Crossed Work without stopping: it stayed shut`),L())});let H=t=>{if(!k)return;let{el:r,lift:i,tile:a,from:o}=k;k=void 0,L(),r.style.transform=``,r.style.zIndex=``,i.style.transform=``,i.style.filter=``;let s=N&&I(C,t.clientX,t.clientY),c=!m.some(({key:t})=>e(n,`app-${t}`).dataset.at===`free`)&&I(E,t.clientX,t.clientY),l=I(S,t.clientX,t.clientY);if(N&&R(!1),s||l){let e=V(a,r,s);return r.dataset.at!==`folder`&&(r.dataset.at=o),F(e)}if(r.dataset.at=o,c)return r.dataset.at=`free`,r.style.left=`${d.x}px`,r.style.top=`${d.y}px`,F(`Dropped on the free spot: Work never opened`);F(`Let go on nothing: ${a.name} stayed put`)};n.addEventListener(`pointerup`,H),n.addEventListener(`pointercancel`,H)}export{y as mount};