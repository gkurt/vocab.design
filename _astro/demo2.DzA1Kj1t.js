import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import{r}from"./measure.DK7AY2_i.js";var i=12,a={left:12,top:46,width:172},o=30,s=[{key:`newest`,label:`Newest first`,value:`Newest`},{key:`oldest`,label:`Oldest first`,value:`Oldest`},{key:`name`,label:`Name A to Z`,value:`Name A to Z`},{key:`size`,label:`Largest first`,value:`Largest`}],c=[{name:`quarterly.pdf`,meta:`yesterday · 1.2 MB`},{name:`notes.md`,meta:`2 days ago · 18 KB`},{name:`budget.xlsx`,meta:`last week · 640 KB`},{name:`photo.heic`,meta:`3 weeks ago · 4.8 MB`}],l={newest:[0,1,2,3],oldest:[3,2,1,0],name:[2,1,3,0],size:[3,0,2,1]},u=s.map(({key:e,label:t})=>`
    <button class="sp-menu-item" type="button" data-part="item-${e}" style="line-height: 18px; white-space: nowrap">${t}</button>`).join(``),d=c.map((e,t)=>`
    <div class="sp-row" data-part="row-${t}" style="gap: 8px; height: 24px; align-items: center">
      <span class="sp-text sp-text--ink sp-grow" style="font-size: 11px; white-space: nowrap">${c[t]?.name}</span>
      <span class="sp-label" style="flex: 0 0 auto; font-size: 10px; white-space: nowrap">${c[t]?.meta}</span>
    </div>`).join(``),f=(e,t,n)=>`<span data-part="${e}" style="position: absolute; left: ${t-4}px; top: ${n-4}px; width: 8px; height: 8px; pointer-events: none"></span>`;function p(p){p.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Files</span>
        </div>
        <div
          class="sp-body"
          data-part="scene"
          data-menu="closed"
          data-mode="rest"
          data-path="none"
          data-choice="newest"
          data-swept="none"
          style="position: relative"
        >
          <button
            class="sp-button sp-button--ghost sp-button--sm"
            data-part="trigger"
            type="button"
            style="position: absolute; left: 12px; top: 12px; display: inline-flex; align-items: center; gap: 6px;
                   white-space: nowrap; touch-action: none; user-select: none"
          >
            <span style="flex: 0 0 auto">Sort</span>
            <span data-part="value" style="flex: 0 0 auto; width: 76px; text-align: left; color: var(--sp-muted)">Newest</span>
            ${n(`chevronDown`)}
          </button>

          <div
            class="sp-menu"
            data-part="menu"
            data-subject
            style="left: ${a.left}px; top: ${a.top}px; width: ${a.width}px; transform-origin: top left"
          >${u}</div>

          ${f(`enter-menu`,a.left+32,a.top+4+o/2)}
          ${f(`off-menu`,100,a.top+4+120+26)}

          <div class="sp-surface sp-context" style="position: absolute; left: 206px; top: 12px; width: 246px; height: 146px; padding: 10px">
            <span class="sp-label" style="display: block; margin-bottom: 6px; font-size: 10px">4 files</span>
            <div class="sp-stack" data-part="list" style="gap: 2px">${d}</div>
          </div>
        </div>
      </div>
    </div>
  `;let m=e(p,`scene`),h=e(p,`trigger`),g=e(p,`menu`),_=e(p,`value`),v=s.map(({key:t})=>e(p,`item-${t}`)),y,b=!1,x,S=new Set,C=e=>{x=e;for(let[n,r]of v.entries())t(r,`data-active`,s[n]?.key===e)},w=e=>{t(g,`data-open`,e),t(h,`data-selected`,e),m.dataset.menu=e?`open`:`closed`,e||C(void 0)},T=(e,t)=>{for(let[n,r]of v.entries()){let i=r.getBoundingClientRect();if(e>=i.left&&e<=i.right&&t>=i.top&&t<=i.bottom)return s[n]?.key}},E=t=>{let n=l[t]??l.newest;for(let[t,r]of(n??[]).entries()){let n=c[r],[i,a]=[...e(p,`row-${t}`).children];i&&n&&(i.textContent=n.name),a&&n&&(a.textContent=n.meta)}},D=(e,t)=>{w(!1),m.dataset.choice=e,m.dataset.path=t,m.dataset.mode=`rest`,_.textContent=s.find(t=>t.key===e)?.value??e,E(e)};h.addEventListener(`pointerdown`,e=>{e.isTrusted&&h.setPointerCapture(e.pointerId),y=r(e,p),b=!1,S.clear(),w(!0),m.dataset.mode=`holding`,m.dataset.path=`none`,m.dataset.swept=`none`}),h.addEventListener(`pointermove`,e=>{if(!y)return;let t=r(e,p);Math.hypot(t.x-y.x,t.y-y.y)>=i&&(b=!0,m.dataset.mode=`dragging`);let n=T(e.clientX,e.clientY);C(n),n&&(S.add(n),m.dataset.swept=S.size>1?`many`:`one`)});let O=()=>{if(y){if(y=void 0,x)return D(x,`gesture`);if(!b){m.dataset.mode=`sticky`,m.dataset.path=`sticky`;return}w(!1),m.dataset.mode=`rest`,m.dataset.path=`cancelled`}};h.addEventListener(`pointerup`,O),h.addEventListener(`pointercancel`,O);for(let[e,t]of v.entries()){let n=s[e]?.key;n&&t.addEventListener(`click`,()=>D(n,`clicks`))}}export{p as mount};