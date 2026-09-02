import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`Nordic hiking pack, 38L`,n=`Ripstop nylon with a welded roll top, a padded laptop sleeve, and side compression straps that pull the load in against your back on long descents.`,r=[`1`,`2`,`3`],i=19.5,a=3;function o(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 470px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="2" data-axis="Clamp">
            ${r.map(e=>`<button class="sp-segment" data-part="seg-${e}" value="${e}">${e} line${e===`1`?``:`s`}</button>`).join(``)}
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 14px; margin-top: 14px; align-items: flex-start">
          <div class="sp-surface" style="flex: 1 1 0; padding: 10px">
            <span class="sp-label sp-context">clamped</span>
            <div style="margin-top: 4px; font-size: 13px; font-weight: 600">${t}</div>
            <div data-part="clamp-box" style="height: ${i*a}px; margin-top: 4px">
              <p class="sp-text" data-part="clamped" data-subject data-lines="2"
                 style="margin: 0; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; line-clamp: 2; overflow: hidden">${n}</p>
            </div>
          </div>
          <div class="sp-surface sp-context" style="flex: 1 1 0; padding: 10px">
            <span class="sp-label">no clamp</span>
            <div style="margin-top: 4px; font-size: 13px; font-weight: 600">${t}</div>
            <p class="sp-text" data-part="full" style="margin: 4px 0 0">${n}</p>
          </div>
        </div>
      </div>
    </div>
  `;let s=e(o,`clamped`),c=e=>{r.includes(e)&&(s.dataset.lines=e,s.style.setProperty(`-webkit-line-clamp`,e),s.style.setProperty(`line-clamp`,e))};c(`2`),e(o,`segmented`).addEventListener(`change`,e=>c(e.detail))}export{o as mount};