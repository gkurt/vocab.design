import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=1600,i=60,a=`g`,o=[{key:`inbox`,name:`Inbox`,letter:`i`,glyph:`inbox`},{key:`starred`,name:`Starred`,letter:`s`,glyph:`star`},{key:`drafts`,name:`Drafts`,letter:`d`,glyph:`pencil`}],s=`drafts`;function c(c,l){c.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 254px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Mail</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div
            class="sp-surface"
            data-part="sequence"
            data-subject
            data-state="idle"
            style="display: flex; flex-direction: column; gap: 8px; padding: 10px 12px"
          >
            <div class="sp-row" style="gap: 8px">
              <span class="sp-kbd" data-part="chip-lead" style="min-width: 22px">${a}</span>
              <span class="sp-label" style="font-size: 11px">then</span>
              <span class="sp-kbd" data-part="chip-next" style="min-width: 22px">?</span>
              <span class="sp-grow"></span>
              <span
                class="sp-text sp-text--ink"
                data-part="verdict"
                style="width: 246px; text-align: right; white-space: nowrap; font-size: 12px"
              >No sequence started</span>
            </div>
            <div class="sp-progress" data-part="meter" style="--sp-value: 0%">
              <div class="sp-progress-fill" style="transition: width ${i}ms linear"></div>
            </div>
          </div>
          <div class="sp-row sp-context" style="gap: 8px">${o.map(({key:e,name:t,letter:r,glyph:i})=>`
      <span
        class="sp-nav-item"
        data-part="nav-${e}"
        ${e===s?`data-current`:``}
        style="display: flex; align-items: center; gap: 8px; width: 138px"
      >
        ${n(i)}
        <span class="sp-grow">${t}</span>
        <span class="sp-kbd" style="font-size: 10px">${a} ${r}</span>
      </span>`).join(``)}</div>
          <div class="sp-stack sp-context sp-grow" data-part="pane" style="gap: 6px; justify-content: center">
            <span class="sp-label" data-part="pane-title" style="font-size: 11px">Drafts, 2 conversations</span>
            <span class="sp-line" style="width: 70%"></span>
            <span class="sp-line" style="width: 52%"></span>
          </div>
        </div>
      </div>
    </div>
  `;let u=e(c,`sequence`),d=e(c,`chip-lead`),f=e(c,`chip-next`),p=e(c,`verdict`),m=e(c,`meter`),h=e(c,`pane-title`),g,_=0,v=!1,y=s,b=(e,t)=>{u.dataset.state=e,p.textContent=t},x=e=>{d.style.borderColor=e?`var(--sp-accent)`:``,d.style.color=e?`var(--sp-ink)`:``,d.style.background=e?`var(--sp-accent-soft)`:``},S=e=>{m.style.setProperty(`--sp-value`,`${Math.max(0,Math.min(1,e))*100}%`)},C=()=>{l.clearTimeout(g),g=void 0,v=!1,_=0,x(!1),S(0)},w=()=>{if(_-=i,S(_/r),_>0){g=l.setTimeout(w,i);return}C(),f.textContent=`?`,b(`expired`,`${a} expired after ${r/1e3} s, nothing ran`)},T=()=>{C(),v=!0,_=r,x(!0),f.textContent=`?`,S(1),b(`pending`,`${a} is pending, waiting for the next key`),g=l.setTimeout(w,i)},E=(n,r,i)=>{y=n;for(let n of o)t(e(c,`nav-${n.key}`),`data-current`,n.key===y);h.textContent=`${i}, 2 conversations`,f.textContent=r,b(`done`,`${a} ${r} completed: ${i}`)};c.addEventListener(`keydown`,e=>{let t=e.key.toLowerCase();if(!v){if(t===a)return T();o.find(e=>e.letter===t)&&b(`stray`,`${t} alone is not a shortcut here`);return}C();let n=o.find(e=>e.letter===t);if(n)return E(n.key,n.letter,n.name);if(f.textContent=`?`,t===`escape`)return b(`cancelled`,`${a} cancelled by Escape`);b(`miss`,`${a} ${t} is not a sequence, cancelled`)})}export{c as mount};