import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={off:`The sunset is a sunset, and the card sits on dark paint.`,classic:`The sky came back orange, and the card sits in a bright halo.`,smart:`The photograph was spared. The halo under the card is unchanged.`};function n(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 264px; padding: 12px 14px">
        <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="classic" data-axis="Invert" data-term="classic">
          <button class="sp-segment" type="button" data-part="seg-off" value="off">Off</button>
          <button class="sp-segment" type="button" data-part="seg-classic" value="classic">Classic</button>
          <button class="sp-segment" type="button" data-part="seg-smart" value="smart">Smart</button>
        </sp-segmented>
        <p data-stage-verdict data-part="verdict" data-mode="classic">${t.classic}</p>

        <div class="sp-frame" data-part="screen" data-mode="classic"
             style="width: 236px; height: 226px; padding: 12px; gap: 9px;
                    background: var(--sp-bg); filter: invert(1); transition: filter 0.3s ease">
          <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">Reading list</span>

          <div style="flex: 0 0 auto; padding: 10px; border-radius: var(--sp-radius);
                      background: var(--sp-surface); border: 1px solid var(--sp-line);
                      box-shadow: 0 8px 22px rgb(16 24 40 / 0.42)">
            <div data-part="photo" data-subject data-invert="classic" data-pose="[data-invert=classic]"
                 style="position: relative; height: 78px; border-radius: 6px; overflow: hidden;
                        background: linear-gradient(180deg, #74b6e4 0%, #ffd39c 60%, #ea9a5c 100%)">
              <span style="position: absolute; left: 24px; top: 13px; width: 24px; height: 24px;
                           border-radius: 50%; background: #fff2c2"></span>
              <span style="position: absolute; left: -24px; bottom: 0; width: 150px; height: 40px;
                           border-radius: 50% 50% 0 0; background: #4f6b4c"></span>
              <span style="position: absolute; right: -20px; bottom: 0; width: 130px; height: 30px;
                           border-radius: 50% 50% 0 0; background: #3a5540"></span>
            </div>
            <p class="sp-text sp-text--ink" style="margin: 8px 0 0; font-size: 12.5px; font-weight: 600">
              The long way to Cape Wrath</p>
            <p class="sp-text" style="margin: 3px 0 0; font-size: 11px">Nine days on foot, saved for later</p>
            <div class="sp-row" style="gap: 8px; margin-top: 9px">
              <button class="sp-button sp-button--sm" type="button" style="font-size: 11.5px">Read now</button>
              <button class="sp-button sp-button--quiet sp-button--sm" type="button"
                      style="font-size: 11.5px">Remove</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let r=e(n,`screen`),i=e(n,`photo`),a=e(n,`verdict`),o=e=>{r.dataset.mode=e,r.style.filter=e===`off`?`none`:`invert(1)`,i.dataset.invert=e,i.style.filter=e===`smart`?`invert(1)`:`none`,a.dataset.mode=e,a.textContent=t[e]};e(n,`mode`).addEventListener(`change`,e=>{o(e.detail)}),o(`classic`)}export{n as mount};