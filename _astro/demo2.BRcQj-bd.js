import{n as e}from"./parts.C-YLuC7Q.js";var t=34,n=[[`AR`,`Amara Reyes`,`Fitting room`],[`BK`,`Bo Kirby`,`Returns desk`],[`CN`,`Cal Nwosu`,`Alterations`],[`DV`,`Dana Villa`,`Fitting room`],[`EO`,`Esi Otieno`,`Waiting on stock`],[`FL`,`Finn Lasko`,`Alterations`],[`GM`,`Gia Marchetti`,`Returns desk`],[`HT`,`Hana Toma`,`Fitting room`],[`IK`,`Idris Kane`,`Collected`],[`JP`,`Jo Peral`,`Waiting on stock`],[`KS`,`Kit Solberg`,`Alterations`],[`LM`,`Lena Muir`,`Returns desk`],[`MF`,`Milo Farrow`,`Collected`],[`NB`,`Nia Bekele`,`Fitting room`]].map(([e,t,n])=>`
    <li class="sp-list-item">
      <span class="sp-avatar">${e}</span>
      <span class="sp-text sp-text--ink sp-grow" style="font-size: 13px">${t}</span>
      <span class="sp-text" style="font-size: 11px">${n}</span>
    </li>`).join(``),r=(e,n)=>`
  <span
    data-part="fade-${e}"
    ${n}
    aria-hidden="true"
    style="position: absolute; left: 0; right: 0; ${e}: 0; height: ${t}px; pointer-events: none;
           background: linear-gradient(to ${e===`top`?`bottom`:`top`}, var(--sp-surface) 28%, transparent);
           opacity: ${+(e===`bottom`)}; transition: opacity 0.18s var(--sp-ease)"
  ></span>`;function i(t){t.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Queue</span>
          <span class="sp-text" data-part="readout" style="width: 104px; text-align: right; white-space: nowrap">More below</span>
        </div>
        <div style="position: relative; flex: 1 1 auto; min-height: 0; display: flex">
          <ul class="sp-list sp-context sp-grow sp-scroll" data-part="page" style="padding: 0 8px">
            ${n}
          </ul>
          ${r(`top`,``)}
          ${r(`bottom`,`data-subject`)}
        </div>
      </div>
    </div>
  `;let i=e(t,`page`),a=e(t,`fade-top`),o=e(t,`fade-bottom`),s=e(t,`readout`),c=()=>{let e=i.scrollTop>1,t=i.scrollTop<i.scrollHeight-i.clientHeight-1;a.style.opacity=e?`1`:`0`,o.style.opacity=t?`1`:`0`,s.textContent=e&&t?`More either way`:e?`More above`:`More below`};i.addEventListener(`scroll`,c),c()}export{i as mount};