import{n as e}from"./parts.C-YLuC7Q.js";var t=.42,n=[{heading:`A working harbour`,lines:[`94%`,`88%`,`76%`],year:`1960`,depth:`8.4 m`,note:`Dredged twice a year, and deep enough for the timber boats.`},{heading:`The river changes course`,lines:[`92%`,`84%`,`70%`],year:`1980`,depth:`6.1 m`,note:`Silt arrives from upstream faster than the dredger can lift it.`},{heading:`The dredger is retired`,lines:[`90%`,`80%`,`74%`],year:`2000`,depth:`3.9 m`,note:`One season without dredging costs more depth than the decade before.`},{heading:`A tidal pool`,lines:[`96%`,`82%`,`68%`],year:`2020`,depth:`1.7 m`,note:`Small craft only, and only around high water.`}],r=[[`1960`,100],[`1980`,73],[`2000`,46],[`2020`,20]],i=r.map(([e,t],n)=>`
    <div class="sp-stack" data-part="bar-${n+1}" style="gap: 3px">
      <div class="sp-row sp-row--between">
        <span class="sp-label" style="font-size: 10px">${e}</span>
        <span class="sp-label" style="font-size: 10px">${(t*.084).toFixed(1)} m</span>
      </div>
      <div class="sp-progress" style="--sp-value: ${t}%"><div class="sp-progress-fill"></div></div>
    </div>`).join(``),a=n.map((e,t)=>`
    <div class="sp-stack" data-part="step-${t+1}" style="gap: 7px; height: 128px; justify-content: center">
      <span class="sp-heading" style="font-size: 14px">${e.heading}</span>
      ${e.lines.map(e=>`<span class="sp-line" style="width: ${e}"></span>`).join(``)}
      <span class="sp-text" style="font-size: 11px">${e.note}</span>
    </div>`).join(``);function o(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 272px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">How the harbour silted up</span>
          <span class="sp-text" data-part="readout" style="width: 74px; text-align: right; white-space: nowrap">Step 1 of 4</span>
        </div>
        <div class="sp-scroll" data-part="page" style="flex: 1 1 auto; min-height: 0">
          <div style="display: flex; align-items: flex-start; gap: 12px; padding: 12px">
            <div style="flex: 0 0 auto; width: 176px; align-self: stretch">
              <figure
                data-part="graphic"
                data-subject
                data-step="1"
                style="position: sticky; top: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;
                       padding: 10px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
              >
                <span class="sp-label" style="font-size: 10px">Depth at the quay</span>
                <div class="sp-row" style="align-items: baseline; gap: 6px">
                  <span class="sp-heading" data-part="depth" style="font-size: 24px">8.4 m</span>
                  <span class="sp-text" data-part="year" style="font-size: 12px">1960</span>
                </div>
                <div class="sp-stack" style="gap: 7px">${i}</div>
              </figure>
            </div>
            <div class="sp-stack sp-context sp-grow" style="gap: 12px">
              ${a}
              <!-- Room past the last step, so the final paragraph can reach the boundary line
                   the way every other one does. -->
              <div style="height: 110px"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let s=e(o,`page`),c=e(o,`graphic`),l=e(o,`depth`),u=e(o,`year`),d=e(o,`readout`),f=n.map((t,n)=>e(o,`step-${n+1}`)),p=r.map((t,n)=>e(o,`bar-${n+1}`)),m=0,h=()=>{let e=s.getBoundingClientRect(),r=e.top+e.height*t,i=1;for(let[e,t]of f.entries())t.getBoundingClientRect().top<=r&&(i=e+1);if(m===i)return;m=i;let a=n[i-1]??n[0];c.dataset.step=String(i),l.textContent=a.depth,u.textContent=a.year,d.textContent=`Step ${i} of ${n.length}`;for(let[e,t]of p.entries())e===i-1?t.style.removeProperty(`--sp-accent`):t.style.setProperty(`--sp-accent`,`var(--sp-line)`)};s.addEventListener(`scroll`,h),h()}export{o as mount};