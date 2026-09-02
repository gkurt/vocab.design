import{n as e}from"./parts.C-YLuC7Q.js";var t=[{key:`field-name`,id:`vd-fo-name`,label:`Full name`,stop:1},{key:`field-email`,id:`vd-fo-email`,label:`Email`,stop:2},{key:`field-phone`,id:`vd-fo-phone`,label:`Phone`,stop:3}],n=[{key:`field-city`,id:`vd-fo-city`,label:`City`,stop:1,order:3},{key:`field-postcode`,id:`vd-fo-postcode`,label:`Postcode`,stop:2,order:1},{key:`field-country`,id:`vd-fo-country`,label:`Country`,stop:3,order:2}];function r({key:e,id:t,label:n,stop:r,order:i}){return`
    <div class="sp-row" style="gap: 8px; align-items: flex-end${i?`; order: ${i}`:``}">
      <span aria-hidden="true"
            style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 18px; height: 18px;
                   border-radius: 50%; background: var(--sp-accent-soft); color: var(--sp-ink); font-size: 11px; font-weight: 600">${r}</span>
      <div class="sp-field sp-grow">
        <label class="sp-label" for="${t}">${n}</label>
        <input class="sp-input" id="${t}" data-part="${e}" data-stop="${r}" autocomplete="off" />
      </div>
    </div>`}function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row" style="align-items: flex-start; gap: 18px">
          <div class="sp-grow" data-part="ordered" data-subject>
            <span class="sp-label">Contact</span>
            <div class="sp-stack" style="margin-top: 8px; gap: 10px">${t.map(r).join(``)}</div>
          </div>
          <div class="sp-grow sp-context" data-part="reordered">
            <span class="sp-label">Address</span>
            <div class="sp-stack" style="margin-top: 8px; gap: 10px">${n.map(r).join(``)}</div>
          </div>
        </div>
      </div>
    </div>
  `;let a=t[0];a&&e(i,a.key).setAttribute(`data-sim-focus`,``)}export{i as mount};