import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n={portrait:{w:86,h:140},landscape:{w:140,h:86}},r={landscape:`Criterion 1.3.4 asks that view and operation not be restricted to one orientation unless it is essential. A mounted device cannot be turned.`,portrait:`Upright, nothing looks wrong. A lock costs nothing at all until the reader is the one who cannot turn the device.`};function i(i){let a=()=>`
    <div class="sp-row" style="gap: 5px">
      <span style="flex: 0 0 auto; width: 6px; height: 6px; border-radius: 50%; background: var(--sp-accent)"></span>
      <span class="sp-line" style="flex: 1 1 auto; height: 5px"></span>
    </div>`,o=e=>`
    <div class="sp-stack" data-part="app-${e}" style="height: 100%; padding: 6px; gap: 5px">
      <span class="sp-label" style="font-size: 9px">Inbox</span>
      <div data-part="rows-${e}" style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px 6px">
        ${a()}${a()}${a()}${a()}
      </div>
    </div>`;i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Orientation" data-term="landscape" data-part="segmented" data-value="landscape">
            <button class="sp-segment" data-part="seg-portrait" value="portrait"
                    style="padding: 5px 10px; font-size: 12px">Upright</button>
            <button class="sp-segment" data-part="seg-landscape" value="landscape"
                    style="padding: 5px 10px; font-size: 12px">Turned</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="margin-top: 10px; height: 160px; gap: 24px; align-items: flex-end;
                                   justify-content: center">
          <div style="flex: 0 0 auto; display: flex; flex-direction: column; align-items: center; gap: 6px">
            <div class="sp-surface" data-part="shell-locked"
                 style="width: 140px; height: 86px; padding: 5px; background: var(--sp-sunken); border-radius: 12px;
                        transition: width 0.28s var(--sp-ease), height 0.28s var(--sp-ease)">
              <div class="sp-surface" data-part="view-locked" data-subject data-pose="[data-blocked]" data-blocked
                   style="width: 100%; height: 100%; overflow: hidden; border-radius: 8px">
                ${o(`locked`)}
    <div class="sp-empty" data-part="wall" style="gap: 5px; padding: 6px">
      <svg class="sp-icon" viewBox="0 0 24 24" aria-hidden="true" style="width: 22px; height: 22px; color: var(--sp-muted)">
        <rect x="8" y="3.5" width="8" height="17" rx="2"></rect>
        <path d="M4.4 13.6a8 8 0 0 0 2.6 4.7"></path>
        <path d="m3 12.1 1.4 1.8 1.8-1.4"></path>
      </svg>
      <span class="sp-text" style="font-size: 9px; line-height: 1.3">Rotate your device</span>
    </div>
              </div>
            </div>
          </div>

          <div class="sp-context" style="flex: 0 0 auto; display: flex; flex-direction: column; align-items: center; gap: 6px">
            <div class="sp-surface" data-part="shell-fluid"
                 style="width: 140px; height: 86px; padding: 5px; background: var(--sp-sunken); border-radius: 12px;
                        transition: width 0.28s var(--sp-ease), height 0.28s var(--sp-ease)">
              <div class="sp-surface" data-part="view-fluid"
                   style="width: 100%; height: 100%; overflow: hidden; border-radius: 8px">
                ${o(`fluid`)}
              </div>
            </div>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-orientation="landscape"
           style="margin: 9px 0 0; height: 32px; font-size: 11px">${r.landscape}</p>
      </div>
    </div>
  `;let s=e(i,`view-locked`),c=e(i,`app-locked`),l=e(i,`wall`),u=e(i,`caption`),d=a=>{let o=n[a];for(let t of[`shell-locked`,`shell-fluid`]){let n=e(i,t);n.style.width=`${o.w}px`,n.style.height=`${o.h}px`}for(let t of[`rows-locked`,`rows-fluid`])e(i,t).style.gridTemplateColumns=a===`landscape`?`1fr 1fr`:`1fr`;let d=a===`landscape`;t(s,`data-blocked`,d),t(c,`hidden`,d),t(l,`hidden`,!d),u.dataset.orientation=a,u.textContent=r[a]};d(`landscape`),e(i,`segmented`).addEventListener(`change`,e=>{d(e.detail)})}export{i as mount};