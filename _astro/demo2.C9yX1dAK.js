import{n as e,r as t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=[`Bringhurst, Robert. The Elements of Typographic Style. Hartley &amp; Marks, 1992.`,`Tschichold, Jan. The New Typography. University of California Press, 1995.`,`Tufte, Edward. The Visual Display of Quantitative Information. Graphics Press, 1983.`],r=268,i=17,a=26,o=142,s={hanging:{pad:a,indent:-26,css:[`padding-inline-start: ${a}px`,`text-indent: -${a}px`]},first:{pad:0,indent:a,css:[`text-indent: ${a}px`]},none:{pad:0,indent:0,css:[`text-indent: 0`]}};function c(c){c.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Three references</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="hanging" data-axis="Indent" data-term="hanging">
            <button class="sp-segment" data-part="seg-hanging" value="hanging">hanging</button>
            <button class="sp-segment" data-part="seg-first" value="first">first line</button>
            <button class="sp-segment" data-part="seg-none" value="none">none</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 16px; margin-top: 12px; align-items: flex-start">
          <div style="position: relative; width: ${r}px; height: ${o}px">
            <span data-part="guide" style="position: absolute; left: ${a}px; top: -4px; height: 130px; width: 2px;
                  background: color-mix(in oklab, var(--sp-accent) 45%, transparent)"></span>
            <ul class="sp-stack" data-part="list" style="gap: 10px; margin: 0; padding: 0; list-style: none">
              ${n.map((e,t)=>`
                  <li data-part="entry" data-indent="hanging"${t===0?` data-subject data-pose="[data-indent=hanging]"`:``}
                      style="font-size: 12px; line-height: ${i}px; padding-inline-start: ${a}px;
                             text-indent: -${a}px">${e}</li>`).join(``)}
            </ul>
          </div>
          <div class="sp-stack sp-context" style="gap: 6px; width: 128px">
            <!-- Room for both declarations from mount, so a shape that needs only one
                 cannot pull the caption upwards (SPEC §5). -->
            <span class="sp-label">the declaration</span>
            <span class="sp-label" data-part="css" style="color: var(--sp-ink); height: 64px; display: block"></span>
          </div>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 10px">
          The rule marks the indent. Hanging leaves the surname out to its left, which is the whole
          point: the column you scan down has nothing in front of it.
        </p>
      </div>
    </div>
  `;let l=e(c,`css`),u=e=>{let n=s[e];if(n){for(let r of t(c,`entry`))r.dataset.indent=e,r.style.paddingInlineStart=`${n.pad}px`,r.style.textIndent=`${n.indent}px`;l.innerHTML=n.css.map(e=>`<span style="display: block">${e}</span>`).join(``)}};u(`hanging`),e(c,`segmented`).addEventListener(`change`,e=>u(e.detail))}export{c as mount};