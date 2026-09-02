import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=36,i=150,a=[{key:`state`,label:`state`,hint:`open or closed`},{key:`label`,label:`label`,hint:`bug, chore, docs`},{key:`assignee`,label:`assignee`,hint:`a person`},{key:`updated`,label:`updated`,hint:`a date`}],o=[{key:`eq`,glyph:`=`,label:`equals`},{key:`neq`,glyph:`≠`,label:`does not equal`}],s=[{key:`open`,label:`open`},{key:`closed`,label:`closed`}],c=[{key:`r1`,title:`Harbour survey misses the tide`,state:`open`,who:`A. Okafor`},{key:`r2`,title:`Chart legend overlaps the axis`,state:`open`,who:`M. Idris`},{key:`r3`,title:`Harbour map colours are wrong`,state:`closed`,who:`R. Vance`},{key:`r4`,title:`Add a scope bar to search`,state:`closed`,who:`J. Perez`}],l=(e,t,n)=>`
  <button class="sp-menu-item" type="button" data-part="opt-${e}" hidden>
    <span class="sp-grow" style="font-size: 12.5px">${t}</span>
    <span class="sp-label" style="flex: 0 0 auto; font-size: 10.5px">${n}</span>
  </button>`;function u(u){let d=c.map(e=>`
      <li class="sp-list-item" data-part="row-${e.key}" style="gap: 9px; padding: 3px 10px">
        <span class="sp-grow" style="font-size: 12.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${e.title}</span>
        <span class="sp-label" style="flex: 0 0 auto; width: 46px; font-size: 10.5px">${e.state}</span>
        <span class="sp-label" style="flex: 0 0 auto; width: 62px; font-size: 10.5px; text-align: right">${e.who}</span>
      </li>`).join(``);u.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 279px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Issues</span>
          <span class="sp-text" data-part="readout" style="width: 250px; text-align: right; white-space: nowrap; font-size: 12px">No query yet</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px; position: relative">
          <div
            class="sp-input"
            data-part="field"
            data-subject
            data-step="idle"
            data-free="none"
            style="display: flex; align-items: center; gap: 7px; flex: 0 0 auto; height: ${r}px; padding: 0 10px"
          >
            <span style="display: flex; flex: 0 0 auto; color: var(--sp-muted)">${n(`filter`)}</span>
            <span class="sp-chip" data-part="token" data-state="none" hidden style="flex: 0 0 auto; gap: 5px; cursor: default">
              <span data-part="token-text">state</span>
              <button class="sp-chip-remove" type="button" data-part="token-remove" aria-label="Remove this condition" hidden>✕</button>
            </span>
            <input
              data-part="input"
              type="text"
              autocomplete="off"
              placeholder="Filter by property or free text"
              aria-label="Filter issues"
              style="flex: 1 1 90px; min-width: 90px; padding: 0; border: 0; outline: none; background: transparent; font: inherit; font-size: 13px; color: inherit"
            />
          </div>

          <div
            class="sp-menu"
            data-part="menu"
            role="listbox"
            aria-label="Suggestions"
            style="top: 40px; left: 26px; width: 232px; z-index: 2"
          >
            ${a.map(e=>l(e.key,e.label,e.hint)).join(``)}
            ${o.map(e=>l(e.key,e.glyph,e.label)).join(``)}
            ${s.map(e=>l(e.key,e.label,`value`)).join(``)}
          </div>

          <div class="sp-surface sp-context" style="display: flex; flex-direction: column; flex: 0 0 auto; height: ${i}px; overflow: hidden; padding: 3px 4px">
            <ul class="sp-list sp-grow" style="flex: 1 1 auto">${d}</ul>
            <span class="sp-label" data-part="count" data-hits="4" style="flex: 0 0 auto; padding: 4px 8px 2px; font-size: 11px; white-space: nowrap">4 of 4 issues match</span>
          </div>
        </div>
      </div>
    </div>
  `;let f=e(u,`field`),p=e(u,`input`),m=e(u,`menu`),h=e(u,`token`),g=e(u,`token-text`),_=e(u,`token-remove`),v=e(u,`count`),y=e(u,`readout`),b=`idle`,x,S,C,w=``,T=e=>{if(e===`property`){let e=p.value.trim().toLowerCase();return a.filter(t=>t.key.startsWith(e)).map(e=>e.key)}return e===`operator`?o.map(e=>e.key):e===`value`?s.map(e=>e.key):[]},E=()=>x!==void 0&&S!==void 0&&C!==void 0,D=()=>{let e=[];return E()&&e.push(`${x} ${S?.glyph} ${C}`),w&&e.push(w),e.length?e.join(`  `):`No query yet`},O=()=>{let t=0;for(let n of c){let r=!E()||(S?.key===`eq`?n.state===C:n.state!==C),i=!w||n.title.toLowerCase().includes(w.toLowerCase()),a=r&&i;e(u,`row-${n.key}`).toggleAttribute(`hidden`,!a),a&&(t+=1)}v.dataset.hits=String(t),v.textContent=`${t} of ${c.length} issues match`,y.textContent=D()},k=n=>{b=n,f.dataset.step=n,t(m,`data-open`,n===`property`||n===`operator`||n===`value`);let r=new Set(T(n));for(let t of[...a,...o,...s].map(e=>e.key))e(u,`opt-${t}`).toggleAttribute(`hidden`,!r.has(t));let i=x===void 0?``:`${x}${S?` ${S.glyph}`:``}${C?` ${C}`:``}`,c=E()?`committed`:x===void 0?`none`:`pending`;h.toggleAttribute(`hidden`,c===`none`),h.dataset.state=c,h.style.borderStyle=c===`committed`?`solid`:`dashed`,_.toggleAttribute(`hidden`,c!==`committed`),g.textContent=i,O()};p.addEventListener(`click`,()=>k(`property`)),p.addEventListener(`input`,()=>{if(b===`free`){w=p.value.trim(),f.dataset.free=w===``?`none`:w,O();return}k(`property`)});for(let t of a)e(u,`opt-${t.key}`).addEventListener(`click`,()=>{x=t.key,S=void 0,C=void 0,p.value=``,k(`operator`)});for(let t of o)e(u,`opt-${t.key}`).addEventListener(`click`,()=>{S=t,C=void 0,k(`value`)});for(let t of s)e(u,`opt-${t.key}`).addEventListener(`click`,()=>{C=t.key,k(`free`)});_.addEventListener(`click`,()=>{x=void 0,S=void 0,C=void 0,k(w?`free`:`idle`)}),k(`idle`)}export{u as mount};