import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n=448,r=216,i=136,a=78,o=12,s={br:{x:300,y:126},bl:{x:o,y:126},tl:{x:o,y:o}},c=`linear-gradient(150deg, #2f3d63, #6d4f86 58%, #b8734d)`;function l(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Corner</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-axis="Position" data-value="br">
            <button class="sp-segment" type="button" data-part="seg-br" value="br">bottom right</button>
            <button class="sp-segment" type="button" data-part="seg-bl" value="bl">bottom left</button>
            <button class="sp-segment" type="button" data-part="seg-tl" value="tl">top left</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; justify-content: center; align-items: center">
          <div data-part="page" style="position: relative; width: ${n}px; height: ${r}px; overflow: hidden; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)">
            <div class="sp-context" style="display: flex; gap: 12px; padding: 12px">
              <div class="sp-stack" style="flex: 0 0 auto; width: 186px; gap: 8px">
                <div
                  data-part="slot"
                  data-state="inline"
                  style="display: flex; align-items: center; justify-content: center; width: 186px; height: 104px; border-radius: 6px; background: ${c}"
                >
                  <span data-part="slot-note" class="sp-label" style="display: none; padding: 0 10px; text-align: center">playing in the mini player</span>
                </div>
                <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="pop" style="width: 100%">Pop out</button>
              </div>
              <div class="sp-stack" style="flex: 1 1 auto; min-width: 0; gap: 7px">
                <span class="sp-heading">Tidal turbines</span>
                <div class="sp-line" style="width: 96%"></div>
                <div class="sp-line" style="width: 88%"></div>
                <div class="sp-line" style="width: 92%"></div>
                <div class="sp-line" style="width: 74%"></div>
                <div class="sp-line" style="width: 90%"></div>
                <div class="sp-line" style="width: 62%"></div>
              </div>
            </div>
            <div
              data-part="mini"
              data-subject
              data-corner="br"
              hidden
              style="position: absolute; top: 0; left: 0; z-index: 2; width: ${i}px; height: ${a}px; padding: 6px; border-radius: 8px; background: ${c}; box-shadow: var(--sp-shadow); transition: translate 0.28s var(--sp-ease)"
            >
              <div class="sp-row sp-row--between" style="align-items: flex-start">
                <span class="sp-label" style="color: rgb(255 255 255 / 0.86)">Tidal turbines</span>
                <button class="sp-icon-button" type="button" data-part="close" style="width: 20px; height: 20px; color: #ffffff">
                  ${t(`close`)}
                  <span class="sp-visually-hidden">Back to the article</span>
                </button>
              </div>
              <div style="position: absolute; left: 6px; right: 6px; bottom: 8px; height: 3px; border-radius: 999px; background: rgb(255 255 255 / 0.32)">
                <div style="width: 38%; height: 100%; border-radius: inherit; background: #ffffff"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let l=e(o,`mini`),u=e(o,`slot`),d=e(o,`slot-note`),f=e=>{let t=s[e];t&&(l.dataset.corner=e,l.style.translate=`${t.x}px ${t.y}px`)},p=e=>{l.hidden=!e,u.dataset.state=e?`popped`:`inline`,u.style.background=e?`var(--sp-sunken)`:c,d.style.display=e?`block`:`none`};e(o,`pop`).addEventListener(`click`,()=>p(!0)),e(o,`close`).addEventListener(`click`,()=>p(!1)),e(o,`switcher`).addEventListener(`change`,e=>f(e.detail)),f(`br`),p(!1)}export{l as mount};