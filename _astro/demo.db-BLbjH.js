import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n={default:{bg:`var(--sp-surface)`,ink:`var(--sp-ink)`,muted:`var(--sp-muted)`,line:`var(--sp-line)`,body:11.5,head:12.5},text:{bg:`var(--sp-surface)`,ink:`var(--sp-ink)`,muted:`var(--sp-muted)`,line:`var(--sp-line)`,body:14,head:15},contrast:{bg:`#000000`,ink:`#ffffff`,muted:`#ffffff`,line:`#ffffff`,body:11.5,head:12.5}},r={default:`Text size and contrast are the widget’s to change. The name of the share control is not, and no setting in the panel computes one.`,text:`The copy grew. The share control has no text to grow, and still nothing to announce but its role.`,contrast:`The page inverted. The share control is still announced as “button”, with nothing after it.`};function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 11px 14px">
        <div data-part="page" data-mode="default"
             style="position: relative; overflow: hidden; height: 184px; border: 1px solid var(--sp-line);
                    border-radius: var(--sp-radius); background: var(--sp-surface)">
          <div class="sp-context">
            <div class="sp-topbar" data-part="bar" style="height: 34px; padding: 6px 10px; background: transparent">
              <span class="sp-heading sp-grow" data-part="title" style="font-size: 12.5px">Coast to Coast</span>
              <button class="sp-icon-button" type="button" data-part="ctl"
                      style="width: 24px; height: 24px">${t(`share`)}</button>
            </div>
            <div style="padding: 10px 12px">
              <div class="sp-heading" data-part="head" style="height: 20px; font-size: 12.5px">Booking your crossing</div>
              <p class="sp-text" data-part="copy"
                 style="margin: 4px 0 0; height: 40px; font-size: 11.5px; line-height: 1.35">
                Ferries run twice daily from March to October. Book a week ahead in high summer.</p>
            </div>
          </div>

          <div class="sp-surface" data-part="widget" data-subject
               style="position: absolute; right: 8px; bottom: 8px; width: 240px; padding: 7px 9px;
                      box-shadow: var(--sp-shadow)">
            <div class="sp-row" style="gap: 6px; height: 16px">
              <span style="display: flex; color: var(--sp-accent)">${t(`sliders`)}</span>
              <span class="sp-label" style="font-size: 10.5px; white-space: nowrap">Accessibility</span>
            </div>
            <sp-segmented class="sp-segmented" data-part="mode" data-value="default" data-axis="Setting"
                          style="margin-top: 6px; width: 100%">
              <button class="sp-segment" type="button" data-part="seg-default" value="default"
                      style="flex: 1 1 auto; padding: 3px 6px; font-size: 10px; white-space: nowrap">Default</button>
              <button class="sp-segment" type="button" data-part="seg-text" value="text"
                      style="flex: 1 1 auto; padding: 3px 6px; font-size: 10px; white-space: nowrap">Big text</button>
              <button class="sp-segment" type="button" data-part="seg-contrast" value="contrast"
                      style="flex: 1 1 auto; padding: 3px 6px; font-size: 10px; white-space: nowrap">Contrast</button>
            </sp-segmented>
          </div>
        </div>

        <div class="sp-surface sp-context" style="margin-top: 9px; padding: 8px 10px">
          <div class="sp-row" style="gap: 8px; height: 17px">
            <span style="display: flex; flex: 0 0 auto; color: var(--sp-warn)">${t(`alert`)}</span>
            <span class="sp-label" style="flex: 0 0 auto; font-size: 10.5px; white-space: nowrap">Share button, computed name</span>
            <span class="sp-grow"></span>
            <span class="sp-text sp-text--ink" data-part="name" data-mode="default" data-name="empty"
                  style="flex: 0 0 auto; font-size: 11.5px; font-weight: 600; white-space: nowrap">empty</span>
          </div>
          <p class="sp-text" data-stage-verdict data-part="note" data-mode="default"
             style="margin: 5px 0 0; height: 30px; font-size: 11px; line-height: 1.35">${r.default}</p>
        </div>
      </div>
    </div>
  `;let a=e(i,`page`),o=e(i,`bar`),s=e(i,`title`),c=e(i,`head`),l=e(i,`copy`),u=e(i,`ctl`),d=e(i,`name`),f=e(i,`note`),p=e=>{let t=n[e];a.dataset.mode=e,a.style.background=t.bg,a.style.borderColor=t.line,o.style.borderBottomColor=t.line,s.style.color=t.ink,s.style.fontSize=`${t.head}px`,c.style.color=t.ink,c.style.fontSize=`${t.head}px`,l.style.color=t.muted,l.style.fontSize=`${t.body}px`,u.style.color=t.ink,d.dataset.mode=e,f.dataset.mode=e,f.textContent=r[e]};e(i,`mode`).addEventListener(`change`,e=>{p(e.detail)})}export{i as mount};