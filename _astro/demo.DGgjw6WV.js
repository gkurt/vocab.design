import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=[{name:`Harbour, dusk`,wash:`linear-gradient(135deg, #5b8def, #9b6ef3)`},{name:`Rooftop, noon`,wash:`linear-gradient(135deg, #f2913d, #e0554f)`},{name:`Estuary, dawn`,wash:`linear-gradient(135deg, #2fb8a5, #3d7ff2)`},{name:`Terrace, rain`,wash:`linear-gradient(135deg, #f6c15b, #ef7d5a)`},{name:`Quarry, noon`,wash:`linear-gradient(135deg, #8b8f9a, #4f5563)`},{name:`Lighthouse`,wash:`linear-gradient(135deg, #3ec7d8, #2f6fd0)`}],i=`color: #ffffff; background: rgb(255 255 255 / 0.18)`;function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Field notes</span>
          <span class="sp-text">6 photos</span>
        </div>
        <div class="sp-body sp-context">
          <div class="sp-grid" style="grid-template-columns: repeat(3, 1fr); gap: 10px">${r.map(({name:e,wash:t},n)=>`
      <button
        class="sp-button sp-button--ghost"
        type="button"
        data-part="thumb-${n+1}"
        aria-label="Open ${e}"
        style="padding: 3px; height: 58px"
      >
        <span class="sp-swatch" style="display: block; width: 100%; height: 100%; --sp-swatch: ${t}"></span>
      </button>`).join(``)}</div>
        </div>
        <div
          class="sp-scrim"
          data-part="lightbox"
          data-subject
          data-index="0"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; background: rgb(12 16 26 / 0.84)"
        >
          <div class="sp-row" style="gap: 14px">
            <button class="sp-icon-button" type="button" data-part="prev" aria-label="Previous photo" style="${i}">${n(`chevronLeft`)}</button>
            <span
              class="sp-swatch"
              data-part="picture"
              style="width: 196px; height: 128px; --sp-swatch: ${r[0]?.wash}; box-shadow: var(--sp-shadow)"
            ></span>
            <button class="sp-icon-button" type="button" data-part="next" aria-label="Next photo" style="${i}">${n(`chevronRight`)}</button>
          </div>
          <div class="sp-row" style="gap: 10px">
            <span data-part="caption" style="color: #ffffff; font-size: 13px">${r[0]?.name}</span>
            <span data-part="counter" style="color: rgb(255 255 255 / 0.72); font-size: 12px; font-variant-numeric: tabular-nums">1 of ${r.length}</span>
          </div>
          <button
            class="sp-icon-button"
            type="button"
            data-part="close"
            aria-label="Close photo viewer"
            style="position: absolute; top: 10px; right: 10px; ${i}"
          >${n(`close`)}</button>
        </div>
      </div>
    </div>
  `;let o=e(a,`lightbox`),s=e(a,`picture`),c=e(a,`caption`),l=e(a,`counter`),u=e=>{let t=(e-1+r.length)%r.length+1,n=r[t-1];n&&(o.dataset.index=String(t),s.style.setProperty(`--sp-swatch`,n.wash),c.textContent=n.name,l.textContent=`${t} of ${r.length}`)},d=e=>{u(e),t(o,`data-open`,!0)},f=()=>{t(o,`data-open`,!1),o.dataset.index=`0`},p=()=>Number(o.dataset.index??`1`);r.forEach((t,n)=>{e(a,`thumb-${n+1}`).addEventListener(`click`,()=>d(n+1))}),e(a,`prev`).addEventListener(`click`,()=>u(p()-1)),e(a,`next`).addEventListener(`click`,()=>u(p()+1)),e(a,`close`).addEventListener(`click`,f),o.addEventListener(`click`,e=>{e.target===o&&f()}),a.addEventListener(`keydown`,e=>{if(o.hasAttribute(`data-open`)){if(e.key===`Escape`)f();else if(e.key===`ArrowRight`)u(p()+1);else if(e.key===`ArrowLeft`)u(p()-1);else return;e.preventDefault()}})}export{a as mount};