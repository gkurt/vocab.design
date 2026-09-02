import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./motion.B5_YXmsy.js";var n=48,r=240,i=19,a=`
  <svg viewBox="0 0 24 24" aria-hidden="true" style="width: 22px; height: 22px; fill: currentcolor; stroke: none">
    <path d="M8 5.2 18.4 12 8 18.8z" />
  </svg>`,o=e=>`0:${String(Math.floor(e)).padStart(2,`0`)}`,s=({key:e,label:t,sky:n,boat:r,state:i,subject:o,context:s})=>`
  <div class="${s?`sp-context`:``}" style="flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; gap: 6px">
    <span class="sp-label" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${t}</span>
    <div
      data-part="${e}-picture"
      ${o?`data-subject`:``}
      data-state="${i}"
      style="position: relative; height: 126px; border-radius: 6px; overflow: hidden; background: ${n}"
    >
      <div aria-hidden="true" style="position: absolute; inset: 0; overflow: hidden">
        <div style="position: absolute; right: 24px; top: 14px; width: 28px; height: 28px; border-radius: 50%; background: #f7e6bb; opacity: 0.72"></div>
        <div style="position: absolute; left: -26px; right: 46%; bottom: 30px; height: 56px; border-radius: 50% 50% 0 0; background: rgb(12 20 30 / 0.55)"></div>
        <div style="position: absolute; left: 40%; right: -30px; bottom: 30px; height: 42px; border-radius: 50% 50% 0 0; background: rgb(12 20 30 / 0.4)"></div>
        <div style="position: absolute; left: 0; right: 0; bottom: 0; height: 44px; background: rgb(8 12 18 / 0.42)"></div>
      </div>

      <div
        data-part="${e}-boat"
        aria-hidden="true"
        style="position: absolute; bottom: 30px; left: 6%; width: 22px; height: 9px; border-radius: 1px 1px 7px 7px;
               background: ${r}; box-shadow: 0 1px 3px rgb(8 12 18 / 0.5); transition: left 0.22s linear"
      ></div>

      <span
        data-part="${e}-badge"
        style="position: absolute; left: 8px; top: 8px; padding: 2px 7px; border-radius: 999px;
               background: rgb(8 12 18 / 0.68); color: #ffffff; font-size: 11px; font-weight: 500; white-space: nowrap"
      ></span>

      ${i===`blocked`?`<div
        data-part="${e}-overlay"
        style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; pointer-events: none"
      >
        <button
          type="button"
          data-part="${e}-play"
          aria-label="Play with sound"
          style="display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; padding: 0 0 0 2px;
                 border: 0; border-radius: 50%; background: rgb(8 12 18 / 0.66); color: #ffffff; cursor: pointer; pointer-events: auto"
        >${a}</button>
      </div>`:``}

      <div class="sp-row" style="position: absolute; left: 8px; right: 8px; bottom: 8px; gap: 6px">
        <span
          data-part="${e}-time"
          style="flex: 0 0 auto; color: #ffffff; font-size: 11px; font-variant-numeric: tabular-nums"
          >0:00</span
        >
        <div
          class="sp-progress"
          data-part="${e}-track"
          style="--sp-value: 0%; flex: 1 1 0; min-width: 0; height: 4px; background: rgb(255 255 255 / 0.3)"
        >
          <div class="sp-progress-fill"></div>
        </div>
      </div>
    </div>
  </div>`;function c(a,c){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 460px; padding: 12px">
        <div class="sp-row" style="align-items: flex-start; gap: 12px">
          ${s({key:`a`,label:`Ferry to Ullapool`,sky:`linear-gradient(165deg, #2b3a67 0%, #4c6ea8 55%, #b9cfd8 100%)`,boat:`#f1e6d0`,state:`blocked`,context:!0})}
          ${s({key:`b`,label:`Harbour at dusk`,sky:`linear-gradient(165deg, #1f3d3a 0%, #3f7d6e 52%, #cfe0c8 100%)`,boat:`#f1eddc`,state:`playing`,subject:!0})}
        </div>
      </div>
    </div>
  `;let l=t(a),u={a:`blocked`,b:`playing`},d={a:0,b:l?i:0},f=e=>u[e]===`blocked`?`Refused: sound`:e===`b`?`Playing, muted`:`Playing, sound on`,p=t=>{let r=d[t];e(a,`${t}-time`).textContent=o(r),e(a,`${t}-track`).style.setProperty(`--sp-value`,`${r/n*100}%`),e(a,`${t}-boat`).style.left=`${6+r/n*78}%`,e(a,`${t}-badge`).textContent=f(t)},m=()=>{for(let e of[`a`,`b`])u[e]===`playing`&&(d[e]=Math.min(d[e]+1,n),p(e));c.setTimeout(m,r)};e(a,`a-play`).addEventListener(`click`,()=>{u.a=`playing`,l&&(d.a=i);let t=e(a,`a-picture`);t.dataset.state=`playing`,e(a,`a-overlay`).hidden=!0,p(`a`)}),p(`a`),p(`b`),l||c.setTimeout(m,r)}export{c as mount};