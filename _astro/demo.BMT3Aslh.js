import{n as e}from"./parts.C-YLuC7Q.js";var t=134,n=150,r=900,i=`fill: currentcolor; stroke: none`,a=`fill: none; stroke: currentcolor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round`,o=(e,t,n=16)=>`<svg class="sp-icon" viewBox="0 0 24 24" style="${t}; width: ${n}px; height: ${n}px" aria-hidden="true">${e}</svg>`,s=o(`<path d="M8 5h3v14H8zM13 5h3v14h-3z"/>`,i),c=o(`<path d="M8 5.2 18.4 12 8 18.8z"/>`,i,26),l=o(`<path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"/>`,a),u=[{at:0,text:`The tide runs out twice a day here.`},{at:14,text:`Everything the harbour does is timed to it.`}],d=e=>`${Math.floor(e/60)}:${String(Math.floor(e%60)).padStart(2,`0`)}`,f=e=>`
  <span
    class="sp-pulse"
    style="width: 6px; height: 6px; border-radius: 50%; background: #ffffff; animation-delay: -${(e*.6).toFixed(1)}s"
  ></span>`;function p(i,a){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 10px">
        <div
          data-part="player"
          data-subject
          data-state="paused"
          style="position: relative; height: 212px; border-radius: 6px; overflow: hidden;
                 background: linear-gradient(170deg, #1d3557 0%, #457b9d 48%, #a8c6bd 100%)"
        >
          <div data-part="poster" aria-hidden="true" style="position: absolute; inset: 0; overflow: hidden">
            <div style="position: absolute; left: 52px; top: 26px; width: 54px; height: 54px; border-radius: 50%; background: #f6e2b3; opacity: 0.75"></div>
            <div style="position: absolute; left: -30px; right: 40%; bottom: 44px; height: 90px; border-radius: 50% 50% 0 0; background: #23405c; opacity: 0.85"></div>
            <div style="position: absolute; left: 35%; right: -40px; bottom: 44px; height: 66px; border-radius: 50% 50% 0 0; background: #2c5170; opacity: 0.9"></div>
            <div style="position: absolute; left: 0; right: 0; bottom: 0; height: 62px; background: #101a26; opacity: 0.5"></div>
          </div>

          <div
            data-part="overlay"
            style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; pointer-events: none"
          >
            <button
              type="button"
              data-part="play"
              aria-label="Play"
              style="display: flex; align-items: center; justify-content: center; width: 54px; height: 54px; padding: 0 0 0 3px;
                     border: 0; border-radius: 50%; background: rgb(10 12 18 / 0.62); color: #ffffff; cursor: pointer; pointer-events: auto"
            >${c}</button>
          </div>

          <div
            class="sp-row"
            data-part="buffering"
            role="status"
            aria-label="Buffering"
            hidden
            style="position: absolute; left: 50%; top: 50%; translate: -50% -50%; gap: 6px; padding: 9px 12px;
                   border-radius: 999px; background: rgb(10 12 18 / 0.62)"
          >${f(0)}${f(1)}${f(2)}</div>

          <div
            data-part="caption-line"
            hidden
            style="position: absolute; left: 50%; bottom: 58px; translate: -50% 0; max-width: 84%; padding: 3px 9px;
                   border-radius: 4px; background: rgb(10 12 18 / 0.74); color: #ffffff; font-size: 12px; text-align: center"
          >${u[0]?.text??``}</div>

          <div
            class="sp-row"
            data-part="bar"
            role="group"
            aria-label="Playback"
            style="position: absolute; left: 10px; right: 10px; bottom: 10px; height: 36px; gap: 8px; padding: 0 8px;
                   border-radius: 8px; background: rgb(10 12 18 / 0.78); color: #ffffff"
          >
            <button class="sp-icon-button" type="button" data-part="transport" aria-label="Pause" style="flex: 0 0 auto; color: inherit">${s}</button>
            <span data-part="elapsed" style="flex: 0 0 auto; width: 28px; font-size: 12px; text-align: right; font-variant-numeric: tabular-nums">0:00</span>
            <div class="sp-progress" data-part="track" style="--sp-value: 0%; flex: 1 1 0; min-width: 0">
              <div class="sp-progress-fill"></div>
            </div>
            <span style="flex: 0 0 auto; width: 28px; font-size: 12px; font-variant-numeric: tabular-nums">${d(t)}</span>
            <span
              aria-hidden="true"
              style="display: flex; flex: 0 0 auto; align-items: center; height: 16px; padding: 0 4px; border: 1px solid currentcolor;
                     border-radius: 3px; font-size: 9px; font-weight: 600; letter-spacing: 0.06em"
              >CC</span
            >
            <button class="sp-icon-button" type="button" data-part="fullscreen" aria-label="Full screen" style="flex: 0 0 auto; color: inherit">${l}</button>
          </div>
        </div>

        <div class="sp-row sp-context" style="margin-top: 10px; justify-content: flex-end">
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="stall">Stall</button>
        </div>
      </div>
    </div>
  `;let o=e(i,`player`),p=e(i,`overlay`),m=e(i,`buffering`),h=e(i,`caption-line`),g=e(i,`transport`),_=e(i,`elapsed`),v=e(i,`track`),y=0,b,x,S=()=>{_.textContent=d(y),v.style.setProperty(`--sp-value`,`${y/t*100}%`);let e=[...u].reverse().find(e=>y>=e.at);e&&(h.textContent=e.text)},C=e=>{o.dataset.state=e,p.hidden=e!==`paused`,m.hidden=e!==`buffering`,h.hidden=e!==`playing`,g.style.visibility=e===`paused`?`hidden`:`visible`},w=()=>{if(y=Math.min(y+1,t),S(),y>=t){C(`paused`);return}b=a.setTimeout(w,n)},T=()=>{a.clearTimeout(b),C(`playing`),b=a.setTimeout(w,n)},E=()=>{a.clearTimeout(b),a.clearTimeout(x),C(`buffering`),x=a.setTimeout(T,r)};e(i,`play`).addEventListener(`click`,E),e(i,`stall`).addEventListener(`click`,E),g.addEventListener(`click`,()=>{a.clearTimeout(b),a.clearTimeout(x),C(`paused`)}),C(`paused`),S()}export{p as mount};