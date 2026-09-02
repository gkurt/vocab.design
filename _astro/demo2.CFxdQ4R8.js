import{n as e,t}from"./parts.C-YLuC7Q.js";var n={offer:{title:`Not built yet`,copy:`Scheduled reports do not exist. This button is here so we can count who wants them, and nothing has been sent.`,dismiss:`Not now`,act:`Notify me`},counted:{title:`Counted`,copy:`You are on the list. We build this only if enough people press it, and either way we will write to tell you.`,dismiss:`Close`,act:`On the list`}},r=[46,62,40,78,58,90];function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 272px">

        <div class="sp-topbar" style="gap: 8px">
          <span class="sp-heading sp-context sp-grow" style="font-size: 13px">Quarterly report</span>
          <button class="sp-button sp-button--ghost sp-button--sm sp-context" data-part="export" type="button" style="flex: 0 0 auto; white-space: nowrap">Export</button>
          <button
            class="sp-button sp-button--sm"
            data-part="door"
            data-subject
            data-open="false"
            type="button"
            style="flex: 0 0 auto; white-space: nowrap"
          >Schedule weekly</button>
        </div>

        <div class="sp-body sp-context" style="position: relative">
          <div class="sp-surface" style="height: 100%; padding: 12px; display: flex; flex-direction: column; gap: 10px">
            <span class="sp-label">Revenue by month</span>
            <div class="sp-row" style="align-items: flex-end; gap: 8px; height: 96px">${r.map(e=>`<span style="flex: 1 1 0; height: ${e}px; border-radius: 3px 3px 0 0; background: var(--sp-accent)"></span>`).join(``)}</div>
            <div class="sp-stack" style="gap: 6px">
              <span class="sp-line" style="width: 70%"></span>
              <span class="sp-line" style="width: 45%"></span>
            </div>
          </div>

          <div class="sp-scrim" data-part="scrim"></div>
          <div
            class="sp-dialog"
            data-part="sheet"
            data-state="offer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="fd-title"
            style="width: 300px; padding: 14px 16px"
          >
            <span class="sp-heading" data-part="sheet-title" id="fd-title" style="display: block; font-size: 14px">${n.offer.title}</span>
            <p class="sp-text" data-part="truth" style="margin: 6px 0 12px; height: 58px; font-size: 12px">${n.offer.copy}</p>
            <div class="sp-row" style="gap: 8px">
              <button class="sp-button sp-button--ghost sp-button--sm" data-part="dismiss" type="button" style="flex: 1 1 0; white-space: nowrap">${n.offer.dismiss}</button>
              <button class="sp-button sp-button--sm" data-part="notify" type="button" style="flex: 1 1 0; white-space: nowrap">${n.offer.act}</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;let a=e(i,`door`),o=e(i,`scrim`),s=e(i,`sheet`),c=e(i,`sheet-title`),l=e(i,`truth`),u=e(i,`dismiss`),d=e(i,`notify`),f=e=>{let t=n[e];s.dataset.state=e,c.textContent=t.title,l.textContent=t.copy,u.textContent=t.dismiss,d.textContent=t.act,d.setAttribute(`aria-disabled`,String(e===`counted`))},p=e=>{a.dataset.open=String(e),t(s,`data-open`,e),t(o,`data-open`,e)};a.addEventListener(`click`,()=>p(!0)),d.addEventListener(`click`,()=>f(`counted`)),u.addEventListener(`click`,()=>p(!1)),f(`offer`),p(!1)}export{i as mount};