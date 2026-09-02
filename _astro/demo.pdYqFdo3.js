import{n as e,t}from"./parts.C-YLuC7Q.js";var n=`Add to shelf`,r={none:`Nothing pressed yet`,filled:`Filled button pressed`,outlined:`Outlined button pressed`,ghost:`Ghost button pressed`};function i(i){let a=(e,t,r,i=!1)=>`
    <div class="sp-row sp-row--between${i?``:` sp-context`}">
      <span class="sp-label sp-context">${t}</span>
      <button
        class="sp-button ${r} sp-button--sm"
        type="button"
        data-part="${e}"
        ${i?`data-subject`:``}
        style="border: 1px solid transparent"
      >${n}</button>
    </div>`;i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 320px">
        <div class="sp-context">
          <div class="sp-heading">Emphasis</div>
        </div>
        <div class="sp-stack" style="margin-top: 14px; gap: 8px">
          ${a(`filled`,`Filled`,``)}
          ${a(`outlined`,`Outlined`,`sp-button--ghost`)}
          ${a(`ghost`,`Ghost`,`sp-button--quiet`,!0)}
        </div>
        <div class="sp-divider" style="margin: 14px 0 10px"></div>
        <div class="sp-context" data-part="status-slot">
          <span class="sp-text" data-part="status" data-pressed="none" role="status">${r.none}</span>
        </div>
      </div>
    </div>
  `;let o=e(i,`status-slot`),s=e(i,`status`),c=0;for(let e of Object.values(r))s.textContent=e,c=Math.max(c,o.offsetHeight);s.textContent=r.none,o.style.height=`${c}px`;let l=e(i,`ghost`);l.addEventListener(`pointerenter`,()=>{t(l,`data-hover`,!0),l.style.background=`var(--sp-sunken)`}),l.addEventListener(`pointerleave`,()=>{t(l,`data-hover`,!1),l.style.background=``});for(let t of[`filled`,`outlined`,`ghost`])e(i,t).addEventListener(`click`,()=>{s.dataset.pressed=t,s.textContent=r[t]})}export{i as mount};