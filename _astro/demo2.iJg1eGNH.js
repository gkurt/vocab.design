import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=[{key:`card`,label:`Card number`,groups:[`4539`,`1488`,`0343`,`6467`],shape:`4 + 4 + 4 + 4`},{key:`phone`,label:`Phone`,groups:[`07700`,`900`,`123`],shape:`5 + 3 + 3`},{key:`code`,label:`One time code`,groups:[`482`,`913`],shape:`3 + 3`}],n={chunked:`Four groups to hold, then three, then two. Each one is short enough to carry to the keyboard in a single glance.`,run:`The same characters with the groups closed up. Nothing was removed, and every value became one long thing to hold.`};function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 448px; padding: 14px 16px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Grouping" data-term="chunked" data-part="segmented" data-value="chunked">
            <button class="sp-segment" data-part="seg-chunked" value="chunked">Chunked</button>
            <button class="sp-segment" data-part="seg-run" value="run">One run</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="values" data-subject data-pose="[data-mode=chunked]" data-mode="chunked"
             style="margin-top: 12px; padding: 10px 12px; display: flex; flex-direction: column; gap: 6px">
          ${t.map(e=>`
    <div class="sp-row" data-part="row-${e.key}" style="gap: 10px; height: 30px">
      <span class="sp-label" style="flex: 0 0 96px">${e.label}</span>
      <span data-part="value-${e.key}" style="flex: 0 0 190px; display: flex; gap: 9px; font-size: 15px;
            font-variant-numeric: tabular-nums; letter-spacing: 0.02em; transition: gap 0.24s var(--sp-ease)">
        ${e.groups.map(e=>`<span>${e}</span>`).join(``)}
      </span>
      <span class="sp-text" data-part="pieces-${e.key}" data-count="${e.groups.length}"
            style="flex: 1 1 auto; text-align: right; font-size: 11px; white-space: nowrap">${e.groups.length} groups</span>
    </div>`).join(``)}
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 12px; height: 18px">
          <span class="sp-label">Read back as</span>
          <span class="sp-text sp-text--ink" data-part="shape" data-mode="chunked"
                style="font-size: 12px; white-space: nowrap">${t[0]?.shape??``}</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-case="chunked"
           style="margin: 6px 0 0; height: 30px; font-size: 11px">${n.chunked}</p>
      </div>
    </div>
  `;let i=e(r,`values`),a=e(r,`shape`),o=e(r,`caption`),s=s=>{i.dataset.mode=s?`chunked`:`run`;for(let n of t){e(r,`value-${n.key}`).style.gap=s?`9px`:`0px`;let t=e(r,`pieces-${n.key}`),i=n.groups.join(``).length;t.dataset.count=String(s?n.groups.length:i),t.textContent=s?`${n.groups.length} groups`:`${i} characters`}a.dataset.mode=s?`chunked`:`run`,a.textContent=s?t[0]?.shape??``:`one unbroken run`,o.dataset.case=s?`chunked`:`run`,o.textContent=s?n.chunked:n.run};e(r,`segmented`).addEventListener(`change`,e=>{s(e.detail!==`run`)})}export{r as mount};