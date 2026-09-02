import{n as e}from"./parts.C-YLuC7Q.js";import{i as t,r as n}from"./measure.DK7AY2_i.js";var r={w:330,h:172},i=[{key:`left`,x:46,y:44},{key:`mid`,x:165,y:96},{key:`right`,x:286,y:52}],a=[`left`,`mid`,`right`];function o(o){o.innerHTML=`
    <div class="sp-app" data-loop="keep" style="gap: 9px">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Plans</span>
          <span class="sp-label" data-part="readout">dark</span>
        </div>
        <div
          class="sp-body"
          style="background: #0e1220; display: flex; align-items: center; justify-content: center"
        >
          <div
            class="sp-context"
            data-part="card"
            data-hover-driven
            style="position: relative; width: ${r.w}px; height: ${r.h}px; overflow: hidden;
                   border-radius: 12px; border: 1px solid #2a3149; background: #161b2c"
          >
            <span
              data-part="glow"
              data-subject
              data-zone="mid"
              aria-hidden="true"
              style="position: absolute; inset: 0; opacity: 0; pointer-events: none;
                     transition: opacity 220ms linear;
                     background: radial-gradient(170px circle at var(--x, 50%) var(--y, 50%),
                       rgb(132 162 255 / 0.58), rgb(132 162 255 / 0.16) 42%, transparent 70%)"
            ></span>

            <div
              style="position: relative; height: 100%; padding: 16px 18px; display: flex; flex-direction: column; gap: 9px"
            >
              <span
                style="align-self: flex-start; padding: 3px 9px; border-radius: 999px; font-size: 11px;
                       font-weight: 600; color: #cdd8ff; background: rgb(132 162 255 / 0.16)"
              >Studio</span>
              <span data-part="price" style="font-size: 22px; font-weight: 600; color: #f2f5ff">£24 a month</span>
              <span style="height: 8px; width: 78%; border-radius: 4px; background: rgb(210 220 255 / 0.22)"></span>
              <span style="height: 8px; width: 54%; border-radius: 4px; background: rgb(210 220 255 / 0.22)"></span>
              <button
                type="button"
                data-part="cta"
                style="margin-top: auto; align-self: flex-start; padding: 7px 14px; border: 0; border-radius: 8px;
                       font: inherit; font-weight: 500; color: #10142a; background: #dfe6ff; cursor: pointer"
              >Choose Studio</button>
            </div>

            ${i.map(e=>`<span data-part="aim-${e.key}" aria-hidden="true"
           style="position: absolute; left: ${e.x-8}px; top: ${e.y-8}px; width: 16px; height: 16px; pointer-events: none"></span>`).join(``)}
          </div>
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 460px; margin: 0; text-align: center">
        Two numbers change; the gradient is simply drawn somewhere else.
      </p>
    </div>
  `;let s=e(o,`card`),c=e(o,`glow`),l=e(o,`readout`),u=()=>{c.style.opacity=`0`,l.textContent=`dark`};o.addEventListener(`pointermove`,e=>{let r=e.target;if(!(r instanceof Element&&r.closest(`[data-part="card"]`)!==null)){u();return}let i=t(s),{x:o,y:d}=n(e,s);c.style.setProperty(`--x`,`${o}px`),c.style.setProperty(`--y`,`${d}px`),c.style.opacity=`1`;let f=a[Math.min(2,Math.max(0,Math.floor(o/i.width*3)))];c.dataset.zone=f,l.textContent=f}),o.addEventListener(`pointerleave`,u)}export{o as mount};