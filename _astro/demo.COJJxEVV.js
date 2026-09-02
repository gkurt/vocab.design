import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=[{key:`monstera`,name:`Monstera`,shelf:`Shelf A`},{key:`fiddle`,name:`Fiddle leaf fig`,shelf:`Shelf B`},{key:`snake`,name:`Snake plant`,shelf:`Shelf A`},{key:`pothos`,name:`Pothos`,shelf:`Shelf C`},{key:`peace-lily`,name:`Peace lily`,shelf:`Shelf B`},{key:`rubber`,name:`Rubber plant`,shelf:`Shelf C`}];function r(r){let i=n.map(({key:e,name:t,shelf:n})=>`
      <li class="sp-list-item" data-part="result-${e}" data-name="${t.toLowerCase()}">
        <span class="sp-grow">${t}</span>
        <span class="sp-label">${n}</span>
      </li>`).join(``);r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 392px; height: 244px">
        <div class="sp-topbar">
          <span class="sp-heading sp-context">Plants</span>
          <div class="sp-grow" data-part="search" data-subject style="position: relative">
            <span aria-hidden="true" data-part="search-icon" style="position: absolute; left: 9px; top: 50%; translate: 0 -50%; display: flex; color: var(--sp-muted)">${t(`search`)}</span>
            <input
              class="sp-input"
              data-part="search-input"
              role="searchbox"
              aria-label="Search plants"
              aria-controls="plant-results"
              placeholder="Search plants"
              autocomplete="off"
              spellcheck="false"
              style="padding-left: 31px; padding-right: 29px"
            />
            <button
              class="sp-icon-button"
              data-part="search-clear"
              type="button"
              aria-label="Clear search"
              hidden
              style="position: absolute; right: 3px; top: 50%; translate: 0 -50%; width: 23px; height: 23px"
            >${t(`close`)}</button>
          </div>
        </div>
        <div class="sp-body sp-context">
          <div class="sp-row sp-row--between" style="margin-bottom: 8px">
            <span class="sp-label" data-part="count" data-matches="${n.length}">${n.length} plants</span>
            <span class="sp-label">All shelves</span>
          </div>
          <div style="height: 132px">
            <ul class="sp-list sp-scroll" id="plant-results" data-part="results" style="height: 100%">${i}</ul>
            <p class="sp-text" data-part="no-results" hidden style="margin: 0; padding-top: 10px">No plants match that.</p>
          </div>
        </div>
      </div>
    </div>
  `;let a=e(r,`search-input`),o=e(r,`search-clear`),s=e(r,`results`),c=e(r,`no-results`),l=e(r,`count`),u=[...s.children],d=()=>{let e=a.value.trim().toLowerCase(),t=0;for(let n of u){let r=e===``||(n.dataset.name??``).includes(e);n.hidden=!r,r&&t++}l.dataset.matches=String(t),l.textContent=e===``?`${u.length} plants`:`${t} of ${u.length} plants`,s.hidden=t===0,c.hidden=t>0,o.hidden=a.value===``};a.addEventListener(`input`,d),o.addEventListener(`click`,()=>{a.value=``,d()}),a.addEventListener(`keydown`,e=>{e.key===`Escape`&&a.value!==``&&(a.value=``,d())})}export{r as mount};