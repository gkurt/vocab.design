import{n as e,t}from"./parts.C-YLuC7Q.js";var n=240,r=200;function i(i,a){i.innerHTML=`
    <div class="sp-app" data-loop="keep">
      <div class="sp-frame" style="width: 400px; height: 236px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow" data-part="away" style="font-size: 14px">#parser</span></div>
        <div class="sp-body" data-part="stage" style="position: relative">
          <div class="sp-prose sp-context" style="max-width: none">
            <p style="margin: 0">
              Ship it once
              <span
                data-part="mention"
                data-card="closed"
                data-hover-driven
                tabindex="0"
                role="button"
                aria-haspopup="dialog"
                style="color: var(--sp-accent); font-weight: 500; cursor: pointer"
              >@riya</span>
              signs off.
            </p>
          </div>
          <div
            class="sp-popover"
            data-part="card"
            data-subject
            role="dialog"
            aria-label="Riya Kapoor"
            style="width: 236px"
          >
            <div class="sp-row" style="gap: 10px; align-items: flex-start">
              <span class="sp-avatar">RK</span>
              <span class="sp-stack" style="gap: 1px">
                <span class="sp-text sp-text--ink" style="font-weight: 600">Riya Kapoor</span>
                <span class="sp-label">@riya</span>
              </span>
            </div>
            <p class="sp-text" style="margin: 8px 0 10px">Compilers and editor tooling.</p>
            <button class="sp-button sp-button--sm" data-part="follow" type="button">Follow</button>
          </div>
        </div>
      </div>
    </div>
  `;let o=e(i,`mention`),s=e(i,`card`),c=e(i,`stage`),l=o.offsetLeft,u=o.offsetTop+o.offsetHeight+6,d=c.clientWidth-236-12,f=Math.max(0,Math.min(l-10,d));s.style.left=`${f}px`,s.style.top=`${u}px`,s.style.setProperty(`--sp-arrow-x`,`${Math.max(12,l-f+8)}px`);let p,m=e=>{t(s,`data-open`,e),o.dataset.card=e?`open`:`closed`},h=()=>{p!==void 0&&a.clearTimeout(p),p=void 0},g=()=>{h(),p=a.setTimeout(()=>m(!1),r)},_;o.addEventListener(`pointerenter`,()=>{h(),_!==void 0&&a.clearTimeout(_),_=a.setTimeout(()=>m(!0),n)}),o.addEventListener(`pointerleave`,()=>{_!==void 0&&a.clearTimeout(_),_=void 0,g()}),o.addEventListener(`focus`,()=>m(!0)),o.addEventListener(`blur`,()=>m(!1)),s.addEventListener(`pointerenter`,h),s.addEventListener(`pointerleave`,g),i.addEventListener(`keydown`,e=>{e.key===`Escape`&&m(!1)})}export{i as mount};