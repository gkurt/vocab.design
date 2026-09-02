import{n as e}from"./parts.C-YLuC7Q.js";import{n as t}from"./measure.DK7AY2_i.js";var n=[{id:`overview`,title:`Overview`},{id:`install`,title:`Install`},{id:`tokens`,title:`Tokens`},{id:`api`,title:`API`},{id:`theming`,title:`Theming`},{id:`faq`,title:`FAQ`}];function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="flex-direction: row; height: 250px">
        <nav data-part="nav" data-subject aria-label="On this page"
             style="width: 132px; flex: 0 0 auto; padding: 12px 10px; border-right: 1px solid var(--sp-line)">
          <span class="sp-label">On this page</span>
          <ul class="sp-nav" style="margin-top: 8px">${n.map((e,t)=>`<li><span class="sp-nav-item" data-part="nav-${e.id}"${t===0?` data-current`:``}>${e.title}</span></li>`).join(``)}</ul>
        </nav>
        <div class="sp-scroll sp-context" data-part="doc" style="flex: 1 1 auto; padding: 12px">${n.map(e=>`
      <section data-part="section-${e.id}" style="padding-bottom: 18px">
        <div class="sp-heading">${e.title}</div>
        <div class="sp-stack" style="margin-top: 8px">
          <div class="sp-line" style="width: 92%"></div>
          <div class="sp-line" style="width: 78%"></div>
          <div class="sp-line" style="width: 86%"></div>
          <div class="sp-line" style="width: 60%"></div>
        </div>
      </section>`).join(``)}</div>
      </div>
    </div>
  `;let i=e(r,`doc`),a=n.map(t=>e(r,`nav-${t.id}`));i.addEventListener(`scroll`,()=>{let o=n[0]?.id;for(let a of n)t(e(r,`section-${a.id}`),i).top<=24&&(o=a.id);i.scrollTop+i.clientHeight>=i.scrollHeight-2&&(o=n.at(-1)?.id);for(let e of a)e.removeAttribute(`data-current`);o&&e(r,`nav-${o}`).setAttribute(`data-current`,``)}),n.forEach(n=>{e(r,`nav-${n.id}`).addEventListener(`click`,()=>{let a=t(e(r,`section-${n.id}`),i).top;i.scrollBy({top:a,behavior:`smooth`})})})}export{r as mount};