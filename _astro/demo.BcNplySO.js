import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n=26,r=18,i=12,a=`repeating-linear-gradient(45deg, var(--sp-line) 0 4px, transparent 4px 9px)`;function o(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 296px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Layout</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-value="safe" data-axis="Content" data-term="safe">
            <button class="sp-segment" type="button" data-part="seg-edge" value="edge">edge to edge</button>
            <button class="sp-segment" type="button" data-part="seg-safe" value="safe">safe area</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; gap: 16px; padding: 12px 14px">
          <div
            class="sp-context"
            data-part="phone"
            style="flex: 0 0 auto; padding: 5px; background: var(--sp-ink); border-radius: 24px"
          >
            <div style="position: relative; width: 148px; height: 226px; background: var(--sp-surface); border-radius: 19px; overflow: hidden">
              <div style="position: absolute; top: 0; left: 0; right: 0; height: ${n}px; background: ${a}"></div>
              <div style="position: absolute; bottom: 0; left: 0; right: 0; height: ${r}px; background: ${a}"></div>
              <div
                data-part="region"
                data-subject
                data-pose="[data-mode=safe]"
                data-mode="safe"
                style="position: absolute; inset: 0; z-index: 1; display: flex; flex-direction: column; justify-content: space-between; padding: ${n}px ${i}px ${r}px"
              >
                <div class="sp-row sp-row--between">
                  ${t(`chevronLeft`)}
                  <span class="sp-heading" data-part="title" style="font-size: 13px">Now playing</span>
                  ${t(`close`)}
                </div>
                <div class="sp-stack" style="gap: 6px">
                  <div class="sp-line" style="width: 90%"></div>
                  <div class="sp-line" style="width: 72%"></div>
                </div>
                <button class="sp-button sp-button--sm" type="button" data-part="cta" style="width: 100%">Continue</button>
              </div>
              <div
                style="position: absolute; z-index: 2; top: 0; left: 50%; translate: -50% 0; width: 62px; height: 15px; background: var(--sp-ink); border-radius: 0 0 9px 9px"
              ></div>
              <div
                style="position: absolute; z-index: 2; bottom: 6px; left: 50%; translate: -50% 0; width: 56px; height: 4px; background: var(--sp-ink); border-radius: 999px; opacity: 0.55"
              ></div>
            </div>
          </div>
          <div class="sp-stack sp-context" style="flex: 1 1 auto; min-width: 0; gap: 8px">
            <span class="sp-label">insets</span>
            <span class="sp-text" data-part="readout" style="height: 76px"></span>
            <div style="height: 26px">
              <span class="sp-chip" data-part="warning" hidden>${t(`alert`)} under the notch</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let s=e(o,`region`),c=e(o,`warning`),l=e(o,`readout`),u=e=>{let t=e===`safe`;s.dataset.mode=t?`safe`:`edge`,s.style.padding=t?`${n}px ${i}px ${r}px`:`2px`,c.hidden=t,l.textContent=t?`padding: env(safe-area-inset-top) ${i}px env(safe-area-inset-bottom), which resolves to ${n}px and ${r}px on this device.`:`No insets: the title runs under the camera housing and the button sits beneath the home indicator, where the system takes the touch.`};e(o,`switcher`).addEventListener(`change`,e=>u(e.detail)),u(`safe`)}export{o as mount};