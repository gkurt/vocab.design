import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`linear-gradient(var(--sp-surface), var(--sp-surface)) padding-box`,n={conic:`conic-gradient(from 140deg, #6366f1, #22d3ee 30%, #f472b6 62%, #6366f1) border-box`,linear:`linear-gradient(115deg, #6366f1, #22d3ee 46%, #f472b6) border-box`},r=`width: 176px; padding: 15px; border: 2px solid transparent; border-radius: 14px`;function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-row" style="align-items: flex-start; gap: 18px">
        <div class="sp-stack" style="gap: 8px">
          <div data-part="card" data-subject data-edge="conic"
               style="${r}; background: ${t}, ${n.conic}">
            <div class="sp-row sp-row--between">
              <span style="font-size: 14px; font-weight: 600">Studio</span>
              <span class="sp-chip" style="padding: 2px 8px; font-size: 10px">Pro</span>
            </div>
            <p class="sp-text" style="margin: 8px 0 0; font-size: 12px">
              Unlimited specimens, shared kits, and a seat for every reviewer.
            </p>
            <button class="sp-button sp-button--sm" data-part="cta" type="button" style="width: 100%; margin-top: 12px">Upgrade</button>
          </div>
          <span class="sp-label" style="text-align: center">gradient edge</span>
        </div>

        <div class="sp-stack sp-context" style="gap: 8px">
          <div data-part="plain"
               style="${r}; border-color: var(--sp-line); background: var(--sp-surface)">
            <div class="sp-row sp-row--between">
              <span style="font-size: 14px; font-weight: 600">Studio</span>
              <span class="sp-chip" style="padding: 2px 8px; font-size: 10px">Free</span>
            </div>
            <p class="sp-text" style="margin: 8px 0 0; font-size: 12px">
              Three specimens, one kit, and the reviewer you already have.
            </p>
            <button class="sp-button sp-button--sm sp-button--ghost" type="button" style="width: 100%; margin-top: 12px">Stay</button>
          </div>
          <span class="sp-label" style="text-align: center">solid edge</span>
        </div>
      </div>

      <div class="sp-row sp-context" data-part="tools" style="gap: 10px">
        <sp-segmented data-stage-mode class="sp-segmented" data-axis="Gradient" data-part="switcher" data-value="conic">
          <button class="sp-segment" type="button" data-part="seg-conic" value="conic">Conic</button>
          <button class="sp-segment" type="button" data-part="seg-linear" value="linear">Linear</button>
        </sp-segmented>
      </div>
    </div>
  `;let a=e(i,`card`);e(i,`switcher`).addEventListener(`change`,e=>{let r=e.detail,i=n[r];i&&(a.dataset.edge=r,a.style.background=`${t}, ${i}`)})}export{i as mount};