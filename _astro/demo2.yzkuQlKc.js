import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=[`The harbour road turns inland after`,`the last of the boat sheds, and from`,`there it climbs for a mile`,`through gorse before the water comes`,`back into view, wider now and`,`the colour of slate.`],n=t.join(` `),r=210,i=20,a={auto:`Breaks left to the browser.`,tuned:`The same words, broken by hand.`};function o(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 250px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-grow"></span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Line breaks" data-value="auto">
            <button class="sp-segment" data-part="seg-auto" value="auto">auto</button>
            <button class="sp-segment" data-part="seg-tuned" value="tuned">tuned</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="align-items: flex-start">
          <div style="flex: 0 0 ${r}px; height: 140px">
            <p data-part="column" data-subject data-breaks="auto"
               style="margin: 0; font-size: 13px; line-height: ${i}px; text-align: left">
              <span data-part="tint" style="background: var(--sp-accent-soft)">${n}</span>
            </p>
          </div>
        </div>
        <span class="sp-text" data-stage-verdict data-part="readout"></span>
      </div>
    </div>
  `;let s=e(o,`column`),c=e(o,`tint`),l=e(o,`readout`),u=e=>{let r=a[e];r&&(s.dataset.breaks=e,c.innerHTML=e===`tuned`?t.join(`<br>`):n,l.textContent=r)};u(`auto`),e(o,`segmented`).addEventListener(`change`,e=>u(e.detail))}export{o as mount};