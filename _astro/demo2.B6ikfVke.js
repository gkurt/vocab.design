import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n={width:292,height:198},r=4,i=[{key:`short`,label:`a line`,paragraphs:0,note:`Nothing but the headline, and the free space is split evenly above and below it.`},{key:`medium`,label:`a paragraph`,paragraphs:1,note:`More to say, still centred: the region is at its minimum and the margins share what is left.`},{key:`long`,label:`a lot`,paragraphs:r,note:`Past the minimum now, so the region grew and the footer went honestly below the fold.`}];function a(a){let o=Array.from({length:r},(e,t)=>`
      <p class="sp-text" data-part="para-${t}" style="margin: 0; font-size: 12px"${t===0?``:` hidden`}>
        Sailings leave the pontoon on the hour, weather permitting.
      </p>`).join(``);a.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 262px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Viewport</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="lengths" data-axis="Length" data-value="short">
            ${i.map(e=>`
              <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}" style="padding: 4px 10px; font-size: 11px">${e.label}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; gap: 16px; padding: 10px 12px">
          <div
            class="sp-scroll"
            data-part="window"
            style="flex: 0 0 auto; width: ${n.width}px; height: ${n.height}px; background: var(--sp-surface);
                   border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            <div
              data-part="cover"
              data-subject
              data-length="short"
              data-fits="exact"
              style="display: flex; flex-direction: column; gap: 8px; min-height: 100%; padding: 12px"
            >
              <div class="sp-row" data-part="head" style="flex: 0 0 auto; gap: 8px">
                <span class="sp-heading" style="font-size: 12px">Falmouth Ferries</span>
                <span class="sp-grow"></span>
                <span class="sp-label" style="font-size: 11px">Times</span>
              </div>

              <div data-part="principal" class="sp-stack" style="margin: auto 0; gap: 6px">
                <span class="sp-heading" style="font-size: 15px; line-height: 1.25">The winter crossing runs all year.</span>
                ${o}
                <span><button class="sp-button sp-button--sm" type="button" data-part="book">Book a crossing</button></span>
              </div>

              <div class="sp-row" data-part="foot" style="flex: 0 0 auto; gap: 8px">
                <span class="sp-label" style="font-size: 11px">Harbour Commissioners</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <span class="sp-text sp-context" data-stage-verdict data-part="note" role="status" style="height: 32px; width: 452px; font-size: 12px; line-height: 16px; text-align: center"></span>
    </div>
  `;let s=e(a,`window`),c=e(a,`cover`),l=e(a,`note`),u=Array.from({length:r},(t,n)=>e(a,`para-${n}`)),d=e=>{let n=i.find(t=>t.key===e);if(n){for(let[e,r]of u.entries())t(r,`hidden`,e>=n.paragraphs);c.dataset.length=n.key,c.dataset.fits=c.offsetHeight>s.clientHeight+1?`over`:`exact`,s.scrollTop=0,l.textContent=n.note}};e(a,`lengths`).addEventListener(`change`,e=>d(e.detail)),d(`short`)}export{a as mount};