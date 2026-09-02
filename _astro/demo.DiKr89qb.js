import{n as e,t}from"./parts.C-YLuC7Q.js";import{i as n,n as r}from"./measure.DK7AY2_i.js";var i=[`Ask before quitting`,`Confirm before deleting`,`Group messages by thread`,`Mark as read on scroll`,`Play a sound on send`,`Show remote images`,`Use system accent colour`],a=i[1],o=[`Auto-hide the sidebar`,`Blur images until opened`,`Bounce the dock icon`,`Collapse quoted text`],s={errand:`You came to turn off delete confirmation.`,buried:`The switch you came for is below the fold.`};function c(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 440px">
        <div class="sp-row sp-row--between" style="margin-bottom: 10px">
          <span class="sp-heading sp-context">Preferences</span>
          <span class="sp-text sp-context" data-part="count" style="font-size: 11px">${i.length} options</span>
        </div>
        <div class="sp-scroll sp-surface" data-part="list" data-subject style="height: 152px">
          <ul class="sp-list">${i.map(u).join(``)}</ul>
        </div>
        <span class="sp-text sp-context" data-stage-verdict data-part="note" data-state="errand" style="display: block; height: 18px; margin-top: 10px; font-size: 11px">
          ${s.errand}
        </span>
      </div>
      <div class="sp-row" style="width: 440px; margin-top: 12px; justify-content: flex-end">
        <button class="sp-button sp-button--ghost sp-button--sm sp-context" data-part="add" type="button">Add an option</button>
      </div>
    </div>
  `;let c=e(a,`list`),d=c.querySelector(`ul`),f=e(a,`errand`),p=e(a,`count`),m=e(a,`note`),h=e(a,`add`),g=0;c.addEventListener(`click`,e=>{let t=e.target.closest(`[role=switch]`);t&&t.setAttribute(`aria-checked`,t.getAttribute(`aria-checked`)===`true`?`false`:`true`)}),h.addEventListener(`click`,()=>{g>=o.length||(l(d,o[g]),g+=1,p.textContent=`${i.length+g} options`,g>=o.length&&(h.disabled=!0,h.textContent=`Nothing left to add`),_())});function _(){let e=r(f,c).top>=n(c).height;t(f,`data-buried`,e),m.dataset.state=e?`buried`:`errand`,m.textContent=e?s.buried:s.errand}_()}function l(e,t){let n=[...e.children].find(e=>(e.querySelector(`[data-label]`)?.textContent??``).trim()>t);n?n.insertAdjacentHTML(`beforebegin`,u(t)):e.insertAdjacentHTML(`beforeend`,u(t))}function u(e){let t=e===a;return`
    <li class="sp-list-item"${t?` data-part="errand"`:``}>
      <span class="sp-text sp-grow" data-label style="font-size: 12px">${e}</span>
      <button class="sp-switch" type="button" role="switch" aria-checked="${t}" aria-label="${e}"></button>
    </li>
  `}export{c as mount};