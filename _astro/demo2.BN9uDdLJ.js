import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=[{title:`Reef habitats`,tag:`Chapter one`},{title:`Tide pools`,tag:`Chapter two`},{title:`Kelp forests`,tag:`Chapter three`}];function i(i){let a=r.map(({title:e,tag:t},n)=>`
      <div
        class="sp-row"
        data-part="slide-${n+1}"
        role="group"
        aria-roledescription="slide"
        aria-label="${n+1} of ${r.length}"
        style="flex: 0 0 100%; height: 100%; gap: 12px; padding: 10px"
      >
        <div class="sp-swatch" style="flex: 0 0 84px; height: 100%; --sp-swatch: var(--sp-accent-soft); display: flex; align-items: center; justify-content: center">
          <span class="sp-heading" style="font-size: 24px">${n+1}</span>
        </div>
        <div class="sp-stack" style="flex: 1 1 auto; min-width: 0; gap: 7px">
          <span class="sp-label">${t}</span>
          <span class="sp-heading">${e}</span>
          <div class="sp-line" style="width: 94%"></div>
          <div class="sp-line" style="width: 72%"></div>
        </div>
      </div>`).join(``),o=r.map((e,t)=>`<button class="sp-chip" type="button" data-part="dot-${t+1}" aria-label="Show slide ${t+1}" style="width: 10px; height: 10px; padding: 0"></button>`).join(``);i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 400px; height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Field guide</span>
          <span class="sp-text">Coastal</span>
        </div>
        <div class="sp-body">
          <section data-part="carousel" data-subject role="group" aria-roledescription="carousel" aria-label="Field guide chapters">
            <div class="sp-surface" data-part="viewport" aria-live="polite" style="overflow: hidden; height: 116px">
              <div
                class="sp-row"
                data-part="track"
                data-index="0"
                style="height: 100%; gap: 0; align-items: stretch; translate: 0 0; transition: translate 0.34s var(--sp-ease)"
              >${a}</div>
            </div>
            <div class="sp-row sp-row--between" style="margin-top: 10px">
              <button class="sp-icon-button" type="button" data-part="prev" aria-label="Previous slide">
                <span style="display: flex; rotate: 180deg">${n(`chevronRight`)}</span>
              </button>
              <div class="sp-row" style="gap: 7px">${o}</div>
              <button class="sp-icon-button" type="button" data-part="next" aria-label="Next slide">${n(`chevronRight`)}</button>
            </div>
          </section>
          <div class="sp-stack sp-context" style="margin-top: 12px; gap: 7px">
            <div class="sp-line" style="width: 88%"></div>
            <div class="sp-line" style="width: 64%"></div>
          </div>
        </div>
      </div>
    </div>
  `;let s=e(i,`track`),c=r.map((t,n)=>e(i,`slide-${n+1}`)),l=r.map((t,n)=>e(i,`dot-${n+1}`)),u=0,d=e=>{u=(e+r.length)%r.length,s.dataset.index=String(u),s.style.translate=`${u*-100}% 0`,c.forEach((e,n)=>{t(e,`data-current`,n===u),e.setAttribute(`aria-hidden`,String(n!==u))}),l.forEach((e,n)=>{t(e,`data-selected`,n===u),n===u?e.setAttribute(`aria-current`,`true`):e.removeAttribute(`aria-current`)})};l.forEach((e,t)=>{e.addEventListener(`click`,()=>d(t))}),e(i,`prev`).addEventListener(`click`,()=>d(u-1)),e(i,`next`).addEventListener(`click`,()=>d(u+1)),d(0)}export{i as mount};