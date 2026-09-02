var e=20,t=e=>`polygon(${e}px 0, calc(100% - ${e}px) 0, 100% ${e}px, 100% calc(100% - ${e}px), calc(100% - ${e}px) 100%, ${e}px 100%, 0 calc(100% - ${e}px), 0 ${e}px)`;function n(e,t,n,r){return`
    <span data-part="${e}"${r} aria-hidden="true"
          style="display: block; width: 124px; height: 84px; padding: 2px; background: #9aa6bd; ${t}">
      <span style="display: flex; flex-direction: column; justify-content: center; gap: 7px;
                   width: 100%; height: 100%; padding: 0 20px; background-image: linear-gradient(157deg, #39414f 0%, #2a3140 58%, #222834 100%); ${n}">
        <span style="height: 5px; border-radius: 3px; background: rgb(255 255 255 / 0.34)"></span>
        <span style="height: 5px; width: 62%; border-radius: 3px; background: rgb(255 255 255 / 0.19)"></span>
      </span>
    </span>`}function r(e,t,r,i,a,o=``){return`
    <div class="sp-stack" style="flex: 0 0 auto; width: 132px; gap: 6px; align-items: center">
      ${n(e,i,a,o)}
      <span class="sp-label" style="color: var(--sp-ink); font-size: 12px">${t}</span>
      <span class="sp-text" style="margin: 0; font-size: 11px; line-height: 1.35; text-align: center">${r}</span>
    </div>`}var i=`
  <svg data-part="anatomy-figure" viewBox="0 0 150 54" width="150" height="54" role="presentation" style="flex: 0 0 auto">
    <path d="M6 18h70l28 22v12H6z" fill="var(--sp-sunken)"/>
    <path d="M76 18h28v22z" fill="none" stroke="var(--sp-muted)" stroke-width="2" stroke-dasharray="4 3"/>
    <path d="M6 18h70" fill="none" stroke="var(--sp-ink)" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M104 40v12" fill="none" stroke="var(--sp-ink)" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M76 18 104 40" fill="none" stroke="var(--sp-ink)" stroke-width="3.2" stroke-linecap="round"/>
    <path d="M76 9h28" fill="none" stroke="var(--sp-muted)" stroke-width="2"/>
    <path d="M76 6v6M104 6v6" fill="none" stroke="var(--sp-muted)" stroke-width="2"/>
    <text x="108" y="13" font-size="10" fill="var(--sp-muted)">${e} px</text>
    <text x="60" y="40" font-size="10" fill="var(--sp-muted)">45°</text>
  </svg>`;function a(n){n.innerHTML=`
    <div class="sp-app" style="gap: 9px">
      <div class="sp-window" style="width: 460px; padding: 11px 16px 12px">
        <div class="sp-row" data-part="tour" style="gap: 10px; align-items: flex-start; justify-content: center">
          ${r(`plate-chamfer`,`Chamfer`,`45°, 20px leg`,`clip-path: ${t(e)}`,`clip-path: ${t(17)}`,` data-subject`)}
          ${r(`plate-fillet`,`Fillet`,`R20`,`border-radius: 20px`,`border-radius: 18px`)}
          ${r(`plate-square`,`Square`,`90°`,``,``)}
        </div>

        <div class="sp-divider" style="margin: 9px 0 8px"></div>

        <div class="sp-row sp-context" data-part="anatomy" style="gap: 14px; align-items: center; justify-content: center">
          ${i}
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 460px; margin: 0; text-align: center">
        Geometry, not shading: the silhouette changes, so it survives in one colour.
      </p>
    </div>
  `}export{a as mount};