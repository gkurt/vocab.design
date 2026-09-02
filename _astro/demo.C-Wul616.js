import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=396,n=`2px solid var(--sp-accent)`,r=`2px dashed var(--sp-accent)`,i=`2px dashed var(--sp-muted)`,a=(e,t=`6px`)=>`<div class="sp-line" style="width: ${e}; height: ${t}"></div>`;function o(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 440px; padding: 12px 18px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Scaffolding" data-part="segmented" data-value="off">
            <button class="sp-segment" data-part="seg-off" value="off">Hidden</button>
            <button class="sp-segment" data-part="seg-on" value="on">Drawn</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="justify-content: center; margin-top: 10px">
          <table
            data-part="layout"
            data-subject
            data-scaffold="off"
            role="presentation"
            width="${t}"
            cellpadding="8"
            cellspacing="0"
            border="0"
            style="width: ${t}px; border-collapse: collapse; background: var(--sp-surface)"
          >
            <tbody>
              <tr>
                <td data-part="cell-head" style="border-bottom: 1px solid var(--sp-line)">
                  <span class="sp-label" style="color: var(--sp-ink); font-weight: 600; font-size: 12px">Northwind weekly</span>
                </td>
              </tr>
              <tr>
                <td data-part="cell-hero" align="center">
                  <div class="sp-stack" style="gap: 6px; align-items: center">
                    ${a(`72%`)}
                    ${a(`48%`)}
                    <table data-part="button" role="presentation" cellpadding="7" cellspacing="0" border="0"
                           style="margin-top: 4px; border-collapse: collapse">
                      <tbody><tr>
                        <td data-part="cell-button" bgcolor="#2F57D8" align="center" width="132" style="border-radius: 6px">
                          <span style="color: #FFFFFF; font-size: 12px; font-weight: 600">Read the issue</span>
                        </td>
                      </tr></tbody>
                    </table>
                  </div>
                </td>
              </tr>
              <tr>
                <td data-part="cell-columns" style="border-top: 1px solid var(--sp-line)">
                  <table data-part="inner" role="presentation" width="100%" cellpadding="6" cellspacing="0" border="0"
                         style="width: 100%; border-collapse: collapse">
                    <tbody><tr>
                      <td data-part="cell-left" width="50%" valign="top">
                        <div class="sp-stack" style="gap: 5px">${a(`100%`)}${a(`84%`)}${a(`62%`)}</div>
                      </td>
                      <td data-part="cell-right" width="50%" valign="top">
                        <div class="sp-stack" style="gap: 5px">${a(`100%`)}${a(`76%`)}${a(`54%`)}</div>
                      </td>
                    </tr></tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td data-part="cell-foot" align="center" style="border-top: 1px solid var(--sp-line)">
                  <span class="sp-label" style="font-size: 10px">Northwind, 12 Quay Street</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

                  <span class="sp-text" data-stage-verdict data-part="legend" style="font-size: 11px"></span>
        
      </div>
    </div>
  `;let s=e(o,`layout`),c=e(o,`legend`),l=[...s.querySelectorAll(`table`)],u=[...s.querySelectorAll(`td`)],d=u.filter(e=>e.closest(`table`)===s),f=[s,...l].filter(e=>e.getAttribute(`role`)===`presentation`).length,p=e=>{let t=e===`on`;s.dataset.scaffold=t?`on`:`off`,s.style.outline=t?n:`none`;for(let e of l)e.style.outline=t?i:`none`,e.style.outlineOffset=`-1px`;for(let e of u)e.style.outline=t?d.includes(e)?r:i:`none`,e.style.outlineOffset=`-4px`;c.textContent=t?`${l.length+1} tables, ${u.length} cells, role="presentation" on all ${f} of them.`:`A mail body: one header, a hero, two columns and a footer.`};p(`off`),e(o,`segmented`).addEventListener(`change`,e=>p(e.detail))}export{o as mount};