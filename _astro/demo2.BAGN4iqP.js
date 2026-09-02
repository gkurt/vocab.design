var e=`Georgia, 'Times New Roman', 'Liberation Serif', 'DejaVu Serif', serif`;function t(t){let n=(e,t)=>`
    <span style="position: relative; display: inline-block; width: 0; height: 0; vertical-align: baseline">
      <span style="position: absolute; left: 0; bottom: 0; width: ${e}px; height: 0; border-top: ${t}"></span>
    </span>`,r=(t,n,r)=>`
    <span data-part="${t}" style="font-family: ${e}; font-size: ${r}px; line-height: 1.3">${n}</span>`,i=(t,r,i,a)=>`
    <span data-part="${t}" style="display: inline-block; vertical-align: middle; width: ${a}px;
          font-family: ${e}; font-size: ${i}px; line-height: 1.3">
      ${n(a,`1px dashed var(--sp-muted)`)}${r}
    </span>`;t.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 460px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Georgia</span>
          <span class="sp-label">21 px and 52 px</span>
        </div>
        <div data-part="ruled" data-subject style="margin-top: 8px; font-size: 0; white-space: nowrap">
          ${n(420,`1px solid var(--sp-accent)`)}${r(`sample-small`,`Handgloves`,21)}&#8202;${r(`sample-large`,`Rpg`,52)}
        </div>
        <div class="sp-divider sp-context" style="margin: 12px 0 10px"></div>
        <div class="sp-context">
          <span class="sp-label">22 px and 40 px</span>
          <div data-part="centred" style="margin-top: 4px; font-size: 0; white-space: nowrap">
            ${i(`centred-small`,`Handgloves`,22,130)}${i(`centred-large`,`Rpg`,40,110)}
          </div>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 8px">
          Solid: the baseline both sizes sit on, descenders crossing below it. Dashed: each centred
          sample's own baseline, a few pixels apart.
        </p>
      </div>
    </div>
  `}export{t as mount};