import{n as e,t}from"./parts.C-YLuC7Q.js";var n=3,r=[`The harbour that outlived its fleet`,`What the tide gauges have been saying`,`A ferry timetable, read as history`,`The last chandlery on the quay`],i={counting:`The count is public before it matters, so the reader knows a limit exists while they still have room in it.`,spent:`The allowance is gone and the wall says so, with the headline and the opening lines still readable behind it.`};function a(a){let o=[`96%`,`88%`,`93%`,`79%`,`90%`,`84%`].map(e=>`<span class="sp-line" style="width: ${e}"></span>`).join(``);a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 264px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">The Kestrel Review</span>
          <span class="sp-label" style="font-size: 11px">Sign in</span>
        </div>
        <div class="sp-body" style="position: relative; display: flex; flex-direction: column; gap: 10px; padding: 12px">

          <div
            class="sp-surface sp-row"
            data-part="meter"
            data-subject
            data-left="2"
            role="status"
            style="flex: 0 0 auto; gap: 10px; height: 34px; padding: 0 10px"
          >
            <span class="sp-text sp-text--ink sp-grow" data-part="meter-count" style="min-width: 0; font-size: 12px">
              2 of ${n} free articles left this month
            </span>
            <div class="sp-progress sp-progress--meter" data-part="meter-bar" data-zone="ok" style="width: 74px; --sp-value: 33%">
              <div class="sp-progress-fill"></div>
            </div>
          </div>

          <div class="sp-context sp-stack" style="flex: 1 1 auto; min-height: 0; gap: 8px">
            <span class="sp-heading" data-part="headline" style="font-size: 14px">${r[0]}</span>
            <div class="sp-stack" style="gap: 7px">${o}</div>
          </div>

          <div class="sp-row sp-row--between sp-context" style="flex: 0 0 auto; height: 30px">
            <span class="sp-label" style="font-size: 11px">Resets 1 March</span>
            <button class="sp-button sp-button--sm" data-part="read-next" type="button">Read next article</button>
          </div>

          <div
            data-part="wall"
            style="position: absolute; left: 0; right: 0; top: 88px; bottom: 0; display: flex; flex-direction: column;
                   opacity: 0; visibility: hidden; transition: opacity 0.24s, visibility 0.24s"
          >
            <span style="flex: 0 0 auto; height: 26px; background: linear-gradient(to bottom, rgb(0 0 0 / 0), var(--sp-sunken))"></span>
            <div
              class="sp-stack"
              style="flex: 1 1 auto; align-items: center; justify-content: center; gap: 5px; padding: 0 14px 10px; background: var(--sp-sunken); text-align: center"
            >
              <span class="sp-heading" data-part="wall-title" style="font-size: 13px">That was your third free article</span>
              <span class="sp-text" style="font-size: 11px; max-width: 300px">
                The meter resets on 1 March. Until then, a subscription is 4.00 a month.
              </span>
              <button class="sp-button sp-button--sm" data-part="subscribe" type="button" style="margin-top: 2px">Subscribe</button>
            </div>
          </div>

        </div>
      </div>
      <div class="sp-row sp-context" style="gap: 12px">
        <span class="sp-text" data-stage-verdict data-part="note" style="width: 330px; font-size: 11px">${i.counting}</span>
        <button class="sp-button sp-button--ghost sp-button--sm" data-part="reset" type="button">Reset the meter</button>
      </div>
    </div>
  `;let s=e(a,`meter`),c=e(a,`meter-count`),l=e(a,`meter-bar`),u=e(a,`headline`),d=e(a,`wall`),f=e(a,`read-next`),p=e(a,`note`),m=0,h=()=>{let e=m>=n,a=Math.max(0,2-m);s.dataset.left=String(a),c.textContent=a===0?`0 of ${n} free articles left. Resets 1 March.`:`${a} of ${n} free articles left this month`,l.dataset.zone=a<=1?`warn`:`ok`,l.style.setProperty(`--sp-value`,`${Math.round((n-a)/n*100)}%`),u.textContent=r[Math.min(m,r.length-1)]??r[0],t(d,`data-open`,e),d.style.opacity=e?`1`:`0`,d.style.visibility=e?`visible`:`hidden`,f.setAttribute(`aria-disabled`,String(e)),p.textContent=e?i.spent:i.counting};f.addEventListener(`click`,()=>{m>=n||(m+=1,h())}),e(a,`reset`).addEventListener(`click`,()=>{m=0,h()}),h()}export{a as mount};