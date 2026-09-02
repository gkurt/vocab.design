import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n={default:{surface:`#FFFFFF`,"on-surface":`#1B2130`,outline:`#C9D0DE`,primary:`#3557E8`,"on-primary":`#FFFFFF`,error:`#C2312B`},forest:{surface:`#F1F7F1`,"on-surface":`#14261A`,outline:`#BCD2BF`,primary:`#2F7D4F`,"on-primary":`#FFFFFF`,error:`#A6402A`},plum:{surface:`#241E2E`,"on-surface":`#F1ECFA`,outline:`#4A3F5C`,primary:`#C79BFF`,"on-primary":`#241033`,error:`#FF9A9A`}},r=[`surface`,`on-surface`,`outline`,`primary`,`on-primary`,`error`],i=`default`;function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Scheme" data-part="segmented" data-value="${i}">
            <button class="sp-segment" data-part="seg-default" value="default">Default</button>
            <button class="sp-segment" data-part="seg-forest" value="forest">Forest</button>
            <button class="sp-segment" data-part="seg-plum" value="plum">Plum</button>
          </sp-segmented>
        </div>

        <div data-part="card" data-subject data-scheme="${i}"
             style="margin-top: 14px; padding: 14px; border-radius: var(--sp-radius); ${(e=>r.map(t=>`--r-${t}: ${n[e]?.[t]}`).join(`; `))(i)};
                    background: var(--r-surface); border: 1px solid var(--r-outline); color: var(--r-on-surface)">
          <div class="sp-row sp-row--between">
            <span class="sp-heading" style="color: var(--r-on-surface)">on-surface</span>
            <span class="sp-row" data-part="error-row" style="gap: 4px; color: var(--r-error); font-size: 12px; font-weight: 500">
              ${t(`alert`)}error
            </span>
          </div>

          <p class="sp-text" style="margin: 6px 0 0; color: var(--r-on-surface); opacity: 0.7">
            on-surface at 70%
          </p>

          <div style="height: 1px; margin: 12px 0; background: var(--r-outline)"></div>

          <div class="sp-row" style="gap: 8px">
            <button class="sp-button sp-button--sm" data-part="cta"
                    style="background: var(--r-primary); color: var(--r-on-primary)">on-primary</button>
            <button class="sp-button sp-button--sm" data-part="ghost"
                    style="background: transparent; border: 1px solid var(--r-outline); color: var(--r-on-surface)">outline</button>
            <span class="sp-grow"></span>
            <span class="sp-label" style="color: var(--r-on-surface); opacity: 0.6">surface</span>
          </div>
        </div>

      </div>
    </div>
  `;let o=e(a,`card`),s=e=>{let t=n[e];if(t){o.dataset.scheme=e;for(let e of r)o.style.setProperty(`--r-${e}`,t[e]??``)}};s(i),e(a,`segmented`).addEventListener(`change`,e=>s(e.detail))}export{a as mount};