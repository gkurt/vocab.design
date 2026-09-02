import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={light:{bg:`#F4F6FA`,surface:`#FFFFFF`,line:`#D8DEE9`,text:`#1B2130`,accent:`#3557E8`,accentInk:`#FFFFFF`},dark:{bg:`#14171C`,surface:`#22262E`,line:`#333944`,text:`#E7EAF0`,accent:`#7B93F5`,accentInk:`#10131C`},contrast:{bg:`#000000`,surface:`#000000`,line:`#FFFFFF`,text:`#FFFFFF`,accent:`#FFEA00`,accentInk:`#000000`},sepia:{bg:`#F3E7D0`,surface:`#FBF3E4`,line:`#DCC9A6`,text:`#3A2E1E`,accent:`#9A5B21`,accentInk:`#FFF6E8`}},n=[`bg`,`surface`,`line`,`text`,`accent`],r={light:`The default set: one value per name, and every part of the panel reads only the names.`,dark:`A different set behind the same names, so nothing in the panel is told the palette changed.`,contrast:`Contrast is a theme too, not a filter: these values were chosen, not computed from the light set.`,sepia:`A per tenant set proves the point. Anything that fills the same five names can be dropped in whole.`},i=`light`;function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Theme" data-part="segmented" data-value="${i}">
            <button class="sp-segment" data-part="seg-light" value="light">Light</button>
            <button class="sp-segment" data-part="seg-dark" value="dark">Dark</button>
            <button class="sp-segment" data-part="seg-contrast" value="contrast">Contrast</button>
            <button class="sp-segment" data-part="seg-sepia" value="sepia">Sepia</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 12px; align-items: flex-start">
          <div class="sp-stack sp-context" data-part="tokens" style="flex: 0 0 132px; gap: 7px">${n.map(e=>`
      <div class="sp-row sp-row--between" style="gap: 6px">
        <span class="sp-row" style="gap: 5px">
          <span class="sp-swatch" data-part="chip-${e}" style="width: 12px; height: 12px; box-shadow: inset 0 0 0 1px var(--sp-line)"></span>
          <span class="sp-label" style="font-size: 10px">${e}</span>
        </span>
        <span class="sp-text" data-part="value-${e}" style="font-size: 10px">&nbsp;</span>
      </div>`).join(``)}</div>

          <div data-part="panel" data-subject data-set="${i}" class="sp-grow"
               style="height: 138px; padding: 12px; border-radius: var(--sp-radius);
                      border: 1px solid var(--t-line); background: var(--t-bg); color: var(--t-text)">
            <div class="sp-row sp-row--between">
              <span style="font-size: 13px; font-weight: 600">Inbox</span>
              <span style="font-size: 11px; opacity: 0.72">3 new</span>
            </div>
            <div style="margin-top: 9px; padding: 9px 10px; border-radius: 6px;
                        border: 1px solid var(--t-line); background: var(--t-surface)">
              <span style="display: block; font-size: 12px; font-weight: 500">Weekly report</span>
              <span style="display: block; margin-top: 2px; font-size: 11px; opacity: 0.72">Sent to four people</span>
            </div>
            <div class="sp-row" style="margin-top: 10px">
              <span style="padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 500;
                           background: var(--t-accent); color: var(--t-accent-ink)">Reply</span>
            </div>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="note" style="margin: 10px 0 0; min-height: 39px">&nbsp;</p>
      </div>
    </div>
  `;let o=e(a,`panel`),s=e(a,`note`),c=i=>{let c=t[i];if(c){o.dataset.set=i,o.style.setProperty(`--t-accent-ink`,c.accentInk);for(let t of n)o.style.setProperty(`--t-${t}`,c[t]),e(a,`chip-${t}`).style.setProperty(`--sp-swatch`,c[t]),e(a,`value-${t}`).textContent=c[t];s.textContent=r[i]??``}};c(i),e(a,`segmented`).addEventListener(`change`,e=>c(e.detail))}export{a as mount};