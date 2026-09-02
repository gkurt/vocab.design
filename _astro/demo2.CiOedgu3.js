import{n as e}from"./parts.C-YLuC7Q.js";import"./combobox.9HjM0ItI.js";var t=[`Manchester`,`Margate`,`Maidstone`,`Birmingham`,`Bristol`,`Cardiff`,`Dover`,`Norwich`,`Salisbury`,`York`],n=`background: var(--sp-accent-soft); border-radius: 3px; font-weight: 600`;function r(e){return e.toLowerCase()}function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="height: 250px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Departures</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <sp-combobox data-part="field" data-subject>
            <input class="sp-input" data-part="query" type="text" spellcheck="false" aria-label="Station" placeholder="Search stations" />
            <ul class="sp-listbox" data-part="suggestions">
              ${t.map(e=>`<li class="sp-option" data-part="opt-${r(e)}" data-label="${e}">${e}</li>`).join(``)}
            </ul>
          </sp-combobox>
          <div class="sp-row sp-surface" data-part="result" style="flex: 0 0 auto; gap: 8px; padding: 8px 10px">
            <span class="sp-text" data-part="result-text">No station chosen</span>
          </div>
          <span class="sp-label sp-context" data-stage-verdict data-part="hint" role="status">Type two letters, then pick from what came back.</span>
        </div>
      </div>
    </div>
  `;let a=e(i,`query`),o=e(i,`field`),s=e(i,`result`),c=e(i,`result-text`),l=e(i,`hint`),u=[...i.querySelectorAll(`.sp-option`)];s.style.height=`${s.offsetHeight}px`;let d=()=>a.value.trim().toLowerCase(),f=()=>{let e=d();for(let t of u){let r=t.dataset.label??``,i=e?r.toLowerCase().indexOf(e):-1;if(i<0){t.textContent=r;continue}t.innerHTML=`${r.slice(0,i)}<span style="${n}">${r.slice(i,i+e.length)}</span>${r.slice(i+e.length)}`}},p=()=>u.filter(e=>!e.hidden).length;a.addEventListener(`input`,()=>{f();let e=d();if(e.length===0){l.textContent=`Type two letters, then pick from what came back.`;return}let t=p();l.textContent=t===0?`No stations match "${e}"`:`${t} station${t===1?``:`s`} match "${e}"`}),o.addEventListener(`select`,e=>{let t=e.detail;s.dataset.chosen=r(t),c.className=`sp-text sp-text--ink`,c.textContent=`Departures from ${t}`})}export{i as mount};