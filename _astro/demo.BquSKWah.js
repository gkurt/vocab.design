import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=268,i=24,a=[{name:`Marketing`,children:[{name:`Campaigns`,children:[{name:`Q3 launch`},{name:`Q4 launch`}]},{name:`Brand assets`}]},{name:`Engineering`,children:[{name:`Runbooks`},{name:`Design docs`}]},{name:`Archive`}],o=e=>e.toLowerCase().replace(/[^a-z0-9]+/g,`-`);function s(s){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 296px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Move 3 files</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: flex-start; gap: 14px; padding: 12px 16px">
         <div class="sp-stack" style="flex: 0 0 auto; gap: 4px; width: ${r}px">
          <span class="sp-label sp-context" id="vd-tree-select-label" style="font-size: 11px">Destination folder</span>

          <div data-part="control" data-subject style="position: relative; flex: 0 0 auto; width: 100%">
            <button
              class="sp-button sp-button--ghost sp-row sp-row--between"
              type="button"
              data-part="field"
              role="combobox"
              aria-haspopup="tree"
              aria-expanded="false"
              aria-labelledby="vd-tree-select-label"
              style="width: 100%; gap: 8px; padding: 6px 10px; font-size: 12.5px"
            >
              <span
                class="sp-grow"
                data-part="path"
                data-depth="0"
                data-value="none"
                style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-align: left; color: var(--sp-muted)"
                >Choose a folder</span
              >
              ${n(`chevronDown`)}
            </button>

            <div
              class="sp-popover"
              data-part="popup"
              style="left: 0; top: calc(100% + 8px); min-width: 0; width: 100%; padding: 4px; --sp-arrow-x: 18px"
            >
              <ul
                class="sp-nav"
                data-part="tree"
                role="tree"
                aria-labelledby="vd-tree-select-label"
                style="gap: 0; margin: 0; padding: 0; list-style: none"
              ></ul>
            </div>
          </div>
         </div>

          <div class="sp-stack sp-context sp-grow" style="gap: 6px; min-width: 0">
            <span class="sp-label" style="font-size: 11px">Moving</span>
            <div class="sp-surface" style="padding: 2px 8px">
              <div class="sp-list-item" style="padding: 7px 4px; font-size: 12px">brief.pdf</div>
              <div class="sp-list-item" style="padding: 7px 4px; font-size: 12px">hero-shot.png</div>
              <div class="sp-list-item" style="padding: 7px 4px; font-size: 12px">notes.md</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let c=e(s,`field`),l=e(s,`popup`),u=e(s,`tree`),d=e(s,`path`),f=new Set([`Marketing`]),p=``,m=(e,t,r)=>e.map(e=>{let a=!!e.children?.length,s=a&&f.has(e.name),c=[...r,e.name];return`
          <li
            class="sp-option"
            data-part="node-${o(e.name)}"
            data-node="${e.name}"
            data-trail="${c.join(` / `)}"
            data-depth="${t}"
            role="treeitem"
            aria-selected="${e.name===p}"
            ${a?`aria-expanded="${s}"`:``}
            style="display: flex; align-items: center; gap: 6px; height: ${i}px; padding: 0 6px 0 ${6+t*15}px;
                   font-size: 12px; cursor: pointer"
          >
            ${a?`<span data-part="twisty-${o(e.name)}" aria-hidden="true"
                     style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 16px; height: 16px; cursor: pointer"
                     >${n(`chevronRight`,`sp-icon--chevron`)}</span>`:`<span style="flex: 0 0 auto; width: 16px"></span>`}
            <span class="sp-grow" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">${e.name}</span>
            ${a?`<span class="sp-label" style="flex: 0 0 auto; font-size: 10px">${e.children?.length}</span>`:``}
          </li>`+(s&&e.children?m(e.children,t+1,c):``)}).join(``),h=()=>{u.innerHTML=m(a,0,[])},g=e=>{t(l,`data-open`,e),c.setAttribute(`aria-expanded`,String(e))},_=e=>{p=e.dataset.node??``;let t=e.dataset.trail??``;d.dataset.depth=String(t.split(` / `).length),d.dataset.value=o(p),d.textContent=t,d.style.color=`var(--sp-ink)`,h(),g(!1)};u.addEventListener(`click`,e=>{let t=e.target,n=t?.closest(`[data-node]`);if(n){if(t?.closest(`[data-part^="twisty-"]`)){let e=n.dataset.node??``;f.has(e)?f.delete(e):f.add(e),h();return}_(n)}}),c.addEventListener(`click`,()=>g(!0)),s.addEventListener(`pointerdown`,e=>{let t=e.target;!l.contains(t)&&!c.contains(t)&&g(!1)}),s.addEventListener(`keydown`,e=>{e.key===`Escape`&&g(!1)}),h()}export{s as mount};