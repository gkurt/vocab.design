import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=[{name:`Notes.md`,size:`4 KB`},{name:`Budget.xlsx`,size:`38 KB`},{name:`Cover.png`,size:`1.2 MB`}],i=`display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; width: 96px; height: 74px; font-size: 12px; cursor: default`;function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Documents</span>
          <span class="sp-text" data-stage-verdict data-part="hint">Click selects, double click opens</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 12px">
          <div class="sp-row" role="listbox" aria-label="Files" data-part="tiles" style="justify-content: center">${r.map(({name:e,size:t},r)=>`
      <div
        class="sp-surface${r===1?``:` sp-context`}"
        data-part="tile-${r+1}"${r===1?` data-subject`:``}
        role="option"
        aria-selected="false"
        style="${i}"
      >
        ${n(`copy`)}
        <span>${e}</span>
        <span class="sp-label">${t}</span>
      </div>`).join(``)}</div>
          <div style="position: relative; height: 78px">
            <div
              class="sp-surface sp-context"
              data-part="detail-empty"
              style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 13px; color: var(--sp-muted)"
            >
              No file open
            </div>
            <div
              class="sp-surface"
              data-part="detail"
              hidden
              style="position: absolute; inset: 0; display: flex; align-items: center; gap: 10px; padding: 0 12px"
            >
              <span class="sp-grow sp-heading" data-part="detail-name">Budget.xlsx</span>
              <button class="sp-button sp-button--ghost sp-button--sm sp-context" type="button" data-part="detail-close">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let o=e(a,`detail`),s=e(a,`detail-empty`),c=e(a,`detail-name`),l=r.map((t,n)=>e(a,`tile-${n+1}`)),u=e=>{for(let[n,r]of l.entries()){let i=n===e;t(r,`data-selected`,i),r.setAttribute(`aria-selected`,String(i)),r.style.background=i?`var(--sp-accent-soft)`:``,r.style.borderColor=i?`var(--sp-accent)`:``}},d=e=>{c.textContent=r[e]?.name??``,o.hidden=!1,s.hidden=!0};for(let[e,t]of l.entries())t.addEventListener(`click`,()=>u(e)),t.addEventListener(`dblclick`,()=>d(e));e(a,`detail-close`).addEventListener(`click`,()=>{o.hidden=!0,s.hidden=!1})}export{a as mount};