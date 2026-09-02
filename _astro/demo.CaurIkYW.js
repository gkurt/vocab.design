import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={trapped:[{title:`Account`,body:`Streamly Plus, 9.99 a month. Renews on the 14th.`,action:`Manage plan`},{title:`Before you go, take 20% off`,body:`Stay on Plus and pay 7.99 a month for the next three months.`,action:`No, cancel my plan`},{title:`Tell us why you are leaving`,body:`All six answers are required before you can continue.`,action:`Submit and continue`},{title:`Call us to finish`,body:`Cancellations are completed by phone, weekdays 9 to 5.`,action:null}],fair:[{title:`Cancel membership`,body:`Your membership ends at the close of the current period.`,action:`Cancel membership`},{title:`Membership cancelled`,body:`You have access until 14 October. A refund is on its way to your card.`,action:null}]},n={trapped:`One click in, four screens and a phone call out. The asymmetry is the pattern.`,fair:`The exit is the same size as the entrance, in the same place, on the same screen.`},r=(e,t)=>Array.from({length:e},(e,n)=>`<span style="flex: 1 1 0; height: 4px; border-radius: 999px; background: ${n<=t?`var(--sp-accent)`:`var(--sp-line)`}"></span>`).join(``);function i(e,n){let i=t[e],a=i[n],o=a.action?`<button class="sp-button" data-part="advance" type="button" style="width: 100%">${a.action}</button>`:`<span class="sp-text" style="width: 100%; font-size: 11px; text-align: center">Call 0800 555 0199</span>`;return`
    <div class="sp-row sp-row--between" style="height: 16px">
      <span class="sp-label" style="font-size: 11px">Screen ${n+1} of ${i.length}</span>
      <span class="sp-label" style="font-size: 11px">Cancelling</span>
    </div>
    <div class="sp-row" style="gap: 3px; height: 4px; margin-top: 8px">${r(i.length,n)}</div>
    <div class="sp-heading" style="height: 20px; margin-top: 8px; font-size: 13px">${a.title}</div>
    <div class="sp-text" style="height: 54px; margin-top: 4px; font-size: 12px">${a.body}</div>
    <div class="sp-row" style="height: 34px; margin-top: auto">${o}</div>`}function a(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Streamly</span><span class="sp-label">Account</span></div>
        <div class="sp-body sp-row" style="align-items: stretch; gap: 10px">

          <section class="sp-context" style="display: flex; flex-direction: column; gap: 7px; flex: 0 0 auto; width: 148px">
            <div class="sp-row" style="gap: 3px; height: 4px">
              <span style="flex: 1 1 0; height: 4px; border-radius: 999px; background: var(--sp-accent)"></span>
            </div>
            <div class="sp-surface" style="padding: 8px 10px">
              <div class="sp-heading" style="font-size: 13px">Streamly Plus</div>
              <div class="sp-text" style="font-size: 12px">9.99 a month</div>
            </div>
            <button class="sp-button" data-part="join" type="button" style="width: 100%">Start membership</button>
            <span class="sp-text" style="font-size: 11px">One click, saved card.</span>
          </section>

          <div style="display: flex; flex-direction: column; gap: 7px; flex: 1 1 auto; min-width: 0">
            <section
              class="sp-surface"
              data-part="exit"
              data-subject
              data-pose="[data-mode=trapped]"
              data-mode="trapped"
              data-step="0"
              style="display: flex; flex-direction: column; flex: 1 1 auto; min-height: 0; padding: 10px 12px"
            >${i(`trapped`,0)}</section>
          </div>

        </div>
      </div>
              <span class="sp-text" data-stage-verdict data-part="verdict" style="width: 296px; font-size: 11px">${n.trapped}</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="trapped" data-axis="Roach motel" data-term="trapped">
          <button class="sp-segment" data-part="mode-trapped" value="trapped">With</button>
          <button class="sp-segment" data-part="mode-fair" value="fair">Without</button>
        </sp-segmented>
      
    </div>
  `;let a=e(r,`exit`),o=e(r,`verdict`),s=e(r,`join`),c=(e,t)=>{a.dataset.mode=e,a.dataset.step=String(t),a.innerHTML=i(e,t),o.textContent=n[e]};a.addEventListener(`click`,e=>{if(!e.target.closest(`[data-part="advance"]`))return;let n=a.dataset.mode===`fair`?`fair`:`trapped`,r=Number(a.dataset.step??0)+1;r>=t[n].length||c(n,r)}),s.addEventListener(`click`,()=>{s.hasAttribute(`data-joined`)||(s.setAttribute(`data-joined`,``),s.setAttribute(`aria-disabled`,`true`),s.textContent=`Member since today`)}),e(r,`mode`).addEventListener(`change`,e=>{let t=e.detail===`fair`?`fair`:`trapped`;s.removeAttribute(`data-joined`),s.removeAttribute(`aria-disabled`),s.textContent=`Start membership`,c(t,0)})}export{a as mount};