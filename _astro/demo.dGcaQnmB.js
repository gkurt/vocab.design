import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={reflow:{scrolling:`Vertical only`,caption:`One column at 320 CSS pixels. This is what 1.4.10 asks for.`},fixed:{scrolling:`Vertical and horizontal`,caption:`A fixed-width row survives the zoom, so lines run off the side. The mistake.`}},n=`padding: 10px; display: flex; flex-direction: column; gap: 6px`;function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 434px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">At 400% zoom</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="reflow" data-axis="Page" data-term="reflow">
            <button class="sp-segment" data-part="seg-reflow" value="reflow">Reflows</button>
            <button class="sp-segment" data-part="seg-fixed" value="fixed">Stays wide</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="margin-top: 12px; align-items: flex-start; gap: 12px">
          <div class="sp-context">
            <span class="sp-label" style="display: block">Viewport</span>
            <span class="sp-text" style="font-size: 11px">320 CSS px</span>
          </div>
          <div class="sp-surface sp-scroll" data-part="viewport"
               style="flex: 0 0 auto; width: 248px; height: 156px; background: var(--sp-sunken)">
            <div data-part="page" data-subject data-pose="[data-state=reflow]" data-state="reflow" style="padding: 10px">
              <span class="sp-heading" style="font-size: 14px">Tide table</span>
              <p class="sp-text" style="margin: 4px 0 0; font-size: 12px">Falmouth, week of 12 March.</p>
              <div class="sp-stack" data-part="cols" style="margin-top: 10px; gap: 8px">
                <div class="sp-surface" data-part="card-a" style="${n}">
                  <span class="sp-label">High water</span>
                  <span class="sp-text sp-text--ink">06:12 and 18:34</span>
                  <span class="sp-line" style="width: 70%"></span>
                </div>
                <div class="sp-surface" data-part="card-b" style="${n}">
                  <span class="sp-label">Low water</span>
                  <span class="sp-text sp-text--ink">00:05 and 12:27</span>
                  <span class="sp-line" style="width: 82%"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 12px; height: 18px">
          <span class="sp-label">Scrolling needed</span>
          <span class="sp-text sp-text--ink" data-part="readout" data-state="reflow"
                style="font-size: 12px; white-space: nowrap">${t.reflow.scrolling}</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-case="reflow"
           style="margin: 6px 0 0; height: 34px; font-size: 11px">${t.reflow.caption}</p>
      </div>
    </div>
  `;let i=e(r,`viewport`),a=e(r,`page`),o=e(r,`cols`),s=e(r,`card-a`),c=e(r,`card-b`),l=e(r,`readout`),u=e(r,`caption`),d=e=>{let n=e===`fixed`;a.dataset.state=e,o.style.flexDirection=n?`row`:`column`;for(let e of[s,c])e.style.flex=n?`0 0 auto`:``,e.style.width=n?`210px`:``;i.scrollLeft=0,l.dataset.state=e,l.textContent=t[e].scrolling,u.dataset.case=e,u.textContent=t[e].caption};e(r,`segmented`).addEventListener(`change`,e=>{d(e.detail===`fixed`?`fixed`:`reflow`)})}export{r as mount};