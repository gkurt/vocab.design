import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n={first:{nag:`on`,ask:1,askLabel:`Ask 1`,title:`Turn on notifications?`,body:`We will let you know when someone replies to a note.`,note:`The first ask is not the pattern yet. It becomes one the moment the answer is not kept.`},third:{nag:`on`,ask:3,askLabel:`Ask 3`,title:`Turn on notifications?`,body:`We will let you know when someone replies to a note.`,note:`The same prompt, third time, word for word. Nothing has changed except the reader, who now has a cheaper way to make it stop than refusing again.`},remembered:{nag:`off`,ask:1,askLabel:`Asked once`,title:`Notifications are off`,body:`You said no, and that answer was kept. The switch waits in Settings for whenever it is wanted.`,note:`The refusal is remembered and the ask moves to where it belongs: a row that is available forever and interrupts nothing.`}},r=1200,i=[[`Notifications`,`Off`],[`Sync`,`On`],[`Theme`,`System`],[`Downloads`,`Wi-Fi only`]];function a(a,o){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Marrow</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Occasion" data-term="third" data-part="mode" data-value="third">
            <button class="sp-segment" type="button" data-part="mode-first" value="first" style="padding: 5px 9px; font-size: 12px">First ask</button>
            <button class="sp-segment" type="button" data-part="mode-third" value="third" style="padding: 5px 9px; font-size: 12px">Third ask</button>
            <button class="sp-segment" type="button" data-part="mode-remembered" value="remembered" style="padding: 5px 9px; font-size: 12px">Remembered</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="position: relative">

          <div class="sp-surface sp-context" style="height: 100%; padding: 8px 12px">
            <div class="sp-label" style="height: 20px; font-size: 11px">Settings</div>
            ${i.map(([e,t])=>`<div class="sp-row sp-row--between" style="height: 30px; border-top: 1px solid var(--sp-line)">
        <span style="font-size: 12px">${e}</span>
        <span class="sp-label" style="font-size: 11px">${t}</span>
      </div>`).join(``)}
          </div>

          <div class="sp-scrim" data-part="scrim" data-open></div>

          <div
            class="sp-surface"
            data-part="prompt"
            data-subject
            data-pose="[data-nag=on]"
            data-nag="on"
            role="dialog"
            aria-label="Turn on notifications"
            style="position: absolute; left: 12px; right: 12px; bottom: 12px; height: 110px; padding: 10px 12px;
                   box-shadow: var(--sp-shadow); transition: opacity 0.24s, translate 0.24s var(--sp-ease)"
          >
            <div class="sp-row sp-row--between" style="height: 20px">
              <span class="sp-heading" data-part="title" style="font-size: 14px">${n.third.title}</span>
              <span class="sp-chip" data-part="counter" data-ask="3" style="padding: 2px 8px; font-size: 11px; cursor: default">${n.third.askLabel}</span>
            </div>
            <div class="sp-text" data-part="body" style="height: 32px; margin-top: 4px; font-size: 11px">${n.third.body}</div>
            <div class="sp-row sp-row--between" style="height: 32px; margin-top: 4px">
              <button class="sp-button sp-button--quiet sp-button--sm" type="button" data-part="not-now" style="color: var(--sp-muted); font-size: 12px">Not now</button>
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="settings-link" hidden>Open Settings</button>
              <button class="sp-button sp-button--sm" type="button" data-part="allow">Turn on</button>
            </div>
          </div>

        </div>
      </div>
      <span class="sp-text sp-context" data-stage-verdict data-part="note" style="width: 452px; height: 32px; font-size: 11px">${n.third.note}</span>
    </div>
  `;let s=e(a,`prompt`),c=e(a,`scrim`),l=e(a,`title`),u=e(a,`counter`),d=e(a,`body`),f=e(a,`not-now`),p=e(a,`settings-link`),m=e(a,`allow`),h=e(a,`note`),g=`third`,_=n.third.ask,v,y=e=>{s.style.opacity=e?`1`:`0`,s.style.translate=e?`0 0`:`0 12px`,t(c,`data-open`,e&&n[g].nag===`on`)},b=()=>g===`remembered`?n.remembered.askLabel:`Ask ${_}`,x=e=>{g=e,_=n[e].ask,o.clearTimeout(v),s.dataset.nag=n[e].nag,l.textContent=n[e].title,d.textContent=n[e].body,u.dataset.ask=String(_),u.textContent=b(),h.textContent=n[e].note;let r=n[e].nag===`on`;t(f,`hidden`,!r),t(m,`hidden`,!r),t(p,`hidden`,r),y(!0)};e(a,`mode`).addEventListener(`change`,e=>x(e.detail)),f.addEventListener(`click`,()=>{y(!1),o.clearTimeout(v),v=o.setTimeout(()=>{_+=1,u.dataset.ask=String(_),u.textContent=b(),y(!0)},r)})}export{a as mount};