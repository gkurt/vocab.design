import{n as e}from"./parts.C-YLuC7Q.js";var t=`'Times New Roman', 'Liberation Serif', 'Nimbus Roman', serif`,n=`Verdana, 'DejaVu Sans', 'Liberation Sans', sans-serif`,r=1100,i={fallback:`downloading Sample.woff2, text set in the fallback`,loaded:`Sample.woff2 arrived, text re-set in it`},a=`Handgloves &amp; figures`,o=`The quick brown fox jumps over the lazy dog. Pack my box with five dozen jugs.`;function s(s,c){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 440px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">font-display: swap</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="replay" type="button">Replay load</button>
        </div>
        <div class="sp-row sp-context" style="height: 22px; margin-top: 10px">
          <span class="sp-text" data-part="status" role="status">${i.loaded}</span>
        </div>
        <div data-part="sample" data-subject data-phase="loaded"
             style="height: 92px; overflow: hidden; margin-top: 4px; font-family: ${n}">
          <p data-part="headline" style="margin: 0; font-size: 24px; white-space: nowrap">${a}</p>
          <p style="margin: 8px 0 0; font-size: 14px; line-height: 1.5">${o}</p>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 12px">
          Nothing is invisible while the file travels: the fallback is read immediately, and every line it
          measured is measured again when the real face arrives.
        </p>
      </div>
    </div>
  `;let l=e(s,`sample`),u=e(s,`status`),d,f=e=>{l.dataset.phase=e,l.style.fontFamily=e===`loaded`?n:t,u.textContent=i[e]};e(s,`replay`).addEventListener(`click`,()=>{c.clearTimeout(d),f(`fallback`),d=c.setTimeout(()=>f(`loaded`),r)})}export{s as mount};