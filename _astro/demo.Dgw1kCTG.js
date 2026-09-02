import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./motion.B5_YXmsy.js";var n=1800,r=30,i=3,a=27/2,o=2*Math.PI*a,s=o*.26;function c(c,l){c.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Reports</span>
          <span class="sp-label">March</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 12px">
          <div
            class="sp-surface"
            data-part="panel"
            aria-busy="false"
            style="display: flex; align-items: center; justify-content: center; height: 132px; padding: 12px"
          >
            <div class="sp-stack sp-context" data-part="idle" style="align-items: center; gap: 6px">
              <span class="sp-text">No report loaded</span>
              <span class="sp-label">It takes as long as it takes</span>
            </div>
            <div class="sp-stack" data-part="loading" role="status" hidden style="align-items: center; gap: 10px">
              <span data-part="spinner" data-subject style="display: block; width: ${r}px; height: ${r}px">
                <svg viewBox="0 0 ${r} ${r}" width="${r}" height="${r}" aria-hidden="true" style="display: block; overflow: visible">
                  <circle cx="${r/2}" cy="${r/2}" r="${a}" fill="none" stroke="var(--sp-line)" stroke-width="${i}" />
                  <circle
                    cx="${r/2}"
                    cy="${r/2}"
                    r="${a}"
                    fill="none"
                    stroke="var(--sp-accent)"
                    stroke-width="${i}"
                    stroke-linecap="round"
                    stroke-dasharray="${s.toFixed(2)} ${(o-s).toFixed(2)}"
                  />
                </svg>
              </span>
              <span class="sp-text sp-text--ink">Preparing your report</span>
            </div>
            <div class="sp-stack sp-context" data-part="result" hidden style="gap: 9px; width: 100%">
              <div class="sp-row sp-row--between"><span class="sp-text sp-text--ink">Sessions</span><span class="sp-text">12,408</span></div>
              <div class="sp-divider"></div>
              <div class="sp-row sp-row--between"><span class="sp-text sp-text--ink">Conversions</span><span class="sp-text">1,196</span></div>
              <div class="sp-divider"></div>
              <div class="sp-row sp-row--between"><span class="sp-text sp-text--ink">Refunds</span><span class="sp-text">37</span></div>
            </div>
          </div>
          <div class="sp-row sp-row--between sp-context">
            <span class="sp-text" data-stage-verdict data-part="note" style="white-space: nowrap">No percentage, because nothing here knows one</span>
            <button class="sp-button sp-button--sm" type="button" data-part="load" style="flex: 0 0 auto">Load report</button>
          </div>
        </div>
      </div>
    </div>
  `;let u=e(c,`panel`),d=e(c,`idle`),f=e(c,`loading`),p=e(c,`result`),m=e(c,`spinner`),h=e(c,`note`),g,_=!1,v=()=>{if(t(c)){m.style.transform=`rotate(40deg)`;return}g=m.animate([{transform:`rotate(0deg)`},{transform:`rotate(360deg)`}],{duration:850,iterations:1/0,easing:`linear`})};e(c,`load`).addEventListener(`click`,()=>{_||(_=!0,d.hidden=!0,p.hidden=!0,f.hidden=!1,u.setAttribute(`aria-busy`,`true`),h.textContent=`Something is running. That is the whole message`,v(),l.setTimeout(()=>{g?.cancel(),g=void 0,f.hidden=!0,p.hidden=!1,u.setAttribute(`aria-busy`,`false`),h.textContent=`Landed. The wait had no number and needed none`,_=!1},n))})}export{c as mount};