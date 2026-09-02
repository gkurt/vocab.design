import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=[{id:`home`,name:`Home`,items:[`Projects`,`Archive`,`Notes.md`,`Shared`]},{id:`projects`,name:`Projects`,items:[`Field guide`,`Talks`,`Ideas.md`,`Sketches`]},{id:`field-guide`,name:`Field guide`,items:[`Photos`,`Draft.md`,`Refs.md`,`Cover.png`]},{id:`photos`,name:`Photos`,items:[`Coast.jpg`,`Ridge.jpg`,`Fog.jpg`,`Dunes.jpg`]}],r=n.length-1,i=`padding: 3px 6px`,a=`<span class="sp-text" style="display: flex" aria-hidden="true">${t(`chevronRight`)}</span>`;function o(e,t){let n=t?` aria-current="page" style="${i}; color: var(--sp-ink); font-weight: 500; cursor: default"`:` role="link" tabindex="0" style="${i}"`;return`<span class="sp-nav-item" data-part="crumb-${e.id}"${n}>${e.name}</span>`}function s(e){return n.slice(0,e+1).map((t,n)=>`<li class="sp-row" style="gap: 0">${n===0?``:a}${o(t,n===e)}</li>`).join(``)}function c(e){let t=n[e];if(!t)return``;let r=n[e+1];return t.items.map(e=>r&&r.name===e?`<li class="sp-list-item">
             <span class="sp-grow sp-text sp-text--ink" role="link" tabindex="0" data-part="open-${r.id}" style="cursor: pointer">${e}</span>
             ${a}
           </li>`:`<li class="sp-list-item"><span class="sp-grow sp-text sp-text--ink">${e}</span></li>`).join(``)}function l(t){let i=n[r];if(!i)return;t.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 260px">
        <div class="sp-topbar">
          <nav class="sp-grow" data-part="trail" data-subject aria-label="Breadcrumb">
            <ol class="sp-row" data-part="crumbs" style="list-style: none; margin: 0; padding: 0; gap: 2px; white-space: nowrap">
              ${s(r)}
            </ol>
          </nav>
        </div>
        <div class="sp-body sp-context">
          <div class="sp-row sp-row--between">
            <span class="sp-heading" data-part="folder-name" data-level="${i.id}">${i.name}</span>
            <span class="sp-text">${i.items.length} items</span>
          </div>
          <ul class="sp-list" data-part="listing" style="margin-top: 6px">${c(r)}</ul>
        </div>
      </div>
    </div>
  `;let a=e(t,`crumbs`),o=e(t,`folder-name`),l=e(t,`listing`),u=r,d=e=>{let t=n[e];!t||e===u||(u=e,a.innerHTML=s(u),o.textContent=t.name,o.dataset.level=t.id,l.innerHTML=c(u))},f=e=>{let t=e?.getAttribute(`data-part`)??``,r=t.startsWith(`crumb-`)?t.slice(6):t.startsWith(`open-`)?t.slice(5):``;return r?n.findIndex(e=>e.id===r):-1},p=e=>{let t=f(e.target?.closest(`[data-part]`)??null);t>=0&&d(t)};t.addEventListener(`click`,p),t.addEventListener(`keydown`,e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),p(e))})}export{l as mount};