import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n={none:`document.activeElement is <body>. Nothing has been clicked yet.`,inner:`document.activeElement is the input in <my-field>. The host passed it on.`,nowhere:`document.activeElement is <body>. The press stopped at the host.`},r={on:`A press on the host reaches the control, so the padding is part of the field. Nothing tells the two hosts apart.`,off:`The same press lands on an element that cannot hold focus, so typing does nothing and Tab restarts from the top.`};function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-axis="Shadow root" data-term="on" data-value="on" style="flex: 0 0 auto; margin-left: auto">
            <button class="sp-segment" type="button" data-part="seg-on" value="on"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">delegatesFocus: true</button>
            <button class="sp-segment" type="button" data-part="seg-off" value="off"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">false</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="host" style="margin-top: 8px; padding: 0; overflow: hidden">
          <div class="sp-row sp-row--between sp-context" style="gap: 10px; padding: 6px 10px">
            <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">&#60;my-field&#62;</span>
            <span class="sp-label" data-part="flagline" style="flex: 0 0 auto; font-size: 10px">shadow root, one input inside</span>
          </div>
          <div data-part="pad" data-subject data-delegated data-pose="[data-delegated]"
               style="display: flex; align-items: center; justify-content: center; height: 38px;
                      background: var(--sp-sunken); border-top: 1px solid var(--sp-line);
                      border-bottom: 1px solid var(--sp-line)">
            <span class="sp-label sp-context" style="font-size: 10px">the host's own padding, no control here</span>
          </div>
          <div style="padding: 8px 12px 10px">
            <label class="sp-label sp-context" for="focus-delegation-input" style="font-size: 10px">Postcode</label>
            <input class="sp-input" id="focus-delegation-input" data-part="field" tabindex="0" placeholder="SW1A 2AA"
                   style="margin-top: 4px; height: 30px; font-size: 12px" />
          </div>
        </div>

        <div class="sp-surface sp-context" style="margin-top: 8px; padding: 8px 10px">
          <span class="sp-label" style="font-size: 10px">Active element</span>
          <p class="sp-text sp-text--ink" data-part="active" data-state="none"
             style="margin: 3px 0 0; height: 17px; line-height: 17px; font-size: 11.5px; white-space: nowrap">${n.none}</p>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="on"
           style="margin: 8px 0 0; height: 32px; font-size: 11px; line-height: 1.35">${r.on}</p>
      </div>
    </div>
  `;let a=e(i,`pad`),o=e(i,`field`),s=e(i,`active`),c=e(i,`caption`),l=`on`,u=e=>{s.dataset.state=e,s.textContent=n[e]};a.addEventListener(`click`,()=>{let e=l===`on`;t(o,`data-sim-focus`,e),u(e?`inner`:`nowhere`)});let d=e=>{l=e,t(a,`data-delegated`,e===`on`),t(o,`data-sim-focus`,!1),c.dataset.mode=e,c.textContent=r[e],u(`none`)};e(i,`mode`).addEventListener(`change`,e=>{d(e.detail)}),d(`on`)}export{i as mount};