import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={coral:{skin:`#8b7cf0`,shirt:`#f4705c`,pants:`#2b2d6b`,blobA:`#ffe0b3`,blobB:`#b7e5d3`,prop:`#ffffff`,detail:`#2b2d6b`},mint:{skin:`#3fb59a`,shirt:`#f2c14e`,pants:`#1f3a5f`,blobA:`#d5e9ff`,blobB:`#ffd6e0`,prop:`#ffffff`,detail:`#1f3a5f`},plum:{skin:`#e0745f`,shirt:`#7b3fa0`,pants:`#f2a541`,blobA:`#f3d9f7`,blobB:`#cdeac0`,prop:`#ffffff`,detail:`#4a2159`}};function n(n){let r=t.coral;n.innerHTML=`
    <div class="sp-app" style="gap: 12px">
      <div class="sp-surface" style="display: flex; align-items: center; gap: 14px; width: 424px; padding: 16px">
        <div class="sp-stack sp-context" style="flex: 1 1 auto; gap: 6px">
          <div class="sp-heading" style="font-size: 17px; line-height: 1.25">Payments that just work</div>
          <p class="sp-text" style="margin: 0">One integration, every currency your customers already use.</p>
          <button class="sp-button sp-button--sm" type="button" style="align-self: flex-start; margin-top: 4px">Start free</button>
        </div>

        <div data-part="illustration" data-subject data-palette="coral" style="flex: 0 0 auto; width: 202px; height: 148px">
          <svg viewBox="0 0 240 170" width="202" height="148" role="img" aria-label="Flat illustration of a figure leaning on an oversized card">
            <ellipse data-tone="blobA" data-paint="fill" cx="152" cy="82" rx="76" ry="68" fill="${r.blobA}"/>
            <circle data-tone="blobB" data-paint="fill" cx="52" cy="122" r="32" fill="${r.blobB}"/>

            <g transform="rotate(-8 176 62)">
              <rect data-tone="prop" data-paint="fill" x="150" y="24" width="64" height="76" rx="11" fill="${r.prop}"/>
              <rect data-tone="shirt" data-paint="fill" x="161" y="38" width="30" height="7" rx="3.5" fill="${r.shirt}"/>
              <rect data-tone="detail" data-paint="fill" x="161" y="53" width="42" height="5" rx="2.5" fill="${r.detail}"/>
              <rect data-tone="detail" data-paint="fill" x="161" y="65" width="34" height="5" rx="2.5" fill="${r.detail}"/>
            </g>

            <path data-tone="pants" data-paint="stroke" d="M102 114C94 136 90 150 96 162" fill="none" stroke="${r.pants}" stroke-width="11" stroke-linecap="round"/>
            <path data-tone="pants" data-paint="stroke" d="M113 114C127 136 131 148 125 162" fill="none" stroke="${r.pants}" stroke-width="11" stroke-linecap="round"/>
            <path data-tone="shirt" data-paint="stroke" d="M106 66C98 88 100 106 106 118" fill="none" stroke="${r.shirt}" stroke-width="27" stroke-linecap="round"/>
            <path data-tone="skin" data-paint="stroke" d="M106 80C88 100 76 118 84 136" fill="none" stroke="${r.skin}" stroke-width="9" stroke-linecap="round"/>
            <path data-tone="skin" data-paint="stroke" d="M108 78C138 88 166 76 182 56" fill="none" stroke="${r.skin}" stroke-width="9" stroke-linecap="round"/>
            <circle data-tone="skin" data-paint="fill" cx="106" cy="46" r="16" fill="${r.skin}"/>
            <path data-tone="pants" data-paint="fill" d="M90 45a16 16 0 0 1 32 0c-5-11-27-11-32 0z" fill="${r.pants}"/>

            <path data-tone="blobB" data-paint="stroke" d="M34 150C34 128 44 116 58 110" fill="none" stroke="${r.blobB}" stroke-width="5" stroke-linecap="round"/>
          </svg>
        </div>
      </div>

      <div class="sp-row sp-context" style="gap: 10px">
        <sp-segmented data-stage-mode class="sp-segmented" data-part="palette" data-axis="Brand palette" data-value="coral">
          <button class="sp-segment" data-part="pal-coral" value="coral">Coral</button>
          <button class="sp-segment" data-part="pal-mint" value="mint">Mint</button>
          <button class="sp-segment" data-part="pal-plum" value="plum">Plum</button>
        </sp-segmented>
      </div>
    </div>
  `;let i=e(n,`illustration`);e(n,`palette`).addEventListener(`change`,e=>{let n=e.detail,r=n in t?n:`coral`,a=t[r];for(let e of i.querySelectorAll(`[data-tone]`)){let t=e.dataset.tone;!t||!(t in a)||e.setAttribute(e.dataset.paint===`stroke`?`stroke`:`fill`,a[t])}i.dataset.palette=r})}export{n as mount};