import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./motion.B5_YXmsy.js";var n=`'DejaVu Sans Mono', 'Courier New', ui-monospace, monospace`,r=`linear-gradient(180deg, #7f93a6 0%, #b9bda6 44%, #d8c79c 62%, #6f7a5e 100%)`,i=`repeating-linear-gradient(180deg, rgb(255 255 255 / 0.5) 0 1px, rgb(20 24 20 / 0.22) 1px 3px), linear-gradient(180deg, transparent 0%, rgb(255 255 255 / 0.34) 46%, transparent 100%)`,a=`text-shadow: 2px 0 0 rgb(255 42 122 / 0.72), -2px 0 0 rgb(0 214 255 / 0.72), 0 0 12px rgb(255 255 255 / 0.3)`,o=`font-family: ${n}; color: #f4f6ef; text-shadow: 0 2px 0 rgb(0 0 0 / 0.55)`;function s(s){s.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div data-part="frame" data-subject
           style="position: relative; width: 300px; height: 190px; overflow: hidden; border-radius: 3px; background: #0a0c0a; box-shadow: 0 8px 20px rgb(0 0 0 / 0.35)">

        <span data-part="picture" aria-hidden="true"
              style="position: absolute; inset: 0; background-image: ${r}; filter: saturate(0.78) contrast(0.9) blur(0.4px)">
          <span style="position: absolute; left: 210px; top: 30px; width: 46px; height: 46px; border-radius: 50%; background: rgb(255 236 186 / 0.85); filter: blur(2px)"></span>
          <span style="position: absolute; left: -20px; bottom: 46px; width: 190px; height: 86px; border-radius: 50% 50% 0 0; background: rgb(96 108 78 / 0.9)"></span>
          <span style="position: absolute; right: -30px; bottom: 52px; width: 170px; height: 64px; border-radius: 50% 50% 0 0; background: rgb(78 88 66 / 0.85)"></span>
          <span style="position: absolute; left: 0; right: 0; bottom: 0; height: 52px; background: linear-gradient(180deg, #5d6a4c, #3d452f)"></span>
        </span>

        <span aria-hidden="true" style="position: absolute; inset: 0; background: radial-gradient(120% 100% at 50% 46%, transparent 46%, rgb(6 8 6 / 0.5) 100%)"></span>
        <span data-part="dropouts" aria-hidden="true" style="position: absolute; inset: 0">${[[44,38],[212,62],[96,150],[258,128]].map(([e,t])=>`<span style="position: absolute; left: ${e}px; top: ${t}px; width: 3px; height: 2px; background: rgb(255 255 255 / 0.8)"></span>`).join(``)}</span>

        <div data-part="title"
             style="position: absolute; left: 0; right: 0; top: 66px; text-align: center; font-family: ${n}; font-size: 25px; font-weight: 700; letter-spacing: 0.12em; line-height: 1; color: #f7f8f2; ${a}">
          SUMMER 94
        </div>

        <div data-part="osd" style="position: absolute; left: 12px; top: 10px; display: flex; gap: 10px; font-size: 12px; letter-spacing: 0.18em; ${o}">
          <span>▶ PLAY</span>
          <span>SP</span>
        </div>
        <div data-part="counter" style="position: absolute; right: 12px; top: 10px; font-size: 12px; letter-spacing: 0.14em; ${o}">0:12:37</div>
        <div data-part="stamp" style="position: absolute; right: 12px; bottom: 10px; text-align: right; font-size: 11px; letter-spacing: 0.14em; line-height: 1.5; ${o}">
          AUG 14 1994<br>10:32 PM
        </div>

        <span data-part="band" aria-hidden="true"
              style="position: absolute; left: -12px; right: -12px; top: 116px; height: 24px; background-image: ${i}; transform: skewX(-1.2deg); filter: blur(0.5px); opacity: 0.85; pointer-events: none"></span>
      </div>

      <div class="sp-context sp-row" style="gap: 8px">
        <span class="sp-label">Tracking</span>
        <button class="sp-button sp-button--quiet sp-button--sm" type="button" data-part="roll">Roll the band</button>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 300px; margin: 0; text-align: center">
        Washed colour, torn tracking band, chroma fringe, and the recorder's own overlay.
      </p>
    </div>
  `;let c=e(s,`band`);e(s,`roll`).addEventListener(`click`,()=>{t(s)||c.animate([{transform:`translateY(-134px) skewX(-1.2deg)`},{transform:`translateY(66px) skewX(-1.2deg)`}],{duration:1500,easing:`linear`})})}export{s as mount};