import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[{id:`1`,name:`Harbour wall, dusk`,wash:`linear-gradient(140deg, #5b8def, #9b6ef3)`},{id:`2`,name:`Ferry slip, low tide`,wash:`linear-gradient(140deg, #2fb8a5, #3d7ff2)`},{id:`3`,name:`Kestrel over the dunes`,wash:`linear-gradient(140deg, #f6c15b, #ef7d5a)`},{id:`4`,name:`Boatyard, first light`,wash:`linear-gradient(140deg, #f2913d, #d9455f)`},{id:`5`,name:`Cliff path, rain`,wash:`linear-gradient(140deg, #7b8794, #3b4551)`},{id:`6`,name:`Salt flats, noon`,wash:`linear-gradient(140deg, #b0e0a8, #3f9f7f)`},{id:`7`,name:`Old pier, long exposure`,wash:`linear-gradient(140deg, #6a5acd, #22203f)`},{id:`8`,name:`Storm light, harbour`,wash:`linear-gradient(140deg, #f5a05a, #7a3b8f)`}],r=200;function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 460px; height: 266px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Kirkwall, roll 12</span>
          <span class="sp-label" style="font-size: 11px">8 frames</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: row; gap: 12px">
          <div
            class="sp-stack sp-scroll"
            data-part="rail"
            data-subject
            role="listbox"
            aria-label="Frames"
            style="flex: 0 0 auto; width: 96px; height: ${r}px; gap: 8px; padding: 6px;
                   background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >${n.map(e=>`
      <button
        class="sp-button sp-button--ghost"
        type="button"
        data-part="thumb-${e.id}"
        aria-label="Frame ${e.id}, ${e.name}"
        style="flex: 0 0 auto; height: 54px; padding: 3px"
      >
        <span class="sp-swatch" style="display: block; width: 100%; height: 100%; --sp-swatch: ${e.wash}"></span>
      </button>`).join(``)}</div>

          <div class="sp-stack sp-context sp-grow" style="gap: 8px; min-width: 0">
            <span class="sp-swatch" data-part="preview" data-frame="1" style="height: 168px; --sp-swatch: ${n[0]?.wash}"></span>
            <span class="sp-text sp-text--ink" data-part="caption" style="height: 24px; font-size: 12px; line-height: 24px; white-space: nowrap; overflow: hidden"></span>
          </div>
        </div>
      </div>
    </div>
  `;let a=e(i,`preview`),o=e(i,`caption`),s=r=>{let s=n.find(e=>e.id===r);if(s){a.dataset.frame=s.id,a.style.setProperty(`--sp-swatch`,s.wash),o.textContent=`${s.id} of ${n.length} · ${s.name}`;for(let r of n){let n=e(i,`thumb-${r.id}`),a=r.id===s.id;t(n,`data-selected`,a),a?n.setAttribute(`aria-current`,`true`):n.removeAttribute(`aria-current`)}}};for(let t of n)e(i,`thumb-${t.id}`).addEventListener(`click`,()=>s(t.id));s(`1`)}export{i as mount};