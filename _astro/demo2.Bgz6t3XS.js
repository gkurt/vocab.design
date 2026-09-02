import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=34,i=`display: flex; align-items: center; gap: 8px; padding: 0 8px; font-size: 13px; cursor: grab; touch-action: none`;function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 240px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Sprint board</span>
          <span class="sp-text">3 cards</span>
        </div>
        <div class="sp-body" style="display: flex; gap: 10px">
          <section class="sp-surface" data-part="zone-backlog" style="flex: 1 1 0; padding: 8px">
            <span class="sp-label sp-context">Backlog</span>
            <div class="sp-stack" data-part="list-backlog" style="margin-top: 8px">
              <div class="sp-surface sp-context" style="${i}; height: ${r}px">
                ${n(`menu`)}
                <span class="sp-grow">Fix flaky test</span>
              </div>
              <div
                class="sp-surface"
                data-part="card"
                data-subject
                data-in="backlog"
                style="${i}; height: ${r}px"
              >
                ${n(`menu`)}
                <span class="sp-grow">Ship changelog</span>
              </div>
            </div>
          </section>
          <section class="sp-surface" data-part="zone-doing" style="flex: 1 1 0; padding: 8px">
            <span class="sp-label sp-context">Doing</span>
            <div class="sp-stack" data-part="list-doing" style="margin-top: 8px">
              <div class="sp-surface sp-context" style="${i}; height: ${r}px">
                ${n(`menu`)}
                <span class="sp-grow">Update API docs</span>
              </div>
              <div
                class="sp-context"
                data-part="doing-empty"
                style="display: flex; align-items: center; justify-content: center; height: ${r}px; border: 1px dashed var(--sp-line); border-radius: var(--sp-radius); font-size: 12px; color: var(--sp-muted)"
              >
                Drop here
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  `;let o=e(a,`card`),s=[{key:`backlog`,zone:e(a,`zone-backlog`),list:e(a,`list-backlog`)},{key:`doing`,zone:e(a,`zone-doing`),list:e(a,`list-doing`)}],c=e(a,`doing-empty`),l=!1,u=e=>{for(let{zone:n}of s){let r=n===e;t(n,`data-active`,r),n.style.background=r?`var(--sp-accent-soft)`:``,n.style.borderColor=r?`var(--sp-accent)`:``}},d=(e,t)=>s.find(({zone:n})=>{let r=n.getBoundingClientRect();return e>=r.left&&e<=r.right&&t>=r.top&&t<=r.bottom});o.addEventListener(`pointerdown`,e=>{e.isTrusted&&o.setPointerCapture(e.pointerId),l=!0,t(o,`data-dragging`,!0),o.style.boxShadow=`var(--sp-shadow)`,o.style.opacity=`0.86`}),a.addEventListener(`pointermove`,e=>{l&&u(d(e.clientX,e.clientY)?.zone)});let f=e=>{if(!l)return;l=!1,t(o,`data-dragging`,!1),o.style.boxShadow=``,o.style.opacity=``,u(void 0);let n=d(e.clientX,e.clientY);!n||n.list===o.parentElement||(n.list.append(o),o.dataset.in=n.key,c.hidden=n.key===`doing`)};a.addEventListener(`pointerup`,f),a.addEventListener(`pointercancel`,f)}export{a as mount};