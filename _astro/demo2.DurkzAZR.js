import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`'Fira Code', ui-monospace, monospace`,n=40,r=[{token:`&gt;&gt;=`,part:`shr`},{token:`&lt;&lt;=`,part:`shl`},{token:`||=`,part:`or`},{token:`|=`,part:`pipe`},{token:`==`,part:`eq`},{token:`!=`,part:`noteq`}],i={on:`ss09 1`,off:`ss09 0`},a={on:`Four drawings arrive together under one tag. The equality pair belongs to another set and does not move.`,off:`The family’s own drawings, with every set in the file switched off.`},o=e=>e in i;function s(s){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">font-feature-settings: "ss09"</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="on" data-axis="Value" data-term="on">
            <button class="sp-segment" data-part="seg-off" value="off">0</button>
            <button class="sp-segment" data-part="seg-on" value="on">1</button>
          </sp-segmented>
        </div>
        <div class="sp-row" data-part="run" data-subject data-ss="on" data-pose="[data-ss=on]"
             style="gap: 22px; justify-content: center; align-items: baseline; height: 76px; margin-top: 12px;
                    font-family: ${t}; font-size: ${n}px; line-height: 1.15; font-feature-settings: 'ss09' 1">
          ${r.map(({token:e,part:t})=>`<span data-part="cell-${t}">${e}</span>`).join(``)}
        </div>
        <div class="sp-row sp-context" style="height: 30px">
          <span class="sp-chip" data-part="readout" style="cursor: default">${i.on}</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 4px">${a.on}</p>
      </div>
    </div>
  `;let c=e(s,`run`),l=e(s,`readout`),u=e(s,`caption`);e(s,`segmented`).addEventListener(`change`,e=>{let t=e.detail;o(t)&&(c.dataset.ss=t,c.style.fontFeatureSettings=`'ss09' ${+(t===`on`)}`,l.textContent=i[t],u.textContent=a[t])})}export{s as mount};