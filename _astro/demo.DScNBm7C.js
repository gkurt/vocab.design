import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=1400;function i(i,a){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" data-subject style="width: 300px">
        <div class="sp-row">
          <span class="sp-avatar">AM</span>
          <span class="sp-grow">
            <span class="sp-heading">Ada M.</span>
            <p class="sp-text">Pushed the new colour ramp</p>
          </span>
        </div>
        <div class="sp-row" style="margin-top: 14px">
          <button class="sp-button sp-button--ghost sp-button--sm sp-row" data-part="like" aria-pressed="false">
            ${n(`heart`)} <span data-part="count">18</span>
          </button>
          <span class="sp-text" data-part="status" data-state="idle">Not liked yet</span>
        </div>
      </div>
      <!-- Instrumentation, not the pattern: the term is what the window does. -->
      <label class="sp-row sp-text sp-context" style="gap: 6px">
        <input type="checkbox" data-part="fail" />
        Make the next request fail
      </label>
    </div>
  `;let o=e(i,`like`),s=e(i,`count`),c=e(i,`status`),l=e(i,`fail`),u=!1,d=18,f,p=(e,t)=>{c.dataset.state=e,c.textContent=t,c.className=e===`pending`?`sp-text sp-pending`:`sp-text`};o.addEventListener(`click`,()=>{a.clearTimeout(f);let e=!u;u=e,d+=e?1:-1,s.textContent=String(d),o.setAttribute(`aria-pressed`,String(e)),t(o,`data-selected`,e),p(`pending`,`Sending…`);let n=l.checked;f=a.setTimeout(()=>{if(!n){p(`saved`,`Saved`);return}u=!e,d+=e?-1:1,s.textContent=String(d),o.setAttribute(`aria-pressed`,String(u)),t(o,`data-selected`,u),l.checked=!1,p(`reverted`,`Could not save, put back`)},r)})}export{i as mount};