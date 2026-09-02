import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=[{key:`name`,label:`Name`},{key:`size`,label:`Size`},{key:`modified`,label:`Modified`}],i=[{name:`Contract.pdf`,size:240,modified:3,when:`3 days ago`},{name:`Budget.xlsx`,size:88,modified:1,when:`yesterday`},{name:`Notes.md`,size:12,modified:9,when:`9 days ago`},{name:`Site map.png`,size:620,modified:5,when:`5 days ago`}];function a({key:e,label:t}){return`
    <th scope="col" data-part="th-${e}" aria-sort="none" style="width: ${e===`name`?`46%`:`27%`}">
      <button class="sp-button sp-button--quiet" type="button" data-part="sort-${e}"
              style="display: inline-flex; align-items: center; gap: 5px; padding: 3px 6px; margin: -3px -6px;
                     border: 0; border-radius: 5px; font: inherit; font-size: 12px; color: inherit; cursor: pointer">
        <span>${t}</span>
        <span data-part="arrow-${e}" style="display: inline-flex; visibility: hidden">${n(`chevronDown`)}</span>
      </button>
    </th>`}function o(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 269px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow" style="font-size: 14px">Project files</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface" style="padding: 2px 10px">
            <table class="sp-table" style="--sp-cell-pad: 6px 4px">
              <thead><tr>${r.map(a).join(``)}</tr></thead>
              <tbody data-part="rows" class="sp-context"></tbody>
            </table>
          </div>
          <div class="sp-surface sp-context" style="padding: 7px 10px">
            <div class="sp-row sp-row--between" style="height: 17px">
              <span class="sp-label">aria-sort</span>
              <span class="sp-text sp-text--ink" data-part="carried" style="font-size: 12px; white-space: nowrap"></span>
            </div>
          </div>
        </div>
      </div>
      <p class="sp-text sp-text--ink" data-stage-announce data-part="heard" style="margin: 0"></p>
    </div>
  `;let o=e(n,`rows`),s=e(n,`heard`),c=e(n,`carried`),l=`name`,u=`ascending`,d=()=>{let a=u===`ascending`?1:-1,d=[...i].sort((e,t)=>l===`name`?a*e.name.localeCompare(t.name):a*(e[l]-t[l]));o.innerHTML=d.map(e=>`
          <tr>
            <td>${e.name}</td>
            <td>${e.size} KB</td>
            <td>${e.when}</td>
          </tr>`).join(``);for(let{key:i,label:a}of r){let r=e(n,`th-${i}`),o=i===l;r.setAttribute(`aria-sort`,o?u:`none`),t(r,`data-subject`,o);let c=e(n,`arrow-${i}`);c.style.visibility=o?`visible`:`hidden`,c.style.transform=o&&u===`ascending`?`rotate(180deg)`:``,o&&(s.textContent=`“${a}, sorted ${u}, column header”`)}c.textContent=`${r.find(e=>e.key===l)?.label}: ${u}`};d();for(let{key:t}of r)e(n,`sort-${t}`).addEventListener(`click`,()=>{t===l?u=u===`ascending`?`descending`:`ascending`:(l=t,u=`ascending`),d()})}export{o as mount};