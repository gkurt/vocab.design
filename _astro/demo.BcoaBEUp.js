import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[`inbox`,`flagged`,`archive`],r={inbox:{name:`Inbox`,messages:[{from:`Marta Vinck`,subject:`Berth confirmation`,body:[`94%`,`78%`,`88%`,`64%`]},{from:`Harbour office`,subject:`Dues for March`,body:[`86%`,`92%`,`70%`,`80%`]},{from:`Iwan Pryce`,subject:`Crane booking`,body:[`90%`,`66%`,`84%`,`58%`]}]},flagged:{name:`Flagged`,messages:[{from:`Lock keeper`,subject:`Gate closed Tuesday`,body:[`88%`,`72%`,`92%`,`60%`]},{from:`Marta Vinck`,subject:`Winter lift out`,body:[`76%`,`90%`,`68%`,`86%`]},{from:`Chandlery`,subject:`Part on order`,body:[`92%`,`64%`,`80%`,`74%`]}]},archive:{name:`Archive`,messages:[{from:`Harbour office`,subject:`Dues for February`,body:[`84%`,`88%`,`62%`,`90%`]},{from:`Sail loft`,subject:`Main repaired`,body:[`70%`,`94%`,`78%`,`66%`]},{from:`Iwan Pryce`,subject:`Mooring swap`,body:[`96%`,`68%`,`82%`,`72%`]}]}},i=[0,1,2],a=`overflow: hidden; text-overflow: ellipsis; white-space: nowrap`;function o(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Mail</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 16px">
          <div
            data-part="shell"
            data-subject
            style="display: grid; grid-template-columns: 104px 156px 1fr; width: 444px; height: 203px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius); overflow: hidden"
          >
            <div style="display: flex; flex-direction: column; gap: 8px; padding: 8px; border-right: 1px solid var(--sp-line); background: var(--sp-sunken)">
              <span class="sp-label">Folders</span>
              <ul class="sp-nav">${n.map(e=>`<li><span class="sp-nav-item" data-part="folder-${e}"${e===`inbox`?` data-current`:``}>${r[e].name}</span></li>`).join(``)}</ul>
            </div>
            <div style="display: flex; flex-direction: column; min-width: 0; border-right: 1px solid var(--sp-line)">
              <span class="sp-label" data-part="list-header" style="flex: 0 0 auto; padding: 9px 10px 6px"></span>
              <ul class="sp-list" style="min-width: 0">${i.map(e=>`
      <li class="sp-list-item" data-part="row-${e}" style="align-items: flex-start; cursor: pointer">
        <span class="sp-stack sp-grow" style="gap: 2px">
          <span data-part="row-from-${e}" style="font-size: 12px; font-weight: 500; ${a}"></span>
          <span class="sp-label" data-part="row-subject-${e}" style="${a}"></span>
        </span>
      </li>`).join(``)}</ul>
            </div>
            <div data-part="reader" style="display: flex; flex-direction: column; gap: 7px; min-width: 0; padding: 12px">
              <span class="sp-heading" data-part="reader-subject" style="font-size: 14px; ${a}"></span>
              <span class="sp-label" data-part="reader-from" style="${a}"></span>
              <div class="sp-divider" style="margin: 2px 0"></div>
              ${[0,1,2,3].map(e=>`<div class="sp-line" data-part="body-${e}"></div>`).join(``)}
            </div>
          </div>
          <span class="sp-text sp-context" data-part="readout" style="flex: 0 0 auto; height: 22px; max-width: 442px; text-align: center; ${a}"></span>
        </div>
      </div>
    </div>
  `;let s=n.map(t=>({key:t,el:e(o,`folder-${t}`)})),c=i.map(t=>({el:e(o,`row-${t}`),from:e(o,`row-from-${t}`),subject:e(o,`row-subject-${t}`)})),l=[0,1,2,3].map(t=>e(o,`body-${t}`)),u=e(o,`list-header`),d=e(o,`reader-subject`),f=e(o,`reader-from`),p=e(o,`readout`),m=`inbox`,h=0,g=()=>{let e=r[m];for(let e of s)t(e.el,`data-current`,e.key===m);u.textContent=`${e.name} · ${e.messages.length} messages`,c.forEach((n,r)=>{let i=e.messages[r];i&&(t(n.el,`data-selected`,r===h),n.from.textContent=i.from,n.subject.textContent=i.subject)});let n=e.messages[h];n&&(d.textContent=n.subject,f.textContent=`${n.from} · to Harbour crew`,l.forEach((e,t)=>{e.style.width=n.body[t]??`80%`}),p.textContent=`${e.name} › ${n.from} › ${n.subject}`)};for(let e of s)e.el.addEventListener(`click`,()=>{m=e.key,h=0,g()});c.forEach((e,t)=>{e.el.addEventListener(`click`,()=>{h=t,g()})}),g()}export{o as mount};