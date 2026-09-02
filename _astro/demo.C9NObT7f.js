import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[{key:`1`,name:`Harbour, dusk`,wash:`linear-gradient(135deg, #5b8def, #9b6ef3)`},{key:`2`,name:`Rooftop, noon`,wash:`linear-gradient(135deg, #f2913d, #e0554f)`},{key:`3`,name:`Estuary, dawn`,wash:`linear-gradient(135deg, #2fb8a5, #3d7ff2)`},{key:`4`,name:`Terrace, rain`,wash:`linear-gradient(135deg, #f6c15b, #ef7d5a)`}];function r(r){let i=n.map(({key:e,name:t,wash:n})=>`
      <button
        class="sp-button sp-button--ghost"
        type="button"
        data-part="thumb-${e}"
        ${e===`2`?`data-subject`:``}
        aria-label="${t}"
        style="padding: 3px; width: 62px; height: 46px; flex: 0 0 auto"
      >
        <span class="sp-swatch" style="display: block; width: 100%; height: 100%; --sp-swatch: ${n}"></span>
      </button>`).join(``);r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Shoot 04</span></div>
        <div class="sp-body sp-context">
          <div class="sp-swatch" data-part="preview" style="height: 100px; --sp-swatch: ${n[0]?.wash}"></div>
          <div class="sp-text sp-text--ink" data-part="caption" style="margin: 8px 2px 10px; min-height: 20px">${n[0]?.name}</div>
        </div>
        <div class="sp-row" data-part="strip" style="flex: 0 0 auto; gap: 8px; padding: 0 12px 12px">${i}</div>
      </div>
    </div>
  `;let a=e(r,`preview`),o=e(r,`caption`),s=n.map(t=>({shot:t,el:e(r,`thumb-${t.key}`)})),c=e=>{for(let{shot:n,el:r}of s){let i=n.key===e;t(r,`data-selected`,i),i?(r.setAttribute(`aria-current`,`true`),a.style.setProperty(`--sp-swatch`,n.wash),o.textContent=n.name):r.removeAttribute(`aria-current`)}};for(let{shot:e,el:t}of s)t.addEventListener(`click`,()=>c(e.key));c(`1`)}export{r as mount};