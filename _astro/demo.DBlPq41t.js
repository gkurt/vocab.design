import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={ledger:{name:`Ledger`,mark:`L`,seed:`#3B4FE4`},ember:{name:`Ember`,mark:`E`,seed:`#E2523B`},fern:{name:`Fern`,mark:`F`,seed:`#14795A`}},n=`ledger`,r=`#14161A`,i=(e,t)=>Number.parseInt(e.slice(t,t+2),16)/255,a=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,o=e=>.2126*a(i(e,1))+.7152*a(i(e,3))+.0722*a(i(e,5)),s=(e,t)=>{let[n,r]=[o(e),o(t)].sort((e,t)=>t-e);return((n??0)+.05)/((r??0)+.05)},c=e=>s(e,`#FFFFFF`)>=s(e,r)?`#FFFFFF`:r;function l(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="${n}" data-axis="Brand" style="margin-left: auto">
            <button class="sp-segment" data-part="seg-ledger" value="ledger">Ledger</button>
            <button class="sp-segment" data-part="seg-ember" value="ember">Ember</button>
            <button class="sp-segment" data-part="seg-fern" value="fern">Fern</button>
          </sp-segmented>
        </div>

        <div data-part="panel" data-subject data-brand="${n}"
             style="margin-top: 12px; padding: 12px; border-radius: var(--sp-radius);
                    border: 1px solid var(--sp-line); background: var(--sp-bg)">
          <div class="sp-row" style="gap: 8px">
            <span data-part="mark"
                  style="display: inline-flex; align-items: center; justify-content: center; width: 26px; height: 26px;
                         border-radius: 7px; font-size: 13px; font-weight: 700"></span>
            <span class="sp-heading" data-part="name" style="font-size: 14px"></span>
            <span class="sp-grow"></span>
            <span data-part="link" style="font-size: 12px; font-weight: 500; text-decoration: underline">Pricing</span>
          </div>

          <div data-part="tint" style="margin-top: 10px; padding: 9px 10px; border-radius: 6px; height: 52px;
                                       border: 1px solid var(--sp-line)">
            <span style="font-size: 12px; font-weight: 600">Two seats left on this plan</span>
            <span class="sp-text" style="display: block; margin-top: 2px; font-size: 11px">Renews on 3 March</span>
          </div>

          <div class="sp-row" style="gap: 8px; margin-top: 10px">
            <span data-part="primary" style="padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 500">Upgrade</span>
            <span style="padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 500;
                         border: 1px solid var(--sp-line); color: var(--sp-muted)">Compare</span>
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 10px">
          <span class="sp-row" style="gap: 6px">
            <span class="sp-swatch" data-part="seed-chip" style="width: 14px; height: 14px"></span>
            <span class="sp-text" data-part="seed-hex" style="font-size: 11px">&nbsp;</span>
          </span>
          <span class="sp-row" style="gap: 6px">
            <span class="sp-text" data-part="on-hex" style="font-size: 11px">&nbsp;</span>
            <span class="sp-swatch" data-part="on-chip" style="width: 14px; height: 14px; box-shadow: inset 0 0 0 1px var(--sp-line)"></span>
          </span>
        </div>

      </div>
    </div>
  `;let i=e(r,`panel`),a=e(r,`mark`),o=e(r,`primary`),s=e(r,`link`),l=e(r,`tint`),u=n=>{let u=t[n];if(!u)return;let d=c(u.seed);i.dataset.brand=n,a.style.background=u.seed,a.style.color=d,a.textContent=u.mark,e(r,`name`).textContent=u.name,o.style.background=u.seed,o.style.color=d,s.style.color=`color-mix(in oklab, ${u.seed} 74%, var(--sp-ink))`,l.style.background=`color-mix(in oklab, ${u.seed} 12%, var(--sp-surface))`,e(r,`seed-chip`).style.setProperty(`--sp-swatch`,u.seed),e(r,`seed-hex`).textContent=`seed ${u.seed}`,e(r,`on-chip`).style.setProperty(`--sp-swatch`,d),e(r,`on-hex`).textContent=`on-brand ${d}`};u(n),e(r,`segmented`).addEventListener(`change`,e=>u(e.detail))}export{l as mount};