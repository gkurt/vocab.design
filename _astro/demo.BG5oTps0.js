import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n={month:{heading:`Spending by category, March`,rows:[{label:`Groceries`,value:`412.60`,share:74},{label:`Transport`,value:`88.20`,share:16}]},quarter:{heading:`Spending by category, Q1`,rows:[{label:`Groceries`,value:`1,204.10`,share:68},{label:`Transport`,value:`319.45`,share:18}]}};function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 272px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Ledger assistant</span>
          <span class="sp-label" style="font-size: 11px">Beta</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">

          <div class="sp-row sp-context" style="gap: 8px">
            ${t(`search`)}
            <input class="sp-input" data-part="prompt" type="text" spellcheck="false" aria-label="Ask the ledger" placeholder="Ask about your spending" />
            <button class="sp-button sp-button--sm" data-part="ask" type="button" aria-disabled="true">Ask</button>
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="clear" type="button">Clear</button>
          </div>

          <div style="position: relative; flex: 1 1 auto; min-height: 0">
            <div class="sp-surface sp-context sp-empty" data-part="placeholder" style="position: absolute; inset: 0; gap: 6px">
              <span class="sp-text" style="font-size: 12px">Nothing asked yet.</span>
              <span class="sp-label" style="font-size: 10px">Try: spending by category</span>
            </div>

            <section
              class="sp-surface"
              data-part="result"
              data-subject
              data-range="month"
              style="position: absolute; inset: 0; display: flex; flex-direction: column; gap: 8px; padding: 10px 12px; visibility: hidden"
            >
              <div class="sp-row sp-row--between" style="gap: 8px">
                <span class="sp-heading" data-part="result-heading" style="font-size: 13px">${n.month.heading}</span>
                <sp-segmented class="sp-segmented" data-axis="Range" data-part="range" data-value="month">
                  <button class="sp-segment" data-part="range-month" value="month" style="padding: 3px 10px; font-size: 12px">March</button>
                  <button class="sp-segment" data-part="range-quarter" value="quarter" style="padding: 3px 10px; font-size: 12px">Q1</button>
                </sp-segmented>
              </div>
              <div class="sp-stack" data-part="stats" style="gap: 8px"></div>
              <span class="sp-label" data-part="recipe" style="margin-top: auto; font-size: 10px">
                Built from ledger components: heading, 2 stat rows, range picker.
              </span>
            </section>
          </div>

        </div>
      </div>
    </div>
  `;let i=e(r,`prompt`),a=e(r,`ask`),o=e(r,`placeholder`),s=e(r,`result`),c=e(r,`result-heading`),l=e(r,`stats`),u=e=>{let t=n[e];s.dataset.range=e,c.textContent=t.heading,l.innerHTML=t.rows.map((e,t)=>`
          <div data-part="stat-${t}">
            <div class="sp-row sp-row--between" style="height: 18px">
              <span class="sp-text sp-text--ink" style="font-size: 12px">${e.label}</span>
              <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 600; font-variant-numeric: tabular-nums">${e.value}</span>
            </div>
            <div class="sp-progress" style="margin-top: 4px"><div class="sp-progress-fill" style="--sp-value: ${e.share}%"></div></div>
          </div>`).join(``)},d=e=>{s.style.visibility=e?`visible`:`hidden`,o.style.visibility=e?`hidden`:`visible`};i.addEventListener(`input`,()=>{a.setAttribute(`aria-disabled`,String(i.value.trim().length===0))}),a.addEventListener(`click`,()=>{i.value.trim().length!==0&&(u(`month`),d(!0))}),e(r,`clear`).addEventListener(`click`,()=>{i.value=``,a.setAttribute(`aria-disabled`,`true`),d(!1)}),e(r,`range`).addEventListener(`change`,e=>{u(e.detail===`quarter`?`quarter`:`month`)}),u(`month`),d(!1)}export{r as mount};