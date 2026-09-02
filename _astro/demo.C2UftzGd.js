import{n as e}from"./parts.C-YLuC7Q.js";var t={idle:`Nothing pressed yet.`,"native-key":`Space on the button: saved.`,"native-click":`Click on the button: saved.`,"fake-key":`Space on the div: nothing happened.`,"fake-click":`Click on the div: saved.`},n=`display: flex; gap: 6px; align-items: baseline; font-size: 11px; height: 15px`;function r(e,t){return`<div style="${n}"><span aria-hidden="true" style="width: 9px">${e}</span><span>${t}</span></div>`}function i(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 14px 16px">
        <div class="sp-row sp-context" style="justify-content: flex-end">
          <span class="sp-text" style="font-size: 11px">keys simulated</span>
        </div>

        <div class="sp-row" style="margin-top: 8px; gap: 14px; align-items: flex-start">
          <div class="sp-grow">
            <span class="sp-label">&lt;button&gt;</span>
            <div class="sp-surface" style="margin-top: 6px; padding: 10px 12px; height: 110px">
              <button class="sp-button sp-button--sm" type="button" data-part="native" data-subject>Save</button>
              <div style="margin-top: 12px">
                ${r(`✓`,`In the tab order`)}
                ${r(`✓`,`Enter and Space activate`)}
                ${r(`✓`,`Role and name for free`)}
              </div>
            </div>
          </div>
          <div class="sp-grow sp-context">
            <span class="sp-label">&lt;div role="button"&gt;</span>
            <div class="sp-surface" style="margin-top: 6px; padding: 10px 12px; height: 110px">
              <div class="sp-button sp-button--sm" role="button" data-part="fake"
                   style="display: inline-block">Save</div>
              <div style="margin-top: 12px">
                ${r(`✕`,`Not in the tab order`)}
                ${r(`✕`,`Enter and Space do nothing`)}
                ${r(`✓`,`Role declared, name from text`)}
              </div>
            </div>
          </div>
        </div>

        <div class="sp-surface sp-context" style="margin-top: 10px; padding: 8px 10px">
          <span class="sp-label">Last press</span>
          <p class="sp-text sp-text--ink" data-part="result" data-state="idle"
             style="margin: 2px 0 0; height: 18px; font-size: 12px; white-space: nowrap; overflow: hidden">${t.idle}</p>
        </div>
      </div>
    </div>
  `;let i=e(n,`result`),a=e(n,`native`),o=e(n,`fake`),s=e=>{i.dataset.state=e,i.textContent=t[e]},c=e=>e===`Enter`||e===` `||e===`Space`;a.addEventListener(`keydown`,e=>{c(e.key)&&s(`native-key`)}),a.addEventListener(`click`,()=>s(`native-click`)),o.addEventListener(`click`,()=>s(`fake-click`)),o.addEventListener(`keydown`,e=>{c(e.key)&&s(`fake-key`)})}export{i as mount};