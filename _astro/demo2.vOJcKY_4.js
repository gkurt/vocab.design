import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=`#d2453b`,r=/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/,i={pristine:`Nothing checked yet.`,invalid:`Submit checked every field, and holds until it is fixed.`,ready:`The field is valid again, so submit has re-armed.`,sent:`One action committed the whole set.`},a=[{name:`name`,label:`Full name`,hint:`As it appears on your card.`,error:`Enter your full name.`,ok:e=>e.trim().length>1},{name:`email`,label:`Email address`,hint:`The receipt goes here.`,error:`Use the format name@example.com`,ok:e=>r.test(e.trim())}],o=`display: block; height: 14px; font-size: 11px; line-height: 14px; overflow: hidden`,s=e=>`
  <div class="sp-field" data-part="field-${e.name}" data-state="pristine" style="gap: 3px">
    <div class="sp-row sp-row--between" style="gap: 12px">
      <label class="sp-label" for="vd-form-${e.name}" style="color: var(--sp-ink)">
        ${e.label} <span aria-hidden="true" style="color: ${n}">*</span><span class="sp-visually-hidden">required</span>
      </label>
      <span class="sp-label" style="font-size: 11px">${e.hint}</span>
    </div>
    <input
      class="sp-input"
      id="vd-form-${e.name}"
      data-part="${e.name}"
      type="text"
      autocomplete="off"
      spellcheck="false"
      aria-describedby="vd-form-${e.name}-error"
    />
    <span id="vd-form-${e.name}-error" style="${o}">
      <span data-part="${e.name}-error" style="color: ${n}" hidden></span>
    </span>
  </div>`;function c(r){r.innerHTML=`
    <div class="sp-app">
      <form
        class="sp-window"
        data-part="form"
        data-subject
        data-state="pristine"
        novalidate
        aria-labelledby="vd-form-title"
        style="width: 434px; padding: 12px 16px"
      >
        <h2 id="vd-form-title" class="sp-heading" style="margin: 0; font-size: 14px">Create your account</h2>
        <div class="sp-stack" style="margin-top: 10px; gap: 8px">
          ${a.map(s).join(``)}
        </div>
        <div class="sp-row sp-row--between" style="margin-top: 12px; gap: 12px">
          <span class="sp-label" style="font-size: 11px"><span aria-hidden="true" style="color: ${n}">*</span> required</span>
          <button class="sp-button sp-button--sm" type="button" data-part="submit">Create account</button>
        </div>
      </form>
      <div class="sp-row sp-context" style="width: 434px; gap: 12px">
        <span class="sp-text" data-part="status" style="flex: 1 1 auto; min-width: 0; ${o}"></span>
        <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="clear" style="flex: 0 0 auto">Start over</button>
      </div>
    </div>
  `;let c=e(r,`form`),l=e(r,`status`),u=e(r,`submit`),d=a.map(t=>[t,e(r,t.name)]),f=e=>{c.dataset.state=e,l.textContent=i[e]??``},p=(i,a)=>{let o=e(r,`field-${i.name}`),s=e(r,i.name),c=e(r,`${i.name}-error`);o.dataset.state=a?`invalid`:`ok`,s.style.borderColor=a?n:``,s.setAttribute(`aria-invalid`,String(a)),c.hidden=!a,c.innerHTML=a?`${t(`alert`).replace(`<svg `,`<svg style="display: inline-block; width: 11px; height: 11px; vertical-align: -1px; margin-right: 3px" `)}${i.error}`:``},m=()=>{let e=!1;for(let[t,n]of d){let r=!t.ok(n.value);p(t,r),e||=r}return e},h=!1;u.addEventListener(`click`,()=>{if(u.getAttribute(`aria-disabled`)!==`true`){if(h=!0,m()){u.setAttribute(`aria-disabled`,`true`),f(`invalid`);return}f(`sent`)}});for(let[,e]of d)e.addEventListener(`input`,()=>{if(!h)return;let e=m();e?u.setAttribute(`aria-disabled`,`true`):u.removeAttribute(`aria-disabled`),f(e?`invalid`:`ready`)});e(r,`clear`).addEventListener(`click`,()=>{h=!1;for(let[t,n]of d){n.value=``,e(r,`field-${t.name}`).dataset.state=`pristine`,n.style.borderColor=``,n.removeAttribute(`aria-invalid`);let i=e(r,`${t.name}-error`);i.hidden=!0,i.textContent=``}u.removeAttribute(`aria-disabled`),f(`pristine`)}),f(`pristine`)}export{c as mount};