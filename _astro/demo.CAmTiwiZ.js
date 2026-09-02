import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[{key:`inbox`,label:`Inbox`,blurb:`12 conversations`},{key:`settings`,label:`Settings`,blurb:`Signature, filters, forwarding`},{key:`archive`,label:`Archive`,blurb:`Everything older than a year`}],r=`Mail`,i=1400,a=2;function o(o,s){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 216px">
        <div class="sp-topbar" style="gap: 6px; padding: 8px 10px; background: var(--sp-sunken)">
          <div class="sp-surface" data-part="tab"
               style="display: flex; align-items: center; gap: 8px; width: 176px; padding: 5px 9px">
            <span aria-hidden="true" style="flex: 0 0 auto; width: 8px; height: 8px; border-radius: 2px; background: var(--sp-accent)"></span>
            <span class="sp-text sp-text--ink" data-part="tab-title" data-subject data-page="inbox"
                  style="font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">Inbox, ${r}</span>
          </div>
          <div class="sp-surface sp-context"
               style="display: flex; align-items: center; gap: 8px; width: 122px; padding: 5px 9px; opacity: 0.7">
            <span aria-hidden="true" style="flex: 0 0 auto; width: 8px; height: 8px; border-radius: 2px; background: var(--sp-muted)"></span>
            <span class="sp-text" style="font-size: 12px; white-space: nowrap">Notes, Studio</span>
          </div>
        </div>

        <div class="sp-row sp-context" style="flex: 1 1 auto; min-height: 0; align-items: stretch; gap: 0">
          <nav aria-label="Mail" style="flex: 0 0 auto; width: 140px; padding: 10px; border-right: 1px solid var(--sp-line)">
            <ul class="sp-nav">
              ${n.map(({key:e,label:t})=>`
                <li>
                  <span class="sp-nav-item" data-part="nav-${e}" role="link" tabindex="0"
                        style="display: flex; align-items: center; justify-content: space-between; gap: 8px">
                    <span>${t}</span>
                    <span data-part="badge-${e}" style="visibility: hidden; font-size: 11px; font-weight: 600">${a}</span>
                  </span>
                </li>`).join(``)}
            </ul>
          </nav>
          <div class="sp-body sp-grow">
            <span class="sp-heading" data-part="pane-title" style="font-size: 14px">Inbox</span>
            <p class="sp-text" data-part="pane-blurb" style="margin: 3px 0 0; font-size: 12px">12 conversations</p>
            <div class="sp-stack" style="margin-top: 10px; gap: 7px">
              <span class="sp-line" style="width: 86%"></span>
              <span class="sp-line" style="width: 72%"></span>
              <span class="sp-line" style="width: 79%"></span>
            </div>
          </div>
        </div>
      </div>

      <p class="sp-text sp-text--ink" data-stage-announce data-part="heard"
         style="margin: 0; height: 18px; font-size: 12px; white-space: nowrap"></p>
    </div>
  `;let c=e(o,`tab-title`),l=e(o,`pane-title`),u=e(o,`pane-blurb`),d=e(o,`heard`),f=`inbox`,p=0,m,h=()=>{let i=n.find(e=>e.key===f)??n[0],a=i?.label??`Inbox`,s=`${p>0?`(${p}) `:``}${a}, ${r}`;c.textContent=s,c.dataset.page=f,t(c,`data-unread`,p>0),d.textContent=`“${s}”`,l.textContent=a,u.textContent=i?.blurb??``;for(let{key:r}of n)t(e(o,`nav-${r}`),`data-current`,r===f),e(o,`badge-${r}`).style.visibility=r===`inbox`&&p>0?`visible`:`hidden`},g=e=>{f=e,e===`inbox`?p=0:(s.clearTimeout(m),m=s.setTimeout(()=>{p=a,h()},i)),h()};h();for(let{key:t}of n)e(o,`nav-${t}`).addEventListener(`click`,()=>g(t))}export{o as mount};