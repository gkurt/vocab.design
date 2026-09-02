import{n as e,t}from"./parts.C-YLuC7Q.js";var n=3200,r=`Six at the ferry office, then`;function i(i,a){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-avatar">PR</span>
          <span class="sp-heading sp-grow">Priya Rana</span>
        </div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 10px">
          <ul class="sp-list sp-scroll sp-surface sp-grow" data-part="thread" style="padding: 0 4px">
            <li class="sp-list-item"><span class="sp-grow">Are we still on for tonight?</span><span class="sp-text">9:02</span></li>
            <li class="sp-list-item"><span class="sp-grow">The tide turns at seven</span><span class="sp-text">9:04</span></li>
          </ul>
          <div class="sp-row" style="flex: 0 0 auto">
            <input class="sp-input" data-part="composer" type="text" spellcheck="false" aria-label="Message" value="${r}" />
            <button class="sp-button sp-button--sm" data-part="send" type="button">Send</button>
          </div>
        </div>
        <div class="sp-toast" data-part="toast" data-subject role="status" style="bottom: 56px">
          <span class="sp-grow" data-part="toast-text">Message sent</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="undo" type="button">Undo</button>
        </div>
      </div>
    </div>
  `;let o=e(i,`thread`),s=e(i,`composer`),c=e(i,`toast`),l=e(i,`toast-text`),u,d;e(i,`send`).addEventListener(`click`,()=>{if(d)return;let f=s.value.trim()||r;s.value=``,o.insertAdjacentHTML(`beforeend`,`<li class="sp-list-item" data-part="outgoing">
         <span class="sp-grow">${f}</span>
         <span class="sp-text">Sent</span>
       </li>`);let p=e(i,`outgoing`);o.scrollTop=o.scrollHeight,d={row:p,text:f},l.textContent=`Message sent`,t(c,`data-open`,!0),a.clearTimeout(u),u=a.setTimeout(()=>{let e=d;d=void 0,t(c,`data-open`,!1),e&&(e.row.dataset.part=`delivered`)},n)}),e(i,`undo`).addEventListener(`click`,()=>{let e=d;e&&(a.clearTimeout(u),d=void 0,t(c,`data-open`,!1),e.row.remove(),s.value=e.text)})}export{i as mount};