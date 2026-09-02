import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=316,n=178,r={x:Math.round(t*.05),y:Math.round(n*.05)},i={x:Math.round(t*.1),y:Math.round(n*.1)},a=9,o=`repeating-linear-gradient(45deg, rgb(255 255 255 / 0.2) 0 4px, transparent 4px 9px)`,s={title:`${i.y}px ${i.x}px`,action:`${r.y}px ${r.x}px`,edge:`-${a}px -${a}px`},c={title:`Inside title safe (${i.x} by ${i.y} on this panel): text, buttons and anything focusable are clear of the crop on every set.`,action:`Out at action safe (${r.x} by ${r.y}): fine for artwork and motion, but the title and the button now sit in the strip a set may crop.`,edge:`Laid out to the physical edge: this set crops the outer frame, so the title loses its top and the button loses its end.`};function l(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Television layout</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="insets" data-value="title" data-axis="Inset">
            <button class="sp-segment" type="button" data-part="seg-title" value="title" style="padding: 4px 8px; font-size: 11px">title safe</button>
            <button class="sp-segment" type="button" data-part="seg-action" value="action" style="padding: 4px 8px; font-size: 11px">action safe</button>
            <button class="sp-segment" type="button" data-part="seg-edge" value="edge" style="padding: 4px 8px; font-size: 11px">to the edge</button>
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 8px 12px">
          <div
            class="sp-context"
            data-part="set"
            style="flex: 0 0 auto; padding: 5px; border-radius: 10px; background: var(--sp-ink); box-shadow: var(--sp-shadow)"
          >
            <div
              data-part="panel"
              style="position: relative; width: ${t}px; height: ${n}px; overflow: hidden; border-radius: 4px;
                     background: linear-gradient(155deg, #24314f 0%, #3b4a76 55%, #63527f 100%)"
            >
              <span
                data-part="band"
                data-subject
                aria-hidden="true"
                style="position: absolute; inset: 0; z-index: 1; pointer-events: none"
              >
                <span style="position: absolute; top: 0; left: 0; right: 0; height: ${r.y}px; background: ${o}"></span>
                <span style="position: absolute; bottom: 0; left: 0; right: 0; height: ${r.y}px; background: ${o}"></span>
                <span style="position: absolute; top: ${r.y}px; bottom: ${r.y}px; left: 0; width: ${r.x}px; background: ${o}"></span>
                <span style="position: absolute; top: ${r.y}px; bottom: ${r.y}px; right: 0; width: ${r.x}px; background: ${o}"></span>
              </span>
              <span
                data-part="guide-action"
                aria-hidden="true"
                style="position: absolute; inset: ${r.y-2}px ${r.x-2}px; z-index: 2; border: 2px dashed rgb(255 255 255 / 0.6);
                       border-radius: 3px; pointer-events: none"
              ></span>
              <span
                data-part="guide-title"
                aria-hidden="true"
                style="position: absolute; inset: ${i.y-2}px ${i.x-2}px; z-index: 2; border: 2px solid rgb(255 255 255 / 0.85);
                       border-radius: 3px; pointer-events: none"
              ></span>
              <div
                data-part="content"
                data-mode="title"
                style="position: absolute; inset: ${s.title}; z-index: 3; display: flex; flex-direction: column;
                       justify-content: space-between; color: #ffffff;
                       transition: inset 0.32s var(--sp-ease)"
              >
                <span class="sp-heading" data-part="title" style="font-size: 15px; line-height: 1.1; color: #ffffff">Tonight, channel four</span>
                <div class="sp-row" data-part="tiles" style="gap: 8px">
                  <span class="sp-swatch" style="width: 46px; height: 30px; --sp-swatch: rgb(255 255 255 / 0.35)"></span>
                  <span class="sp-swatch" style="width: 46px; height: 30px; --sp-swatch: rgb(255 255 255 / 0.28)"></span>
                  <span class="sp-swatch" style="width: 46px; height: 30px; --sp-swatch: rgb(255 255 255 / 0.22)"></span>
                </div>
                <div class="sp-row sp-row--between" style="gap: 8px">
                  <button class="sp-button sp-button--sm" type="button" data-part="cta" style="font-size: 12px">Resume</button>
                  <span class="sp-label" data-part="clock" style="font-size: 11px; color: rgb(255 255 255 / 0.8)">21:04</span>
                </div>
              </div>
            </div>
          </div>

          <div class="sp-row sp-context" style="flex: 0 0 auto; gap: 12px; height: 16px">
            <span class="sp-label" style="display: flex; align-items: center; gap: 5px; font-size: 10px">
              <span style="width: 14px; height: 0; border-top: 2px dashed var(--sp-muted)"></span>crop, 5%
            </span>
            <span class="sp-label" style="display: flex; align-items: center; gap: 5px; font-size: 10px">
              <span style="width: 14px; height: 0; border-top: 2px solid var(--sp-ink)"></span>title safe, 10%
            </span>
          </div>

          <span
            class="sp-text sp-context"
            data-stage-verdict data-part="caption"
            data-mode="title"
            style="flex: 0 0 auto; width: 440px; height: 34px; font-size: 12px; line-height: 1.4; text-align: center"
          ></span>
        </div>
      </div>
    </div>
  `;let l=e(a,`content`),u=e(a,`caption`),d=e=>{l.dataset.mode=e,l.style.inset=s[e],u.dataset.mode=e,u.textContent=c[e]};e(a,`insets`).addEventListener(`change`,e=>d(e.detail)),d(`title`)}export{l as mount};