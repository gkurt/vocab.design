import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={layout:{presentation:`Name Ada Lovelace. Team Analytical Engines. Access Full.`,semantic:`table, 3 rows, 2 columns, row 1, column 1: Name…`},data:{presentation:`Q2 96. Q3 118.`,semantic:`table, 3 rows, 2 columns. Quarter: Q3. Units: 118.`}},n={presentation:`Right on the left: those rows were only ever placement. Wrong on the right: the headers were the meaning.`,semantic:`Without the role the layout table reads out coordinates for every scrap of text, and the sales table gets its headers back.`};function r(r){let i=(e,t)=>`
    <tr>
      <td class="sp-label" style="padding: 5px 10px 5px 0; width: 78px; vertical-align: top">${e}</td>
      <td class="sp-text sp-text--ink" style="padding: 5px 0; font-size: 12px">${t}</td>
    </tr>`;r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 16px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-grow"></span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="presentation" data-axis="Set to" data-term="presentation">
            <button class="sp-segment" data-part="seg-presentation" value="presentation"
                    style="font-size: 12px; padding: 5px 10px">role=presentation</button>
            <button class="sp-segment" data-part="seg-semantic" value="semantic"
                    style="font-size: 12px; padding: 5px 10px">no role</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 10px; align-items: flex-start">
          <div class="sp-stack" style="gap: 4px; width: 236px">
            <span class="sp-label sp-context">Profile</span>
            <table data-part="layout" data-subject data-pose="[role=presentation]" role="presentation"
                   style="width: 100%; border-collapse: collapse">
              ${i(`Name`,`Ada Lovelace`)}${i(`Team`,`Analytical Engines`)}${i(`Access`,`Full`)}
            </table>
          </div>
          <div class="sp-stack sp-context" style="gap: 4px; width: 172px">
            <span class="sp-label">Sales</span>
            <table class="sp-table" data-part="sales" role="presentation" style="--sp-cell-pad: 4px 8px; font-size: 11px">
              <thead>
                <tr><th>Quarter</th><th>Units</th></tr>
              </thead>
              <tbody>
                <tr><td>Q2</td><td>96</td></tr>
                <tr><td>Q3</td><td>118</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div data-stage-announce data-part="says">
          <span data-part="say-layout" data-state="presentation" style="display: block">${t.layout.presentation}</span>
          <span data-part="say-sales" data-state="presentation" style="display: block">${t.data.presentation}</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-case="presentation"
           style="margin: 8px 0 0; height: 30px; font-size: 11px">${n.presentation}</p>
      </div>
    </div>
  `;let a=e(r,`layout`),o=e(r,`sales`),s=e(r,`say-layout`),c=e(r,`say-sales`),l=e(r,`caption`),u=(e,t,n)=>{let r=e.getAttribute(`role`)===`presentation`;t.dataset.state=r?`presentation`:`semantic`,t.textContent=r?n.presentation:n.semantic},d=e=>{for(let t of[a,o])e===`presentation`?t.setAttribute(`role`,`presentation`):t.removeAttribute(`role`);u(a,s,t.layout),u(o,c,t.data),l.dataset.case=e,l.textContent=n[e]};d(`presentation`),e(r,`segmented`).addEventListener(`change`,e=>d(e.detail))}export{r as mount};