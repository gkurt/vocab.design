var e=`0.09em`;function t(t){let n=(t,n,r,i=!1)=>`
    <div class="sp-stack" style="gap: 3px; align-items: flex-start">
      <span class="sp-label sp-context">${n}</span>
      <span data-part="${t}"${i?` data-subject data-tracking="${e}"`:``}
            style="font-size: 19px; font-weight: 600; ${r}">Shipping address</span>
    </div>`;t.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 440px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label" style="margin-left: auto">19px</span>
        </div>
        <div class="sp-stack" style="gap: 12px; margin-top: 12px">
          <div class="sp-context">${n(`sample-mixed`,`mixed case`,`text-transform: none`)}</div>
          <div class="sp-context">${n(`sample-tight`,`uppercase, default spacing`,`text-transform: uppercase`)}</div>
          ${n(`sample-tracked`,`uppercase, letter-spacing: ${e}`,`text-transform: uppercase; letter-spacing: ${e}`,!0)}
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 12px">
          The transform is one line of CSS. The spacing is the part people forget: capitals want more room.
        </p>
      </div>
    </div>
  `}export{t as mount};