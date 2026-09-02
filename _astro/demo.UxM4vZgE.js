import{n as e}from"./parts.C-YLuC7Q.js";var t=`Verdana, 'DejaVu Sans', 'Liberation Sans', sans-serif`,n=1500,r={waiting:`Brand.woff2 in flight, block period running`,loaded:`Brand.woff2 arrived, text painted`},i=`Handgloves &amp; figures`,a=`Tickets for the spring season go on sale at ten, and members may book a week ahead of general release.`;function o(o,s){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 444px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">font-display: block</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="replay" type="button">Replay load</button>
        </div>
        <div class="sp-row sp-context" style="height: 22px; margin-top: 10px">
          <span class="sp-text" data-part="status" role="status">${r.waiting}</span>
        </div>
        <div data-part="sample" data-subject data-phase="waiting" data-pose="[data-phase=waiting]"
             style="height: 104px; overflow: hidden; margin-top: 4px; padding: 10px 12px;
                    border: 1px dashed var(--sp-line); border-radius: var(--sp-radius); font-family: ${t}">
          <p data-part="headline" style="margin: 0; font-size: 24px; white-space: nowrap; visibility: hidden">${i}</p>
          <p data-part="body" style="margin: 8px 0 0; font-size: 13px; line-height: 1.5; visibility: hidden">${a}</p>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 12px">
          The dashed box is the room the text already occupies. Nothing here is late or wrong, it is simply
          not painted, and a reader on a slow connection sees an empty page rather than a page in progress.
        </p>
      </div>
    </div>
  `;let c=e(o,`sample`),l=e(o,`status`),u=[e(o,`headline`),e(o,`body`)],d,f=e=>{c.dataset.phase=e,l.textContent=r[e];for(let t of u)t.style.visibility=e===`loaded`?`visible`:`hidden`},p=()=>{s.clearTimeout(d),f(`waiting`),d=s.setTimeout(()=>f(`loaded`),n)};p(),e(o,`replay`).addEventListener(`click`,p)}export{o as mount};