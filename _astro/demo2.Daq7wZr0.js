import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=[`Choose who gets paged`,`Connect a Slack channel`,`Pick your quiet hours`],r=[[`Disk usage above 80%`,`Paging`],[`Error rate spike`,`Slack`],[`Latency p99 over 400 ms`,`Email`]];function i(i){let a=(e,t)=>`
    <span class="sp-nav-item" data-part="tab-${e.toLowerCase()}" ${t?`data-current`:``} style="padding: 4px 10px; font-size: 12px">${e}</span>
  `;i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 302px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Acme Cloud</span>
          <span class="sp-avatar" style="width: 22px; height: 22px; font-size: 10px">DL</span>
        </div>

        <div class="sp-row sp-context" style="flex: 0 0 auto; gap: 2px; padding: 6px 10px; border-bottom: 1px solid var(--sp-line)">
          ${a(`Overview`,!1)}${a(`Usage`,!1)}${a(`Alerts`,!0)}
        </div>

        <div class="sp-body" style="position: relative; padding: 12px 14px">
          <div class="sp-stack sp-context" data-part="feature" data-state="covered" aria-hidden="true" style="gap: 8px">
            <div class="sp-row sp-row--between">
              <span class="sp-heading" style="font-size: 13px">Alerts</span>
              <span class="sp-button sp-button--sm" style="font-size: 12px">New alert</span>
            </div>
            <div class="sp-surface" style="padding: 2px 8px">${r.map(([e,t])=>`
    <div class="sp-list-item" style="padding: 8px 4px; font-size: 12px">
      <span class="sp-grow">${e}</span>
      <span class="sp-label" style="font-size: 11px">${t}</span>
    </div>
  `).join(``)}</div>
          </div>

          <div
            class="sp-surface"
            data-part="mat"
            data-subject
            style="position: absolute; inset: 8px 10px; display: flex; flex-direction: column; gap: 9px;
                   padding: 12px 16px; background: var(--sp-surface); transition: opacity 0.22s ease, visibility 0.22s"
          >
            <div class="sp-stack" style="gap: 3px">
              <span class="sp-label" style="font-size: 10.5px; letter-spacing: 0.06em; text-transform: uppercase">First time here</span>
              <span class="sp-heading" style="font-size: 15px">Set up Alerts</span>
            </div>

            <span class="sp-text" style="font-size: 12px">Three things to decide, and then this page pages the right people.</span>

            <div class="sp-stack" style="gap: 7px">${n.map(e=>`
    <div class="sp-row" style="gap: 8px">
      <span
        style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 18px; height: 18px;
               border-radius: 50%; background: var(--sp-accent-soft); color: var(--sp-accent)"
        >${t(`check`).replace(`class="sp-icon"`,`class="sp-icon" style="width: 12px; height: 12px"`)}</span
      >
      <span class="sp-text sp-text--ink" style="font-size: 12px">${e}</span>
    </div>
  `).join(``)}</div>

            <span class="sp-grow"></span>

            <div class="sp-row" style="gap: 10px; flex: 0 0 auto">
              <button class="sp-button sp-button--sm" type="button" data-part="start" style="font-size: 12px">Start setup</button>
              <button class="sp-button sp-button--quiet sp-button--sm" type="button" data-part="skip" style="font-size: 12px; color: var(--sp-muted)">
                Do not show again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let o=e(i,`mat`),s=e(i,`feature`),c=()=>{o.style.opacity=`0`,o.style.visibility=`hidden`,s.dataset.state=`live`,s.removeAttribute(`aria-hidden`)};e(i,`skip`).addEventListener(`click`,c),e(i,`start`).addEventListener(`click`,c)}export{i as mount};