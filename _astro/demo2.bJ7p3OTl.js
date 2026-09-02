import{n as e,t}from"./parts.C-YLuC7Q.js";var n=4,r=`Enter the code to continue`,i=`Code complete`;function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 300px">
        <div class="sp-heading sp-context">Confirm it is you</div>
        <p class="sp-text sp-context" style="margin: 6px 0 0">We sent a 4 digit code to ada@example.com</p>
        <div
          class="sp-row"
          data-part="group"
          data-subject
          role="group"
          aria-label="Verification code"
          style="margin-top: 14px; justify-content: space-between"
        >${Array.from({length:n},(e,t)=>`
      <input
        class="sp-input"
        data-part="cell-${t+1}"
        type="text"
        inputmode="numeric"
        autocomplete="${t===0?`one-time-code`:`off`}"
        aria-label="Digit ${t+1} of ${n}"
        style="width: 46px; height: 52px; padding: 0; text-align: center; font-size: 20px; font-variant-numeric: tabular-nums"
      />`).join(``)}</div>
        <div data-part="status-slot" style="margin-top: 12px">
          <span class="sp-text sp-context" data-part="status" data-state="waiting" role="status">${r}</span>
        </div>
      </div>
    </div>
  `;let o=Array.from({length:n},(t,n)=>e(a,`cell-${n+1}`)),s=e(a,`status`),c=e(a,`status-slot`),l=0;for(let e of[r,i])s.textContent=e,l=Math.max(l,c.offsetHeight);s.textContent=r,c.style.height=`${l}px`;let u=e=>{o.forEach((n,r)=>{t(n,`data-filled`,n.value!==``),t(n,`data-active`,r===e),n.style.borderColor=r===e?`var(--sp-accent)`:``});let n=o.every(e=>e.value!==``);s.textContent=n?i:r,s.dataset.state=n?`complete`:`waiting`},d=()=>{let e=o.findIndex(e=>e.value===``);return e===-1?3:e},f=``,p=()=>{o.forEach((e,t)=>{e.value=f[t]??``}),u(d())};o.forEach((e,t)=>{e.addEventListener(`input`,r=>{let i=e.value.replace(/\D/g,``),a=f[t]??``,s=a&&i.startsWith(a)?i.slice(a.length):i;f=(f+s).slice(0,n),p(),r.isTrusted&&o[d()]?.focus()}),e.addEventListener(`keydown`,n=>{if(n.key===`Backspace`){n.preventDefault();let r=e.value===``?t-1:t;if(r<0)return;f=f.slice(0,r)+f.slice(r+1),p(),n.isTrusted&&o[r]?.focus();return}let r=n.key===`ArrowRight`?1:n.key===`ArrowLeft`?-1:0;if(r===0)return;n.preventDefault();let i=Math.min(Math.max(t+r,0),3);u(i),n.isTrusted&&o[i]?.focus()}),e.addEventListener(`pointerdown`,()=>u(t))}),u(0)}export{a as mount};