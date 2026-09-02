import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{t}from"./motion.B5_YXmsy.js";var n=`repeating-linear-gradient(to bottom, rgb(0 0 0 / 0.44) 0 1px, transparent 1px 3px)`,r=`radial-gradient(120% 100% at 50% 46%, transparent 42%, rgb(2 6 10 / 0.62) 100%)`,i=[`#c8c8c8`,`#c8c800`,`#00c8c8`,`#00c832`,`#c800c8`,`#c81e1e`,`#2a2ac8`];function a(a){a.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div data-part="screen" data-subject
           style="position: relative; width: 300px; height: 172px; padding: 14px 16px; border-radius: 16px / 22px; background: #0d1418; color: #d8f0ff; overflow: hidden; box-shadow: inset 0 0 40px rgb(120 200 255 / 0.12), 0 0 0 4px #23282c, 0 10px 24px rgb(0 0 0 / 0.45)">
        <div data-part="content"
             style="position: relative; height: 100%; display: flex; flex-direction: column; text-shadow: 0 0 8px rgb(150 220 255 / 0.55)">
          <div style="display: flex; justify-content: space-between; font-size: 11px; letter-spacing: 0.24em">
            <span>CH 04</span>
            <span style="font-variant-numeric: tabular-nums">23:47</span>
          </div>
          <div style="flex: 1 1 auto; display: flex; align-items: center; justify-content: center; font-size: 26px; font-weight: 700; letter-spacing: 0.14em">
            TEST CARD
          </div>
          <div data-part="bars" aria-hidden="true" style="display: flex; height: 26px; opacity: 0.82">${i.map(e=>`<span style="flex: 1 1 0; background: ${e}"></span>`).join(``)}</div>
        </div>

        <span aria-hidden="true" style="position: absolute; inset: 0; pointer-events: none; background-image: ${r}"></span>
        <span data-part="raster" aria-hidden="true"
              style="position: absolute; inset: 0; pointer-events: none; background-image: ${n}; transition: opacity 0.18s linear"></span>
      </div>

      <div class="sp-context sp-row" style="gap: 8px">
        <sp-segmented data-stage-mode class="sp-segmented" data-axis="Raster" data-part="switcher" data-value="on">
          <button class="sp-segment" type="button" data-part="seg-on" value="on">Over</button>
          <button class="sp-segment" type="button" data-part="seg-off" value="off">Off</button>
        </sp-segmented>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 300px; margin: 0; text-align: center">
        One repeating gradient, one pixel dark every three, laid over a picture that is otherwise flat.
      </p>
    </div>
  `;let o=e(a,`screen`),s=e(a,`raster`);e(a,`switcher`).addEventListener(`change`,e=>{let n=e.detail;s.style.opacity=n===`on`?`1`:`0`,!(n!==`on`||t(a))&&o.animate([{filter:`brightness(1.4)`},{filter:`brightness(0.78)`},{filter:`brightness(1)`}],{duration:420,easing:`ease-out`})})}export{a as mount};