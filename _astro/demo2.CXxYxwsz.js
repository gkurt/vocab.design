import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n={public:`Save: everyone`,follow:`Save: people you follow`,private:`Save: only you`},r={public:`Everyone, including search engines.`,follow:`The people you follow.`,private:`Only you.`};function i(i){let a=(e,t,n,r=``)=>`
    <div
      class="sp-option"
      data-part="${t}"
      data-choice="${e}"
      role="option"
      aria-selected="false"
      style="display: flex; align-items: center; gap: 6px; padding: 4px 8px; font-size: 12px; line-height: 15px"
    >
      <span style="flex: 0 0 auto">${n}</span>${r}
    </div>
  `;i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 460px; height: 282px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Loomly, account setup</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="steered" data-axis="Privacy zuckering" data-term="steered" style="flex: 0 0 auto">
            <button class="sp-segment" data-part="mode-steered" type="button" value="steered" style="padding: 4px 9px; font-size: 11.5px">With</button>
            <button class="sp-segment" data-part="mode-plain" type="button" value="plain" style="padding: 4px 9px; font-size: 11.5px">Without</button>
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; gap: 9px">
          <div
            class="sp-surface"
            data-part="choice"
            data-subject
            data-pose="[data-mode=steered]"
            data-mode="steered"
            style="flex: 0 0 auto; height: 162px; padding: 10px 11px; display: flex; flex-direction: column"
          >
            <span class="sp-heading" data-part="ask" style="flex: 0 0 auto; height: 18px; font-size: 12.5px">Who can see what you cook?</span>

            <div
              data-part="options"
              role="listbox"
              aria-label="Profile visibility"
              style="flex: 0 0 auto; height: 84px; margin-top: 6px; display: flex; flex-direction: column; gap: 3px"
            >
              ${a(`public`,`opt-public`,`Everyone, including search engines`,`<span class="sp-label" data-part="recommend" style="flex: 0 0 auto; font-size: 10.5px; color: var(--sp-accent)">Recommended</span>`)}
              ${a(`follow`,`opt-follow`,`People you follow`)}
              ${a(`private`,`opt-private`,`Only you`)}
              <button
                class="sp-button sp-button--quiet sp-button--sm"
                data-part="more"
                type="button"
                style="align-self: flex-start; display: inline-flex; align-items: center; gap: 4px; padding: 3px 6px; font-size: 11.5px; color: var(--sp-muted); white-space: nowrap"
              >More options${t(`chevronDown`)}</button>
            </div>

            <div class="sp-row" style="flex: 0 0 auto; gap: 8px; margin-top: auto">
              <button class="sp-button sp-button--sm" data-part="confirm" type="button" style="flex: 0 0 auto; white-space: nowrap">Continue</button>
              <span class="sp-text" data-part="fineprint" style="flex: 1 1 auto; font-size: 10.5px; line-height: 1.25">You can change this later in Settings, Privacy, Audience.</span>
            </div>
          </div>

          <div class="sp-surface sp-context" data-part="readout" data-state="pending" style="flex: 0 0 auto; height: 46px; padding: 7px 11px">
            <span class="sp-label" style="display: block; height: 15px; font-size: 10.5px">Profile visibility after this screen</span>
            <span class="sp-text sp-text--ink" data-part="result" style="display: block; height: 16px; font-size: 11.5px; line-height: 16px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">Nothing saved yet.</span>
          </div>
        </div>
      </div>
    </div>
  `;let o=e(i,`choice`),s=[[`public`,`opt-public`],[`follow`,`opt-follow`],[`private`,`opt-private`]].map(([t,n])=>({name:t,el:e(i,n)})),c=e(i,`more`),l=e(i,`recommend`),u=e(i,`confirm`),d=e(i,`readout`),f=e(i,`result`),p=`steered`,m=`public`,h=!1,g=()=>{o.dataset.mode=p;let e=p===`steered`&&!h;for(let{name:t,el:n}of s)n.setAttribute(`aria-selected`,String(t===m)),n.hidden=e&&t!==`public`,n.style.fontWeight=p===`steered`&&t===`public`?`600`:`400`;c.hidden=!e,l.hidden=p!==`steered`,u.textContent=p===`steered`?`Continue`:n[m]},_=()=>{d.dataset.state=`pending`,f.textContent=`Nothing saved yet.`};for(let{name:e,el:t}of s)t.addEventListener(`click`,()=>{m=e,g()});c.addEventListener(`click`,()=>{h=!0,g()}),u.addEventListener(`click`,()=>{d.dataset.state=m,f.textContent=r[m]}),e(i,`mode`).addEventListener(`change`,e=>{p=e.detail===`plain`?`plain`:`steered`,h=p===`plain`,m=p===`plain`?`private`:`public`,_(),g()}),g()}export{i as mount};