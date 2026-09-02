import{r as e}from"./touch.Bg97t8LB.js";import{n as t}from"./parts.C-YLuC7Q.js";function n(n,r){n.innerHTML=`
    <div style="display: grid; gap: 10px; width: 420px; margin: 0 auto">
      <div class="sp-frame sp-frame--wide" data-touch style="display: grid; gap: 12px; padding: 16px; place-items: center">
        <div class="sp-text sp-text--quiet" style="font-size: 12px">Incoming call</div>
        <div class="sp-text sp-text--ink" style="font-size: 17px; font-weight: 600" data-part="who">Priya Raman</div>
        <div class="sp-text sp-text--quiet" data-part="surface" style="font-size: 11px; text-align: center; max-width: 260px">
          mobile, +44 7700 900312
        </div>
        <div class="sp-row" style="gap: 10px">
          <button class="sp-button sp-button--sm" type="button" data-part="answer">Answer</button>
          <button class="sp-button sp-button--sm sp-button--quiet" type="button" data-part="decline">Decline</button>
        </div>
      </div>
              <p class="sp-text sp-text--ink" data-stage-announce data-part="spoken" data-subject data-state="idle" style="margin: 0; min-height: 17px; font-size: 13px">“Incoming call from Priya Raman”</p>
      
    </div>`;let i=t(n,`spoken`),a=t(n,`who`),o=t(n,`answer`),s=t(n,`decline`),c=!1,l=(e,t)=>{i.textContent=`“${e}”`,i.dataset.state=t},u=()=>{c=!0,a.textContent=`Priya Raman · connected`,o.textContent=`Hang up`,s.disabled=!0,l(`Answered. Call connected`,`answered`)},d=()=>{c=!1,a.textContent=`Call ended`,o.textContent=`Answer`,o.disabled=!0,l(`Call ended`,`ended`)},f=()=>c?d():u();o.addEventListener(`click`,f),e(t(n,`surface`).parentElement,r,{onTap:e=>{if(e===1)return l(`Two fingers down`,`waiting`);e===2&&f()}})}export{n as mount};