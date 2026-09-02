import{n as e,r as t,t as n}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var r={w:116,h:132},i=`
      <path d="M16 16 H36 V116 H16 Z"/>
      <path d="M80 16 H100 V116 H80 Z"/>
      <path d="M16 16 L38 16 L100 116 L78 116 Z"/>`,a=`
      <path d="M70 72 L82 72 L78 96 Z"/>
      <path d="M32 60 L44 60 L38 36 Z"/>`,o=`58 58 46 46`,s=2.5;function c(e,t,n,c){let l=t===o?n:Math.round(n*r.h/r.w),u=`<g mask="url(#cut-${e})" fill="currentColor">${i}</g>`;return`
    <svg viewBox="${t}" width="${n}" height="${l}" aria-hidden="true" style="display: block">
      <defs>
        <mask id="cut-${e}">
          <rect x="0" y="0" width="${r.w}" height="${r.h}" fill="#fff"/>
          <g data-part="traps" fill="#000">${a}</g>
        </mask>
        ${c?`<filter id="gain-${e}" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
          <feMorphology operator="dilate" radius="${s}"/>
        </filter>`:``}
      </defs>
      ${c?`<g filter="url(#gain-${e})">${u}</g>`:u}
    </svg>`}var l={trap:`the notch takes the gain, the joint stays open`,plain:`the ink meets in the corner and fills the joint`},u=e=>e in l;function d(s){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Joint" data-term="trap" data-value="trap" style="margin-left: auto">
            <button class="sp-segment" data-part="seg-trap" value="trap">with trap</button>
            <button class="sp-segment" data-part="seg-plain" value="plain">without</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 18px; align-items: flex-end; margin-top: 10px; height: 132px">
          <div class="sp-stack sp-context" data-part="whole" style="gap: 6px; align-items: center">
            ${c(`whole`,`0 0 ${r.w} ${r.h}`,88,!1)}
            <span class="sp-label">the letter</span>
          </div>
          <div class="sp-stack" data-part="joint-panel" style="gap: 6px; align-items: center">
            <svg data-part="joint" data-subject data-mode="trap" data-trapped data-pose="[data-trapped]"
                 viewBox="${o}" width="112" height="112" role="img"
                 aria-label="The upper right joint of an N, magnified"
                 style="display: block">
              <defs>
                <mask id="cut-joint">
                  <rect x="0" y="0" width="${r.w}" height="${r.h}" fill="#fff"/>
                  <g data-part="traps" fill="#000">${a}</g>
                </mask>
              </defs>
              <g mask="url(#cut-joint)" fill="currentColor">${i}</g>
            </svg>
            <span class="sp-label sp-context">the joint at 48 pt</span>
          </div>
          <div class="sp-stack sp-context" data-part="gained" style="gap: 6px; align-items: center">
            ${c(`gain`,o,112,!0)}
            <span class="sp-label">the same joint at 6 pt</span>
          </div>
        </div>
        <div class="sp-row sp-context" style="margin-top: 10px">
          <span class="sp-text" data-stage-verdict data-part="readout">${l.trap}</span>
        </div>
      </div>
    </div>
  `;let d=e(s,`joint`),f=e(s,`readout`),p=t(s,`traps`);e(s,`segmented`).addEventListener(`change`,e=>{let t=e.detail;if(!u(t))return;let r=t===`trap`;n(d,`data-trapped`,r),d.dataset.mode=t;for(let e of p)e.setAttribute(`fill`,r?`#000`:`#fff`);f.textContent=l[t]})}export{d as mount};