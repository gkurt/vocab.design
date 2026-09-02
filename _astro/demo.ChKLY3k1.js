import{n as e,t}from"./parts.C-YLuC7Q.js";var n=1e3,r=300,i=35,a=60,o=e=>`${Math.floor(e/60)}:${String(e%60).padStart(2,`0`)}`;function s(s,c){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 236px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 14px">Membership application</span>
          <span class="sp-label">Session</span>
          <span class="sp-text sp-text--ink" data-part="session" data-zone="ok"
                style="font-size: 13px; font-variant-numeric: tabular-nums">${o(r)}</span>
        </div>

        <div class="sp-body sp-context">
          <div data-part="form-view">
            <div class="sp-field">
              <label class="sp-label" for="vd-tw-why">Why are you applying?</label>
              <textarea class="sp-input" id="vd-tw-why" rows="3" spellcheck="false"
                        style="height: 92px; resize: none; line-height: 1.5">I have worked the harbour road since</textarea>
            </div>
            <p class="sp-text" style="margin: 8px 0 0; font-size: 11px">Page 3 of 4. Nothing on this page is saved yet.</p>
          </div>
          <div class="sp-empty" data-part="ended-view" hidden>
            <span class="sp-text sp-text--ink">Signed out. Your answers were not kept.</span>
          </div>
        </div>

        <div class="sp-scrim" data-part="scrim"></div>
        <div class="sp-dialog" data-part="dialog" data-subject role="alertdialog" aria-modal="true"
             aria-labelledby="vd-tw-title" style="width: 322px">
          <div class="sp-heading" id="vd-tw-title">Still there?</div>
          <p class="sp-text" style="margin: 6px 0 0">
            You will be signed out in
            <span class="sp-text--ink" data-part="dialog-clock"
                  style="font-weight: 600; font-variant-numeric: tabular-nums">${o(i)}</span>,
            and this page of your application is not saved yet.
          </p>
          <div class="sp-row" style="margin-top: 14px; gap: 8px; justify-content: flex-end">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="sign-out">Sign out now</button>
            <button class="sp-button sp-button--sm" type="button" data-part="extend">Keep me signed in</button>
          </div>
        </div>
      </div>

      <div class="sp-row sp-context" style="gap: 10px">
        <span class="sp-label">Instrument</span>
        <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="skip">Skip four idle minutes</button>
      </div>
    </div>
  `;let l=e(s,`session`),u=e(s,`dialog-clock`),d=e(s,`dialog`),f=e(s,`scrim`),p=r,m=!1,h=()=>{l.textContent=o(p),l.dataset.zone=p<=a?`warn`:`ok`,u.textContent=o(p);let e=!m&&p<=a&&p>0;t(d,`data-open`,e),t(f,`data-open`,e)},g=()=>{m=!0,p=0,e(s,`form-view`).hidden=!0,e(s,`ended-view`).hidden=!1,h()},_=()=>{if(!m){if(p=Math.max(0,p-1),h(),p===0)return g();c.setTimeout(_,n)}};c.setTimeout(_,n),e(s,`skip`).addEventListener(`click`,()=>{m||(p=i,h())}),e(s,`extend`).addEventListener(`click`,()=>{m||(p=r,h())}),e(s,`sign-out`).addEventListener(`click`,g)}export{s as mount};