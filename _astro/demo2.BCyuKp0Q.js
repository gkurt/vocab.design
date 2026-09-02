import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=1600,i=`Copy`,a=`Copied`;function o(o,s){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="height: 224px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Project settings</span></div>
        <div class="sp-body">
          <div class="sp-surface" style="padding: 12px">
            <div class="sp-label sp-context">Project ID</div>
            <div class="sp-row" style="margin-top: 8px">
              <span class="sp-text sp-text--ink sp-grow sp-context" data-part="value">prj_8f2c19ab4d</span>
              <button
                class="sp-button sp-button--ghost sp-button--sm"
                type="button"
                data-part="copy"
                data-subject
                aria-label="Copy project ID"
              >
                <span class="sp-row" style="gap: 6px; justify-content: center">
                  <span data-part="glyph-copy" style="display: inline-flex">${n(`copy`)}</span>
                  <span data-part="glyph-done" style="display: inline-flex" hidden>${n(`check`)}</span>
                  <span data-part="label">${i}</span>
                </span>
              </button>
            </div>
            <div class="sp-divider" style="margin: 12px 0"></div>
            <div class="sp-row sp-row--between sp-context">
              <span class="sp-label">Region</span>
              <span class="sp-text">eu-west-1</span>
            </div>
          </div>
          <p class="sp-text sp-context" style="margin: 10px 2px 0">Paste this into the CLI to link your local checkout.</p>
        </div>
        <span class="sp-visually-hidden" role="status" data-stage-announce data-part="announce"></span>
      </div>
    </div>
  `;let c=e(o,`copy`),l=e(o,`label`),u=e(o,`glyph-copy`),d=e(o,`glyph-done`),f=e(o,`announce`),p=0;for(let e of[i,a])l.textContent=e,p=Math.max(p,c.offsetWidth);l.textContent=i,c.style.minWidth=`${p}px`;let m=e=>{t(c,`data-copied`,e),l.textContent=e?a:i,u.hidden=e,d.hidden=!e,f.textContent=e?`Project ID copied to clipboard`:``},h;c.addEventListener(`click`,()=>{s.clearTimeout(h),m(!0),h=s.setTimeout(()=>m(!1),r)})}export{o as mount};