import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n={wallet:{heading:`Wallet`,title:`Wallet · Ledger`,path:`app.example/wallet`,body:`Two accounts, one card, nothing due this week.`},statements:{heading:`Statements`,title:`Statements · Ledger`,path:`app.example/statements`,body:`Eleven months of statements, newest first.`}},r={announced:`The router does by hand what a page load did for free: the title is rewritten, the new heading takes focus, and the region posts where the reader has arrived.`,silent:`The URL and the view changed and nothing was said. Focus is still on the link, and the title still names the page the reader left, so asking for it lies.`};function i(i){let a=i.ownerDocument,o=e=>`
    <div data-part="view-${e}" style="position: absolute; inset: 0; opacity: ${+(e===`wallet`)};
                                         transition: opacity 0.18s ease">
      <h2 class="sp-heading" data-part="heading-${e}" tabindex="-1"
          style="margin: 0; font-size: 14px; outline-offset: 3px">${n[e].heading}</h2>
      <p class="sp-text sp-context" style="margin: 3px 0 0; font-size: 11px">${n[e].body}</p>
    </div>`,s=(e,t,n)=>`
    <div class="sp-row" style="gap: 8px; height: 17px">
      <span class="sp-label sp-context" style="flex: 0 0 auto; width: 96px; font-size: 10px">${t}</span>
      <span class="sp-text sp-text--ink" data-part="${e}"
            style="flex: 1 1 auto; min-width: 0; font-size: 11px; line-height: 17px; white-space: nowrap">${n}</span>
    </div>`;i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 10px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Announcement" data-part="mode" data-value="announced" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-announced" value="announced"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Announced</button>
            <button class="sp-segment" type="button" data-part="seg-silent" value="silent"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Silent</button>
          </sp-segmented>
        </div>

        <div class="sp-frame" style="margin-top: 8px; width: auto; height: 108px; overflow: hidden">
          <div class="sp-topbar sp-context" style="padding: 4px 10px">
            <span class="sp-label" data-part="url" data-page="wallet"
                  style="font-size: 10.5px">${n.wallet.path}</span>
          </div>
          <div class="sp-nav sp-context" style="flex-direction: row; padding: 4px 8px; gap: 4px">
            <button class="sp-nav-item" type="button" data-part="nav-wallet" data-current
                    style="padding: 3px 10px; font-size: 11.5px">Wallet</button>
            <button class="sp-nav-item" type="button" data-part="nav-statements"
                    style="padding: 3px 10px; font-size: 11.5px">Statements</button>
          </div>
          <div style="position: relative; height: 44px; padding: 8px 10px 0">
            <div style="position: relative; height: 100%">
              ${o(`wallet`)}
              ${o(`statements`)}
            </div>
          </div>
        </div>

        <div class="sp-surface" style="margin-top: 8px; padding: 7px 10px">
          ${s(`title`,`document.title`,n.wallet.title)}
          ${s(`focus`,`Focus`,`none`)}
          <div class="sp-row" style="gap: 8px; height: 17px">
            <span class="sp-label sp-context" style="flex: 0 0 auto; width: 96px; font-size: 10px">Live region</span>
            <span style="position: relative; flex: 1 1 auto; min-width: 0; height: 17px">
              <span class="sp-text sp-context" data-part="empty"
                    style="position: absolute; inset: 0; font-size: 11px; line-height: 17px; white-space: nowrap">(empty)</span>
              <span class="sp-text sp-text--ink" data-part="post" data-subject role="status" aria-live="polite"
                    style="position: absolute; inset: 0; font-size: 11px; line-height: 17px; white-space: nowrap;
                           opacity: 0; visibility: hidden; transition: opacity 0.18s, visibility 0.18s"></span>
            </span>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="announced"
           style="margin: 8px 0 0; height: 30px; font-size: 11px; line-height: 1.35">${r.announced}</p>
      </div>
    </div>
  `;let c=e(i,`url`),l=e(i,`title`),u=e(i,`focus`),d=e(i,`post`),f=e(i,`empty`),p=e(i,`caption`),m={wallet:e(i,`view-wallet`),statements:e(i,`view-statements`)},h={wallet:e(i,`heading-wallet`),statements:e(i,`heading-statements`)},g={wallet:e(i,`nav-wallet`),statements:e(i,`nav-statements`)},_=`announced`,v=(e,t)=>{e.style.opacity=t?`1`:`0`,e.style.visibility=t?`visible`:`hidden`},y=(e,r)=>{for(let n of[`wallet`,`statements`])m[n].style.opacity=n===e?`1`:`0`,t(g[n],`data-current`,n===e);if(c.dataset.page=e,c.textContent=n[e].path,_===`silent`){t(l,`data-stale`,e!==`wallet`),u.dataset.moved=`no`,u.textContent=`button “${n[e].heading}”`;return}a.title=n[e].title,l.dataset.page=e,l.textContent=a.title,t(l,`data-stale`,!1),u.dataset.moved=`yes`,u.textContent=`h2 “${n[e].heading}”`;for(let n of[`wallet`,`statements`])t(h[n],`data-sim-focus`,n===e);d.textContent=`“${n[e].title}”`,v(d,!0),v(f,!1),r&&h[e].focus()},b=e=>{_=e,p.dataset.mode=e,p.textContent=r[e];for(let e of[`wallet`,`statements`])m[e].style.opacity=e===`wallet`?`1`:`0`,t(g[e],`data-current`,e===`wallet`),t(h[e],`data-sim-focus`,!1);c.dataset.page=`wallet`,c.textContent=n.wallet.path,a.title=n.wallet.title,l.dataset.page=`wallet`,l.textContent=a.title,t(l,`data-stale`,!1),u.dataset.moved=`none`,u.textContent=`none`,v(d,!1),v(f,!0)};for(let e of[`wallet`,`statements`])g[e].addEventListener(`click`,t=>y(e,t.isTrusted));e(i,`mode`).addEventListener(`change`,e=>{b(e.detail)}),b(`announced`)}export{i as mount};