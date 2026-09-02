import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[{key:`rest`,label:`Rest`,attribute:``},{key:`hover`,label:`Hover`,attribute:`data-hovered`},{key:`press`,label:`Pressed`,attribute:`data-pressed`}];function r(r){r.innerHTML=`
    <div class="sp-app" data-loop="keep">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Pointer state</span>
          <span class="sp-text" data-part="readout" style="width: 96px; text-align: right">Away</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 16px">
          <div class="sp-row sp-context" data-part="reference" style="gap: 20px; margin-top: 4px">${n.map(({key:e,label:t,attribute:n})=>`
      <div style="display: flex; flex-direction: column; align-items: center; gap: 6px">
        <button class="sp-button sp-button--sm" type="button" data-part="state-${e}" ${n} tabindex="-1">Follow</button>
        <span class="sp-label">${t}</span>
      </div>`).join(``)}</div>
          <div class="sp-divider sp-context" style="width: 100%"></div>
          <button class="sp-button" type="button" data-part="live" data-subject>Follow Priya</button>
          <span class="sp-label sp-context" data-stage-verdict data-part="note" style="text-align: center">
            Touch has no resting pointer, so nothing may live behind this state alone.
          </span>
        </div>
      </div>
    </div>
  `;let i=e(r,`live`),a=e(r,`readout`),o=e=>{a.textContent=e};i.addEventListener(`pointerenter`,()=>{t(i,`data-hovered`,!0),o(`Hovering`)}),i.addEventListener(`pointerleave`,()=>{t(i,`data-hovered`,!1),t(i,`data-pressed`,!1),o(`Away`)}),i.addEventListener(`pointerdown`,()=>{t(i,`data-pressed`,!0),o(`Pressed`)}),i.addEventListener(`pointerup`,()=>{t(i,`data-pressed`,!1),o(i.hasAttribute(`data-hovered`)?`Hovering`:`Away`)})}export{r as mount};