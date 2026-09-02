import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=[[`Coastal Road`,`Ferris Wheel`],[`Blue Hour`,`Nadia Sun`],[`Slow Ferry`,`The Pilots`]],r={lazy:`The work exists first. The account is asked for at the moment the work needs to outlive the session, and the three tracks are named in the ask.`,upfront:`The same product with the ask moved to the front. Nothing has been made yet, so nothing is at stake, and the form is pure cost.`};function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Tapedeck</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Flow" data-part="mode" data-value="lazy">
            <button class="sp-segment" type="button" data-part="mode-upfront" value="upfront" style="padding: 5px 10px; font-size: 12px">Sign up first</button>
            <button class="sp-segment" type="button" data-part="mode-lazy" value="lazy" style="padding: 5px 10px; font-size: 12px">Lazy</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="position: relative; display: flex; flex-direction: column; justify-content: center">

          <div class="sp-surface" data-part="work" data-mode="lazy" style="padding: 10px 12px">
            <div class="sp-row sp-row--between" style="height: 18px">
              <span class="sp-heading" style="font-size: 13px">Late night drive</span>
              <span class="sp-label" data-part="count" style="font-size: 11px">3 tracks, this session only</span>
            </div>
            <div style="height: 112px; margin-top: 6px">
              <ul class="sp-list" data-part="tracks">${n.map(([e,t],n)=>`<li class="sp-list-item" data-part="track-${n+1}" style="padding: 7px 8px">
        <span class="sp-avatar" style="width: 22px; height: 22px; font-size: 10px">${n+1}</span>
        <span class="sp-grow" style="font-size: 12px">${e}</span>
        <span class="sp-label" style="font-size: 11px">${t}</span>
      </li>`).join(``)}</ul>
              <div class="sp-empty" data-part="empty" style="height: 100%; padding: 0; gap: 6px" hidden>
                <span class="sp-text" style="font-size: 12px">Nothing here yet</span>
                <span class="sp-label" style="font-size: 11px">The library opens after the account does</span>
              </div>
            </div>
            <div class="sp-row sp-row--between" style="height: 30px; margin-top: 4px">
              <span class="sp-label" style="font-size: 11px">No account has been made</span>
              <button class="sp-button sp-button--sm" type="button" data-part="save">Save playlist</button>
            </div>
          </div>

          <div class="sp-scrim" data-part="scrim"></div>

          <div class="sp-dialog" data-part="gate" role="dialog" aria-label="Create an account to start" style="width: 268px; padding: 12px 14px">
            <div class="sp-heading" style="font-size: 14px">Create an account to start</div>
            <div class="sp-text" style="margin-top: 4px; height: 32px; font-size: 11px">Nothing can be played, made, or kept until this is done.</div>
            <input class="sp-input" type="email" placeholder="you@example.com" aria-label="Email address" style="margin-top: 6px" />
            <button class="sp-button sp-button--sm" type="button" style="width: 100%; margin-top: 8px">Create account</button>
          </div>

          <div
            class="sp-dialog"
            data-part="prompt"
            data-subject
            role="dialog"
            aria-label="Keep this playlist"
            style="width: 268px; padding: 12px 14px"
          >
            <div class="sp-heading" style="font-size: 14px">Keep this playlist?</div>
            <div class="sp-text" data-part="carry" style="margin-top: 4px; height: 32px; font-size: 11px">
              Late night drive and its 3 tracks come with you and survive this tab.
            </div>
            <input class="sp-input" type="email" placeholder="you@example.com" aria-label="Email address" style="margin-top: 6px" />
            <div class="sp-row" style="gap: 8px; margin-top: 8px">
              <button class="sp-button sp-button--quiet sp-button--sm" type="button" data-part="not-now" style="color: var(--sp-muted); font-size: 12px">Not now</button>
              <button class="sp-button sp-button--sm sp-grow" type="button" style="text-align: center">Create account</button>
            </div>
          </div>

        </div>
      </div>
      <span class="sp-text sp-context" data-stage-verdict data-part="note" style="width: 452px; height: 32px; font-size: 11px">${r.lazy}</span>
    </div>
  `;let a=e(i,`work`),o=e(i,`scrim`),s=e(i,`gate`),c=e(i,`prompt`),l=e(i,`tracks`),u=e(i,`empty`),d=e(i,`count`),f=e(i,`save`),p=e(i,`note`),m=e=>{let n=e===`lazy`;a.dataset.mode=e,t(l,`hidden`,!n),t(u,`hidden`,n),t(s,`data-open`,!n),t(c,`data-open`,!1),t(o,`data-open`,!n),d.textContent=n?`3 tracks, this session only`:`0 tracks`,f.toggleAttribute(`aria-disabled`,!n),p.textContent=r[e]};e(i,`mode`).addEventListener(`change`,e=>{m(e.detail===`upfront`?`upfront`:`lazy`)}),f.addEventListener(`click`,()=>{a.dataset.mode===`lazy`&&(t(o,`data-open`,!0),t(c,`data-open`,!0))}),e(i,`not-now`).addEventListener(`click`,()=>{t(c,`data-open`,!1),t(o,`data-open`,!1)})}export{i as mount};