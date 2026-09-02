import{n as e}from"./parts.C-YLuC7Q.js";var t=[`Ferry timetable`,`Lock keeper notes`,`Weir maintenance`,`Mooring fees`,`Winter dredging`,`Contact the office`],n=168;function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-row" style="align-items: flex-start; gap: 18px">
        <div
          data-part="viewport"
          data-subject
          style="position: relative; width: 246px; height: 196px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius); overflow: hidden"
        >
          <div class="sp-scroll sp-context" data-part="page" style="width: 100%; height: 100%; padding: 12px">
            ${t.map(e=>`
      <div class="sp-stack" style="margin-bottom: 14px">
        <span class="sp-heading">${e}</span>
        <div class="sp-line" style="width: 94%"></div>
        <div class="sp-line" style="width: 78%"></div>
        <div class="sp-line" style="width: 86%"></div>
      </div>`).join(``)}
          </div>
        </div>
        <div class="sp-stack sp-context" style="align-items: center; gap: 6px">
          <span class="sp-label">document</span>
          <div
            data-part="map"
            style="position: relative; width: 54px; height: ${n}px; padding: 5px; background: var(--sp-sunken); border: 1px solid var(--sp-line); border-radius: 5px; overflow: hidden"
          >
            ${t.map(()=>`
      <div style="display: flex; flex-direction: column; gap: 3px; margin-bottom: 8px">
        <div class="sp-line" style="height: 4px; width: 70%; background: var(--sp-muted)"></div>
        <div class="sp-line" style="height: 3px; width: 88%"></div>
        <div class="sp-line" style="height: 3px; width: 74%"></div>
      </div>`).join(``)}
            <div
              data-part="lens"
              data-at="top"
              style="position: absolute; left: 0; right: 0; top: 0; height: 0; background: var(--sp-accent-soft); border: 1px solid var(--sp-accent); border-radius: 3px; opacity: 0.72"
            ></div>
          </div>
        </div>
      </div>
      <div class="sp-row sp-context" style="height: 18px">
        <span class="sp-text" data-part="readout" style="font-variant-numeric: tabular-nums"></span>
      </div>
    </div>
  `;let i=e(r,`page`),a=e(r,`lens`),o=e(r,`readout`),s=()=>{let e=i.clientHeight,t=i.scrollHeight,r=i.scrollTop,s=Math.max(t-e,1),c=Math.min(r/s,1);a.style.height=`${Math.round(e/t*n)}px`,a.style.top=`${Math.round(c*(n-e/t*n))}px`,a.dataset.at=c<.18?`top`:c>.82?`bottom`:`middle`,o.textContent=`viewport ${e}px · document ${t}px · scrolled ${Math.round(r)}px`};i.addEventListener(`scroll`,s),s()}export{r as mount};