import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=`'Geist Variable', ui-sans-serif, system-ui, sans-serif`,r=`Handgloves`,i={real:{css:`font-weight: 800; font-style: normal; font-synthesis: auto`,read:`font-weight: 800`,note:`A drawn weight: the stems thicken more than the hairlines and the counters are redrawn.`},faux:{css:`font-weight: 400; font-style: italic; font-synthesis: auto`,read:`font-style: italic`,note:`The browser shears the roman by a fixed angle. Same letters, leaning: not a drawn italic.`},off:{css:`font-weight: 400; font-style: italic; font-synthesis: none`,read:`font-synthesis: none`,note:`Nothing is invented, so the missing style shows as plain roman instead of being disguised.`}},a=e=>e in i,o=52,s=108;function c(c){c.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Style" data-term="faux" data-value="faux" style="margin-left: auto">
            <button class="sp-segment" data-part="seg-real" value="real">real</button>
            <button class="sp-segment" data-part="seg-faux" value="faux">synthesized</button>
            <button class="sp-segment" data-part="seg-off" value="off">refused</button>
          </sp-segmented>
        </div>
        <div style="height: ${o}px; display: flex; align-items: center; margin-top: 6px; overflow: hidden">
          <span data-part="line" data-subject data-mode="faux" data-faked data-pose="[data-faked]"
                style="font-family: ${n}; font-size: 34px; white-space: nowrap; ${i.faux.css}">${r}</span>
        </div>
        <div class="sp-row sp-context" style="gap: 16px; align-items: flex-start; margin-top: 4px">
          <div data-part="detail" class="sp-surface"
               style="position: relative; flex: 0 0 auto; width: ${s}px; height: ${s}px; overflow: hidden">
            <span aria-hidden="true"
                  style="position: absolute; left: 22px; bottom: 12px; font-family: ${n}; font-size: 78px; line-height: 1;
                         font-weight: 400; color: color-mix(in oklab, var(--sp-ink) 18%, transparent)">n</span>
            <span data-part="detail-live" aria-hidden="true"
                  style="position: absolute; left: 22px; bottom: 12px; font-family: ${n}; font-size: 78px; line-height: 1;
                         ${i.faux.css}">n</span>
          </div>
          <div class="sp-stack" style="gap: 6px; padding-top: 4px">
            <span class="sp-chip" data-part="readout" style="cursor: default; align-self: flex-start">${i.faux.read}</span>
            <p class="sp-text" data-stage-verdict data-part="note" style="margin: 0">${i.faux.note}</p>
          </div>
        </div>
      </div>
    </div>
  `;let l=e(c,`line`),u=e(c,`detail-live`),d=e(c,`readout`),f=e(c,`note`);e(c,`segmented`).addEventListener(`change`,e=>{let r=e.detail;if(!a(r))return;let o=i[r];l.dataset.mode=r,t(l,`data-faked`,r===`faux`),l.style.cssText=`font-family: ${n}; font-size: 34px; white-space: nowrap; ${o.css}`,u.style.cssText=`position: absolute; left: 22px; bottom: 12px; font-family: ${n}; font-size: 78px; line-height: 1; ${o.css}`,d.textContent=o.read,f.textContent=o.note})}export{c as mount};