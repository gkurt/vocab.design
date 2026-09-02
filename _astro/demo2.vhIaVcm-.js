import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=[0,23,31],r=34,i=e=>`${e/r*100}%`,a={forced:`Nothing is sent between the card and the charge. The reader finds out from their bank.`,fair:`A reminder a week out, a stated renewal date, and one click to stop it before it happens.`},o={forced:{label:`Day 23<br>No reminder sent`,fill:`transparent`,border:`2px dashed var(--sp-muted)`,ink:`var(--sp-muted)`},fair:{label:`Day 23<br>Reminder: 7 days left`,fill:`var(--sp-accent)`,border:`0`,ink:`var(--sp-ink)`}};function s(e){let t=o[e];return`
    <div style="position: relative; height: 70px">
      <span style="position: absolute; left: 0; top: 0; width: 96px; font-size: 10px; line-height: 1.3; color: var(--sp-ink)">
        Day 0<br>Card taken
      </span>
      <span style="position: absolute; right: 0; top: 0; width: 104px; text-align: right; font-size: 10px; line-height: 1.3; color: var(--sp-ink)">
        Day 31<br>Charged 79.00
      </span>
      <div style="position: absolute; left: 0; right: 0; top: 30px; height: 6px; border-radius: 999px; background: var(--sp-line)">
        <span style="position: absolute; left: 0; top: 0; bottom: 0; width: ${i(30)}; border-radius: 999px; background: var(--sp-accent-soft)"></span>
        <span data-part="start" style="position: absolute; left: 0; top: 50%; translate: 0 -50%; width: 11px; height: 11px; border-radius: 50%; background: var(--sp-accent)"></span>
        <span
          data-part="reminder"
          data-state="${e===`fair`?`sent`:`none`}"
          style="position: absolute; left: ${i(23)}; top: 50%; translate: -50% -50%; width: 11px; height: 11px; border-radius: 50%; box-sizing: border-box; background: ${t.fill}; border: ${t.border}"
        ></span>
        <span
          data-part="charge"
          style="position: absolute; left: ${i(31)}; top: 50%; translate: -50% -50%; width: 13px; height: 13px; border-radius: 50%; background: var(--sp-warn)"
        ></span>
        <span
          data-part="today"
          style="position: absolute; left: 0; top: 7px; translate: -50% 0; width: 4px; height: 10px; border-radius: 2px; background: var(--sp-ink); transition: left 0.35s var(--sp-ease)"
        ></span>
      </div>
      <span
        data-part="reminder-label"
        style="position: absolute; left: ${i(23)}; top: 46px; width: 118px; transform: translateX(-50%); text-align: center; font-size: 10px; line-height: 1.3; color: ${t.ink}"
      >${t.label}</span>
    </div>`}function c(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 254px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Streamly</span>
          <span class="sp-label" data-part="day-readout" style="font-size: 11px">Day 0</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="next" type="button">Next event</button>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface sp-context" style="padding: 8px 10px">
            <div class="sp-row sp-row--between">
              <span class="sp-text sp-text--ink">Streamly Plus</span><span class="sp-text">Free for 30 days</span>
            </div>
            <div class="sp-text" style="margin-top: 2px; font-size: 12px">Card required to start. 79.00 a year after the trial.</div>
          </div>
          <span class="sp-label sp-context">Billing timeline</span>
          <div
            class="sp-surface"
            data-part="timeline"
            data-subject
            data-pose="[data-mode=forced]"
            data-mode="forced"
            data-day="0"
            style="height: 94px; padding: 10px 14px; background: var(--sp-surface)"
          >${s(`forced`)}</div>
        </div>
      </div>
              <span class="sp-text" data-stage-verdict data-part="verdict" style="width: 292px; font-size: 11px">${a.forced}</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="forced" data-axis="Forced continuity" data-term="forced">
          <button class="sp-segment" data-part="mode-forced" value="forced">With</button>
          <button class="sp-segment" data-part="mode-fair" value="fair">Without</button>
        </sp-segmented>
      
    </div>
  `;let o=e(r,`timeline`),c=e(r,`verdict`),l=e(r,`day-readout`),u=e(r,`next`),d=r=>{let a=o.dataset.mode===`fair`?`fair`:`forced`,s=n[r];o.dataset.day=String(s),l.textContent=`Day ${s}`,e(o,`today`).style.left=i(s),t(e(o,`reminder`),`data-fired`,s>=23&&a===`fair`),t(e(o,`charge`),`data-fired`,s>=31),r>=n.length-1?u.setAttribute(`aria-disabled`,`true`):u.removeAttribute(`aria-disabled`)},f=e=>{o.dataset.mode=e,o.innerHTML=s(e),c.textContent=a[e],d(0)};u.addEventListener(`click`,()=>{let e=n.indexOf(Number(o.dataset.day??0));e<0||e>=n.length-1||d(e+1)}),e(r,`mode`).addEventListener(`change`,e=>{f(e.detail===`fair`?`fair`:`forced`)}),d(0)}export{c as mount};