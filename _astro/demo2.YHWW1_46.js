import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n=(e,t)=>Number.parseInt(e.slice(t,t+2),16)/255,r=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,i=e=>.2126*r(n(e,1))+.7152*r(n(e,3))+.0722*r(n(e,5)),a=(e,t)=>{let[n,r]=[i(e),i(t)].sort((e,t)=>t-e);return((n??0)+.05)/((r??0)+.05)},o=e=>.2126729*n(e,1)**2.4+.7151522*n(e,3)**2.4+.072175*n(e,5)**2.4,s=e=>e<.022?e+(.022-e)**1.414:e,c=(e,t)=>{let n=s(o(e)),r=s(o(t));if(Math.abs(r-n)<5e-4)return 0;if(r>n){let e=(r**.56-n**.57)*1.14;return(e<.1?0:e-.027)*100}let i=(r**.65-n**.62)*1.14;return(i>-.1?0:i+.027)*100},l=[{key:`body`,label:`Body 16px`,px:`16px`,weight:`400`,wcag:4.5,lc:75,note:`Body text: WCAG 2 asks 4.5:1, APCA asks Lc 75.`},{key:`large`,label:`Large 24px bold`,px:`24px`,weight:`700`,wcag:3,lc:60,note:`Large bold text: WCAG 2 asks 3:1, APCA asks Lc 60.`}],u=`body`,d=[{key:`ink`,text:`#1B2130`,bg:`#FFFFFF`},{key:`grey`,text:`#767676`,bg:`#FFFFFF`},{key:`thin`,text:`#9E9E9E`,bg:`#000000`},{key:`white`,text:`#FFFFFF`,bg:`#787878`}];function f(n){let r=l.find(e=>e.key===u)??l[0];if(!r)return;let i=(e,t)=>`
    <td style="width: 122px">
      <span class="sp-row" style="gap: 6px">
        <span data-part="mark-${e}-${t}" style="display: flex"></span>
        <span data-part="${e}-${t}" style="font-variant-numeric: tabular-nums"></span>
      </span>
    </td>`,o=d.map(e=>`
      <tr data-part="row-${e.key}" data-wcag="fail" data-apca="fail">
        <td style="width: 156px">
          <span data-part="sample-${e.key}"
                style="display: flex; align-items: center; height: 30px; padding: 0 9px; border-radius: 5px; line-height: 1;
                       background: ${e.bg}; color: ${e.text}; font-size: ${r.px}; font-weight: ${r.weight}">Sample</span>
        </td>
        ${i(`wcag`,e.key)}
        ${i(`apca`,e.key)}
      </tr>`).join(``);n.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 448px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Text" data-value="${u}">
            ${l.map(e=>`<button class="sp-segment" data-part="seg-${e.key}" value="${e.key}">${e.label}</button>`).join(``)}
          </sp-segmented>
        </div>

        <table class="sp-table" data-part="table" data-subject data-size="${u}"
               style="margin-top: 12px; --sp-cell-pad: 3px 8px">
          <thead>
            <tr>
              <th style="width: 156px">Pair</th>
              <th style="width: 122px">WCAG 2</th>
              <th style="width: 122px">APCA</th>
            </tr>
          </thead>
          <tbody>${o}</tbody>
        </table>

        <p class="sp-text sp-context" data-stage-verdict data-part="thresholds"
           style="margin: 10px 0 0; height: 32px; font-size: 11px; line-height: 1.4">${r.note}</p>
      </div>
    </div>
  `;let s=e(n,`table`),f=e(n,`thresholds`),p=r=>{let i=l.find(e=>e.key===r);if(i){s.dataset.size=r,f.textContent=i.note;for(let r of d){let o=a(r.text,r.bg),s=c(r.text,r.bg),l=o>=i.wcag,u=Math.abs(s)>=i.lc,d=e(n,`row-${r.key}`);d.dataset.wcag=l?`pass`:`fail`,d.dataset.apca=u?`pass`:`fail`,e(n,`wcag-${r.key}`).textContent=`${o.toFixed(2)}:1`,e(n,`apca-${r.key}`).textContent=`Lc ${Math.round(s)}`,e(n,`mark-wcag-${r.key}`).innerHTML=t(l?`check`:`close`),e(n,`mark-apca-${r.key}`).innerHTML=t(u?`check`:`close`);let f=e(n,`sample-${r.key}`);f.style.fontSize=i.px,f.style.fontWeight=i.weight}}};p(u),e(n,`segmented`).addEventListener(`change`,e=>p(e.detail))}export{f as mount};