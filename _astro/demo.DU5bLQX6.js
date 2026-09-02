import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=228,n=330,r=[{key:`roomy`,label:`424px`,width:424},{key:`tight`,label:`268px`,width:268}],i={full:`var(--sp-surface)`,breakout:`color-mix(in oklab, var(--sp-accent) 11%, var(--sp-surface))`,content:`color-mix(in oklab, var(--sp-accent) 22%, var(--sp-surface))`},a=(e,t,n,r=``)=>`<div data-part="band-${e}" ${r} style="position: absolute; top: 0; bottom: 0; left: 50%; translate: -50% 0; width: ${t}; background: ${n}"></div>`,o=(e,n)=>`
  <div class="sp-stack sp-context" data-part="${e}" style="gap: 5px; width: ${t}px">
    ${n.map(e=>`<div class="sp-line" style="width: ${e}%; height: 6px; background: color-mix(in oklab, var(--sp-ink) 30%, transparent)"></div>`).join(``)}
  </div>`,s=(e,t,n)=>`
  <span class="sp-row" style="gap: 6px">
    <span style="flex: 0 0 auto; width: 10px; height: 10px; border-radius: 3px; border: 1px solid var(--sp-line); background: ${n}"></span>
    <span class="sp-label" style="font-size: 11px; font-variant-numeric: tabular-nums; white-space: nowrap">${t}
      <span data-part="legend-${e}">0px</span></span>
  </span>`;function c(c){c.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 284px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Page is</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="widths" data-axis="Width" data-term="roomy" data-value="roomy">
            ${r.map(e=>`
              <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}" style="padding: 4px 11px; font-size: 11px">${e.label}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; align-items: flex-start; justify-content: center; padding: 12px">
          <div style="width: ${r[0]?.width}px; height: 100%">
            <div
              data-part="page"
              data-tracks="three"
              style="position: relative; width: ${r[0]?.width}px; height: 100%; margin: 0 auto; overflow: hidden"
            >
              ${a(`full`,`100%`,i.full)}
              ${a(`breakout`,`${n}px`,i.breakout,`data-subject data-fit="between" data-pose="[data-fit=between]"`)}
              ${a(`content`,`${t}px`,i.content)}

              <div style="position: relative; display: flex; flex-direction: column; align-items: center; gap: 10px; padding-top: 8px">
                ${o(`prose-1`,[100,94,66])}

                <figure
                  class="sp-context"
                  data-part="figure"
                  data-fit="between"
                  style="display: flex; flex-direction: column; justify-content: flex-end; gap: 4px; width: ${n}px; height: 46px;
                         margin: 0; padding: 7px 9px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 6px"
                >
                  <div class="sp-row" style="gap: 4px; align-items: flex-end">
                    ${[16,26,20,30,24].map(e=>`<span style="flex: 0 0 auto; width: 14px; height: ${e}px; border-radius: 2px; background: var(--sp-accent)"></span>`).join(``)}
                  </div>
                </figure>

                ${o(`prose-2`,[100,78])}

                <div
                  data-part="full-strip"
                  class="sp-context"
                  style="display: flex; flex-direction: column; justify-content: center; gap: 5px; width: 100%; height: 28px; padding: 0 10px; background: var(--sp-sunken)"
                >
                  <div class="sp-line" style="width: 46%; height: 5px"></div>
                  <div class="sp-line" style="width: 62%; height: 5px"></div>
                </div>

                ${o(`prose-3`,[100,52])}
              </div>
            </div>
          </div>
        </div>

        <div class="sp-row" style="flex: 0 0 auto; gap: 14px; justify-content: center; padding: 6px 12px; border-top: 1px solid var(--sp-line)">
          ${s(`content`,`content`,i.content)}
          ${s(`breakout`,`breakout`,i.breakout)}
          ${s(`full`,`full`,i.full)}
        </div>
      </div>

      <span class="sp-text sp-context" data-stage-verdict data-part="note" role="status" style="width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center"></span>
    </div>
  `;let l=e(c,`page`),u=e(c,`figure`),d=e(c,`prose-1`),f=e(c,`note`),p={content:e(c,`legend-content`),breakout:e(c,`legend-breakout`),full:e(c,`legend-full`)},m=t=>{let i=r.find(e=>e.key===t);if(!i)return;let a=Math.min(n,i.width),o=e(c,`band-breakout`);l.style.width=`${i.width}px`,o.style.width=`${a}px`,u.style.width=`${a}px`;let s=u.offsetWidth,m=d.offsetWidth,h=l.offsetWidth,g=s>=h-1?`full`:s>m+8?`between`:`column`;u.dataset.fit=g,o.dataset.fit=g,l.dataset.tracks=g===`between`?`three`:`two`,p.content.textContent=`${m}px`,p.breakout.textContent=`${s}px`,p.full.textContent=`${h}px`,f.textContent=g===`between`?`The figure is wider than the column and still short of the page edge.`:`The track has clamped to the page, so the figure now reads as full bleed.`};e(c,`widths`).addEventListener(`change`,e=>m(e.detail)),m(`roomy`)}export{c as mount};