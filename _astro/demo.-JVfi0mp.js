import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=44,i=20,a=15,o=e=>[`position: relative`,`display: flex`,`align-items: center`,`justify-content: center`,`width: ${e}px`,`height: ${e}px`,`padding: 0`,`border-radius: 8px`].join(`; `),s=`position: absolute; inset: 0; border: 1px dashed var(--sp-accent); border-radius: 8px; pointer-events: none`,c=[`position: absolute`,`width: 12px`,`height: 12px`,`margin: -6px 0 0 -6px`,`border-radius: 50%`,`border: 1px solid var(--sp-accent)`,`background: color-mix(in oklab, var(--sp-accent) 26%, transparent)`,`pointer-events: none`].join(`; `);function l(l){l.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Player</span>
          <span class="sp-text" data-part="readout" data-hit="none" style="width: 132px; text-align: right">Nothing pressed yet</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px">
          <div class="sp-row" data-part="row" style="align-items: center; gap: 44px">
            <div class="sp-stack" style="align-items: center; gap: 10px; width: 128px">
              <button
                class="sp-button sp-button--quiet"
                type="button"
                aria-label="Favourite"
                data-part="roomy"
                data-subject
                style="${o(r)}"
              >
                ${n(`heart`)}
                <span style="${s}"></span>
                <span data-part="press-in" style="${c}; left: ${r/2-a}px; top: ${r/2-a}px"></span>
              </button>
              <span class="sp-label">Target ${r} px</span>
            </div>
            <div class="sp-stack sp-context" style="align-items: center; gap: 10px; width: 128px">
              <div style="position: relative; display: flex; align-items: center; justify-content: center; width: ${i}px; height: ${i}px">
                <button class="sp-button sp-button--quiet" type="button" aria-label="Repeat" data-part="tight" style="${o(i)}">
                  ${n(`star`)}
                  <span style="${s}"></span>
                </button>
                <span data-part="press-out" style="${c}; left: ${i/2-a}px; top: ${i/2-a}px"></span>
              </div>
              <span class="sp-label">Target ${i} px</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let u=e(l,`roomy`),d=e(l,`tight`),f=e(l,`readout`),p=(e,n)=>{t(e,`data-selected`,!0),e.style.background=`var(--sp-accent-soft)`,f.dataset.hit=`control`,f.textContent=`Pressed: ${n}`};u.addEventListener(`click`,()=>p(u,`Favourite`)),d.addEventListener(`click`,()=>p(d,`Repeat`)),e(l,`row`).addEventListener(`click`,e=>{let t=e.target;u.contains(t)||d.contains(t)||(f.dataset.hit=`miss`,f.textContent=`Pressed: nothing`)})}export{l as mount};