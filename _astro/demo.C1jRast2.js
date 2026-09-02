import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{t as n}from"./motion.B5_YXmsy.js";var r={w:226,h:172},i=1600,a=[{title:`Highlights of the collection`,line:`Twelve rooms, six centuries`,art:[24,44,32,52,38]},{title:`Plan your visit`,line:`Opening times, tickets and maps`,art:[50,28,42,22,46]},{title:`Today at three`,line:`A gallery talk in the Long Room`,art:[36,54,20,48,30]}],o=[`Collection`,`Visit`,`What is on`];function s(s,c){let l=a[0];s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 290px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Kiosk</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-axis="Attendance" data-term="idle" data-value="idle">
            <button class="sp-segment" type="button" data-part="seg-attended" value="attended">Attended</button>
            <button class="sp-segment" type="button" data-part="seg-idle" value="idle">Nobody there</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; gap: 14px; padding: 12px">
          <div
            data-part="bezel"
            style="flex: 0 0 auto; padding: 10px 10px 24px; background: var(--sp-ink); border-radius: 12px"
          >
            <div
              data-part="screen" data-subject data-pose="[data-mode=attracting]" data-mode="attracting"
              style="position: relative; width: ${r.w}px; height: ${r.h}px; padding: 12px;
                     background: var(--sp-surface); border-radius: 5px; overflow: hidden; cursor: pointer;
                     user-select: none"
            >
              <div
                data-part="attract-layer"
                style="position: absolute; inset: 0; padding: 12px; display: flex; flex-direction: column; gap: 6px"
              >
                <div data-part="art" style="display: flex; align-items: flex-end; justify-content: center; gap: 8px; height: 54px">
                  ${l.art.map((e,t)=>`
                    <span
                      data-part="col-${t+1}"
                      style="flex: 0 0 auto; width: 32px; height: ${e}px; border-radius: 3px 3px 0 0;
                             background: var(--sp-accent); opacity: ${.55+t*.09}; transition: height 0.4s var(--sp-ease)"
                    ></span>`).join(``)}
                </div>
                <span class="sp-heading" data-part="frame-title" style="font-size: 13px">${l.title}</span>
                <span class="sp-text" data-part="frame-line" style="font-size: 12px">${l.line}</span>
                <div class="sp-row" data-part="dots" style="margin-top: auto; justify-content: center; gap: 6px">
                  <span data-part="dot-1" data-current style="width: 7px; height: 7px; border-radius: 50%; background: var(--sp-accent)"></span>
                  <span data-part="dot-2" style="width: 7px; height: 7px; border-radius: 50%; background: var(--sp-line)"></span>
                  <span data-part="dot-3" style="width: 7px; height: 7px; border-radius: 50%; background: var(--sp-line)"></span>
                </div>
                <span class="sp-label" style="text-align: center; font-size: 11px">Touch anywhere to begin</span>
              </div>

              <div
                data-part="ready-layer" hidden
                style="position: absolute; inset: 0; padding: 12px; display: flex; flex-direction: column; gap: 6px"
              >
                <span class="sp-heading" style="font-size: 13px">Riverside Museum</span>
                <div class="sp-stack" style="gap: 5px">
                  ${o.map(e=>`<button class="sp-button sp-button--ghost sp-button--sm" type="button" style="justify-content: flex-start; text-align: left">${e}</button>`).join(``)}
                </div>
                <span class="sp-label" style="margin-top: auto; font-size: 11px">Ready. Choose a topic.</span>
              </div>
            </div>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 auto; gap: 6px; min-width: 0">
            <span class="sp-label" style="font-size: 11px">Screen</span>
            <span class="sp-text--ink" data-part="state" style="font-size: 18px; font-weight: 600; line-height: 1.2">Attracting</span>
            <span class="sp-label" data-part="plays" style="font-size: 11px">Reel playing, round 1</span>
            <span class="sp-divider" style="margin: 4px 0"></span>
            <span class="sp-text" data-stage-verdict data-part="note" style="height: 90px; font-size: 11px; line-height: 1.45">Nobody is at the kiosk, so it is showing the collection to an empty room.</span>
          </div>
        </div>
      </div>
    </div>
  `;let u=e(s,`screen`),d=e(s,`attract-layer`),f=e(s,`ready-layer`),p=e(s,`frame-title`),m=e(s,`frame-line`),h=e(s,`state`),g=e(s,`plays`),_=e(s,`note`),v=e(s,`mode`),y=[1,2,3,4,5].map(t=>e(s,`col-${t}`)),b=[1,2,3].map(t=>e(s,`dot-${t}`)),x=n(s),S=0,C=1,w,T=()=>{let e=a[S];p.textContent=e.title,m.textContent=e.line,e.art.forEach((e,t)=>{let n=y[t];n&&(n.style.height=`${e}px`)}),b.forEach((e,n)=>{t(e,`data-current`,n===S),e.style.background=n===S?`var(--sp-accent)`:`var(--sp-line)`}),g.textContent=x?`Reel paused`:`Reel playing, round ${C}`},E=()=>{S=(S+1)%a.length,S===0&&(C+=1),T(),w=c.setTimeout(E,i)},D=()=>{c.clearTimeout(w),u.dataset.mode=`attracting`,d.hidden=!1,f.hidden=!0,h.textContent=`Attracting`,S=0,C=1,T(),_.textContent=`Nobody is at the kiosk, so it is showing the collection to an empty room.`,x||(w=c.setTimeout(E,i))},O=()=>{c.clearTimeout(w),w=void 0,u.dataset.mode=`ready`,d.hidden=!0,f.hidden=!1,h.textContent=`Ready`,g.textContent=`Reel stopped, nothing carried over`,_.textContent=`Somebody is here, and the reel left nothing behind for them to get out of.`};v.addEventListener(`change`,e=>{if(e.detail===`idle`)return D();O()}),u.addEventListener(`click`,()=>{v.value=`attended`,O()}),D()}export{s as mount};