import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=[{slug:`windsor-chair`,label:`Windsor chair, oak`},{slug:`folding-chair`,label:`Folding chair, ash`},{slug:`reading-lamp`,label:`Reading lamp, brass`},{slug:`wool-throw`,label:`Wool throw, grey`},{slug:`ceramic-jug`,label:`Ceramic jug`},{slug:`linen-napkins`,label:`Linen napkins`}],r=[...new Set(n.flatMap(e=>e.label.toLowerCase().split(/[\s,]+/)))].filter(e=>e.length>3);function i(e,t){let n=Array.from({length:t.length+1},(e,t)=>t);for(let r=1;r<=e.length;r++){let i=[r];for(let a=1;a<=t.length;a++){let o=e[r-1]===t[a-1]?0:1;i[a]=Math.min((i[a-1]??0)+1,(n[a]??0)+1,(n[a-1]??0)+o)}n=i}return n[t.length]??t.length}function a(e){let t,n=3;for(let a of r){let r=i(e,a);r<n&&(t=a,n=r)}return t}function o(r){let i=n.map(e=>`
      <li class="sp-list-item" data-part="item-${e.slug}">
        <span class="sp-grow">${e.label}</span>
        <span class="sp-text">In stock</span>
      </li>`).join(``);r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Catalogue</span></div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-row" style="gap: 8px">
            ${t(`search`)}
            <input class="sp-input" data-part="query" type="text" spellcheck="false" aria-label="Search the catalogue" placeholder="Search" />
          </div>
          <div class="sp-surface sp-grow" style="position: relative; min-height: 0; overflow: hidden">
            <ul class="sp-list sp-scroll" data-part="results" style="height: 100%; padding: 0 4px">${i}</ul>
            <div
              class="sp-empty"
              data-part="noresults"
              data-subject
              data-query=""
              role="status"
              hidden
              style="position: absolute; inset: 0; background: var(--sp-surface); gap: 6px"
            >
              <span class="sp-empty-mark">${t(`search`)}</span>
              <span class="sp-text sp-text--ink" data-part="echo">Nothing matches</span>
              <button class="sp-button sp-button--ghost sp-button--sm" data-part="suggest" type="button" data-word="">Did you mean</button>
              <button class="sp-button sp-button--sm" data-part="clear" type="button">Clear the search</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let o=e(r,`query`),s=e(r,`results`),c=e(r,`noresults`),l=e(r,`echo`),u=e(r,`suggest`),d=()=>{let t=o.value.trim().toLowerCase(),i=0;for(let a of n){let n=t.length===0||a.label.toLowerCase().includes(t);e(r,`item-${a.slug}`).hidden=!n,n&&i++}c.dataset.query=t,l.textContent=`Nothing in the catalogue matches “${o.value.trim()}”`;let d=t.length>0?a(t):void 0;u.dataset.word=d??``,u.hidden=d===void 0,d&&(u.textContent=`Did you mean ${d}?`),c.hidden=i>0||t.length===0,s.style.visibility=c.hidden?`visible`:`hidden`};o.addEventListener(`input`,d),u.addEventListener(`click`,()=>{o.value=u.dataset.word??``,d()}),e(r,`clear`).addEventListener(`click`,()=>{o.value=``,d()})}export{o as mount};