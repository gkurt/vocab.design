import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[{key:`file`,letter:`F`,rest:`ile`,title:`File`,items:[{key:`new`,letter:`N`,rest:`ew window`,name:`New window`},{key:`open`,letter:`O`,rest:`pen recent`,name:`Open recent`},{key:`save`,letter:`S`,rest:`ave as`,name:`Save as`},{key:`close`,letter:`C`,rest:`lose`,name:`Close`}]},{key:`edit`,letter:`E`,rest:`dit`,title:`Edit`,items:[{key:`undo`,letter:`U`,rest:`ndo`,name:`Undo`},{key:`redo`,letter:`R`,rest:`edo`,name:`Redo`},{key:`prefs`,letter:`P`,rest:`references`,name:`Preferences`}]},{key:`view`,letter:`V`,rest:`iew`,title:`View`,items:[{key:`zoom`,letter:`Z`,rest:`oom in`,name:`Zoom in`},{key:`full`,letter:`F`,rest:`ull screen`,name:`Full screen`},{key:`side`,letter:`S`,rest:`idebar`,name:`Sidebar`}]}],r=(e,t,n,r=!1)=>`<span><span data-part="mn-${e}"${r?` data-subject`:``} style="display: inline-block; border-bottom: 2px solid transparent">${t}</span>${n}</span>`,i=e=>`
  <div class="sp-menu" data-part="menu-${e.key}" style="transform-origin: top left; z-index: 4">
    ${e.items.map(e=>`<button class="sp-menu-item" type="button" data-part="item-${e.key}">${r(e.key,e.letter,e.rest)}</button>`).join(``)}
  </div>`;function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="app" data-armed="no" data-ran="none" data-typed="no" style="height: 292px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Notes</span>
          <span class="sp-text" data-part="readout" style="width: 330px; text-align: right; white-space: nowrap">Nothing armed</span>
        </div>

        <div class="sp-row" data-part="menubar" style="gap: 2px; flex: 0 0 auto; padding: 4px 8px; border-bottom: 1px solid var(--sp-line); background: var(--sp-surface)">
          ${n.map(e=>`<button class="sp-button sp-button--quiet sp-button--sm${e.key===`file`?``:` sp-context`}" type="button" data-part="title-${e.key}" style="padding: 4px 9px; font-size: 13px">${r(e.key,e.letter,e.rest,e.key===`file`)}</button>`).join(``)}
        </div>

        <div class="sp-body" style="display: flex; align-items: stretch; gap: 12px">
          <div class="sp-surface sp-context" data-part="doc" style="flex: 1 1 auto; display: flex; flex-direction: column; gap: 9px; padding: 12px">
            <span class="sp-heading" style="font-size: 13px">Untitled</span>
            <span class="sp-line" style="width: 88%"></span>
            <span class="sp-line" style="width: 66%"></span>
            <span class="sp-grow"></span>
            <span class="sp-label" style="font-size: 11px">Typed into the document</span>
            <span
              class="sp-text sp-text--ink"
              data-part="typed"
              style="height: 20px; line-height: 20px; font-size: 13px; white-space: nowrap; overflow: hidden; font-family: var(--sp-font)"
            >&nbsp;</span>
          </div>

          <div class="sp-stack sp-context" style="width: 150px; gap: 7px">
            <span class="sp-label">Keys pressed</span>
            <div class="sp-row sp-row--wrap" data-part="trail" style="gap: 5px; min-height: 24px; align-items: flex-start"></div>
            <div class="sp-divider"></div>
            <span class="sp-label">Last command</span>
            <span class="sp-heading" data-part="ran" style="font-size: 13px">None yet</span>
          </div>
        </div>

        ${n.map(i).join(``)}
      </div>
    </div>
  `;let o=e(a,`app`),s=e(a,`menubar`),c=e(a,`readout`),l=e(a,`trail`),u=e(a,`typed`),d=e(a,`ran`),f=s.offsetTop+s.offsetHeight;for(let t of n){let n=e(a,`menu-${t.key}`);n.style.left=`${e(a,`title-${t.key}`).offsetLeft}px`,n.style.top=`${f}px`}let p=!1,m,h=e=>{c.textContent=e},g=r=>{for(let i of n)for(let n of[i.key,...i.items.map(e=>e.key)]){let i=e(a,`mn-${n}`);t(i,`data-shown`,r),i.style.borderBottomColor=r?`currentColor`:`transparent`}},_=e=>{l.innerHTML=e.map(e=>`<span class="sp-kbd">${e}</span>`).join(``)},v=()=>{m=void 0;for(let t of n){e(a,`menu-${t.key}`).removeAttribute(`data-open`);let n=e(a,`title-${t.key}`);n.removeAttribute(`data-open`),n.removeAttribute(`data-sim-focus`)}},y=e=>{p=!1,o.dataset.armed=`no`,v(),g(!1),h(e)},b=()=>{p=!0,o.dataset.armed=`yes`,o.dataset.ran=`none`,d.textContent=`None yet`,g(!0),_([`Alt`]),h(`Alt armed: the access keys are drawn`)},x=t=>{v(),m=t,p=!0,o.dataset.armed=`yes`,g(!0),e(a,`menu-${t.key}`).setAttribute(`data-open`,``);let n=e(a,`title-${t.key}`);n.setAttribute(`data-open`,``),n.setAttribute(`data-sim-focus`,``),_([`Alt`,t.letter]),h(`Alt, ${t.letter} opened the ${t.title} menu`)},S=(e,t)=>{o.dataset.ran=t.key,d.textContent=t.name,y(`${t.name} ran from Alt, ${e.letter}, ${t.letter}`),_([`Alt`,e.letter,t.letter])},C=e=>{let t=`${u.textContent?.trim()??``}${e}`.slice(-30);u.textContent=t,o.dataset.typed=`yes`,_([e]),h(`Nothing armed, so "${e}" went into the document`)};a.addEventListener(`keydown`,e=>{if(e.key===`Alt`)return e.preventDefault(),b();if(e.key===`Escape`)return y(`Escape left mnemonic mode`);if(e.key.length!==1)return;if(!p&&!e.altKey)return C(e.key);e.preventDefault();let t=e.key.toUpperCase();if(m){let e=m.items.find(e=>e.letter===t);return e?S(m,e):h(`No item in ${m.title} answers ${t}`)}let r=n.find(e=>e.letter===t);if(r)return x(r);h(`No menu answers ${t}`)});for(let t of n){e(a,`title-${t.key}`).addEventListener(`click`,()=>{if(m===t)return y(`Menu closed`);x(t)});for(let n of t.items)e(a,`item-${n.key}`).addEventListener(`click`,()=>S(t,n))}}export{a as mount};