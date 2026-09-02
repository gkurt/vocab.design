import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={light:{canvas:`#FFFFFF`,field:`#F5F7FA`,ink:`#1B2130`,muted:`#5A6474`,line:`#D5DAE4`,accent:`#3557E8`},dark:{canvas:`#1C1F26`,field:`#262A32`,ink:`#E7EAF0`,muted:`#9AA3B2`,line:`#383D47`,accent:`#7B93F5`}},n={light:`Declared light, so the system preference is ignored here and the browser draws its own widgets from the light set.`,dark:`Declared dark, so the page opts out of light rendering entirely, whatever the system asks for.`,auto:`Declared "light dark", so the system preference decides, and the scrollbar and checkbox follow it.`},r=`light`,i=`light`,a=(e,t)=>e===`auto`?t:e;function o(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="System" data-part="os" data-value="${i}">
            <button class="sp-segment" data-part="os-light" value="light">Light</button>
            <button class="sp-segment" data-part="os-dark" value="dark">Dark</button>
          </sp-segmented>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 8px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="color-scheme" data-part="scheme" data-value="${r}">
            <button class="sp-segment" data-part="scheme-light" value="light">light</button>
            <button class="sp-segment" data-part="scheme-dark" value="dark">dark</button>
            <button class="sp-segment" data-part="scheme-auto" value="auto">light dark</button>
          </sp-segmented>
        </div>

        <div data-part="panel" data-subject data-scheme="${r}" data-resolved="${a(r,i)}"
             style="margin-top: 14px; height: 128px; display: flex; border-radius: var(--sp-radius); overflow: hidden;
                    border: 1px solid var(--cs-line); background: var(--cs-canvas); color: var(--cs-ink)">
          <div class="sp-scroll" data-part="pane"
               style="flex: 1 1 auto; overflow-y: scroll; padding: 12px 14px; scrollbar-width: auto">
            <div style="font-size: 13px; font-weight: 600">Notifications</div>
            <div style="display: flex; align-items: center; gap: 8px; margin-top: 10px">
              <input data-part="box" type="checkbox" checked style="width: 15px; height: 15px; margin: 0; accent-color: var(--cs-accent)">
              <span style="font-size: 12px">Email me about replies</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px; margin-top: 8px">
              <input type="checkbox" style="width: 15px; height: 15px; margin: 0; accent-color: var(--cs-accent)">
              <span style="font-size: 12px">Weekly digest</span>
            </div>
            <div data-part="field"
                 style="margin-top: 12px; padding: 6px 9px; border-radius: 6px; font-size: 12px;
                        border: 1px solid var(--cs-line); background: var(--cs-field); color: var(--cs-muted)">
              you@example.com
            </div>
            <p style="margin: 10px 0 0; font-size: 12px; line-height: 1.5; color: var(--cs-muted)">
              Replies are batched for five minutes, so a busy thread arrives as one message.
              The weekly digest is sent on Mondays and covers the seven days before it.
            </p>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="note" style="margin: 10px 0 0; min-height: 40px">${n[r]}</p>
      </div>
    </div>
  `;let s=e(o,`panel`),c=()=>{let r=s.dataset.scheme??`light`,c=a(r,s.dataset.os??i),l=t[c];s.dataset.resolved=c,s.style.colorScheme=r===`auto`?`light dark`:r,s.style.setProperty(`--cs-canvas`,l.canvas),s.style.setProperty(`--cs-field`,l.field),s.style.setProperty(`--cs-ink`,l.ink),s.style.setProperty(`--cs-muted`,l.muted),s.style.setProperty(`--cs-line`,l.line),s.style.setProperty(`--cs-accent`,l.accent),e(o,`note`).textContent=n[r]??``};s.dataset.os=i,c(),e(o,`scheme`).addEventListener(`change`,e=>{s.dataset.scheme=e.detail,c()}),e(o,`os`).addEventListener(`change`,e=>{s.dataset.os=e.detail,c()})}export{o as mount};