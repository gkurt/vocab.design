import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={page:`#F4F6FA`,card:`#FFFFFF`,line:`#D8DEE9`,ink:`#1B2130`,muted:`#5A6474`,fill:`#3557E8`,fillInk:`#FFFFFF`,fillLine:`#3557E8`,sel:`#E4E9FD`,selInk:`#1B2130`,shadow:`0 2px 6px rgb(16 24 40 / 0.16)`},n={night:{page:`#000000`,card:`#000000`,line:`#FFFFFF`,ink:`#FFFFFF`,muted:`#FFFFFF`,fill:`#000000`,fillInk:`#FFFFFF`,fillLine:`#FFFFFF`,sel:`#1AEBFF`,selInk:`#000000`,shadow:`none`},desert:{page:`#FFFAEF`,card:`#FFFAEF`,line:`#3D3D3D`,ink:`#3D3D3D`,muted:`#3D3D3D`,fill:`#FFFAEF`,fillInk:`#3D3D3D`,fillLine:`#3D3D3D`,sel:`#9D3B00`,selInk:`#FFFAEF`,shadow:`none`}},r={night:`Night sky`,desert:`Desert`},i=`night`,a={"--f-page":`page`,"--f-card":`card`,"--f-line":`line`,"--f-ink":`ink`,"--f-muted":`muted`,"--f-fill":`fill`,"--f-fill-ink":`fillInk`,"--f-fill-line":`fillLine`,"--f-sel":`sel`,"--f-sel-ink":`selInk`,"--f-shadow":`shadow`},o=(e,t)=>Object.entries(a).map(([n,r])=>`${n.replace(`--f-`,t)}: ${e[r]}`).join(`; `);function s(s){let c=(e,t,n,a)=>`
    <div style="flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; gap: 4px">
      <div data-part="${t}" ${n?`data-subject data-theme="${i}"`:``}
           style="${o(a,e)}; padding: 9px; border-radius: var(--sp-radius);
                  border: 1px solid var(${e}line); background: var(${e}page)">
        <span style="font-size: 12px; font-weight: 600; color: var(${e}ink)">Filters</span>
        <div style="margin-top: 6px; padding: 5px; border-radius: 6px; background: var(${e}card);
                    border: 1px solid var(${e}line); box-shadow: var(${e}shadow)">
          <div data-part="${t}-selected" style="padding: 3px 6px; border-radius: 4px; font-size: 11px;
               background: var(${e}sel); color: var(${e}sel-ink)">Unread only</div>
          <div style="padding: 3px 6px; font-size: 11px; color: var(${e}ink)">Has attachment</div>
        </div>
        <div class="sp-row" style="margin-top: 7px; gap: 8px">
          <span data-part="${t}-primary" style="padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 500;
                background: var(${e}fill); color: var(${e}fill-ink); border: 1px solid var(${e}fill-line)">Apply</span>
          <span style="padding: 4px 10px; border-radius: 6px; font-size: 11px;
                background: transparent; color: var(${e}ink); border: 1px solid var(${e}line)">Reset</span>
        </div>
      </div>
      <span class="sp-label" data-part="${t}-name" style="font-size: 10px">${n?`Forced, ${r[i]}`:`As authored`}</span>
    </div>`,l=[`Page and card → one Canvas`,`Card shadow → dropped`,`Accent fill → ButtonFace and a border`,`Selected row → Highlight`].map(e=>`<span class="sp-text" style="flex: 0 0 176px; font-size: 10.5px; line-height: 1.3">${e}</span>`).join(``);s.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 424px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Contrast theme" data-part="segmented" data-value="${i}">
            <button class="sp-segment" data-part="seg-night" value="night">Night sky</button>
            <button class="sp-segment" data-part="seg-desert" value="desert">Desert</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 10px; align-items: flex-start">
          <div class="sp-context" style="display: flex; flex: 1 1 0; min-width: 0">${c(`--a-`,`authored`,!1,t)}</div>
          ${c(`--f-`,`forced`,!0,n[i]??t)}
        </div>

        <div class="sp-stack sp-context" style="gap: 3px; margin-top: 9px">
          <span class="sp-label" style="font-size: 10px">Substitutions</span>
          <div class="sp-row sp-row--wrap" data-part="mapping" style="gap: 2px 14px">${l}</div>
        </div>
      </div>
    </div>
  `;let u=e(s,`forced`),d=e(s,`forced-name`),f=e=>{let t=n[e];if(t){u.dataset.theme=e;for(let[e,n]of Object.entries(a))u.style.setProperty(e,t[n]);d.textContent=`Forced, ${r[e]??e}`}};f(i),e(s,`segmented`).addEventListener(`change`,e=>f(e.detail))}export{s as mount};