import{n as e}from"./parts.C-YLuC7Q.js";function t(t){t.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 428px">
        <span class="sp-heading sp-context">Delivery details</span>
        <div class="sp-row" style="align-items: flex-start; gap: 14px; margin-top: 12px">
          <div class="sp-field sp-grow" style="flex-basis: 0">
            <span class="sp-label" aria-hidden="true">&nbsp;</span>
            <input class="sp-input" data-part="ghost-field" data-subject data-state="empty" placeholder="Email address" />
          </div>
          <div class="sp-field sp-grow sp-context" style="flex-basis: 0">
            <label class="sp-label" for="vd-labelled-field" data-part="fixed-label">Email address</label>
            <input class="sp-input" id="vd-labelled-field" data-part="fixed-field" data-state="empty" placeholder="you@example.com" />
          </div>
        </div>
      </div>
    </div>
  `;let n=e(t,`ghost-field`),r=e(t,`fixed-field`);n.addEventListener(`input`,()=>{n.dataset.state=n.value.length>0?`filled`:`empty`}),r.addEventListener(`input`,()=>{r.dataset.state=r.value.length>0?`filled`:`empty`})}export{t as mount};