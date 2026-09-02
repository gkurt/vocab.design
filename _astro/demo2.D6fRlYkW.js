import{n as e,r as t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n={size:{width:150,height:36,font:14,loud:!1,alone:!1,note:`Size alone. The biggest thing in the field is reached first.`},contrast:{width:104,height:26,font:12,loud:!0,alone:!1,note:`Contrast alone. One loud element in a quiet field is found instantly.`},isolation:{width:104,height:26,font:12,loud:!1,alone:!0,note:`Isolation alone. Space around it separates it from the crowd.`},none:{width:104,height:26,font:12,loud:!1,alone:!1,note:`No lever. Everything weighs the same and the eye settles nowhere.`}},r=`display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto; padding: 0; cursor: default`;function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-axis="Lever" data-value="size" style="margin-left: auto">
            <button class="sp-segment" type="button" data-part="seg-size" value="size">size</button>
            <button class="sp-segment" type="button" data-part="seg-contrast" value="contrast">contrast</button>
            <button class="sp-segment" type="button" data-part="seg-isolation" value="isolation">isolation</button>
            <button class="sp-segment" type="button" data-part="seg-none" value="none">none</button>
          </sp-segmented>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px">
          <div
            data-part="page"
            style="display: flex; flex-direction: column; gap: 12px; flex: 0 0 auto; width: 444px; height: 186px; padding: 14px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius); overflow: hidden"
          >
            <div class="sp-row sp-row--between sp-context" style="height: 18px">
              <span class="sp-row" style="gap: 7px">
                <span class="sp-swatch" style="width: 16px; height: 16px; --sp-swatch: var(--sp-line)"></span>
                <span class="sp-heading" style="font-size: 12px">Harbour Rooms</span>
              </span>
              <span class="sp-row" style="gap: 12px">
                <span class="sp-label">Rooms</span>
                <span class="sp-label">Rates</span>
                <span class="sp-label">Visit</span>
              </span>
            </div>
            <div class="sp-row sp-context" style="gap: 14px; height: 76px; align-items: stretch">
              <div class="sp-swatch" style="flex: 0 0 auto; width: 150px; height: 76px; --sp-swatch: var(--sp-sunken)"></div>
              <div class="sp-stack" style="flex: 1 1 auto; min-width: 0; justify-content: center; gap: 11px">
                <div class="sp-line" style="width: 88%"></div>
                <div class="sp-line" style="width: 74%"></div>
                <div class="sp-line" data-part="neighbour" style="width: 58%"></div>
              </div>
            </div>
            <div class="sp-row" style="gap: 12px; height: 36px">
              <div class="sp-row sp-context" style="flex: 1 1 auto; min-width: 0; gap: 16px">
                <span class="sp-label" data-part="neighbour">Compare rooms</span>
                <span class="sp-label" data-part="neighbour">Terms apply</span>
              </div>
              <div data-part="slot" style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 150px; height: 36px">
                <button
                  class="sp-button sp-button--ghost"
                  type="button"
                  data-part="cta"
                  data-subject
                  data-pose="[data-lever]"
                  data-lever="size"
                  style="${r}"
                >Reserve</button>
              </div>
            </div>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="height: 22px; max-width: 440px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;let a=e(i,`cta`),o=e(i,`readout`),s=t(i,`neighbour`),c=e=>{let t=n[e];if(t){a.className=t.loud?`sp-button`:`sp-button sp-button--ghost`,a.style.width=`${t.width}px`,a.style.height=`${t.height}px`,a.style.fontSize=`${t.font}px`,e===`none`?a.removeAttribute(`data-lever`):a.setAttribute(`data-lever`,e);for(let e of s)e.style.visibility=t.alone?`hidden`:``;o.textContent=t.note}};e(i,`switcher`).addEventListener(`change`,e=>c(e.detail)),c(`size`)}export{i as mount};