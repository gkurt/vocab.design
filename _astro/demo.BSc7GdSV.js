import{n as e}from"./parts.C-YLuC7Q.js";var t=40,n=8,r=900;function i(i,a){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 320px">
        <div class="sp-heading sp-context">Add a note</div>
        <div class="sp-field" style="margin-top: 14px">
          <div class="sp-row sp-row--between">
            <label class="sp-label sp-context" for="vd-note">Note</label>
            <span
              class="sp-text"
              data-part="counter"
              data-subject
              data-state="ok"
              aria-hidden="true"
              style="font-size: 12px; text-align: right"
            >0/${t}</span>
          </div>
          <textarea
            class="sp-input sp-context"
            id="vd-note"
            data-part="input"
            rows="3"
            spellcheck="false"
            aria-describedby="vd-note-remaining"
            style="height: 68px; resize: none; line-height: 1.5"
          ></textarea>
          <span class="sp-visually-hidden" id="vd-note-remaining" data-stage-announce data-part="announcement" role="status"></span>
        </div>
        <div class="sp-row sp-row--between sp-context" style="margin-top: 14px">
          <button class="sp-button" data-part="post" type="button">Post note</button>
          <span class="sp-text">Visible to your team</span>
        </div>
      </div>
    </div>
  `;let o=e(i,`input`),s=e(i,`counter`),c=e(i,`announcement`);s.textContent=`${t}/${t}`,s.style.minWidth=`${s.offsetWidth}px`,s.textContent=`0/${t}`;let l;o.addEventListener(`input`,()=>{o.value.length>t&&(o.value=o.value.slice(0,t));let e=o.value.length,i=t-e;s.textContent=`${e}/${t}`,s.dataset.state=i<=n?`warn`:`ok`,s.style.color=i<=n?`var(--sp-warn)`:``,a.clearTimeout(l),l=a.setTimeout(()=>{c.textContent=i===0?`No characters remaining`:`${i} characters remaining`},r)})}export{i as mount};