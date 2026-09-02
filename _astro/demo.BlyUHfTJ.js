import{n as e}from"./parts.C-YLuC7Q.js";var t=[{key:`home`,label:`Home`,pages:[{key:`activity`,label:`Activity`},{key:`pinned`,label:`Pinned`}]},{key:`library`,label:`Library`,pages:[{key:`vessels`,label:`Vessels`},{key:`charts`,label:`Charts`},{key:`tags`,label:`Tags`}]},{key:`team`,label:`Team`,pages:[{key:`overview`,label:`Overview`},{key:`members`,label:`Members`},{key:`billing`,label:`Billing`},{key:`audit`,label:`Audit log`}]},{key:`settings`,label:`Settings`,pages:[{key:`profile`,label:`Profile`},{key:`access`,label:`Access`}]}],n=t.map(e=>e.label),r=[94,86,71,90,62];function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 444px; height: 288px">
        <div class="sp-topbar sp-context" style="gap: 12px; padding: 9px 12px">
          <span class="sp-row" style="gap: 7px; flex: 0 0 auto">
            <span class="sp-swatch" style="width: 16px; height: 16px; --sp-swatch: var(--sp-accent)"></span>
            <span class="sp-heading" style="font-size: 12px">Harbour</span>
          </span>
          <span class="sp-row sp-grow" style="gap: 2px">
            ${n.map(e=>`<span class="sp-nav-item" role="link" data-part="global-${e.toLowerCase()}" style="font-size: 12px; padding: 5px 8px">${e}</span>`).join(``)}
          </span>
          <span class="sp-avatar" style="width: 22px; height: 22px; font-size: 10px">RN</span>
        </div>
        <div class="sp-body" style="display: flex; gap: 12px; padding: 12px">
          <nav
            class="sp-stack"
            data-part="local"
            data-subject
            data-section="team"
            aria-label="Section"
            style="flex: 0 0 auto; width: 132px; gap: 5px; padding: 9px 8px; background: var(--sp-surface);
                   border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            <span class="sp-label" data-part="section-name" style="padding: 0 8px">Team</span>
            <span class="sp-nav" data-part="pages" style="gap: 3px"></span>
          </nav>
          <div class="sp-surface sp-context" style="display: flex; flex-direction: column; gap: 10px; flex: 1 1 auto; min-width: 0; padding: 12px 14px">
            <span class="sp-heading" data-part="pane-title" style="font-size: 14px">Overview</span>
            ${r.map(e=>`<div class="sp-line" style="flex: 0 0 auto; width: ${e}%"></div>`).join(``)}
          </div>
        </div>
      </div>
    </div>
  `;let a=e(i,`local`),o=e(i,`pages`),s=e(i,`section-name`),c=e(i,`pane-title`),l=e=>{let t=[...o.children].find(t=>t.dataset.key===e);if(t){for(let e of o.children)e.removeAttribute(`data-current`);t.setAttribute(`data-current`,``),c.textContent=t.textContent??``}},u=e=>{let n=t.find(t=>t.key===e);if(n){a.dataset.section=n.key,s.textContent=n.label,o.innerHTML=n.pages.map(e=>`<span class="sp-nav-item" role="link" data-part="item-${e.key}" data-key="${e.key}">${e.label}</span>`).join(``);for(let e of o.children){let t=e;t.addEventListener(`click`,()=>l(t.dataset.key??``))}l(n.pages[0]?.key??``)}};for(let r of n){let a=e(i,`global-${r.toLowerCase()}`),o=t.find(e=>e.label===r);a.addEventListener(`click`,()=>{for(let t of n)e(i,`global-${t.toLowerCase()}`).removeAttribute(`data-current`);a.setAttribute(`data-current`,``),o&&u(o.key)})}e(i,`global-team`).setAttribute(`data-current`,``),u(`team`)}export{i as mount};