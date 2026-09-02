import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=300,n=176,r=6,i=6,a={masthead:{column:`1 / 5`,row:`1 / 2`},image:{column:`1 / 3`,row:`2 / 4`},lede:{column:`3 / 5`,row:`2 / 3`},note:{column:`3 / 4`,row:`3 / 4`},meta:{column:`4 / 5`,row:`3 / 4`}},o={masthead:{column:`1 / 7`,row:`1 / 2`},image:{column:`1 / 4`,row:`2 / 5`},lede:{column:`4 / 7`,row:`2 / 3`},note:{column:`4 / 6`,row:`3 / 5`},meta:{column:`6 / 7`,row:`3 / 5`}},s=[{key:`coarse`,label:`4 × 3`,columns:4,rows:3,drawn:!0,places:a},{key:`fine`,label:`6 × 4`,columns:6,rows:4,drawn:!0,places:o},{key:`page`,label:`page only`,columns:6,rows:4,drawn:!1,places:o}],c=[`masthead`,`image`,`lede`,`note`,`meta`],l=e=>`
  <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}" style="padding: 4px 10px; font-size: 11px">
    ${e.label}
  </button>`,u=e=>e.map(e=>`<div class="sp-line" style="width: ${e}%"></div>`).join(``),d=(e,t,n=``)=>`
  <div
    class="sp-surface"
    data-part="block-${e}"
    style="position: relative; display: flex; flex-direction: column; justify-content: center; gap: 5px; min-width: 0;
           min-height: 0; overflow: hidden; padding: 6px 7px; background: var(--sp-accent-soft);
           border-color: var(--sp-accent-soft); ${n}"
  >${t}</div>`;function f(a){let o=s[0];a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Issue 14, page 3</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="configs" data-value="${o.key}" data-axis="Grid">
            ${s.map(l).join(``)}
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px 12px">
          <div
            class="sp-grid"
            data-part="page"
            data-subject
            data-config="${o.key}"
            style="position: relative; flex: 0 0 auto; width: ${t}px; height: ${n}px; gap: ${i}px;
                   padding: ${r}px; background: var(--sp-surface); border: 1px solid var(--sp-line);
                   border-radius: var(--sp-radius)"
          >
            ${d(`masthead`,`<span class="sp-label" style="font-size: 11px; color: var(--sp-ink)">Harbour Review</span>`)}
            ${d(`image`,``,`background: var(--sp-accent); border-color: var(--sp-accent)`)}
            ${d(`lede`,u([92,74,84]))}
            ${d(`note`,u([88,66]))}
            ${d(`meta`,u([80]))}
            <!-- Drawn over the page, the way a grid overlay is: the modules have to read across
                 the blocks sitting in them, not only in the gaps between. -->
            <div
              class="sp-grid"
              data-part="modules"
              aria-hidden="true"
              style="position: absolute; inset: ${r}px; gap: ${i}px; pointer-events: none;
                     transition: opacity 0.24s var(--sp-ease)"
            ></div>
          </div>
        </div>
      </div>
    </div>
  `;let f=e(a,`page`),p=e(a,`modules`),m=new Map(c.map(t=>[t,e(a,`block-${t}`)])),h=e=>{let t=s.find(t=>t.key===e);if(!t)return;let n=`repeat(${t.columns}, 1fr)`,r=`repeat(${t.rows}, 1fr)`;f.dataset.config=t.key,f.style.gridTemplateColumns=n,f.style.gridTemplateRows=r,p.style.gridTemplateColumns=n,p.style.gridTemplateRows=r,p.style.opacity=t.drawn?`1`:`0`;let i=t.columns*t.rows;p.childElementCount!==i&&(p.innerHTML=Array.from({length:i},()=>`<div style="border: 1px dashed var(--sp-accent); border-radius: 3px"></div>`).join(``));for(let[e,n]of m){let r=t.places[e];r&&(n.style.gridColumn=r.column,n.style.gridRow=r.row)}};e(a,`configs`).addEventListener(`change`,e=>h(e.detail)),h(o.key)}export{f as mount};