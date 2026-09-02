import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`<svg class="sp-icon" viewBox="0 0 24 24" aria-hidden="true" style="width: 13px; height: 13px"><path d="M4 9.5h3L11 6.5v11L7 14.5H4z"/><path d="m15.5 9.5 4.5 5M20 9.5l-4.5 5"/></svg>`,n={glare:`Low sun on the screen: the skip control is grey on grey, and against the wash it is not there at all.`,reach:`One arm holding a sleeping child: the skip control sits outside the arc a thumb covers without regripping.`,mute:`A silenced phone in a full carriage: skipping confirms with a chime, so the press answers with nothing.`};function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 200px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Moment" data-part="condition" data-value="glare" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-glare" value="glare"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Glare</button>
            <button class="sp-segment" type="button" data-part="seg-reach" value="reach"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">One hand</button>
            <button class="sp-segment" type="button" data-part="seg-mute" value="mute"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Silenced</button>
          </sp-segmented>
        </div>

        <div class="sp-frame" data-part="phone" style="width: 172px; height: 204px; margin-top: 10px">
            <div class="sp-topbar sp-context" style="padding: 6px 9px; gap: 6px">
              <span class="sp-label" style="font-size: 10px">Nightbus FM</span>
            </div>

            <div data-part="stage-art" style="position: relative; flex: 1 1 auto;
                 background: linear-gradient(155deg, #cfd6e2 0%, #e7ebf2 55%, #d8dee8 100%)">
              <button class="sp-button" type="button" data-part="skip" data-subject
                      style="position: absolute; top: 9px; right: 9px; padding: 3px 9px; font-size: 11px;
                             background: transparent; color: #b6bcc6;
                             border: 1px solid rgb(255 255 255 / 0.5)">Skip intro</button>
              <div class="sp-row" data-part="silence"
                   style="position: absolute; left: 9px; bottom: 9px; gap: 6px; padding: 3px 8px;
                          border-radius: 999px; background: var(--sp-surface); color: var(--sp-ink);
                          font-size: 10.5px; opacity: 0; visibility: hidden;
                          transition: opacity 0.22s, visibility 0.22s">
                ${t}<span style="white-space: nowrap">chime unheard</span>
              </div>
            </div>

            <div class="sp-stack sp-context" style="flex: 0 0 auto; gap: 5px; padding: 9px">
              <span class="sp-text sp-text--ink" style="font-size: 11.5px; font-weight: 500">Late Shift, ep. 214</span>
              <div class="sp-progress" style="height: 4px"><div class="sp-progress-fill" style="--sp-value: 22%"></div></div>
            </div>

            <div data-part="reach" style="position: absolute; inset: 0; opacity: 0; visibility: hidden;
                 transition: opacity 0.22s, visibility 0.22s; pointer-events: none;
                 background:
                   radial-gradient(circle 128px at 106% 116%, transparent 0 122px,
                     var(--sp-accent) 122px 124px, transparent 124px),
                   radial-gradient(circle 128px at 106% 116%, rgb(53 87 232 / 0.16) 0 122px, transparent 122px)">
              <span class="sp-label" style="position: absolute; right: 10px; bottom: 54px; font-size: 10px">thumb arc</span>
            </div>

            <div data-part="glare" style="position: absolute; inset: 0; opacity: 0; visibility: hidden;
                 transition: opacity 0.22s, visibility 0.22s; pointer-events: none;
                 background: linear-gradient(118deg, rgb(255 255 255 / 0.88) 6%, rgb(255 255 255 / 0.62) 44%,
                 rgb(255 255 255 / 0.1) 88%)"></div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="verdict" data-mode="glare"
           style="margin: 8px 0 0; font-size: 11.5px; line-height: 1.35">${n.glare}</p>
      </div>
    </div>
  `;let i={glare:e(r,`glare`),reach:e(r,`reach`),mute:e(r,`silence`)},a=e(r,`verdict`),o=e=>{for(let[t,n]of Object.entries(i)){if(!n)continue;let r=t===e;n.style.opacity=r?`1`:`0`,n.style.visibility=r?`visible`:`hidden`}a.dataset.mode=e,a.textContent=n[e]};e(r,`condition`).addEventListener(`change`,e=>{o(e.detail)}),o(`glare`)}export{r as mount};