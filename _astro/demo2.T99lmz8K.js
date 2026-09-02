import{n as e,r as t,t as n}from"./parts.C-YLuC7Q.js";var r={l:.62,c:.15},i=[{angle:25,name:`red`},{angle:70,name:`amber`},{angle:140,name:`green`},{angle:195,name:`teal`},{angle:265,name:`indigo`},{angle:325,name:`magenta`}],a=265,o=e=>e.charAt(0).toUpperCase()+e.slice(1),s=e=>`oklch(${r.l} ${r.c} ${e})`,c=e=>`color-mix(in oklab, ${s(e)} 16%, var(--sp-surface))`;function l(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 340px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">oklch</span>
          <span class="sp-text">L 0.62 · C 0.15</span>
        </div>

        <div class="sp-row" data-part="strip" data-subject data-hue="${a}"
             style="gap: 0; margin-top: 12px; border-radius: 6px; overflow: hidden">${i.map(({angle:e})=>`
      <button data-part="stop-${e}" aria-label="hue ${e}"
              style="flex: 1 1 0; height: 44px; padding: 0; border: 0; cursor: pointer; background: ${s(e)}"></button>`).join(``)}</div>
        <div class="sp-row" style="gap: 0; margin-top: 5px">${i.map(({angle:e})=>`<span class="sp-label" data-part="tick" style="flex: 1 1 0; text-align: center; font-size: 10px">${e}</span>`).join(``)}</div>

        <div class="sp-row sp-context" data-part="sample"
             style="margin-top: 16px; padding: 10px 12px; border: 1px solid var(--sp-line); border-radius: var(--sp-radius); background: ${c(a)}">
          <span class="sp-swatch" data-part="dot" style="width: 16px; height: 16px; border-radius: 50%; --sp-swatch: ${s(a)}"></span>
          <span class="sp-grow sp-text sp-text--ink" data-part="name">Indigo</span>
          <span class="sp-text" data-part="value" style="width: 52px; text-align: right">H ${a}</span>
        </div>
      </div>
    </div>
  `;let l=e(r,`strip`),u=e(r,`sample`),d=e(r,`dot`),f=e(r,`name`),p=e(r,`value`),m=i.map(t=>({stop:t,el:e(r,`stop-${t.angle}`)})),h=t(r,`tick`),g=e=>{let t=i.find(t=>t.angle===e);t&&(l.dataset.hue=String(e),m.forEach((t,r)=>{let i=t.stop.angle===e;n(t.el,`data-selected`,i),t.el.style.boxShadow=i?`inset 0 0 0 2px var(--sp-surface), inset 0 0 0 4px var(--sp-ink)`:``;let a=h[r];a&&(a.style.color=i?`var(--sp-ink)`:``)}),u.style.background=c(e),d.style.setProperty(`--sp-swatch`,s(e)),f.textContent=o(t.name),p.textContent=`H ${e}`)};g(a);for(let e of m)e.el.addEventListener(`click`,()=>g(e.stop.angle))}export{l as mount};