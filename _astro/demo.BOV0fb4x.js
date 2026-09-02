import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var r={full:130,compact:52},i=r.full,a={full:`Breadcrumb, title, description, status, and the page's own actions.`,compact:`Condensed to title and primary action. Nothing below has moved.`},o=[`Merlin`,`Kittiwake`];function s(s){let c=o.map(e=>`
      <div class="sp-list-item" style="padding: 5px 10px">
        <span class="sp-grow">${e}</span>
        <span class="sp-label">berth 14</span>
      </div>`).join(``);s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Density</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-axis="Density" data-value="full">
            <button class="sp-segment" type="button" data-part="seg-full" value="full">full</button>
            <button class="sp-segment" type="button" data-part="seg-compact" value="compact">compact</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="padding: 0; background: var(--sp-surface); display: flex; flex-direction: column">
          <div style="flex: 0 0 auto; height: ${i}px">
            <header
              data-part="header"
              data-subject
              data-density="full"
              style="height: ${r.full}px; padding: 12px 16px; border-bottom: 1px solid var(--sp-line); background: var(--sp-surface); overflow: hidden; transition: height 0.24s var(--sp-ease)"
            >
              <div class="sp-row" data-part="crumbs" style="gap: 5px; height: 16px">
                <span class="sp-label">Fleet</span>
                <span class="sp-label">/</span>
                <span class="sp-label">Launches</span>
              </div>
              <div class="sp-row sp-row--between" data-part="title-row" style="margin-top: 4px; gap: 12px">
                <h1 class="sp-heading sp-grow" data-part="title" style="margin: 0; font-size: 18px; line-height: 1.5">Harbour launch Kestrel</h1>
                <div class="sp-row" data-part="actions" style="gap: 6px">
                  <button class="sp-button sp-button--sm" type="button" data-part="primary">Book survey</button>
                  <button class="sp-icon-button" type="button" data-part="overflow" aria-label="More actions">${n(`kebab`)}</button>
                </div>
              </div>
              <p class="sp-text" data-part="description" style="margin: 2px 0 0">Nine metre pilot launch, shared between the two harbour offices.</p>
              <div class="sp-row sp-row--wrap" data-part="meta" style="margin-top: 10px; gap: 6px">
                <span class="sp-chip" style="cursor: default">In service</span>
                <span class="sp-chip" style="cursor: default">Berth 12</span>
                <span class="sp-chip" style="cursor: default">Surveyed April</span>
              </div>
            </header>
          </div>
          <div class="sp-context sp-grow" data-part="content" style="padding: 10px 12px; background: var(--sp-sunken); min-height: 0">
            <div class="sp-list">${c}</div>
          </div>
        </div>
      </div>
      <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="max-width: 440px; text-align: center"></span>
    </div>
  `;let l=e(s,`header`),u=e(s,`crumbs`),d=e(s,`title-row`),f=e(s,`description`),p=e(s,`meta`),m=e(s,`title`),h=e(s,`readout`),g=e=>{let n=a[e];if(!n)return;let i=e===`compact`;l.dataset.density=e,l.style.height=`${i?r.compact:r.full}px`,m.style.fontSize=i?`15px`:`18px`,d.style.marginTop=i?`0`:`4px`;for(let e of[u,f,p])t(e,`hidden`,i);h.textContent=n};e(s,`switcher`).addEventListener(`change`,e=>g(e.detail)),g(`full`)}export{s as mount};