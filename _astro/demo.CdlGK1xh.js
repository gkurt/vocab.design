import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=600,n={idle:`Offline. You can keep reading and writing.`,queued:`Offline. 1 queued, it sends on reconnect.`};function r(r,i){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Northwind crew</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">
          <div data-part="slot">
            <div class="sp-row sp-surface" data-part="pill" data-subject role="status" style="gap: 8px; padding: 6px 10px">
              <span class="sp-swatch sp-pulse" style="width: 8px; height: 8px; flex: 0 0 auto; --sp-swatch: var(--sp-warn)"></span>
              <span class="sp-text sp-text--ink sp-grow" data-part="pill-text">${n.idle}</span>
            </div>
          </div>
          <ul class="sp-list sp-scroll sp-context sp-grow" data-part="thread">
            <li class="sp-list-item"><span class="sp-avatar">R</span><span class="sp-grow">Boat is loaded</span><span class="sp-text">9:02</span></li>
            <li class="sp-list-item"><span class="sp-avatar">T</span><span class="sp-grow">See you at the dock</span><span class="sp-text">9:04</span></li>
          </ul>
        </div>
        <div class="sp-divider"></div>
        <div class="sp-row sp-context" style="flex: 0 0 auto; padding: 10px 12px; gap: 8px">
          <input class="sp-input" data-part="composer" type="text" spellcheck="false" aria-label="Message" placeholder="Message" />
          <button class="sp-button sp-button--sm" data-part="send" type="button">Send</button>
        </div>
      </div>
      <sp-segmented data-stage-mode class="sp-segmented sp-context" data-part="net" data-value="online" data-axis="Network">
        <button class="sp-segment" data-part="net-online" value="online">Online</button>
        <button class="sp-segment" data-part="net-offline" value="offline">Offline</button>
      </sp-segmented>
    </div>
  `;let a=e(r,`pill`),o=e(r,`pill-text`),s=e(r,`thread`),c=e(r,`composer`),l=e=>{a.style.visibility=e?`visible`:`hidden`};l(!1);let u=!0,d,f=()=>{l(!u),o.textContent=d?n.queued:n.idle},p=()=>{if(d)return;let t=c.value.trim()||`On my way`;c.value=``,s.insertAdjacentHTML(`beforeend`,`<li class="sp-list-item" data-part="queued" data-pending>
         <span class="sp-avatar">Y</span>
         <span class="sp-grow">${t}</span>
         <span class="sp-text sp-pending" data-part="queued-mark">Queued</span>
       </li>`),d=e(r,`queued`),s.scrollTop=s.scrollHeight,f()},m=n=>{u=n===`online`,f(),!(!u||!d)&&i.setTimeout(()=>{let t=d;if(!t)return;t.removeAttribute(`data-pending`),t.dataset.part=`sent`;let n=e(t,`queued-mark`);n.className=`sp-text`,n.textContent=`Sent`,d=void 0,f()},t)};e(r,`send`).addEventListener(`click`,p),e(r,`net`).addEventListener(`change`,e=>m(e.detail))}export{r as mount};