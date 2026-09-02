import{n as e,t}from"./parts.C-YLuC7Q.js";var n=96,r=9,i=87/2,a=2*Math.PI*i,o=64,s=8,c=56/2,l=2*Math.PI*c,u=[25,60,100],d=25;function f(f){let p=u.map(e=>`
      <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="set-${e}" data-value="${e}">${e}%</button>`).join(``);f.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 264px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Export</span>
          <span class="sp-label">archive.zip</span>
        </div>
        <div class="sp-body sp-stack" style="gap: 14px">
          <div class="sp-row" style="justify-content: space-around; gap: 12px">
            <div class="sp-stack" style="align-items: center; gap: 8px">
              <div
                data-part="ring"
                data-subject
                role="progressbar"
                aria-label="Export"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow="${d}"
                style="position: relative; width: ${n}px; height: ${n}px; flex: 0 0 auto"
              >
                <svg viewBox="0 0 ${n} ${n}" width="${n}" height="${n}" aria-hidden="true" style="display: block">
                  <g transform="rotate(-90 ${n/2} ${n/2})">
                    <circle cx="${n/2}" cy="${n/2}" r="${i}" fill="none" stroke="var(--sp-sunken)" stroke-width="${r}" />
                    <circle
                      data-part="arc"
                      cx="${n/2}"
                      cy="${n/2}"
                      r="${i}"
                      fill="none"
                      stroke="var(--sp-accent)"
                      stroke-width="${r}"
                      stroke-linecap="round"
                      stroke-dasharray="${a.toFixed(2)}"
                      stroke-dashoffset="${(a*(1-d/100)).toFixed(2)}"
                      style="transition: stroke-dashoffset 0.42s var(--sp-ease)"
                    />
                  </g>
                </svg>
                <span
                  data-part="readout"
                  style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
                         font-size: 19px; font-weight: 600; font-variant-numeric: tabular-nums"
                >${d}%</span>
              </div>
              <span class="sp-label sp-context">Determinate</span>
            </div>
            <div class="sp-stack sp-context" style="align-items: center; gap: 8px">
              <svg
                data-part="twin"
                class="sp-pending"
                viewBox="0 0 ${o} ${o}"
                width="${o}"
                height="${o}"
                role="img"
                aria-label="Working"
                style="display: block; margin: ${32/2}px 0"
              >
                <g transform="rotate(-90 ${o/2} ${o/2})">
                  <circle cx="${o/2}" cy="${o/2}" r="${c}" fill="none" stroke="var(--sp-sunken)" stroke-width="${s}" />
                  <circle
                    cx="${o/2}"
                    cy="${o/2}"
                    r="${c}"
                    fill="none"
                    stroke="var(--sp-accent)"
                    stroke-width="${s}"
                    stroke-linecap="round"
                    stroke-dasharray="${(l*.26).toFixed(2)} ${l.toFixed(2)}"
                  />
                </g>
              </svg>
              <span class="sp-label">Indeterminate</span>
            </div>
          </div>
          <div class="sp-row sp-context" style="justify-content: center; gap: 8px">${p}</div>
          <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin: 0; text-align: center; font-size: 12px">
            The arc needs a denominator. Without one, the twin is the honest control.
          </p>
        </div>
      </div>
    </div>
  `;let m=e(f,`ring`),h=e(f,`arc`),g=e(f,`readout`),_=n=>{m.setAttribute(`aria-valuenow`,String(n)),m.dataset.value=String(n),h.setAttribute(`stroke-dashoffset`,(a*(1-n/100)).toFixed(2)),g.textContent=`${n}%`;for(let r of u)t(e(f,`set-${r}`),`data-selected`,r===n)};for(let t of u)e(f,`set-${t}`).addEventListener(`click`,()=>_(t));_(d)}export{f as mount};