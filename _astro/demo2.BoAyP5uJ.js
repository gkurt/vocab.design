import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[{key:`bold`,label:`B`,name:`Bold`,style:`font-weight: 700`},{key:`italic`,label:`I`,name:`Italic`,style:`font-style: italic`},{key:`underline`,label:`U`,name:`Underline`,style:`text-decoration: underline`}];function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Release notes</span></div>
        <div class="sp-body">
          <div class="sp-row sp-row--between">
            <span class="sp-label sp-context" id="format-label">Emphasis</span>
            <div
              class="sp-row"
              data-part="group"
              data-subject
              role="group"
              aria-labelledby="format-label"
              style="gap: 4px; padding: 3px; border: 1px solid var(--sp-line); border-radius: var(--sp-radius); background: var(--sp-surface)"
            >${n.map(({key:e,label:t,name:n,style:r})=>`<button
        class="sp-button sp-button--ghost sp-button--sm"
        data-part="toggle-${e}"
        data-key="${e}"
        aria-pressed="false"
        aria-label="${n}"
        style="${r}; width: 32px; padding: 5px 0; text-align: center"
      >${t}</button>`).join(``)}</div>
          </div>
          <div class="sp-divider sp-context" style="margin: 14px 0"></div>
          <p class="sp-prose sp-context" data-part="sample" style="height: 80px; margin: 0">
            Version 4.2 ships the new export pipeline and a faster first paint.
          </p>
        </div>
      </div>
    </div>
  `;let i=e(r,`sample`);for(let{key:a,style:o}of n){let n=e(r,`toggle-${a}`);n.addEventListener(`click`,()=>{let e=n.getAttribute(`aria-pressed`)!==`true`;n.setAttribute(`aria-pressed`,String(e)),t(n,`data-selected`,e);let[r,a]=o.split(`:`).map(e=>e.trim());!r||!a||i.style.setProperty(r,e?a:``)})}}export{r as mount};