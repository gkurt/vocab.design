import{n as e,t}from"./parts.C-YLuC7Q.js";var n=90,r=12,i=120,a=1,o=1200,s=`fill: currentcolor; stroke: none`,c=`fill: none; stroke: currentcolor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round`,l=(e,t)=>`<svg class="sp-icon" viewBox="0 0 24 24" style="${t}" aria-hidden="true">${e}</svg>`,u=l(`<path d="M8 5.2 18.4 12 8 18.8z"/>`,s),d=l(`<path d="M8 5h3v14H8zM13 5h3v14h-3z"/>`,s),f=l(`<path d="M4.5 9.4h3.2L12 5.9v12.2L7.7 14.6H4.5z"/><path style="${c}" d="M15.2 9.3a4 4 0 0 1 0 5.4"/>`,s),p=l(`<path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"/>`,c),m=e=>{let t=Math.floor(e);return`${Math.floor(t/60)}:${String(t%60).padStart(2,`0`)}`};function h(s,c){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 404px; padding: 12px">
        <div
          data-part="player"
          style="position: relative; height: 196px; border-radius: 6px; overflow: hidden;
                 background: linear-gradient(155deg, #22304a 0%, #3d5c7a 55%, #7f9bad 100%)"
        >
          <div
            data-part="poster"
            aria-hidden="true"
            style="position: absolute; inset: 0"
          >
            <div style="position: absolute; left: 44px; top: 34px; width: 62px; height: 62px; border-radius: 50%; background: #f0e6d2; opacity: 0.6"></div>
            <div style="position: absolute; left: 0; right: 0; bottom: 0; height: 74px; background: #16202f; opacity: 0.55"></div>
          </div>
          <div
            class="sp-row"
            data-part="bar"
            data-subject
            role="group"
            aria-label="Playback"
            style="position: absolute; left: 10px; right: 10px; bottom: 10px; height: 38px; gap: 8px;
                   padding: 0 8px; border-radius: 8px; background: rgb(10 12 18 / 0.78); color: #ffffff;
                   transition: opacity 0.24s, visibility 0.24s"
          >
            <button class="sp-icon-button" type="button" data-part="play" aria-label="Play" style="color: inherit">${u}</button>
            <span data-part="elapsed" style="width: 30px; font-size: 12px; text-align: right">${m(r)}</span>
            <div class="sp-progress sp-grow" data-part="progress" style="--sp-value: ${r/n*100}%">
              <div class="sp-progress-fill"></div>
            </div>
            <span style="width: 30px; font-size: 12px">${m(n)}</span>
            <button class="sp-icon-button" type="button" data-part="volume" aria-label="Mute" style="color: inherit">${f}</button>
            <button class="sp-icon-button" type="button" data-part="fullscreen" aria-label="Full screen" style="color: inherit">${p}</button>
          </div>
        </div>
      </div>
    </div>
  `;let l=e(s,`player`),h=e(s,`bar`),g=e(s,`play`),_=e(s,`elapsed`),v=e(s,`progress`),y=r,b,x,S=()=>{_.textContent=m(y),v.style.setProperty(`--sp-value`,`${y/n*100}%`)},C=()=>{h.style.removeProperty(`opacity`),h.style.removeProperty(`visibility`),t(h,`data-shown`,!0)},w=()=>{h.style.opacity=`0`,h.style.visibility=`hidden`,t(h,`data-shown`,!1)},T=()=>{c.clearTimeout(x),C(),l.hasAttribute(`data-playing`)&&(x=c.setTimeout(w,o))},E=()=>{if(y=Math.min(y+a,n),S(),y>=n){D(!1);return}b=c.setTimeout(E,i)};function D(e){c.clearTimeout(b),t(l,`data-playing`,e),g.innerHTML=e?d:u,g.setAttribute(`aria-label`,e?`Pause`:`Play`),e&&(b=c.setTimeout(E,i)),T()}g.addEventListener(`click`,()=>D(!l.hasAttribute(`data-playing`))),l.addEventListener(`pointerover`,T),t(h,`data-shown`,!0),S()}export{h as mount};