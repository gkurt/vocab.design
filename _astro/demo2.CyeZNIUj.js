import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./motion.B5_YXmsy.js";var r=620,i=[`Ask about the boiler`,`Bring the parcel slip`];function a(a,o){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-row" style="align-items: center; gap: 16px">
        <div
          class="sp-surface"
          data-part="device"
          data-state="rest"
          data-subject
          style="position: relative; display: flex; flex-direction: column; gap: 8px; width: 168px; height: 258px; padding: 12px 10px; border-radius: 22px; overflow: hidden"
        >
          <div class="sp-row sp-row--between" style="flex: 0 0 auto">
            <span class="sp-heading" style="font-size: 13px">Notes</span>
            <span class="sp-label" style="font-size: 11px">9:41</span>
          </div>
          <div
            data-part="note"
            style="flex: 1 1 auto; display: flex; flex-direction: column; gap: 7px; padding: 9px; border-radius: 10px; background: var(--sp-sunken); font-size: 12px; line-height: 1.35"
          >
            ${i.map(e=>`<span>${e}</span>`).join(``)}
            <span data-part="last-line" style="transition: opacity 0.2s">Call the landlord back</span>
          </div>
          <div class="sp-scrim" data-part="scrim" style="border-radius: 22px"></div>
          <div
            class="sp-dialog"
            data-part="alert"
            role="alertdialog"
            aria-label="Undo Typing"
            style="width: 146px; padding: 12px 10px 10px"
          >
            <div class="sp-stack" style="gap: 4px; text-align: center">
              <span class="sp-heading" style="font-size: 13px">Undo Typing</span>
              <span class="sp-text" style="font-size: 11px; line-height: 1.35">Take back the last line you typed?</span>
            </div>
            <div class="sp-row" style="gap: 6px; margin-top: 10px">
              <button class="sp-button sp-button--ghost sp-button--sm sp-grow" type="button" data-part="cancel" style="padding: 4px 6px; font-size: 12px">Cancel</button>
              <button class="sp-button sp-button--sm sp-grow" type="button" data-part="undo" style="padding: 4px 6px; font-size: 12px">Undo</button>
            </div>
          </div>
        </div>
        <div class="sp-stack sp-context" style="width: 244px; gap: 10px">
          <span class="sp-label">Simulated device motion</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="sim" style="align-self: flex-start">Shake the phone</button>
          <span
            class="sp-text"
            data-part="readout"
            data-mode="idle"
            style="min-height: 36px; font-size: 12px"
          >Idle. No motion above the threshold.</span>
        </div>
      </div>
    </div>
  `;let s=e(a,`device`),c=e(a,`note`),l=e(a,`alert`),u=e(a,`scrim`),d=e(a,`readout`),f,p=(e,t)=>{d.dataset.mode=e,d.textContent=t},m=()=>{if(n(a)){s.style.rotate=`1.6deg`;return}s.animate([{transform:`translateX(0) rotate(0deg)`},{transform:`translateX(-7px) rotate(-1.6deg)`},{transform:`translateX(6px) rotate(1.4deg)`},{transform:`translateX(-4px) rotate(-0.9deg)`},{transform:`translateX(3px) rotate(0.6deg)`},{transform:`translateX(0) rotate(0deg)`}],{duration:r,easing:`ease-in-out`})},h=()=>{s.dataset.state=`alerting`,t(u,`data-open`,!0),t(l,`data-open`,!0),p(`alert`,`Shaken: the system offers the undo, and waits.`)},g=()=>{o.clearTimeout(f),s.dataset.state=`shaking`,p(`shake`,`Shaking: a motion past the threshold, not a control.`),m(),f=o.setTimeout(h,800)},_=(e,n)=>{o.clearTimeout(f),f=void 0,s.dataset.state=`rest`,s.style.rotate=``,t(u,`data-open`,!1),t(l,`data-open`,!1),p(e,n)};e(a,`sim`).addEventListener(`click`,g),e(a,`cancel`).addEventListener(`click`,()=>{_(`cancelled`,`Cancelled: the shake was accidental and the note is untouched.`)}),e(a,`undo`).addEventListener(`click`,()=>{t(c,`data-undone`,!0),e(a,`last-line`).style.opacity=`0`,_(`undone`,`Undone: the last line is gone, and a second shake would redo it.`)})}export{a as mount};