import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=`Send`,r={contains:{name:`Send message`,contains:!0},replaces:{name:`Submit form`,contains:!1}},i={contains:`Said “Click Send”: the word on the button is inside its name, so the button activates.`,replaces:`Said “Click Send”: nothing here is called Send, so the command reaches nothing.`};function a(a){let o=(e,t,n)=>`
    <div class="sp-stack" style="flex: 1 1 0; min-width: 0; gap: 1px">
      <span class="sp-label" style="font-size: 9.5px">${e}</span>
      <span class="sp-text sp-text--ink" data-part="${t}"
            style="font-size: 11.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${n}</span>
    </div>`;a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="contains" data-axis="Accessible name" data-term="contains">
            <button class="sp-segment" data-part="seg-contains" value="contains"
                    style="padding: 5px 10px; font-size: 12px">“Send message”</button>
            <button class="sp-segment" data-part="seg-replaces" value="replaces"
                    style="padding: 5px 10px; font-size: 12px">“Submit form”</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" style="margin-top: 9px; padding: 9px 11px">
          <div class="sp-context">
            <span class="sp-heading" style="font-size: 12.5px">New message</span>
            <div class="sp-stack" style="margin-top: 7px; gap: 6px">
              <div class="sp-line" style="width: 72%"></div>
              <div class="sp-line" style="width: 48%"></div>
            </div>
          </div>
          <div class="sp-row" style="margin-top: 11px; gap: 8px">
            <button class="sp-button sp-button--ghost sp-button--sm sp-context" type="button" data-part="cancel"
                    style="font-size: 12px; cursor: default">Cancel</button>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="send" data-subject
                    data-pose="[data-name=contains]" data-name="contains" data-selected
                    aria-label="${r.contains.name}" style="font-size: 12px; cursor: default">${n}</button>
          </div>
        </div>

        <div class="sp-row sp-context" style="margin-top: 9px; gap: 10px; height: 30px">
          ${o(`Visible label`,`visible`,n)}
          ${o(`Accessible name`,`aname`,`“${r.contains.name}”`)}
          ${o(`Name contains label`,`contains`,`Yes`)}
        </div>

      </div>
      <p data-stage-verdict data-part="answer" data-ok="yes" data-name="contains">${i.contains}</p>
    </div>
  `;let s=e(a,`send`),c=e(a,`aname`),l=e(a,`contains`),u=e(a,`answer`),d=e=>{let n=r[e];s.dataset.name=e,s.setAttribute(`aria-label`,n.name),t(s,`data-selected`,n.contains),c.textContent=`“${n.name}”`,l.dataset.ok=n.contains?`yes`:`no`,l.textContent=n.contains?`Yes`:`No`,u.dataset.ok=n.contains?`yes`:`no`,u.dataset.name=e,u.textContent=i[e]};d(`contains`),e(a,`segmented`).addEventListener(`change`,e=>{d(e.detail)})}export{a as mount};