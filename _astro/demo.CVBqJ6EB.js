import{n as e,r as t,t as n}from"./parts.C-YLuC7Q.js";var r={h:262,c:.06},i=[{l:22,name:`deep`},{l:38,name:`dark`},{l:55,name:`mid`},{l:72,name:`light`},{l:90,name:`pale`}],a=55,o=e=>`oklch(${e/100} ${r.c} ${r.h})`,s=e=>`color-mix(in oklab, ${o(e)} 16%, var(--sp-surface))`;function c(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 340px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">oklch</span>
          <span class="sp-text">H 262 · C 0.06</span>
        </div>

        <div class="sp-row" data-part="ramp" data-subject data-lightness="${a}"
             style="gap: 0; margin-top: 12px; border-radius: 6px; overflow: hidden">${i.map(({l:e})=>`
      <button data-part="stop-${e}" aria-label="lightness ${e/100}"
              style="flex: 1 1 0; height: 44px; padding: 0; border: 0; cursor: pointer; background: ${o(e)}"></button>`).join(``)}</div>
        <div class="sp-row" style="gap: 0; margin-top: 5px">${i.map(({l:e})=>`<span class="sp-label" data-part="tick" style="flex: 1 1 0; text-align: center; font-size: 10px">${e/100}</span>`).join(``)}</div>

        <div class="sp-row sp-context" data-part="sample"
             style="margin-top: 16px; padding: 10px 12px; border: 1px solid var(--sp-line); border-radius: var(--sp-radius); background: ${s(a)}">
          <span class="sp-swatch" data-part="dot" style="width: 16px; height: 16px; border-radius: 50%; --sp-swatch: ${o(a)}"></span>
          <span class="sp-grow sp-text sp-text--ink" data-part="name">Iris mid</span>
          <span class="sp-text" data-part="value" style="width: 52px; text-align: right">L ${a/100}</span>
        </div>
      </div>
    </div>
  `;let c=e(r,`ramp`),l=e(r,`sample`),u=e(r,`dot`),d=e(r,`name`),f=e(r,`value`),p=i.map(t=>({stop:t,el:e(r,`stop-${t.l}`)})),m=t(r,`tick`),h=e=>{let t=i.find(t=>t.l===e);t&&(c.dataset.lightness=String(e),p.forEach((t,r)=>{let i=t.stop.l===e;n(t.el,`data-selected`,i),t.el.style.boxShadow=i?`inset 0 0 0 2px var(--sp-surface), inset 0 0 0 4px var(--sp-ink)`:``;let a=m[r];a&&(a.style.color=i?`var(--sp-ink)`:``)}),l.style.background=s(e),u.style.setProperty(`--sp-swatch`,o(e)),d.textContent=`Iris ${t.name}`,f.textContent=`L ${e/100}`)};h(a);for(let e of p)e.el.addEventListener(`click`,()=>h(e.stop.l))}export{c as mount};