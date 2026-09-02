import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=`Every study of screen reading says the same thing.`,r=`People rarely read word by word. They scan, they pick, and they leave.`,i=`Field Notes on Reading, ch. 4`,a=`So the shape of a page matters as much as its words.`,o=126,s=`--sp-measure: 44ch`;function c(c){c.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="block" data-axis="Quotation" style="margin-left: auto">
            <button class="sp-segment" data-part="seg-inline" value="inline">inline</button>
            <button class="sp-segment" data-part="seg-block" value="block">a block</button>
          </sp-segmented>
        </div>
        <div style="height: ${o}px; margin-top: 12px">
          <div class="sp-prose" data-part="view-block" style="${s}">
            <p style="margin: 0">${n}</p>
            <blockquote data-part="quote" data-subject
                        style="margin: 10px 0; padding: 0 16px; border-left: 3px solid var(--sp-line)">
              ${r}
              <footer data-part="attribution" style="margin-top: 6px; font-size: 11px; color: var(--sp-muted)">
                ${i}
              </footer>
            </blockquote>
            <p style="margin: 0">${a}</p>
          </div>
          <div class="sp-prose" data-part="view-inline" style="${s}" hidden>
            <p style="margin: 0">
              ${n} <span data-part="inline-quote">&#8220;${r}&#8221;</span>
              (${i}) ${a}
            </p>
          </div>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 8px">
          A short quotation stays in the sentence. Once the marks are too far apart to hold the passage
          together, the shape takes over the job and the marks come off. The source travels with the block.
        </p>
      </div>
    </div>
  `;let l={block:e(c,`view-block`),inline:e(c,`view-inline`)};e(c,`segmented`).addEventListener(`change`,e=>{let n=e.detail;(n===`inline`||n===`block`)&&(t(l.block,`hidden`,n===`inline`),t(l.inline,`hidden`,n===`block`))})}export{c as mount};