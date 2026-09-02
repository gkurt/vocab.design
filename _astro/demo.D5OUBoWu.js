import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=[15,13,12,12],n={nested:[{level:1,text:`Brewing guide`},{level:2,text:`Grind size`},{level:3,text:`Burr settings`},{level:2,text:`Water`}],skipped:[{level:1,text:`Brewing guide`},{level:3,text:`Grind size`},{level:4,text:`Burr settings`},{level:3,text:`Water`}]};function r(e){return e.map((e,n)=>{let r=`h${e.level}`;return`
        <${r} style="margin: ${n===0?0:12}px 0 5px; font-size: ${t[n]}px; font-weight: 600; line-height: 1.3">${e.text}</${r}>
        <div class="sp-line" style="width: ${n%2==0?100:74}%"></div>`}).join(``)}function i(e){return[...e.querySelectorAll(`h1, h2, h3, h4, h5, h6`)].map(e=>({level:Number(e.tagName[1]),text:e.textContent?.trim()??``}))}function a(e){let t=0;return e.map(e=>{let n=t>0&&e.level-t>1;t=e.level;let r=n?`var(--sp-accent)`:`transparent`;return`
        <li class="sp-row" data-part="row" ${n?`data-jump`:``}
          style="gap: 6px; height: 22px; margin-left: ${(e.level-1)*13}px; padding-left: 6px; border-left: 2px dashed ${r}">
          <span class="sp-label">h${e.level}</span>
          <span class="sp-text sp-text--ink" style="font-size: 12px">${e.text}</span>
        </li>`}).join(``)}function o(e){let t=new Set(e.map(e=>e.level)),n=Math.max(...t);for(let e=2;e<=n;e+=1)if(!t.has(e))return`Level ${e} never appears, so a reader counting depth cannot tell a child from a sibling.`;return`No holes: every step down goes one level, so the depth of a section is readable.`}function s(t){t.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 420px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading" style="font-size: 14px">Article</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Levels" data-part="segmented" data-value="nested">
            <button class="sp-segment" data-part="seg-nested" value="nested">Nested</button>
            <button class="sp-segment" data-part="seg-skipped" value="skipped">Skipped</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="align-items: flex-start; gap: 16px; margin-top: 12px">
          <div class="sp-context" data-part="page" style="width: 180px"></div>
          <div class="sp-grow">
            <span class="sp-label sp-context">Headings list</span>
            <ul class="sp-list" data-part="outline" data-state="nested" data-subject style="margin-top: 6px; gap: 2px"></ul>
            <p class="sp-text sp-context" data-stage-verdict data-part="note" style="margin: 10px 0 0; height: 34px; font-size: 12px"></p>
          </div>
        </div>
      </div>
    </div>
  `;let s=e(t,`page`),c=e(t,`outline`),l=e(t,`note`),u=e=>{s.innerHTML=r(n[e]);let t=i(s);c.dataset.state=e,c.innerHTML=a(t),l.textContent=o(t)};u(`nested`),e(t,`segmented`).addEventListener(`change`,e=>{u(e.detail)})}export{s as mount};