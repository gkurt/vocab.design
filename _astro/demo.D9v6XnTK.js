import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={obstructed:`Nothing is broken and nothing lied. The way out just costs three screens and a phone call.`,direct:`The same cancellation, reached in one click. The friction is gone, not hidden.`},n=[`align-self: flex-start`,`margin-top: 9px`,`border: 0`,`background: transparent`,`font: inherit`,`font-size: 10px`,`color: var(--sp-muted)`,`padding: 0`,`text-decoration: underline`,`cursor: pointer`].join(`; `),r=[[`Email digest`,`Weekly`],[`Paper delivery`,`Off`],[`Partner offers`,`On`]].map(([e,t])=>`<div class="sp-row sp-row--between" style="height: 21px">
      <span style="font-size: 11px">${e}</span><span class="sp-label" style="font-size: 10px">${t}</span>
    </div>`).join(``),i=`
  <span class="sp-heading" style="font-size: 13px">Reader plan</span>
  <span class="sp-text" style="margin-top: 3px; font-size: 11px">6.99 a month, renews 4 May.</span>`,a={obstructed:[`${i}
     <button class="sp-button sp-button--ghost sp-button--sm" data-part="hurdle-1" type="button" style="align-self: flex-start; margin-top: 12px">Manage preferences</button>`,`<span class="sp-heading" style="font-size: 13px">Preferences</span>
     <div style="align-self: stretch; margin-top: 5px">${r}</div>
     <button data-part="hurdle-2" type="button" style="${n}">cancel or pause your subscription</button>`,`<span class="sp-heading" style="font-size: 13px">Are you sure?</span>
     <span class="sp-text" style="margin-top: 4px; font-size: 11px">You would lose 214 saved articles, your reading history, and the crossword archive.</span>
     <div class="sp-row" style="gap: 10px; margin-top: 12px">
       <button class="sp-button" data-part="keep" type="button" style="flex: 0 0 auto">Keep my plan</button>
       <button data-part="hurdle-3" type="button" style="${n}; align-self: center; margin-top: 0">continue to cancel</button>
     </div>`,`<span class="sp-heading" style="font-size: 13px">Cancellations are by phone</span>
     <span class="sp-text" data-part="deadend" style="margin-top: 4px; font-size: 11px">Call 0800 000 000, Monday to Thursday, 9am to 4pm. Average wait 24 minutes.</span>`],direct:[`${i}
     <button class="sp-button sp-button--sm" data-part="cancel-now" type="button" style="align-self: flex-start; margin-top: 12px">Cancel subscription</button>
     <span class="sp-text" style="margin-top: 9px; font-size: 11px">Runs to the end of the month either way.</span>`,`<span class="sp-heading" style="font-size: 13px">Cancelled</span>
     <span class="sp-text" data-part="done" style="margin-top: 4px; font-size: 11px">Confirmation emailed. Your plan runs until 4 May, then stops.</span>`]};function o(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 224px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Account</span><span class="sp-text">You want to cancel</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">
          <div
            class="sp-surface"
            data-part="path"
            data-subject
            data-pose="[data-route=obstructed]"
            data-route="obstructed"
            data-step="0"
            style="display: flex; flex-direction: column; align-items: flex-start; height: 150px; padding: 12px 14px; background: var(--sp-surface)"
          >${a.obstructed[0]}</div>
        </div>
      </div>
              <span class="sp-text" data-stage-verdict data-part="verdict" style="width: 306px; height: 30px; font-size: 11px; line-height: 1.35">${t.obstructed}</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-part="route" data-value="obstructed" data-axis="Obstruction" data-term="obstructed">
          <button class="sp-segment" data-part="route-obstructed" type="button" value="obstructed" style="padding: 4px 10px; font-size: 12px">With</button>
          <button class="sp-segment" data-part="route-direct" type="button" value="direct" style="padding: 4px 10px; font-size: 12px">Without</button>
        </sp-segmented>
      
    </div>
  `;let r=e(n,`path`),i=e(n,`verdict`),o=(e,n)=>{let o=a[e][n];o&&(r.dataset.route=e,r.dataset.step=String(n),r.innerHTML=o,i.textContent=t[e])};r.addEventListener(`click`,e=>{let t=e.target.closest(`[data-part]`)?.dataset.part,n=r.dataset.route,i=Number(r.dataset.step);(t===`hurdle-1`||t===`hurdle-2`||t===`hurdle-3`||t===`cancel-now`)&&o(n,i+1)}),e(n,`route`).addEventListener(`change`,e=>{o(e.detail===`direct`?`direct`:`obstructed`,0)})}export{o as mount};