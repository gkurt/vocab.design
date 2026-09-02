import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=160,n=90,r=214,i=156,a=`<svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${n}">
  <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#4d7fc4"/><stop offset="1" stop-color="#cfe2f6"/>
  </linearGradient></defs>
  <rect width="${t}" height="${n}" fill="url(#sky)"/>
  <circle cx="36" cy="27" r="13" fill="#f3ce6b"/>
  <path d="M0 68 L42 40 L80 68 Z" fill="#527f60"/>
  <path d="M54 68 L104 32 L156 68 Z" fill="#38604b"/>
  <rect y="68" width="${t}" height="22" fill="#2c4a3d"/>
</svg>`,o={fill:`fill: scaled to ${r} by ${i} on both axes, so the sun is no longer round.`,contain:`contain: the whole picture kept, empty bands above and below it.`,cover:`cover: scaled until every edge is covered, the left and right of the picture cropped away.`,none:`none: drawn at its natural ${t} by ${n}, the box clipping or padding whatever is left.`};function s(t){t.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 252px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Fit</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-value="cover" data-axis="object-fit">
            <button class="sp-segment" type="button" data-part="seg-fill" value="fill">fill</button>
            <button class="sp-segment" type="button" data-part="seg-contain" value="contain">contain</button>
            <button class="sp-segment" type="button" data-part="seg-cover" value="cover">cover</button>
            <button class="sp-segment" type="button" data-part="seg-none" value="none">none</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 12px">
          <img
            data-part="box"
            data-subject
            data-fit="cover"
            src="${`data:image/svg+xml;utf8,${encodeURIComponent(a)}`}"
            alt="Landscape photograph stand-in"
            style="width: ${r}px; height: ${i}px; object-fit: cover; background: var(--sp-sunken); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          />
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="height: 34px; max-width: 400px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;let n=e(t,`box`),s=e(t,`readout`),c=e=>{let t=o[e];t&&(n.dataset.fit=e,n.style.objectFit=e,s.textContent=t)};e(t,`switcher`).addEventListener(`change`,e=>c(e.detail)),c(`cover`)}export{s as mount};