import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var r={none:`accessibilityTraits = []`,button:`accessibilityTraits = [.button]`,selected:`accessibilityTraits = [.selected]`},i={none:`“Unread”`,button:`“Unread, button”`,selected:`“Unread, selected”`},a={none:`Drawn as a chosen filter, announced as plain text. Nothing says it can be activated, and nothing says it is on.`,button:`The .button trait adds the word button after the label. It is a control now, but the announcement still leaves out the state it is drawn in.`,selected:`The .selected trait is the state half. A real chip sets both; one at a time here, so each word traces to the trait that produced it.`};function o(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Traits" data-value="button" style="margin-left: auto">
            <button class="sp-segment" data-part="seg-none" value="none">No traits</button>
            <button class="sp-segment" data-part="seg-button" value="button">.button</button>
            <button class="sp-segment" data-part="seg-selected" value="selected">.selected</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="panel" data-mode="button"
             style="margin-top: 10px; padding: 10px 12px; display: flex; align-items: center; gap: 12px">
          <button class="sp-chip" type="button" data-part="control" data-subject data-pose="[data-traits]"
                  data-traits="button" data-selected style="flex: 0 0 auto; font-size: 12px; cursor: default">
            ${n(`check`)}Unread
          </button>
          <span class="sp-label" data-part="traits"
                style="flex: 1 1 auto; min-width: 0; text-align: right; font-size: 10px; white-space: nowrap;
                       overflow: hidden; text-overflow: ellipsis">${r.button}</span>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; height: 18px; gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">VoiceOver announces</span>
          <span class="sp-text sp-text--ink" data-part="say" data-mode="button"
                style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap">${i.button}</span>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="button"
           style="margin: 7px 0 0; height: 34px; font-size: 11px">${a.button}</p>
      </div>
    </div>
  `;let s=e(o,`panel`),c=e(o,`control`),l=e(o,`traits`),u=e(o,`say`),d=e(o,`caption`),f=e=>{s.dataset.mode=e,e===`none`?t(c,`data-traits`,!1):c.dataset.traits=e,l.textContent=r[e],l.style.color=e===`none`?`var(--sp-muted)`:`var(--sp-ink)`,u.dataset.mode=e,u.textContent=i[e],d.dataset.mode=e,d.textContent=a[e]};f(`button`),e(o,`segmented`).addEventListener(`change`,e=>{f(e.detail)})}export{o as mount};