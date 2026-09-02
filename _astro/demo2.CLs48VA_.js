import{n as e,t}from"./parts.C-YLuC7Q.js";var n=`https://example.com/guidelines`,r=`payment guidelines`,i=[`text-decoration-line: underline`,`text-decoration-skip-ink: auto`,`text-underline-offset: 0.18em`,`text-decoration-thickness: 1.5px`].join(`; `);function a(a){let o=(e,t,i,a=!1)=>`
    <div class="sp-stack" style="gap: 3px">
      <span class="sp-label sp-context">${t}</span>
      <span style="font-size: 21px">
        <a href="${n}" data-part="${e}"${a?` data-subject`:``}
           style="color: var(--sp-accent); ${i}">${r}</a>
      </span>
    </div>`;a.innerHTML=`
    <div class="sp-app" data-loop="keep">
      <div class="sp-window" style="width: 460px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Link styles</span>
          <span class="sp-label">21px</span>
        </div>
        <div class="sp-stack" style="gap: 14px; margin-top: 14px">
          <div class="sp-context">
            ${o(`link-plain`,`skip-ink: none, offset left to the browser`,`text-decoration-line: underline; text-decoration-skip-ink: none`)}
          </div>
          ${o(`link-tuned`,`offset 0.18em, thickness 1.5px, skip-ink auto`,i,!0)}
          <div class="sp-context sp-stack" style="gap: 3px">
            <span class="sp-label">text-decoration-line: none until :hover</span>
            <span style="font-size: 21px">
              <a href="${n}" data-part="link-hover" style="color: var(--sp-accent); text-decoration-line: none">${r}</a>
            </span>
          </div>
        </div>
        <div class="sp-row sp-context" style="align-items: flex-start; height: 20px; margin-top: 12px">
          <span class="sp-text" data-part="readout"></span>
        </div>
      </div>
    </div>
  `;let s=e(a,`link-hover`),c=e(a,`readout`),l=e=>{c.textContent=e};l(`Third line at rest: no underline drawn`),s.addEventListener(`pointerenter`,()=>{t(s,`data-hovered`,!0),s.style.cssText=`color: var(--sp-accent); ${i}`,l(`Third line hovered: underline drawn`)}),s.addEventListener(`pointerleave`,()=>{t(s,`data-hovered`,!1),s.style.cssText=`color: var(--sp-accent); text-decoration-line: none`,l(`Third line at rest: no underline drawn`)});for(let t of[e(a,`link-plain`),e(a,`link-tuned`),s])t.addEventListener(`click`,e=>e.preventDefault())}export{a as mount};