import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=[`Canvas`,`CanvasText`,`LinkText`,`ButtonFace`,`ButtonText`,`ButtonBorder`,`Highlight`,`AccentColor`],n=[{key:`text`,label:`Text`},{key:`button`,label:`Button`},{key:`selection`,label:`Selection`}],r=`text`,i={text:`Canvas behind, CanvasText on it, LinkText for the link. The page names three keywords and picks none of the values.`,button:`ButtonFace with ButtonText on it, and ButtonBorder for the edge, so the control keeps a boundary in any theme.`,selection:`Highlight travels with HighlightText, which is why a selected row stays legible without the page knowing either colour.`};function a(a){let o=t.map(e=>`
      <div class="sp-stack" style="gap: 4px">
        <span class="sp-swatch" data-part="sw-${e.toLowerCase()}" style="height: 26px; border-radius: 5px;
              box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.45); --sp-swatch: ${e}"></span>
        <span class="sp-text" style="font-size: 10px; line-height: 1.2">${e}</span>
      </div>`).join(``),s=(e,t)=>`
    <div data-part="view-${e}" ${e===r?``:`hidden`}
         style="position: absolute; inset: 0; display: flex; align-items: center; gap: 10px; padding: 0 12px;
                border-radius: var(--sp-radius); background: Canvas; border: 1px solid ButtonBorder">${t}</div>`;a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 436px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Pair" data-value="${r}">
            ${n.map(e=>`<button class="sp-segment" data-part="seg-${e.key}" value="${e.key}">${e.label}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-grid" data-part="keywords" data-subject
             style="grid-template-columns: repeat(4, 1fr); gap: 8px; margin-top: 13px">${o}</div>

        <div class="sp-context" data-part="preview" data-pair="${r}"
             style="position: relative; height: 58px; margin-top: 13px">
          ${s(`text`,`<span style="font-size: 12px; color: CanvasText">Your session expires in ten minutes.</span>
             <span style="font-size: 12px; color: LinkText; text-decoration: underline">Extend</span>`)}
          ${s(`button`,`<span style="padding: 5px 12px; border-radius: 6px; font-size: 12px;
                   background: ButtonFace; color: ButtonText; border: 1px solid ButtonBorder">Extend session</span>
             <span style="font-size: 12px; color: CanvasText">or sign out</span>`)}
          ${s(`selection`,`<span style="flex: 1 1 0; padding: 5px 9px; border-radius: 5px; font-size: 12px;
                   background: Highlight; color: HighlightText">Invoice 4021</span>
             <span style="flex: 1 1 0; padding: 5px 9px; font-size: 12px; color: CanvasText">Invoice 4022</span>`)}
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="note"
           style="margin: 10px 0 0; height: 30px; font-size: 11px; line-height: 1.4">${i[r]}</p>
      </div>
    </div>
  `;let c=e(a,`preview`),l=e(a,`note`),u=t=>{if(n.some(e=>e.key===t)){c.dataset.pair=t;for(let r of n)e(a,`view-${r.key}`).hidden=r.key!==t;l.textContent=i[t]??``}};u(r),e(a,`segmented`).addEventListener(`change`,e=>u(e.detail))}export{a as mount};