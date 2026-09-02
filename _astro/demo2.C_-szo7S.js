import{n as e}from"./parts.C-YLuC7Q.js";function t(t){t.innerHTML=`
    <div class="sp-app">
      <div class="sp-row" style="align-items: flex-start; gap: 26px">
        <div class="sp-stack" style="gap: 10px">
          <div data-part="maximal" data-subject
               style="position: relative; width: 242px; min-height: 226px; padding: 14px; border: 3px solid #1b1033; border-radius: 18px; color: #1b1033; overflow: hidden; background-color: #ffd93d; background-image: repeating-linear-gradient(45deg, rgb(27 16 51 / 0.13) 0 6px, transparent 6px 15px), radial-gradient(circle at 84% 8%, #ff4fa3 0 30%, transparent 31%); box-shadow: 8px 8px 0 0 #6d28d9, 15px 15px 0 0 #22d3ee">
            <span data-part="sticker"
                  style="position: absolute; right: -4px; top: 18px; rotate: 13deg; padding: 3px 11px; border: 2px solid #1b1033; border-radius: 4px; background: #39ff88; font-size: 11px; font-weight: 800; letter-spacing: 0.1em">HOT</span>
            <div style="font-size: 26px; font-weight: 900; line-height: 0.95; letter-spacing: -0.03em; text-transform: uppercase; text-shadow: 3px 3px 0 #ff4fa3">
              More is<br>more
            </div>
            <div style="margin-top: 6px; font-family: Georgia, 'Times New Roman', serif; font-style: italic; font-size: 14px">
              and then some.
            </div>
            <p data-part="copy"
               style="margin: 8px 0 0; padding: 6px 8px; border: 2px solid #1b1033; border-radius: 6px; background: #fffdf3; font-size: 12px; line-height: 1.4">
              Two nights, three courses, and the late ferry home. Book by Friday.
            </p>
            <button data-part="pile" type="button"
                    style="margin-top: 10px; padding: 7px 14px; border: 2px solid #1b1033; border-radius: 999px; background: #22d3ee; color: #1b1033; font: inherit; font-size: 13px; font-weight: 800; letter-spacing: 0.04em; cursor: pointer; box-shadow: 3px 3px 0 0 #1b1033">
              PILE IT ON
            </button>
            <div data-part="extra"
                 style="height: 24px; margin-top: 8px; display: flex; align-items: center; gap: 6px; opacity: 0; transition: opacity 0.25s var(--sp-ease)">
              <span style="padding: 2px 8px; border: 2px solid #1b1033; border-radius: 4px; background: #ff4fa3; font-size: 10px; font-weight: 800">FREE</span>
              <span style="padding: 2px 8px; border: 2px solid #1b1033; border-radius: 4px; background: #a78bfa; font-size: 10px; font-weight: 800">TODAY</span>
              <span style="padding: 2px 8px; border: 2px solid #1b1033; border-radius: 4px; background: #fb923c; font-size: 10px; font-weight: 800">ONLY</span>
            </div>
          </div>
        </div>

        <div class="sp-stack sp-context" style="gap: 10px">
          <div class="sp-window" data-part="plain" style="width: 150px; min-height: 226px; padding: 16px">
            <div style="font-size: 15px; font-weight: 600">More is more</div>
            <p class="sp-text" style="margin: 8px 0 0">Two nights, three courses, late ferry home. Book by Friday.</p>
            <button class="sp-button sp-button--sm" type="button" style="margin-top: 14px">Pile it on</button>
          </div>
        </div>
      </div>
    </div>
  `;let n=e(t,`pile`),r=e(t,`extra`);n.addEventListener(`click`,()=>{r.style.opacity=`1`})}export{t as mount};