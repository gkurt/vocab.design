import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var r={sm:{width:258,areas:`'main'`,columns:`1fr`,detail:!1,related:!1},md:{width:348,areas:`'main detail'`,columns:`1fr 104px`,detail:!0,related:!1},lg:{width:438,areas:`'main detail related'`,columns:`1fr 104px 92px`,detail:!0,related:!0}},i=340,a=420;function o(o){let s=(e,t)=>`
    <div
      class="sp-row"
      data-part="rule-${e}"
      style="gap: 8px; padding: 2px 6px; border-radius: 5px; transition: background-color 0.2s ease"
    >
      <span data-part="rule-${e}-mark" style="display: flex; flex: 0 0 auto; color: var(--sp-accent)">${n(`check`)}</span>
      <span class="sp-text" data-part="rule-${e}-code" style="font-size: 12px; white-space: nowrap">${t}</span>
    </div>`;o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 470px; height: 302px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Viewport</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-value="sm" data-axis="Width">
            <button class="sp-segment" type="button" data-part="seg-sm" value="sm">258px</button>
            <button class="sp-segment" type="button" data-part="seg-md" value="md">348px</button>
            <button class="sp-segment" type="button" data-part="seg-lg" value="lg">438px</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; padding: 12px">
          <div
            class="sp-context"
            data-part="viewport"
            data-width="sm"
            style="width: ${r.sm?.width}px; height: 114px; padding: 8px; background: var(--sp-bg); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            <div
              class="sp-grid"
              data-part="page"
              style="height: 100%; gap: 6px; padding: 8px; grid-template-areas: ${r.sm?.areas}; grid-template-columns: ${r.sm?.columns}; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
            >
              <div data-part="main" style="grid-area: main; min-width: 0">
                <span class="sp-heading" style="font-size: 13px">Kestrel</span>
                <div class="sp-stack" style="margin-top: 6px; gap: 6px">
                  <div class="sp-line" style="width: 94%"></div>
                  <div class="sp-line" style="width: 86%"></div>
                  <div class="sp-line" style="width: 68%"></div>
                </div>
              </div>
              <div data-part="detail" hidden style="grid-area: detail; min-width: 0; border-left: 1px solid var(--sp-line); padding-left: 8px">
                <span class="sp-label">Details</span>
                <div class="sp-stack" style="margin-top: 6px; gap: 6px">
                  <div class="sp-line" style="width: 88%"></div>
                  <div class="sp-line" style="width: 64%"></div>
                </div>
              </div>
              <div data-part="related" hidden style="grid-area: related; min-width: 0; border-left: 1px solid var(--sp-line); padding-left: 8px">
                <span class="sp-label">Related</span>
                <div class="sp-stack" style="margin-top: 6px; gap: 6px">
                  <div class="sp-line" style="width: 82%"></div>
                  <div class="sp-line" style="width: 58%"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="sp-stack" data-part="rules" data-subject style="width: 100%; gap: 3px; margin-top: 10px">
            <span class="sp-label sp-context">styles.css</span>
            ${s(`base`,`.page { grid-template-areas: "main" }`)}
            ${s(`md`,`@media (min-width: ${i}px) { + details }`)}
            ${s(`lg`,`@media (min-width: ${a}px) { + related }`)}
          </div>
        </div>
      </div>
    </div>
  `;let c=e(o,`viewport`),l=e(o,`page`),u=e(o,`detail`),d=e(o,`related`),f=(n,r)=>{let i=e(o,`rule-${n}`);t(i,`data-applied`,r),i.style.background=r?`var(--sp-accent-soft)`:`transparent`,e(o,`rule-${n}-mark`).style.opacity=r?`1`:`0.18`,e(o,`rule-${n}-code`).className=r?`sp-text sp-text--ink`:`sp-text`},p=e=>{let t=r[e];t&&(c.style.width=`${t.width}px`,c.dataset.width=e,l.style.gridTemplateAreas=t.areas,l.style.gridTemplateColumns=t.columns,u.hidden=!t.detail,d.hidden=!t.related,f(`base`,!0),f(`md`,t.width>=i),f(`lg`,t.width>=a))};e(o,`switcher`).addEventListener(`change`,e=>p(e.detail)),p(`sm`)}export{o as mount};