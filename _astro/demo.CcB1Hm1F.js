import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=[{key:`payout`,title:`Receive your first payout`,section:`Payments`},{key:`refund`,title:`What to do if you did not receive a refund`,section:`Refunds`},{key:`alerts`,title:`Receive email notifications`,section:`Notifications`},{key:`invoice`,title:`Download an invoice`,section:`Billing`},{key:`transfer`,title:`Transfer a subscription`,section:`Account`}],r=[...new Set(n.flatMap(e=>e.title.toLowerCase().split(/[\s,]+/)))].filter(e=>e.length>3);function i(e,t){let n=Array.from({length:t.length+1},(e,t)=>t);for(let r=1;r<=e.length;r++){let i=[r];for(let a=1;a<=t.length;a++){let o=e[r-1]===t[a-1]?0:1;i[a]=Math.min((i[a-1]??0)+1,(n[a]??0)+1,(n[a-1]??0)+o)}n=i}return n[t.length]??t.length}function a(e){let t,n=3;for(let a of r){let r=i(e,a);r<n&&(t=a,n=r)}return t}var o=e=>n.filter(t=>e.length>0&&t.title.toLowerCase().includes(e));function s(r){let i=n.map(e=>`
      <li class="sp-list-item" data-part="hit-${e.key}" hidden style="border-top: 0; border-radius: 6px">
        <span class="sp-text sp-text--ink sp-grow" style="min-width: 0">${e.title}</span>
        <span class="sp-label">${e.section}</span>
      </li>`).join(``);r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 286px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Help centre</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-row sp-context" style="gap: 8px">
            ${t(`search`)}
            <input class="sp-input" data-part="query" type="text" spellcheck="false" aria-label="Search the help centre" placeholder="Search the help centre" />
          </div>
          <div
            class="sp-row sp-surface"
            data-part="strip"
            data-subject
            data-mode="none"
            role="status"
            style="flex: 0 0 auto; min-height: 34px; gap: 10px; padding: 0 10px; opacity: 0; transition: opacity 0.16s var(--sp-ease)"
          >
            <span class="sp-text sp-grow" data-part="strip-text" style="min-width: 0"></span>
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="literal" type="button" hidden>Search instead</button>
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="suggest" type="button" hidden>Did you mean</button>
          </div>
          <div class="sp-surface sp-context sp-grow" style="position: relative; min-height: 0; padding: 4px; overflow: hidden">
            <ul class="sp-list" data-part="results" style="margin: 0; padding: 0">${i}</ul>
            <span class="sp-text" data-part="empty" hidden style="display: block; padding: 10px">Type a word to search the help centre.</span>
          </div>
        </div>
      </div>
    </div>
  `;let s=e(r,`query`),c=e(r,`strip`),l=e(r,`strip-text`),u=e(r,`literal`),d=e(r,`suggest`),f=e(r,`empty`),p=`none`,m=()=>{let t=s.value.trim(),i=t.toLowerCase(),m=o(i),h=m.length===0&&i.length>3?a(i):void 0;h===void 0?p=`none`:p===`none`&&(p=`corrected`);let g=p===`corrected`&&h?h:t,_=p===`corrected`&&h?o(h):m;for(let t of n)e(r,`hit-${t.key}`).hidden=!_.includes(t);if(f.hidden=_.length>0,f.textContent=i.length===0?`Type a word to search the help centre.`:`No pages match “${t}”.`,c.dataset.mode=p,c.style.opacity=p===`none`?`0`:`1`,u.hidden=p!==`corrected`,d.hidden=p!==`literal`,h===void 0){l.textContent=``;return}l.innerHTML=`${p===`corrected`?`Showing results for`:`Results for`} <span style="font-weight: 600; color: var(--sp-ink)">${g}</span>`,u.textContent=`Search instead for ${t}`,d.textContent=`Did you mean ${h}?`};s.addEventListener(`input`,()=>{p=`none`,m()}),u.addEventListener(`click`,()=>{p=`literal`,m()}),d.addEventListener(`click`,()=>{p=`corrected`,m()}),m()}export{s as mount};