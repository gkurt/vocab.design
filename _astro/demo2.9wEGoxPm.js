import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`Georgia, 'Liberation Serif', 'Nimbus Roman', serif`,n=[{part:`eyebrow`,chip:`label`,height:24,html:`FIELD NOTES`,leveled:`font-size: 11px; font-weight: 600; letter-spacing: 0.14em; color: var(--sp-muted)`},{part:`title`,chip:`headline`,height:32,html:`The estuary in winter`,leveled:`font-size: 25px; font-weight: 600; line-height: 1.15; white-space: nowrap`},{part:`body`,chip:`body`,height:66,html:`The ferry crosses twice an hour in summer and waits for the tide in winter. The boatyard has kept the same hours since 1974.`,leveled:`font-size: 13px; font-weight: 400; line-height: 1.5`},{part:`caption`,chip:`caption`,height:24,html:`Photograph: house archive, 1974`,leveled:`font-size: 11px; font-weight: 400; color: var(--sp-muted)`}],r=`font-size: 14px; font-weight: 400; line-height: 1.45; letter-spacing: normal; color: var(--sp-ink)`;function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 20px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="on" data-axis="Rank" data-term="on">
            <button class="sp-segment" data-part="seg-levels" value="on">levelled</button>
            <button class="sp-segment" data-part="seg-flat" value="off">flattened</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 16px; margin-top: 12px; align-items: flex-start">
          <div class="sp-stack sp-context" data-part="chips" style="gap: 6px; width: 84px">${n.map(e=>`
      <div style="height: ${e.height}px; display: flex; align-items: center">
        <span class="sp-chip" data-part="chip-${e.part}" style="cursor: default">${e.chip}</span>
      </div>`).join(``)}</div>
          <div class="sp-stack" data-part="column" data-subject data-levels="on" data-pose="[data-levels=on]"
               style="gap: 6px; width: 296px; font-family: ${t}">${n.map(e=>`
      <div style="height: ${e.height}px; display: flex; align-items: center; overflow: hidden">
        <span data-part="text-${e.part}" style="margin: 0; ${e.leveled}">${e.html}</span>
      </div>`).join(``)}</div>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 10px">
          Flattened, every line is still legible and the page is still correct. What is gone is the
          answer to what is this, which a reader was getting for free before they read anything.
        </p>
      </div>
    </div>
  `;let a=e(i,`column`),o=t=>{let o=t===`on`;a.dataset.levels=o?`on`:`off`;for(let t of n)e(i,`text-${t.part}`).setAttribute(`style`,`margin: 0; ${o?t.leveled:r}`)};o(`on`),e(i,`segmented`).addEventListener(`change`,e=>o(e.detail))}export{i as mount};