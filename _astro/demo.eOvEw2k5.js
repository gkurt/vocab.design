import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 210px">
        <div class="sp-topbar sp-context">
          <span class="sp-row sp-grow" style="gap: 6px">${n(`search`)}<span class="sp-text">Search issues</span></span>
        </div>
        <div class="sp-body">
          <div class="sp-row sp-row--wrap">
            <button class="sp-chip" data-part="chip-open" data-subject data-selected>Status: open</button>
            <button class="sp-chip" data-part="chip-mine">Assigned to me</button>
            <span class="sp-chip" data-part="chip-label">
              label: docs
              <button class="sp-chip-remove" data-part="chip-label-remove" aria-label="Remove label filter">✕</button>
            </span>
          </div>
          <div class="sp-stack sp-context" style="margin-top: 12px">
            <div class="sp-line" style="width: 68%"></div>
            <div class="sp-line" style="width: 84%"></div>
            <div class="sp-line" style="width: 55%"></div>
          </div>
        </div>
      </div>
    </div>
  `;for(let n of[`chip-open`,`chip-mine`]){let i=e(r,n);i.addEventListener(`click`,()=>t(i,`data-selected`,!i.hasAttribute(`data-selected`)))}e(r,`chip-label-remove`).addEventListener(`click`,()=>e(r,`chip-label`).remove())}export{r as mount};