import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=[{key:`success`,name:`Success`,fill:`#157F3C`,mark:`check`,meaning:`It worked. Nothing is left to do.`},{key:`warning`,name:`Warning`,fill:`#B45309`,mark:`alert`,meaning:`It worked, but something needs attention.`},{key:`danger`,name:`Danger`,fill:`#C2312B`,mark:`close`,meaning:`It failed, or it is about to destroy something.`},{key:`info`,name:`Info`,fill:`#2C5FD0`,mark:`bell`,meaning:`Worth knowing. Nothing has gone wrong.`}],i=`success`;function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row" data-part="row" data-subject style="gap: 8px">${r.map(({key:e,name:t,fill:r,mark:i})=>`
      <button data-part="chip-${e}" data-status="${e}" type="button"
              style="flex: 1 1 0; display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 9px 4px;
                     border: 1px solid var(--sp-line); border-radius: 8px; background: ${r}; color: #FFFFFF;
                     font: inherit; font-size: 12px; font-weight: 600; cursor: pointer">
        ${n(i)}${t}
      </button>`).join(``)}</div>

        <div class="sp-context" data-part="banner" data-status="${i}"
             style="display: flex; align-items: center; gap: 9px; margin-top: 12px; min-height: 60px; padding: 10px 12px;
                    border-radius: var(--sp-radius); background: var(--sp-sunken); border-left: 4px solid transparent">
          <span data-part="banner-mark" style="display: flex"></span>
          <span class="sp-text sp-text--ink sp-grow" data-part="banner-text">&nbsp;</span>
        </div>
      </div>
    </div>
  `;let o=e(a,`banner`),s=e(a,`banner-mark`),c=e(a,`banner-text`),l=r.map(t=>({status:t,el:e(a,`chip-${t.key}`)})),u=e=>{let i=r.find(t=>t.key===e);if(i){o.dataset.status=i.key,o.style.borderLeftColor=i.fill,s.innerHTML=n(i.mark),s.style.color=i.fill,c.textContent=`${i.name}. ${i.meaning}`;for(let n of l){let r=n.status.key===e;t(n.el,`data-selected`,r),n.el.style.boxShadow=r?`0 0 0 2px var(--sp-surface), 0 0 0 4px var(--sp-ink)`:``}}};u(i);for(let e of l)e.el.addEventListener(`click`,()=>u(e.status.key))}export{a as mount};