import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n=[{heading:`Product`,links:[`Tides`,`Charts`,`Pricing`]},{heading:`Company`,links:[`About`,`Careers`,`Press`]},{heading:`Legal`,links:[`Privacy`,`Terms`,`Cookies`]}];function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 470px; height: 292px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Footer</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Layout" data-part="switcher" data-value="full">
            <button class="sp-segment" type="button" data-part="seg-full" value="full">sitemap</button>
            <button class="sp-segment" type="button" data-part="seg-thin" value="thin">one line</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="padding: 12px">
          <div
            data-part="page"
            style="display: flex; flex-direction: column; height: 100%; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius); overflow: hidden"
          >
            <main class="sp-context" data-part="main" style="flex: 1 1 auto; min-height: 0; padding: 12px 14px">
              <span class="sp-heading" style="font-size: 13px">Harbour Press</span>
              <div class="sp-stack" style="margin-top: 8px; gap: 6px">
                <div class="sp-line" style="width: 92%"></div>
                <div class="sp-line" style="width: 74%"></div>
              </div>
            </main>
            <footer
              data-part="footer"
              data-subject
              data-mode="full"
              style="flex: 0 0 auto; padding: 12px 14px; border-top: 1px solid var(--sp-line); background: var(--sp-sunken)"
            >
              <div data-part="footer-full">
                <div class="sp-row" style="align-items: flex-start; gap: 12px">
                  ${n.map((e,t)=>`
      <div class="sp-stack" data-part="column-${t+1}" style="flex: 0 0 auto; width: 76px; gap: 4px">
        <span class="sp-label" style="color: var(--sp-ink)">${e.heading}</span>
        ${e.links.map(e=>`<span class="sp-text" style="font-size: 12px">${e}</span>`).join(``)}
      </div>`).join(``)}
                  <div class="sp-stack" data-part="newsletter" style="flex: 1 1 auto; min-width: 0; gap: 4px">
                    <span class="sp-label" style="color: var(--sp-ink)">Newsletter</span>
                    <div class="sp-row" style="gap: 6px">
                      <span
                        class="sp-input sp-grow"
                        data-part="newsletter-field"
                        style="padding: 3px 8px; font-size: 12px; color: var(--sp-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
                        >your address</span
                      >
                      <button class="sp-button sp-button--sm" type="button" data-part="join" style="flex: 0 0 auto; padding: 3px 10px">Join</button>
                    </div>
                  </div>
                </div>
                <div class="sp-divider" style="margin: 10px 0"></div>
              </div>
              <div class="sp-row sp-row--between" data-part="legal">
                <span class="sp-label" data-part="copyright">Harbour Press, 2026</span>
                ${`
    <div class="sp-row" data-part="social" style="gap: 4px">
      <span style="display: flex; color: var(--sp-muted)">${t(`share`)}</span>
      <span style="display: flex; color: var(--sp-muted)">${t(`heart`)}</span>
      <span style="display: flex; color: var(--sp-muted)">${t(`bell`)}</span>
    </div>`}
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  `;let i=e(r,`footer`),a=e(r,`footer-full`),o=e(r,`copyright`),s=e=>{let t=e===`thin`;i.dataset.mode=t?`thin`:`full`,a.hidden=t,o.textContent=t?`Harbour Press, 2026 · Privacy · Terms · Contact`:`Harbour Press, 2026`};e(r,`switcher`).addEventListener(`change`,e=>s(e.detail)),s(`full`)}export{r as mount};