import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n={light:{name:`Light`,surface:`#FFFFFF`,onSurface:`#1B1E24`,onSurfaceMuted:`#6B7280`,line:`#E3E6EC`,inverseSurface:`#2F323A`,inverseOnSurface:`#F1F2F6`,inversePrimary:`#A9BEFF`,tone:`dark`},dark:{name:`Dark`,surface:`#1B1E24`,onSurface:`#E9EBEF`,onSurfaceMuted:`#8E95A2`,line:`#333842`,inverseSurface:`#EDEFF4`,inverseOnSurface:`#23262C`,inversePrimary:`#2F49B4`,tone:`light`}},r=`light`,i=[{title:`Weekly digest`,meta:`2 min ago`},{title:`Deploy finished`,meta:`18 min ago`}];function a(a){let o=n[r]??n.light;if(!o)throw Error(`unknown theme`);a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 13px 18px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="App theme" data-value="${r}">
            ${Object.entries(n).map(([e,t])=>`<button class="sp-segment" data-part="seg-${e}" value="${e}">${t.name}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div data-part="scene" data-theme="${r}"
             style="position: relative; height: 168px; margin-top: 10px; border-radius: 10px; overflow: hidden;
                    border: 1px solid var(--app-line); background: var(--app-surface)">
          <div class="sp-context" data-part="app">
            <div class="sp-row sp-row--between" style="height: 34px; padding: 0 12px; border-bottom: 1px solid var(--app-line)">
              <span style="font-size: 13px; font-weight: 600; color: var(--app-ink)">Notifications</span>
              <span style="display: flex; color: var(--app-muted)">${t(`sliders`)}</span>
            </div>
            ${i.map((e,t)=>`
    <div class="sp-row" data-part="row-${t}" style="height: 38px; gap: 9px; padding: 0 12px;
         border-top: ${t===0?`0`:`1px`} solid var(--app-line)">
      <span data-part="row-dot-${t}" style="flex: 0 0 18px; height: 18px; border-radius: 50%; background: var(--app-line)"></span>
      <span class="sp-grow" style="font-size: 12px; color: var(--app-ink)">${e.title}</span>
      <span style="font-size: 10.5px; color: var(--app-muted)">${e.meta}</span>
    </div>`).join(``)}
          </div>

          <div class="sp-row sp-row--between" data-part="snackbar" data-subject data-tone="${o.tone}"
               style="position: absolute; left: 14px; right: 14px; bottom: 14px; height: 42px; padding: 0 8px 0 14px;
                      gap: 10px; border-radius: 9px; background: var(--app-inverse-surface); box-shadow: var(--sp-shadow)">
            <span data-part="snack-message" style="font-size: 12px; color: var(--app-inverse-ink)">Message moved to Archive</span>
            <span data-part="snack-action" style="font-size: 12px; font-weight: 600; padding: 5px 9px; border-radius: 6px;
                  color: var(--app-inverse-accent)">Undo</span>
          </div>
        </div>

        <div class="sp-context" style="margin-top: 8px; height: 30px; font-size: 10px; line-height: 1.5;
             font-variant-numeric: tabular-nums; color: var(--sp-muted)">
          <div data-part="readout-app" style="white-space: nowrap"></div>
          <div data-part="readout-inverse" style="white-space: nowrap"></div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin: 6px 0 0; height: 28px; font-size: 10.5px; line-height: 1.4">
          Both themes declare the inverse trio themselves. Nothing here is computed by inverting the ordinary roles.
        </p>
      </div>
    </div>
  `;let s=e(a,`scene`),c=e(a,`snackbar`),l=e(a,`readout-app`),u=e(a,`readout-inverse`),d=e=>{let t=n[e]??n.light;if(!t)return;s.dataset.theme=e,c.dataset.tone=t.tone;let r={"--app-surface":t.surface,"--app-ink":t.onSurface,"--app-muted":t.onSurfaceMuted,"--app-line":t.line,"--app-inverse-surface":t.inverseSurface,"--app-inverse-ink":t.inverseOnSurface,"--app-inverse-accent":t.inversePrimary};for(let[e,t]of Object.entries(r))s.style.setProperty(e,t);l.textContent=`surface ${t.surface} / on-surface ${t.onSurface}`,u.textContent=`inverse-surface ${t.inverseSurface} / inverse-on-surface ${t.inverseOnSurface} / inverse-primary ${t.inversePrimary}`};d(r),e(a,`segmented`).addEventListener(`change`,e=>d(e.detail))}export{a as mount};