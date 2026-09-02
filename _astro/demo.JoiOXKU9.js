import{n as e}from"./parts.C-YLuC7Q.js";var t=`<svg class="sp-icon sp-icon--filled sp-icon--chevron" viewBox="0 0 24 24" aria-hidden="true" style="width: 10px; height: 10px"><path d="M8 4.5 17 12l-9 7.5z" stroke-width="1"/></svg>`,n=[{key:`src`,label:`src`,children:[{key:`app`,label:`app.tsx`},{key:`router`,label:`router.ts`}]},{key:`assets`,label:`assets`,children:[{key:`logo`,label:`logo.svg`},{key:`hero`,label:`hero.png`}]},{key:`readme`,label:`README.md`}];function r(r){let i=(e,t)=>`<li
      class="sp-nav-item"
      role="treeitem"
      aria-selected="false"
      id="vd-tree-${e.key}"
      data-part="row-${e.key}"
      data-key="${e.key}"
      style="padding-left: ${t}px; cursor: pointer"
    >${e.label}</li>`;r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="height: 284px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow" style="font-size: 13px">Explorer</span></div>
        <div class="sp-body" style="padding: 10px 12px">
          <ul
            class="sp-nav"
            role="tree"
            tabindex="0"
            aria-label="Project files"
            aria-activedescendant="vd-tree-src"
            data-part="tree"
            data-subject
            style="gap: 1px"
          >${n.map(e=>e.children?`
      <li role="treeitem" aria-expanded="false" aria-selected="false" id="vd-tree-${e.key}" data-part="node-${e.key}" data-key="${e.key}">
        <div class="sp-row" style="gap: 0">
          <span class="sp-icon-button" data-part="twisty-${e.key}" aria-hidden="true" style="width: 20px; height: 26px; cursor: pointer">${t}</span>
          <span class="sp-nav-item sp-grow" data-part="label-${e.key}" style="padding-left: 4px; cursor: pointer">${e.label}</span>
        </div>
        <ul class="sp-nav" role="group" data-part="group-${e.key}" hidden>
          ${e.children.map(e=>i(e,42)).join(``)}
        </ul>
      </li>`:i(e,26)).join(``)}</ul>
        </div>
        <div class="sp-row sp-row--between sp-context" style="flex: 0 0 auto; padding: 9px 12px; border-top: 1px solid var(--sp-line)">
          <span class="sp-label">Selected</span>
          <span class="sp-text" data-part="status" data-file="src">src</span>
        </div>
      </div>
    </div>
  `;let a=e(r,`tree`),o=e(r,`status`),s=[];for(let t of n){let n=!!t.children,i=e(r,n?`node-${t.key}`:`row-${t.key}`),a={key:t.key,label:t.label,li:i,row:n?e(r,`label-${t.key}`):i,group:n?e(r,`group-${t.key}`):void 0,parent:void 0};s.push(a);for(let n of t.children??[]){let t=e(r,`row-${n.key}`);s.push({key:n.key,label:n.label,li:t,row:t,group:void 0,parent:a})}}let c=s[0],l=()=>s.filter(e=>e.li.offsetParent!==null),u=e=>{if(e){c=e;for(let t of s){let n=t===e;t.li.setAttribute(`aria-selected`,String(n)),n?t.row.setAttribute(`data-current`,``):t.row.removeAttribute(`data-current`)}a.setAttribute(`aria-activedescendant`,`vd-tree-${e.key}`),o.dataset.file=e.key,o.textContent=e.label}},d=(e,t)=>{e.group&&(e.group.hidden=!t,e.li.setAttribute(`aria-expanded`,String(t)))},f=e=>e.li.getAttribute(`aria-expanded`)===`true`;u(s[0]);for(let t of s)t.row.addEventListener(`click`,()=>u(t)),t.group&&e(r,`twisty-${t.key}`).addEventListener(`click`,()=>d(t,!f(t)));r.addEventListener(`keydown`,e=>{let t=c;if(!t)return;let n=l(),r=n.indexOf(t);if(e.key===`ArrowDown`)u(n[Math.min(r+1,n.length-1)]);else if(e.key===`ArrowUp`)u(n[Math.max(r-1,0)]);else if(e.key===`Home`)u(n[0]);else if(e.key===`End`)u(n[n.length-1]);else if(e.key===`ArrowRight`){if(!t.group)return;f(t)?u(l()[r+1]):d(t,!0)}else if(e.key===`ArrowLeft`)t.group&&f(t)?d(t,!1):u(t.parent);else return;e.preventDefault()})}export{r as mount};