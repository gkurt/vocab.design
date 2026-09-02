import{n as e}from"./parts.C-YLuC7Q.js";var t=`harbour-notes`,n=`white-space: pre`;function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 216px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Rename</span>
          <span class="sp-text" data-part="readout" style="width: 96px; text-align: right">13 of 13</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 14px">
          <div class="sp-field" style="width: 150px">
            <span class="sp-label sp-context">File name</span>
            <div
              class="sp-input"
              data-part="field"
              data-at="end"
              role="textbox"
              aria-label="File name"
              tabindex="0"
              style="width: 150px; line-height: 1.5; cursor: text; overflow: hidden; user-select: none"
            ></div>
          </div>
          <div class="sp-row sp-context" style="gap: 10px">
            <span class="sp-label">Between</span>
            <div
              class="sp-surface"
              data-part="zoom"
              style="display: flex; align-items: center; justify-content: center; gap: 1px; width: 96px; height: 44px; font-size: 24px; letter-spacing: 1px"
            ></div>
          </div>
        </div>
      </div>
    </div>
  `;let i=e(r,`field`),a=e(r,`readout`),o=e(r,`zoom`),s=document.createElement(`span`);s.className=`sp-caret`,s.setAttribute(`data-part`,`caret`),s.setAttribute(`data-subject`,``);let c=e=>{let t=document.createElement(`span`);return t.textContent=e,t.setAttribute(`style`,n),t},l=[...t].map(c),u=l.length,d=()=>{i.replaceChildren(...l),f()},f=()=>{let e=l[u]??null;(s.nextSibling!==e||s.parentElement!==i)&&i.insertBefore(s,e),i.dataset.at=u===0?`start`:u===l.length?`end`:`middle`,a.textContent=`${u} of ${l.length}`;let t=e=>{let t=l[e]?.textContent;return t===void 0?`<span style="color: var(--sp-muted)">|</span>`:t===` `?`<span style="color: var(--sp-muted)">·</span>`:t};o.innerHTML=`${t(u-1)}<span class="sp-caret" style="height: 26px"></span>${t(u)}`},p=e=>{u=Math.min(Math.max(e,0),l.length),f()};d(),i.addEventListener(`pointerdown`,e=>{let t=l.findIndex(t=>{let n=t.getBoundingClientRect();return e.clientX<n.left+n.width/2});p(t===-1?l.length:t)}),r.addEventListener(`keydown`,e=>{let{key:t}=e;if(t===`Home`)p(0);else if(t===`End`)p(l.length);else if(t===`ArrowLeft`)p(u-1);else if(t===`ArrowRight`)p(u+1);else if(t===`Backspace`){if(u===0)return;l=[...l.slice(0,u-1),...l.slice(u)],--u,d()}else if(t.length===1)l=[...l.slice(0,u),c(t),...l.slice(u)],u+=1,d();else return;e.preventDefault()})}export{r as mount};