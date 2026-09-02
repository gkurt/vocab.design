import{n as e}from"./parts.C-YLuC7Q.js";var t=[{key:`home`,label:`Home`,blurb:`Today`,local:[`Activity`,`Pinned`]},{key:`library`,label:`Library`,blurb:`Library`,local:[`Vessels`,`Charts`,`Tags`]},{key:`reports`,label:`Reports`,blurb:`Reports`,local:[`Weekly`,`Exports`]},{key:`settings`,label:`Settings`,blurb:`Settings`,local:[`Profile`,`Access`]}],n=[96,88,72,91,64];function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 444px; height: 288px">
        <nav
          class="sp-topbar"
          data-part="global"
          data-subject
          data-current="home"
          aria-label="Site"
          style="gap: 14px; padding: 9px 12px"
        >
          <span class="sp-row" style="gap: 7px; flex: 0 0 auto">
            <span class="sp-swatch" style="width: 18px; height: 18px; --sp-swatch: var(--sp-accent)"></span>
            <span class="sp-heading" style="font-size: 13px">Harbour</span>
          </span>
          <span class="sp-row sp-grow" style="gap: 2px">
            ${t.map(e=>`<span class="sp-nav-item" role="link" data-part="nav-${e.key}" data-key="${e.key}">${e.label}</span>`).join(``)}
          </span>
          <span class="sp-avatar" style="width: 24px; height: 24px; font-size: 10px">RN</span>
        </nav>
        <div class="sp-body sp-context" style="padding: 12px">
          <div class="sp-surface" style="display: flex; flex-direction: column; height: 100%; overflow: hidden">
            <div class="sp-row" data-part="local" style="gap: 3px; flex: 0 0 auto; padding: 7px 10px; border-bottom: 1px solid var(--sp-line)"></div>
            <div class="sp-stack" style="flex: 1 1 auto; gap: 10px; padding: 12px 14px">
              <span class="sp-heading" data-part="pane-title" style="font-size: 14px">Today</span>
              ${n.map(e=>`<div class="sp-line" style="flex: 0 0 auto; width: ${e}%"></div>`).join(``)}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let i=e(r,`global`),a=e(r,`local`),o=e(r,`pane-title`),s=t.map(t=>e(r,`nav-${t.key}`)),c=e=>{let n=t.find(t=>t.key===e);if(n){i.dataset.current=e;for(let t of s)t.dataset.key===e?t.setAttribute(`data-current`,``):t.removeAttribute(`data-current`);o.textContent=n.blurb,a.innerHTML=n.local.map((e,t)=>`<span class="sp-nav-item" role="link" data-part="tab-${e.toLowerCase()}" style="font-size: 12px; padding: 4px 8px" ${t===0?`data-current`:``}>${e}</span>`).join(``)}};for(let e of s)e.addEventListener(`click`,()=>c(e.dataset.key??`home`));c(`home`)}export{r as mount};