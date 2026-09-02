import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=120,i=190,a=6,o=450,s=498,c=[{name:`Music`,kind:`Audio`,children:[{name:`Albums`,leaves:[`Blue Skies`,`Night Ferry`,`Harbour Lights`]},{name:`Playlists`,leaves:[`Morning`,`Long Drive`,`Focus`]},{name:`Podcasts`,leaves:[`Weekly`,`Archive`,`Shorts`]}]},{name:`Photos`,kind:`Image`,children:[{name:`2024`,leaves:[`Coast`,`Market`,`Rooftops`]},{name:`2023`,leaves:[`Harbour`,`Fog`,`Ferry`]},{name:`Screens`,leaves:[`Login`,`Empty state`,`Settings`]}]},{name:`Documents`,kind:`PDF`,children:[{name:`Invoices`,leaves:[`March`,`April`,`May`]},{name:`Notes`,leaves:[`Standup`,`Retro`,`Ideas`]},{name:`Contracts`,leaves:[`Lease`,`NDA`,`Supplier`]}]}],l=`display: flex; align-items: center; gap: 6px; padding: 7px 8px; font-size: 12px; cursor: pointer`;function u(e,t,r,i,a){return`
    <li
      class="sp-list-item"
      data-part="item-${e}-${t+1}"
      data-level="${e}"
      data-index="${t}"
      ${i?`data-selected`:``}
      style="${l}"
    >
      <span class="sp-grow" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">${r}</span>
      ${a?`<span class="sp-label" style="flex: 0 0 auto; display: flex">${n(`chevronRight`)}</span>`:``}
    </li>`}var d=(e,t,n)=>`
  <div
    class="sp-surface"
    data-part="col-${e}"
    style="display: flex; flex-direction: column; flex: 0 0 auto; width: ${r}px; height: ${i}px; overflow: hidden"
  >
    <span class="sp-label" data-part="head-${e}" style="flex: 0 0 auto; padding: 6px 8px; border-bottom: 1px solid var(--sp-line)">${t}</span>
    <ul class="sp-list" data-part="list-${e}" style="flex: 1 1 auto; min-height: 0; padding: 2px">${n}</ul>
  </div>`;function f(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Library</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px; padding: 10px 12px">
          <div
            data-part="columns"
            data-subject
            data-depth="2"
            style="position: relative; flex: 0 0 auto; width: ${o}px; height: ${i}px; overflow: hidden"
          >
            <div
              data-part="track"
              style="position: absolute; left: 0; top: 0; display: flex; gap: ${a}px; width: ${s}px; height: ${i}px;
                     translate: 0 0; transition: translate 0.3s var(--sp-ease)"
            >
              ${d(1,`Library`,``)}
              ${d(2,``,``)}
              ${d(3,``,``)}
              ${d(4,``,``)}
            </div>
          </div>
          <span class="sp-text sp-context" data-part="path" style="flex: 0 0 auto; height: 20px; font-size: 12px"></span>
        </div>
      </div>
    </div>
  `;let r=e(n,`columns`),l=e(n,`track`),f=e(n,`path`),p=[1,2,3,4].map(t=>e(n,`col-${t}`)),m=[1,2,3,4].map(t=>e(n,`list-${t}`)),h=[1,2,3,4].map(t=>e(n,`head-${t}`)),g=[0,-1,-1],_=e=>g[e-1]??-1,v=e=>{let n=c[_(1)],i=_(2)>=0?n?.children[_(2)]:void 0,a=_(3)>=0?i?.leaves[_(3)]:void 0,o=a?4:i?3:2,s=[c.map((e,t)=>u(1,t,e.name,t===_(1),!0)).join(``),(n?.children??[]).map((e,t)=>u(2,t,e.name,t===_(2),!0)).join(``),(i?.leaves??[]).map((e,t)=>u(3,t,e,t===_(3),!1)).join(``),a?`<li data-part="preview" style="display: flex; flex-direction: column; gap: 8px; padding: 8px">
             <span class="sp-swatch" style="height: 46px; --sp-swatch: var(--sp-accent-soft)"></span>
             <span class="sp-heading" style="font-size: 12px">${a}</span>
             <span class="sp-label" style="font-size: 11px">${n?.kind??``}</span>
             <span class="sp-label" style="font-size: 11px">in ${i?.name??``}</span>
           </li>`:``];for(let[n,r]of m.entries()){let i=n+1;if(i>=e){r.innerHTML=s[n]??``;continue}for(let e of[...r.children])t(e,`data-selected`,Number(e.dataset.index)===_(i))}let d=[`Library`,n?.name??``,i?.name??``,a??``];for(let[e,t]of h.entries())t.textContent=d[e]??``;let g=[!0,!0,!!i,!!a];for(let[e,t]of p.entries()){let n=g[e]??!1;t.dataset.filled=n?`yes`:`no`,t.style.background=n?`var(--sp-surface)`:`transparent`,t.style.borderStyle=n?`solid`:`dashed`;let r=h[e];r&&(r.style.borderBottomWidth=n?`1px`:`0`)}r.dataset.depth=String(o),l.style.translate=o===4?`-48px 0`:`0 0`,f.textContent=[n?.name,i?.name,a].filter(Boolean).join(` › `)};r.addEventListener(`click`,e=>{let t=e.target?.closest(`[data-level]`);if(!t)return;let n=Number(t.dataset.level);g[n-1]=Number(t.dataset.index);for(let e=n;e<g.length;e+=1)g[e]=-1;v(n+1)}),v(1)}export{f as mount};