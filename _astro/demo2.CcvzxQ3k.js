import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=[{key:`light`,label:`Light`,page:`#F1F3F7`,card:`#FFFFFF`,ink:`#23262B`,muted:`#79808C`,outline:`#B9C0CC`,variant:`#E2E6EE`},{key:`dark`,label:`Dark`,page:`#14171C`,card:`#232830`,ink:`#E8EAEF`,muted:`#9098A6`,outline:`#49515F`,variant:`#333A45`}],n=`rgb(0 0 0 / 0.12)`,r=`rgb(0 0 0 / 0.07)`,i=`light`;function a(a){let o=t.find(e=>e.key===i)??t[0];if(!o)return;let s=(e,t,n,r)=>`
    <div class="sp-row sp-row--between" data-part="${n}" style="gap: 8px; height: 19px; font-size: 11px; color: ${r.muted}">
      <span>${e}</span><span style="color: ${r.ink}; font-variant-numeric: tabular-nums">${t}</span>
    </div>`,c=(e,t)=>{let a=e===`token`?t.outline:n,o=e===`token`?t.variant:r;return`
      <div data-part="${e}-card"${e===`token`?` data-subject data-surface="${i}"`:``} style="flex: 1 1 0; min-width: 0; padding: 10px 11px; border-radius: 8px;
           background: ${t.card}; border: 1px solid ${a}">
        <div data-part="${e}-title" style="font-size: 11.5px; font-weight: 600; color: ${t.ink}">Sessions</div>
        <div style="margin-top: 6px">
          ${s(`Today`,`12`,`${e}-row-a`,t)}
          <div data-part="${e}-rule" style="height: 1px; background: ${o}"></div>
          ${s(`This week`,`48`,`${e}-row-b`,t)}
        </div>
      </div>`};a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 444px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="${i}" data-axis="Surface">
            ${t.map(e=>`<button class="sp-segment" data-part="seg-${e.key}" value="${e.key}">${e.label}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div data-part="panel" style="margin-top: 12px; padding: 12px; border-radius: var(--sp-radius);
             background: ${o.page}; box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.35)">
          <div class="sp-row" style="gap: 12px; align-items: stretch">
            ${c(`token`,o)}
            ${c(`ink`,o)}
          </div>
          <div class="sp-row" style="gap: 12px; margin-top: 6px">
            <span data-part="label-token" style="flex: 1 1 0; font-size: 10.5px; color: ${o.muted}">Border token</span>
            <span data-part="label-ink" style="flex: 1 1 0; font-size: 10.5px; color: ${o.muted}">Ink at 12 percent</span>
          </div>
        </div>

        <div class="sp-row sp-context" style="gap: 18px; margin-top: 9px">
          <div class="sp-row" style="gap: 7px">
            <span class="sp-swatch" data-part="chip-outline" style="flex: 0 0 auto; width: 12px; height: 12px; border-radius: 3px;
                  box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.4); --sp-swatch: ${o.outline}"></span>
            <span class="sp-text" style="font-size: 10.5px">--outline</span>
            <span class="sp-text sp-text--ink" data-part="value-outline" style="font-size: 10.5px">${o.outline}</span>
          </div>
          <div class="sp-row" style="gap: 7px">
            <span class="sp-swatch" data-part="chip-variant" style="flex: 0 0 auto; width: 12px; height: 12px; border-radius: 3px;
                  box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.4); --sp-swatch: ${o.variant}"></span>
            <span class="sp-text" style="font-size: 10.5px">--outline-variant</span>
            <span class="sp-text sp-text--ink" data-part="value-variant" style="font-size: 10.5px">${o.variant}</span>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin: 8px 0 0; height: 28px; font-size: 10.5px; line-height: 1.35">
          A translucent border is not a colour, it is a recipe, and its answer changes with every surface it lands on.
          A named role is decided once per theme.
        </p>
      </div>
    </div>
  `;let l=e(a,`token-card`),u=i=>{let o=t.find(e=>e.key===i);if(!o)return;l.dataset.surface=i,e(a,`panel`).style.background=o.page,l.style.background=o.card,l.style.borderColor=o.outline,e(a,`token-rule`).style.background=o.variant;let s=e(a,`ink-card`);s.style.background=o.card,s.style.borderColor=n,e(a,`ink-rule`).style.background=r;for(let t of[`token`,`ink`]){e(a,`${t}-title`).style.color=o.ink;for(let n of[`row-a`,`row-b`]){let r=e(a,`${t}-${n}`);r.style.color=o.muted;let i=r.lastElementChild;i&&(i.style.color=o.ink)}}e(a,`label-token`).style.color=o.muted,e(a,`label-ink`).style.color=o.muted,e(a,`chip-outline`).style.setProperty(`--sp-swatch`,o.outline),e(a,`chip-variant`).style.setProperty(`--sp-swatch`,o.variant),e(a,`value-outline`).textContent=o.outline,e(a,`value-variant`).textContent=o.variant};u(i),e(a,`segmented`).addEventListener(`change`,e=>u(e.detail))}export{a as mount};