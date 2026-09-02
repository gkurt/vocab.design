import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./motion.B5_YXmsy.js";var n=700,r=`opacity ${n}ms ease-in, transform ${n}ms ease-in`,i=`scale(0.88)`,a=e=>`
  <article
    class="sp-surface sp-stack"
    data-part="${e?`card`:`twin`}"
    ${e?`data-subject`:``}
    style="position: absolute; inset: 0; gap: 8px; padding: 11px; ${e?`transition: ${r}`:``}"
  >
    <span class="sp-row sp-row--between">
      <span class="sp-heading" style="font-size: 13px">Build 4182</span>
      <span class="sp-label">2m</span>
    </span>
    <span class="sp-line" style="width: 86%"></span>
    <span class="sp-line" style="width: 54%"></span>
  </article>`,o=(e,t)=>`
  <div class="sp-stack${t?``:` sp-context`}" style="flex: 1 1 0; gap: 6px">
    <span class="sp-label">${e}</span>
    <div data-part="${t?`slot`:`twin-slot`}" data-state="present" style="position: relative; height: 88px">
      ${a(t)}
    </div>
  </div>`;function s(a,s){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 392px; height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Notifications</span>
          <span class="sp-label">Deploys</span>
        </div>
        <div class="sp-body sp-stack" style="gap: 12px">
          <div class="sp-row" style="align-items: flex-start; gap: 14px">
            ${o(`With`,!0)}
            ${o(`Without`,!1)}
          </div>
          <div class="sp-row sp-context" style="gap: 6px">
            <button class="sp-button sp-button--sm" type="button" data-part="dismiss">Dismiss</button>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="restore">Restore</button>
          </div>
        </div>
      </div>
    </div>
  `;let c=e(a,`card`),l=e(a,`twin`),u=e(a,`slot`),d=e(a,`twin-slot`),f;e(a,`dismiss`).addEventListener(`click`,()=>{s.clearTimeout(f),l.hidden=!0,d.dataset.state=`gone`,c.hidden=!1,c.style.transition=r,c.style.opacity=`0`,c.style.transform=i,u.dataset.state=`leaving`;let e=t(a)?0:n;f=s.setTimeout(()=>{c.hidden=!0,u.dataset.state=`gone`},e)}),e(a,`restore`).addEventListener(`click`,()=>{s.clearTimeout(f),l.hidden=!1,d.dataset.state=`present`,c.style.transition=`none`,c.hidden=!1,c.style.opacity=`1`,c.style.transform=`none`,u.dataset.state=`present`})}export{s as mount};