import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n={hidden:-16,partial:-36,clear:-52},r={hidden:{minimum:`Fails 2.4.11`,enhanced:`Fails 2.4.12`},partial:{minimum:`Passes 2.4.11`,enhanced:`Fails 2.4.12`},clear:{minimum:`Passes 2.4.11`,enhanced:`Passes 2.4.12`}},i={hidden:`The ring is drawn and nobody can see it. The Minimum criterion asks only that the control not be entirely covered, and this fails even that.`,partial:`Half of the control is enough for the Minimum criterion and not enough to read the label, which is why the Enhanced version asks for all of it.`,clear:`Reserving the bar’s height on the scroll container is the repair, because then every scroll the browser makes for focus stops short of the covered strip.`};function a(a){let o=(e,t)=>`
    <div class="sp-stack" style="gap: 2px">
      <span class="sp-label" style="font-size: 9.5px">${e}</span>
      <div class="sp-input" style="height: 24px; padding: 3px 8px; font-size: 11px; display: flex;
           align-items: center; color: var(--sp-muted)">${t}</div>
    </div>`,s=(e,t,n)=>`
    <div class="sp-stack" style="flex: 1 1 0; min-width: 0; gap: 1px">
      <span class="sp-label" style="font-size: 9.5px">${e}</span>
      <span class="sp-text sp-text--ink" data-part="${t}" data-position="partial"
            style="font-size: 11.5px; white-space: nowrap">${n}</span>
    </div>`;a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 10px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="position" data-axis="Visibility" data-value="partial" style="margin-left: auto">
            <button class="sp-segment" type="button" data-part="seg-hidden" value="hidden"
                    style="padding: 4px 9px; font-size: 11.5px; white-space: nowrap">Fully covered</button>
            <button class="sp-segment" type="button" data-part="seg-partial" value="partial"
                    style="padding: 4px 9px; font-size: 11.5px; white-space: nowrap">Half covered</button>
            <button class="sp-segment" type="button" data-part="seg-clear" value="clear"
                    style="padding: 4px 9px; font-size: 11.5px; white-space: nowrap">Clear</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="viewport"
             style="position: relative; margin-top: 8px; height: 152px; overflow: hidden">
          <div data-part="page" data-position="partial"
               style="position: absolute; left: 0; right: 0; top: ${n.partial}px; padding: 0 12px;
                      display: flex; flex-direction: column; gap: 6px;
                      transition: top 0.3s var(--sp-ease)">
            <div class="sp-stack sp-context" style="gap: 6px">
              <span class="sp-heading" style="font-size: 12.5px">Payment</span>
              ${o(`Name on card`,`A. Okonkwo`)}
              ${o(`Billing postcode`,`EH8 9YL`)}
            </div>
            <div class="sp-stack" style="gap: 2px">
              <span class="sp-label" style="font-size: 9.5px">Card number</span>
              <div class="sp-input" data-part="field" data-subject data-position="partial" data-visible
                   data-pose="[data-visible]" data-sim-focus
                   style="height: 24px; padding: 3px 8px; font-size: 11px; display: flex; align-items: center">
                4242 4242 4242
              </div>
            </div>
            <button class="sp-button sp-button--sm sp-context" type="button" data-part="continue"
                    style="align-self: flex-start; margin-top: 2px; font-size: 11.5px; cursor: default">Continue</button>
          </div>

          <div class="sp-row sp-row--between sp-context" data-part="bar"
               style="position: absolute; left: 0; right: 0; bottom: 0; height: 40px; gap: 10px;
                      padding: 0 12px; background: var(--sp-surface); border-top: 1px solid var(--sp-line)">
            <span class="sp-text" style="font-size: 10.5px">We use cookies to improve this site.</span>
            <div class="sp-row" style="flex: 0 0 auto; gap: 6px">
              <button class="sp-button sp-button--quiet sp-button--sm" type="button"
                      style="font-size: 10.5px; padding: 3px 7px; cursor: default">Options</button>
              <button class="sp-button sp-button--sm" type="button"
                      style="font-size: 10.5px; padding: 3px 9px; cursor: default">Accept</button>
            </div>
          </div>
        </div>

        <div class="sp-row sp-context" style="margin-top: 8px; height: 30px; gap: 12px">
          ${s(`Focus Not Obscured (Minimum)`,`minimum`,r.partial.minimum)}
          ${s(`Focus Not Obscured (Enhanced)`,`enhanced`,r.partial.enhanced)}
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-position="partial"
           style="margin: 7px 0 0; height: 30px; font-size: 11px; line-height: 1.35">${i.partial}</p>
      </div>
    </div>
  `;let c=e(a,`page`),l=e(a,`field`),u=e(a,`minimum`),d=e(a,`enhanced`),f=e(a,`caption`),p=e=>{c.dataset.position=e,c.style.top=`${n[e]}px`,l.dataset.position=e,t(l,`data-visible`,e!==`hidden`);for(let[t,n]of[[u,r[e].minimum],[d,r[e].enhanced]])t.dataset.position=e,t.textContent=n;f.dataset.position=e,f.textContent=i[e]};p(`partial`),e(a,`position`).addEventListener(`change`,e=>{p(e.detail)})}export{a as mount};