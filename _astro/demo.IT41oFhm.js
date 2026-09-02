import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=`var(--sp-radius)`,r=[{key:`copy`,label:`Copy link`,glyph:`copy`,status:`Link copied`,radius:`${n} 0 0 ${n}`},{key:`duplicate`,label:`Duplicate`,glyph:`plus`,status:`Duplicated`,radius:`0`},{key:`archive`,label:`Archive`,glyph:`inbox`,status:`Moved to archive`,radius:`0 ${n} ${n} 0`}];function i(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Brand assets</span></div>
        <div class="sp-body">
          <div class="sp-surface sp-context" style="padding: 12px">
            <div class="sp-row">
              <span class="sp-avatar" aria-hidden="true">PD</span>
              <span class="sp-grow">
                <span class="sp-heading" style="font-size: 13px">Poster draft.pdf</span>
                <span class="sp-text" style="display: block">2.4 MB, edited yesterday</span>
              </span>
            </div>
          </div>
          <div data-part="group" data-subject role="group" aria-label="File actions" style="display: inline-flex; margin-top: 14px">
            ${r.map(({key:e,label:n,glyph:r,radius:i},a)=>`<button
        class="sp-button sp-button--ghost sp-button--sm sp-row"
        data-part="act-${e}"
        data-key="${e}"
        style="gap: 6px; border-radius: ${i}; margin-left: ${a===0?`0`:`-1px`}"
      >${t(r)}<span>${n}</span></button>`).join(``)}
          </div>
          <div class="sp-row sp-context" style="height: 20px; margin-top: 12px">
            <span class="sp-text" data-part="status" data-action="none" role="status">No actions yet</span>
          </div>
        </div>
      </div>
    </div>
  `;let i=e(n,`status`);for(let t of r)e(n,`act-${t.key}`).addEventListener(`click`,()=>{i.dataset.action=t.key,i.textContent=t.status})}export{i as mount};