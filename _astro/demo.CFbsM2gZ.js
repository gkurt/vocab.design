import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=480,i=60,a=[`position: relative`,`display: flex`,`align-items: flex-end`,`overflow: hidden`,`height: 60px`,`padding: 0`,`user-select: none`].join(`; `),o=[`width: 100%`,`padding: 2px 6px`,`background: rgb(16 24 40 / 0.42)`,`color: #ffffff`,`font-size: 11px`].join(`; `),s=[{name:`Dock`,wash:`linear-gradient(#a8c8e4, #cdd8c8)`},{name:`Harbour`,wash:`linear-gradient(#efc59d, #90a6b7)`},{name:`Ferry`,wash:`linear-gradient(#b8caa7, #70889b)`}],c=[{key:`share`,label:`Share`,glyph:`share`,done:`Shared`},{key:`album`,label:`Add to album`,glyph:`plus`,done:`Added to album`},{key:`delete`,label:`Delete`,glyph:`trash`,done:`Deleted`}];function l(l,u){l.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Library</span>
          <span class="sp-text" data-part="readout" style="width: 168px; text-align: right">3 photos</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center">
          <div style="position: relative; width: 300px">
            <div class="sp-grid" style="grid-template-columns: repeat(3, 1fr)">${s.map(({name:e,wash:t},n)=>{let r=n===1;return`
      <div
        class="sp-surface${r?``:` sp-context`}"
        ${r?`data-part="tile" data-subject role="button" tabindex="0" aria-haspopup="menu"`:``}
        style="${a}; background: ${t}; cursor: ${r?`pointer`:`default`}; touch-action: none; transition: transform 0.16s var(--sp-ease), box-shadow 0.16s var(--sp-ease)"
      >
        <span style="${o}">${e}</span>
        ${r?`<span
                 data-part="ring"
                 style="position: absolute; left: 50%; top: 50%; width: 36px; height: 36px; margin: -18px 0 0 -18px; border-radius: 50%; pointer-events: none; opacity: 0; transition: opacity 0.12s; background: conic-gradient(var(--sp-accent) calc(var(--sp-hold, 0) * 1turn), rgb(255 255 255 / 0.5) 0); mask: radial-gradient(circle, transparent 11px, #000 12px)"
               ></span>`:``}
      </div>`}).join(``)}</div>
            <div
              class="sp-menu"
              data-part="menu"
              role="menu"
              aria-label="Photo actions"
              style="left: 50%; top: calc(100% + 8px); margin-left: -76px; min-width: 152px; transform-origin: top center"
            >${c.map(({key:e,label:t,glyph:r})=>`
      <button class="sp-menu-item" type="button" role="menuitem" data-part="action-${e}">
        ${n(r)}
        ${t}
      </button>`).join(``)}</div>
          </div>
        </div>
      </div>
    </div>
  `;let d=e(l,`tile`),f=e(l,`ring`),p=e(l,`menu`),m=e(l,`readout`),h,g=0,_=!1,v=e=>{m.textContent=e},y=()=>{u.clearTimeout(h),h=void 0,g=0,f.style.setProperty(`--sp-hold`,`0`),f.style.opacity=`0`},b=()=>{y(),_=!0,t(d,`data-held`,!0),d.removeAttribute(`data-tapped`),d.style.transform=`scale(1.04)`,d.style.boxShadow=`var(--sp-shadow)`,t(p,`data-open`,!0),v(`Held: quick actions`)},x=()=>{if(g+=i,f.style.setProperty(`--sp-hold`,String(Math.min(g/r,1))),g>=r)return b();h=u.setTimeout(x,i)},S=()=>{_||(y(),f.style.opacity=`1`,v(`Holding`),h=u.setTimeout(x,i))},C=e=>{_=!1,y(),d.removeAttribute(`data-held`),d.style.transform=``,d.style.boxShadow=``,t(p,`data-open`,!1),v(e)};d.addEventListener(`pointerdown`,S),d.addEventListener(`pointerup`,()=>{_||h===void 0||(y(),t(d,`data-tapped`,!0),v(`Tapped: preview`))});for(let e of[`pointercancel`,`pointerleave`])d.addEventListener(e,()=>{_||y()});for(let{key:t,done:n}of c)e(l,`action-${t}`).addEventListener(`click`,()=>C(n));l.addEventListener(`pointerdown`,e=>{let t=e.target;_&&!d.contains(t)&&!p.contains(t)&&C(`Dismissed`)})}export{l as mount};