import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=19,r=57;function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="height: 280px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Assistant</span>
          <span class="sp-label">Trail survey</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-stack sp-context" data-part="transcript" style="height: 84px; gap: 8px">
            <div class="sp-surface" style="padding: 8px 10px; margin-right: 44px">
              <div class="sp-stack" style="gap: 6px">
                <div class="sp-line" style="width: 92%"></div>
                <div class="sp-line" style="width: 68%"></div>
              </div>
            </div>
            <div style="position: relative; height: 34px">
              <div
                class="sp-surface"
                data-part="sent"
                hidden
                style="position: absolute; inset: 0; margin-left: 64px; padding: 6px 10px;
                       background: var(--sp-accent-soft); border-color: var(--sp-accent-soft)"
              >
                <span
                  class="sp-text sp-text--ink"
                  data-part="sent-text"
                  style="display: block; font-size: 12px; line-height: 20px;
                         white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
                ></span>
              </div>
            </div>
          </div>

          <div style="position: relative; height: 112px; margin-top: auto">
            <div
              class="sp-surface"
              data-part="composer"
              data-subject
              data-state="empty"
              style="position: absolute; left: 0; right: 0; bottom: 0; padding: 8px 10px"
            >
              <textarea
                class="sp-input"
                data-part="prompt"
                rows="1"
                aria-label="Ask the assistant"
                placeholder="Ask anything"
                spellcheck="false"
                style="display: block; height: ${n}px; padding: 0; border: 0; border-radius: 0;
                       background: transparent; line-height: ${n}px; resize: none; overflow-y: hidden"
              ></textarea>
              <div class="sp-row" style="margin-top: 8px; gap: 6px">
                <button class="sp-icon-button" type="button" data-part="attach" aria-label="Attach a file">${t(`plus`)}</button>
                <button class="sp-chip" type="button" data-part="model">Sonnet ${t(`chevronDown`)}</button>
                <span class="sp-grow"></span>
                <button
                  class="sp-button sp-button--sm"
                  type="button"
                  data-part="send"
                  aria-label="Send"
                  aria-disabled="true"
                  style="padding: 5px 9px"
                >${t(`share`)}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let a=e(i,`composer`),o=e(i,`prompt`),s=e(i,`send`),c=e(i,`sent`),l=e(i,`sent-text`),u=()=>{o.style.height=`0px`;let e=o.scrollHeight;o.style.height=`${Math.min(e,r)}px`,o.style.overflowY=e>r?`auto`:`hidden`},d=()=>{let e=o.value.trim()!==``;a.dataset.state=e?`filled`:`empty`,s.setAttribute(`aria-disabled`,String(!e)),u()},f=()=>{let e=o.value.trim();e!==``&&(l.textContent=e,c.hidden=!1,o.value=``,d())};o.addEventListener(`input`,d),o.addEventListener(`keydown`,e=>{e.key!==`Enter`||e.shiftKey||(e.preventDefault(),f())}),s.addEventListener(`click`,f),d()}export{i as mount};