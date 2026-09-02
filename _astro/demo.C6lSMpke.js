import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=[{key:`a5`,label:`A5`,estimate:`1.1 MB`},{key:`a4`,label:`A4`,estimate:`2.4 MB`},{key:`a3`,label:`A3`,estimate:`4.8 MB`},{key:`poster`,label:`Poster`,estimate:`9.2 MB`}],i=`a4`;function a(a){let o=r.find(e=>e.key===i)??r[0],s=r.map(({key:e,label:t})=>`<li class="sp-option" role="option" id="size-${e}" data-part="opt-${e}" data-key="${e}" aria-selected="${e===i}">${t}</li>`).join(``);a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Export</span></div>
        <div class="sp-body">
          <div class="sp-row sp-row--between">
            <span class="sp-label sp-context" id="size-label">Paper size</span>
            <div data-part="select" data-subject style="position: relative; width: 150px">
              <button
                class="sp-button sp-button--ghost sp-row sp-row--between"
                data-part="trigger"
                data-value="${i}"
                role="combobox"
                aria-controls="size-list"
                aria-haspopup="listbox"
                aria-expanded="false"
                aria-labelledby="size-label size-value"
                style="width: 100%"
              >
                <span data-part="value" id="size-value">${o?.label??``}</span>
                ${n(`chevronDown`)}
              </button>
              <ul class="sp-listbox" id="size-list" role="listbox" aria-label="Paper size" data-part="list">${s}</ul>
            </div>
          </div>
          <div class="sp-divider sp-context" style="margin: 14px 0"></div>
          <div class="sp-row sp-row--between sp-context">
            <span class="sp-label">Estimated file</span>
            <span class="sp-text" data-part="estimate">${o?.estimate??``}</span>
          </div>
        </div>
      </div>
    </div>
  `;let c=e(a,`trigger`),l=e(a,`list`),u=e(a,`value`),d=e(a,`estimate`),f=e=>{t(l,`data-open`,e),c.setAttribute(`aria-expanded`,String(e))},p=e=>{let t=r.find(t=>t.key===e.dataset.key);if(t){for(let t of l.children)t.setAttribute(`aria-selected`,String(t===e));c.dataset.value=t.key,u.textContent=t.label,d.textContent=t.estimate,f(!1)}};c.addEventListener(`click`,()=>f(!0));for(let e of l.children)e.addEventListener(`click`,()=>p(e));a.addEventListener(`keydown`,e=>{e.key===`Escape`&&f(!1)}),a.addEventListener(`pointerdown`,e=>{let t=e.target;!l.contains(t)&&!c.contains(t)&&f(!1)})}export{a as mount};