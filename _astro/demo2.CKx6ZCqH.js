import{n as e}from"./parts.C-YLuC7Q.js";var t=900;function n(n,r){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-clay" data-part="card" data-subject style="width: 292px; padding: 22px">
        <div style="font-weight: 600; font-size: 15px">Daily goal</div>
        <div data-part="readout" style="font-size: 13px; opacity: 0.72; margin-top: 2px">7,400 of 10,000 steps</div>
        <div style="height: 14px; border-radius: 999px; background: #a9b4ef; margin-top: 16px">
          <div data-part="fill" style="width: 74%; height: 100%; border-radius: 999px; background: #ffffff; transition: width 0.35s var(--sp-ease)"></div>
        </div>
        <button class="sp-clay" data-part="button" type="button"
                style="margin-top: 18px; padding: 11px 20px; font: inherit; font-weight: 600; cursor: pointer; --sp-clay-fill: #ffd3bd">
          Log a walk
        </button>
      </div>
      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 292px; text-align: center">
        Pastel fill, 26px radius, light inside the top edge, shadow tinted toward the fill.
      </p>
    </div>
  `;let i=e(n,`button`),a=e(n,`fill`),o=e(n,`readout`),s;i.addEventListener(`click`,()=>{a.style.width=`86%`,o.textContent=`8,600 of 10,000 steps`,i.setAttribute(`data-pressed`,``),r.clearTimeout(s),s=r.setTimeout(()=>i.removeAttribute(`data-pressed`),t)})}export{n as mount};