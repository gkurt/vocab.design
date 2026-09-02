import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n=[{key:`search`,name:`search`,label:`Search`},{key:`delete`,name:`trash`,label:`Delete`},{key:`alerts`,name:`bell`,label:`Alerts`},{key:`share`,name:`share`,label:`Share`}],r=[`16`,`20`,`24`],i=`20`,a=26,o=24,s=116,c={16:`At 16 the stroke lands near one device pixel, and the detail starts to close up.`,20:`The same 24 unit drawing, scaled. Nothing was redrawn for this step.`,24:`At 24 the drawing is at its intended size and every gap is open.`},l=e=>`
  <div class="sp-stack" style="flex: 1 1 0; align-items: center; gap: 5px">
    <span style="display: flex; align-items: center; justify-content: center; width: ${a}px; height: ${a}px; color: var(--sp-ink)">
      ${t(e.name).replace(`<svg `,`<svg data-part="glyph-${e.key}"${e.key===`delete`?` data-subject`:``} style="width: ${i}px; height: ${i}px" `)}
    </span>
    <span class="sp-label" style="font-size: 11px; line-height: 14px; height: 14px">${e.label}</span>
  </div>`;function u(a){let u=Array.from({length:5},(e,t)=>{let n=t*o/4;return`<line x1="${n}" y1="0" x2="${n}" y2="${o}" /><line x1="0" y1="${n}" x2="${o}" y2="${n}" />`}).join(``);a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading" style="font-size: 13px">Icon set</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="sizer" data-axis="Size" data-value="${i}">
            ${r.map(e=>`<button class="sp-segment" type="button" data-part="seg-${e}" value="${e}" style="padding: 4px 11px; font-size: 12px">${e}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-row" style="margin-top: 12px; gap: 14px; align-items: center">
          <div class="sp-surface" style="flex: 1 1 auto; min-width: 0; padding: 14px 8px">
            <div class="sp-row" data-part="row" data-size="${i}" style="gap: 6px">
              ${n.map(l).join(``)}
            </div>
          </div>
          <div class="sp-stack sp-context" style="flex: 0 0 auto; align-items: center; gap: 5px">
            <div style="position: relative; width: ${s}px; height: ${s}px">
              <svg viewBox="0 0 ${o} ${o}" width="${s}" height="${s}" aria-hidden="true" style="position: absolute; inset: 0">
                <g stroke="var(--sp-line)" stroke-width="0.3">${u}</g>
                <rect x="2" y="2" width="20" height="20" fill="none" stroke="var(--sp-accent)" stroke-width="0.4" stroke-dasharray="1.4 1.2" />
                <circle cx="12" cy="12" r="10" fill="none" stroke="var(--sp-muted)" stroke-width="0.35" />
              </svg>
              ${t(`trash`).replace(`<svg `,`<svg data-part="magnified" style="position: absolute; inset: 0; width: ${s}px; height: ${s}px; stroke-width: 1.6" `)}
            </div>
            <span class="sp-label" style="font-size: 11px">24 unit grid, 20 unit live area</span>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="note" style="margin: 10px 0 0; height: 36px; font-size: 12px"></p>
      </div>
    </div>
  `;let d=e(a,`row`),f=e(a,`note`),p=n.map(t=>e(a,`glyph-${t.key}`)),m=e=>{if(r.includes(e)){d.dataset.size=e;for(let t of p)t.style.width=`${e}px`,t.style.height=`${e}px`;f.textContent=`Rendered at ${e} px. ${c[e]??``}`}};e(a,`sizer`).addEventListener(`change`,e=>m(e.detail)),m(i)}export{u as mount};