import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[{key:`indigo`,hex:`4F46E5`},{key:`amber`,hex:`F59E0B`},{key:`green`,hex:`16A34A`},{key:`rose`,hex:`E11D48`}],r=`4F46E5`,i=[{key:`r`,label:`R`,paint:`#d64545`},{key:`g`,label:`G`,paint:`#2f9e44`},{key:`b`,label:`B`,paint:`#3b6fd4`}],a=e=>[e.slice(0,2),e.slice(2,4),e.slice(4,6)],o=e=>Number.parseInt(e,16);function s(s){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 348px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Palette</span>
          <div class="sp-row" data-part="presets" style="gap: 6px">${n.map(({key:e,hex:t})=>`
      <button data-part="preset-${e}" aria-label="#${t}"
              style="width: 26px; height: 26px; padding: 0; border: 0; border-radius: 6px; cursor: pointer; background: #${t}"></button>`).join(``)}</div>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 14px">
          <span class="sp-swatch sp-context" data-part="preview"
                style="width: 52px; height: 44px; --sp-swatch: #${r}"></span>
          <span class="sp-row" data-part="hex" data-subject data-hex="${r}"
                style="gap: 1px; font-size: 22px; font-weight: 600; line-height: 1.2">
            <span style="color: var(--sp-muted)">#</span>${i.map(({key:e,paint:t},n)=>`
      <span data-part="digits-${e}"
            style="width: 34px; text-align: center; border-radius: 5px; background: color-mix(in oklab, ${t} 16%, var(--sp-surface))"
            >${a(r)[n]}</span>`).join(``)}
          </span>
        </div>

        <div class="sp-stack" style="gap: 9px; margin-top: 16px">${i.map(({key:e,label:t,paint:n},i)=>`
      <div class="sp-row" data-part="chan-${e}">
        <span class="sp-label" style="width: 12px">${t}</span>
        <span class="sp-text sp-text--ink" data-part="pair-${e}" style="width: 24px">${a(r)[i]}</span>
        <span class="sp-grow" style="display: block; height: 8px; border-radius: 999px; background: var(--sp-sunken); overflow: hidden">
          <span data-part="bar-${e}"
                style="display: block; height: 100%; width: ${o(a(r)[i]??`00`)/255*100}%; background: ${n}"></span>
        </span>
        <span class="sp-text" data-part="value-${e}" style="width: 30px; text-align: right">${o(a(r)[i]??`00`)}</span>
      </div>`).join(``)}</div>
      </div>
    </div>
  `;let c=e(s,`hex`),l=e(s,`preview`),u=n.map(t=>({preset:t,el:e(s,`preset-${t.key}`)})),d=n=>{let r=a(n);c.dataset.hex=n,l.style.setProperty(`--sp-swatch`,`#${n}`),i.forEach(({key:t},n)=>{let i=r[n]??`00`,a=o(i);e(s,`digits-${t}`).textContent=i,e(s,`pair-${t}`).textContent=i,e(s,`bar-${t}`).style.width=`${a/255*100}%`,e(s,`value-${t}`).textContent=String(a)});for(let e of u){let r=e.preset.hex===n;t(e.el,`data-selected`,r),e.el.style.boxShadow=r?`0 0 0 2px var(--sp-surface), 0 0 0 4px var(--sp-ink)`:``}};d(r);for(let e of u)e.el.addEventListener(`click`,()=>d(e.preset.hex))}export{s as mount};