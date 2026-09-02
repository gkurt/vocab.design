import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n={none:`The ask arrives on a good day, seconds after something the reader wanted actually worked.`,happy:`The happy answer is handed straight to the store, where the rating counts towards the listing.`,meh:`The unhappy answer is routed to a private form instead, so the public average never hears it. Both major app stores forbid exactly this.`},r=`${t(`star`,`sp-icon--filled`)}${t(`star`,`sp-icon--filled`)}${t(`star`,`sp-icon--filled`)}${t(`star`,`sp-icon--filled`)}${t(`star`,`sp-icon--filled`)}`;function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 270px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Trailhead</span><span class="sp-text">Saved</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface sp-row sp-context" style="gap: 8px; padding: 7px 10px">
            ${t(`check`)}
            <span class="sp-text sp-text--ink sp-grow">Coast path saved to your trips</span>
            <span class="sp-text">5th this month</span>
          </div>
          <div
            class="sp-surface"
            data-part="prompt"
            data-subject
            data-answer="none"
            style="display: flex; flex-direction: column; height: 154px; padding: 12px 14px; background: var(--sp-surface)"
          >
            <span class="sp-heading" style="font-size: 14px">Enjoying Trailhead?</span>
            <span class="sp-text" style="margin-top: 3px; font-size: 11px">You have saved five routes this month.</span>
            <div class="sp-row" style="gap: 8px; margin-top: 10px">
              <button class="sp-button sp-button--sm" data-part="answer-happy" type="button" style="flex: 0 0 auto; white-space: nowrap">Loving it</button>
              <button class="sp-button sp-button--ghost sp-button--sm" data-part="answer-meh" type="button" style="flex: 0 0 auto; white-space: nowrap">Not really</button>
            </div>
            <div style="position: relative; flex: 0 0 auto; height: 44px; margin-top: 11px; border-top: 1px solid var(--sp-line)">
              <div class="sp-row" data-part="route-store" hidden style="position: absolute; inset: 8px 0 auto 0; gap: 8px">
                <span class="sp-chip" style="flex: 0 0 auto; white-space: nowrap">App Store</span>
                <span class="sp-row" style="gap: 1px; color: var(--sp-accent)">${r}</span>
                <span class="sp-text" style="font-size: 11px">Public review sheet</span>
              </div>
              <div class="sp-row" data-part="route-private" hidden style="position: absolute; inset: 8px 0 auto 0; gap: 8px">
                <span class="sp-chip" style="flex: 0 0 auto; white-space: nowrap">Private form</span>
                <span class="sp-text" style="font-size: 11px">Sent to the team. The store never hears it.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sp-context" data-stage-verdict data-part="verdict" style="width: 440px; height: 30px; color: var(--sp-muted); font-size: 11px; line-height: 1.35">${n.none}</div>
    </div>
  `;let a=e(i,`prompt`),o=e(i,`verdict`),s=e(i,`route-store`),c=e(i,`route-private`),l=e=>{a.dataset.answer=e,s.hidden=e!==`happy`,c.hidden=e!==`meh`,o.textContent=n[e]};e(i,`answer-happy`).addEventListener(`click`,()=>l(`happy`)),e(i,`answer-meh`).addEventListener(`click`,()=>l(`meh`))}export{i as mount};