import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row" style="gap: 12px; align-items: flex-start">
          <div class="sp-stack" style="flex: 1 1 0; min-width: 0; gap: 6px">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="trigger-disclosure"
                    data-subject aria-expanded="true" aria-controls="details"
                    style="display: flex; align-items: center; justify-content: space-between; gap: 6px; width: 100%">
              <span>Shipping details</span>
              ${n(`chevronRight`,`sp-icon--chevron`)}
            </button>
            <span class="sp-label" data-part="val-disclosure" data-value="false"
                  style="font-size: 10px; white-space: nowrap">aria-expanded="false"</span>

            <div style="position: relative; height: 104px">
              <div class="sp-surface sp-context" data-part="panel" id="details"
                   style="position: absolute; inset: 0; padding: 8px 10px; opacity: 0; visibility: hidden;
                          transition: opacity 0.18s, visibility 0.18s">
                <p class="sp-text" style="margin: 0; font-size: 11px">Standard delivery, 2 to 4 working days.</p>
                <p class="sp-text" style="margin: 6px 0 0; font-size: 11px">Free over 40 pounds.</p>
              </div>
            </div>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 0; min-width: 0; gap: 6px">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="trigger-menu"
                    aria-expanded="false" aria-haspopup="menu"
                    style="display: flex; align-items: center; justify-content: space-between; gap: 6px; width: 100%">
              <span>Actions</span>
              ${n(`chevronRight`,`sp-icon--chevron`)}
            </button>
            <span class="sp-label" data-part="val-menu" data-value="false"
                  style="font-size: 10px; white-space: nowrap">aria-expanded="false"</span>

            <div style="position: relative; height: 104px">
              <div class="sp-menu" data-part="menu" role="menu" style="left: 0; right: 0; top: 0">
                <button class="sp-menu-item" type="button" role="menuitem" data-part="menu-rename">Rename</button>
                <button class="sp-menu-item" type="button" role="menuitem" data-part="menu-duplicate">Duplicate</button>
                <button class="sp-menu-item" type="button" role="menuitem" data-part="menu-archive">Archive</button>
              </div>
            </div>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin: 8px 0 0; height: 34px; font-size: 11px">
          Two controls, two surfaces, two independent states. A reader hears the state as part of the button, before pressing it.
        </p>
      </div>
    </div>
  `;let i=e(r,`trigger-disclosure`),a=e(r,`trigger-menu`),o=e(r,`panel`),s=e(r,`menu`),c=(t,n)=>{let i=t.getAttribute(`aria-expanded`)===`true`,a=e(r,n);a.dataset.value=String(i),a.textContent=`aria-expanded="${i}"`},l=e=>{i.setAttribute(`aria-expanded`,String(e)),o.style.opacity=e?`1`:`0`,o.style.visibility=e?`visible`:`hidden`,c(i,`val-disclosure`)},u=e=>{a.setAttribute(`aria-expanded`,String(e)),t(a,`data-open`,e),t(s,`data-open`,e),c(a,`val-menu`)};l(!0),u(!1),i.addEventListener(`click`,()=>l(i.getAttribute(`aria-expanded`)!==`true`)),a.addEventListener(`click`,()=>u(a.getAttribute(`aria-expanded`)!==`true`));for(let t of[`menu-rename`,`menu-duplicate`,`menu-archive`])e(r,t).addEventListener(`click`,()=>u(!1))}export{r as mount};