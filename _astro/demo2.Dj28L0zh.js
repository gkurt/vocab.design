import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=2600;function i(i,a){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Field notes</span>
          <span class="sp-label">server-rendered</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center">
          <div class="sp-surface" style="width: 100%; padding: 12px 14px">
            <div class="sp-row sp-context">
              <span class="sp-avatar">AM</span>
              <span class="sp-grow">
                <span class="sp-text sp-text--ink" style="font-weight: 600">Ada M.</span>
                <p class="sp-text" style="margin: 2px 0 0">Pushed the new colour ramp</p>
              </span>
            </div>
            <div class="sp-row" style="margin-top: 12px">
              <button
                class="sp-button sp-button--ghost sp-button--sm sp-row"
                data-part="like"
                data-subject
                data-phase="inert"
                data-pose="[data-phase=inert]"
                aria-pressed="false"
              >${n(`heart`)} <span data-part="count" data-count="18">18</span></button>
            </div>
          </div>
        </div>
        <div
          class="sp-context"
          style="flex: 0 0 auto; display: flex; flex-direction: column; gap: 3px; padding: 8px 12px; border-top: 1px solid var(--sp-line)"
        >
          <span class="sp-row" style="gap: 7px">
            <span class="sp-pending" data-part="dot" style="width: 8px; height: 8px; border-radius: 50%; background: var(--sp-muted)"></span>
            <span class="sp-text sp-text--ink" data-part="phase" data-phase="inert">Script not loaded</span>
          </span>
          <span class="sp-text" data-part="readout" data-state="idle">Last press: none</span>
        </div>
      </div>
    </div>
  `;let o=e(i,`like`),s=e(i,`count`),c=e(i,`phase`),l=e(i,`dot`),u=e(i,`readout`),d=!1,f=18,p=(e,t)=>{u.dataset.state=e,u.textContent=t};o.addEventListener(`click`,()=>{d||p(`dead`,`Last press: ignored, no handler`)});let m=()=>{f+=1,s.textContent=String(f),s.dataset.count=String(f),o.setAttribute(`aria-pressed`,`true`),t(o,`data-selected`,!0),p(`applied`,`Last press: liked, count ${f}`)};a.setTimeout(()=>{d=!0,o.addEventListener(`click`,m),o.dataset.phase=`live`,c.dataset.phase=`live`,c.textContent=`Script loaded`,l.className=``,l.style.background=`var(--sp-accent)`},r)}export{i as mount};