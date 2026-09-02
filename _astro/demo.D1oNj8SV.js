import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import{t as n}from"./motion.B5_YXmsy.js";var r=1.4,i=170,a=56,o=480,s=60,c=[{name:`Notes`,glyph:`pencil`,wash:`#dc9a33`},{name:`Mail`,glyph:`inbox`,wash:`#3f74d8`},{name:`Photos`,glyph:`copy`,wash:`#2f9e6f`},{name:`Search`,glyph:`search`,wash:`#5a6270`},{name:`Clock`,glyph:`calendar`,wash:`#2b3038`},{name:`Alerts`,glyph:`bell`,wash:`#d0603f`},{name:`Saved`,glyph:`heart`,wash:`#c2477f`},{name:`Rated`,glyph:`star`,wash:`#7a56cf`}],l=c.map(({name:e,glyph:n,wash:r},o)=>`
    <div
      data-part="app-${o+1}"
      style="position: relative; display: flex; flex-direction: column; align-items: center; gap: 5px; rotate: 0deg;
             transition: rotate ${i}ms linear; cursor: default; touch-action: none; user-select: none"
    >
      <span
        style="display: flex; align-items: center; justify-content: center; width: ${a}px; height: ${a}px;
               border-radius: 14px; background: ${r}; color: #ffffff"
      >${t(n)}</span>
      <span class="sp-label" style="font-size: 11px; color: var(--sp-ink)">${e}</span>
      <span
        data-part="ring-${o+1}"
        aria-hidden="true"
        style="position: absolute; left: 50%; top: ${a/2}px; width: 28px; height: 28px; margin: -14px 0 0 -14px;
               border-radius: 50%; pointer-events: none; opacity: 0; transition: opacity 0.12s linear;
               background: conic-gradient(#ffffff calc(var(--sp-hold, 0) * 1turn), rgb(255 255 255 / 0.28) 0);
               mask: radial-gradient(circle, transparent 8px, #000 9px)"
      ></span>
      <span
        data-part="badge-${o+1}"
        aria-hidden="true"
        style="position: absolute; left: -5px; top: -5px; display: flex; align-items: center; justify-content: center;
               width: 17px; height: 17px; border-radius: 50%; background: var(--sp-ink); opacity: 0; transition: opacity 0.16s linear"
      ><span style="width: 8px; height: 2px; border-radius: 1px; background: var(--sp-surface)"></span></span>
    </div>`).join(``);function u(t,u){t.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 236px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Home</span>
          <span class="sp-text" data-part="readout" style="width: 168px; text-align: right; white-space: nowrap">Hold an app to edit</span>
          <button class="sp-button sp-button--sm" type="button" data-part="done" aria-disabled="true">Done</button>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div
            class="sp-grid"
            data-part="grid"
            data-subject
            data-mode="idle"
            data-pose="[data-mode=editing]"
            style="grid-template-columns: repeat(4, ${a}px); gap: 18px 22px"
          >${l}</div>
        </div>
      </div>
    </div>
  `;let d=e(t,`grid`),f=e(t,`done`),p=e(t,`readout`),m=c.map((n,r)=>e(t,`app-${r+1}`)),h=c.map((n,r)=>e(t,`badge-${r+1}`)),g=c.map((n,r)=>e(t,`ring-${r+1}`)),_=n(t),v,y=0,b,x=0,S,C=()=>{y=1-y;for(let[e,t]of m.entries())t.style.rotate=`${(e+y)%2==0?r:-1.4}deg`;v=u.setTimeout(C,i)},w=()=>{u.clearTimeout(b),b=void 0,x=0,S&&(S.style.setProperty(`--sp-hold`,`0`),S.style.opacity=`0`),S=void 0},T=e=>{d.dataset.mode=e?`editing`:`idle`;for(let t of h)t.style.opacity=e?`1`:`0`;if(f.setAttribute(`aria-disabled`,String(!e)),p.textContent=e?`Editing: drag to rearrange`:`Hold an app to edit`,u.clearTimeout(v),v=void 0,e&&!_)return C();for(let e of m)e.style.rotate=`0deg`},E=e=>{p.textContent=e},D=e=>{if(x+=s,e.style.setProperty(`--sp-hold`,String(Math.min(x/o,1))),x>=o)return w(),T(!0);b=u.setTimeout(()=>D(e),s)};for(let[e,t]of m.entries()){let n=g[e],r=c[e]?.name;if(!(!n||!r)){t.addEventListener(`pointerdown`,()=>{d.dataset.mode!==`editing`&&(w(),S=n,n.style.setProperty(`--sp-hold`,`0`),n.style.opacity=`1`,E(`Holding`),b=u.setTimeout(()=>D(n),s))}),t.addEventListener(`click`,()=>{b!==void 0&&(w(),E(`Opened ${r}`))});for(let e of[`pointercancel`,`pointerleave`])t.addEventListener(e,()=>{b!==void 0&&(w(),E(`Hold an app to edit`))})}}f.addEventListener(`click`,()=>{d.dataset.mode===`editing`&&T(!1)}),T(!1)}export{u as mount};