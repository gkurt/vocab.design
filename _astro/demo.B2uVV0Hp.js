import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={indigo:`#4C4CE0`,teal:`#0F8F84`,crimson:`#C7365A`},n=`indigo`,r=[{key:`hover`,role:`hover`,expr:`oklch(from var(--brand) calc(l + 0.1) c h)`},{key:`pressed`,role:`pressed`,expr:`oklch(from var(--brand) calc(l - 0.08) c h)`},{key:`disabled`,role:`disabled`,expr:`oklch(from var(--brand) l calc(c * 0.2) h)`},{key:`wash`,role:`wash`,expr:`rgb(from var(--brand) r g b / 25%)`}];function i(i){let a=r.map(e=>`
      <div class="sp-row" data-part="row-${e.key}" style="gap: 8px; height: 24px">
        <span class="sp-label" style="flex: 0 0 52px; font-size: 10px">${e.role}</span>
        <span class="sp-swatch" data-part="swatch-${e.key}"
              style="flex: 0 0 36px; height: 20px; box-shadow: inset 0 0 0 1px rgb(16 24 40 / 0.12); --sp-swatch: ${e.expr}"></span>
        <span class="sp-text sp-text--ink" style="flex: 1 1 auto; min-width: 0; font-size: 10.5px; white-space: nowrap">${e.expr}</span>
      </div>`).join(``);i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" data-part="scope" style="width: 430px; --brand: ${t[n]}">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Seed token" data-part="segmented" data-value="${n}">
            <button class="sp-segment" data-part="seg-indigo" value="indigo">Indigo</button>
            <button class="sp-segment" data-part="seg-teal" value="teal">Teal</button>
            <button class="sp-segment" data-part="seg-crimson" value="crimson">Crimson</button>
          </sp-segmented>
        </div>

        <div class="sp-row sp-context" style="gap: 8px; margin-top: 11px; height: 22px">
          <span class="sp-label" style="flex: 0 0 52px; font-size: 10px">origin</span>
          <span class="sp-swatch" data-part="seed-chip"
                style="flex: 0 0 36px; height: 20px; box-shadow: inset 0 0 0 1px rgb(16 24 40 / 0.12); --sp-swatch: var(--brand)"></span>
          <span class="sp-text sp-text--ink" data-part="seed-value" style="font-size: 10.5px">--brand: ${t[n]}</span>
        </div>

        <div class="sp-surface sp-stack" data-part="rows" data-subject data-seed="${n}"
             style="gap: 6px; margin-top: 10px; padding: 11px 12px">${a}</div>

      </div>
    </div>
  `;let o=e(i,`scope`),s=e(i,`rows`),c=e(i,`seed-value`),l=e=>{let n=t[e];n&&(o.style.setProperty(`--brand`,n),s.dataset.seed=e,c.textContent=`--brand: ${n}`)};l(n),e(i,`segmented`).addEventListener(`change`,e=>l(e.detail))}export{i as mount};