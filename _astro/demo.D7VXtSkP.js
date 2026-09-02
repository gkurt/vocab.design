import{n as e}from"./parts.C-YLuC7Q.js";var t=[{key:`nocturne`,track:`Nocturne`,plays:812,added:`Mar 4`},{key:`low-tide`,track:`Low Tide`,plays:2140,added:`Jan 19`},{key:`ember`,track:`Ember`,plays:96,added:`Apr 22`},{key:`halcyon`,track:`Halcyon`,plays:1305,added:`Feb 2`}],n={ascending:`↑`,descending:`↓`};function r(r){let i=t.map(e=>`
      <tr data-part="row-${e.key}">
        <td>${e.track}</td>
        <td style="text-align: right">${e.plays.toLocaleString(`en-US`)}</td>
        <td class="sp-text">${e.added}</td>
      </tr>`).join(``),a=(e,t,r,i)=>`
    <th data-part="col-${e}" aria-sort="none" style="width: ${r}px; padding: 2px 4px; text-align: ${i}">
      <button class="sp-button sp-button--quiet sp-button--sm" type="button" data-part="sort-${e}">
        ${t}<span
          data-part="ind-${e}"
          aria-hidden="true"
          style="display: inline-block; width: 14px; text-align: center; visibility: hidden"
        >${n.ascending}</span>
      </button>
    </th>`;r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 238px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Library</span></div>
        <div class="sp-body">
          <div class="sp-surface" style="overflow: hidden">
            <table class="sp-table" data-part="table" aria-label="Tracks">
              <thead>
                <tr>
                  ${a(`track`,`Track`,168,`left`)}
                  ${a(`plays`,`Plays`,110,`right`)}
                  <th class="sp-context" style="width: 96px">Added</th>
                </tr>
              </thead>
              <tbody class="sp-context" data-part="rows">${i}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;let o=e(r,`rows`),s=`track`,c=`ascending`,l=()=>{let i=[...t].sort((e,t)=>{let n=s===`track`?e.track.localeCompare(t.track):e.plays-t.plays;return c===`ascending`?n:-n});for(let[t,n]of i.entries()){let i=e(r,`row-${n.key}`);i.dataset.rank=String(t+1),o.append(i)}for(let t of[`track`,`plays`]){let i=t===s,a=e(r,`ind-${t}`);e(r,`col-${t}`).setAttribute(`aria-sort`,i?c:`none`),a.textContent=n[c],a.style.visibility=i?`visible`:`hidden`,i?a.setAttribute(`data-subject`,``):a.removeAttribute(`data-subject`)}},u=e=>{c=e===s&&c===`ascending`?`descending`:`ascending`,s=e,l()};for(let t of[`track`,`plays`])e(r,`sort-${t}`).addEventListener(`click`,()=>u(t));l()}export{r as mount};