import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[{key:`mara`,name:`Mara Ito`,role:`Design`,initials:`MI`},{key:`marcus`,name:`Marcus Bell`,role:`Data`,initials:`MB`},{key:`maya`,name:`Maya Osei`,role:`Research`,initials:`MO`},{key:`priya`,name:`Priya Raman`,role:`Design`,initials:`PR`},{key:`tom`,name:`Tom Ferris`,role:`Support`,initials:`TF`}],r=/(^|\s)@([a-z]*)$/i,i=`background: var(--sp-accent-soft); border-color: transparent; color: var(--sp-ink); cursor: default`;function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 320px; height: 292px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Ramp tokens</span><span class="sp-label">4 replies</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-row sp-context" style="gap: 8px; align-items: flex-start">
            <span class="sp-avatar" style="width: 24px; height: 24px; font-size: 10px">JR</span>
            <span class="sp-text" style="flex: 1 1 auto">The greys are one step too warm at 600. Fine everywhere else.</span>
          </div>
          <div class="sp-row sp-context" style="gap: 8px; align-items: flex-start">
            <span class="sp-avatar" style="width: 24px; height: 24px; font-size: 10px">PK</span>
            <span class="sp-text" style="flex: 1 1 auto">Same reading here. Worth a second pair of eyes before we ship.</span>
          </div>

          <div data-part="mention" data-subject style="position: relative">
            <ul class="sp-listbox" data-part="list" role="listbox" aria-label="People on this thread"
                style="top: auto; bottom: calc(100% + 6px); max-height: 100px">${n.map(({key:e,name:t,role:n,initials:r})=>`
      <li class="sp-option" role="option" data-part="opt-${e}" data-key="${e}" aria-selected="false"
          style="display: flex; align-items: center; gap: 8px; padding: 5px 8px">
        <span class="sp-avatar" style="width: 20px; height: 20px; font-size: 9px">${r}</span>
        <span class="sp-grow">${t}</span>
        <span class="sp-label">${n}</span>
      </li>`).join(``)}</ul>
            <div class="sp-row sp-row--wrap" data-part="composer" style="align-items: center; align-content: flex-start; gap: 4px; height: 68px; padding: 8px 10px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 6px">
              <span class="sp-text sp-text--ink" data-part="lede">Agreed,</span>
              <input
                data-part="editor"
                type="text"
                autocomplete="off"
                spellcheck="false"
                aria-label="Write a reply"
                aria-expanded="false"
                style="flex: 1 1 96px; min-width: 96px; border: 0; padding: 0; background: transparent; color: var(--sp-ink); font: inherit; font-size: 13px"
              />
            </div>
          </div>

          <div class="sp-row sp-row--between sp-context" style="height: 30px">
            <span class="sp-label" data-stage-verdict data-part="hint" role="status" style="min-width: 0; overflow: hidden; white-space: nowrap">Type @ to bring someone in</span>
            <button class="sp-button sp-button--sm" type="button" data-part="send">Reply</button>
          </div>
        </div>
      </div>
    </div>
  `;let o=e(a,`mention`),s=e(a,`list`),c=e(a,`composer`),l=e(a,`editor`),u=e(a,`hint`),d=n.map(({key:t})=>e(a,`opt-${t}`)),f=()=>{t(s,`data-open`,!1),l.setAttribute(`aria-expanded`,`false`);for(let e of d)e.setAttribute(`aria-selected`,`false`)},p=()=>r.exec(l.value)?.[2]?.toLowerCase()??null,m=()=>{let e=p();if(e===null){u.textContent=`Type @ to bring someone in`,f();return}let r;for(let[t,i]of n.entries()){let n=d[t];if(!n)continue;let a=e===``||i.name.toLowerCase().split(` `).some(t=>t.startsWith(e));n.hidden=!a,a&&!r&&(r=n)}for(let e of d)e.setAttribute(`aria-selected`,String(e===r));let i=d.filter(e=>!e.hidden).length;u.textContent=i===0?`Nobody matches "${e}"`:`${i} of ${n.length} on this thread`,t(s,`data-open`,i>0),l.setAttribute(`aria-expanded`,String(i>0))},h=e=>{let t=n.find(t=>t.key===e);if(!t||p()===null)return;let a=document.createElement(`span`);a.className=`sp-chip`,a.dataset.part=`token`,a.dataset.who=e,a.setAttribute(`style`,i),a.textContent=`@${t.name}`,c.insertBefore(a,l),l.value=l.value.replace(r,`$1`),o.dataset.mentioned=e,u.textContent=`${t.name} will be notified`,f()};l.addEventListener(`input`,m),l.addEventListener(`keydown`,e=>{e.key===`Escape`&&(e.preventDefault(),f())});for(let e of d)e.addEventListener(`click`,()=>h(e.dataset.key??``));c.addEventListener(`pointerdown`,e=>{e.target===l||!e.isTrusted||l.focus()})}export{a as mount};