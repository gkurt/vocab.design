import{n as e}from"./parts.C-YLuC7Q.js";var t=900,n=900,r={idle:`All changes saved`,dirty:`Unsaved changes`,saving:`Saving…`,saved:`Saved just now`};function i(i,a){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 330px">
        <div class="sp-row sp-row--between">
          <span class="sp-heading sp-context">Meeting notes</span>
          <span class="sp-text" data-part="status" data-subject data-state="idle" role="status">${r.idle}</span>
        </div>
        <textarea
          class="sp-input sp-context"
          data-part="editor"
          rows="4"
          spellcheck="false"
          aria-label="Meeting notes"
          style="height: 84px; margin-top: 12px; resize: none; line-height: 1.5"
        >Ship the colour ramp on Thursday.</textarea>
      </div>
    </div>
  `;let o=e(i,`status`),s=e(i,`editor`),c=0;for(let e of Object.values(r))o.textContent=e,c=Math.max(c,o.offsetWidth);o.style.minWidth=`${c}px`,o.style.textAlign=`right`,o.textContent=r.idle;let l=e=>{o.dataset.state=e,o.textContent=r[e],o.className=e===`saving`?`sp-text sp-pending`:`sp-text`},u,d;s.addEventListener(`input`,()=>{a.clearTimeout(u),a.clearTimeout(d),l(`dirty`),u=a.setTimeout(()=>{l(`saving`),d=a.setTimeout(()=>l(`saved`),n)},t)})}export{i as mount};