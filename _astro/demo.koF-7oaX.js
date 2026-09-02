import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={waffle:`waffle`,office:`office`,stiff:`stiff`};function n(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 420px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Ligatures</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Cluster" data-part="segmented" data-value="waffle">
            <button class="sp-segment" data-part="seg-waffle" value="waffle">ffl</button>
            <button class="sp-segment" data-part="seg-office" value="office">ffi</button>
            <button class="sp-segment" data-part="seg-stiff" value="stiff">ff</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="align-items: flex-start; gap: 14px; margin-top: 16px">
          <div class="sp-stack" style="gap: 6px; width: 180px">
            <span class="sp-label sp-context">liga on</span>
            <div data-part="lig-on" data-subject data-word="waffle"
                 style="font-size: 54px; line-height: 1.25; font-variant-ligatures: common-ligatures">waffle</div>
          </div>
          <div class="sp-stack sp-context" style="gap: 6px; width: 180px">
            <span class="sp-label">liga off</span>
            <div data-part="lig-off"
                 style="font-size: 54px; line-height: 1.25; font-variant-ligatures: none">waffle</div>
          </div>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 12px">
          This face fuses ff, ffi and ffl. The textbook fi pair it leaves as two letters.
        </p>
      </div>
    </div>
  `;let r=e(n,`lig-on`),i=e(n,`lig-off`);e(n,`segmented`).addEventListener(`change`,e=>{let n=e.detail,a=t[n];a&&(r.dataset.word=n,r.textContent=a,i.textContent=a)})}export{n as mount};