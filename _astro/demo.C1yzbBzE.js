import{n as e}from"./parts.C-YLuC7Q.js";var t={idle:`No display, so the interface is language, light and sound. Everything a screen would have shown has to be said, chimed, or lit instead.`,voice:`The answer came back as one short sentence and a colour. Nothing was drawn, so nothing had to be looked at, which is the promise and the difficulty at once.`,wave:`A gesture the room can see, answered by a chime. With no screen there is no undo sitting in a corner either: the way back has to be another sentence.`},n={voice:`“Turn the kitchen lights down”`,wave:`(a hand waved over the counter)`},r={voice:`“Kitchen at forty percent”`,wave:`“Music paused”`},i=900,a=1500,o=900;function s(s,c){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 218px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Kitchen speaker</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; gap: 16px">

          <span
            data-part="device"
            data-subject
            data-phase="idle"
            style="position: relative; flex: 0 0 auto; width: 124px; height: 124px; border-radius: 50%; background: var(--sp-surface); border: 1px solid var(--sp-line); background-image: radial-gradient(var(--sp-line) 1px, transparent 1.4px); background-size: 9px 9px"
          >
            <span
              data-part="ring"
              style="position: absolute; inset: 6px; border-radius: 50%; border: 5px solid var(--sp-line); transition: border-color 0.3s"
            ></span>
          </span>

          <span class="sp-stack sp-grow" style="gap: 6px; min-width: 0">
            <span class="sp-label" style="font-size: 11px">Transcript</span>
            <span class="sp-surface sp-stack" style="gap: 6px; padding: 10px 12px; height: 84px; justify-content: center">
              <span class="sp-text sp-text--ink" data-part="said" style="font-size: 12px; opacity: 0; transition: opacity 0.2s">${n.voice}</span>
              <span class="sp-text" data-part="reply" style="font-size: 12px; opacity: 0; transition: opacity 0.2s">${r.voice}</span>
            </span>
            <span class="sp-row" style="gap: 8px; height: 24px">
              <span class="sp-chip" data-part="chime" style="cursor: default; opacity: 0; transition: opacity 0.2s">Two note chime</span>
            </span>
          </span>

        </div>
      </div>
      <div class="sp-row sp-context" style="width: 452px; gap: 10px">
        <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="speak">Speak to it</button>
        <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="wave">Wave a hand</button>
      </div>
      <span class="sp-text sp-context" data-stage-verdict data-part="note" style="width: 452px; height: 32px; font-size: 11px">${t.idle}</span>
    </div>
  `;let l=e(s,`device`),u=e(s,`ring`),d=e(s,`said`),f=e(s,`reply`),p=e(s,`chime`),m=e(s,`note`),h,g,_=e=>{l.dataset.phase=e,u.style.borderColor=e===`idle`?`var(--sp-line)`:`var(--sp-accent)`,u.className=e===`listening`?`sp-pulse`:e===`working`?`sp-pending`:``},v=e=>{c.clearTimeout(h),c.clearTimeout(g),d.textContent=n[e],f.textContent=r[e],d.style.opacity=`1`,f.style.opacity=`0`,p.style.opacity=`0`,m.textContent=t[e],_(e===`voice`?`listening`:`working`);let s=()=>{f.style.opacity=`1`,p.style.opacity=`1`,_(`answered`)};if(e===`voice`){g=c.setTimeout(()=>_(`working`),i),h=c.setTimeout(s,a);return}h=c.setTimeout(s,o)};e(s,`speak`).addEventListener(`click`,()=>v(`voice`)),e(s,`wave`).addEventListener(`click`,()=>v(`wave`))}export{s as mount};