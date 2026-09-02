import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=16,n=[`The ferry leaves the west quay at ten past six,`,`and by then the harbour has been awake for hours.`,`Crates come down the slipway on a hand trolley,`,`the chandlery opens its shutters, and somebody`,`walks the pontoons counting the boats that came`,`in overnight. The tide is low enough that the mud`,`shows along the far wall, black and shining, with`,`gulls standing on it as if they had been posted`,`there. Nobody hurries. The whole town has learned`,`to keep the time the water keeps.`],r={1:1,3:3,5:5};function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 11px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Immersive reading</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Focus" data-part="width" data-value="3" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-1" value="1"
                    style="padding: 3px 10px; font-size: 11px; white-space: nowrap">1 line</button>
            <button class="sp-segment" type="button" data-part="seg-3" value="3"
                    style="padding: 3px 10px; font-size: 11px; white-space: nowrap">3 lines</button>
            <button class="sp-segment" type="button" data-part="seg-5" value="5"
                    style="padding: 3px 10px; font-size: 11px; white-space: nowrap">5 lines</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="page"
             style="position: relative; overflow: hidden; margin-top: 9px; height: ${n.length*t+18}px">
          <div class="sp-context" style="padding: 9px 12px; font-size: 12px; color: var(--sp-ink)">
            ${n.map(e=>`<span style="display: block; height: ${t}px; line-height: ${t}px">${e}</span>`).join(``)}
          </div>
          <div data-part="band" data-subject data-width="3" data-at="0"
               style="position: absolute; left: 6px; right: 6px; top: 9px; height: 48px;
                      border-left: 2px solid var(--sp-accent); border-radius: 3px;
                      box-shadow: 0 0 0 9999px var(--sp-scrim);
                      transition: top 0.28s var(--sp-ease), height 0.28s var(--sp-ease)"></div>
        </div>

        <div class="sp-row" style="gap: 10px; margin-top: 8px">
          <button class="sp-button sp-button--sm" type="button" data-part="advance"
                  style="flex: 0 0 auto; white-space: nowrap">Advance band</button>
          <span class="sp-label sp-context" data-part="readout" data-at="0"
                style="flex: 1 1 auto; min-width: 0; font-size: 11px; white-space: nowrap">Lines 1 to 3 of ${n.length}</span>
        </div>

      </div>
    </div>
  `;let a=e(i,`band`),o=e(i,`readout`),s=`3`,c=0,l=()=>{let e=r[s];a.dataset.width=s,a.dataset.at=String(c),a.style.top=`${9+c*t}px`,a.style.height=`${e*t}px`,o.dataset.at=String(c),o.textContent=`Lines ${c+1} to ${c+e} of ${n.length}`};e(i,`advance`).addEventListener(`click`,()=>{let e=r[s],t=n.length-e;c=c>=t?0:Math.min(c+e,t),l()}),e(i,`width`).addEventListener(`change`,e=>{s=e.detail,c=0,l()}),l()}export{i as mount};