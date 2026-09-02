import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[{key:`heading`,label:`Heading`,badge:`H`,hint:`Large section title`},{key:`highlight`,label:`Highlight`,badge:`Hi`,hint:`Mark the selection`},{key:`todo`,label:`To-do list`,badge:`T`,hint:`Checkbox list`},{key:`table`,label:`Table`,badge:`Tb`,hint:`Three by three`},{key:`divider`,label:`Divider`,badge:`D`,hint:`Horizontal rule`}],r=/(^|\s)\/([a-z]*)$/i,i={idle:`Type / to run a command`,ran:`Enter ran the command. The characters you typed went with it.`,dismissed:`Escape closed the menu and left the writing alone.`},a=[`display: inline-flex`,`align-items: center`,`justify-content: center`,`flex: 0 0 auto`,`width: 20px`,`height: 18px`,`border-radius: 4px`,`background: var(--sp-sunken)`,`font-size: 10px`,`font-weight: 600`].join(`; `);function o(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 254px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Harbour notes</span>
          <span class="sp-label" style="font-size: 11px">Draft</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">

          <div class="sp-stack sp-context" style="flex: 0 0 auto; height: 84px; gap: 9px">
            <span class="sp-heading" style="font-size: 14px">Tuesday, low water</span>
            <span class="sp-line" style="width: 94%"></span>
            <span class="sp-line" style="width: 86%"></span>
            <span class="sp-line" style="width: 91%"></span>
            <span class="sp-line" style="width: 62%"></span>
          </div>

          <div class="sp-row sp-context" data-part="block-slot" style="flex: 0 0 auto; height: 26px; gap: 8px">
            <span style="${a}" data-part="block-badge" hidden>H</span>
            <span class="sp-heading" data-part="block" hidden style="font-size: 14px">Heading</span>
            <span class="sp-caret" data-part="block-caret" hidden></span>
          </div>

          <div data-part="composer" style="position: relative; flex: 0 0 auto">
            <ul
              class="sp-listbox"
              data-part="menu"
              data-subject
              role="listbox"
              aria-label="Commands"
              style="top: auto; bottom: calc(100% + 6px); max-height: 132px"
            >${n.map(({key:e,label:t,badge:n,hint:r})=>`
      <li class="sp-option" role="option" data-part="opt-${e}" data-key="${e}" aria-selected="false"
          style="display: flex; align-items: center; gap: 8px; padding: 3px 6px">
        <span style="${a}">${n}</span>
        <span class="sp-grow" style="min-width: 0">${t}</span>
        <span class="sp-label" style="font-size: 10px">${r}</span>
      </li>`).join(``)}</ul>
            <div class="sp-row" style="height: 38px; gap: 6px; padding: 0 10px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 6px">
              <input
                data-part="editor"
                type="text"
                autocomplete="off"
                spellcheck="false"
                aria-label="Write, or type a slash to run a command"
                aria-expanded="false"
                placeholder="Write, or type / for a command"
                style="flex: 1 1 auto; min-width: 0; border: 0; padding: 0; background: transparent; color: var(--sp-ink); font: inherit; font-size: 13px"
              />
            </div>
          </div>

          <span class="sp-label sp-context" data-stage-verdict data-part="hint" role="status"
                style="flex: 0 0 auto; height: 18px; font-size: 11px; white-space: nowrap; overflow: hidden">${i.idle}</span>

        </div>
      </div>
    </div>
  `;let s=e(o,`menu`),c=e(o,`composer`),l=e(o,`editor`),u=e(o,`hint`),d=e(o,`block`),f=e(o,`block-badge`),p=e(o,`block-caret`),m=n.map(({key:t})=>e(o,`opt-${t}`)),h=()=>{t(s,`data-open`,!1),l.setAttribute(`aria-expanded`,`false`);for(let e of m)e.setAttribute(`aria-selected`,`false`)},g=()=>r.exec(l.value)?.[2]?.toLowerCase()??null,_=()=>m.find(e=>e.getAttribute(`aria-selected`)===`true`)?.dataset.key??``,v=null,y=()=>{let e=g();if(e===null){v=null,h();return}if(v!==null&&e.startsWith(v)){h();return}v=null;let r;for(let[t,i]of n.entries()){let n=m[t];if(!n)continue;let a=i.label.toLowerCase().startsWith(e);n.hidden=!a,a&&!r&&(r=n)}for(let e of m)e.setAttribute(`aria-selected`,String(e===r));let i=m.filter(e=>!e.hidden).length;u.textContent=i===0?`No command starts with "${e}"`:`${i} of ${n.length} commands`,t(s,`data-open`,i>0),l.setAttribute(`aria-expanded`,String(i>0))},b=()=>{let e=n.find(e=>e.key===_());if(!(!e||g()===null)){f.textContent=e.badge,d.textContent=e.label;for(let e of[f,d,p])e.hidden=!1;l.value=l.value.replace(r,`$1`),c.dataset.ran=e.key,h(),u.textContent=i.ran}};l.addEventListener(`input`,y),l.addEventListener(`keydown`,e=>{if(e.key===`Enter`){e.preventDefault(),b();return}e.key===`Escape`&&(e.preventDefault(),v=g(),h(),u.textContent=i.dismissed)});for(let e of m)e.addEventListener(`click`,()=>{for(let t of m)t.setAttribute(`aria-selected`,String(t===e));b()});c.addEventListener(`pointerdown`,e=>{e.target===l||!e.isTrusted||l.focus()})}export{o as mount};