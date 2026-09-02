import{n as e}from"./parts.C-YLuC7Q.js";import{n as t}from"./measure.DK7AY2_i.js";var n=[{id:`overview`,title:`Overview`,number:`1`,lines:4},{id:`install`,title:`Install`,number:`2`,lines:4},{id:`package`,title:`Package managers`,number:`2.1`,sub:!0,lines:3},{id:`tokens`,title:`Tokens`,number:`3`,lines:4},{id:`theming`,title:`Theming`,number:`4`,lines:4}];function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 452px; height: 296px">
        <div data-part="toc" data-subject
             style="flex: 0 0 auto; padding: 10px 12px 12px; border-bottom: 1px solid var(--sp-line)">
          <span class="sp-label">Contents</span>
          <ol class="sp-nav" style="margin-top: 6px; list-style: none">${n.map(e=>`
      <li>
        <span class="sp-nav-item" data-part="entry-${e.id}"
              style="display: flex; gap: 8px; padding: 3px 8px; padding-left: ${e.sub?26:8}px">
          <span style="flex: 0 0 22px; color: var(--sp-muted); font-variant-numeric: tabular-nums">${e.number}</span>
          <span>${e.title}</span>
        </span>
      </li>`).join(``)}</ol>
        </div>
        <div class="sp-scroll sp-context" data-part="doc" data-top="overview"
             style="flex: 1 1 auto; min-height: 0; padding: 12px; background: var(--sp-sunken)">${n.map(e=>`
      <section data-part="section-${e.id}" style="padding-bottom: 16px">
        <div class="${e.sub?`sp-label`:`sp-heading`}">${e.title}</div>
        <div class="sp-stack" style="margin-top: 8px">
          ${Array.from({length:e.lines},(e,t)=>`<div class="sp-line" style="width: ${[94,80,88,62][t%4]}%"></div>`).join(``)}
        </div>
      </section>`).join(``)}</div>
      </div>
    </div>
  `;let i=e(r,`doc`);i.addEventListener(`scroll`,()=>{let a=n[0]?.id;for(let o of n)t(e(r,`section-${o.id}`),i).top<=24&&(a=o.id);a&&i.setAttribute(`data-top`,a)});for(let a of n)e(r,`entry-${a.id}`).addEventListener(`click`,()=>{let n=t(e(r,`section-${a.id}`),i).top;i.scrollBy({top:n,behavior:`smooth`})})}export{r as mount};