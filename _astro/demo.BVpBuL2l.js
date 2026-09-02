import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=280;function r(r){let i=`transition: opacity ${n}ms linear, visibility ${n}ms`;r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 348px; height: 236px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Deploys</span>
          <span style="position: relative; display: inline-flex">
            <span class="sp-icon-button" aria-hidden="true">${t(`bell`)}</span>
            <span
              data-part="dot"
              style="position: absolute; top: 3px; right: 3px; width: 8px; height: 8px; border-radius: 50%;
                     background: var(--sp-accent); opacity: 0; visibility: hidden; ${i}"
            ></span>
          </span>
        </div>
        <div class="sp-body sp-stack" style="gap: 10px">
          <div style="position: relative; height: 108px; flex: 0 0 auto">
            <article
              class="sp-surface sp-stack"
              data-part="panel"
              data-subject
              style="position: absolute; inset: 0; gap: 8px; padding: 12px; opacity: 0; visibility: hidden; ${i}"
            >
              <span class="sp-row sp-row--between">
                <span class="sp-heading" style="font-size: 13px">Build 4182 finished</span>
                <span class="sp-label">2m ago</span>
              </span>
              <span class="sp-line" style="width: 88%"></span>
              <span class="sp-line" style="width: 64%"></span>
              <span class="sp-row" style="gap: 6px; margin-top: 2px">
                <span class="sp-chip" style="cursor: default">${t(`check`)} 214 tests</span>
              </span>
            </article>
          </div>
          <div class="sp-row sp-context" style="gap: 6px">
            <button class="sp-button sp-button--sm" type="button" data-part="show">Show summary</button>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="hide">Hide</button>
          </div>
          <p class="sp-text sp-context" data-stage-verdict data-part="legend" style="margin: 0">
            Opacity only. The panel keeps its space either way.
          </p>
        </div>
      </div>
    </div>
  `;let a=e(r,`panel`),o=e(r,`dot`),s=e=>{for(let t of[a,o])t.style.opacity=e?`1`:`0`,t.style.visibility=e?`visible`:`hidden`;a.setAttribute(`aria-hidden`,String(!e))};e(r,`show`).addEventListener(`click`,()=>s(!0)),e(r,`hide`).addEventListener(`click`,()=>s(!1))}export{r as mount};