import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,r=e=>{let[t,r,i]=[1,3,5].map(t=>n(Number.parseInt(e.slice(t,t+2),16)/255));return .2126*(t??0)+.7152*(r??0)+.0722*(i??0)},i=(e,t)=>{let[n,i]=[r(e),r(t)].sort((e,t)=>t-e);return((n??0)+.05)/((i??0)+.05)},a=[{key:`light`,name:`Light`,surface:`#FFFBFF`,raised:`#E7E0EC`,ink:`#1D1B20`,muted:`#49454F`,accent:`#6750A4`,onAccent:`#FFFFFF`},{key:`dark`,name:`Dark`,surface:`#141218`,raised:`#2B2930`,ink:`#E6E0E9`,muted:`#CAC4D0`,accent:`#D0BCFF`,onAccent:`#381E72`}],o=[{key:`lockup`,fill:`#FF5A00`,ink:`#1A1200`,token:`brand-orange`},{key:`badge`,fill:`#B3170F`,ink:`#FFFFFF`,token:`hazard-red`}],s=`light`,c=e=>a.find(t=>t.key===e)??a[0],l=e=>e.slice(1);function u(n){let r=(e,t)=>`
    <div class="sp-row" data-part="${e.key}" data-hex="${l(e.fill)}"
         style="flex: 1 1 0; min-width: 0; gap: 9px; height: 46px; padding: 0 11px; border-radius: 6px;
                background: ${e.fill}; color: ${e.ink}">
      ${t}
      <span class="sp-grow"></span>
      <span style="flex: 0 0 auto; text-align: right; font-size: 8.5px; line-height: 1.3;
                   font-variant-numeric: tabular-nums">
        <span style="display: block; font-weight: 600">${e.fill}</span>
        <span data-part="ratio-${e.key}" style="display: block"></span>
      </span>
    </div>`;n.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 13px 20px">
        <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Scheme" data-value="${s}">
            ${a.map(e=>`<button class="sp-segment" data-part="seg-${e.key}" value="${e.key}">${e.name}</button>`).join(``)}
          </sp-segmented>

        <div data-part="screen" data-scheme="${s}"
             style="margin-top: 9px; padding: 12px; border-radius: 8px;
                    box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.28)">
          <div class="sp-row sp-row--between sp-context" style="height: 28px">
            <span data-part="app-title" style="font-size: 12px; font-weight: 600">Northwind field app</span>
            <span data-part="app-button" data-hex="${l(a[0].accent)}"
                  style="display: inline-flex; align-items: center; height: 24px; padding: 0 12px;
                         border-radius: 999px; font-size: 10.5px; font-weight: 600">Report</span>
          </div>

          <div class="sp-row sp-context" data-part="app-card" data-hex="${l(a[0].raised)}"
               style="gap: 9px; height: 38px; margin-top: 8px; padding: 0 11px; border-radius: 6px">
            <span data-part="app-line" style="flex: 1 1 auto; height: 7px; border-radius: 4px"></span>
            <span data-part="app-hex" style="flex: 0 0 auto; font-size: 8.5px; font-variant-numeric: tabular-nums"></span>
          </div>

          <div class="sp-row" data-subject data-part="static-pair" style="gap: 9px; margin-top: 9px">
            ${r(o[0],`<span style="flex: 0 0 13px; width: 13px; height: 13px; border-radius: 3px; rotate: 45deg;
                            background: currentcolor"></span>
               <span style="font-size: 11px; font-weight: 700; letter-spacing: 0.09em">NORTHWIND</span>`)}
            ${r(o[1],`${t(`alert`)}
               <span style="font-size: 11px; font-weight: 700; letter-spacing: 0.04em">400 V</span>`)}
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 8px; height: 15px">
          <span class="sp-text" data-part="readout" style="font-size: 9px; font-variant-numeric: tabular-nums"></span>
          <span class="sp-text" data-part="count" style="font-size: 9px"></span>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption"
           style="margin: 5px 0 0; height: 42px; font-size: 10px; line-height: 1.4">
          The two plates below the card are excluded from the scheme by declaration. Each carries its own ink and its
          own measured ratio, because nothing is deriving an on-colour for a value the theme cannot reach.
        </p>
      </div>
    </div>
  `;for(let t of o){let r=i(t.fill,t.ink);e(n,`ratio-${t.key}`).textContent=`${r.toFixed(1)}:1 held`}let u=t=>{let r=c(t);if(!r)return;let i=e(n,`screen`);i.dataset.scheme=r.key,i.style.background=r.surface,i.style.color=r.ink;let a=e(n,`app-title`);a.dataset.hex=l(r.ink),a.style.color=r.ink;let s=e(n,`app-button`);s.dataset.hex=l(r.accent),s.style.background=r.accent,s.style.color=r.onAccent;let u=e(n,`app-card`);u.dataset.hex=l(r.raised),u.style.background=r.raised,e(n,`app-line`).style.background=r.muted;let d=e(n,`app-hex`);d.style.color=r.muted,d.textContent=`surface ${r.raised}`,e(n,`readout`).textContent=`surface ${r.surface} · accent ${r.accent} · on-surface ${r.ink}`,e(n,`count`).textContent=`3 roles re-derived · ${o.length} held`};u(s),e(n,`segmented`).addEventListener(`change`,e=>u(e.detail))}export{u as mount};