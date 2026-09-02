import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=300,r=`opacity ${n}ms var(--sp-ease), transform ${n}ms var(--sp-ease), visibility ${n}ms`,i=`translateY(-14px) scale(0.97)`;function a(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 350px; height: 240px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Inbox</span>
          <span class="sp-label">Team</span>
        </div>
        <div class="sp-body sp-stack" style="gap: 10px">
          <div style="position: relative; height: 92px; flex: 0 0 auto">
            <article
              class="sp-surface sp-row"
              data-part="card"
              data-subject
              style="position: absolute; inset: 0; gap: 10px; padding: 12px; box-shadow: var(--sp-shadow);
                     opacity: 0; visibility: hidden; transform: ${i}; transition: ${r}"
            >
              <span class="sp-avatar">RK</span>
              <span class="sp-stack sp-grow" style="gap: 7px">
                <span class="sp-row sp-row--between">
                  <span class="sp-heading" style="font-size: 13px">Rana Kaur</span>
                  <span class="sp-label">now</span>
                </span>
                <span class="sp-line" style="width: 92%"></span>
                <span class="sp-line" style="width: 58%"></span>
              </span>
            </article>
          </div>
          <div class="sp-row sp-context" style="gap: 6px">
            <button
              class="sp-button sp-button--sm"
              type="button"
              data-part="send"
              style="display: inline-flex; align-items: center; gap: 7px"
            >${t(`bell`)} New message</button>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="dismiss">Dismiss</button>
          </div>
        </div>
      </div>
    </div>
  `;let a=e(n,`card`),o=e=>{a.style.transition=e?r:`none`,a.style.opacity=e?`1`:`0`,a.style.visibility=e?`visible`:`hidden`,a.style.transform=e?`none`:i,a.setAttribute(`aria-hidden`,String(!e))};e(n,`send`).addEventListener(`click`,()=>o(!0)),e(n,`dismiss`).addEventListener(`click`,()=>o(!1))}export{a as mount};