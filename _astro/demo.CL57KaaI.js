import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=[{id:`inbox`,label:`Inbox`},{id:`message`,label:`Message`}],i=[{initials:`AM`,name:`Ada M.`,line:`Colour ramp is ready`},{initials:`JR`,name:`Jo R.`,line:`Two notes on the spec`},{initials:`PK`,name:`Pia K.`,line:`Shipping Thursday`}];function a(a){let o=i.map(e=>`
      <li class="sp-list-item">
        <span class="sp-avatar">${e.initials}</span>
        <span class="sp-stack sp-grow" style="gap: 2px">
          <span class="sp-text sp-text--ink">${e.name}</span>
          <span class="sp-label">${e.line}</span>
        </span>
      </li>`).join(``),s=r.map(e=>`<button class="sp-nav-item" type="button" data-part="nav-${e.id}" style="flex: 1">${e.label}</button>`).join(``);a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 366px; height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Mail</span>
          <span class="sp-label" data-part="where">Inbox</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface" data-part="viewport" style="flex: 1 1 auto; min-height: 0; overflow: hidden">
            <div
              class="sp-row"
              data-part="track"
              data-subject
              data-index="0"
              style="height: 100%; gap: 0; align-items: stretch; translate: 0 0; transition: translate 0.36s var(--sp-ease)"
            >
              <section data-part="screen-inbox" style="flex: 0 0 100%; padding: 4px 6px">
                <ul class="sp-list">${o}</ul>
              </section>
              <section data-part="screen-message" class="sp-stack" style="flex: 0 0 100%; gap: 8px; padding: 12px">
                <span class="sp-row" style="gap: 8px">
                  <span class="sp-avatar">AM</span>
                  <span class="sp-heading" style="font-size: 13px">Colour ramp is ready</span>
                </span>
                <span class="sp-line" style="width: 94%"></span>
                <span class="sp-line" style="width: 88%"></span>
                <span class="sp-line" style="width: 62%"></span>
                <span class="sp-row" style="gap: 6px; margin-top: 2px">
                  <span class="sp-chip" style="cursor: default">${n(`share`)} Reply</span>
                </span>
              </section>
            </div>
          </div>
          <div class="sp-row sp-context" style="gap: 4px">${s}</div>
        </div>
      </div>
    </div>
  `;let c=e(a,`track`),l=e(a,`where`),u=n=>{let i=Math.min(Math.max(n,0),r.length-1);c.dataset.index=String(i),c.style.translate=`${i*-100}% 0`,r.forEach((n,r)=>{let o=e(a,`screen-${n.id}`);t(o,`data-current`,r===i),o.setAttribute(`aria-hidden`,String(r!==i));let s=e(a,`nav-${n.id}`);t(s,`data-current`,r===i),r===i&&(l.textContent=n.label)})};r.forEach((t,n)=>{e(a,`nav-${t.id}`).addEventListener(`click`,()=>u(n))}),u(0)}export{a as mount};