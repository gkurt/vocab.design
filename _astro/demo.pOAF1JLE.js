import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{t}from"./motion.B5_YXmsy.js";var n=380,r=92,i=44,a=`M 24 80 C 110 6 250 6 356 24`,o=`M 24 32 L 356 14`,s=900,c=[`0`,`50`,`100`];function l(l,u){l.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" data-part="scene" data-at="0" data-state="settled" style="width: 420px">
        <div class="sp-stack" style="gap: 6px">
          <div
            data-part="route"
            data-subject
            style="position: relative; width: ${n}px; height: ${r}px; border-radius: 6px;
                   background: var(--sp-sunken); overflow: hidden"
          >
            <svg width="${n}" height="${r}" viewBox="0 0 ${n} ${r}" aria-hidden="true" style="display: block">
              <path d="${a}" fill="none" stroke="var(--sp-muted)" stroke-width="1.6" stroke-dasharray="5 5" opacity="0.7" />
              <circle cx="24" cy="80" r="3" fill="var(--sp-muted)" />
              <circle cx="356" cy="24" r="3" fill="var(--sp-muted)" />
            </svg>
            <span
              data-part="dot-curve"
              style="position: absolute; left: 0; top: 0; width: 16px; height: 16px; border-radius: 50%;
                     background: var(--sp-accent); offset-path: path('${a}'); offset-distance: 0%;
                     transition: offset-distance ${s}ms cubic-bezier(0.4, 0, 0.2, 1)"
            ></span>
            <span class="sp-label" style="position: absolute; left: 10px; top: 8px; font-size: 11px">offset-path: path()</span>
          </div>
          <div
            class="sp-context"
            data-part="lane-line"
            style="position: relative; width: ${n}px; height: ${i}px; border-radius: 6px;
                   background: var(--sp-sunken); overflow: hidden"
          >
            <svg width="${n}" height="${i}" viewBox="0 0 ${n} ${i}" aria-hidden="true" style="display: block">
              <path d="${o}" fill="none" stroke="var(--sp-muted)" stroke-width="1.6" stroke-dasharray="5 5" opacity="0.7" />
              <circle cx="24" cy="32" r="3" fill="var(--sp-muted)" />
              <circle cx="356" cy="14" r="3" fill="var(--sp-muted)" />
            </svg>
            <span
              data-part="dot-line"
              style="position: absolute; left: 0; top: 0; width: 16px; height: 16px; border-radius: 50%;
                     background: var(--sp-accent); offset-path: path('${o}'); offset-distance: 0%;
                     transition: offset-distance ${s}ms cubic-bezier(0.4, 0, 0.2, 1)"
            ></span>
          </div>
        </div>
        <div class="sp-row sp-row--between sp-context" style="margin-top: 10px">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="picker" data-value="0" data-axis="Distance">${c.map(e=>`<button class="sp-segment" data-part="seg-${e}" value="${e}">${e}%</button>`).join(``)}</sp-segmented>
          <span class="sp-label" data-part="readout" style="margin-left: auto">offset-distance: 0%</span>
        </div>
      </div>
    </div>
  `;let d=e(l,`scene`),f,p=n=>{u.clearTimeout(f),d.dataset.at=n;for(let t of[`dot-curve`,`dot-line`])e(l,t).style.setProperty(`offset-distance`,`${n}%`);if(e(l,`readout`).textContent=`offset-distance: ${n}%`,t(l)){d.dataset.state=`settled`;return}d.dataset.state=`moving`,f=u.setTimeout(()=>{d.dataset.state=`settled`},960)};e(l,`picker`).addEventListener(`change`,e=>p(e.detail))}export{l as mount};