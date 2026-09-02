import{n as e}from"./parts.C-YLuC7Q.js";var t=`'Times New Roman', 'Liberation Serif', 'Nimbus Roman', serif`,n=`Verdana, 'DejaVu Sans', 'Liberation Sans', sans-serif`,r=1500,i=`Handgloves &amp; figures`,a=26,o={fallback:`Brand.woff2 in flight, text painted in the fallback`,loaded:`Brand.woff2 arrived, text set again in it`},s=(e,t,n)=>`
  <div class="sp-row" style="gap: 10px">
    <span class="sp-label" style="width: 96px">${e}</span>
    <span data-part="bar-${e.split(` `)[0]}"
          style="display: inline-block; height: 7px; border-radius: 4px; overflow: hidden; background: ${n}">
      <span style="font-family: ${t}; font-size: ${a}px; visibility: hidden">${i}</span>
    </span>
  </div>`;function c(c,l){c.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">font-display: swap</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="replay" type="button">Replay load</button>
        </div>
        <div class="sp-row sp-context" style="height: 22px; margin-top: 10px">
          <span class="sp-text" data-part="status" role="status">${o.fallback}</span>
        </div>
        <div data-part="sample" data-subject data-phase="fallback" data-pose="[data-phase=fallback]"
             style="height: 74px; overflow: hidden; margin-top: 4px; font-family: ${t}">
          <p data-part="headline" style="margin: 0; font-size: ${a}px; white-space: nowrap">${i}</p>
          <p data-part="body" style="margin: 6px 0 0; font-size: 13px; line-height: 1.5">
            Twelve sailings a day, from March until the end of October.
          </p>
        </div>
        <div class="sp-stack sp-context" data-part="widths" style="gap: 7px; margin-top: 10px">
          ${s(`fallback width`,t,`var(--sp-line)`)}
          ${s(`web font width`,n,`var(--sp-muted)`)}
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 12px">
          The words never go missing, but they never stay put either: the same string is a different
          length in each face, so the swap re-wraps the line and moves everything under it.
        </p>
      </div>
    </div>
  `;let u=e(c,`sample`),d=e(c,`status`),f,p=e=>{u.dataset.phase=e,u.style.fontFamily=e===`loaded`?n:t,d.textContent=o[e]},m=()=>{l.clearTimeout(f),p(`fallback`),f=l.setTimeout(()=>p(`loaded`),r)};m(),e(c,`replay`).addEventListener(`click`,m)}export{c as mount};