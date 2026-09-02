import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=[{key:`overview`,label:`Overview`},{key:`invoices`,label:`Invoices`},{key:`members`,label:`Members`},{key:`settings`,label:`Settings`}],r=`overview`;function i({key:e,label:t}){return`
    <li>
      <span class="sp-nav-item" data-part="nav-${e}" data-page="${e}" role="link" tabindex="0"
            style="display: flex; align-items: center; gap: 8px">
        <span data-part="bar-${e}" aria-hidden="true"
              style="flex: 0 0 auto; width: 3px; height: 13px; border-radius: 2px; background: var(--sp-accent); visibility: hidden"></span>
        <span>${t}</span>
      </span>
    </li>`}function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 198px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading" style="font-size: 14px">Ledger</span>
        </div>
        <div class="sp-row" style="flex: 1 1 auto; min-height: 0; align-items: stretch; gap: 0">
          <nav data-part="navlist" data-review="colour" aria-label="Sections"
               style="flex: 0 0 auto; width: 148px; padding: 10px; border-right: 1px solid var(--sp-line)">
            <ul class="sp-nav">${n.map(i).join(``)}</ul>
          </nav>
          <div class="sp-body sp-context sp-grow">
            <span class="sp-heading" data-part="pane-title" style="font-size: 14px">Overview</span>
            <div class="sp-stack" style="margin-top: 10px; gap: 7px">
              <span class="sp-line" style="width: 88%"></span>
              <span class="sp-line" style="width: 74%"></span>
              <span class="sp-line" style="width: 81%"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="sp-surface sp-context" style="width: 460px; padding: 8px 10px">
        <div class="sp-row sp-row--between" style="height: 20px">
          <span class="sp-label">Screen reader</span>
          <span class="sp-text sp-text--ink" data-part="heard" data-page="${r}"
                style="font-size: 12px; white-space: nowrap">“Overview, current page, link”</span>
        </div>
        <div class="sp-row sp-row--between" style="margin-top: 6px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Colour-only review" data-value="colour">
            <button class="sp-segment" data-part="seg-colour" value="colour">Colour</button>
            <button class="sp-segment" data-part="seg-grey" value="grey">Greyscale</button>
          </sp-segmented>
        </div>
      </div>
    </div>
  `;let o=e(a,`navlist`),s=e(a,`pane-title`),c=e(a,`heard`),l=r=>{let i=n.find(e=>e.key===r)??n[0];for(let{key:r,label:o}of n){let n=e(a,`nav-${r}`),s=r===i.key;t(n,`data-current`,s),t(n,`data-subject`,s),s?n.setAttribute(`aria-current`,`page`):n.removeAttribute(`aria-current`),n.style.fontWeight=s?`600`:``,e(a,`bar-${r}`).style.visibility=s?`visible`:`hidden`,s&&(c.textContent=`“${o}, current page, link”`)}c.dataset.page=i.key,s.textContent=i.label};l(r);for(let{key:t}of n)e(a,`nav-${t}`).addEventListener(`click`,()=>l(t));e(a,`segmented`).addEventListener(`change`,e=>{let t=e.detail===`grey`;o.dataset.review=t?`grey`:`colour`,o.style.filter=t?`grayscale(1)`:``})}export{a as mount};