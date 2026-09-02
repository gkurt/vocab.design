import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`#2F57D8`,n=`#FFFFFF`,r=`#1A4BC4`,i={kept:`Both render, and nothing on screen says which fill is load-bearing.`,dropped:`The fill on the cell is still there. The fill in the stylesheet went with it.`};function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 13px 18px">
        <div class="sp-row sp-row--between sp-context">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="kept" data-axis="Embedded stylesheet" style="margin-left: auto">
            <button class="sp-segment" data-part="seg-kept" value="kept">Kept</button>
            <button class="sp-segment" data-part="seg-dropped" value="dropped">Stripped</button>
          </sp-segmented>
        </div>

        <div class="sp-context" style="margin-top: 11px; padding: 10px 12px; background: var(--sp-sunken); border-radius: var(--sp-radius)">
          <span class="sp-label" style="color: var(--sp-ink); font-weight: 600; font-size: 12px">Your order is on its way</span>
          <div class="sp-stack" style="gap: 5px; margin-top: 7px">
            <div class="sp-line" style="width: 100%; height: 6px"></div>
            <div class="sp-line" style="width: 64%; height: 6px"></div>
          </div>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 11px; align-items: flex-start">
          <div class="sp-stack" style="flex: 1 1 0; min-width: 0; gap: 5px">
            <div data-part="proof-slot" style="display: flex; align-items: center; justify-content: center; height: 56px">
              <table
                data-part="proof"
                data-subject
                data-mode="kept"
                role="presentation"
                cellpadding="11"
                cellspacing="0"
                border="0"
                style="border-collapse: collapse"
              >
                <tbody><tr>
                  <td data-part="proof-cell" bgcolor="${t}" align="center" width="168" style="border-radius: 6px">
                    <a data-part="proof-link" href="#"
                       style="display: block; color: ${n}; font-size: 13px; font-weight: 600; text-decoration: none">Track your order</a>
                  </td>
                </tr></tbody>
              </table>
            </div>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 0; min-width: 0; gap: 5px">
            <div data-part="naive-slot" style="display: flex; align-items: center; justify-content: center; height: 56px">
              <a data-part="naive-link" data-styled="yes" href="#" style="font-size: 13px; font-weight: 600">Track your order</a>
            </div>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="note" style="margin: 9px 0 0; height: 32px; font-size: 12px; line-height: 1.35">${i.kept}</p>
      </div>
    </div>
  `;let o=e(a,`proof`),s=e(a,`naive-link`),c=e(a,`note`),l=e=>{let a=e!==`dropped`;o.dataset.mode=a?`kept`:`dropped`,s.dataset.styled=a?`yes`:`no`,s.style.display=a?`inline-block`:`inline`,s.style.padding=a?`11px 22px`:`0`,s.style.background=a?t:`transparent`,s.style.borderRadius=a?`6px`:`0`,s.style.color=a?n:r,s.style.textDecoration=a?`none`:`underline`,c.textContent=i[a?`kept`:`dropped`]??``};l(`kept`),e(a,`segmented`).addEventListener(`change`,e=>l(e.detail))}export{a as mount};