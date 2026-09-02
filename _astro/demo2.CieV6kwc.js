function e(e,t,n=240){let r=e/2,i=2/t,a=[];for(let e=0;e<=n;e++){let t=e/n*Math.PI*2,o=Math.cos(t),s=Math.sin(t),c=r+r*Math.sign(o)*Math.abs(o)**i,l=r+r*Math.sign(s)*Math.abs(s)**i;a.push(`${c.toFixed(2)} ${l.toFixed(2)}`)}return`M${a.join(`L`)}Z`}function t(e,t){let n=e/2;return(e-(n+n*Math.SQRT1_2**(2/t)))/(1-Math.SQRT1_2)}function n(n){let r=e(120,5),i=t(120,5),a=i.toFixed(2),o=`<rect x="0" y="0" width="120" height="120" rx="${a}" ry="${a}"></rect>`;n.innerHTML=`
    <div class="sp-app">
      <div class="sp-row" style="align-items: flex-start; gap: 26px">
        <div class="sp-stack" style="gap: 8px; align-items: center">
          <div style="position: relative; width: 132px; height: 132px">
            <svg data-part="shape" data-subject role="img" aria-label="Squircle"
                 viewBox="0 0 120 120" style="display: block; width: 132px; height: 132px">
              <path d="${r}" fill="var(--sp-accent-soft)" stroke="var(--sp-accent)" stroke-width="1.6"></path>
            </svg>
            <svg data-part="arc" class="sp-context" aria-hidden="true" viewBox="0 0 120 120"
                 style="position: absolute; inset: 0; width: 132px; height: 132px">
              <g fill="none" stroke="var(--sp-ink)" stroke-width="1.4" stroke-dasharray="4 3" opacity="0.75">${o}</g>
            </svg>
          </div>
          <span class="sp-label sp-context" style="text-align: center; max-width: 150px">
            dashed: ${Math.round(i)}px radius
          </span>
        </div>

        <div class="sp-stack sp-context" style="gap: 8px; align-items: center">
          <div class="sp-surface" data-part="detail" style="padding: 6px; background: var(--sp-surface)">
            <svg aria-hidden="true" viewBox="0 0 40 40" style="display: block; width: 120px; height: 120px">
              <g fill="none" stroke="var(--sp-ink)" stroke-width="0.7" stroke-dasharray="2 1.5" opacity="0.75">${o}</g>
              <path d="${r}" fill="none" stroke="var(--sp-accent)" stroke-width="0.9"></path>
              <g stroke="var(--sp-ink)" stroke-width="0.4" opacity="0.55">
                <path data-part="tick-x" d="M${a} 0 L${a} 7"></path>
                <path data-part="tick-y" d="M0 ${a} L7 ${a}"></path>
              </g>
            </svg>
          </div>
          <span class="sp-label" style="text-align: center; max-width: 150px">
            corner at 3x
          </span>
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 320px; margin: 0; text-align: center">
        Same box, same diagonal, same nominal radius. One bends all at once, one ramps.
      </p>
    </div>
  `}export{n as mount};