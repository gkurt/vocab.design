import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=400,n=186,r=10,i=390/2,a=183,o=34,s=t/2,c=`repeating-linear-gradient(45deg, var(--sp-accent-soft) 0 3px, transparent 3px 8px)`,l={unaware:`crossed`,avoided:`clear`,split:`gutter`},u={unaware:`Unaware: one pane straight across both screens, so the seam takes the middle of the sentence and half of the button.`,avoided:`Avoided: the same single pane, reflowed so that nothing it cares about lands on the seam.`,split:`Split: the layout uses the seam as its gutter, notes on one screen and the note being edited on the other.`},d=(e,t=6)=>e.map(e=>`<div class="sp-line" style="width: ${e}%; height: ${t}px"></div>`).join(``);function f(f){f.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Marina notes</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Layout" data-part="modes" data-value="unaware">
            <button class="sp-segment" type="button" data-part="seg-unaware" value="unaware" style="padding: 4px 8px; font-size: 11px">unaware</button>
            <button class="sp-segment" type="button" data-part="seg-avoided" value="avoided" style="padding: 4px 8px; font-size: 11px">avoided</button>
            <button class="sp-segment" type="button" data-part="seg-split" value="split" style="padding: 4px 8px; font-size: 11px">split</button>
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 8px 12px">
          <div
            data-part="device"
            style="flex: 0 0 auto; padding: 5px; border-radius: 12px; background: var(--sp-ink)"
          >
            <div
              data-part="surface"
              style="position: relative; width: ${t}px; height: ${n}px; overflow: hidden; border-radius: 6px;
                     background: var(--sp-surface)"
            >
              <div
                class="sp-context"
                data-part="layout-unaware"
                style="position: absolute; inset: 0; z-index: 1; display: flex; flex-direction: column; gap: 10px; padding: 12px"
              >
                <span class="sp-heading" style="font-size: 13px">Berth 14, winter lift</span>
                <span class="sp-text sp-text--ink" data-part="sentence" style="font-size: 12px; line-height: 1.5">
                  The starboard cleat is lifting and wants replacing before the yard hauls her out for the winter.
                </span>
                <div style="display: flex; flex-direction: column; gap: 6px">${d([100,94])}</div>
                <div class="sp-row" style="justify-content: center; margin-top: auto">
                  <button class="sp-button sp-button--sm" type="button" data-part="save" data-cut style="font-size: 12px">Save note</button>
                </div>
              </div>

              <div
                class="sp-context"
                data-part="layout-avoided"
                style="position: absolute; inset: 0; z-index: 1; display: flex; gap: ${o}px; padding: 12px"
                hidden
              >
                <div style="display: flex; flex-direction: column; gap: 9px; flex: 1 1 0; min-width: 0">
                  <span class="sp-heading" style="font-size: 13px">Berth 14</span>
                  <span class="sp-text sp-text--ink" style="font-size: 12px; line-height: 1.45">
                    The starboard cleat is lifting and wants replacing.
                  </span>
                  <button class="sp-button sp-button--sm" type="button" data-part="save-avoided" style="align-self: flex-start; font-size: 12px">Save note</button>
                </div>
                <div style="display: flex; flex-direction: column; gap: 6px; flex: 1 1 0; min-width: 0">
                  <span class="sp-label" style="font-size: 11px">Yard reply</span>
                  ${d([96,88,92,70])}
                </div>
              </div>

              <div data-part="layout-split" style="position: absolute; inset: 0; z-index: 1; display: flex" hidden>
                <div
                  class="sp-context"
                  data-part="pane-list"
                  style="display: flex; flex-direction: column; gap: 4px; width: ${s}px; padding: 10px 20px 10px 10px; overflow: hidden"
                >
                  <span class="sp-label" style="font-size: 11px">Notes</span>
                  <div class="sp-list-item" style="padding: 5px 7px; font-size: 12px">Berth 14, winter lift</div>
                  <div class="sp-list-item" data-selected style="padding: 5px 7px; font-size: 12px">Fuel berth closed</div>
                  <div class="sp-list-item" style="padding: 5px 7px; font-size: 12px">Pontoon C decking</div>
                </div>
                <div
                  class="sp-context"
                  data-part="pane-detail"
                  style="display: flex; flex-direction: column; gap: 8px; width: ${s}px; padding: 10px 10px 10px 20px; overflow: hidden;
                         background: var(--sp-sunken)"
                >
                  <span class="sp-heading" style="font-size: 13px">Fuel berth closed</span>
                  <div style="display: flex; flex-direction: column; gap: 6px">${d([94,86,90])}</div>
                  <button class="sp-button sp-button--sm" type="button" data-part="save-split" style="align-self: flex-start; margin-top: auto; font-size: 12px">Save note</button>
                </div>
              </div>

              <span
                data-part="band"
                data-subject
                data-mode="crossed"
                aria-hidden="true"
                style="position: absolute; top: 0; bottom: 0; left: ${a}px; width: ${o}px; z-index: 2;
                       background: ${c}; border-left: 2px dashed var(--sp-accent); border-right: 2px dashed var(--sp-accent);
                       pointer-events: none"
              ></span>

              <span
                data-part="seam"
                aria-hidden="true"
                style="position: absolute; top: 0; bottom: 0; left: ${i}px; width: ${r}px; z-index: 3;
                       background: var(--sp-ink); box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.4); pointer-events: none"
              ></span>
            </div>
          </div>

          <span
            class="sp-text sp-context"
            data-stage-verdict data-part="caption"
            data-mode="unaware"
            style="flex: 0 0 auto; width: 440px; height: 34px; font-size: 12px; line-height: 1.4; text-align: center"
          ></span>
        </div>
      </div>
    </div>
  `;let p=e(f,`band`),m=e(f,`caption`),h={unaware:e(f,`layout-unaware`),avoided:e(f,`layout-avoided`),split:e(f,`layout-split`)},g=e=>{for(let t of Object.keys(h))h[t].hidden=t!==e;p.dataset.mode=l[e],m.dataset.mode=e,m.textContent=u[e]};e(f,`modes`).addEventListener(`change`,e=>g(e.detail)),g(`unaware`)}export{f as mount};