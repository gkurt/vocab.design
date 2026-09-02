import{n as e}from"./parts.C-YLuC7Q.js";var t=[{title:`Capture anything`,tag:`Welcome`},{title:`Find it later`,tag:`Search`},{title:`Share a shelf`,tag:`Together`}];function n(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 280px; height: 250px">
        <div class="sp-context sp-grow" style="overflow: hidden">
          <div
            class="sp-row"
            data-part="track"
            data-index="0"
            style="height: 100%; gap: 0; align-items: stretch; translate: 0 0; transition: translate 0.34s var(--sp-ease)"
          >${t.map(({title:e,tag:n},r)=>`
      <div
        class="sp-stack"
        data-part="page-${r+1}"
        role="group"
        aria-label="Page ${r+1} of ${t.length}"
        style="flex: 0 0 100%; height: 100%; align-items: center; justify-content: center; gap: 10px; padding: 0 24px"
      >
        <div class="sp-swatch" style="width: 56px; height: 56px; --sp-swatch: var(--sp-sunken)"></div>
        <span class="sp-label">${n}</span>
        <span class="sp-heading">${e}</span>
        <div class="sp-line" style="width: 82%"></div>
        <div class="sp-line" style="width: 62%"></div>
      </div>`).join(``)}</div>
        </div>
        <div
          class="sp-row"
          data-part="dots"
          data-subject
          role="group"
          aria-label="Pages"
          style="flex: 0 0 auto; justify-content: center; gap: 6px; padding: 12px 0 14px"
        >${t.map((e,n)=>`
      <button
        class="sp-icon-button"
        type="button"
        data-part="dot-${n+1}"
        aria-label="Page ${n+1} of ${t.length}"
        style="width: 20px; height: 20px"
      >
        <span
          data-part="pip-${n+1}"
          aria-hidden="true"
          style="width: 9px; height: 9px; border-radius: 50%; background: var(--sp-line); transition: background-color 0.2s ease, scale 0.2s var(--sp-ease)"
        ></span>
      </button>`).join(``)}</div>
      </div>
    </div>
  `;let r=e(n,`track`),i=t.map((t,r)=>e(n,`page-${r+1}`)),a=t.map((t,r)=>e(n,`dot-${r+1}`)),o=t.map((t,r)=>e(n,`pip-${r+1}`)),s=0,c=e=>{s=Math.min(t.length-1,Math.max(0,e)),r.dataset.index=String(s),r.style.translate=`${s*-100}% 0`,i.forEach((e,t)=>{e.setAttribute(`aria-hidden`,String(t!==s))}),a.forEach((e,t)=>{t===s?e.setAttribute(`aria-current`,`true`):e.removeAttribute(`aria-current`)}),o.forEach((e,t)=>{e.style.background=t===s?`var(--sp-accent)`:`var(--sp-line)`,e.style.scale=t===s?`1.35`:`1`})};a.forEach((e,t)=>{e.addEventListener(`click`,()=>c(t))}),c(0)}export{n as mount};