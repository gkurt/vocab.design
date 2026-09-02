import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var r={mockup:`Ana Diaz`,hand:`Konstantina Papadopoulou`},i={mockup:`AD`,hand:`KP`},a={mockup:`Everything is at its best. The name is short because the author typed it, the list has rows because the author added them, nothing has failed, and the type is the size it was drawn at.`,hand:`The same screen with a reader in it: their own name, their first run with nothing saved yet, an expired card, and the type size they set. None of these four was drawn.`};function o(o){let s=(e,t,n)=>`
    <li class="sp-list-item" data-part="row-${e}" style="padding: 3px 8px; font-size: inherit; gap: 8px">
      <span style="flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">${t}</span>
      <span style="flex: 0 0 auto; font-size: 0.85em; color: var(--sp-muted)">${n}</span>
    </li>`;o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 260px; padding: 11px 14px 13px">
        <div class="sp-row sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="state" data-value="mockup" data-axis="Shown as" data-term="mockup" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-mockup" value="mockup"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Mockup</button>
            <button class="sp-segment" type="button" data-part="seg-hand" value="hand"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">In the hand</button>
          </sp-segmented>
        </div>

        <div style="margin-top: 9px">
          <div class="sp-surface" data-part="pane" data-subject data-pose="[data-state=mockup]" data-state="mockup"
               style="display: flex; flex-direction: column; flex: 0 0 auto; gap: 6px;
                      width: 232px; height: 238px; padding: 10px; font-size: 13px; overflow: hidden">

            <div class="sp-row" data-part="header" style="gap: 8px; height: 34px; flex: 0 0 auto">
              <span class="sp-avatar" data-part="avatar" style="width: 26px; height: 26px; font-size: 10px">AD</span>
              <span data-part="name" style="flex: 1 1 auto; min-width: 0; font-size: 0.95em; font-weight: 600;
                                            line-height: 1.2; max-height: 34px; overflow: hidden">${r.mockup}</span>
              <span style="display: flex; flex: 0 0 auto; color: var(--sp-muted)">${n(`chevronRight`)}</span>
            </div>

            <div data-part="alert" style="display: flex; align-items: center; gap: 6px; flex: 0 0 auto; height: 24px;
                                          padding: 0 8px; border-radius: 6px; color: var(--sp-warn);
                                          background: color-mix(in oklab, var(--sp-warn) 13%, transparent);
                                          font-size: 0.82em; line-height: 1.2; opacity: 0; visibility: hidden;
                                          transition: opacity 0.2s, visibility 0.2s">
              <span style="display: flex; flex: 0 0 auto">${n(`alert`)}</span>
              <span style="flex: 1 1 auto; min-width: 0">Payment card expired</span>
            </div>

            <span data-part="section" style="flex: 0 0 auto; font-size: 0.76em; font-weight: 500;
                                             line-height: 14px; color: var(--sp-muted)">Recent trips</span>

            <div style="position: relative; flex: 0 0 auto; height: 88px">
              <ul class="sp-list" data-part="list"
                  style="position: absolute; inset: 0; transition: opacity 0.2s, visibility 0.2s">
                ${s(1,`Lisbon`,`12 Mar`)}${s(2,`Turin`,`4 Apr`)}${s(3,`Bergen`,`29 May`)}
              </ul>
              <div class="sp-empty" data-part="empty"
                   style="position: absolute; inset: 0; gap: 6px; padding: 6px; opacity: 0; visibility: hidden;
                          transition: opacity 0.2s, visibility 0.2s">
                <span class="sp-empty-mark" style="width: 32px; height: 32px">${n(`inbox`)}</span>
                <span style="font-size: 0.8em; color: var(--sp-muted)">No trips saved yet</span>
              </div>
            </div>

            <button class="sp-button" type="button" data-part="cta"
                    style="flex: 0 0 auto; height: 30px; padding: 0 14px; margin-top: auto">Plan a trip</button>
          </div>

          <p class="sp-text" data-stage-verdict data-part="note" data-state="mockup" style="margin: 0; font-size: 11px">${a.mockup}</p>
        </div>
      </div>
    </div>
  `;let c=e(o,`pane`),l=e(o,`name`),u=e(o,`avatar`),d=e(o,`alert`),f=e(o,`list`),p=e(o,`empty`),m=e(o,`note`),h=(e,t)=>{e.style.opacity=t?`1`:`0`,e.style.visibility=t?`visible`:`hidden`},g=e=>{let n=e===`hand`;c.dataset.state=e,c.style.fontSize=n?`15.5px`:`13px`,l.textContent=r[e],u.textContent=i[e],t(l,`data-long`,n),h(d,n),h(f,!n),h(p,n),m.textContent=a[e],m.dataset.state=e};e(o,`state`).addEventListener(`change`,e=>{g(e.detail===`hand`?`hand`:`mockup`)})}export{o as mount};