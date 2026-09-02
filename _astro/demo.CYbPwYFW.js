import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=[{key:`a`,hue:`#2f6fd0`,bar:30,glyph:`<circle cx="8" cy="8" r="6.4"/>`},{key:`b`,hue:`#e0403a`,bar:34,glyph:`<path d="M8 1.6 14.6 13.6H1.4z"/>`},{key:`c`,hue:`#3f8f6b`,bar:26,glyph:`<rect x="1.8" y="1.8" width="12.4" height="12.4" rx="3"/>`},{key:`d`,hue:`#7a5cc7`,bar:32,glyph:`<path d="M8 1.4l5.7 3.3v6.6L8 14.6 2.3 11.3V4.7z"/>`},{key:`e`,hue:`#c98a1c`,bar:28,glyph:`<path d="M2.4 3h4l3.4 5-3.4 5h-4l3.4-5z"/><path d="M9 3h4l-3.4 5 3.4 5H9L5.6 8z"/>`},{key:`f`,hue:`#2b7f8f`,bar:31,glyph:`<path d="M8 1.6a6.4 6.4 0 1 0 0 12.8A6.4 6.4 0 0 0 8 1.6zm0 3.4a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>`}],n=[{key:`colour`,label:`full colour`},{key:`flat`,label:`one ink`}],r=`color-mix(in oklab, var(--sp-ink) 62%, transparent)`,i=424;function a(a){let o=t.map(e=>`
      <span data-part="mark-${e.key}" style="display: inline-flex; align-items: center; gap: 6px; color: ${e.hue}">
        <svg viewBox="0 0 16 16" aria-hidden="true" style="display: block; width: 16px; height: 16px; fill: currentcolor">${e.glyph}</svg>
        <span style="display: block; width: ${e.bar}px; height: 7px; border-radius: 4px; background: currentcolor"></span>
      </span>`).join(``);a.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 244px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Marks are</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="modes" data-value="colour" data-axis="Treatment">
            ${n.map(e=>`
              <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}" style="padding: 4px 10px; font-size: 11px">${e.label}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; padding: 12px">
          <div class="sp-surface" style="display: flex; flex-direction: column; gap: 10px; width: ${i}px; padding: 14px 16px">
            <div class="sp-context" style="width: 52%; height: 11px; border-radius: 5px; background: color-mix(in oklab, var(--sp-ink) 58%, transparent)"></div>
            <div class="sp-stack sp-context" style="gap: 5px">
              <div class="sp-line" style="width: 100%; height: 6px"></div>
              <div class="sp-line" style="width: 74%; height: 6px"></div>
            </div>
            <span class="sp-button sp-button--sm sp-context" style="align-self: flex-start; font-size: 12px">Start free</span>
            <div class="sp-divider sp-context"></div>
            <span class="sp-label sp-context" style="font-size: 11px">Trusted by teams at</span>

            <div
              data-part="strip"
              data-subject
              data-inks="six"
              style="display: flex; align-items: center; justify-content: space-between; gap: 10px; width: 100%"
            >${o}</div>
          </div>
        </div>
      </div>

      <span class="sp-text sp-context" data-stage-verdict data-part="note" role="status" style="width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center"></span>
    </div>
  `;let s=e(a,`strip`),c=e(a,`note`),l=t.map(t=>e(a,`mark-${t.key}`)),u=e=>{let n=e===`flat`;for(let[e,i]of l.entries())i.style.color=n?r:t[e]?.hue??r;let i=new Set(l.map(e=>getComputedStyle(e).color)).size;s.dataset.inks=i===1?`one`:i===t.length?`six`:`some`,c.textContent=n?`One ink, so no mark wins and the row reads as a single claim.`:`Six brand colours, and the loudest mark is the only one seen.`};e(a,`modes`).addEventListener(`change`,e=>u(e.detail)),u(`colour`)}export{a as mount};