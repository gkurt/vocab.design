import{n as e}from"./parts.C-YLuC7Q.js";var t={play:`<path d="M8.5 5.6 18 12l-9.5 6.4z" fill="currentColor"/>`,pause:`<path d="M9 5.6h2.5v12.8H9zM14.5 5.6H17v12.8h-2.5z" fill="currentColor"/>`,replay:`<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.5 12a6.5 6.5 0 1 1-2.4-5.05"/><path d="M17.2 3.7v3.6h-3.6"/></g>`},n={paused:{name:`Play`},playing:{name:`Pause`},ended:{name:`Replay`}},r=2400,i=120;function a(a,o){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 146px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Field recording 04</span><span class="sp-text">Estuary, low tide</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface sp-row" style="gap: 12px; padding: 12px 14px">
            <button
              class="sp-button"
              data-part="morph"
              data-subject
              data-aim
              data-state="paused"
              type="button"
              aria-label="Play"
              style="display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 42px; height: 42px; padding: 0; border-radius: 999px"
            >
              <span data-part="glyph-play"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">${t.play}</svg></span>
              <span data-part="glyph-pause" hidden><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">${t.pause}</svg></span>
              <span data-part="glyph-replay" hidden><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">${t.replay}</svg></span>
            </button>
            <div class="sp-stack sp-context" style="flex: 1 1 auto; gap: 7px; min-width: 0">
              <div class="sp-progress"><div class="sp-progress-fill" data-part="fill" style="--sp-value: 0%"></div></div>
              <div class="sp-row sp-row--between">
                <span class="sp-label" style="font-size: 10px">0:00</span>
                <span class="sp-label" style="font-size: 10px">2:14</span>
              </div>
            </div>
          </div>
          <p class="sp-text sp-text--ink" data-stage-announce data-part="name" data-value="Play"
             style="margin: 0; height: 20px; line-height: 20px; font-size: 13px; white-space: nowrap">&ldquo;Play&rdquo;</p>
        </div>
      </div>
    </div>
  `;let s=e(a,`morph`),c=e(a,`fill`),l=e(a,`name`),u={paused:e(a,`glyph-play`),playing:e(a,`glyph-pause`),ended:e(a,`glyph-replay`)},d=`paused`,f=0,p,m=()=>{s.dataset.state=d,s.setAttribute(`aria-label`,n[d].name),l.dataset.value=n[d].name,l.textContent=`“${n[d].name}”`;for(let e of Object.keys(u))u[e].hidden=e!==d;c.style.setProperty(`--sp-value`,`${Math.round(f/r*100)}%`)},h=()=>{o.clearTimeout(p),p=void 0},g=()=>{if(f=Math.min(r,f+i),f>=r){h(),d=`ended`,m();return}m(),p=o.setTimeout(g,i)};s.addEventListener(`click`,()=>{if(d===`playing`){h(),d=`paused`,m();return}d===`ended`&&(f=0),d=`playing`,m(),h(),p=o.setTimeout(g,i)}),m()}export{a as mount};