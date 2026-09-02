import{n as e}from"./parts.C-YLuC7Q.js";import{i as t,n}from"./measure.DK7AY2_i.js";var r=420,i=`opacity ${r}ms var(--sp-ease), transform ${r}ms var(--sp-ease)`,a=`translateY(14px)`,o=36,s=[{id:`a`,title:`Tidal range`,meta:`2.1 m`},{id:`b`,title:`Harbour approach`,meta:`4 kn`},{id:`c`,title:`Night passage`,meta:`21:40`},{id:`d`,title:`Anchorages`,meta:`6 marked`}],c=`c`;function l(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 372px; height: 264px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Passage notes</span>
          <span class="sp-label" data-part="counter">0 of 4 arrived</span>
        </div>
        <div class="sp-scroll" data-part="page" style="flex: 1 1 auto; background: var(--sp-sunken); padding-top: 12px">
          <div class="sp-stack sp-context" style="gap: 8px; padding: 0 12px 14px">
            <span class="sp-text">Notes from the last four crossings, kept for the harbour office and the relief crew.</span>
          </div>
          ${s.map(e=>`
      <article
        class="sp-surface sp-row${e.id===c?``:` sp-context`}"
        data-part="card-${e.id}"
        ${e.id===c?`data-subject`:``}
        style="flex: 0 0 auto; gap: 10px; height: 76px; margin: 0 10px 12px; padding: 12px;
               opacity: 0; transform: ${a}; transition: ${i}"
      >
        <span class="sp-swatch" style="flex: 0 0 52px; align-self: stretch; --sp-swatch: var(--sp-accent-soft)"></span>
        <span class="sp-stack sp-grow" style="gap: 7px">
          <span class="sp-row sp-row--between">
            <span class="sp-heading" style="font-size: 13px">${e.title}</span>
            <span class="sp-label">${e.meta}</span>
          </span>
          <span class="sp-line" style="width: 88%"></span>
          <span class="sp-line" style="width: 56%"></span>
        </span>
      </article>`).join(``)}
        </div>
      </div>
    </div>
  `;let l=e(r,`page`),d=e(r,`counter`),f=()=>{let i=t(l).height-o;for(let t of s){let a=e(r,`card-${t.id}`);a.dataset.played===void 0&&(n(a,l).top>i||(a.dataset.played=``,a.style.opacity=`1`,a.style.transform=`none`))}d.textContent=`${u(r)} of ${s.length} arrived`};l.addEventListener(`scroll`,f),f()}function u(t){return s.filter(n=>e(t,`card-${n.id}`).dataset.played!==void 0).length}export{l as mount};