import{n as e,t}from"./parts.C-YLuC7Q.js";var n=500,r=500,i=[`display: inline`,`padding: 0`,`border: 0`,`background: none`,`font: inherit`,`color: var(--sp-accent)`,`text-decoration: underline`,`text-underline-offset: 2px`,`cursor: pointer`,`touch-action: none`].join(`; `),a=e=>`
  <div
    class="sp-popover"
    data-part="${e}-card"
    id="${e}-card"
    role="tooltip"
    style="left: 0; right: 0; top: 52px; min-width: 0; --sp-arrow-x: 30px"
  >
    <div class="sp-row" style="gap: 8px">
      <span class="sp-avatar">AL</span>
      <div style="min-width: 0">
        <div class="sp-heading" style="font-size: 12px">Ada Lovelace</div>
        <div class="sp-text" style="font-size: 11px">Mathematician, 1815 to 1852</div>
      </div>
    </div>
  </div>`,o=(e,t,n,r)=>`
  <div
    ${n?`data-touch`:``}
    style="flex: 1 1 0; min-width: 0; position: relative; min-height: 112px"
  >
    <span class="sp-label">${t}</span>
    <p class="sp-text sp-text--ink" style="margin: 4px 0 0">
      Translated by
      <button type="button" data-part="${e}-trigger" ${r?`data-subject`:``} interestfor="${e}-card" style="${i}">
        Ada Lovelace</button
      >, 1843.
    </p>
    ${a(e)}
  </div>`;function s(i,a){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 460px; padding: 14px">
        <div class="sp-row" style="align-items: flex-start; gap: 20px">
          ${o(`a`,`Pointer`,!1,!0)}
          ${o(`b`,`Touch`,!0,!1)}
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="note" style="margin: 12px 0 0">
          Interest is defined per input: a pointer dwells, a keyboard focuses, a finger presses and
          holds. Escape always gives it up.
        </p>
      </div>
    </div>
  `;let s={},c=e=>{let n=s[e];n&&(a.clearTimeout(n.timer),n.timer=void 0,t(n.card,`data-open`,!0))},l=e=>{let n=s[e];n&&(a.clearTimeout(n.timer),n.timer=void 0,t(n.card,`data-open`,!1))},u=(e,t,n)=>{let r=s[e];r&&(a.clearTimeout(r.timer),r.timer=a.setTimeout(n,t))};for(let t of[`a`,`b`])s[t]={trigger:e(i,`${t}-trigger`),card:e(i,`${t}-card`)};s.a?.trigger.addEventListener(`pointerenter`,()=>u(`a`,n,()=>c(`a`))),s.a?.trigger.addEventListener(`pointerleave`,()=>u(`a`,r,()=>l(`a`))),s.b?.trigger.addEventListener(`pointerdown`,e=>{e.isTrusted&&e.currentTarget.setPointerCapture(e.pointerId),u(`b`,n,()=>c(`b`))});for(let e of[`pointerup`,`pointercancel`])s.b?.trigger.addEventListener(e,()=>{let e=s.b;e&&!e.card.hasAttribute(`data-open`)&&l(`b`)});for(let e of[`a`,`b`]){let t=s[e];t&&(t.trigger.addEventListener(`focus`,()=>u(e,n,()=>c(e))),t.trigger.addEventListener(`blur`,()=>l(e)),t.trigger.addEventListener(`keydown`,t=>{t.key===`Escape`&&l(e)}))}}export{s as mount};