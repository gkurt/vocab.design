import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=700,r=76,i=`display: flex; flex-direction: column; gap: 6px; flex: 1 1 0; padding: 8px 10px`;function a(a,o){let s=(e,t,n)=>`
    <div class="sp-surface${n?``:` sp-context`}" data-part="${e}" data-fired="0"${n?` data-subject`:``} style="${i}">
      <div class="sp-row sp-row--between">
        <span class="sp-label">${t}</span>
        <span class="sp-text" data-part="count-${e}" style="width: 62px; text-align: right">0 calls</span>
      </div>
      <div class="sp-scroll sp-stack" data-part="log-${e}" style="height: ${r}px; gap: 3px"></div>
    </div>`;a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 258px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Search cities</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 12px">
          <div class="sp-row sp-context" style="gap: 8px">
            ${t(`search`)}
            <input class="sp-input" data-part="query" type="text" aria-label="Search cities" placeholder="Type a city" />
          </div>
          <div class="sp-row" style="align-items: stretch; gap: 10px">
            ${s(`eager`,`Every keystroke`,!1)}
            ${s(`debounced`,`Debounced ${n} ms`,!0)}
          </div>
        </div>
      </div>
    </div>
  `;let c=e(a,`query`),l,u=(t,n)=>{let r=e(a,t),i=Number(r.dataset.fired??`0`)+1;r.dataset.fired=String(i),e(a,`count-${t}`).textContent=`${i} call${i===1?``:`s`}`;let o=document.createElement(`span`);o.className=`sp-text`,o.style.fontSize=`12px`,o.textContent=`q=${n}`;let s=e(a,`log-${t}`);s.append(o),s.scrollTop=s.scrollHeight};c.addEventListener(`input`,()=>{let e=c.value.trim();e!==``&&(u(`eager`,e),o.clearTimeout(l),l=o.setTimeout(()=>{l=void 0,u(`debounced`,e)},n))})}export{a as mount};