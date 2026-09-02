import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=480,n={stock:{role:`carousel`,attribute:`not set`,verdict:`platform wording`},honest:{role:`slide reel`,attribute:`"slide reel"`,verdict:`author wording`},lying:{role:`video player`,attribute:`"video player"`,verdict:`misleading, a failure`}},r=`Product tour`;function i(i,a){let o=e=>`
    <div class="sp-surface" style="width: 96px; height: 52px; display: flex; align-items: center;
                                   justify-content: center; background: var(--sp-sunken)">
      <span class="sp-label" style="font-size: 10.5px">Slide ${e}</span>
    </div>`,s=e=>`
    <span style="width: 6px; height: 6px; border-radius: 50%;
                 background: ${e?`var(--sp-accent)`:`var(--sp-line)`}"></span>`;i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="aria-roledescription" data-part="source" data-value="honest">
            <button class="sp-segment" type="button" data-part="seg-stock" value="stock"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Not set</button>
            <button class="sp-segment" type="button" data-part="seg-honest" value="honest"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Slide reel</button>
            <button class="sp-segment" type="button" data-part="seg-lying" value="lying"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Video player</button>
          </sp-segmented>
        </div>

        <div class="sp-surface sp-context" data-part="reel" role="group" aria-label="${r}"
             aria-roledescription="slide reel" style="margin-top: 10px; padding: 9px 10px">
          <div class="sp-row" style="gap: 8px; justify-content: center">
            ${o(1)}${o(2)}${o(3)}
          </div>
          <div class="sp-row" style="gap: 5px; justify-content: center; margin-top: 8px">
            ${s(!0)}${s(!1)}${s(!1)}
          </div>
        </div>

                              <span class="sp-label" data-stage-verdict data-part="verdict"
                  style="flex: 0 0 auto; width: 132px; text-align: right; font-size: 10px">${n.honest.verdict}</span>
          
          <p class="sp-text sp-text--ink" data-stage-announce data-part="utterance" data-state="spoken"
             style="margin: 4px 0 0; height: 22px; line-height: 22px; font-size: 12px;
                    white-space: nowrap">“${r}, <span data-part="role" data-subject data-source="honest"
              style="font-weight: 600">${n.honest.role}</span>”</p>
        
      </div>
    </div>
  `;let c=e(i,`reel`),l=e(i,`utterance`),u=e(i,`role`),d=e(i,`verdict`),f,p=e=>{let r=n[e];e===`stock`?c.removeAttribute(`aria-roledescription`):c.setAttribute(`aria-roledescription`,r.role),c.dataset.source=e,a.clearTimeout(f),l.dataset.state=`queued`,f=a.setTimeout(()=>{l.dataset.state=`spoken`,u.dataset.source=e,u.textContent=r.role,d.textContent=r.verdict},t)};e(i,`source`).addEventListener(`change`,e=>{p(e.detail)})}export{i as mount};