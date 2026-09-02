import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=476,i=212,a=2200,o={idle:{label:`Idle`,detail:`Last backup 12 minutes ago`,progress:100},running:{label:`Backing up`,detail:`Copying 4,182 files to Vault`,progress:38}};function s(s,c){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: ${r}px; height: 268px">
        <div
          class="sp-row"
          data-part="bar"
          style="flex: 0 0 auto; gap: 4px; padding: 3px 8px; border-bottom: 1px solid var(--sp-line); background: var(--sp-surface)"
        >
          <span class="sp-row sp-context sp-grow" style="gap: 10px">
            <span class="sp-heading" style="font-size: 12px">Studio</span>
            <span class="sp-label" style="font-size: 12px">File &nbsp; Edit &nbsp; View</span>
          </span>

          <button
            class="sp-icon-button"
            type="button"
            data-part="item"
            data-subject
            data-state="idle"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-label="Backhaul, idle"
            style="position: relative; width: 24px; height: 22px"
          >
            ${n(`inbox`)}
            <span
              data-part="pip"
              aria-hidden="true"
              style="position: absolute; top: 1px; right: 1px; width: 6px; height: 6px; border-radius: 50%;
                     background: var(--sp-accent); opacity: 0; transition: opacity 0.18s"
            ></span>
          </button>
          <span class="sp-row sp-context" style="gap: 4px">
            <button class="sp-icon-button" type="button" data-part="sys-bell" aria-label="Notifications" style="width: 24px; height: 22px">${n(`bell`)}</button>
            <button class="sp-icon-button" type="button" data-part="sys-search" aria-label="Search" style="width: 24px; height: 22px">${n(`search`)}</button>
            <span class="sp-label" style="font-size: 12px; font-variant-numeric: tabular-nums">82%</span>
            <span class="sp-label" style="font-size: 12px; font-variant-numeric: tabular-nums">Tue 9:41</span>
          </span>
        </div>

        <div class="sp-body sp-context" data-part="desktop" style="display: flex; align-items: center; justify-content: center">
          <div class="sp-surface" style="width: 292px; height: 150px; overflow: hidden">
            <div class="sp-topbar" style="padding: 6px 10px">
              <span class="sp-heading sp-grow" style="font-size: 12px">Notes</span>
            </div>
            <div class="sp-stack" style="padding: 12px; gap: 9px">
              <span class="sp-line" style="width: 84%"></span>
              <span class="sp-line" style="width: 96%"></span>
              <span class="sp-line" style="width: 62%"></span>
              <span class="sp-line" style="width: 90%"></span>
              <span class="sp-line" style="width: 44%"></span>
            </div>
          </div>
        </div>

        <div class="sp-popover sp-context" data-part="panel" role="dialog" aria-label="Backhaul" style="width: ${i}px; padding: 10px">
          <div class="sp-row sp-row--between">
            <span class="sp-heading" style="font-size: 13px">Backhaul</span>
            <span class="sp-chip" data-part="badge" style="cursor: default; padding: 2px 8px">Idle</span>
          </div>
          <div class="sp-text" data-part="detail" style="margin-top: 6px; font-size: 12px">${o.idle?.detail}</div>
          <div class="sp-progress" data-part="meter" style="margin-top: 8px; --sp-value: 100%">
            <div class="sp-progress-fill"></div>
          </div>
          <div class="sp-divider" style="margin: 10px 0"></div>
          <div class="sp-row" style="gap: 6px">
            <button class="sp-button sp-button--sm sp-grow" type="button" data-part="run">Back up now</button>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="open">Open</button>
          </div>
        </div>
      </div>
    </div>
  `;let l=e(s,`bar`),u=e(s,`item`),d=e(s,`pip`),f=e(s,`panel`),p=e(s,`badge`),m=e(s,`detail`),h=e(s,`meter`),g=u.offsetLeft+u.offsetWidth/2,_=Math.min(Math.max(g-i/2,8),254);f.style.top=`${l.offsetTop+l.offsetHeight+6}px`,f.style.left=`${_}px`,f.style.setProperty(`--sp-arrow-x`,`${(g-_-4).toFixed(1)}px`);let v=e=>{t(f,`data-open`,e),t(u,`data-open`,e),u.setAttribute(`aria-expanded`,String(e))},y=e=>{let t=o[e];t&&(u.dataset.state=e,u.setAttribute(`aria-label`,`Backhaul, ${t.label.toLowerCase()}`),d.style.opacity=e===`running`?`1`:`0`,p.textContent=t.label,m.textContent=t.detail,h.style.setProperty(`--sp-value`,`${t.progress}%`))};u.addEventListener(`click`,()=>v(!0)),e(s,`run`).addEventListener(`click`,()=>{v(!1),y(`running`),c.setTimeout(()=>y(`idle`),a)}),e(s,`open`).addEventListener(`click`,()=>v(!1)),s.addEventListener(`keydown`,e=>{e.key===`Escape`&&v(!1)}),e(s,`desktop`).addEventListener(`pointerdown`,()=>v(!1)),y(`idle`),v(!1)}export{s as mount};