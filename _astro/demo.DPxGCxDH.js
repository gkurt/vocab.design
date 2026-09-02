import{n as e}from"./parts.C-YLuC7Q.js";import{i as t}from"./measure.DK7AY2_i.js";var n=[{id:`species`,name:`Species`},{id:`habitats`,name:`Habitats`},{id:`tracks`,name:`Tracks`},{id:`notes`,name:`Notes`}],r=`species`;function i(e){let t=e.id===r?` data-current aria-current="page"`:``;return`<li><span class="sp-nav-item" role="link" tabindex="0" data-part="nav-${e.id}"${t}>${e.name}</span></li>`}function a(a){let o=n.find(e=>e.id===r);if(!o)return;a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <header class="sp-topbar" data-part="bar" data-subject>
          <span class="sp-heading" data-part="wordmark">Fieldbook</span>
          <nav class="sp-grow" aria-label="Main">
            <ul class="sp-nav" data-part="links" style="flex-direction: row; gap: 2px">
              ${n.map(i).join(``)}
            </ul>
          </nav>
          <span class="sp-avatar" data-part="account">GK</span>
        </header>
        <div class="sp-body sp-context">
          <div class="sp-heading" data-part="page-title" data-section="${o.id}">${o.name}</div>
          <div class="sp-stack" style="margin-top: 12px">
            <div class="sp-line" style="width: 88%"></div>
            <div class="sp-line" style="width: 96%"></div>
            <div class="sp-line" style="width: 72%"></div>
            <div class="sp-line" style="width: 84%"></div>
          </div>
        </div>
      </div>
    </div>
  `;let s=n.map(t=>e(a,`nav-${t.id}`)),c=e(a,`page-title`);for(let e of s){let n=e.hasAttribute(`data-current`);e.setAttribute(`data-current`,``);let r=Math.ceil(t(e).width);r>0&&(e.style.width=`${r}px`),n||e.removeAttribute(`data-current`)}let l=t=>{for(let e of s)e.removeAttribute(`data-current`),e.removeAttribute(`aria-current`);let n=e(a,`nav-${t.id}`);n.setAttribute(`data-current`,``),n.setAttribute(`aria-current`,`page`),c.textContent=t.name,c.dataset.section=t.id};for(let t of n){let n=e(a,`nav-${t.id}`);n.addEventListener(`click`,()=>l(t)),n.addEventListener(`keydown`,e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),l(t))})}}export{a as mount};