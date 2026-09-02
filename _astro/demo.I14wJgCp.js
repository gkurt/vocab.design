import{n as e,r as t}from"./parts.C-YLuC7Q.js";var n=`Alerts arrive the moment they are sent`,r=`Alerts are held until 8:00 AM`,i=[`Ada commented on Q3 plan`,`Build 412 finished`];function a(a){let o=i.map(e=>`
      <li class="sp-list-item">
        <span class="sp-grow">${e}</span>
        <span class="sp-text" data-part="when" style="width: 58px; text-align: right">now</span>
      </li>`).join(``);a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="height: 250px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Notifications</span></div>
        <div class="sp-body sp-stack" style="gap: 12px">
          <div class="sp-surface" style="padding: 10px 12px">
            <div class="sp-row sp-row--between">
              <span class="sp-text sp-text--ink" id="vd-switch-label">Do not disturb</span>
              <button
                class="sp-switch"
                type="button"
                role="switch"
                aria-checked="false"
                aria-labelledby="vd-switch-label"
                data-part="switch"
                data-subject
              ></button>
            </div>
            <div data-part="status-slot" style="margin-top: 6px">
              <span class="sp-text" data-part="status" role="status">${n}</span>
            </div>
          </div>
          <div class="sp-context sp-stack" style="gap: 6px">
            <div class="sp-row">
              <span class="sp-label sp-grow">Queue</span>
              <span class="sp-label" data-part="held-count" hidden>${i.length} held</span>
            </div>
            <ul class="sp-list sp-surface">${o}</ul>
          </div>
        </div>
      </div>
    </div>
  `;let s=e(a,`switch`),c=e(a,`status-slot`),l=e(a,`status`),u=e(a,`held-count`),d=t(a,`when`),f=0;for(let e of[n,r])l.textContent=e,f=Math.max(f,c.offsetHeight);l.textContent=n,c.style.height=`${f}px`;let p=e=>{s.setAttribute(`aria-checked`,String(e)),l.textContent=e?r:n;for(let t of d)t.textContent=e?`8:00 AM`:`now`;u.hidden=!e};s.addEventListener(`click`,()=>p(s.getAttribute(`aria-checked`)!==`true`))}export{a as mount};