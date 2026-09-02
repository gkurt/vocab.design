import{n as e}from"./parts.C-YLuC7Q.js";var t=`max-width: 74%; padding: 7px 11px; font-size: 13px; line-height: 1.45`,n=`${t}; align-self: flex-start; border-radius: 12px 12px 12px 3px`,r=`${t}; align-self: flex-end; background: var(--sp-accent); color: var(--sp-accent-ink); border-color: var(--sp-accent); border-radius: 12px 12px 3px 12px`,i=(e,t,n=``)=>`<div class="sp-surface" ${n} style="${e}">${t}</div>`;function a(t){t.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="height: 260px">
        <div class="sp-topbar sp-context">
          <span class="sp-avatar">R</span>
          <span class="sp-heading sp-grow">Rosa Ibarra</span>
        </div>
        <div
          class="sp-body sp-scroll"
          data-part="thread"
          style="display: flex; flex-direction: column; gap: 8px; padding: 10px"
        >
          ${i(n,`Did the type ramp land?`)}
          ${i(r,`Merged this morning.`,`data-part="bubble-sent" data-subject`)}
          ${i(n,`Nice. Did the caption size move with it?`)}
        </div>
        <div class="sp-row sp-context" style="flex: 0 0 auto; gap: 8px; padding: 8px 10px; border-top: 1px solid var(--sp-line)">
          <input class="sp-input" data-part="composer-input" placeholder="Message" autocomplete="off" />
          <button class="sp-button sp-button--sm" data-part="send">Send</button>
        </div>
      </div>
    </div>
  `;let a=e(t,`thread`),o=e(t,`composer-input`);e(t,`send`).addEventListener(`click`,()=>{let e=o.value.trim();e&&(a.insertAdjacentHTML(`beforeend`,i(r,e,`data-part="bubble-new"`)),o.value=``,a.scrollTop=a.scrollHeight)})}export{a as mount};