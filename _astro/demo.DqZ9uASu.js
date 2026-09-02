import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=600,n=[`B4`,`B7`,`B12`,`C3`],r=`AA21`,i=`14:20`,a={true:`The whole region is one unit, so changing the gate has the reader say the flight and the time again. The new gate arrives with something to attach it to.`,false:`The default. Only the node that changed is announced, so the reader hears a gate number with no flight and no time anywhere near it.`};function o(o,s){let c=(e,t,n,r=`auto`)=>`
    <div class="sp-stack" style="gap: 2px; flex: 0 0 auto">
      <span class="sp-label" style="font-size: 9.5px">${e}</span>
      <span class="sp-text sp-text--ink" ${n?`data-part="${n}"`:``}
            style="font-size: 13.5px; font-weight: 500; width: ${r}">${t}</span>
    </div>`;o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="change"
                  style="flex: 0 0 auto; font-size: 11.5px">Gate change</button>
          <div class="sp-row" style="gap: 8px; flex: 0 0 auto">
            <sp-segmented data-stage-mode class="sp-segmented" data-axis="aria-atomic" data-term="true" data-part="atomic" data-value="true">
              <button class="sp-segment" type="button" data-part="seg-true" value="true"
                      style="padding: 4px 12px; font-size: 11.5px">true</button>
              <button class="sp-segment" type="button" data-part="seg-false" value="false"
                      style="padding: 4px 12px; font-size: 11.5px">false</button>
            </sp-segmented>
          </div>
        </div>

        <div class="sp-surface" data-part="region" data-subject data-atomic="true" data-pose="[data-atomic=true]"
             role="status" aria-live="polite" aria-atomic="true"
             style="margin-top: 10px; padding: 10px 14px">
          <div class="sp-row" style="gap: 34px">
            ${c(`Flight`,r)}
            ${c(`Gate`,n[0]??``,`gate`,`38px`)}
            ${c(`Departs`,i)}
          </div>
        </div>

        <div class="sp-surface sp-context" style="margin-top: 10px; padding: 8px 10px">
          <span class="sp-label">Screen reader</span>
          <p class="sp-text" data-part="heard" data-state="idle" data-mode="whole"
             style="margin: 4px 0 0; height: 20px; font-size: 11.5px">Nothing announced yet</p>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-atomic="true"
           style="margin: 8px 0 0; height: 32px; font-size: 11px; line-height: 1.35">${a.true}</p>
      </div>
    </div>
  `;let l=e(o,`region`),u=e(o,`gate`),d=e(o,`heard`),f=e(o,`caption`),p=!0,m=0,h,g=()=>{s.clearTimeout(h),d.dataset.state=`idle`,d.className=`sp-text`,d.textContent=`Nothing announced yet`},_=e=>{p=e,m=0,l.dataset.atomic=String(e),l.setAttribute(`aria-atomic`,String(e)),u.textContent=n[0]??``,d.dataset.mode=e?`whole`:`fragment`,f.dataset.atomic=String(e),f.textContent=e?a.true:a.false,g()};e(o,`change`).addEventListener(`click`,()=>{m=(m+1)%n.length;let e=n[m]??``;u.textContent=e,s.clearTimeout(h),d.dataset.state=`queued`,d.className=`sp-text`,d.textContent=`queued`,h=s.setTimeout(()=>{d.dataset.state=`spoken`,d.className=`sp-text sp-text--ink`,d.textContent=p?`“Flight ${r}, gate ${e}, departs ${i}”`:`“${e}”`},t)}),e(o,`atomic`).addEventListener(`change`,e=>{_(e.detail===`true`)}),_(!0)}export{o as mount};