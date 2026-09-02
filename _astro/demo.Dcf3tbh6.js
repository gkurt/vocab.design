import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=216,i=[`region`,`owner`,`spend`,`change`],a=[{key:`north`,name:`North`,owner:`A. Okafor`,spend:`£41,200`,change:`+4%`,level:1,kids:[`leeds`,`york`]},{key:`leeds`,name:`Leeds`,owner:`R. Vance`,spend:`£18,400`,change:`+6%`,level:2,parent:`north`},{key:`york`,name:`York`,owner:`M. Idris`,spend:`£12,900`,change:`-2%`,level:2,parent:`north`},{key:`south`,name:`South`,owner:`J. Perez`,spend:`£28,750`,change:`+1%`,level:1},{key:`west`,name:`West`,owner:`L. Groves`,spend:`£33,100`,change:`-5%`,level:1,kids:[`truro`]},{key:`truro`,name:`Truro`,owner:`D. Hale`,spend:`£7,300`,change:`-1%`,level:2,parent:`west`}],o=new Map(a.map(e=>[e.key,e])),s=a.filter(e=>e.level===1),c={region:`Region`,owner:`Owner`,spend:`Spend`,change:`Change`},l=(e,t,n)=>`
  <td role="gridcell" id="cell-${e.key}-${t}" data-part="cell-${e.key}-${t}" style="border-bottom: 1px solid var(--sp-line)">${n}</td>`,u=e=>(e.parent?o.get(e.parent)?.kids??[]:s.map(e=>e.key)).indexOf(e.key)+1,d=e=>{let t=e.kids?`<button
         class="sp-icon-button"
         type="button"
         data-part="twisty-${e.key}"
         aria-label="Expand ${e.name}"
         tabindex="-1"
         style="width: 18px; height: 18px; flex: 0 0 auto"
       >${n(`chevronRight`,`sp-icon--chevron`)}</button>`:`<span style="flex: 0 0 auto; width: 18px"></span>`;return`
    <tr
      role="row"
      data-part="row-${e.key}"
      aria-level="${e.level}"
      aria-posinset="${u(e)}"
      ${e.kids?`aria-expanded="false"`:``}
      ${e.level===2?`hidden`:``}
    >
      <th
        role="rowheader"
        scope="row"
        id="cell-${e.key}-region"
        data-part="cell-${e.key}-region"
        style="font-size: 13px; font-weight: 400; color: var(--sp-ink); border-bottom: 1px solid var(--sp-line)"
      >
        <span class="sp-row" style="gap: 6px; padding-left: ${(e.level-1)*22}px">${t}<span>${e.name}</span></span>
      </th>
      ${l(e,`owner`,e.owner)}
      ${l(e,`spend`,e.spend)}
      ${l(e,`change`,e.change)}
    </tr>`};function f(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 281px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Spend by region</span>
          <span class="sp-text" data-part="readout" style="width: 190px; text-align: right; white-space: nowrap; font-size: 12px">Cell: North, Owner</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="collapse" style="flex: 0 0 auto; padding: 3px 9px; font-size: 12px">Collapse all</button>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">
          <div class="sp-surface" style="height: ${r}px; overflow: hidden">
            <table
              class="sp-table"
              role="treegrid"
              data-part="grid"
              data-subject
              data-open="none"
              aria-label="Spend by region"
              tabindex="0"
              style="--sp-cell-pad: 4px 10px"
            >
              <thead class="sp-context">
                <tr role="row">
                  <th style="width: 172px; border-bottom: 1px solid var(--sp-line)">Region</th>
                  <th style="width: 108px; border-bottom: 1px solid var(--sp-line)">Owner</th>
                  <th style="width: 90px; border-bottom: 1px solid var(--sp-line)">Spend</th>
                  <th style="border-bottom: 1px solid var(--sp-line)">Change</th>
                </tr>
              </thead>
              <tbody>
                ${a.map(d).join(``)}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  `;let s=e(n,`grid`),l=e(n,`readout`),u=new Set,f={row:`north`,column:`owner`},p=()=>a.filter(e=>!e.parent||u.has(e.parent)),m=()=>{let e=o.get(f.row);l.textContent=`Cell: ${e?.name??``}, ${c[f.column]}`},h=()=>{for(let r of a){let a=e(n,`row-${r.key}`),o=!r.parent||u.has(r.parent);if(a.toggleAttribute(`hidden`,!o),r.kids){let t=u.has(r.key);a.setAttribute(`aria-expanded`,String(t)),e(n,`twisty-${r.key}`).setAttribute(`aria-label`,`${t?`Collapse`:`Expand`} ${r.name}`)}for(let a of i){let i=e(n,`cell-${r.key}-${a}`);t(i,`data-sim-focus`,r.key===f.row&&a===f.column)}}s.dataset.open=u.size===0?`none`:[...u].join(` `),s.setAttribute(`aria-activedescendant`,`cell-${f.row}-${f.column}`),m()},g=(e,t)=>{t?u.add(e):u.delete(e);let n=o.get(f.row);n?.parent&&!u.has(n.parent)&&(f={row:n.parent,column:f.column}),h()};for(let t of a){t.kids&&e(n,`twisty-${t.key}`).addEventListener(`click`,()=>g(t.key,!u.has(t.key)));for(let r of i)e(n,`cell-${t.key}-${r}`).addEventListener(`click`,()=>{f={row:t.key,column:r},h()})}e(n,`collapse`).addEventListener(`click`,()=>{u.clear();let e=o.get(f.row);e?.parent&&(f={row:e.parent,column:f.column}),h()}),s.addEventListener(`keydown`,e=>{let t=e.key,n=p(),r=n.findIndex(e=>e.key===f.row),a=i.indexOf(f.column),o=n[r];if(o){if(t===`ArrowDown`||t===`ArrowUp`){e.preventDefault();let i=n[Math.min(Math.max(r+(t===`ArrowDown`?1:-1),0),n.length-1)];i&&(f={row:i.key,column:f.column}),h();return}if(t===`ArrowRight`){if(e.preventDefault(),f.column===`region`&&o.kids&&!u.has(o.key))return g(o.key,!0);let t=i[Math.min(a+1,i.length-1)];t&&(f={row:f.row,column:t}),h();return}if(t===`ArrowLeft`){if(e.preventDefault(),f.column===`region`&&o.kids&&u.has(o.key))return g(o.key,!1);let t=i[Math.max(a-1,0)];t&&(f={row:f.row,column:t}),h()}}}),h()}export{f as mount};