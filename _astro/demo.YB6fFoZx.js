import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=[{id:`reef`,label:`Reef`,tag:`Chapter one`,title:`Reef habitats`,lines:[`92%`,`68%`]},{id:`kelp`,label:`Kelp`,tag:`Chapter two`,title:`Kelp forests`,lines:[`78%`,`86%`]}],n=500;function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 360px; height: 244px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Field guide</span>
          <span class="sp-label">Coastal</span>
        </div>
        <div class="sp-body">
          <sp-segmented data-stage-mode class="sp-segmented sp-context" data-part="picker" data-axis="Panel" data-value="reef" style="width: 100%">
            ${t.map(e=>`<button class="sp-segment sp-grow" data-part="seg-${e.id}" value="${e.id}">${e.label}</button>`).join(``)}
          </sp-segmented>
          <div data-part="stack" data-subject style="position: relative; height: 124px; margin-top: 12px">
            ${t.map((e,t)=>`
      <article
        class="sp-surface sp-row"
        data-part="panel-${e.id}"
        style="position: absolute; inset: 0; gap: 12px; padding: 12px; opacity: ${+(t===0)}; transition: opacity ${n}ms linear"
      >
        <span class="sp-swatch" style="flex: 0 0 76px; height: 100%; --sp-swatch: var(--sp-accent-soft)"></span>
        <span class="sp-stack sp-grow" style="gap: 7px">
          <span class="sp-label">${e.tag}</span>
          <span class="sp-heading">${e.title}</span>
          <span class="sp-line" style="width: ${e.lines[0]}"></span>
          <span class="sp-line" style="width: ${e.lines[1]}"></span>
        </span>
      </article>`).join(``)}
          </div>
        </div>
      </div>
    </div>
  `;let i=n=>{for(let i of t){let t=e(r,`panel-${i.id}`),a=i.id===n;t.style.opacity=a?`1`:`0`,t.setAttribute(`aria-hidden`,String(!a)),t.style.pointerEvents=a?``:`none`}};e(r,`picker`).addEventListener(`change`,e=>i(e.detail)),i(`reef`)}export{r as mount};