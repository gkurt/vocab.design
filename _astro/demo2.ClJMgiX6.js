import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var r=[`send`,`draft`,`star`],i=[{key:`send`,phrase:`“Click Send”`,hit:`send`,ok:!0,result:`Send activated`},{key:`draft`,phrase:`“Click Save draft”`,hit:null,ok:!1,result:`No match. Its name is “Store changes”.`},{key:`star`,phrase:`“Click Favourite”`,hit:null,ok:!1,result:`No match. The icon carries no visible words.`}],a={labels:i,numbers:[{key:`three`,phrase:`“Click 3”`,hit:`star`,ok:!0,result:`Item 3 activated`},{key:`two`,phrase:`“Click 2”`,hit:`draft`,ok:!0,result:`Item 2 activated`}]},o={labels:`Speech addresses a control by the words on it, so the accessible name has to contain the visible label. One here does not, and one has no words.`,numbers:`Show numbers is the fallback: every control gets an address it never had. It works, and it charges the reader a lookup before every command.`};function s(s){let c=(e,t,n,r=``)=>`
    <span style="position: relative; display: inline-flex; flex: 0 0 auto">
      <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="ctl-${e}" ${r}
              style="cursor: default">${n}</button>
      <span data-part="num-${e}" hidden
            style="position: absolute; top: -7px; left: -7px; min-width: 16px; height: 16px; padding: 0 4px;
                   display: flex; align-items: center; justify-content: center; border-radius: 999px;
                   background: var(--sp-accent); color: var(--sp-accent-ink); font-size: 10px; font-weight: 600;
                   line-height: 1">${t+1}</span>
    </span>`;s.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Addressed by" data-part="segmented" data-value="labels">
            <button class="sp-segment" data-part="seg-labels" value="labels">Labels</button>
            <button class="sp-segment" data-part="seg-numbers" value="numbers">Numbers</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="screen" data-subject data-mode="labels"
             style="margin-top: 9px; padding: 10px 12px">
          <div class="sp-row sp-row--between" style="gap: 10px; height: 18px">
            <span class="sp-heading" style="flex: 0 0 auto; font-size: 12.5px">New message</span>
            <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">Draft</span>
          </div>
          <div class="sp-stack" style="margin-top: 8px; gap: 6px">
            <div class="sp-line" style="width: 74%"></div>
            <div class="sp-line" style="width: 52%"></div>
          </div>
          <div class="sp-row" style="margin-top: 12px; gap: 10px">
            ${c(`send`,0,`Send`)}
            ${c(`draft`,1,`Save draft`,`aria-label="Store changes"`)}
            ${c(`star`,2,n(`star`),`aria-label="Favourite"`)}
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; gap: 10px">
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="speak">Speak next</button>
          <span class="sp-text sp-text--ink" data-stage-announce data-part="said" data-utter="send"
                style="flex: 0 0 auto; font-size: 12px; white-space: nowrap">${i[0]?.phrase}</span>
        </div>

        <div class="sp-row sp-context" style="margin-top: 9px; height: 18px; gap: 10px; justify-content: flex-end">
          <span class="sp-text sp-text--ink" data-part="result" data-ok="yes"
                style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap">${i[0]?.result}</span>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="labels"
           style="margin: 6px 0 0; height: 34px; font-size: 11px">${o.labels}</p>
      </div>
    </div>
  `;let l=e(s,`screen`),u=e(s,`said`),d=e(s,`result`),f=e(s,`caption`),p=`labels`,m=0,h=()=>{let n=a[p][m]??a[p][0];if(n){for(let i of r)t(e(s,`ctl-${i}`),`data-selected`,i===n.hit);u.dataset.utter=n.key,u.textContent=n.phrase,d.dataset.ok=n.ok?`yes`:`no`,d.textContent=n.result}},g=n=>{p=n,m=0,l.dataset.mode=n;for(let i of r)t(e(s,`num-${i}`),`hidden`,n!==`numbers`);f.dataset.mode=n,f.textContent=o[n],h()};g(`labels`),e(s,`speak`).addEventListener(`click`,()=>{m=Math.min(m+1,a[p].length-1),h()}),e(s,`segmented`).addEventListener(`change`,e=>{g(e.detail)})}export{s as mount};