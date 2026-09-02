import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={active:{mica:`#e2d6f1`,layer:`rgb(255 255 255 / 0.66)`,note:`Tint sampled from the wallpaper`},inactive:{mica:`#f0f0f2`,layer:`rgb(255 255 255 / 0.72)`,note:`Neutral fallback, window inactive`}},n=`active`,r=`linear-gradient(130deg, #2f4bd4, #7b3fc0 46%, #e0703c)`,i=`rgb(16 24 40 / 0.22)`;function a(e,t){return`<span style="display: block; padding: 4px 7px; border-radius: 5px; font-size: 11px; ${t?`background: rgb(255 255 255 / 0.72); font-weight: 600`:``}">${e}</span>`}function o(o){let s=t[n];o.innerHTML=`
    <div class="sp-app" style="gap: 11px">
      <div class="sp-aurora sp-context" data-part="wallpaper" aria-hidden="true" style="--sp-aurora-wash: ${r}">
        <span class="sp-aurora-blob" style="left: -8%; top: -22%; --sp-blob: #ffd166; --sp-blob-size: 190px"></span>
        <span class="sp-aurora-blob" style="right: -10%; bottom: -26%; --sp-blob: #2ad4d8; --sp-blob-size: 200px"></span>
      </div>

      <div style="position: relative; display: flex; align-items: flex-start; gap: 16px">
        <div data-part="mica" data-subject data-focus="${n}"
             style="width: 210px; border-radius: 8px; overflow: hidden; border: 1px solid ${i};
                    box-shadow: 0 10px 24px rgb(16 24 40 / 0.34); color: #23262b;
                    background-color: ${s.mica}; transition: background-color 0.3s var(--sp-ease)">
          <div data-part="mica-titlebar"
               style="display: flex; align-items: center; gap: 8px; padding: 6px 9px; font-size: 11px; font-weight: 600">
            <span style="flex: 1 1 auto">Settings</span>
            <span aria-hidden="true" style="letter-spacing: 3px; opacity: 0.55">&minus;&#9633;&times;</span>
          </div>
          <div style="display: flex; gap: 8px; padding: 0 9px 10px">
            <div style="flex: 0 0 66px">
              ${a(`Display`,!0)}${a(`Sound`,!1)}${a(`Power`,!1)}
            </div>
            <div data-part="mica-layer"
                 style="flex: 1 1 auto; padding: 8px; border-radius: 6px; border: 1px solid rgb(16 24 40 / 0.08);
                        background: ${s.layer}; transition: background-color 0.3s var(--sp-ease)">
              <div style="font-size: 11px; font-weight: 600">Scale</div>
              <div style="margin-top: 3px; font-size: 10px; line-height: 1.45; opacity: 0.72">
                125% recommended. Sign out to apply the new size.
              </div>
            </div>
          </div>
        </div>

        <div class="sp-glass sp-context" data-part="acrylic" style="width: 132px; height: 92px; padding: 10px; border-radius: 8px">
          <div style="font-size: 11px; font-weight: 600">Acrylic</div>
        </div>
      </div>

      <div data-part="panel">
        <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="${n}" data-axis="Window">
          <button class="sp-segment" data-part="seg-active" value="active">Active</button>
          <button class="sp-segment" data-part="seg-inactive" value="inactive">Inactive</button>
        </sp-segmented>
        <span class="sp-text" data-stage-verdict data-part="readout" style="font-size: 11px">${s.note}</span>
      </div>
    </div>
  `;let c=e(o,`mica`),l=e(o,`mica-layer`),u=e(o,`readout`),d=e=>{let n=t[e];n&&(c.dataset.focus=e,c.style.backgroundColor=n.mica,l.style.background=n.layer,u.textContent=n.note)};e(o,`segmented`).addEventListener(`change`,e=>d(e.detail))}export{o as mount};