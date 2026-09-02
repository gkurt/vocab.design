import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import{r as n}from"./measure.DK7AY2_i.js";var r={w:200,h:210},i=18,a=16,o=70,s=`repeating-linear-gradient(45deg, var(--sp-line) 0 4px, transparent 4px 9px)`,c=(e,t,n)=>`
  <span
    data-part="${e}"
    style="position: absolute; left: ${t-4}px; top: ${n-4}px; width: 8px; height: 8px; border-radius: 50%; background: var(--sp-ink); opacity: 0.6"
  ></span>`;function l(l){l.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 296px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Reader</span>
          <span class="sp-text" data-part="readout" style="width: 244px; text-align: right; white-space: nowrap">Article open</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; gap: 14px">
          <div
            class="sp-context"
            data-part="phone"
            data-history="article"
            data-outcome="none"
            style="flex: 0 0 auto; padding: 8px; background: var(--sp-ink); border-radius: 26px"
          >
            <div
              data-touch
              style="position: relative; width: ${r.w}px; height: ${r.h}px; background: var(--sp-sunken); border-radius: 19px; overflow: hidden; touch-action: none; user-select: none"
            >
              <div style="position: absolute; inset: 0; padding: 24px 12px 12px 26px">
                <span class="sp-heading" style="font-size: 13px">Inbox</span>
                <div class="sp-stack" style="margin-top: 10px; gap: 8px">
                  <div class="sp-line" style="width: 84%"></div>
                  <div class="sp-line" style="width: 66%"></div>
                  <div class="sp-line" style="width: 74%"></div>
                </div>
              </div>

              <div
                data-part="screen"
                style="position: absolute; inset: 0; padding: 24px 12px 12px 26px; background: var(--sp-surface); box-shadow: -8px 0 16px rgb(16 24 40 / 0.22); transform: translateX(0px)"
              >
                <div class="sp-row" style="gap: 4px; color: var(--sp-muted)">
                  ${t(`chevronLeft`)}
                  <span class="sp-text sp-text--ink" style="font-size: 13px">Ferry timetable</span>
                </div>
                <div class="sp-stack" style="margin-top: 10px; gap: 8px">
                  <div class="sp-line" style="width: 92%"></div>
                  <div class="sp-line" style="width: 78%"></div>
                  <div class="sp-line" style="width: 88%"></div>
                  <div class="sp-line" style="width: 54%"></div>
                </div>
              </div>

              <span
                data-part="threshold"
                style="position: absolute; left: ${o}px; top: ${a}px; bottom: 0; width: 0; border-left: 1px dashed var(--sp-muted); z-index: 3; pointer-events: none"
              ><span class="sp-label" style="position: absolute; left: 3px; bottom: 2px; font-size: 10px; white-space: nowrap">${o} px</span></span>

              <span
                data-part="top-zone"
                style="position: absolute; left: 0; right: 0; top: 0; height: ${a}px; z-index: 4; background: ${s}; pointer-events: none"
              ><span class="sp-label" style="position: absolute; right: 6px; top: -1px; font-size: 10px">shade</span></span>

              <span
                data-part="edge-zone"
                data-subject
                style="position: absolute; left: 0; top: 0; bottom: 0; width: ${i}px; z-index: 5; display: flex; align-items: center; justify-content: center; background: ${s}; border-right: 1px dashed var(--sp-muted)"
              >
                <span class="sp-label" style="writing-mode: vertical-rl; font-size: 10px; letter-spacing: 0.4px">back</span>
                ${c(`edge-dot`,i/2,r.h/2+20)}
              </span>

              <span class="sp-context" style="position: absolute; inset: 0; z-index: 6; pointer-events: none">
                ${c(`short-dot`,48,r.h/2+20)}
                ${c(`far-dot`,168,r.h/2+20)}
                ${c(`inside-dot`,96,62)}
                ${c(`inside-end`,176,62)}
              </span>
            </div>
          </div>

          <div class="sp-stack sp-context" style="width: 178px; gap: 8px">
            <span class="sp-label" data-part="travel" style="font-variant-numeric: tabular-nums">0 px in, ${o} px commits</span>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="reopen">Reopen the article</button>
          </div>
        </div>
      </div>
    </div>
  `;let u=e(l,`phone`),d=e(l,`screen`),f=e(l,`readout`),p=e(l,`travel`),m=e(l,`edge-zone`),h,g=0,_=(e,t)=>{u.dataset.outcome=e,f.textContent=t},v=(e,t)=>{g=Math.max(0,Math.min(r.w,e)),d.style.transition=t?`transform 0.28s var(--sp-ease)`:`none`,d.style.transform=`translateX(${g}px)`,p.textContent=`${Math.round(g)} px in, ${o} px commits`},y=e=>{u.dataset.history=e,v(e===`article`?0:r.w,!0)};l.addEventListener(`pointerdown`,e=>{if(!u.contains(e.target))return;let t=n(e,m).x;if(t>i)return h=void 0,_(`inside`,`Started ${Math.round(t)} px in: the page keeps it`);if(u.dataset.history!==`article`)return _(`none`,`Nothing left to go back to`);e.isTrusted&&u.setPointerCapture(e.pointerId),h=n(e,m).x,_(`peeling`,`Peeling the screen back`)}),l.addEventListener(`pointermove`,e=>{h!==void 0&&(v(n(e,m).x-h,!1),_(`peeling`,`Peeled ${Math.round(g)} px of ${o}`))});let b=()=>{if(h===void 0)return;h=void 0;let e=Math.round(g);if(e>=o)return y(`inbox`),_(`committed`,`Past ${o} px: went back to Inbox`);v(0,!0),_(`cancelled`,`Let go at ${e} px: snapped back`)};l.addEventListener(`pointerup`,b),l.addEventListener(`pointercancel`,b),e(l,`reopen`).addEventListener(`click`,()=>{y(`article`),_(`none`,`Article pushed back on top`)})}export{l as mount};