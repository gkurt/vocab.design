import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var r={first:`Shown once: the welcome line, the two sample boards, the coach mark. None of it is ever shown to this person again.`,later:`The second open, and every open after. The same screen, the same controls, none of the scaffolding.`},i=(e,t,r)=>`
  <div class="sp-surface sp-row" style="gap: 8px; height: 34px; padding: 0 10px; background: var(--sp-surface)">
    ${n(`inbox`)}
    <span class="sp-grow" style="font-size: 12px">${e}</span>
    ${r?`<span class="sp-chip" style="flex: 0 0 auto; padding: 2px 8px; font-size: 11px; white-space: nowrap; cursor: default">${t}</span>`:`<span class="sp-label" style="flex: 0 0 auto; font-size: 11px; white-space: nowrap">${t}</span>`}
  </div>`;function a(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Kelp</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Visit" data-part="run" data-value="first" style="flex: 0 0 auto">
            <button class="sp-segment" data-part="run-first" type="button" value="first" style="padding: 4px 9px; font-size: 12px">First open</button>
            <button class="sp-segment" data-part="run-later" type="button" value="later" style="padding: 4px 9px; font-size: 12px">Every open after</button>
          </sp-segmented>
          <button class="sp-button sp-button--sm" data-part="new-board" type="button" style="flex: 0 0 auto">New board</button>
        </div>
        <div class="sp-body" style="position: relative">
          <div data-part="screen" style="position: relative; height: 100%">

            <div
              data-part="scaffold"
              data-subject
              data-run="first"
              style="position: absolute; inset: 0; display: flex; flex-direction: column; gap: 8px"
            >
              <div style="height: 44px; width: 250px">
                <div class="sp-heading" style="font-size: 13px">Welcome to Kelp</div>
                <div class="sp-text" style="margin-top: 2px; font-size: 11px">We started you off with two sample boards.</div>
              </div>
              ${i(`Trip planning`,`Sample`,!0)}
              ${i(`Reading list`,`Sample`,!0)}
              <div
                class="sp-popover"
                data-part="coach"
                data-open
                style="top: 2px; right: 0; left: auto; width: 180px; padding: 9px 11px; --sp-arrow-x: 148px"
              >
                <span class="sp-text sp-text--ink" style="font-size: 11px">Start your own from up here.</span>
              </div>
            </div>

            <div data-part="own" hidden style="position: absolute; inset: 0; display: flex; flex-direction: column; gap: 8px">
              <div style="height: 44px; width: 250px">
                <div class="sp-heading" style="font-size: 13px">Your boards</div>
                <div class="sp-text" style="margin-top: 2px; font-size: 11px">Three boards, all of them yours.</div>
              </div>
              ${i(`Kitchen rebuild`,`2 days ago`,!1)}
              ${i(`Cycling routes`,`Last week`,!1)}
              ${i(`Wedding music`,`Last week`,!1)}
            </div>

          </div>
        </div>
      </div>
      <span class="sp-text sp-context" data-stage-verdict data-part="note" style="width: 452px; height: 32px; font-size: 11px; line-height: 1.35">${r.first}</span>
    </div>
  `;let a=e(n,`scaffold`),o=e(n,`own`),s=e(n,`note`);e(n,`run`).addEventListener(`change`,e=>{let n=e.detail===`later`?`later`:`first`;a.dataset.run=n,t(a,`hidden`,n!==`first`),t(o,`hidden`,n!==`later`),s.textContent=r[n]})}export{a as mount};