import{n as e}from"./parts.C-YLuC7Q.js";var t=`The harbour road stays shut until the tide falls, so every ferry this week leaves from the north pier instead. Crews expect to reopen the lower lane on Thursday morning, and the timetable posted at the terminal already carries the change.`;function n(n){let r=(e,n=!1)=>`
    <div class="sp-stack" style="gap: 3px">
      <span class="sp-label sp-context">${e} characters</span>
      <p class="sp-prose" data-part="col-${e}" data-cpl="${e}"${n?` data-ideal data-subject`:``}
         style="font-size: 10px; --sp-measure: ${e}ch; margin: 0">${t}</p>
    </div>
  `;n.innerHTML=`
    <div class="sp-app" data-loop="keep">
      <div class="sp-window" data-part="page" style="font-size: 10px; padding: 16px 15px; width: calc(95ch + 30px)">
        <div class="sp-stack" style="gap: 14px">
          <div class="sp-context">${r(45)}</div>
          ${r(66,!0)}
          <div class="sp-context">${r(95)}</div>
        </div>
      </div>
    </div>
  `;let i=t=>e(n,`col-${t}`).getBoundingClientRect().width;i(45)<i(66)&&i(66)<i(95)&&(e(n,`page`).dataset.ordered=``)}export{n as mount};