import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=2200,r=[{actor:`Rosa M.`,kind:`plus`,verb:`opened`,object:`Rebuild the west quay`,when:`4m`},{actor:`Jo W.`,kind:`star`,verb:`and 3 others starred`,object:`harbour-kit`,when:`12m`},{actor:`Pia K.`,kind:`pencil`,verb:`commented on`,object:`Tide tables`,when:`26m`},{actor:`Ivo S.`,kind:`share`,verb:`pushed 2 commits to`,object:`main`,when:`1h`},{actor:`Dee L.`,kind:`check`,verb:`closed`,object:`Crane hire invoice`,when:`2h`},{actor:`Cy R.`,kind:`inbox`,verb:`moved to In review`,object:`Quay lighting`,when:`3h`}],i=[{actor:`Fay N.`,kind:`eye`,verb:`requested a review on`,object:`Ferry timetable`,when:`now`},{actor:`Ada M.`,kind:`check`,verb:`merged`,object:`Quay lighting`,when:`now`}];function a(e,n){return`
    <li class="sp-list-item" data-part="${n}">
      <span class="sp-avatar">${e.actor.slice(0,1)}</span>
      <span style="flex: 0 0 auto; color: var(--sp-muted)">${t(e.kind)}</span>
      <span class="sp-grow sp-text" style="min-width: 0">
        <span class="sp-text--ink" style="font-weight: 500">${e.actor}</span>
        ${e.verb}
        <span class="sp-text--ink">${e.object}</span>
      </span>
      <span class="sp-text" style="flex: 0 0 auto">${e.when}</span>
    </li>`}function o(t,o){t.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 286px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Activity</span>
          <span class="sp-label">harbour-kit</span>
        </div>
        <div class="sp-body">
          <ul class="sp-list sp-scroll sp-surface" data-part="feed" data-subject data-count="${r.length}"
              style="height: 100%; padding: 0 4px">
            ${r.map((e,t)=>a(e,`row-${t+1}`)).join(``)}
          </ul>
        </div>
      </div>
    </div>
  `;let s=e(t,`feed`),c=0,l=()=>{let e=i[c];e&&(c+=1,s.insertAdjacentHTML(`afterbegin`,a(e,`new-${c}`)),s.dataset.count=String(r.length+c),s.scrollTop=0,c<i.length&&o.setTimeout(l,n))};o.setTimeout(l,n)}export{o as mount};