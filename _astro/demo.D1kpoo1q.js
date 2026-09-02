import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=400,r=26,i=18,a=152,o={indent:{indent:!0,space:!1,css:`p + p { text-indent: 2em }`,note:`marked once`},space:{indent:!1,space:!0,css:`p + p { margin-block-start: 0.8em }`,note:`marked once, the other way`},both:{indent:!0,space:!0,css:`text-indent and margin-block-start`,note:`marked twice: redundant`}};function s(s){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Marked with" data-term="indent" data-value="indent" style="margin-left: auto">
            <button class="sp-segment" data-part="seg-indent" value="indent">indent</button>
            <button class="sp-segment" data-part="seg-space" value="space">space</button>
            <button class="sp-segment" data-part="seg-both" value="both">both</button>
          </sp-segmented>
        </div>
        <div style="position: relative; width: ${n}px; height: ${a}px; margin-top: 10px">
          <span data-part="guide" style="position: absolute; left: ${r}px; top: 0; height: ${a}px; width: 2px;
                background: color-mix(in oklab, var(--sp-accent) 45%, transparent)"></span>
          <div data-part="prose" data-mode="indent" style="position: relative; font-size: 13px; line-height: ${i}px">
            <h4 class="sp-heading sp-context" style="margin: 0 0 6px; font-size: 13px; line-height: 17px">Setting a paragraph</h4>
            ${[`The opening paragraph is set flush. Nothing sits above it here, so a notch would mark a boundary that is not there.`,`Every paragraph after it opens one indent in. The eye catches that notch and reads a new thought beginning.`,`A blank line would say the same thing twice. One marker is enough, which is why the two are alternatives.`].map((e,t)=>`
                  <p data-part="para-${t+1}"${t===1?` data-indent`:``}
                     style="position: relative; margin: 0; text-indent: ${t===0?0:r}px">${t===1?`<span data-part="indent-trace" data-subject data-indent data-pose="[data-indent]" aria-hidden="true"
                                  style="position: absolute; left: 0; top: 0; width: ${r}px; height: ${i}px; pointer-events: none;
                                         background: color-mix(in oklab, var(--sp-accent) 22%, transparent)"></span>`:``}${e}</p>`).join(``)}
          </div>
        </div>
        <!-- One line each, never wrapped: the row's height is reserved, so a longer
             declaration must not grow it (SPEC §5). -->
        <div class="sp-row sp-row--between sp-context" style="height: 18px; margin-top: 8px">
          <span class="sp-label" data-part="css" style="color: var(--sp-ink); white-space: nowrap"></span>
          <span class="sp-label" data-stage-verdict data-part="note" style="white-space: nowrap"></span>
        </div>
      </div>
    </div>
  `;let c=e(s,`prose`),l=e(s,`css`),u=e(s,`note`),d=e(s,`para-2`),f=e(s,`indent-trace`),p=e(s,`para-3`),m=e=>{let n=o[e];if(n){c.dataset.mode=e;for(let e of[d,p])e.style.textIndent=n.indent?`${r}px`:`0`,e.style.marginTop=n.space?`10px`:`0`;t(d,`data-indent`,n.indent),f.style.width=n.indent?`${r}px`:`0`,t(f,`data-indent`,n.indent),l.textContent=n.css,u.textContent=n.note}};m(`indent`),e(s,`segmented`).addEventListener(`change`,e=>m(e.detail))}export{s as mount};