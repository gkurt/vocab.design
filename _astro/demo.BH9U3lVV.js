import{n as e}from"./parts.C-YLuC7Q.js";var t={key:`none`,text:`Nothing has been pressed yet.`};function n(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 10px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; height: 20px">
          <span class="sp-grow"></span>
          <button class="sp-button sp-button--quiet sp-button--sm" type="button" data-part="reset"
                  style="font-size: 11px; padding: 2px 8px; color: var(--sp-muted)">Reset</button>
        </div>

        <div class="sp-row" style="margin-top: 8px; gap: 10px; align-items: stretch">
          <div class="sp-surface sp-context" data-part="panel-down"
               style="flex: 1 1 0; min-width: 0; padding: 8px 10px; display: flex; flex-direction: column; gap: 6px;
                      background: var(--sp-sunken)">
            <span class="sp-label" style="font-size: 9.5px">Acts on press</span>
            <button class="sp-button sp-button--sm" type="button" data-part="down-btn"
                    style="justify-content: center; font-size: 11.5px">Delete draft</button>
            <span class="sp-text" data-part="state-down" data-state="idle" style="font-size: 10.5px">Draft intact</span>
          </div>

          <div class="sp-surface" data-part="panel-up"
               style="flex: 1 1 0; min-width: 0; padding: 8px 10px; display: flex; flex-direction: column; gap: 6px">
            <span class="sp-label sp-context" style="font-size: 9.5px">Acts on release</span>
            <button class="sp-button sp-button--sm" type="button" data-part="up-btn" data-subject
                    style="justify-content: center; font-size: 11.5px">Delete draft</button>
            <span class="sp-text sp-context" data-part="state-up" data-state="idle" style="font-size: 10.5px">Draft intact</span>
          </div>
        </div>

        <div class="sp-surface sp-context" data-part="away" aria-hidden="true"
             style="margin-top: 8px; height: 30px; border-style: dashed; background: var(--sp-sunken)"></div>

        <div class="sp-surface sp-context" data-part="log" data-last="none"
             style="margin-top: 8px; height: 44px; padding: 6px 10px; display: flex; flex-direction: column;
                    justify-content: center; gap: 3px; background: var(--sp-sunken)">
          <span class="sp-text" data-part="log-1" style="min-height: 14px; font-size: 10.5px">${t.text}</span>
          <span class="sp-text sp-text--ink" data-part="log-2" style="min-height: 14px; font-size: 10.5px"></span>
        </div>
      </div>
    </div>
  `;let r=e(n,`down-btn`),i=e(n,`up-btn`),a=e(n,`state-down`),o=e(n,`state-up`),s=e(n,`log`),c=e(n,`log-1`),l=e(n,`log-2`),u=[t],d=()=>{let e=u.slice(-2);c.textContent=e.length>1?e[0]?.text??``:``,l.textContent=e.length>1?e[1]?.text??``:e[0]?.text??``,s.dataset.last=u[u.length-1]?.key??`none`},f=(e,t)=>{u=[...u,{key:e,text:t}],d()},p=(e,t)=>{e.dataset.state=t?`fired`:`idle`,e.textContent=t?`Draft deleted`:`Draft intact`},m=(e,t)=>{let n=e.getBoundingClientRect();return t.clientX>=n.left&&t.clientX<=n.right&&t.clientY>=n.top&&t.clientY<=n.bottom};d(),r.addEventListener(`pointerdown`,()=>{p(a,!0),f(`down-fired`,`Press button: deleted the draft the moment it was pressed.`)}),r.addEventListener(`pointerup`,e=>{m(r,e)||f(`down-late`,`Press button: let go somewhere else, which is far too late.`)});let h=!1;i.addEventListener(`pointerdown`,()=>{h=!0}),i.addEventListener(`pointerup`,e=>{if(h){if(h=!1,m(i,e)){p(o,!0),f(`up-fired`,`Release button: let go on the control, so it acted.`);return}f(`up-cancelled`,`Release button: let go off the control, so nothing happened.`)}}),n.addEventListener(`pointerup`,()=>{h&&(h=!1,f(`up-cancelled`,`Release button: let go off the control, so nothing happened.`))}),e(n,`reset`).addEventListener(`click`,()=>{h=!1,u=[t],p(a,!1),p(o,!1),d()})}export{n as mount};