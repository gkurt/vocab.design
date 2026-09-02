import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={wide:408,narrow:214},n=186,r={wide:`Two halves, equal in width, type and weight. Neither is the offer.`,narrow:`Stacked, whichever half leads is read first. The order is a decision.`},i=[{key:`charter`,title:`Take the boat out`,action:`See the fleet`,fill:`var(--sp-sunken)`},{key:`berth`,title:`Leave the boat here`,action:`See the berths`,fill:`var(--sp-surface)`}];function a(a){let o=i.map(e=>`
      <div
        data-part="pane-${e.key}"
        style="display: flex; flex-direction: column; justify-content: center; gap: 6px; min-width: 0; min-height: 0; padding: 10px 14px; background: ${e.fill}; overflow: hidden"
      >
        <span class="sp-heading" style="font-size: 15px">${e.title}</span>
        <span class="sp-row" style="margin-top: 4px">
          <button class="sp-button sp-button--sm" type="button" data-part="cta-${e.key}">${e.action}</button>
        </span>
      </div>`).join(``);a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 270px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Window</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Width" data-part="switcher" data-value="wide">
            <button class="sp-segment" type="button" data-part="seg-wide" value="wide">wide</button>
            <button class="sp-segment" type="button" data-part="seg-narrow" value="narrow">narrow</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 12px 16px">
          <div
            class="sp-grid"
            data-part="region"
            data-subject
            data-arrangement="side"
            style="flex: 0 0 auto; width: ${t.wide}px; height: ${n}px; gap: 0; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr; border: 1px solid var(--sp-line); border-radius: var(--sp-radius); overflow: hidden"
          >
            ${o}
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="height: 22px; max-width: 440px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;let s=e(a,`region`),c=e(a,`readout`),l=e(a,`pane-berth`),u=e=>{let n=r[e];if(!n)return;let i=e===`narrow`;s.dataset.arrangement=i?`stacked`:`side`,s.style.width=`${i?t.narrow:t.wide}px`,s.style.gridTemplateColumns=i?`1fr`:`1fr 1fr`,s.style.gridTemplateRows=i?`1fr 1fr`:`1fr`,l.style.borderLeft=i?`0`:`1px solid var(--sp-line)`,l.style.borderTop=i?`1px solid var(--sp-line)`:`0`,c.textContent=n};e(a,`switcher`).addEventListener(`change`,e=>u(e.detail)),u(`wide`)}export{a as mount};