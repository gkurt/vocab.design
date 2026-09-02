import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,n=e=>{let[n,r,i]=[1,3,5].map(n=>t(Number.parseInt(e.slice(n,n+2),16)/255));return .2126*(n??0)+.7152*(r??0)+.0722*(i??0)},r=(e,t)=>{let[r,i]=[n(e),n(t)].sort((e,t)=>t-e);return((r??0)+.05)/((i??0)+.05)},i=e=>e>=7?`AAA`:e>=4.5?`AA`:`fails AA`,a=[{key:`primary`,name:`Primary`,solid:{token:`primary`,hex:`#6750A4`,tone:40},onSolid:{token:`on-primary`,hex:`#FFFFFF`,tone:100},container:{token:`primary-container`,hex:`#EADDFF`,tone:90},onContainer:{token:`on-primary-container`,hex:`#21005D`,tone:10}},{key:`error`,name:`Error`,solid:{token:`error`,hex:`#B3261E`,tone:40},onSolid:{token:`on-error`,hex:`#FFFFFF`,tone:100},container:{token:`error-container`,hex:`#F9DEDC`,tone:90},onContainer:{token:`on-error-container`,hex:`#410E0B`,tone:10}},{key:`success`,name:`Success`,solid:{token:`success`,hex:`#386A20`,tone:40},onSolid:{token:`on-success`,hex:`#FFFFFF`,tone:100},container:{token:`success-container`,hex:`#B7F397`,tone:90},onContainer:{token:`on-success-container`,hex:`#0C2000`,tone:10}}],o=`primary`,s=e=>a.find(t=>t.key===e)??a[0];function c(t){let n=(e,t)=>`
    <div class="sp-stack" style="flex: 1 1 0; min-width: 0; gap: 4px">
      <div class="sp-row sp-row--between sp-context" style="height: 16px">
        <span class="sp-label">${e===`solid`?`Solid accent`:`Container`}</span>
        <span class="sp-text" data-part="token-${e}" style="font-size: 9px"></span>
      </div>
      <div data-part="${e}-panel" data-role="${o}" ${t}
           style="height: 104px; padding: 11px 12px; border-radius: 6px;
                  box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.28)">
        <div data-part="${e}-title" style="font-size: 11.5px; font-weight: 600">Storage almost full</div>
        <div data-part="${e}-body" style="font-size: 9.5px; line-height: 1.45; margin-top: 5px">
          Back up your library before the next sync runs tonight.
        </div>
        <span data-part="${e}-chip"
              style="display: inline-flex; align-items: center; margin-top: 9px; padding: 3px 9px;
                     border-radius: 999px; font-size: 9.5px; font-weight: 600; border: 1px solid currentcolor">
          Manage
        </span>
      </div>
      <div class="sp-context" style="height: 26px">
        <div class="sp-text" data-part="fill-${e}"
             style="font-size: 9px; font-variant-numeric: tabular-nums; height: 13px"></div>
        <div class="sp-text" data-part="ratio-${e}"
             style="font-size: 9px; font-variant-numeric: tabular-nums; height: 13px"></div>
      </div>
    </div>`;t.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 13px 20px">
        <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Role" data-value="${o}">
            ${a.map(e=>`<button class="sp-segment" data-part="seg-${e.key}" value="${e.key}">${e.name}</button>`).join(``)}
          </sp-segmented>

        <div class="sp-row" style="gap: 12px; margin-top: 10px; align-items: flex-start">
          ${n(`solid`,``)}
          ${n(`container`,`data-subject data-tone="90"`)}
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption"
           style="margin: 8px 0 0; height: 28px; font-size: 10px; line-height: 1.4"></p>
      </div>
    </div>
  `;let c=n=>{let a=s(n);if(!a)return;let o=[{kind:`solid`,fill:a.solid,ink:a.onSolid},{kind:`container`,fill:a.container,ink:a.onContainer}];for(let n of o){let o=e(t,`${n.kind}-panel`);o.dataset.role=a.key,o.dataset.tone=String(n.fill.tone),o.style.background=n.fill.hex,o.style.color=n.ink.hex,e(t,`token-${n.kind}`).textContent=n.fill.token,e(t,`fill-${n.kind}`).textContent=`${n.fill.hex} · tone ${n.fill.tone}`;let s=r(n.fill.hex,n.ink.hex);e(t,`ratio-${n.kind}`).textContent=`${n.ink.token} ${s.toFixed(1)}:1 ${i(s)}`}let c=r(a.solid.hex,a.onSolid.hex),l=r(a.container.hex,a.onContainer.hex);e(t,`caption`).textContent=`Same hue, two rungs apart. The solid fill carries one weight of ink at ${c.toFixed(1)}:1; the container carries ordinary copy at ${l.toFixed(1)}:1.`};c(o),e(t,`segmented`).addEventListener(`change`,e=>c(e.detail))}export{c as mount};