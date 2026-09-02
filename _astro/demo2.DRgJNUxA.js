var e=[`sum    1,284.50 ok`,`fees      19.05 ok`],t=`repeating-linear-gradient(to right, var(--sp-line) 0 1px, transparent 1px 1ch)`,n=t=>e.map((e,n)=>`<div data-part="${t}-${n}" style="white-space: pre">${e}</div>`).join(``);function r(e){e.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 360px">
        <div class="sp-stack" style="gap: 6px">
          <span class="sp-label sp-context">monospace</span>
          <div data-part="mono" data-subject
               style="font-family: ui-monospace, 'SF Mono', 'Cascadia Mono', Menlo, Consolas, 'DejaVu Sans Mono', monospace, monospace; font-size: 17px; line-height: 24px; width: max-content; background-image: ${t}">
            ${n(`mono`)}
          </div>
        </div>
        <div class="sp-divider sp-context" style="margin: 14px 0"></div>
        <div class="sp-stack sp-context" style="gap: 6px">
          <span class="sp-label">proportional</span>
          <div data-part="prop"
               style="font-size: 17px; line-height: 24px; width: max-content; background-image: ${t}">
            ${n(`prop`)}
          </div>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 14px">
          Every cell above is one character wide, so the decimal points and the last word land in
          the same columns. Below, the same strings with the same spaces land nowhere in particular.
        </p>
      </div>
    </div>
  `}export{r as mount};