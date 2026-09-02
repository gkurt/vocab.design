import{n as e}from"./parts.C-YLuC7Q.js";var t=700,n={empty:`Use a phrase you can remember.`,weak:`Weak. Add a few more words.`,fair:`Fair. Length helps more than symbols do.`,strong:`Strong. Nothing else needed.`},r={empty:0,weak:30,fair:62,strong:100};function i(e){if(e===``)return`empty`;let t=[/[a-z]/,/[A-Z]/,/[0-9]/,/[^a-zA-Z0-9]/].filter(t=>t.test(e)).length,n=0;return e.length>=6&&n++,e.length>=10&&n++,t>=2&&n++,t>=3&&e.length>=12&&n++,n>=4?`strong`:n>=2?`fair`:`weak`}function a(a,o){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 300px">
        <div class="sp-heading sp-context">Choose a password</div>
        <div class="sp-field sp-context" style="margin-top: 14px">
          <label class="sp-label" for="vd-pw">Password</label>
          <input
            class="sp-input"
            id="vd-pw"
            data-part="input"
            type="password"
            autocomplete="off"
            spellcheck="false"
            aria-describedby="vd-pw-reading"
          />
        </div>
        <div class="sp-stack" data-part="meter" data-subject data-strength="empty" style="margin-top: 10px; gap: 6px">
          <div class="sp-progress sp-progress--meter" data-part="bar" data-zone="ok" style="--sp-value: 0%">
            <div class="sp-progress-fill"></div>
          </div>
          <div data-part="slot">
            <span class="sp-text" id="vd-pw-reading" data-part="reading">${n.empty}</span>
          </div>
        </div>
        <div class="sp-row sp-context" style="margin-top: 14px">
          <button class="sp-button" data-part="submit" type="button">Create account</button>
        </div>
        <span class="sp-visually-hidden" data-stage-announce data-part="announcement" role="status"></span>
      </div>
    </div>
  `;let s=e(a,`meter`),c=e(a,`bar`),l=e(a,`slot`),u=e(a,`reading`),d=e(a,`input`),f=e(a,`announcement`),p=0;for(let e of Object.values(n))u.textContent=e,p=Math.max(p,l.offsetHeight);l.style.height=`${p}px`,u.textContent=n.empty;let m;d.addEventListener(`input`,()=>{let e=i(d.value);s.dataset.strength=e,c.style.setProperty(`--sp-value`,`${r[e]}%`),c.dataset.zone=e===`weak`?`warn`:`ok`,u.textContent=n[e],o.clearTimeout(m),m=o.setTimeout(()=>{f.textContent=e===`empty`?``:`Password strength: ${e}`},t)})}export{a as mount};