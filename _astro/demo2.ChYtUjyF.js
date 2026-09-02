import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n=[`AR`,`MK`,`JD`,`SB`],r={specific:`A count behind the rating, a number that could be checked, faces of real accounts, and a quote with a name on it.`,vague:`The same four claims with every checkable part removed. Nothing here could be shown to be false.`};function i(e){return Array.from({length:5},(n,r)=>t(`star`,r<e?`sp-icon--filled`:``)).map(e=>`<span style="display: flex; color: var(--sp-accent)">${e}</span>`).join(``)}function a(e){return(e===`specific`?n:[``,``,``,``]).map((e,t)=>`
        <span class="sp-avatar" style="width: 24px; height: 24px; font-size: 10px; margin-left: ${t===0?0:-8}px; box-shadow: 0 0 0 2px var(--sp-surface)">
          ${e}
        </span>`).join(``)}function o(e){let t=e===`specific`;return`
    <div class="sp-row" data-part="rating" style="gap: 6px; height: 18px">
      <span class="sp-row" style="gap: 1px">${i(t?4:5)}</span>
      <span class="sp-text sp-text--ink" style="font-size: 12px">${t?`4.6`:`Five stars`}</span>
      <span class="sp-label" data-part="reviews" data-count="${t?`1284`:`0`}" style="font-size: 11px">
        ${t?`from 1,284 reviews`:`from our customers`}
      </span>
    </div>
    <div class="sp-text sp-text--ink" data-part="usage" data-value="${t?`12400`:``}" style="height: 16px; font-size: 12px">
      ${t?`12,400 teams ship with Harbour`:`Loved by thousands of teams`}
    </div>
    <div class="sp-row" data-part="faces" style="height: 24px">
      ${a(e)}
      <span class="sp-label" style="margin-left: 8px; font-size: 11px">${t?`9 people from Kestrel Freight`:`and many more`}</span>
    </div>
    <figure data-part="quote" data-attributed="${t?`named`:`anon`}" style="margin: 0; height: 30px">
      <blockquote class="sp-text sp-text--ink" style="margin: 0; font-size: 12px">
        ${t?`“We moved forty drivers over in a weekend.”`:`“Best tool we have ever used!”`}
      </blockquote>
      <figcaption class="sp-label" style="font-size: 11px">${t?`Ana Reyes, operations lead, Kestrel Freight`:`A happy customer`}</figcaption>
    </figure>`}function s(t){t.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 264px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Plans</span><span class="sp-label">Harbour</span></div>
        <div class="sp-body">
          <div class="sp-surface" style="padding: 10px 12px">
            <div class="sp-row sp-row--between sp-context">
              <span class="sp-heading" style="font-size: 14px">Team plan</span>
              <span class="sp-text sp-text--ink">12.00 per seat</span>
            </div>
            <div
              class="sp-stack"
              data-part="cluster"
              data-subject
              data-mode="specific"
              style="gap: 6px; margin-top: 10px"
            >${o(`specific`)}</div>
            <button class="sp-button sp-button--sm sp-context" type="button" data-part="trial" style="width: 100%; margin-top: 10px">
              Start a free trial
            </button>
          </div>
        </div>
      </div>
              <span class="sp-text" data-stage-verdict data-part="verdict" style="font-size: 11px; width: 300px">${r.specific}</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-axis="Proof" data-part="mode" data-value="specific">
          <button class="sp-segment" data-part="mode-specific" value="specific">Checkable</button>
          <button class="sp-segment" data-part="mode-vague" value="vague">Vague</button>
        </sp-segmented>
      
    </div>
  `;let n=e(t,`cluster`),i=e(t,`verdict`);e(t,`mode`).addEventListener(`change`,e=>{let t=e.detail===`vague`?`vague`:`specific`;n.dataset.mode=t,n.innerHTML=o(t),i.textContent=r[t]})}export{s as mount};