import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={normal:{readout:`Hairline dividers, secondary text set back, a tinted badge.`,tokens:{"--sp-line":``,"--sp-muted":``,"--sp-accent-soft":``}},more:{readout:`Borders and secondary text at full ink; the tint gets an edge.`,tokens:{"--sp-line":`var(--sp-ink)`,"--sp-muted":`var(--sp-ink)`,"--sp-accent-soft":`transparent`}}};function n(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 424px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-grow"></span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Simulated setting" data-value="normal">
            <button class="sp-segment" data-part="seg-normal" value="normal">No preference</button>
            <button class="sp-segment" data-part="seg-more" value="more">More contrast</button>
          </sp-segmented>
        </div>
        <div class="sp-surface" data-part="card" data-subject data-contrast="normal" style="margin-top: 12px; padding: 12px 14px">
          <div class="sp-row sp-row--between">
            <span class="sp-heading" style="font-size: 14px">Billing</span>
            <span class="sp-chip" data-part="badge" style="cursor: default; background: var(--sp-accent-soft); border-color: var(--sp-accent-soft)">Trial</span>
          </div>
          <p class="sp-text" style="margin: 6px 0 0">Your plan renews on 3 September. Invoices go to the workspace owner.</p>
          <div class="sp-divider" style="margin: 10px 0"></div>
          <div class="sp-row">
            <span class="sp-label sp-grow">Card ending 4417</span>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="change">Change</button>
          </div>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="readout" style="margin-top: 10px; font-size: 12px">
          ${t.normal.readout}
        </p>
      </div>
    </div>
  `;let r=e(n,`card`),i=e(n,`badge`),a=e(n,`readout`),o=e=>{r.dataset.contrast=e;for(let[n,i]of Object.entries(t[e].tokens))i?r.style.setProperty(n,i):r.style.removeProperty(n);i.style.borderColor=e===`more`?`var(--sp-ink)`:`var(--sp-accent-soft)`,a.textContent=t[e].readout};e(n,`segmented`).addEventListener(`change`,e=>{o(e.detail===`more`?`more`:`normal`)})}export{n as mount};