import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`ui-monospace, monospace`,n={transform:{css:`translate(0)`,spelling:`transform: translate(0)`,context:!0,note:`A transform makes a context. The 9999 stops at its edge.`},opacity:{css:``,spelling:`opacity: 0.99`,context:!0,note:`Opacity below 1 does it too, and the card looks identical.`},none:{css:``,spelling:`position: relative`,context:!1,note:`No trigger, no context. Now the 9999 competes with the page.`}},r=(e,t,n,r)=>`
  <div
    data-part="${e}"
    ${n}
    style="position: relative; flex: 0 0 auto; width: 180px; height: 118px; padding: 12px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
  >
    <span class="sp-heading" style="font-size: 13px">${t}</span>
    ${r}
  </div>`;function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 268px">
        <sp-segmented data-stage-mode class="sp-segmented" data-axis="Card A" data-part="switcher" data-value="transform">
            <button class="sp-segment" type="button" data-part="seg-transform" value="transform">transform</button>
            <button class="sp-segment" type="button" data-part="seg-opacity" value="opacity">opacity</button>
            <button class="sp-segment" type="button" data-part="seg-none" value="none">neither</button>
          </sp-segmented>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 14px 12px">
          <div class="sp-row" style="flex: 0 0 auto; gap: 16px">
            ${r(`card-a`,`Card A`,`data-subject data-pose="[data-context]" data-context`,`<div class="sp-tooltip" data-part="tip" data-open style="left: 108px; top: 52px; width: 152px; z-index: 9999; text-align: center; white-space: normal; --sp-arrow-x: 22px">z-index: 9999</div>`)}
            ${r(`card-b`,`Card B`,`class="sp-context"`,``)}
          </div>
          <div class="sp-row sp-context" style="flex: 0 0 auto; gap: 8px; height: 26px">
            <span class="sp-label">Card A</span>
            <span
              data-part="chip"
              style="display: inline-flex; align-items: center; justify-content: center; width: 200px; padding: 3px 8px; border: 1px solid var(--sp-line); border-radius: 999px; background: var(--sp-surface); font-family: ${t}; font-size: 11.5px"
            ></span>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="height: 22px; max-width: 440px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;let a=e(i,`card-a`),o=e(i,`chip`),s=e(i,`readout`),c=e=>{let t=n[e];t&&(a.style.transform=t.css,a.style.opacity=e===`opacity`?`0.99`:``,t.context?a.setAttribute(`data-context`,``):a.removeAttribute(`data-context`),o.textContent=t.spelling,s.textContent=t.note)};e(i,`switcher`).addEventListener(`change`,e=>c(e.detail)),c(`transform`)}export{i as mount};