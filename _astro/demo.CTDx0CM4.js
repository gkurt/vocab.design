import{n as e}from"./parts.C-YLuC7Q.js";var t=`Not provided`,n=[{key:`name`,question:`Name`,answer:`Ada Mbeki`},{key:`vehicle`,question:`Vehicle`,answer:`Blue van, KP19 TRX`},{key:`address`,question:`Address`,answer:`4 Mill Lane`},{key:`contact`,question:`Contact`,answer:t}];function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 320px; height: 278px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Permit application</span><span class="sp-label">Last step</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">

          <div data-part="stage" style="flex: 0 0 auto; height: 168px">
            <section data-part="summary" style="height: 100%">
              <span class="sp-heading sp-context" style="display: block; font-size: 14px; margin-bottom: 4px">Check your answers</span>
              <ul class="sp-list" data-part="answers" data-subject data-pose=":not([data-sent])">${n.map(({key:e,question:t,answer:n})=>`
      <li class="sp-row" data-part="row-${e}" data-value="${n}" style="gap: 8px; padding: 7px 0; border-top: 1px solid var(--sp-line)">
        <span class="sp-label" style="flex: 0 0 74px">${t}</span>
        <span class="sp-text sp-text--ink sp-grow" data-part="value-${e}" style="min-width: 0; font-size: 12px">${n}</span>
        <button class="sp-button sp-button--quiet sp-button--sm" data-part="change-${e}" type="button"
                style="padding: 2px 4px; font-size: 12px; color: var(--sp-accent); text-decoration: underline">
          Change<span class="sp-visually-hidden"> ${t.toLowerCase()}</span>
        </button>
      </li>`).join(``)}</ul>
            </section>

            <section data-part="edit" data-question="" hidden style="display: flex; flex-direction: column; gap: 8px; height: 100%">
              <span class="sp-heading" data-part="edit-title" style="font-size: 14px">Address</span>
              <span class="sp-text sp-context">One question, the one you came back for.</span>
              <input class="sp-input" data-part="edit-field" type="text" spellcheck="false" aria-label="Answer" />
              <div class="sp-row" style="gap: 8px; margin-top: auto">
                <button class="sp-button sp-button--sm" data-part="save" type="button">Save and continue</button>
                <button class="sp-button sp-button--ghost sp-button--sm" data-part="cancel" type="button">Cancel</button>
              </div>
            </section>
          </div>

          <div class="sp-row sp-row--between sp-context" style="flex: 0 0 auto">
            <span class="sp-label" data-part="status" role="status">Not sent yet</span>
            <button class="sp-button sp-button--sm" data-part="submit" type="button">Accept and send</button>
          </div>

        </div>
      </div>
    </div>
  `;let i=e(r,`summary`),a=e(r,`edit`),o=e(r,`answers`),s=e(r,`edit-title`),c=e(r,`edit-field`),l=e(r,`status`),u=e(r,`submit`),d=()=>o.hasAttribute(`data-sent`),f=e=>{i.hidden=e===`edit`,a.hidden=e===`summary`};for(let{key:i,question:o}of n)e(r,`change-${i}`).addEventListener(`click`,()=>{if(d())return;let n=e(r,`row-${i}`).dataset.value??``;a.dataset.question=i,s.textContent=o,c.value=n===t?``:n,c.setAttribute(`aria-label`,o),f(`edit`)});e(r,`save`).addEventListener(`click`,()=>{let n=a.dataset.question;if(!n)return;let i=c.value.trim()||t;e(r,`row-${n}`).dataset.value=i,e(r,`value-${n}`).textContent=i,f(`summary`)}),e(r,`cancel`).addEventListener(`click`,()=>f(`summary`)),u.addEventListener(`click`,()=>{if(!d()){o.setAttribute(`data-sent`,``);for(let{key:t}of n)e(r,`change-${t}`).setAttribute(`aria-disabled`,`true`);u.setAttribute(`aria-disabled`,`true`),l.textContent=`Sent. Reference PM-4471`}})}export{r as mount};