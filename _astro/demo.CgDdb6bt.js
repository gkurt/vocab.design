import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=[{key:`region`,label:`Region`,side:`available`},{key:`channel`,label:`Channel`,side:`available`},{key:`discount`,label:`Discount`,side:`available`},{key:`refunds`,label:`Refunds`,side:`available`},{key:`date`,label:`Date`,side:`chosen`},{key:`revenue`,label:`Revenue`,side:`chosen`},{key:`orders`,label:`Orders`,side:`chosen`}],r=[`available`,`chosen`],i=e=>n.filter(t=>t.side===e).map(e=>`<li class="sp-option" role="option" aria-selected="false" data-part="opt-${e.key}" data-in="${e.side}">${e.label}</li>`).join(``),a=(e,t,n)=>`
  <div class="sp-stack" style="flex: 1 1 0; gap: 4px; min-width: 0">
    <span class="sp-label">${t} (<span data-part="count-${e}">${n}</span>)</span>
    <ul
      class="sp-listbox sp-listbox--static"
      role="listbox"
      aria-label="${t} columns"
      data-part="list-${e}"
      style="height: 140px; max-height: 140px"
    >${i(e)}</ul>
  </div>`;function o(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Report columns</span>
          <span class="sp-text">7 fields</span>
        </div>
        <div class="sp-body">
          <div class="sp-row" data-part="transfer" data-subject style="align-items: stretch; gap: 10px">
            ${a(`available`,`Available`,4)}
            <div class="sp-stack" style="justify-content: center; gap: 6px; flex: 0 0 auto">
              <button
                class="sp-icon-button"
                type="button"
                data-part="move-right"
                aria-disabled="true"
                aria-label="Move to chosen"
              >${t(`chevronRight`)}</button>
              <button
                class="sp-icon-button"
                type="button"
                data-part="move-left"
                aria-disabled="true"
                aria-label="Move to available"
              >${t(`chevronLeft`)}</button>
            </div>
            ${a(`chosen`,`Chosen`,3)}
          </div>
        </div>
      </div>
    </div>
  `;let o=new Map(n.map(t=>[t.key,e(i,`opt-${t.key}`)])),s={available:e(i,`list-available`),chosen:e(i,`list-chosen`)},c={available:e(i,`count-available`),chosen:e(i,`count-chosen`)},l={available:e(i,`move-left`),chosen:e(i,`move-right`)},u,d=e=>o.get(e)?.dataset.in===`chosen`?`chosen`:`available`,f=()=>{for(let[e,t]of o)t.setAttribute(`aria-selected`,String(e===u));for(let e of r){c[e].textContent=String([...o.values()].filter(t=>t.dataset.in===e).length);let t=u!==void 0&&d(u)!==e;l[e].setAttribute(`aria-disabled`,String(!t))}},p=e=>{if(u===void 0)return;let t=o.get(u);!t||t.dataset.in===e||(s[e].append(t),t.dataset.in=e,u=void 0,f())};for(let[e,t]of o)t.addEventListener(`click`,()=>{u=e,f()});l.chosen.addEventListener(`click`,()=>p(`chosen`)),l.available.addEventListener(`click`,()=>p(`available`)),f()}export{o as mount};