import{n as e}from"./parts.C-YLuC7Q.js";var t=3,n={9:`Rye starter`,8:`Autolyse`,7:`Steam trick`,6:`Cold proof`,5:`Crumb shot`,4:`Banneton`,3:`Scoring`,2:`Levain`,1:`First loaf`},r={start:`Both lanes are showing the same first page of the same feed.`,inserted:`A post arrived while the first page was being read. Neither rendered page changed.`,offset:`Offset page 2 opens with a post already read: everything after the insert slid down one.`,proved:`The cursor asked for what follows Cold proof, so it picked up exactly where it stopped.`};function i(i){let a=e=>[0,1,2].map(t=>`
        <div class="sp-list-item" data-part="${e}-row-${t}" style="gap: 7px; height: 26px; padding: 0 7px; font-size: 11px">
          <span data-part="${e}-id-${t}" style="flex: 0 0 auto; width: 18px; color: var(--sp-muted); font-variant-numeric: tabular-nums">#8</span>
          <span class="sp-grow" data-part="${e}-title-${t}" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">Autolyse</span>
          <span
            class="sp-chip"
            data-part="${e}-repeat-${t}"
            hidden
            style="flex: 0 0 auto; padding: 0 6px; font-size: 9.5px; cursor: default; white-space: nowrap"
          >seen</span>
        </div>`).join(``);i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 264px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Bakes, newest first</span>
          <button class="sp-button sp-button--sm" data-part="insert" type="button" style="flex: 0 0 auto; white-space: nowrap">Add a post</button>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">
          <div class="sp-row" style="flex: 0 0 auto; align-items: stretch; gap: 8px; height: 142px">
            <div class="sp-surface sp-context" data-part="offset-lane" data-repeats="0" style="display: flex; flex-direction: column; flex: 1 1 0; min-width: 0; padding: 7px 8px; background: var(--sp-surface)">
              <span class="sp-label" data-part="offset-query" style="flex: 0 0 auto; height: 15px; line-height: 15px; font-size: 10px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">GET /bakes?page=1</span>
              <div style="flex: 1 1 auto; margin-top: 3px">${a(`offset`)}</div>
              <div class="sp-row" data-part="offset-pager" style="flex: 0 0 auto; gap: 4px; height: 24px">
                ${[1,2,3].map(e=>`
                  <button
                    class="sp-chip"
                    data-part="offset-page-${e}"
                    type="button"
                    style="flex: 0 0 auto; padding: 1px 8px; font-size: 10.5px; white-space: nowrap"
                    ${e===1?`data-selected`:``}
                  >${e}</button>`).join(``)}
              </div>
            </div>

            <div class="sp-surface" data-part="cursor-lane" data-repeats="0" style="display: flex; flex-direction: column; flex: 1 1 0; min-width: 0; padding: 7px 8px; background: var(--sp-surface)">
              <span class="sp-label" data-part="cursor-query" style="flex: 0 0 auto; height: 15px; line-height: 15px; font-size: 10px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">GET /bakes?first=3</span>
              <div style="flex: 1 1 auto; margin-top: 3px">${a(`cursor`)}</div>
              <div class="sp-row" data-part="cursor-pager" data-subject style="flex: 0 0 auto; gap: 4px; height: 24px">
                <button
                  class="sp-chip"
                  data-part="cursor-prev"
                  type="button"
                  aria-disabled="true"
                  style="flex: 0 0 auto; padding: 1px 8px; font-size: 10.5px; white-space: nowrap"
                >Previous</button>
                <button
                  class="sp-chip"
                  data-part="cursor-next"
                  type="button"
                  style="flex: 0 0 auto; padding: 1px 8px; font-size: 10.5px; white-space: nowrap"
                >Next</button>
              </div>
            </div>
          </div>

          <div data-stage-verdict class="sp-surface sp-context" data-part="verdict" data-state="start" style="flex: 1 1 auto; min-height: 0; padding: 7px 9px">
            <span class="sp-text sp-text--ink" data-part="verdict-text" style="display: block; font-size: 11px; line-height: 1.35">${r.start}</span>
          </div>
        </div>
      </div>
    </div>
  `;let o=[8,7,6,5,4,3,2,1],s=1,c,l={offset:new Set,cursor:new Set},u={offset:0,cursor:0},d=e(i,`verdict`),f=e(i,`verdict-text`),p=e=>{d.dataset.state=e,f.textContent=r[e]},m=(r,a)=>{let o=0;for(let s=0;s<t;s+=1){let t=a[s],c=e(i,`${r}-row-${s}`),u=e(i,`${r}-repeat-${s}`);if(c.toggleAttribute(`hidden`,t===void 0),t===void 0){u.hidden=!0;continue}e(i,`${r}-id-${s}`).textContent=`#${t}`,e(i,`${r}-title-${s}`).textContent=n[t]??``;let d=l[r].has(t);u.hidden=!d,d&&(o+=1),l[r].add(t)}u[r]+=o,e(i,`${r}-lane`).dataset.repeats=String(u[r])};m(`offset`,o.slice(0,t)),m(`cursor`,o.slice(0,t)),c=o[2],e(i,`insert`).addEventListener(`click`,()=>{o[0]!==9&&(o=[9,...o],p(`inserted`))}),e(i,`offset-page-2`).addEventListener(`click`,()=>{s!==2&&(s=2,e(i,`offset-page-1`).removeAttribute(`data-selected`),e(i,`offset-page-2`).setAttribute(`data-selected`,``),e(i,`offset-query`).textContent=`GET /bakes?page=2`,m(`offset`,o.slice(t,6)),p(`offset`))}),e(i,`cursor-next`).addEventListener(`click`,()=>{let r=c===void 0?-1:o.indexOf(c),a=o.slice(r+1,r+1+t);a.length!==0&&(e(i,`cursor-query`).textContent=`GET /bakes?after=${n[c??0]??``}`,m(`cursor`,a),c=a[a.length-1],e(i,`cursor-prev`).removeAttribute(`aria-disabled`),p(`proved`))})}export{i as mount};