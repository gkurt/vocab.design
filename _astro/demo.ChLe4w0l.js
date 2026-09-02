import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=`#d92d20`,i=[{id:`name`,label:`Full name`,value:``,message:`Enter your full name`},{id:`email`,label:`Email address`,value:`priya.rana`,message:`Enter an email address, like ada@example.com`}],a=/^[^@\s]+@[^@\s]+\.[^@\s]+$/,o=[`appearance: none; border: 0; padding: 0; background: none; font: inherit; font-size: 12px`,`color: ${r}; text-decoration: underline; text-underline-offset: 2px; text-align: left; cursor: pointer`].join(`; `);function s(e){return e.map(({id:e,message:t})=>`<li><button class="sp-button--quiet" data-part="link-${e}" data-field="${e}" type="button" style="${o}">${t}</button></li>`).join(``)}function c(o){let c=i.map(({id:e,label:t,value:i,message:a})=>`
      <div class="sp-field sp-context" data-part="field-${e}" style="flex: 1 1 0; min-width: 0">
        <label class="sp-label" for="vd-es-${e}">${t}</label>
        <input class="sp-input" id="vd-es-${e}" data-part="input-${e}" type="text" spellcheck="false" value="${i}" />
        <span class="sp-row" data-part="msg-${e}" style="gap: 6px; align-items: flex-start; visibility: hidden">
          <span style="color: ${r}; display: flex; padding-top: 1px">${n(`alert`)}</span>
          <span class="sp-text sp-text--ink" style="font-size: 12px">${a}</span>
        </span>
      </div>`).join(``);o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 428px; padding: 14px 18px">
        <div data-part="slot">
          <div
            class="sp-surface"
            data-part="summary"
            data-subject
            role="alert"
            tabindex="-1"
            style="padding: 8px 10px; border-color: ${r}; box-shadow: inset 3px 0 0 0 ${r}"
          >
            <span class="sp-row" style="gap: 6px">
              <span style="color: ${r}; display: flex">${n(`alert`)}</span>
              <span class="sp-heading" style="font-size: 13px">There is a problem</span>
            </span>
            <ul class="sp-stack" data-part="entries" style="gap: 3px; margin: 5px 0 0; padding: 0 0 0 22px; list-style: none"></ul>
          </div>
          <div class="sp-row sp-surface sp-context" data-part="success" role="status" style="gap: 8px; padding: 8px 10px" hidden>
            ${n(`check`)}
            <span class="sp-text sp-text--ink">Mooring application sent</span>
          </div>
        </div>
        <div class="sp-row" style="gap: 14px; align-items: flex-start; margin-top: 12px">
          ${c}
        </div>
        <div class="sp-row sp-context" style="margin-top: 12px">
          <button class="sp-button sp-button--sm" data-part="submit" type="button">Send application</button>
        </div>
      </div>
    </div>
  `;let l=e(o,`slot`),u=e(o,`summary`),d=e(o,`success`),f=e(o,`entries`),p=new Map(i.map(t=>[t.id,e(o,`input-${t.id}`)])),m=()=>i.filter(({id:e})=>{let t=p.get(e)?.value.trim()??``;return e===`email`?!a.test(t):t.length===0});f.innerHTML=s(i),l.style.height=`${l.offsetHeight}px`,u.hidden=!0;let h=e=>{for(let[n,r]of p)t(r,`data-sim-focus`,n===e)};f.addEventListener(`click`,e=>{let t=e.target.closest(`[data-field]`)?.dataset.field;t&&h(t)}),e(o,`submit`).addEventListener(`click`,()=>{let t=m();for(let{id:n}of i)e(o,`msg-${n}`).style.visibility=t.some(e=>e.id===n)?`visible`:`hidden`;f.innerHTML=s(t),u.hidden=t.length===0,d.hidden=t.length>0,t.length===0&&h(``)})}export{c as mount};