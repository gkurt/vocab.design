import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var r=[`Starter`,`Team`,`Scale`],i=1,a=[{key:`projects`,feature:`Projects`,cells:[`3`,`25`,`Unlimited`]},{key:`seats`,feature:`Team seats`,cells:[`1`,`10`,`50`]},{key:`history`,feature:`Version history`,cells:[!1,!0,!0]},{key:`sso`,feature:`Single sign-on`,cells:[!1,!1,!0]},{key:`sla`,feature:`Uptime SLA`,cells:[!1,!1,`99.9%`]},{key:`forum`,feature:`Community forum`,cells:[!0,!0,!0]},{key:`ssl`,feature:`SSL included`,cells:[!0,!0,!0]},{key:`backups`,feature:`Daily backups`,cells:[!0,!0,!0]},{key:`email`,feature:`Email support`,cells:[!0,!0,!0]}],o=e=>e.cells.every(t=>t===e.cells[0]);function s(e,t){let r=`${t?`background: var(--sp-accent-soft); `:``}width: 92px; text-align: center`;return e===!0?`<td style="${r}">${n(`check`)}<span class="sp-visually-hidden">Included</span></td>`:e===!1?`<td style="${r}; color: var(--sp-muted)">${n(`minus`)}<span class="sp-visually-hidden">Not included</span></td>`:`<td style="${r}">${e}</td>`}function c(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 288px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Plans</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Rows" data-part="mode" data-value="all">
            <button class="sp-segment" type="button" data-part="seg-all" value="all">All features</button>
            <button class="sp-segment" type="button" data-part="seg-diff" value="diff">Differences only</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="padding: 10px">
          <div class="sp-surface sp-scroll" style="height: 200px">
            <table class="sp-table" data-part="table" data-subject data-mode="all" aria-label="Plan comparison">
              <thead>
                <tr>
                  <th scope="col" style="width: 132px; position: sticky; top: 0; background: var(--sp-surface)">Feature</th>
                  ${r.map((e,t)=>{let n=t===i,r=`background: var(--sp-${n?`accent-soft`:`surface`}); `,a=n?`<span style="display: block; color: var(--sp-accent); font-size: 10px; letter-spacing: 0.05em">RECOMMENDED</span>`:``;return`
      <th
        scope="col"
        data-part="col-${e.toLowerCase()}"
        ${n?`data-recommended`:``}
        style="${r}width: 92px; text-align: center; white-space: normal; position: sticky; top: 0"
      ><span style="display: block; color: var(--sp-ink)">${e}</span>${a}</th>`}).join(``)}
                </tr>
              </thead>
              <tbody>${a.map(e=>`
      <tr data-part="row-${e.key}"${o(e)?` data-same`:``}>
        <th scope="row" style="width: 132px; font-weight: 400; color: var(--sp-ink)">${e.feature}</th>
        ${e.cells.map((e,t)=>s(e,t===i)).join(``)}
      </tr>`).join(``)}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;let c=e(n,`table`),l=a.map(t=>({row:t,el:e(n,`row-${t.key}`)}));e(n,`mode`).addEventListener(`change`,e=>{let n=e.detail;c.dataset.mode=n;for(let{row:e,el:r}of l)t(r,`hidden`,n===`diff`&&o(e))})}export{c as mount};