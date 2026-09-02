import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=11,n=32,r={eyebrow:0,headline:0,note:`Both lines at the spacing the face itself was fitted with: the caps cramped, the headline loose.`},i={eyebrow:.16,headline:-.02,note:`The caps opened out by a sixth of their size, the headline pulled in by a fiftieth of its own.`},a={typed:r,set:i},o=e=>e===0?`0`:`${e}em`,s=(e,t)=>`${(e*t).toFixed(1)}px at ${t}px`;function c(r){let c=i;r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Promo header</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="set" data-axis="Spacing" data-term="set">
            <button class="sp-segment" data-part="seg-typed" value="typed">as typed</button>
            <button class="sp-segment" data-part="seg-set" value="set">tracked</button>
          </sp-segmented>
        </div>
        <div style="margin-top: 16px">
          <div style="height: 18px">
            <span data-part="eyebrow" data-subject data-track="set" data-pose="[data-track=set]"
                  style="display: inline-block; font-size: ${t}px; font-weight: 600; text-transform: uppercase;
                         line-height: 18px; white-space: nowrap; color: var(--sp-accent);
                         letter-spacing: ${o(c.eyebrow)}; transition: letter-spacing 0.3s var(--sp-ease)">Spring release</span>
          </div>
          <div class="sp-context" data-part="headline" data-track="set"
               style="margin-top: 2px; height: 40px; font-size: ${n}px; font-weight: 600; line-height: 40px;
                      white-space: nowrap; letter-spacing: ${o(c.headline)}; transition: letter-spacing 0.3s var(--sp-ease)">
            Everything in place
          </div>
        </div>
        <div class="sp-row sp-context" style="gap: 24px; margin-top: 14px; align-items: flex-start">
          <div class="sp-stack" style="gap: 3px; width: 194px">
            <span class="sp-label" data-part="value-eyebrow" style="color: var(--sp-ink); font-variant-numeric: tabular-nums"></span>
            <span class="sp-label" data-part="px-eyebrow" style="font-variant-numeric: tabular-nums"></span>
          </div>
          <div class="sp-stack" style="gap: 3px; width: 194px">
            <span class="sp-label" data-part="value-headline" style="color: var(--sp-ink); font-variant-numeric: tabular-nums"></span>
            <span class="sp-label" data-part="px-headline" style="font-variant-numeric: tabular-nums"></span>
          </div>
        </div>
        <span data-stage-verdict data-part="note"></span>
      </div>
    </div>
  `;let l=e(r,`eyebrow`),u=e(r,`headline`),d=i=>{let c=a[i];c&&(l.dataset.track=i,u.dataset.track=i,l.style.letterSpacing=o(c.eyebrow),u.style.letterSpacing=o(c.headline),e(r,`value-eyebrow`).textContent=`eyebrow, 11px caps: ${o(c.eyebrow)}`,e(r,`px-eyebrow`).textContent=s(c.eyebrow,t),e(r,`value-headline`).textContent=`headline, 32px: ${o(c.headline)}`,e(r,`px-headline`).textContent=s(c.headline,n),e(r,`note`).textContent=c.note)};d(`set`),e(r,`segmented`).addEventListener(`change`,e=>d(e.detail))}export{c as mount};