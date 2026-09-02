import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";function n(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="height: 264px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Order 4192</span></div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column">
          <div class="sp-surface" style="padding: 10px 12px">
            <div class="sp-row sp-row--between">
              <span class="sp-text sp-text--ink">Two items</span>
              <span class="sp-text">£64.00</span>
            </div>
            <div class="sp-divider" style="margin: 8px 0"></div>
            <div class="sp-row sp-row--between">
              <span class="sp-text sp-text--ink">Standard delivery</span>
              <span class="sp-text">Free</span>
            </div>
          </div>
          <button
            class="sp-button sp-button--quiet sp-button--sm sp-row"
            type="button"
            data-part="toggle"
            data-subject
            aria-expanded="false"
            aria-controls="vd-delivery"
            style="align-self: flex-start; margin-top: 12px; padding-left: 0"
          >
            ${t(`chevronRight`,`sp-icon--chevron`)} Delivery details
          </button>
          <div class="sp-stack" data-part="region" id="vd-delivery" hidden style="gap: 6px; margin-top: 8px; padding-left: 6px">
            <div class="sp-row sp-row--between">
              <span class="sp-label">Carrier</span>
              <span class="sp-text">Evri, tracked</span>
            </div>
            <div class="sp-row sp-row--between">
              <span class="sp-label">Arrives</span>
              <span class="sp-text">Thursday 14 March</span>
            </div>
            <div class="sp-row sp-row--between">
              <span class="sp-label">Leaves from</span>
              <span class="sp-text">Sheffield depot</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let r=e(n,`toggle`),i=e(n,`region`);r.addEventListener(`click`,()=>{let e=i.hidden;i.hidden=!e,r.setAttribute(`aria-expanded`,String(e))})}export{n as mount};