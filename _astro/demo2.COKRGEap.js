import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={light:{bg:`#E9ECF2`,surface:`#FFFFFF`,raised:`#FFFFFF`,line:`#D7DCE6`,ink:`#1B2130`,muted:`#5A6474`,shadow:`0 6px 16px rgb(16 24 40 / 0.18)`},dark:{bg:`#101318`,surface:`#1B1F26`,raised:`#272C35`,line:`#333944`,ink:`#E7EAF0`,muted:`#9AA3B2`,shadow:`none`}},n={light:`Nothing is lighter than white, so the top level repeats the surface below it and elevation is carried by shadow.`,dark:`A shadow does nothing against a near black page, so each level up is a lighter plane instead.`},r=[{key:`bg`,token:`background`},{key:`surface`,token:`surface`},{key:`raised`,token:`surface-raised`}],i=`light`,a=(e,t)=>Number.parseInt(e.slice(t,t+2),16)/255,o=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,s=e=>.2126*o(a(e,1))+.7152*o(a(e,3))+.0722*o(a(e,5)),c=e=>{let t=s(e);return Math.round(t>.008856?116*Math.cbrt(t)-16:903.3*t)};function l(a){let o=t[i]??t.light;if(!o)return;a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 420px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Scheme" data-part="segmented" data-value="${i}">
            <button class="sp-segment" data-part="seg-light" value="light">Light</button>
            <button class="sp-segment" data-part="seg-dark" value="dark">Dark</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 12px; align-items: flex-start">
          <div data-part="stack" data-subject data-scheme="${i}"
               style="flex: 0 0 214px; height: 150px; padding: 10px; border-radius: var(--sp-radius);
                      border: 1px solid var(--s-line); background: var(--s-bg)">
            <span class="sp-label" style="color: var(--s-muted)">background</span>
            <div style="margin-top: 6px; padding: 10px; border-radius: 6px; border: 1px solid var(--s-line);
                        background: var(--s-surface)">
              <span class="sp-label" style="color: var(--s-muted)">surface</span>
              <div data-part="raised" style="margin-top: 6px; padding: 8px 10px; border-radius: 6px;
                   border: 1px solid var(--s-line); background: var(--s-raised); box-shadow: var(--s-shadow)">
                <span style="font-size: 12px; font-weight: 500; color: var(--s-ink)">surface-raised</span>
              </div>
            </div>
          </div>

          <div class="sp-stack sp-context sp-grow" style="gap: 6px">
            <span class="sp-label">Levels</span>
            ${r.map(e=>`
      <div class="sp-row" style="gap: 6px">
        <span class="sp-swatch" data-part="chip-${e.key}" style="flex: 0 0 auto; width: 14px; height: 14px;
              box-shadow: inset 0 0 0 1px rgb(16 24 40 / 0.16); --sp-swatch: ${o[e.key]}"></span>
        <span class="sp-text" style="flex: 1 1 auto; font-size: 11px; color: var(--sp-ink)">${e.token}</span>
        <span class="sp-text" data-part="l-${e.key}"
              style="flex: 0 0 46px; text-align: right; font-size: 11px; font-variant-numeric: tabular-nums">L* ${c(o[e.key])}</span>
      </div>`).join(``)}
            <p class="sp-text" data-stage-verdict data-part="note" style="margin: 2px 0 0; min-height: 72px; font-size: 11px">${n[i]}</p>
          </div>
        </div>
      </div>
    </div>
  `;let s=e(a,`stack`),l=e(a,`note`),u=i=>{let o=t[i];if(o){s.dataset.scheme=i,s.dataset.elevation=o.raised===o.surface?`shadow`:`lightness`;for(let[e,t]of Object.entries(o))s.style.setProperty(`--s-${e}`,t);for(let t of r)e(a,`chip-${t.key}`).style.setProperty(`--sp-swatch`,o[t.key]),e(a,`l-${t.key}`).textContent=`L* ${c(o[t.key])}`;l.textContent=n[i]??``}};u(i),e(a,`segmented`).addEventListener(`change`,e=>u(e.detail))}export{l as mount};