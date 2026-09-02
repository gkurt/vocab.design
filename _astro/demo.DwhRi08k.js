import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={world:`Diegetic: the ammunition is printed on the weapon and the health is a display on the wrist, so the character can read both. Angle, shadow and perspective apply to them.`,hud:`Non-diegetic: the same two facts in screen space, flat, square to the frame, and visible to the player alone. The world does not contain them.`};function n(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 460px; height: 262px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 12.5px">Ammunition 24 of 90, health 78</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-axis="Placement" data-value="world" style="flex: 0 0 auto">
            <button class="sp-segment" data-part="seg-world" type="button" value="world" style="padding: 4px 9px; font-size: 11.5px">In the world</button>
            <button class="sp-segment" data-part="seg-hud" type="button" value="hud" style="padding: 4px 9px; font-size: 11.5px">On the screen</button>
          </sp-segmented>
        </div>

        <div
          data-part="scene"
          data-mode="world"
          style="position: relative; flex: 1 1 auto; min-height: 0; overflow: hidden; background: linear-gradient(180deg, #26374f 0%, #1a2739 46%, #0f1723 100%)"
        >
          <div style="position: absolute; left: -60%; right: -60%; bottom: -22px; height: 210px; transform-origin: bottom center; transform: perspective(190px) rotateX(64deg); background-image: repeating-linear-gradient(90deg, rgba(150,195,255,0.20) 0 1px, transparent 1px 46px), repeating-linear-gradient(0deg, rgba(150,195,255,0.16) 0 1px, transparent 1px 36px)"></div>

          <div style="position: absolute; left: 58px; top: 100px; width: 76px; height: 54px; border-radius: 3px; background: linear-gradient(180deg, #21304a, #16202f); border: 1px solid rgba(255,255,255,0.09); transform: rotate(-2deg) skewY(3deg)"></div>
          <div style="position: absolute; left: 176px; top: 110px; width: 58px; height: 40px; border-radius: 3px; background: linear-gradient(180deg, #1e2b42, #131c29); border: 1px solid rgba(255,255,255,0.07); transform: rotate(1deg) skewY(-2deg)"></div>

          <div style="position: absolute; left: 6px; bottom: -26px; width: 168px; height: 74px; border-radius: 12px; background: linear-gradient(160deg, #384457, #1c2431); transform: rotate(-9deg)"></div>

          <div
            data-part="wrist"
            style="position: absolute; left: 30px; bottom: 18px; width: 106px; height: 46px; padding: 6px 9px; border-radius: 7px; background: rgba(9,20,30,0.86); border: 1px solid rgba(125,211,252,0.42); box-shadow: 0 0 12px rgba(125,211,252,0.18); transform: rotate(-9deg) skewY(3deg)"
          >
            <div data-part="wrist-figures" style="display: block; color: #7dd3fc">
              <span style="display: flex; align-items: baseline; justify-content: space-between; font-size: 10px; letter-spacing: 0.6px">SUIT<span style="font-size: 13px; font-weight: 600">78</span></span>
              <span style="display: block; margin-top: 5px; height: 5px; border-radius: 3px; background: rgba(125,211,252,0.22)"><span style="display: block; width: 78%; height: 100%; border-radius: 3px; background: #7dd3fc"></span></span>
            </div>
          </div>

          <div style="position: absolute; right: -14px; bottom: -16px; width: 252px; height: 124px; transform: rotate(-7deg)">
            <div style="position: absolute; left: 0; top: 32px; width: 168px; height: 15px; border-radius: 3px; background: linear-gradient(180deg, #4a5670, #232b39)"></div>
            <div style="position: absolute; left: 128px; top: 18px; width: 112px; height: 64px; border-radius: 7px; background: linear-gradient(180deg, #3d4859, #1f2734); border: 1px solid rgba(255,255,255,0.10)"></div>
            <div style="position: absolute; left: 176px; top: 72px; width: 42px; height: 52px; border-radius: 5px; background: linear-gradient(180deg, #333c4b, #1b222d); transform: rotate(13deg)"></div>
            <div
              data-part="readout"
              data-subject
              style="position: absolute; left: 140px; top: 30px; width: 78px; height: 30px; display: flex; align-items: center; justify-content: center; gap: 3px; border-radius: 4px; background: rgba(8,19,28,0.88); border: 1px solid rgba(125,211,252,0.55); box-shadow: 0 0 10px rgba(125,211,252,0.22); color: #7dd3fc; font-size: 13px; font-weight: 600; letter-spacing: 0.5px; transform: skewX(-9deg)"
            >24<span style="opacity: 0.6">/</span>90</div>
          </div>

          <div data-part="hud" style="position: absolute; inset: 0; display: none">
            <div style="position: absolute; left: 14px; top: 12px">
              <span style="display: block; color: #93a4bb; font-size: 9px; letter-spacing: 1px">HEALTH</span>
              <span style="display: flex; align-items: center; gap: 7px; margin-top: 3px">
                <span style="display: block; width: 88px; height: 6px; border-radius: 3px; background: rgba(226,232,240,0.22)"><span style="display: block; width: 78%; height: 100%; border-radius: 3px; background: #e2e8f0"></span></span>
                <span style="color: #e8edf5; font-size: 12px; font-weight: 600">78</span>
              </span>
            </div>
            <div data-part="hud-ammo" style="position: absolute; right: 16px; bottom: 14px; text-align: right">
              <span style="display: block; color: #93a4bb; font-size: 9px; letter-spacing: 1px">AMMO</span>
              <span style="display: block; color: #e8edf5; font-size: 19px; font-weight: 600; line-height: 22px">24 / 90</span>
            </div>
          </div>
        </div>
      </div>

      <span class="sp-text sp-context" data-stage-verdict data-part="note" style="width: 452px; height: 30px; flex: 0 0 auto; font-size: 11px; line-height: 1.35">${t.world}</span>
    </div>
  `;let r=e(n,`scene`),i=e(n,`readout`),a=e(n,`wrist-figures`),o=e(n,`hud`),s=e(n,`note`),c=e=>{r.dataset.mode=e,i.style.display=e===`world`?`flex`:`none`,a.style.display=e===`world`?`block`:`none`,o.style.display=e===`hud`?`block`:`none`,s.textContent=t[e]};e(n,`mode`).addEventListener(`change`,e=>{c(e.detail===`hud`?`hud`:`world`)}),c(`world`)}export{n as mount};