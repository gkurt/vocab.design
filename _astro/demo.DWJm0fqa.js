import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={steered:`
    <button class="sp-button" data-part="decline" type="button" style="${[`border: 0`,`background: transparent`,`font: inherit`,`font-size: 11px`,`color: var(--sp-muted)`,`opacity: 0.6`,`padding: 0`,`cursor: pointer`,`text-decoration: underline`].join(`; `)}">Reject all</button>
    <span style="flex: 1 1 auto"></span>
    <button
      class="sp-button"
      data-part="accept"
      type="button"
      style="padding: 11px 24px; font-size: 15px; box-shadow: 0 0 0 4px var(--sp-accent-soft), 0 6px 14px rgb(53 87 232 / 0.35)"
    >Accept all</button>`,fair:`
    <button class="sp-button sp-button--ghost" data-part="decline" type="button" style="padding: 8px 16px; font-size: 13px">Reject all</button>
    <button class="sp-button" data-part="accept" type="button" style="padding: 8px 16px; font-size: 13px">Accept all</button>
    <span style="flex: 1 1 auto"></span>`},n={steered:`Same two words, same two clicks. Only the drawing decides which one gets found.`,fair:`Equal consequences, equal weight: same size, same contrast, same place in the path.`};function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 200px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Grinder Coffee</span><span class="sp-label">Journal</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">

          <div class="sp-stack sp-context" style="gap: 8px">
            <div class="sp-line" style="width: 82%"></div>
            <div class="sp-line" style="width: 64%"></div>
          </div>

          <section
            class="sp-surface"
            data-part="choice"
            data-subject
            data-pose="[data-mode=steered]"
            data-mode="steered"
            style="display: flex; flex-direction: column; height: 104px; padding: 10px 12px"
          >
            <span class="sp-heading" style="font-size: 14px">We use cookies</span>
            <span class="sp-text" style="margin-top: 2px; font-size: 12px">Analytics and advertising partners.</span>
            <div class="sp-row" data-part="actions" style="height: 44px; margin-top: auto; gap: 12px">${t.steered}</div>
          </section>

        </div>
      </div>
              <span class="sp-text" data-stage-verdict data-part="verdict" style="width: 296px; font-size: 11px">${n.steered}</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="steered" data-axis="Misdirection" data-term="steered">
          <button class="sp-segment" data-part="mode-steered" value="steered">With</button>
          <button class="sp-segment" data-part="mode-fair" value="fair">Without</button>
        </sp-segmented>
      
    </div>
  `;let i=e(r,`choice`),a=e(r,`actions`),o=e(r,`verdict`),s=e=>{i.dataset.mode=e,a.innerHTML=t[e],o.textContent=n[e]};e(r,`mode`).addEventListener(`change`,e=>{s(e.detail===`fair`?`fair`:`steered`)}),s(`steered`)}export{r as mount};