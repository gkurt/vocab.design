import{n as e}from"./parts.C-YLuC7Q.js";var t=1100,n=`Publish`,r=`Publishing…`,i={idle:`Draft, not published yet`,working:`Sending 4 changes`,done:`Published to the changelog`,scheduled:`Scheduled for Monday, 9:00`};function a(a,o){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 348px">
        <div class="sp-context">
          <div class="sp-heading">Release notes</div>
          <div class="sp-text" style="margin-top: 4px">4 changes since the last publish</div>
        </div>
        <div class="sp-row" style="margin-top: 16px">
          <button class="sp-button" type="button" data-part="publish" data-state="idle" data-subject>${n}</button>
          <span class="sp-row sp-context">
            <button class="sp-button sp-button--ghost" type="button" data-part="schedule">Schedule</button>
            <button class="sp-button sp-button--quiet" type="button" data-part="discard">Discard</button>
          </span>
        </div>
        <div class="sp-context" data-part="result-slot" style="margin-top: 14px">
          <span class="sp-text" data-part="result" data-state="idle" role="status">${i.idle}</span>
        </div>
      </div>
    </div>
  `;let s=e(a,`publish`),c=e(a,`result-slot`),l=e(a,`result`),u=0;for(let e of[n,r])s.textContent=e,u=Math.max(u,s.offsetWidth);s.style.minWidth=`${u}px`,s.textContent=n;let d=0;for(let e of Object.values(i))l.textContent=e,d=Math.max(d,c.offsetHeight);c.style.height=`${d}px`,l.textContent=i.idle;let f=e=>{l.dataset.state=e,l.textContent=i[e],l.className=e===`working`?`sp-text sp-pending`:`sp-text`},p=!1,m;s.addEventListener(`click`,()=>{p||(p=!0,s.dataset.state=`busy`,s.setAttribute(`aria-busy`,`true`),s.textContent=r,f(`working`),o.clearTimeout(m),m=o.setTimeout(()=>{p=!1,s.dataset.state=`idle`,s.removeAttribute(`aria-busy`),s.textContent=n,f(`done`)},t))}),e(a,`schedule`).addEventListener(`click`,()=>{p||f(`scheduled`)}),e(a,`discard`).addEventListener(`click`,()=>{p||f(`idle`)})}export{a as mount};