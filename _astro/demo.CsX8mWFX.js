import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={base:`#F4F6FA`,raised:`#FFFFFF`,ink:`#1B2130`,muted:`#5A6474`,line:`#D8DEE9`,accent:`#3557E8`,accentInk:`#FFFFFF`},n={derived:{base:`#14171C`,raised:`#22262E`,ink:`#E7EAF0`,muted:`#9AA3B2`,line:`#333944`,accent:`#7B93F5`,accentInk:`#10131C`},flipped:{base:`#0A0A0A`,raised:`#000000`,ink:`#FFFFFF`,muted:`#7A7A7A`,line:`#1A1A1A`,accent:`#3557E8`,accentInk:`#FFFFFF`}},r={derived:`The base lifts off black, so a raised surface can be lighter, and the accent lightens to keep its contrast.`,flipped:`White inverts to the darkest value on screen, so elevation runs backwards and the accent is left glowing.`},i=`derived`,a=(e,t)=>Number.parseInt(e.slice(t,t+2),16)/255,o=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,s=e=>.2126*o(a(e,1))+.7152*o(a(e,3))+.0722*o(a(e,5)),c=e=>{let t=s(e);return t>.008856?116*Math.cbrt(t)-16:903.3*t},l={"--p-base":`base`,"--p-raised":`raised`,"--p-ink":`ink`,"--p-muted":`muted`,"--p-line":`line`,"--p-accent":`accent`,"--p-accent-ink":`accentInk`},u=e=>Object.entries(l).map(([t,n])=>`${t}: ${e[n]}`).join(`; `),d=e=>`base ${Math.round(c(e.base))} · raised ${Math.round(c(e.raised))}`;function f(a){let o=(e,t,n=!1)=>`
    <div class="${e===`light`?`sp-context `:``}sp-stack" style="flex: 1 1 0; min-width: 0; gap: 6px">
      <div data-part="${e}" ${n?`data-subject`:``} style="${u(t)}; padding: 10px; border-radius: var(--sp-radius);
           border: 1px solid var(--p-line); background: var(--p-base)">
        <div class="sp-row sp-row--between">
          <span style="font-size: 12px; font-weight: 600; color: var(--p-ink)">Today</span>
          <span style="font-size: 11px; color: var(--p-muted)">3 due</span>
        </div>
        <div style="margin-top: 8px; padding: 9px; border-radius: 6px; background: var(--p-raised); border: 1px solid var(--p-line)">
          <span style="font-size: 12px; color: var(--p-ink)">Raised card</span>
        </div>
        <div class="sp-row" style="margin-top: 9px">
          <span style="padding: 5px 10px; border-radius: 6px; font-size: 12px; font-weight: 500;
                       background: var(--p-accent); color: var(--p-accent-ink)">Accent</span>
        </div>
      </div>
      <div class="sp-row sp-row--between">
        <span class="sp-label" data-part="${e}-name">${e===`light`?`Light`:`Dark`}</span>
        <span class="sp-text" data-part="${e}-lift" style="font-size: 11px">L* ${d(t)}</span>
      </div>
    </div>`;a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Dark palette" data-value="${i}">
            <button class="sp-segment" data-part="seg-derived" value="derived">Derived</button>
            <button class="sp-segment" data-part="seg-flipped" value="flipped">Flipped</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 12px; align-items: flex-start">
          ${o(`light`,t)}
          ${o(`dark`,n[i],!0)}
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="note" style="margin: 10px 0 0; min-height: 40px">${r[i]}</p>
      </div>
    </div>
  `;let s=e(a,`dark`),f=e(a,`dark-lift`),p=e(a,`dark-name`),m=e(a,`note`),h=e=>{let t=e===`flipped`?n.flipped:n.derived;s.dataset.mode=e,s.dataset.lift=c(t.raised)>c(t.base)?`up`:`down`;for(let[e,n]of Object.entries(l))s.style.setProperty(e,t[n]);f.textContent=`L* ${d(t)}`,p.textContent=e===`derived`?`Dark, derived`:`Dark, flipped`,m.textContent=r[e]??``};h(i),e(a,`segmented`).addEventListener(`change`,e=>h(e.detail))}export{f as mount};