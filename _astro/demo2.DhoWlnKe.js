import{n as e}from"./parts.C-YLuC7Q.js";var t=25,n=2*Math.PI*t,r=104,i=14,a=240,o=[[`0 m`,`Surface`],[`60 m`,`Thermocline`],[`120 m`,`Twilight`],[`180 m`,`Cold layer`],[`240 m`,`Seabed`]];function s(s){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 402px; height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Dive log</span>
          <span class="sp-label" data-part="readout">0% scrolled</span>
        </div>
        <div class="sp-row" style="flex: 1 1 auto; min-height: 0; align-items: stretch; gap: 0">
          <div class="sp-scroll sp-context" data-part="page" style="flex: 1 1 auto; padding: 0 14px">
            ${o.map(([e,t])=>`
      <div class="sp-stack" style="gap: 7px; padding: 12px 0">
        <span class="sp-row sp-row--between">
          <span class="sp-heading" style="font-size: 13px">${t}</span>
          <span class="sp-label">${e}</span>
        </span>
        <span class="sp-line" style="width: 94%"></span>
        <span class="sp-line" style="width: 78%"></span>
        <span class="sp-line" style="width: 86%"></span>
      </div>`).join(``)}
          </div>
          <figure
            data-part="figure"
            data-subject
            data-at="start"
            data-progress="0"
            style="display: flex; flex-direction: column; align-items: center; gap: 10px; flex: 0 0 auto;
                   width: 132px; margin: 0; padding: 14px 0; border-left: 1px solid var(--sp-line);
                   background: var(--sp-surface)"
          >
            <span style="position: relative; width: 68px; height: 68px">
              <svg viewBox="0 0 68 68" width="68" height="68" aria-hidden="true" style="display: block; transform: rotate(-90deg)">
                <circle cx="34" cy="34" r="${t}" fill="none" stroke="var(--sp-sunken)" stroke-width="6" />
                <circle
                  data-part="ring"
                  cx="34" cy="34" r="${t}" fill="none" stroke="var(--sp-accent)" stroke-width="6" stroke-linecap="round"
                  stroke-dasharray="${n.toFixed(2)}" stroke-dashoffset="${n.toFixed(2)}"
                />
              </svg>
              <span
                data-part="depth"
                style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
                       font-size: 13px; font-weight: 600"
              >0 m</span>
            </span>
            <span
              data-part="rail"
              style="position: relative; width: 4px; height: ${r}px; border-radius: 999px; background: var(--sp-sunken)"
            >
              <span
                data-part="sonde"
                style="position: absolute; top: 0; left: 50%; width: ${i}px; height: ${i}px; margin-left: -${i/2}px;
                       border-radius: 5px; background: var(--sp-accent)"
              ></span>
            </span>
            <figcaption class="sp-label">Descent</figcaption>
          </figure>
        </div>
      </div>
    </div>
  `;let c=e(s,`page`),l=e(s,`figure`),u=e(s,`ring`),d=e(s,`depth`),f=e(s,`sonde`),p=e(s,`readout`),m=()=>{let e=c.scrollHeight-c.clientHeight,t=e>0?Math.min(Math.max(c.scrollTop/e,0),1):0;u.setAttribute(`stroke-dashoffset`,(n*(1-t)).toFixed(2)),f.style.top=`${t*90}px`,d.textContent=`${Math.round(t*a)} m`,l.dataset.progress=String(Math.round(t*100)),l.dataset.at=t<.02?`start`:t>.98?`end`:`middle`,p.textContent=`${Math.round(t*100)}% scrolled`};c.addEventListener(`scroll`,m),m()}export{s as mount};