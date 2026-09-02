import{n as e}from"./parts.C-YLuC7Q.js";function t(t){let n=e=>e.map(e=>`<div class="sp-line" style="width: ${e}%"></div>`).join(``);t.innerHTML=`
    <div class="sp-app">
      <div class="sp-row" style="width: 452px; flex: 0 0 auto; align-items: stretch; gap: 14px">
        <div class="sp-frame" data-part="shell" data-buy="onscreen" data-bar="off" style="flex: 0 0 auto; width: 300px; height: 282px">
          <div class="sp-topbar sp-context" style="padding: 7px 11px">
            <span class="sp-heading sp-grow" style="font-size: 12.5px">Harbour Supply</span>
            <span class="sp-label" style="flex: 0 0 auto; font-size: 10.5px">Basket 0</span>
          </div>

          <div class="sp-scroll" data-part="viewport" style="position: relative; flex: 1 1 auto; min-height: 0">
            <div class="sp-context" style="padding: 11px">
              <div style="height: 92px; border-radius: var(--sp-radius); background: var(--sp-sunken)"></div>
              <span class="sp-heading" style="display: block; margin-top: 9px; font-size: 13.5px">Cedar chef's knife, 20cm</span>
              <span class="sp-text sp-text--ink" style="display: block; margin-top: 1px; font-size: 12.5px; font-weight: 600">84.00</span>
              <div class="sp-row" style="gap: 7px; margin-top: 9px">
                <button class="sp-button sp-button--sm" data-part="buy-inline" type="button" style="flex: 0 0 auto; white-space: nowrap">Add to basket</button>
                <button class="sp-button sp-button--ghost sp-button--sm" type="button" style="flex: 0 0 auto; white-space: nowrap">Save</button>
              </div>
              <span class="sp-label" style="display: block; margin-top: 12px; font-size: 10.5px">Details</span>
              <div class="sp-stack" style="margin-top: 6px">${n([96,88,92,78,94,84,90,72])}</div>
              <span class="sp-label" style="display: block; margin-top: 12px; font-size: 10.5px">Care</span>
              <div class="sp-stack" style="margin-top: 6px">${n([90,82,94,76,88,84,92,70])}</div>
            </div>
            <div data-part="tail" style="height: 46px"></div>
          </div>

          <div
            class="sp-row"
            data-part="bar"
            data-subject
            style="position: absolute; left: 0; right: 0; bottom: 0; z-index: 2; height: 46px; padding: 0 10px; gap: 9px; background: var(--sp-surface); border-top: 1px solid var(--sp-line); box-shadow: var(--sp-shadow); opacity: 0; transition: opacity 0.18s var(--sp-ease); pointer-events: none"
          >
            <span style="flex: 0 0 auto; width: 28px; height: 28px; border-radius: 6px; background: var(--sp-sunken)"></span>
            <span style="flex: 1 1 auto; min-width: 0">
              <span class="sp-text sp-text--ink" style="display: block; font-size: 11px; line-height: 14px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">Cedar chef's knife, 20cm</span>
              <span class="sp-text sp-text--ink" style="display: block; font-size: 11px; line-height: 13px; font-weight: 600">84.00</span>
            </span>
            <button class="sp-button sp-button--sm" data-part="bar-buy" type="button" style="flex: 0 0 auto; padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Add to basket</button>
          </div>
        </div>

        <span class="sp-text sp-context" data-stage-verdict data-part="note" style="flex: 1 1 auto; align-self: flex-start; font-size: 11px; line-height: 1.4">The real button is on screen, so there is nothing for the bar to do yet.</span>
      </div>
    </div>
  `;let r=e(t,`shell`),i=e(t,`viewport`),a=e(t,`buy-inline`),o=e(t,`bar`),s=e(t,`note`),c={off:`The real button is on screen, so there is nothing for the bar to do yet.`,on:`The real button has left the viewport, so the bar arrives with the same price and the same action.`},l=()=>{let e=i.getBoundingClientRect(),t=a.getBoundingClientRect().bottom<e.top+1;r.dataset.buy=t?`offscreen`:`onscreen`,r.dataset.bar=t?`on`:`off`,o.style.opacity=t?`1`:`0`,o.style.pointerEvents=t?`auto`:`none`,s.textContent=t?c.on:c.off};i.addEventListener(`scroll`,l),l()}export{t as mount};