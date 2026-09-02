import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={sm:{width:288,shape:`stacked`,note:`below 360px`},md:{width:384,shape:`sidebar`,note:`360px and up`},lg:{width:456,shape:`three`,note:`440px and up`}},n={stacked:{areas:`'nav' 'main'`,columns:`1fr`,rows:`auto 1fr`,aside:!1,navRow:!0},sidebar:{areas:`'nav main'`,columns:`104px 1fr`,rows:`1fr`,aside:!1,navRow:!1},three:{areas:`'nav main aside'`,columns:`96px 1fr 96px`,rows:`1fr`,aside:!0,navRow:!1}};function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 470px; height: 290px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Viewport</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-value="sm" data-axis="Width">
            <button class="sp-segment" type="button" data-part="seg-sm" value="sm">288px</button>
            <button class="sp-segment" type="button" data-part="seg-md" value="md">384px</button>
            <button class="sp-segment" type="button" data-part="seg-lg" value="lg">456px</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center">
          <div
            data-part="viewport"
            data-bp="sm"
            style="width: ${t.sm?.width}px; height: 176px; padding: 8px; background: var(--sp-bg); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            <div
              class="sp-grid"
              data-part="region"
              data-subject
              data-shape="stacked"
              style="height: 100%; grid-template-areas: ${n.stacked.areas}; grid-template-columns: ${n.stacked.columns}; grid-template-rows: ${n.stacked.rows}; padding: 8px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
            >
              <nav data-part="nav" aria-label="Sections" style="grid-area: nav; min-width: 0">
                <ul class="sp-nav" data-part="nav-list" style="flex-direction: row">
                  <li><span class="sp-nav-item" data-current>Tides</span></li>
                  <li><span class="sp-nav-item">Winds</span></li>
                  <li><span class="sp-nav-item">Charts</span></li>
                </ul>
              </nav>
              <main data-part="main" style="grid-area: main; min-width: 0; padding: 2px 2px 0">
                <div class="sp-row sp-row--between">
                  <span class="sp-heading">Harbour log</span>
                  <span class="sp-label" data-part="token">sm</span>
                </div>
                <div class="sp-stack" style="margin-top: 10px">
                  <div class="sp-line" style="width: 96%"></div>
                  <div class="sp-line" style="width: 88%"></div>
                  <div class="sp-line" style="width: 92%"></div>
                  <div class="sp-line" style="width: 62%"></div>
                </div>
              </main>
              <aside data-part="aside" hidden style="grid-area: aside; min-width: 0; padding: 2px 0 0">
                <span class="sp-label">Aside</span>
                <div class="sp-stack" style="margin-top: 10px">
                  <div class="sp-line" style="width: 84%"></div>
                  <div class="sp-line" style="width: 58%"></div>
                </div>
              </aside>
            </div>
          </div>
          <div class="sp-row sp-context" style="height: 20px; margin-top: 10px">
            <span class="sp-text" data-part="readout" style="font-variant-numeric: tabular-nums"></span>
          </div>
        </div>
      </div>
    </div>
  `;let i=e(r,`viewport`),a=e(r,`region`),o=e(r,`nav-list`),s=e(r,`aside`),c=e(r,`token`),l=e(r,`readout`),u=e=>{let r=t[e];if(!r)return;let u=n[r.shape];i.style.width=`${r.width}px`,i.dataset.bp=e,a.dataset.shape=r.shape,a.style.gridTemplateAreas=u.areas,a.style.gridTemplateColumns=u.columns,a.style.gridTemplateRows=u.rows,o.style.flexDirection=u.navRow?`row`:`column`,s.hidden=!u.aside,c.textContent=e,l.textContent=`${r.width}px · ${e} · ${r.note}`};e(r,`switcher`).addEventListener(`change`,e=>u(e.detail)),u(`sm`)}export{r as mount};