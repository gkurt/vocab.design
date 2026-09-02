import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=[{key:`dune`,title:`Dune Chorus`,meta:`3:41`},{key:`ember`,title:`Ember Lane`,meta:`4:12`},{key:`lagoon`,title:`Lagoon Static`,meta:`2:58`},{key:`moss`,title:`Moss Report`,meta:`5:06`}],i=`ember`,a=40;function o(o){let s=`
    <span style="display: flex; align-items: center; color: var(--sp-muted)">
      <span style="display: flex">${n(`kebab`,`sp-icon--dots`)}</span>
      <span style="display: flex; margin-left: -9px">${n(`kebab`,`sp-icon--dots`)}</span>
    </span>`;o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 234px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Set list</span>
          <span class="sp-text">Drag to reorder</span>
        </div>
        <div class="sp-body">
          <ul class="sp-list sp-surface" data-part="list" style="padding: 2px">${r.map(({key:e,title:t,meta:n},r)=>`
      <li class="sp-list-item" data-part="row-${e}" data-key="${e}" data-index="${r}" style="height: ${a}px; padding: 0 10px">
        <button
          class="sp-icon-button"
          type="button"
          data-part="grip-${e}"
          ${e===i?`data-subject`:``}
          aria-label="Reorder ${t}"
          style="width: 26px; height: 26px; cursor: grab; touch-action: none"
        >${s}</button>
        <span class="sp-grow" style="min-width: 0">
          <span class="sp-text sp-text--ink" data-part="text-${e}" style="padding: 0 3px; border-radius: 3px">${t}</span>
        </span>
        <span class="sp-label">${n}</span>
      </li>`).join(``)}</ul>
        </div>
      </div>
    </div>
  `;let c=e(o,`list`),l=t=>e(o,`row-${t}`),u,d,f=()=>{[...c.children].forEach((e,t)=>{e.dataset.index=String(t)})},p=e=>{for(let n of c.children){let r=n,i=r===e&&r!==u;if(t(r,`data-drop`,i),!i||!u){r.style.boxShadow=``;continue}let a=[...c.children].indexOf(r)<[...c.children].indexOf(u);r.style.boxShadow=`inset 0 ${a?`2px`:`-2px`} 0 var(--sp-accent)`}},m=e=>[...c.children].find(t=>{let n=t.getBoundingClientRect();return e>=n.top&&e<=n.bottom}),h=()=>{d&&=(d.removeAttribute(`data-selected`),d.style.background=``,void 0)},g=(e,t)=>{t.isTrusted&&e.setPointerCapture(t.pointerId)};for(let{key:n}of r){let r=e(o,`grip-${n}`);r.addEventListener(`pointerdown`,e=>{g(r,e),h(),u=l(n),t(u,`data-dragging`,!0),u.style.background=`var(--sp-sunken)`,u.style.opacity=`0.9`});let i=e(o,`text-${n}`);i.addEventListener(`pointerdown`,e=>{g(i,e),h(),d=i})}o.addEventListener(`pointermove`,e=>{if(d){d.setAttribute(`data-selected`,``),d.style.background=`var(--sp-accent-soft)`;return}u&&p(m(e.clientY))});let _=e=>{d=void 0;let n=u;if(!n)return;u=void 0,t(n,`data-dragging`,!1),n.style.background=``,n.style.opacity=``;let r=m(e.clientY);if(p(void 0),!r||r===n)return;let i=[...c.children];i.indexOf(r)<i.indexOf(n)?c.insertBefore(n,r):r.after(n),f()};o.addEventListener(`pointerup`,_),o.addEventListener(`pointercancel`,_)}export{o as mount};