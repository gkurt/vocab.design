import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n=1200,r=[`linear-gradient(150deg, #6b7f9e, #cfd8e3)`,`linear-gradient(20deg, #4f6f5a, #a9c2a0)`,`linear-gradient(120deg, #8a6f52, #d8c3a1)`,`linear-gradient(200deg, #3f5470, #8fa6bd)`,`linear-gradient(60deg, #6d5a7a, #c3b0cd)`,`linear-gradient(160deg, #7e6a4e, #cbbb95)`,`linear-gradient(30deg, #405e6b, #9cb9c0)`,`linear-gradient(140deg, #5f6f4a, #b6c48f)`,`linear-gradient(80deg, #7a5f5f, #cfa9a9)`],i=e=>`
  <span
    class="sp-pulse"
    style="width: 4px; height: 4px; border-radius: 50%; background: var(--sp-accent); animation-delay: -${(e*.6).toFixed(1)}s"
  ></span>`,a=`
  <span class="sp-stack" style="flex: 0 0 auto; gap: 2px; align-items: center">
    <span style="display: flex; align-items: center; justify-content: center; width: 26px; height: 26px;
                 border-radius: 6px; background: var(--sp-accent-soft); color: var(--sp-accent)">${t(`check`)}</span>
    <span style="font-size: 9px; color: var(--sp-muted)">Human check</span>
  </span>`,o=`
  <div class="sp-row" style="gap: 12px; padding: 14px">
    <span style="position: relative; flex: 0 0 auto; width: 20px; height: 20px">
      <button
        class="sp-checkbox"
        type="button"
        role="checkbox"
        aria-checked="false"
        aria-label="I am not a robot"
        data-part="check"
        style="position: absolute; left: 2px; top: 2px"
      ></button>
      <span class="sp-row" data-part="spin" hidden style="position: absolute; inset: 0; gap: 3px; justify-content: center"
        >${i(0)}${i(1)}${i(2)}</span
      >
    </span>
    <span class="sp-text sp-text--ink sp-grow" data-part="status">I am not a robot</span>
    ${a}
  </div>`,s={checkbox:o,grid:`
  <div style="padding: 8px 10px; background: var(--sp-accent); color: var(--sp-accent-ink); font-size: 12px">
    Select every square with a <strong>bridge</strong>
  </div>
  <div class="sp-grid" data-part="tiles" style="grid-template-columns: repeat(3, 1fr); gap: 4px; padding: 4px">
    ${r.map((e,t)=>`
      <button
        type="button"
        data-part="tile-${t}"
        aria-pressed="false"
        aria-label="Square ${t+1}"
        style="height: 32px; padding: 0; border: 0; border-radius: 3px; background-image: ${e}; cursor: pointer"
      ></button>`).join(``)}
  </div>
  <div class="sp-row sp-row--between" style="padding: 5px 10px; border-top: 1px solid var(--sp-line)">
    <span class="sp-label" data-part="status">Click verify once there are none left</span>
    <button class="sp-button sp-button--sm" type="button" data-part="verify">Verify</button>
  </div>`};function c(t,r){t.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 276px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Create account</span>
          <span class="sp-label">Step 2 of 2</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="checkbox" data-axis="Challenge">
            <button class="sp-segment" data-part="mode-checkbox" value="checkbox">Checkbox</button>
            <button class="sp-segment" data-part="mode-grid" value="grid">Image grid</button>
          </sp-segmented>
        </div>
        <div class="sp-body">
          <div data-part="slot" style="position: relative; height: 100%">
            <div
              data-part="widget"
              data-subject
              data-mode="checkbox"
              data-state="idle"
              style="position: absolute; left: 50%; top: 0; translate: -50% 0; width: 300px; overflow: hidden;
                     background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
            >${o}</div>
          </div>
        </div>
      </div>
    </div>
  `;let i=e(t,`widget`),a,c=()=>{let t=e(i,`check`),o=e(i,`spin`),s=e(i,`status`),c=()=>{i.dataset.state=`verified`,o.hidden=!0,t.hidden=!1,t.setAttribute(`aria-checked`,`true`),s.textContent=`Verified`};t.addEventListener(`click`,()=>{r.clearTimeout(a),i.dataset.state=`checking`,t.hidden=!0,o.hidden=!1,s.textContent=`Checking your browser`,a=r.setTimeout(c,n)})},l=()=>{let t=e(i,`status`),n=e(i,`verify`);for(let t of[...e(i,`tiles`).children])t.addEventListener(`click`,()=>{t.setAttribute(`data-selected`,``),t.setAttribute(`aria-pressed`,`true`),t.style.boxShadow=`inset 0 0 0 3px var(--sp-accent)`});n.addEventListener(`click`,()=>{i.dataset.state=`verified`,t.textContent=`Verified`,n.setAttribute(`aria-disabled`,`true`)})};e(t,`mode`).addEventListener(`change`,e=>{let t=e.detail===`grid`?`grid`:`checkbox`;r.clearTimeout(a),i.dataset.mode=t,i.dataset.state=`idle`,i.innerHTML=s[t],t===`grid`?l():c()}),c()}export{c as mount};