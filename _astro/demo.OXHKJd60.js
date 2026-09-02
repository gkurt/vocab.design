import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n={soft:[`back`,`submit`,`help`],hard:[`back`,`help`]},r={back:`Back button`,submit:`Submit order button`,help:`Help button`},i={back:`“Back, button”`,submit:`“Submit order, unavailable. Add an address.”`,help:`“Help, button”`},a={soft:`Both spellings draw the same dimmed button. This one stays in the sequence, so the reader lands on it and hears what is missing.`,hard:`The disabled attribute takes it out of the sequence, so one Tab crosses the whole row. The reason it is off is on screen, and never reached.`};function o(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Switched off with" data-term="soft" data-value="soft" style="margin-left: auto">
            <button class="sp-segment" data-part="seg-soft" value="soft">aria-disabled</button>
            <button class="sp-segment" data-part="seg-hard" value="hard">disabled</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" style="margin-top: 9px; padding: 10px 12px">
          <div class="sp-row sp-row--between sp-context" style="gap: 10px; height: 18px">
            <span class="sp-label" style="flex: 0 0 auto">Order total</span>
            <span class="sp-text sp-text--ink" style="flex: 0 0 auto; font-size: 12px">$48.20</span>
          </div>

          <div class="sp-row" style="margin-top: 10px; gap: 8px">
            <button class="sp-button sp-button--ghost sp-button--sm sp-context" type="button" data-part="back">Back</button>
            <button class="sp-button sp-button--sm" type="button" data-part="submit" data-subject
                    data-pose="[data-soft]" data-soft aria-disabled="true" aria-describedby="why-off">Submit order</button>
            <button class="sp-button sp-button--ghost sp-button--sm sp-context" type="button" data-part="help">Help</button>
          </div>

          <p class="sp-label sp-context" id="why-off" data-part="hint"
             style="margin: 9px 0 0; font-size: 10.5px">Add a delivery address to continue.</p>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; gap: 10px">
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="tab">Press Tab</button>
          <span class="sp-text sp-text--ink" data-part="where" data-at="back"
                style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap">${r.back}</span>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; height: 18px; gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Announced</span>
          <span class="sp-text sp-text--ink" data-part="say" data-at="back"
                style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap">${i.back}</span>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="soft"
           style="margin: 6px 0 0; height: 34px; font-size: 11px">${a.soft}</p>
      </div>
    </div>
  `;let s=e(o,`submit`),c=e(o,`where`),l=e(o,`say`),u=e(o,`caption`),d=`soft`,f=0,p=()=>{let a=n[d],s=a[f]??a[0]??`back`;for(let n of[`back`,`submit`,`help`])t(e(o,n),`data-sim-focus`,n===s);c.dataset.at=s,c.textContent=r[s]??``,l.dataset.at=s,l.textContent=i[s]??``},m=e=>{d=e,f=0;let n=e===`soft`;t(s,`data-soft`,n),s.disabled=!n,n?s.setAttribute(`aria-disabled`,`true`):s.removeAttribute(`aria-disabled`),u.dataset.mode=e,u.textContent=a[e],p()};m(`soft`),e(o,`tab`).addEventListener(`click`,()=>{f=Math.min(f+1,n[d].length-1),p()}),e(o,`segmented`).addEventListener(`change`,e=>{m(e.detail)})}export{o as mount};