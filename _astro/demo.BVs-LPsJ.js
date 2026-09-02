import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{t}from"./motion.B5_YXmsy.js";var n={w:380,h:152},r=1400,i=4,a=`M 30 122 C 76 118, 84 70, 128 64 C 170 58, 188 106, 228 100 C 268 94, 264 44, 306 38 L 350 30`,o=`
  <rect x="0.5" y="0.5" width="${n.w-1}" height="${n.h-1}" rx="8" fill="var(--sp-surface)" stroke="var(--sp-line)" />
  <g fill="var(--sp-line)">
    <rect x="20" y="16" width="62" height="46" rx="4" />
    <rect x="96" y="16" width="78" height="46" rx="4" />
    <rect x="188" y="16" width="56" height="46" rx="4" />
    <rect x="258" y="16" width="46" height="46" rx="4" />
    <rect x="318" y="16" width="42" height="46" rx="4" />
    <rect x="20" y="100" width="72" height="36" rx="4" />
    <rect x="106" y="100" width="58" height="36" rx="4" />
    <rect x="178" y="100" width="66" height="36" rx="4" />
    <rect x="258" y="100" width="46" height="36" rx="4" />
    <rect x="318" y="100" width="42" height="36" rx="4" />
  </g>`,s=(e,t)=>`
  <g>
    <circle cx="${e}" cy="${t}" r="7" fill="var(--sp-muted)" />
    <circle cx="${e}" cy="${t}" r="2.6" fill="var(--sp-surface)" />
  </g>`;function c(c,l){c.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="scene" data-state="drawn" data-mode="draw" style="height: 240px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Route</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Reveal" data-part="mode" data-value="draw">
            <button class="sp-segment" type="button" data-part="seg-draw" value="draw">Draw</button>
            <button class="sp-segment" type="button" data-part="seg-instant" value="instant">Instant</button>
          </sp-segmented>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px">
          <svg
            data-part="art"
            width="${n.w}" height="${n.h}" viewBox="0 0 ${n.w} ${n.h}"
            aria-hidden="true" style="display: block; flex: 0 0 auto"
          >
            <g class="sp-context">${o}</g>
            <g data-part="route" data-subject fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="${a}" stroke="var(--sp-line)" stroke-width="${i}" />
              <path data-part="stroke" d="${a}" stroke="var(--sp-accent)" stroke-width="${i}" />
            </g>
            <g class="sp-context">${s(30,122)}${s(350,30)}</g>
          </svg>
        </div>
      </div>
    </div>
  `;let u=e(c,`scene`),d=e(c,`stroke`),f=t(c),p=Math.round(d.getTotalLength());d.style.strokeDasharray=`${p}`;let m,h,g=()=>{d.style.strokeDashoffset=`0`,u.dataset.state=`drawn`},_=()=>{if(l.clearTimeout(h),m?.cancel(),f||u.dataset.mode===`instant`)return g();d.style.strokeDashoffset=`${p}`,u.dataset.state=`drawing`,m=d.animate([{strokeDashoffset:`${p}`},{strokeDashoffset:`0`}],{duration:r,easing:`cubic-bezier(0.35, 0, 0.2, 1)`,fill:`forwards`}),h=l.setTimeout(g,1460)};e(c,`mode`).addEventListener(`change`,e=>{u.dataset.mode=e.detail,_()}),e(c,`replay`).addEventListener(`click`,_),_()}export{c as mount};