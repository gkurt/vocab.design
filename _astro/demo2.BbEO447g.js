import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r={asking:{title:`Turn on order updates?`,body:`One message when your driver leaves, and one when they arrive. Nothing else, and you can turn it off here later.`,actions:!0},granted:{title:`Order updates are on`,body:`The system prompt was answered once, after the reason for it had already been given.`,actions:!1},denied:{title:`Updates stayed off`,body:`The system prompt is spent now. Turning them on means finding this app in the phone settings.`,actions:!1},deferred:{title:`Not now, then`,body:`Nothing was spent. The system prompt was never shown, so the app can offer this again after the next order.`,actions:!1}},i={asking:`Not now costs nothing: only Turn on reaches the system.`,granted:`One prompt, once, when its answer was already obvious.`,denied:`This is what a cold prompt on first launch usually buys.`,deferred:`A primer refused is not a permission refused.`};function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Nori Kitchen</span><span class="sp-label">Order 4182</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">

          <div class="sp-context" style="flex: 0 0 auto; height: 42px">
            <div class="sp-row sp-row--between" style="height: 18px">
              <span class="sp-text sp-text--ink" style="font-size: 12px">Order placed, kitchen is cooking</span>
              <span class="sp-label" style="font-size: 11px">18:40</span>
            </div>
            <div class="sp-progress" style="margin-top: 8px"><div class="sp-progress-fill" style="--sp-value: 45%"></div></div>
          </div>

          <section
            class="sp-surface"
            data-part="primer"
            data-subject
            data-state="asking"
            style="display: flex; flex-direction: column; flex: 0 0 auto; height: 110px; padding: 10px 12px"
          >
            <div class="sp-row" style="gap: 8px; height: 18px">
              ${n(`bell`)}
              <span class="sp-heading" data-part="primer-title" style="font-size: 13px">${r.asking.title}</span>
            </div>
            <span class="sp-text" data-part="primer-body" style="height: 36px; margin-top: 4px; font-size: 12px">${r.asking.body}</span>
            <div class="sp-row" data-part="primer-actions" style="height: 32px; margin-top: auto; gap: 8px">
              <button class="sp-button sp-button--ghost sp-button--sm" data-part="not-now" type="button">Not now</button>
              <span class="sp-grow"></span>
              <button class="sp-button sp-button--sm" data-part="enable" type="button">Turn on updates</button>
            </div>
          </section>

          <div class="sp-row sp-context" style="flex: 0 0 auto; height: 26px; gap: 10px">
            <span class="sp-text sp-grow" data-stage-verdict data-part="note" style="font-size: 11px">${i.asking}</span>
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="replay" type="button" style="padding: 4px 10px; font-size: 12px">Replay</button>
          </div>

        </div>
        <div class="sp-scrim" data-part="scrim"></div>
        <div class="sp-dialog" data-part="os" role="dialog" aria-label="System permission prompt" style="width: 268px; padding: 14px 16px; text-align: center">
          <div class="sp-text sp-text--ink" style="margin-top: 6px; font-size: 13px">&ldquo;Nori Kitchen&rdquo; would like to send you notifications</div>
          <div class="sp-row" style="margin-top: 12px; gap: 8px">
            <button class="sp-button sp-button--ghost sp-button--sm sp-grow" data-part="os-deny" type="button">Don't allow</button>
            <button class="sp-button sp-button--sm sp-grow" data-part="os-allow" type="button">Allow</button>
          </div>
        </div>
      </div>
    </div>
  `;let o=e(a,`primer`),s=e(a,`primer-title`),c=e(a,`primer-body`),l=e(a,`primer-actions`),u=e(a,`note`),d=e(a,`scrim`),f=e(a,`os`),p=e=>{t(f,`data-open`,e),t(d,`data-open`,e)},m=e=>{o.dataset.state=e,s.textContent=r[e].title,c.textContent=r[e].body,l.style.visibility=r[e].actions?`visible`:`hidden`,u.textContent=i[e]};e(a,`enable`).addEventListener(`click`,()=>{o.dataset.state===`asking`&&p(!0)}),e(a,`not-now`).addEventListener(`click`,()=>{o.dataset.state===`asking`&&m(`deferred`)}),e(a,`os-allow`).addEventListener(`click`,()=>{p(!1),m(`granted`)}),e(a,`os-deny`).addEventListener(`click`,()=>{p(!1),m(`denied`)}),e(a,`replay`).addEventListener(`click`,()=>{p(!1),m(`asking`)})}export{a as mount};