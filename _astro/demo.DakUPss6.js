import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[`stop-home`],r=[{key:`stop-zoom-in`,label:`Zoom in`},{key:`stop-zoom-out`,label:`Zoom out`},{key:`stop-reset`,label:`Reset`}],i=r.map(e=>e.key),a=`stop-leave`,o=[`stop-continue`,`stop-help`],s={trapped:`Tab cycles inside the plug-in. Continue is unreachable. WCAG 2.1.2.`,escapable:`Escape leaves the plug-in, and Tab walks on to Continue.`};function c(c){let l=(e,t)=>`<span class="sp-chip" data-part="${e}">${t}</span>`;c.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 424px">
        <div class="sp-surface sp-context" style="padding: 8px; background: var(--sp-sunken)">
          <div class="sp-row">${l(`stop-home`,`Dashboard`)}</div>
        </div>
        <span class="sp-label sp-context" data-part="caption" style="display: block; margin-top: 10px">Embedded plug-in</span>
        <div class="sp-surface" data-part="widget" data-subject data-pose="[data-mode=trapped]" data-mode="trapped" style="margin-top: 4px; padding: 10px 12px">
          <div class="sp-row" style="gap: 6px">
            ${r.map(e=>l(e.key,e.label)).join(``)}
          </div>
          <div class="sp-row" style="height: 25px; margin-top: 6px; gap: 8px">
            <span class="sp-row" data-part="hatch" style="gap: 8px" hidden>
              ${l(a,`Leave chart`)}
              <span class="sp-text" style="font-size: 11px">Press Escape to leave</span>
            </span>
          </div>
        </div>
        <div class="sp-surface sp-context" style="margin-top: 10px; padding: 8px; background: var(--sp-sunken)">
          <div class="sp-row" style="gap: 6px">${l(`stop-continue`,`Continue`)}${l(`stop-help`,`Help`)}</div>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="verdict" style="margin: 10px 0 0; font-size: 11px; height: 18px; white-space: nowrap">
          ${s.trapped}
        </p>
        <div class="sp-row sp-row--between sp-context" style="margin-top: 10px">
          <span class="sp-label">The plug-in</span>
          <div class="sp-row" style="gap: 6px">
            <span class="sp-chip" data-part="mode-trapped" data-selected>Without an exit</span>
            <span class="sp-chip" data-part="mode-escapable">With an exit</span>
          </div>
        </div>
      </div>
    </div>
  `;let u=e(c,`widget`),d=e(c,`hatch`),f=e(c,`verdict`),p={trapped:e(c,`mode-trapped`),escapable:e(c,`mode-escapable`)},m=`trapped`,h=`stop-home`,g=()=>[...n,...i,...m===`escapable`?[a]:[],...o],_=e=>{h=e;for(let n of c.querySelectorAll(`[data-part]`))t(n,`data-sim-focus`,n.getAttribute(`data-part`)===e)},v=e=>{m=e,u.dataset.mode=e,d.hidden=e===`trapped`,f.textContent=s[e],t(p.trapped,`data-selected`,e===`trapped`),t(p.escapable,`data-selected`,e===`escapable`),e===`trapped`&&h===a&&_(`stop-reset`)};_(`stop-home`),p.trapped.addEventListener(`click`,()=>v(`trapped`)),p.escapable.addEventListener(`click`,()=>v(`escapable`)),e(c,a).addEventListener(`click`,()=>_(`stop-continue`)),c.addEventListener(`keydown`,e=>{if(e.key===`Tab`){if(m===`trapped`&&i.includes(h)){_(i[(i.indexOf(h)+1)%i.length]??h);return}let e=g();_(e[(e.indexOf(h)+1)%e.length]??h);return}e.key===`Escape`&&m===`escapable`&&(i.includes(h)||h===a)&&_(`stop-continue`)})}export{c as mount};