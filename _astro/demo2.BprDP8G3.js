import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var r={edited:`Milk, bread`,restored:`Milk, bread, coffee`},i={ok:`Both halves of the rule: the same undo sits on the toolbar, and the shake can be switched off.`,motion:`The toolbar button is gone and the setting with it, so a shake is the only route to an undo.`};function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 11px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Notes, undo also on a shake</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="ok" data-axis="Input" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-ok" value="ok"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Control and switch</button>
            <button class="sp-segment" type="button" data-part="seg-motion" value="motion"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Motion only</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="align-items: stretch; gap: 12px; margin-top: 9px">
          <div class="sp-frame" data-part="editor" style="flex: 0 0 auto; width: 196px; height: 164px">
            <div class="sp-topbar sp-context" style="padding: 6px 10px; gap: 6px">
              <span class="sp-label" style="font-size: 11px">Notes</span>
            </div>

            <div class="sp-stack sp-context" style="flex: 1 1 auto; gap: 5px; padding: 9px 10px">
              <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 500">Groceries</span>
              <span class="sp-text sp-text--ink" data-part="note" data-state="edited"
                    style="height: 17px; font-size: 11.5px; line-height: 17px; white-space: nowrap">${r.edited}</span>
              <span class="sp-label" data-part="source" data-by="none"
                    style="height: 14px; font-size: 10px; line-height: 14px; white-space: nowrap">Last undo: nothing yet</span>
            </div>

            <div class="sp-row sp-row--between" style="flex: 0 0 auto; gap: 8px; padding: 7px 10px 9px">
              <span class="sp-row sp-context" style="flex: 0 0 auto; gap: 4px">
                <button class="sp-icon-button" type="button" data-part="edit" aria-label="Edit"
                        style="width: 26px; height: 26px">${n(`pencil`)}</button>
                <button class="sp-icon-button" type="button" data-part="share" aria-label="Share"
                        style="width: 26px; height: 26px">${n(`share`)}</button>
              </span>
              <button class="sp-button sp-button--sm" type="button" data-part="undo" data-subject
                      style="flex: 0 0 auto; white-space: nowrap; font-size: 11.5px;
                             transition: opacity 0.2s, visibility 0.2s">Undo</button>
            </div>
          </div>

          <div class="sp-stack" style="flex: 1 1 auto; min-width: 0; gap: 8px">
            <div class="sp-surface sp-context" style="flex: 0 0 auto; height: 78px; padding: 8px 10px">
              <div class="sp-row sp-row--between" style="gap: 8px">
                <span class="sp-label" style="flex: 0 0 auto; font-size: 11px">Motion trigger</span>
                <span class="sp-text sp-text--ink" data-part="motion" data-state="on"
                      style="flex: 0 0 auto; padding: 1px 8px; border-radius: 999px; background: var(--sp-sunken);
                             font-size: 10.5px; white-space: nowrap">Enabled</span>
              </div>
              <p class="sp-text" style="margin: 5px 0 0; font-size: 10.5px; line-height: 1.35">
                Shake to undo the last change.</p>
            </div>

            <div class="sp-surface sp-context" data-part="off-card" style="flex: 0 0 auto; height: 78px; padding: 8px 10px;
                        transition: opacity 0.2s, visibility 0.2s">
              <div class="sp-row sp-row--between" style="gap: 8px; height: 20px">
                <span class="sp-label" style="flex: 0 0 auto; font-size: 11px">Off switch</span>
                <button class="sp-switch" type="button" data-part="off-switch" role="switch" aria-checked="true"
                        data-checked aria-label="Shake to undo"
                        style="flex: 0 0 auto; transition: opacity 0.2s, visibility 0.2s"></button>
              </div>
              <p class="sp-text" style="margin: 5px 0 0; height: 30px; font-size: 10.5px; line-height: 1.35">
                When on, shaking the phone undoes your last change.</p>
            </div>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="ok"
           style="margin: 9px 0 0; height: 32px; font-size: 11px; line-height: 1.35">${i.ok}</p>
      </div>
    </div>
  `;let o=e(a,`note`),s=e(a,`source`),c=e(a,`undo`),l=e(a,`motion`),u=e(a,`off-switch`),d=e(a,`off-card`),f=e(a,`caption`),p=(e,t)=>{e.style.opacity=t?`1`:`0`,e.style.visibility=t?`visible`:`hidden`},m=e=>{l.dataset.state=e?`on`:`off`,l.textContent=e?`Enabled`:`Switched off`,u.setAttribute(`aria-checked`,String(e)),t(u,`data-checked`,e)};c.addEventListener(`click`,()=>{o.dataset.state=`restored`,o.textContent=r.restored,s.dataset.by=`button`,s.textContent=`Last undo: the toolbar button`}),u.addEventListener(`click`,()=>{m(u.getAttribute(`aria-checked`)!==`true`)}),e(a,`mode`).addEventListener(`change`,e=>{let t=e.detail,n=t===`ok`;p(c,n),p(d,n),p(u,n),m(!0),f.dataset.mode=t,f.textContent=i[t],o.dataset.state=`edited`,o.textContent=r.edited,s.dataset.by=`none`,s.textContent=`Last undo: nothing yet`})}export{a as mount};