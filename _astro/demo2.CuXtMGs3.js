import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[{key:`bold`,glyph:`B`,label:`Bold`,paint:`font-weight: 700`},{key:`italic`,glyph:`I`,label:`Italic`,paint:`font-style: italic`},{key:`strike`,glyph:`S`,label:`Strikethrough`,paint:`text-decoration: line-through`}],r=[{key:`intro`,text:`Harbour survey, third pass`,bold:!1,italic:!1,strike:!1},{key:`lede`,text:`The gulls came in ahead of the weather.`,bold:!0,italic:!1,strike:!1},{key:`note`,text:`Boats tied short by four.`,bold:!1,italic:!1,strike:!1}];function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 208px">
        <div
          class="sp-row"
          role="toolbar"
          aria-label="Formatting"
          data-part="toolbar"
          data-subject
          style="flex: 0 0 auto; gap: 4px; padding: 7px 8px; border-bottom: 1px solid var(--sp-line); background: var(--sp-surface)"
        >
          ${n.map(e=>`
      <button
        class="sp-button sp-button--ghost sp-button--sm"
        type="button"
        data-part="fmt-${e.key}"
        data-aim
        aria-pressed="false"
        aria-label="${e.label}"
        style="width: 32px; padding: 5px 0; text-align: center; ${e.paint}"
      >${e.glyph}</button>`).join(``)}
          <div class="sp-divider" style="width: 1px; height: 20px; margin: 0 4px"></div>
          <button
            class="sp-button sp-button--quiet sp-button--sm"
            type="button"
            data-part="fmt-link"
            aria-disabled="true"
          >Link</button>
        </div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface sp-stack" data-part="editor" style="gap: 4px; padding: 10px 8px">${r.map(e=>`
      <p
        data-part="run-${e.key}"
        style="display: flex; align-items: center; margin: 0; height: 24px; padding: 0 6px; border-radius: 4px;
               font-size: 13px; white-space: nowrap; overflow: hidden; cursor: text"
      ><span data-part="text-${e.key}">${e.text}</span></p>`).join(``)}</div>
          <span class="sp-text" data-part="where" data-run="intro" style="margin-top: auto; font-size: 12px">
            Line 1 of ${r.length}
          </span>
        </div>
      </div>
    </div>
  `;let a=i.ownerDocument.createElement(`span`);a.className=`sp-caret`,a.dataset.part=`caret`,a.setAttribute(`aria-hidden`,`true`),a.style.marginLeft=`1px`;let o=e(i,`where`),s=new Map(r.map(e=>[e.key,{bold:e.bold,italic:e.italic,strike:e.strike}])),c=r[0]?.key??`intro`,l=()=>{for(let a of r){let r=s.get(a.key);if(!r)continue;let o=e(i,`run-${a.key}`),l=e(i,`text-${a.key}`);for(let e of n)t(o,`data-${e.key}`,r[e.key]);l.style.fontWeight=r.bold?`700`:`400`,l.style.fontStyle=r.italic?`italic`:`normal`,l.style.textDecoration=r.strike?`line-through`:`none`,o.style.background=a.key===c?`var(--sp-sunken)`:`transparent`}let a=s.get(c);for(let r of n){let n=e(i,`fmt-${r.key}`),o=a?.[r.key]===!0;n.setAttribute(`aria-pressed`,String(o)),t(n,`data-selected`,o)}let l=r.findIndex(e=>e.key===c)+1;o.dataset.run=c,o.textContent=`Line ${l} of ${r.length}`},u=t=>{c=t,e(i,`text-${t}`).after(a),l()};for(let t of r)e(i,`run-${t.key}`).addEventListener(`click`,()=>u(t.key));for(let t of n)e(i,`fmt-${t.key}`).addEventListener(`click`,()=>{let e=s.get(c);e&&(e[t.key]=!e[t.key],l())});u(c)}export{i as mount};