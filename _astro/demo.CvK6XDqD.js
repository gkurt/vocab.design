import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=[`Details`,`Region`,`Review`],i=[{key:`eu`,label:`Europe (Frankfurt)`},{key:`us`,label:`US East (Virginia)`}],a=`Give the workspace a name.`;function o(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 400px; height: 316px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Console</span><span class="sp-label">acme.io</span></div>
        <div class="sp-body sp-context">
          <section
            class="sp-surface"
            data-part="wizard"
            data-subject
            data-step="1"
            role="group"
            aria-label="Create a workspace"
            style="padding: 14px"
          >
            <div class="sp-row" data-part="steps" style="gap: 14px">${r.map((e,t)=>`
      <div class="sp-row" data-part="step-${t+1}" style="gap: 6px">
        <span
          data-part="badge-${t+1}"
          aria-hidden="true"
          style="display: flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; font-size: 11px; font-weight: 600"
        >${t+1}</span>
        <span class="sp-label" style="font-size: 12px">${e}</span>
      </div>`).join(``)}</div>
            <div class="sp-divider" style="margin: 12px 0"></div>
            <div data-part="body" style="height: 118px"></div>
            <div class="sp-row sp-row--between" style="margin-top: 12px">
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="back" aria-disabled="true">Back</button>
              <button class="sp-button sp-button--sm" type="button" data-part="next">Next</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  `;let s=e(o,`wizard`),c=e(o,`body`),l=e(o,`back`),u=e(o,`next`),d=0,f=``,p=`eu`,m=!1,h=!1,g=()=>`
    <div class="sp-stack" style="gap: 4px">
      <label class="sp-label" for="vd-wz-name">Workspace name</label>
      <input class="sp-input" id="vd-wz-name" data-part="name" type="text" autocomplete="off" spellcheck="false"
        aria-describedby="vd-wz-error" value="${f}" />
      <div style="height: 24px">
        <p class="sp-text sp-text--ink sp-row" id="vd-wz-error" data-part="error" role="alert" style="gap: 6px; margin: 4px 0 0; font-size: 12px" ${m?``:`hidden`}>
          ${n(`alert`)}<span>${a}</span>
        </p>
      </div>
    </div>`,_=()=>`
    <div class="sp-stack" style="gap: 6px">
      <span class="sp-label" id="vd-wz-region">Region</span>
      <ul class="sp-listbox sp-listbox--static" role="listbox" aria-labelledby="vd-wz-region" style="box-shadow: none">
        ${i.map(({key:e,label:t})=>`<li class="sp-option" role="option" data-part="region-${e}" data-region="${e}" aria-selected="${e===p}">${t}</li>`).join(``)}
      </ul>
    </div>`,v=()=>`
    <div class="sp-stack" style="gap: 8px">
      ${h?`<p class="sp-text sp-text--ink" style="margin: 0">Workspace created.</p>`:``}
      <div class="sp-row sp-row--between">
        <span class="sp-label">Name</span>
        <span class="sp-text sp-text--ink" data-part="review-name" data-value="${f}">${f}</span>
      </div>
      <div class="sp-divider"></div>
      <div class="sp-row sp-row--between">
        <span class="sp-label">Region</span>
        <span class="sp-text sp-text--ink" data-part="review-region" data-value="${p}">${i.find(e=>e.key===p)?.label??``}</span>
      </div>
    </div>`,y=()=>{c.innerHTML=[g,_,v][d]?.()??``,s.dataset.step=String(d+1);for(let[n]of r.entries()){let r=e(o,`step-${n+1}`);t(r,`data-current`,n===d),t(r,`data-done`,n<d),r.setAttribute(`aria-current`,n===d?`step`:`false`);let i=e(o,`badge-${n+1}`),a=n<=d;i.style.background=a?`var(--sp-accent)`:`var(--sp-sunken)`,i.style.color=a?`var(--sp-accent-ink)`:`var(--sp-muted)`}l.setAttribute(`aria-disabled`,String(d===0)),u.textContent=d===r.length-1?`Create workspace`:`Next`,u.setAttribute(`aria-disabled`,String(h)),t(s,`data-created`,h)};c.addEventListener(`input`,t=>{let n=t.target;n.dataset.part===`name`&&(f=n.value,!(!m||f.trim()===``)&&(m=!1,e(o,`error`).hidden=!0))}),c.addEventListener(`click`,t=>{let n=t.target.closest(`[data-region]`)?.dataset.region;if(n){p=n;for(let{key:t}of i)e(o,`region-${t}`).setAttribute(`aria-selected`,String(t===p))}}),u.addEventListener(`click`,()=>{if(!h){if(d===0&&f.trim()===``){m=!0,e(o,`error`).hidden=!1,e(o,`name`).setAttribute(`aria-invalid`,`true`);return}if(d===r.length-1){h=!0,y();return}d+=1,y()}}),l.addEventListener(`click`,()=>{d===0||h||(--d,y())}),y()}export{o as mount};