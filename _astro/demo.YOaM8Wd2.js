import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px`,n=20,r=18,i=`rgb(45 160 90 / 0.16)`,a=`rgb(207 91 82 / 0.14)`,o=`rgb(45 160 90 / 0.42)`,s=`rgb(207 91 82 / 0.36)`,c=`#2f8f5b`,l=`#c25a52`,u=`repeating-linear-gradient(135deg, var(--sp-line) 0 1px, transparent 1px 6px)`,d=`function total(rows) {`,f=`  let sum = 0`,p=`  log(rows)`,m=`  return sum`,h=`}`,g=`  if (!rows.length) return 0`,_=`  for (r of rows) sum += ${y(`r.n`,s,`word-old`)}`,v=`  for (r of rows) sum += ${y(`r.qty`,o,`word`,!0)}`;function y(e,t,n,r=!1){return`<span
    data-part="${n}"${r?` data-subject`:``}
    style="display: inline-block; padding: 0 1px; margin: 0 -1px; border-radius: 2px; background: ${t}"
  >${e}</span>`}function b(e){return`<span style="flex: 0 0 auto; width: ${r}px; text-align: right; ${t}; font-size: 9px; color: var(--sp-muted)">${e??``}</span>`}function x(e){return`
    <span style="flex: 0 0 auto; width: 9px; text-align: center; ${t}; color: ${e.sign===`+`?c:e.sign===`-`?l:`var(--sp-muted)`}">${e.sign??``}</span>
    <span style="flex: 1 1 auto; min-width: 0; padding-right: 4px; ${t}; line-height: ${n}px; white-space: pre; overflow: hidden">${e.text??``}</span>
  `}function S(e,t){if(e.gap)return`<span data-part="${e.part}" style="display: block; flex: 1 1 0; min-width: 0; height: ${n}px; background: ${u}; opacity: 0.7"></span>`;let r=e.sign===`+`?i:e.sign===`-`?a:`transparent`;return`<span${e.part?` data-part="${e.part}"`:``} style="display: flex; flex: 1 1 0; min-width: 0; align-items: center; height: ${n}px; padding-left: 3px; background: ${r}">
    ${t.map(b).join(``)}${x(e)}
  </span>`}function C(){return[[{n:1,text:d},{n:1,text:d}],[{n:2,text:f},{n:2,text:f}],[{n:3,sign:`-`,text:p,part:`row-del`},{gap:!0,part:`gap-right`}],[{n:4,sign:`-`,text:_},{n:3,sign:`+`,text:v,part:`row-chg`}],[{gap:!0,part:`gap-left`},{n:4,sign:`+`,text:g,part:`row-add`}],[{n:5,text:m},{n:5,text:m}],[{n:6,text:h},{n:6,text:h}]].map(([e,t])=>`<span style="display: flex; align-items: stretch; height: ${n}px">
        ${S(e,[e.n])}
        <span style="flex: 0 0 1px; background: var(--sp-line)"></span>
        ${S(t,[t.n])}
      </span>`).join(``)}function w(){return[[1,1,{text:d}],[2,2,{text:f}],[3,void 0,{sign:`-`,text:p,part:`row-del`}],[4,void 0,{sign:`-`,text:_}],[void 0,3,{sign:`+`,text:v,part:`row-chg`}],[void 0,4,{sign:`+`,text:g,part:`row-add`}],[5,5,{text:m}],[6,6,{text:h}]].map(([e,t,r])=>`<span style="display: flex; align-items: stretch; height: ${n}px">
        ${S(r,[e,t])}
      </span>`).join(``)}function T(t){t.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 288px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">total.js</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="picker" data-axis="Layout" data-value="split">
            <button class="sp-segment" type="button" data-part="seg-split" value="split" style="padding: 4px 10px; font-size: 12px">Split</button>
            <button class="sp-segment" type="button" data-part="seg-unified" value="unified" style="padding: 4px 10px; font-size: 12px">Unified</button>
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 12px">
          <div class="sp-surface" data-part="diff" data-mode="split" style="width: 440px; overflow: hidden">
            <div class="sp-row" data-part="rule" style="height: ${n}px; padding: 0 8px; border-bottom: 1px solid var(--sp-line)">
              <span class="sp-label sp-grow" data-part="rule-left" style="font-size: 10px">1a2f3c &middot; before</span>
              <span class="sp-label" data-part="rule-right" style="font-size: 10px">HEAD &middot; after</span>
            </div>
            <div data-part="body" style="height: 160px"></div>
          </div>

          <p class="sp-label" data-stage-verdict data-part="caption" style="margin: 0; width: 440px; font-size: 11px">
            Striped rows are alignment padding, not missing code.
          </p>
        </div>
      </div>
    </div>
  `;let r=e(t,`diff`),i=e(t,`body`),a=e(t,`rule-left`),o=e(t,`rule-right`),s=e=>{r.dataset.mode=e,i.innerHTML=e===`unified`?w():C(),a.textContent=e===`unified`?`@@ -1,6 +1,6 @@`:`1a2f3c · before`,o.textContent=e===`unified`?`total.js`:`HEAD · after`};e(t,`picker`).addEventListener(`change`,e=>s(e.detail)),s(`split`)}export{T as mount};