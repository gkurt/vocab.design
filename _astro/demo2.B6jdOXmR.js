import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[{key:`brief`,name:`campaign-brief.md`,size:`4 KB`},{key:`notes`,name:`kickoff-notes.md`,size:`11 KB`},{key:`budget`,name:`budget-q3.csv`,size:`38 KB`},{key:`deck`,name:`launch-deck.key`,size:`6.2 MB`},{key:`photo`,name:`hero-shot.png`,size:`2.4 MB`}],r=`brief`;function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 252px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Assets</span>
          <span class="sp-text" data-part="readout" data-mode="start" style="width: 270px; text-align: right; white-space: nowrap">One row selected</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <ul
            class="sp-list sp-surface"
            data-part="list"
            data-subject
            data-count="1"
            role="listbox"
            aria-multiselectable="true"
            aria-label="Assets"
            style="padding: 2px"
          >${n.map(({key:e,name:t,size:n})=>`
      <li
        class="sp-list-item"
        data-part="row-${e}"
        data-key="${e}"
        ${e===r?`data-selected`:``}
        role="option"
        aria-selected="${e===r}"
        style="height: 30px; padding: 0 10px; cursor: default"
      >
        <span aria-hidden="true" style="flex: 0 0 auto; width: 13px; height: 16px; border-radius: 2px; background: var(--sp-line)"></span>
        <span class="sp-grow" style="min-width: 0">${t}</span>
        <span class="sp-label">${n}</span>
      </li>`).join(``)}</ul>
          <div class="sp-row sp-row--between sp-context">
            <span class="sp-row" style="gap: 6px">
              <span class="sp-kbd" data-part="key-pick">Ctrl or Cmd</span>
              <span class="sp-label">Add to selection</span>
            </span>
            <span class="sp-label" data-part="count" style="width: 96px; text-align: right">1 of 5 selected</span>
          </div>
        </div>
      </div>
    </div>
  `;let a=e(i,`list`),o=e(i,`readout`),s=e(i,`count`),c=e(i,`key-pick`),l=new Set([r]),u=()=>{for(let{key:r}of n){let n=e(i,`row-${r}`);t(n,`data-selected`,l.has(r)),n.setAttribute(`aria-selected`,String(l.has(r)))}a.dataset.count=String(l.size),s.textContent=`${l.size} of ${n.length} selected`},d=(e,t)=>{o.dataset.mode=e,o.textContent=t};for(let{key:t,name:r}of n)e(i,`row-${t}`).addEventListener(`click`,e=>{e.ctrlKey||e.metaKey?l.has(t)?(l.delete(t),d(`add`,`Modified click: ${r} dropped`)):(l.add(t),d(`add`,`Modified click: ${r} added`)):(l.clear(),l.add(t),d(`replace`,`Plain click: ${r} only`)),u()});let f=e=>{c.style.borderColor=e?`var(--sp-accent)`:``,c.style.color=e?`var(--sp-ink)`:``,t(c,`data-held`,e)};i.addEventListener(`keydown`,e=>{(e.key===`Control`||e.key===`Meta`)&&f(!0)}),i.addEventListener(`keyup`,e=>{(e.key===`Control`||e.key===`Meta`)&&f(!1)}),u()}export{i as mount};