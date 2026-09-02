import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=`481902`,r={allowed:`Paste, a password manager, and autofill all reach this field.`,blocked:`Paste was blocked. The code has to come out of your head.`,waiting:`Paste, a password manager, and autofill all reach this field.`,refuses:`This field refuses a paste, so the code has to come out of your head.`},i={memory:`Cognitive function test: required`,open:`Cognitive function test: none`};function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 10px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Sign-in" data-term="open" data-part="picker" data-value="open">
            <button class="sp-segment" type="button" data-part="seg-memory" value="memory"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Tests your memory</button>
            <button class="sp-segment" type="button" data-part="seg-open" value="open"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Tests nothing you recall</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="signin" data-subject data-pose="[data-mode=open]" data-mode="open"
             style="margin-top: 8px; height: 146px; padding: 12px 14px; display: flex; flex-direction: column; gap: 8px">
          <span class="sp-heading" style="font-size: 13px">Sign in to your account</span>

          <div class="sp-row" style="gap: 8px">
            <span class="sp-label sp-context" style="flex: 0 0 96px; font-size: 10.5px">Six digit code</span>
            <input class="sp-input" data-part="code" aria-label="Six digit code"
                   style="flex: 1 1 auto; min-width: 0; height: 26px; padding: 3px 8px; font-size: 11.5px" />
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="paste"
                    style="flex: 0 0 auto; font-size: 11px; padding: 3px 9px">Paste</button>
          </div>

          <span class="sp-text sp-context" data-stage-verdict data-part="note" data-state="waiting"
                style="min-height: 15px; font-size: 10.5px">${r.waiting}</span>

          <div class="sp-divider sp-context"></div>

          <div class="sp-row" style="height: 28px; gap: 10px">
            <button class="sp-button sp-button--sm" type="button" data-part="passkey"
                    style="font-size: 11.5px">Continue with a passkey</button>
            <span class="sp-text sp-context" data-part="status" data-state="out"
                  style="flex: 1 1 auto; min-width: 0; font-size: 10.5px">Not signed in yet</span>
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 8px; height: 16px; gap: 10px">
          <span class="sp-label" data-part="test" data-state="none" style="flex: 0 0 auto; font-size: 10.5px">${i.open}</span>
          <span class="sp-label" data-part="routes" data-mode="open" style="flex: 0 0 auto; font-size: 10.5px">Routes in: two</span>
        </div>
      </div>
    </div>
  `;let o=e(a,`signin`),s=e(a,`code`),c=e(a,`note`),l=e(a,`passkey`),u=e(a,`status`),d=e(a,`test`),f=e(a,`routes`),p=e=>{c.dataset.state=e,c.textContent=r[e]??``},m=e=>{o.dataset.mode=e,s.value=``,t(s,`data-filled`,!1),t(l,`hidden`,e===`memory`),p(e===`memory`?`refuses`:`waiting`),u.dataset.state=`out`,u.textContent=`Not signed in yet`,d.dataset.state=e===`memory`?`required`:`none`,d.textContent=i[e],f.dataset.mode=e,f.textContent=e===`memory`?`Routes in: one, and it goes through your memory`:`Routes in: two`};m(`open`),e(a,`paste`).addEventListener(`click`,()=>{if(o.dataset.mode===`memory`){p(`blocked`);return}s.value=n,t(s,`data-filled`,!0),p(`allowed`)}),l.addEventListener(`click`,()=>{u.dataset.state=`in`,u.textContent=`Signed in, having recalled nothing`}),e(a,`picker`).addEventListener(`change`,e=>{m(e.detail)})}export{a as mount};