import{n as e}from"./parts.C-YLuC7Q.js";var t=116,n=83,r=10,i=[{name:`A1 Kestrel`,pattern:`LLLHFFLLLH`},{name:`A2 Curlew`,pattern:`FLLLLLMMLL`},{name:`B4 Gannet`,pattern:`LLMMLLLLFF`},{name:`B7 Petrel`,pattern:`HHLLLLLLLM`},{name:`C2 Shearwater`,pattern:`LLLLFFFFLL`},{name:`C6 Fulmar`,pattern:`MLLLLHHLLL`}],a={L:`Let`,F:`Free`,H:`Held`,M:`Maint`};function o(o){let s=Array.from({length:r},(e,t)=>t+1);o.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 248px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Berth register</span>
          <span class="sp-label" data-part="readout" role="status" style="flex: 0 0 auto; font-size: 11px; white-space: nowrap"></span>
        </div>

        <div class="sp-body" style="padding: 12px">
          <div style="position: relative; height: 100%; overflow: hidden; border: 1px solid var(--sp-line); border-radius: var(--sp-radius)">
            <div
              class="sp-scroll"
              data-part="scroller"
              data-at="start"
              style="height: 100%; overflow-x: auto; overflow-y: hidden; scrollbar-width: none; overscroll-behavior: contain"
            >
              <table class="sp-table" style="width: 946px; border-collapse: separate; border-spacing: 0; --sp-cell-pad: 4px 10px; font-size: 12px">
                <thead>
                  <tr style="background: var(--sp-surface)">
                    <th
                      data-part="head-name"
                      style="position: sticky; left: 0; z-index: 1; width: ${t}px; min-width: ${t}px; background: var(--sp-surface)"
                    >Berth</th>
                    ${s.map(e=>`<th data-part="head-w${e}" style="width: ${n}px; min-width: ${n}px">Week ${e}</th>`).join(``)}
                  </tr>
                </thead>
                <tbody>${i.map((e,r)=>{let i=r%2==0?`var(--sp-surface)`:`var(--sp-sunken)`,o=s.map(t=>`<td data-part="cell-${r+1}-w${t}" style="width: ${n}px; min-width: ${n}px; color: var(--sp-muted)">${a[e.pattern[t-1]??`L`]}</td>`).join(``);return`
      <tr style="background: ${i}">
        <td
          data-part="name-${r+1}"
          style="position: sticky; left: 0; z-index: 1; width: ${t}px; min-width: ${t}px;
                 background: ${i}; font-weight: 500"
        >${e.name}</td>
        ${o}
      </tr>`}).join(``)}</tbody>
              </table>
            </div>

            <div
              data-part="frozen"
              data-subject
              data-held="yes"
              aria-hidden="true"
              style="position: absolute; top: 0; bottom: 0; left: 0; z-index: 2; width: ${t}px; pointer-events: none;
                     background: color-mix(in srgb, var(--sp-accent) 10%, transparent);
                     border-right: 2px solid var(--sp-accent)"
            ></div>
          </div>
        </div>
      </div>
    </div>
  `;let c=e(o,`scroller`),l=e(o,`frozen`),u=e(o,`readout`),d=e(o,`name-1`),f=()=>{let e=Math.max(c.scrollWidth-c.clientWidth,0),i=e>0?c.scrollLeft/e:0;c.dataset.at=i<.08?`start`:i>.92?`end`:`mid`;let a=d.getBoundingClientRect().left-c.getBoundingClientRect().left;l.dataset.held=Math.abs(a)<2?`yes`:`no`;let o=Math.min(Math.ceil(c.scrollLeft/n)+1,r),s=Math.min(o+Math.floor((c.clientWidth-t)/n)-1,r);u.textContent=`Weeks ${o} to ${s} on screen`};c.addEventListener(`scroll`,f),f()}export{o as mount};