import{n as e}from"./parts.C-YLuC7Q.js";import"./combobox.9HjM0ItI.js";var t=[{key:`bath`,label:`Bath Spa`},{key:`bristol`,label:`Bristol Temple Meads`},{key:`birmingham`,label:`Birmingham New Street`},{key:`manchester`,label:`Manchester Piccadilly`}];function n(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 428px; padding: 12px 16px">
        <sp-combobox data-part="field">
          <input class="sp-input" type="text" data-part="input" spellcheck="false" aria-label="Station"
                 placeholder="Search stations" data-sim-focus />
          <ul class="sp-listbox" data-part="listbox" style="max-height: 136px">
            ${t.map((e,t)=>`
    <li class="sp-option" data-part="option-${t}" data-key="${e.key}"
        ${t===0?`data-subject data-pose="[data-active]"`:``}>${e.label}</li>`).join(``)}
          </ul>
        </sp-combobox>

        <!-- The room the list takes, reserved from mount so opening it moves nothing. -->
        <div style="height: 138px"></div>

        <div class="sp-surface sp-context" style="padding: 8px 10px">
          <div class="sp-row sp-row--between" style="height: 18px">
            <span class="sp-label">DOM focus</span>
            <span class="sp-text sp-text--ink" data-part="focus" data-on="input"
                  style="font-size: 12px; white-space: nowrap">the text field</span>
          </div>
          <div class="sp-row sp-row--between" style="margin-top: 4px; height: 18px">
            <span class="sp-label">aria-activedescendant</span>
            <span class="sp-text sp-text--ink" data-part="readout" data-active="bath"
                  style="font-size: 12px; white-space: nowrap">Bath Spa</span>
          </div>
          <div class="sp-row sp-row--between" style="margin-top: 4px; height: 18px">
            <span class="sp-label">Chosen</span>
            <span class="sp-text" data-part="result" data-chosen="none"
                  style="font-size: 12px; white-space: nowrap">nothing yet</span>
          </div>
        </div>
      </div>
    </div>
  `;let r=e(n,`field`),i=e(n,`input`),a=e(n,`readout`),o=e(n,`result`),s=t.map((t,r)=>e(n,`option-${r}`)),c=()=>{let e=i.getAttribute(`aria-activedescendant`),t=e?s.find(t=>t.id===e):void 0;a.dataset.active=t?.dataset.key??`none`,a.textContent=t?.textContent?.trim()??`no child referenced`};new MutationObserver(c).observe(i,{attributes:!0,attributeFilter:[`aria-activedescendant`]}),r.addEventListener(`select`,e=>{let n=e.detail;o.dataset.chosen=t.find(e=>e.label===n)?.key??`none`,o.className=`sp-text sp-text--ink`,o.textContent=n}),i.dispatchEvent(new KeyboardEvent(`keydown`,{key:`ArrowDown`,bubbles:!0,cancelable:!0})),c()}export{n as mount};