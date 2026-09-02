import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n=480,r=`Star`,i=`toggle button`,a=`not pressed`,o=`Starred mail is kept for a year`,s={low:{utterance:`“${r}”`,caption:`Name only. The role, the state and the description are all switched off, and the reader gets the one word that cannot be dropped.`},medium:{utterance:`“${r}, ${i}, ${a}”`,caption:`Role and state come back. This is where most practised users sit: enough to operate the control, nothing more.`},high:{utterance:`“${r}, ${i}, ${a}. ${o}.”`,caption:`Everything, description included. A hint that only shows up here is a hint most readers have already turned off.`}};function c(i,a){let c=(e,t)=>`
    <button class="sp-segment" type="button" data-part="seg-${e}" value="${e}"
            style="padding: 4px 12px; font-size: 11.5px">${t}</button>`;i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="level" data-axis="Verbosity" data-value="high">
            ${c(`low`,`Low`)}
            ${c(`medium`,`Medium`)}
            ${c(`high`,`High`)}
          </sp-segmented>
        </div>

        <div class="sp-surface sp-context" style="margin-top: 10px; padding: 4px 6px">
          <div class="sp-list-item" data-part="row" style="gap: 8px">
            <button class="sp-icon-button" type="button" data-part="star" data-sim-focus
                    aria-pressed="false" aria-label="${r}" aria-describedby="verbosity-hint"
                    style="flex: 0 0 auto">${t(`star`)}</button>
            <span class="sp-grow" style="font-size: 12.5px">Roof survey, Tuesday</span>
            <span class="sp-label" style="flex: 0 0 auto; font-size: 10.5px">09:12</span>
          </div>
          <p class="sp-label" id="verbosity-hint"
             style="margin: 0 0 4px 40px; font-size: 10px">${o}</p>
        </div>
          <p class="sp-text sp-text--ink" data-stage-announce data-part="utterance" data-subject data-identify="[data-level=high]" data-level="high" data-state="spoken"
             style="margin: 4px 0 0; height: 32px; display: flex; align-items: center;
                    font-size: 11.5px; line-height: 1.35">${s.high.utterance}</p>
        

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-level="high"
           style="margin: 8px 0 0; height: 32px; font-size: 11px; line-height: 1.35">${s.high.caption}</p>
      </div>
    </div>
  `;let l=e(i,`utterance`),u=e(i,`caption`),d,f=e=>{let t=s[e];a.clearTimeout(d),l.dataset.state=`queued`,d=a.setTimeout(()=>{l.dataset.level=e,l.dataset.state=`spoken`,l.textContent=t.utterance,u.dataset.level=e,u.textContent=t.caption},n)};e(i,`level`).addEventListener(`change`,e=>{f(e.detail)})}export{c as mount};