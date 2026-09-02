import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[{from:`Ola`,subject:`Sprint notes`,date:`09:12`},{from:`Devrim`,subject:`Invoice 2291`,date:`08:40`},{from:`Marta`,subject:`Venue options`,date:`Tue`},{from:`Ken`,subject:`Photo selects`,date:`Tue`},{from:`Rosa`,subject:`Contract redline`,date:`Mon`}],r=2;function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 270px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Inbox</span>
        </div>
        <div class="sp-body">
          <div class="sp-surface" data-part="sheet" style="position: relative; overflow: hidden">
            <table class="sp-table" style="--sp-cell-pad: 5px 10px">
              <thead>
                <tr>
                  <th style="width: 30px">
                    <span class="sp-checkbox" data-part="head-box" role="checkbox" aria-checked="mixed" aria-label="Select all" style="cursor: pointer"></span>
                  </th>
                  <th>From</th>
                  <th>Subject</th>
                  <th style="text-align: right">When</th>
                </tr>
              </thead>
              <tbody>${n.map(({from:e,subject:t,date:n},r)=>`
      <tr data-part="row-${r+1}" data-index="${r}" style="cursor: default">
        <td style="width: 30px">
          <span class="sp-checkbox" data-part="box-${r+1}" aria-hidden="true"></span>
        </td>
        <td style="width: 78px; font-weight: 500">${e}</td>
        <td>${t}</td>
        <td style="width: 46px; text-align: right; color: var(--sp-muted)">${n}</td>
      </tr>`).join(``)}</tbody>
            </table>
            <div
              data-part="range"
              data-subject
              data-span="1"
              aria-hidden="true"
              style="position: absolute; left: 3px; right: 3px; top: 0; height: 0; border-radius: 6px; border: 1px solid var(--sp-accent); background: color-mix(in oklab, var(--sp-accent) 16%, transparent); pointer-events: none; transition: top 0.18s var(--sp-ease), height 0.18s var(--sp-ease)"
            ></div>
          </div>
          <div class="sp-row sp-context" style="margin-top: 8px; justify-content: flex-end">
            <span class="sp-label" data-part="count" style="width: 86px; text-align: right">1 selected</span>
          </div>
        </div>
      </div>
    </div>
  `;let a=e(i,`range`),o=e(i,`head-box`),s=e(i,`count`),c=r,l=r,u=t=>e(i,`row-${t+1}`),d=()=>{let r=Math.min(c,l),d=Math.max(c,l),f=d-r+1;for(let[a]of n.entries()){let n=u(a),o=a>=r&&a<=d;t(n,`data-in-range`,o),n.setAttribute(`aria-selected`,String(o)),t(e(i,`box-${a+1}`),`data-checked`,o)}let p=u(r),m=u(d);a.style.top=`${p.offsetTop}px`,a.style.height=`${m.offsetTop+m.offsetHeight-p.offsetTop}px`,a.dataset.span=String(f),s.textContent=`${f} selected`,o.setAttribute(`aria-checked`,f===n.length?`true`:`mixed`)};for(let[e]of n.entries())u(e).addEventListener(`click`,t=>{t.shiftKey||(c=e),l=e,d()});o.addEventListener(`click`,()=>{c=0,l=n.length-1,d()}),d()}export{i as mount};