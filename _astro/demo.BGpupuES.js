import{n as e}from"./parts.C-YLuC7Q.js";var t=`(___) ___-____`,n=`____ ____ ____ ____`,r=`font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 13px; line-height: 20px; letter-spacing: 0.02em`,i=e=>e.length===0?``:e.length<=3?`(${e}`:e.length<=6?`(${e.slice(0,3)}) ${e.slice(3)}`:`(${e.slice(0,3)}) ${e.slice(3,6)}-${e.slice(6)}`,a=e=>(e.match(/.{1,4}/g)??[]).join(` `),o=(e,t,n,i,a)=>`
  <div class="sp-field">
    <label class="sp-label sp-context" for="${n}">${t}</label>
    <div data-part="${e}-field" ${i?`data-subject`:``} data-state="empty" data-value="" style="position: relative">
      <span
        aria-hidden="true"
        data-part="${e}-ghost"
        style="position: absolute; inset: 0; padding: 7px 11px; color: var(--sp-muted);
               white-space: pre; pointer-events: none; ${r}"
      ></span>
      <input
        class="sp-input"
        id="${n}"
        data-part="${e}"
        type="text"
        inputmode="numeric"
        autocomplete="off"
        spellcheck="false"
        style="position: relative; background: transparent; ${r}"
      />
    </div>
    <span class="sp-label sp-context">${a}</span>
  </div>`;function s(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 324px">
        <div class="sp-heading sp-context">Delivery details</div>
        <div class="sp-stack" style="margin-top: 14px; gap: 14px">
          ${o(`phone`,`Mobile number`,`vd-mask-phone`,!0,`For delivery updates`)}
          ${o(`card`,`Card number`,`vd-mask-card`,!1,`Visa, Mastercard or Amex`)}
        </div>
      </div>
    </div>
  `;let s=(t,n,i,a,o)=>{let s=e(r,`${t}-field`),c=e(r,t),l=e(r,`${t}-ghost`),u=()=>{let e=c.value.replace(/\D/g,``).slice(0,a),t=i(e);c.value=t,l.innerHTML=`<span style="color: transparent">${t}</span>${n.slice(t.length)}`,s.dataset.value=t,s.dataset.state=e.length===0?`empty`:e.length===a?`complete`:`typing`};c.addEventListener(`input`,u),c.value=o,u()};s(`phone`,t,i,10,``),s(`card`,n,a,16,`4242424242`)}export{s as mount};