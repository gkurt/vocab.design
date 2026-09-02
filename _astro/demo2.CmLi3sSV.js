import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n={strip:`A strip: 44px off the top of the page, a close button on it, and the article still readable underneath.`,full:`The same offer covering the page. Search engines treat this as an intrusive interstitial, so the installs cost ranking.`,none:`Dismissed. The room it held stays reserved, so the article does not jump when the banner goes.`};function r(r){let i=[96,88,74,92,80,86].map(e=>`<div class="sp-line" style="width: ${e}%"></div>`).join(``);r.innerHTML=`
    <div class="sp-app">
      <div class="sp-row sp-row--between sp-context" style="width: 452px; flex: 0 0 auto; justify-content: flex-end">
        <sp-segmented data-stage-mode class="sp-segmented" data-axis="Banner style" data-part="mode" data-value="strip" style="flex: 0 0 auto">
          <button class="sp-segment" data-part="seg-strip" type="button" value="strip" style="padding: 4px 10px; font-size: 11.5px">Strip</button>
          <button class="sp-segment" data-part="seg-full" type="button" value="full" style="padding: 4px 10px; font-size: 11.5px">Full page</button>
        </sp-segmented>
      </div>

      <div class="sp-row" style="width: 452px; flex: 0 0 auto; align-items: stretch; gap: 14px">
        <div class="sp-frame" style="flex: 0 0 auto; width: 272px; height: 234px">
          <div class="sp-topbar sp-context" style="padding: 6px 8px; gap: 6px">
            <span class="sp-chip" style="flex: 1 1 auto; justify-content: center; padding: 2px 8px; font-size: 10.5px; cursor: default; background: var(--sp-sunken)">loomly.example/leeks</span>
            <span class="sp-icon-button" style="flex: 0 0 auto; width: 22px; height: 22px">${t(`menu`)}</span>
          </div>

          <div data-part="page" data-banner="strip" style="position: relative; flex: 1 1 auto; min-height: 0; overflow: hidden; background: var(--sp-surface)">
            <div data-part="slot" style="height: 44px"></div>
            <div class="sp-context" style="padding: 8px 12px 12px">
              <span class="sp-heading" style="font-size: 13px">Braised leeks, hazelnuts</span>
              <span class="sp-label" style="display: block; margin-top: 2px; font-size: 10.5px">40 minutes, serves four</span>
              <div class="sp-stack" style="margin-top: 9px">${i}</div>
            </div>

            <div data-part="banner" data-subject data-mode="strip">
              <div class="sp-row" data-part="strip-body" style="height: 100%; padding: 0 8px; gap: 8px">
                <span data-part="badge" style="flex: 0 0 auto; display: flex; align-items: center; justify-content: center; width: 26px; height: 26px; border-radius: 6px; background: var(--sp-accent-soft); color: var(--sp-accent); font-size: 13px; font-weight: 700">L</span>
                <span style="flex: 1 1 auto; min-width: 0">
                  <span class="sp-text sp-text--ink" style="display: block; font-size: 11.5px; font-weight: 600; line-height: 14px">Loomly</span>
                  <span class="sp-text" style="display: block; font-size: 10px; line-height: 13px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">Free, on the App Store</span>
                </span>
                <button class="sp-button sp-button--sm" data-part="install" type="button" style="flex: 0 0 auto; padding: 3px 10px; font-size: 11px; white-space: nowrap">Open</button>
                <button class="sp-icon-button" data-part="dismiss" data-aim type="button" style="flex: 0 0 auto; width: 22px; height: 22px">${t(`close`)}</button>
              </div>

              <div data-part="full-body" hidden style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 7px; padding: 12px 16px; text-align: center">
                <span style="display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 10px; background: var(--sp-accent-soft); color: var(--sp-accent); font-size: 19px; font-weight: 700">L</span>
                <span class="sp-heading" style="font-size: 13px">Loomly is better in the app</span>
                <span class="sp-text" style="font-size: 10.5px; line-height: 1.3">Saved recipes, offline shopping lists, timers that keep running.</span>
                <button class="sp-button sp-button--sm" data-part="install-full" type="button" style="white-space: nowrap">Install the app</button>
                <button class="sp-button sp-button--quiet sp-button--sm" data-part="proceed" type="button" style="padding: 2px 6px; font-size: 10.5px; color: var(--sp-muted); white-space: nowrap">Continue in browser</button>
              </div>
            </div>
          </div>
        </div>

        <span class="sp-text sp-context" data-stage-verdict data-part="note" style="flex: 1 1 auto; align-self: flex-start; font-size: 11px; line-height: 1.4">${n.strip}</span>
      </div>
    </div>
  `;let a=e(r,`page`),o=e(r,`banner`),s=e(r,`strip-body`),c=e(r,`full-body`),l=e(r,`note`),u=`strip`,d=e=>{o.hidden=!e,o.dataset.mode=u,o.style.cssText=u===`strip`?`position: absolute; top: 0; left: 0; right: 0; height: 44px; z-index: 2; background: var(--sp-surface); border-bottom: 1px solid var(--sp-line)`:`position: absolute; inset: 0; z-index: 2; background: var(--sp-surface)`,s.hidden=u!==`strip`,c.hidden=u===`strip`,a.dataset.banner=e?u:`none`,l.textContent=e?n[u]:n.none};e(r,`dismiss`).addEventListener(`click`,()=>d(!1)),e(r,`proceed`).addEventListener(`click`,()=>d(!1)),e(r,`mode`).addEventListener(`change`,e=>{u=e.detail===`full`?`full`:`strip`,d(!0)}),d(!0)}export{r as mount};