import{n as e}from"./parts.C-YLuC7Q.js";var t=`flex: 1 1 70px; min-width: 70px; padding: 0; border: 0; outline: none; background: transparent; font: inherit; font-size: 13px; color: inherit`,n=(e,t)=>`
  <span class="sp-chip" data-part="chip-${e}" style="cursor: default">
    ${t}
    <button class="sp-chip-remove" type="button" data-part="chip-${e}-remove" aria-label="Remove ${t}">✕</button>
  </span>`;function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="height: 232px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Article settings</span></div>
        <div class="sp-body">
          <div class="sp-label sp-context" style="margin-bottom: 6px">Topics</div>
          <div
            class="sp-input"
            data-part="field"
            data-subject
            style="display: flex; flex-wrap: wrap; align-content: flex-start; gap: 6px; min-height: 68px; padding: 8px"
          >
            ${n(`typography`,`typography`)}
            ${n(`grids`,`grids`)}
            <input data-part="entry" placeholder="Add a topic" autocomplete="off" style="${t}" />
          </div>
          <p class="sp-text sp-context" style="margin: 8px 2px 0">Press Enter to add a topic.</p>
        </div>
      </div>
    </div>
  `;let i=e(r,`field`),a=e(r,`entry`);a.addEventListener(`keydown`,t=>{if(t.key!==`Enter`)return;let r=a.value.trim();r&&(a.insertAdjacentHTML(`beforebegin`,n(`new`,r)),a.value=``,e(i,`chip-new-remove`).addEventListener(`click`,()=>e(i,`chip-new`).remove()))}),e(r,`chip-grids-remove`).addEventListener(`click`,()=>e(r,`chip-grids`).remove()),e(r,`chip-typography-remove`).addEventListener(`click`,()=>e(r,`chip-typography`).remove())}export{r as mount};