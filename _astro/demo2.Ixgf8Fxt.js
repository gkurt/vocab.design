import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=100,n=40,r=10,i={i:26,o:68,n:68},a=68,o=[`i`,`o`,`n`],s={serif:{name:`Serif`,note:`the same skeleton, with serifs and a modulated bowl`},sans:{name:`Sans`,note:`the skeleton bare: no serifs, one stroke thickness`},mono:{name:`Mono`,note:`the same drawing on one advance width, so the i is padded`}},c=e=>e in s,l=`fill="none" stroke="currentColor" stroke-linecap="butt"`,u=(e,t,n,r)=>`<rect x="${e-n/2}" y="${t}" width="${n}" height="${r}" fill="currentColor"/>`;function d(e,t,n,r,i,a){let o=(n,r)=>`M ${e-n} ${t} A ${n} ${r} 0 1 1 ${e+n} ${t} A ${n} ${r} 0 1 1 ${e-n} ${t} Z`;return`<path fill="currentColor" fill-rule="evenodd" d="${o(n,r)} ${o(n-i,r-a)}"/>`}function f(e,i){let a=i===`serif`;if(e===`i`){let e=`<line ${l} x1="13" x2="13" y1="${n}" y2="${t}" stroke-width="${r}"/>`,i=`<circle cx="13" cy="26" r="5.5" fill="currentColor"/>`;return a?`${e}${i}${u(13,96,24,4)}${u(13,n,18,3.5)}`:`${e}${i}`}if(e===`n`){let e=`<path ${l} d="M14 58 Q14 ${n} 34 ${n} Q54 ${n} 54 58 L54 ${t}" stroke-width="${r}"/>`,i=`<line ${l} x1="14" x2="14" y1="${n}" y2="${t}" stroke-width="${r}"/>`;return a?`${i}${e}${u(14,96,24,4)}${u(54,96,24,4)}${u(14,n,18,3.5)}`:`${i}${e}`}return a?d(34,70,24,30,11,5.5):d(34,70,24,30,r,r)}function p(e){let t=0,n=[];for(let r of o){let o=i[r],s=e===`mono`?a:o;n.push(`<g transform="translate(${t+(s-o)/2} 0)">${f(r,e)}</g>`),t+=s}return e===`mono`?{markup:`${[a,136].map(e=>`<line x1="${e}" x2="${e}" y1="8" y2="112" stroke="var(--sp-line)" stroke-width="2" vector-effect="non-scaling-stroke"/>`).join(``)}${n.join(``)}`,width:t}:{markup:n.join(``),width:t}}function m(e,t,n){let{markup:r,width:i}=p(e);return`<svg viewBox="0 0 ${i} 120" width="${Math.round(i*t)}" height="${Math.round(120*t)}"
      role="img" aria-label="The word ion drawn in the ${n} member" style="display: block">${r}</svg>`}var h=.58,g=.6;function _(r){let i=`serif`,a=Math.round(n*h),o=Math.round(t*h),l=(e,t)=>`<span style="position: absolute; left: 0; right: 0; top: ${e}px; height: 2px; background: ${t}"></span>`;r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">shown large</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Family" data-part="segmented" data-value="${i}">
            <button class="sp-segment" data-part="seg-serif" value="serif">serif</button>
            <button class="sp-segment" data-part="seg-sans" value="sans">sans</button>
            <button class="sp-segment" data-part="seg-mono" value="mono">mono</button>
          </sp-segmented>
        </div>
        <div class="sp-row sp-context" style="gap: 16px; margin-top: 6px; height: 76px; align-items: center">
          <div data-part="show" data-member="${i}" style="flex: 0 0 auto">${m(i,g,s[i].name)}</div>
          <p class="sp-text" data-stage-verdict data-part="note" style="margin: 0">${s[i].note}</p>
        </div>
        <div data-part="set" data-subject class="sp-row" style="position: relative; gap: 18px; margin-top: 2px; height: ${Math.round(120*h)}px; align-items: flex-start">
          ${l(a,`color-mix(in oklab, var(--sp-accent) 55%, transparent)`)}
          ${l(o,`color-mix(in oklab, var(--sp-accent) 55%, transparent)`)}
          ${Object.keys(s).map(e=>`<div data-part="member-${e}" style="position: relative">${m(e,h,s[e].name)}</div>`).join(``)}
        </div>
        <div class="sp-row sp-context" style="gap: 18px; height: 18px">
          ${Object.keys(s).map(e=>`<span class="sp-label" style="width: ${Math.round(p(e).width*h)}px">${s[e].name.toLowerCase()}</span>`).join(``)}
        </div>
      </div>
    </div>
  `;let u=e(r,`show`),d=e(r,`note`);e(r,`segmented`).addEventListener(`change`,e=>{let t=e.detail;c(t)&&(u.dataset.member=t,u.innerHTML=m(t,g,s[t].name),d.textContent=s[t].note)})}export{_ as mount};