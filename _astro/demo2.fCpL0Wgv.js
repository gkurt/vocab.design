import{n as e,t}from"./parts.C-YLuC7Q.js";import{r as n}from"./measure.DK7AY2_i.js";import{t as r}from"./motion.B5_YXmsy.js";var i=84,a=420,o=[[`14:20`,`Kalkan`,`Full`],[`15:05`,`Kalkan`,`6 seats`]];function s(s){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 212px; height: 296px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Ferries</span>
          <span class="sp-label" data-part="readout">Nothing chosen</span>
        </div>
        <div class="sp-body" data-touch style="display: flex; flex-direction: column; gap: 10px">
          <div
            class="sp-surface"
            data-part="card"
            data-subject
            role="button"
            tabindex="0"
            aria-pressed="false"
            style="position: relative; overflow: hidden; padding: 10px 12px; user-select: none"
          >
            <div class="sp-row sp-row--between">
              <span class="sp-heading">13:40</span>
              <span class="sp-label">2 seats</span>
            </div>
            <div class="sp-text" style="margin-top: 2px">Kalkan, 35 min</div>
          </div>
          <ul class="sp-list sp-surface sp-context" style="overflow: hidden">${o.map(([e,t,n])=>`
      <li class="sp-list-item sp-context" style="padding: 8px 10px">
        <span class="sp-text sp-text--ink" style="width: 46px">${e}</span>
        <span class="sp-grow sp-text">${t}</span>
        <span class="sp-label">${n}</span>
      </li>`).join(``)}</ul>
          <div class="sp-grow"></div>
          <div style="position: relative; flex: 0 0 auto; height: 62px">
            <div
              class="sp-surface sp-context"
              data-part="detail-empty"
              style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 12px; color: var(--sp-muted)"
            >
              Tap a departure
            </div>
            <div
              class="sp-surface"
              data-part="detail"
              hidden
              style="position: absolute; inset: 0; display: flex; align-items: center; gap: 8px; padding: 0 10px"
            >
              <span class="sp-grow sp-text sp-text--ink">13:40 held</span>
              <button class="sp-button sp-button--ghost sp-button--sm sp-context" type="button" data-part="release">Release</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let c=e(s,`card`),l=e(s,`detail`),u=e(s,`detail-empty`),d=e(s,`readout`);c.addEventListener(`pointerdown`,e=>{if(t(c,`data-pressed`,!0),r(s))return;let o=n(e,c),l=document.createElement(`span`);l.style.cssText=[`position: absolute`,`left: ${o.x-i/2}px`,`top: ${o.y-i/2}px`,`width: ${i}px`,`height: ${i}px`,`border-radius: 50%`,`background: var(--sp-accent)`,`pointer-events: none`].join(`; `),c.appendChild(l);let u=l.animate([{transform:`scale(0.2)`,opacity:.34},{transform:`scale(1)`,opacity:0}],{duration:a,easing:`ease-out`});u.onfinish=()=>l.remove()});let f=()=>t(c,`data-pressed`,!1);c.addEventListener(`pointerup`,f),c.addEventListener(`pointercancel`,f),c.addEventListener(`pointerleave`,f),c.addEventListener(`click`,()=>{c.setAttribute(`aria-pressed`,`true`),t(c,`data-chosen`,!0),c.style.background=`var(--sp-accent-soft)`,c.style.borderColor=`var(--sp-accent)`,l.hidden=!1,u.hidden=!0,d.textContent=`13:40 chosen`}),e(s,`release`).addEventListener(`click`,()=>{c.setAttribute(`aria-pressed`,`false`),t(c,`data-chosen`,!1),c.style.background=``,c.style.borderColor=``,l.hidden=!0,u.hidden=!1,d.textContent=`Nothing chosen`})}export{s as mount};