import{t as e}from"./icons.CLHbLdSV.js";var t=`rgb(0 0 0 / 0.32)`,n=`linear-gradient(180deg, rgb(255 255 255 / 0.86) 0, rgb(255 255 255 / 0.34) 47%, rgb(255 255 255 / 0.03) 48%, rgb(255 255 255 / 0.2) 100%)`,r=`linear-gradient(180deg, rgb(0 0 0 / 0) 0, rgb(0 0 0 / 0.22) 100%)`;function i(e,i){return[`background-color: ${e}`,`background-image: ${n}, ${r}`,`border: 1px solid ${t}`,`border-radius: ${i}`,`box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.65), 0 2px 3px rgb(16 24 40 / 0.3)`,`color: #ffffff`,`text-shadow: 0 -1px 0 rgb(0 0 0 / 0.34)`].join(`; `)}function a(e,n){return[`background-color: ${e}`,`border: 1px solid ${t}`,`border-radius: ${n}`,`color: #ffffff`].join(`; `)}function o(e,t,n){return`
    <div class="sp-stack" style="gap: 5px; align-items: center">
      <span data-part="${e}" aria-hidden="true"
            style="width: 96px; height: 30px; border-radius: 6px; ${n}"></span>
      <span class="sp-label" style="font-size: 11px">${t}</span>
    </div>`}function s(s){let c=`#2f7fe8`,l=(t,n)=>{let r=t===`gloss`?i:a;return`
      <span class="sp-row" data-part="${n}"${t===`gloss`?` data-subject`:``} style="gap: 13px">
        <button type="button" data-part="${n}-button"
                style="${r(c,`999px`)}; padding: 7px 17px 8px; font: inherit; font-size: 13px; font-weight: 600; cursor: pointer">
          Download
        </button>
        <span data-part="${n}-icon" aria-hidden="true"
              style="${r(`#e8842f`,`11px`)}; display: flex; align-items: center; justify-content: center; width: 42px; height: 42px">
          ${e(`star`,`sp-icon--filled`)}
        </span>
      </span>`};s.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div class="sp-window" style="width: 406px; padding: 14px 18px 16px">
        <div class="sp-row" style="align-items: flex-start; gap: 20px">
          <div class="sp-stack" style="flex: 1 1 0; gap: 8px">
            <span class="sp-label" data-part="title-gloss" style="color: var(--sp-ink)">Gloss</span>
            ${l(`gloss`,`glossy`)}
          </div>
          <div class="sp-stack sp-context" style="flex: 1 1 0; gap: 8px">
            <span class="sp-label" data-part="title-matte">Matte</span>
            ${l(`matte`,`matte`)}
          </div>
        </div>

        <div class="sp-divider" style="margin: 14px 0 11px"></div>

        <div class="sp-row sp-context" data-part="anatomy" style="gap: 10px; justify-content: space-between">
          ${o(`layer-body`,`Deep body`,`background-color: ${c}; background-image: ${r}; border: 1px solid ${t}`)}
          ${o(`layer-band`,`Specular band`,`background-image: ${n}; border: 1px solid var(--sp-line); background-color: #9aa3b2`)}
          ${o(`layer-all`,`Both layers`,`${i(c,`6px`)}`)}
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 406px; margin: 0; text-align: center">
        The wash stops dead at the waist. Let it taper and the control is merely shaded.
      </p>
    </div>
  `}export{s as mount};