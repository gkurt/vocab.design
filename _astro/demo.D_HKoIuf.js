import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=[{title:`Adding a second card`,widths:[92,78,86,64]},{title:`Refunds and chargebacks`,widths:[84,90,71,80]},{title:`Exporting your statements`,widths:[88,74,92,68]}],i=e=>r[e%r.length],a={yes:`Thanks. Recorded against this page and nothing else is asked.`,no:`Thanks. This page goes on the list to rewrite.`},o={asking:`One question, at the foot of the page it is about. The answer is given here, not on a survey page somewhere else.`,yes:`The question is replaced by the answer in the box it already had, so nothing under the reader moves and the survey is over.`,no:`The unhappy answer stays in the product and goes to the people who write the page. Nothing about it is public.`};function s(s){let c=e=>e.map(e=>`<div class="sp-line" style="width: ${e}%"></div>`).join(``);s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 276px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Help centre</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="next-page" type="button" style="flex: 0 0 auto">Next page</button>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column">
          <div class="sp-context" data-part="article" data-page="1">
            <div class="sp-heading" data-part="article-title" style="font-size: 13px">${i(0).title}</div>
            <div class="sp-stack" data-part="article-lines" style="margin-top: 10px">${c(i(0).widths)}</div>
          </div>
          <div
            class="sp-surface"
            data-part="survey"
            data-subject
            data-state="asking"
            style="position: relative; margin-top: auto; height: 66px; background: var(--sp-surface)"
          >
            <div class="sp-row sp-row--between" data-part="ask" style="position: absolute; inset: 12px">
              <span class="sp-text sp-text--ink" style="font-size: 12px">Was this page helpful?</span>
              <div class="sp-row" style="gap: 8px">
                <button class="sp-button sp-button--ghost sp-button--sm" data-part="answer-yes" type="button" style="flex: 0 0 auto">Yes</button>
                <button class="sp-button sp-button--ghost sp-button--sm" data-part="answer-no" type="button" style="flex: 0 0 auto">Not really</button>
              </div>
            </div>
            <div class="sp-row" data-part="thanks" hidden style="position: absolute; inset: 12px; gap: 8px">
              ${n(`check`)}
              <span class="sp-text sp-text--ink" data-part="thanks-text" style="font-size: 12px">${a.yes}</span>
            </div>
          </div>
        </div>
      </div>
      <span class="sp-text sp-context" data-stage-verdict data-part="note" style="width: 452px; height: 32px; font-size: 11px; line-height: 1.35">${o.asking}</span>
    </div>
  `;let l=e(s,`survey`),u=e(s,`ask`),d=e(s,`thanks`),f=e(s,`thanks-text`),p=e(s,`article`),m=e(s,`article-title`),h=e(s,`article-lines`),g=e(s,`note`),_=e=>{l.dataset.state=e,f.textContent=a[e],t(u,`hidden`,!0),t(d,`hidden`,!1),g.textContent=o[e]};e(s,`answer-yes`).addEventListener(`click`,()=>_(`yes`)),e(s,`answer-no`).addEventListener(`click`,()=>_(`no`)),e(s,`next-page`).addEventListener(`click`,()=>{let e=Number(p.dataset.page)%r.length+1;p.dataset.page=String(e),m.textContent=i(e-1).title,h.innerHTML=c(i(e-1).widths),l.dataset.state=`asking`,t(u,`hidden`,!1),t(d,`hidden`,!0),g.textContent=o.asking})}export{s as mount};