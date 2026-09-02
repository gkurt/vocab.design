import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=[`stop-close`,`stop-cancel`,`stop-send`],i=[`page-overview`,`page-members`,`page-trigger`],a={trapped:`Three stops, and the fourth Tab is the first one again. Nothing behind the scrim is in the sequence at all.`,released:`Dismissed, and the constraint goes with it: the page behind is back in the sequence, from the top.`};function o(o){let s=(e,t,n,r)=>`<div class="${n}" role="button" tabindex="${r}" data-part="${e}">${t}</div>`;o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 444px; height: 214px">
        <div class="sp-topbar sp-context" style="padding: 8px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Harbour</span>
          ${s(`page-overview`,`Overview`,`sp-button sp-button--quiet sp-button--sm`,-1)}
          ${s(`page-members`,`Members`,`sp-button sp-button--quiet sp-button--sm`,-1)}
        </div>

        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 9px">
          <span class="sp-label">Workspace members</span>
          <div class="sp-stack" style="gap: 7px">
            <div class="sp-line" style="width: 72%"></div>
            <div class="sp-line" style="width: 54%"></div>
          </div>
          <div class="sp-row" style="margin-top: 2px">
            ${s(`page-trigger`,`Invite people`,`sp-button sp-button--sm`,-1)}
          </div>
        </div>

        <div class="sp-scrim" data-part="scrim" data-open></div>

        <div class="sp-dialog" role="dialog" aria-modal="true" aria-label="Invite people"
             data-part="dialog" data-subject data-pose="[data-trapped]" data-trapped data-open
             style="width: 252px; padding: 14px 16px">
          <div class="sp-row sp-row--between" style="gap: 10px">
            <span class="sp-heading" style="font-size: 14px">Invite people</span>
            <div class="sp-icon-button" role="button" aria-label="Close" tabindex="0" data-part="stop-close">${n(`close`)}</div>
          </div>
          <p class="sp-text" style="margin: 8px 0 0; font-size: 12px">
            They will get an email with a link to this workspace.
          </p>
          <div class="sp-row" style="justify-content: flex-end; gap: 8px; margin-top: 14px">
            ${s(`stop-cancel`,`Cancel`,`sp-button sp-button--ghost sp-button--sm`,0)}
            ${s(`stop-send`,`Send invite`,`sp-button sp-button--sm`,0)}
          </div>
          <div class="sp-row" style="justify-content: flex-end; gap: 6px; margin-top: 10px">
            <span class="sp-kbd">Esc</span>
            <span class="sp-text" style="font-size: 11px">closes and gives focus back</span>
          </div>
        </div>
      </div>

      <div class="sp-surface sp-context" style="width: 444px; padding: 7px 10px">
        <div class="sp-row sp-row--between" style="height: 17px; gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">In the tab sequence</span>
          <span class="sp-text sp-text--ink" data-part="count" data-where="dialog"
                style="flex: 0 0 auto; font-size: 12px; white-space: nowrap">3 stops, all inside the dialog</span>
        </div>
        <p class="sp-text" data-stage-verdict data-part="caption" data-state="trapped"
           style="margin: 4px 0 0; height: 34px; font-size: 11px">${a.trapped}</p>
      </div>
    </div>
  `;let c=e(o,`dialog`),l=e(o,`scrim`),u=e(o,`count`),d=e(o,`caption`),f=n=>{for(let t of r)e(o,t).tabIndex=n?0:-1;for(let t of i)e(o,t).tabIndex=n?-1:0;t(c,`data-open`,n),t(c,`data-trapped`,n),t(l,`data-open`,n);let s=[...o.querySelectorAll(`[data-part][tabindex="0"]`)];u.dataset.where=n?`dialog`:`page`,u.textContent=`${s.length} stops, ${n?`all inside the dialog`:`all out on the page`}`,d.dataset.state=n?`trapped`:`released`,d.textContent=n?a.trapped:a.released};f(!0);for(let t of[`stop-close`,`stop-cancel`,`stop-send`])e(o,t).addEventListener(`click`,()=>f(!1));e(o,`page-trigger`).addEventListener(`click`,()=>f(!0)),o.addEventListener(`keydown`,e=>{e.key===`Escape`&&f(!1)})}export{o as mount};