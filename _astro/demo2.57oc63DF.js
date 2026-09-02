import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r={w:476,h:292},i=40,a=78,o=`transform 0.3s var(--sp-ease), visibility 0.3s`;function s(s){let c=(e,t)=>`
    <button class="sp-icon-button" type="button" data-part="${e}" aria-label="${t}" style="width: 24px; height: 24px">${n(`close`)}</button>
  `,l=(e,t)=>`
    <div class="sp-field">
      <span class="sp-label" style="font-size: 11px">${e}</span>
      <input class="sp-input" value="${t}" aria-label="${e}" style="padding: 5px 9px" />
    </div>
  `;s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: ${r.w}px; height: ${r.h}px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Cloud console</span>
          <span class="sp-avatar" style="width: 22px; height: 22px; font-size: 10px">RH</span>
        </div>

        <div class="sp-body sp-context" style="padding: 12px">
          <div class="sp-row sp-row--between" style="margin-bottom: 8px">
            <span class="sp-heading" style="font-size: 13px">Services</span>
            <button class="sp-button sp-button--sm" type="button" data-part="open">Create service</button>
          </div>
          <div class="sp-surface" style="padding: 2px 8px">
            <div class="sp-list-item"><span class="sp-grow">object-store</span><span class="sp-label" style="font-size: 11px">Running</span></div>
            <div class="sp-list-item"><span class="sp-grow">queue-eu</span><span class="sp-label" style="font-size: 11px">Running</span></div>
          </div>
        </div>

        <div class="sp-scrim" data-part="scrim"></div>

        <div
          class="sp-surface"
          data-part="sheet-service"
          data-subject
          data-step="1"
          role="dialog"
          aria-label="Create service"
          style="position: absolute; left: 26px; right: 26px; top: ${i}px; bottom: 0; display: flex; flex-direction: column;
                 border-radius: 8px 8px 0 0; border-bottom: 0; box-shadow: var(--sp-shadow); transform: translateY(100%);
                 visibility: hidden; transition: ${o}"
        >
          <div class="sp-row" style="flex: 0 0 auto; padding: 6px 10px 6px 12px; border-bottom: 1px solid var(--sp-line)">
            <span class="sp-heading sp-grow" style="font-size: 13px">Create service</span>
            <span class="sp-label" data-part="progress" style="font-size: 11px; white-space: nowrap">Step 1 of 2</span>
            ${c(`service-close`,`Close create service`)}
          </div>

          <div class="sp-grow" style="position: relative">
            <div data-part="step-1" class="sp-stack" style="position: absolute; inset: 12px; gap: 10px; transition: opacity 0.16s">
              ${l(`Service name`,`billing-events`)}
              ${l(`Region`,`eu-central-1`)}
            </div>
            <div
              data-part="step-2"
              class="sp-stack"
              style="position: absolute; inset: 12px; gap: 10px; opacity: 0; visibility: hidden; transition: opacity 0.16s, visibility 0.16s"
            >
              <span class="sp-label" style="font-size: 11px">Authentication</span>
              <span class="sp-text" style="font-size: 12px">This service needs an API key. There is not one yet, so make it here without losing this form.</span>
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="add-key" style="align-self: flex-start">Create API key</button>
            </div>
          </div>

          <div class="sp-row" style="flex: 0 0 auto; justify-content: flex-end; gap: 8px; padding: 10px 12px; border-top: 1px solid var(--sp-line)">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="service-cancel">Cancel</button>
            <button class="sp-button sp-button--sm" type="button" data-part="next" style="min-width: 74px">Next</button>
          </div>
        </div>

        <div
          class="sp-surface sp-context"
          data-part="sheet-key"
          role="dialog"
          aria-label="Create API key"
          style="position: absolute; left: 14px; right: 14px; top: ${a}px; bottom: 0; display: flex; flex-direction: column;
                 border-radius: 8px 8px 0 0; border-bottom: 0; box-shadow: var(--sp-shadow); transform: translateY(100%);
                 visibility: hidden; transition: ${o}"
        >
          <div class="sp-row" style="flex: 0 0 auto; padding: 6px 10px 6px 12px; border-bottom: 1px solid var(--sp-line)">
            <span class="sp-heading sp-grow" style="font-size: 13px">Create API key</span>
            ${c(`key-close`,`Close create API key`)}
          </div>
          <div class="sp-stack sp-grow" style="gap: 10px; padding: 12px">
            ${l(`Key name`,`billing-writer`)}
            <span class="sp-text" style="font-size: 12px">Finishing here returns you to step 2 of the service, with the form as you left it.</span>
          </div>
          <div class="sp-row" style="flex: 0 0 auto; justify-content: flex-end; gap: 8px; padding: 10px 12px; border-top: 1px solid var(--sp-line)">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="key-cancel">Cancel</button>
            <button class="sp-button sp-button--sm" type="button" data-part="key-create" style="min-width: 74px">Create</button>
          </div>
        </div>
      </div>
    </div>
  `;let u=e(s,`scrim`),d=e(s,`sheet-service`),f=e(s,`sheet-key`),p=e(s,`step-1`),m=e(s,`step-2`),h=e(s,`progress`),g=e(s,`next`),_=(e,n)=>{t(e,`data-open`,n),e.style.transform=n?`translateY(0)`:`translateY(100%)`,e.style.visibility=n?`visible`:`hidden`,t(u,`data-open`,d.hasAttribute(`data-open`)||f.hasAttribute(`data-open`))},v=e=>{d.dataset.step=e,h.textContent=`Step ${e} of 2`,g.textContent=e===`1`?`Next`:`Create`,p.style.opacity=e===`1`?`1`:`0`,p.style.visibility=e===`1`?`visible`:`hidden`,m.style.opacity=e===`2`?`1`:`0`,m.style.visibility=e===`2`?`visible`:`hidden`};e(s,`open`).addEventListener(`click`,()=>{v(`1`),_(d,!0)}),g.addEventListener(`click`,()=>{if(d.dataset.step===`1`){v(`2`);return}_(f,!1),_(d,!1)}),e(s,`add-key`).addEventListener(`click`,()=>_(f,!0));for(let t of[`key-cancel`,`key-close`,`key-create`])e(s,t).addEventListener(`click`,()=>_(f,!1));for(let t of[`service-cancel`,`service-close`])e(s,t).addEventListener(`click`,()=>{_(f,!1),_(d,!1)})}export{s as mount};