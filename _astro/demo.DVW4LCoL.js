import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=[{label:`Georgia`,family:`Georgia, 'Liberation Serif', serif`},{label:`Verdana`,family:`Verdana, 'DejaVu Sans', sans-serif`},{label:`sans-serif`,family:`sans-serif`}],n={none:0,first:1,two:2},r=`Handgloves 0123`;function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 440px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Not installed" data-part="segmented" data-value="none">
            <button class="sp-segment" data-part="seg-none" value="none">none</button>
            <button class="sp-segment" data-part="seg-first" value="first">1st</button>
            <button class="sp-segment" data-part="seg-two" value="two">1st + 2nd</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 8px; margin-top: 16px; align-items: baseline">
          <span class="sp-label sp-context">font-family:</span>
          <span class="sp-row" data-part="declaration" data-subject data-missing="none" style="gap: 6px; align-items: baseline">
            ${t.map(({label:e,family:n},r)=>`
      <span data-part="entry-${r}" style="font-family: ${n}; font-size: 16px">${e}${r<t.length-1?`,`:`;`}</span>`).join(``)}
          </span>
        </div>
        <div class="sp-divider sp-context" style="margin: 14px 0"></div>
        <div class="sp-row" data-part="sample-box" style="height: 44px">
          <span data-part="sample" style="font-family: ${t[0]?.family}; font-size: 22px">${r}</span>
        </div>
        <div class="sp-row sp-context" style="height: 20px">
          <span class="sp-text" data-part="readout">Resolved to Georgia, the first entry in the list.</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 10px">
          Each entry is tried in turn and the first one available wins. The line changes width and
          x-height every time the chain falls through, which is what a mismatched fallback costs.
        </p>
      </div>
    </div>
  `;let a=e(i,`declaration`),o=e(i,`sample`),s=e(i,`readout`),c=t.map((t,n)=>e(i,`entry-${n}`)),l=[`first`,`second`,`third`],u=e=>{let r=n[e];if(r===void 0)return;let i=t[r];i&&(a.dataset.missing=e,c.forEach((e,t)=>{let n=t<r;e.toggleAttribute(`data-gone`,n),e.toggleAttribute(`data-current`,t===r),e.style.textDecoration=n?`line-through`:`none`,e.style.color=n?`var(--sp-muted)`:t===r?`var(--sp-accent)`:`var(--sp-ink)`}),o.style.fontFamily=i.family,s.textContent=`Resolved to ${i.label}, the ${l[r]} entry in the list.`)};u(`none`),e(i,`segmented`).addEventListener(`change`,e=>u(e.detail))}export{i as mount};