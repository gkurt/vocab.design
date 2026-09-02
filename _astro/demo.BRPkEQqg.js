import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={standard:{size:`8.5px`,color:`color-mix(in oklab, var(--sp-muted) 52%, var(--sp-surface))`,caption:`Two sizes down, contrast dropped toward the ground, and set after the button. Present, and below the threshold of attention.`},conspicuous:{size:`12px`,color:`var(--sp-ink)`,caption:`The same words, moved up beside the claim and set at a size a reader can hold: prominence, presentation, placement, proximity.`}};function n(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 436px; padding: 12px 15px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="standard"
                        data-axis="Qualifier" data-term="standard">
            <button class="sp-segment" data-part="seg-standard" value="standard"
                    style="padding: 5px 10px; font-size: 12px; white-space: nowrap">As shipped</button>
            <button class="sp-segment" data-part="seg-conspicuous" value="conspicuous"
                    style="padding: 5px 10px; font-size: 12px; white-space: nowrap">Conspicuous</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" style="margin-top: 9px; padding: 12px 14px">
          <div class="sp-context">
            <div style="font-size: 22px; font-weight: 650; line-height: 1.1; letter-spacing: -0.01em">Three months free</div>
            <div class="sp-text" style="margin-top: 4px">Pro, on us, on every device you own.</div>
          </div>

          <div data-part="slot-near" style="height: 26px; padding-top: 6px"></div>

          <div class="sp-row sp-context" style="margin-top: 2px">
            <button class="sp-button" type="button">Start free trial</button>
            <span class="sp-text" style="font-size: 11px">No card needed</span>
          </div>

          <div class="sp-divider sp-context" style="margin-top: 10px"></div>

          <div data-part="slot-foot" data-filled style="height: 26px; padding-top: 6px">
            <span class="sp-text" data-part="qualifier" data-subject data-set="standard" data-pose="[data-set=standard]"
                  style="display: block">Then $12 a month. Cancel any time before your renewal date.</span>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-set="standard"
           style="margin: 8px 0 0; height: 38px; font-size: 11px">${t.standard.caption}</p>
      </div>
    </div>
  `;let r=e(n,`qualifier`),i={conspicuous:e(n,`slot-near`),standard:e(n,`slot-foot`)},a=e(n,`caption`),o=e=>{let n=t[e];r.dataset.set=e,r.style.fontSize=n.size,r.style.color=n.color,i[e].append(r);for(let[t,n]of Object.entries(i))t===e?n.setAttribute(`data-filled`,``):n.removeAttribute(`data-filled`);a.dataset.set=e,a.textContent=n.caption};o(`standard`),e(n,`segmented`).addEventListener(`change`,e=>{o(e.detail)})}export{n as mount};