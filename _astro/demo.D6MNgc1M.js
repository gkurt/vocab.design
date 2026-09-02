import{n as e,r as t,t as n}from"./parts.C-YLuC7Q.js";function r(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-texture" data-part="pad" data-subject
           style="--sp-texture-base: #6b4a2f; width: 300px; padding: 10px; border-radius: 12px; box-shadow: 0 10px 20px rgb(16 24 40 / 0.45), inset 0 1px 0 rgb(255 255 255 / 0.28)">
        <div style="border: 2px dashed rgb(255 226 186 / 0.5); border-radius: 8px; padding: 8px">
          <div class="sp-texture sp-bevel" data-part="hinge"
               style="--sp-texture-base: #9ba1a8; --sp-texture-angle: 90deg; display: flex; align-items: center; justify-content: space-between; padding: 5px 9px; border-radius: 5px">
            <span style="font-size: 12px; font-weight: 700; color: #2c3036; text-shadow: 0 1px 0 rgb(255 255 255 / 0.55)">FIELD NOTES</span>
            <span style="display: flex; gap: 4px">
              <span style="width: 7px; height: 7px; border-radius: 50%; background: #6f757c; box-shadow: inset 0 1px 1px rgb(0 0 0 / 0.6)"></span>
              <span style="width: 7px; height: 7px; border-radius: 50%; background: #6f757c; box-shadow: inset 0 1px 1px rgb(0 0 0 / 0.6)"></span>
            </span>
          </div>

          <div data-part="paper"
               style="margin-top: 8px; padding: 10px 12px; border-radius: 3px; color: #3b3227; font-size: 13px; line-height: 22px; background-color: #f7f1e0; background-image: repeating-linear-gradient(to bottom, transparent 0 21px, rgb(120 150 190 / 0.4) 21px 22px); box-shadow: inset 0 2px 5px rgb(70 45 20 / 0.35)">
            <div data-stage-verdict data-part="note">Ordered the good pencils.</div>
            <div>Tide is out at half past six.</div>
          </div>

          <div class="sp-row" style="margin-top: 9px; gap: 6px">
            <button class="sp-button sp-button--sm sp-bevel" data-part="tool-pen" type="button" data-selected
                    style="background-color: #ded7c6; color: #2f2a22; text-shadow: 0 1px 0 rgb(255 255 255 / 0.6)">Pen</button>
            <button class="sp-button sp-button--sm sp-bevel" data-part="tool-marker" type="button"
                    style="background-color: #ded7c6; color: #2f2a22; text-shadow: 0 1px 0 rgb(255 255 255 / 0.6)">Marker</button>
          </div>
        </div>
      </div>
    </div>
  `;let r=e(n,`note`),a=t(n,`tool-pen`).concat(t(n,`tool-marker`));i(e(n,`tool-pen`),!0);for(let e of a)e.addEventListener(`click`,()=>{for(let t of a)i(t,t===e);let t=e.dataset.part===`tool-marker`;r.style.fontWeight=t?`700`:`400`,r.style.color=t?`#1d4f8a`:`#3b3227`})}function i(e,t){n(e,`data-selected`,t),e.classList.toggle(`sp-bevel`,!t),e.style.backgroundColor=t?`#b9b09a`:`#ded7c6`,e.style.boxShadow=t?`inset 0 3px 6px rgb(55 40 18 / 0.6)`:``,e.style.border=t?`1px solid rgb(0 0 0 / 0.38)`:``,e.style.textShadow=t?`0 1px 0 rgb(255 255 255 / 0.35)`:`0 1px 0 rgb(255 255 255 / 0.6)`}export{r as mount};