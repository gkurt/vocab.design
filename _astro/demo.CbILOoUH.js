import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=[{from:`Priya`,subject:`Design review notes`},{from:`Sam`,subject:`Invoice for March`},{from:`Otis`,subject:`Offsite logistics`}];function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <div class="sp-topbar">
          <span class="sp-heading sp-grow sp-context">Inbox</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="archive" data-subject>
            Archive <span class="sp-kbd">E</span>
          </button>
          <button class="sp-button sp-button--ghost sp-button--sm sp-context" type="button" data-part="star">
            Star <span class="sp-kbd">S</span>
          </button>
        </div>
        <div class="sp-body sp-context" style="padding: 0">
          <ul class="sp-list" role="listbox" aria-label="Messages" data-part="list">${r.map(({from:e,subject:t},r)=>`
      <li class="sp-list-item" data-part="row-${r+1}" role="option" aria-selected="false">
        <span class="sp-avatar sp-context">${e.slice(0,2).toUpperCase()}</span>
        <span class="sp-grow sp-text sp-text--ink">${t}</span>
        <span style="display: inline-flex; align-items: center; justify-content: flex-end; gap: 6px; width: 94px">
          <span data-part="star-${r+1}" hidden>${n(`star`,`sp-icon--filled`)}</span>
          <span class="sp-chip" data-part="tag-${r+1}" hidden>Archived</span>
        </span>
      </li>`).join(``)}</ul>
        </div>
        <div class="sp-topbar sp-context" style="border-bottom: 0; border-top: 1px solid var(--sp-line)">
          <span class="sp-label sp-grow">${r.length} conversations</span>
          <span class="sp-text" data-part="count" style="width: 92px; text-align: right">Archived: 0</span>
        </div>
      </div>
    </div>
  `;let a=r.map((t,n)=>e(i,`row-${n+1}`)),o=e(i,`count`),s,c=e=>{s=e;for(let[n,r]of a.entries())t(r,`data-selected`,n===e),r.setAttribute(`aria-selected`,String(n===e))},l=(n,r)=>{if(s===void 0)return;let c=a[s];c&&(t(c,n,!0),e(i,`${r}-${s+1}`).hidden=!1,o.textContent=`Archived: ${a.filter(e=>e.hasAttribute(`data-archived`)).length}`)},u=()=>l(`data-archived`,`tag`),d=()=>l(`data-starred`,`star`);for(let[e,t]of a.entries())t.addEventListener(`click`,()=>c(e));e(i,`archive`).addEventListener(`click`,u),e(i,`star`).addEventListener(`click`,d),i.addEventListener(`keydown`,e=>{if(e.metaKey||e.ctrlKey||e.altKey)return;let t=e.key.toLowerCase();if(t===`e`)u();else if(t===`s`)d();else return;e.preventDefault()})}export{i as mount};