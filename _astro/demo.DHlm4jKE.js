import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n={selected:`The top run was restyled by the page. The bottom one is whatever the platform hands out.`,none:`Nothing selected, so there is nothing to paint: the rule applies only while a range is held.`},r=`selected`,i=`color-mix(in oklab, var(--sp-accent) 26%, var(--sp-surface))`,a=(e,t=``)=>`The harbour office keeps the tide tables, and <span data-part="${e}" ${t} style="padding: 0 1px; border-radius: 2px">the spring
   range</span> is printed on the back page.`;function o(o){let s=e=>`
    <p class="sp-prose" style="margin: 0; max-width: none; padding: 9px 10px; border-radius: var(--sp-radius);
       border: 1px solid var(--sp-line); background: var(--sp-surface); color: var(--sp-ink)">${e}</p>`;o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Selection" data-term="selected" data-part="segmented" data-value="${r}">
            <button class="sp-segment" data-part="seg-selected" value="selected">Held</button>
            <button class="sp-segment" data-part="seg-none" value="none">Released</button>
          </sp-segmented>
        </div>

        <div class="sp-stack" style="gap: 4px; margin-top: 12px">
          ${s(a(`run`,`data-subject data-pose="[data-selected]" data-selected`))}
        </div>

        <div class="sp-stack sp-context" style="gap: 4px; margin-top: 10px">
          ${s(a(`default-run`,`data-selected`))}
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="note" style="margin: 10px 0 0; min-height: 39px">&nbsp;</p>
      </div>
    </div>
  `;let c=e(o,`run`),l=e(o,`default-run`),u=e(o,`note`),d=e=>{let r=e===`selected`;t(c,`data-selected`,r),t(l,`data-selected`,r),c.style.background=r?i:`transparent`,c.style.color=r?`var(--sp-ink)`:`inherit`,l.style.background=r?`Highlight`:`transparent`,l.style.color=r?`HighlightText`:`inherit`,u.textContent=n[e]??``};d(r),e(o,`segmented`).addEventListener(`change`,e=>d(e.detail))}export{o as mount};