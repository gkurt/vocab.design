var e=72,t=[{r:0,word:`square`},{r:8,word:`soft`},{r:24,word:`rounded`},{r:e/2,word:`pill cap`}],n=24;function r(t,r){return`
    <div class="sp-stack" style="flex: 0 0 auto; width: 104px; gap: 5px; align-items: center">
      <div style="position: relative; width: 104px; height: ${e}px">
        <div data-part="plate-${t}" aria-hidden="true"
             style="display: flex; flex-direction: column; justify-content: center; gap: 8px;
                    width: 100%; height: 100%; padding: 0 18px; background: var(--sp-surface);
                    border: 1px solid var(--sp-line); border-radius: ${t}px">
          <span class="sp-line" style="width: 100%"></span>
          <span class="sp-line" style="width: 62%"></span>
        </div>
        ${t===n?`<svg data-part="arc" data-subject aria-hidden="true" viewBox="0 0 ${t} ${t}"
              style="position: absolute; left: 0; top: 0; width: ${t}px; height: ${t}px; overflow: visible">
           <path d="M0 ${t} A${t} ${t} 0 0 1 ${t} 0" fill="none" stroke="var(--sp-accent)"
                 stroke-width="2.6" stroke-linecap="round"></path>
         </svg>`:``}
      </div>
      <span class="sp-label" style="color: var(--sp-ink); font-variant-numeric: tabular-nums">${t} px</span>
      <span class="sp-text" style="margin: 0; font-size: 11px; line-height: 1.2">${r}</span>
    </div>`}var i=`
  <svg data-part="anatomy" viewBox="0 0 168 66" width="168" height="66" role="presentation" style="flex: 0 0 auto">
    <path d="M16 44 L16 14 L46 14" fill="none" stroke="var(--sp-muted)" stroke-width="2" stroke-dasharray="4 3"/>
    <path d="M46 14 H160" fill="none" stroke="var(--sp-muted)" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M16 44 V62" fill="none" stroke="var(--sp-muted)" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M16 44 A30 30 0 0 1 46 14" fill="none" stroke="var(--sp-ink)" stroke-width="3.2" stroke-linecap="round"/>
    <path d="M16 44 H46 M46 44 V14" fill="none" stroke="var(--sp-muted)" stroke-width="1.6" stroke-dasharray="3 2.5"/>
    <circle cx="46" cy="44" r="2.6" fill="var(--sp-muted)"/>
    <text x="27" y="40" font-size="11" font-style="italic" fill="var(--sp-muted)">r</text>
    <text x="49" y="33" font-size="11" font-style="italic" fill="var(--sp-muted)">r</text>
  </svg>`;function a(e){e.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div class="sp-window" style="width: 472px; padding: 12px 14px">
        <div class="sp-row" data-part="tour" style="gap: 8px; align-items: flex-start; justify-content: center">
          ${t.map(e=>r(e.r,e.word)).join(``)}
        </div>

        <div class="sp-divider" style="margin: 10px 0 9px"></div>

        <div class="sp-row sp-context" style="gap: 14px; align-items: center; justify-content: center">
          ${i}
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 440px; margin: 0; text-align: center">
        Same box, same fill, same type: one number moving, and the whole register moving with it.
      </p>
    </div>
  `}export{a as mount};