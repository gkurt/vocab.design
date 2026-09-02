import{n as e}from"./parts.C-YLuC7Q.js";var t=[{id:1,from:`Harbour office`,subject:`Berth renewal paperwork`},{id:2,from:`Ines Duarte`,subject:`Chart corrections, week 14`},{id:3,from:`Chandlery`,subject:`Order 4471 has shipped`},{id:4,from:`Tide desk`,subject:`Spring tides, April`},{id:5,from:`Ferry ops`,subject:`Crew rota, next fortnight`}],n=`1,204`;function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 272px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Mail: label "harbour"</span><span class="sp-text">${n} matching</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 0; padding: 0">
          <div style="position: relative; flex: 0 0 auto; height: 33px; border-bottom: 1px solid var(--sp-line)">
            <div
              class="sp-row"
              data-part="banner"
              data-subject
              data-scope="none"
              role="status"
              style="position: absolute; inset: 0; gap: 8px; padding: 0 10px; background: var(--sp-accent-soft); visibility: hidden; opacity: 0; transition: opacity 0.16s, visibility 0.16s"
            >
              <span class="sp-text sp-text--ink" data-part="banner-text" style="font-size: 12px; white-space: nowrap">All 5 on this page are selected.</span>
              <button class="sp-button sp-button--quiet sp-button--sm" data-part="extend" type="button" style="flex: 0 0 auto; white-space: nowrap; text-decoration: underline">Select all ${n} matching</button>
              <button class="sp-button sp-button--quiet sp-button--sm" data-part="clear" type="button" hidden style="flex: 0 0 auto; white-space: nowrap; text-decoration: underline">Clear selection</button>
            </div>
          </div>
          <div class="sp-scroll sp-context" style="flex: 1 1 auto; min-height: 0; background: var(--sp-surface)">
            <table class="sp-table" style="--sp-cell-pad: 6px 10px">
              <thead>
                <tr>
                  <th style="width: 34px"><button class="sp-checkbox" data-part="cb-all" type="button" role="checkbox" aria-checked="false" aria-label="Select everything on this page"></button></th>
                  <th style="width: 124px">From</th>
                  <th>Subject</th>
                </tr>
              </thead>
              <tbody>${t.map(({id:e,from:t,subject:n})=>`
      <tr data-part="row-${e}">
        <td style="width: 34px"><button class="sp-checkbox" data-part="cb-${e}" type="button" role="checkbox" aria-checked="false" aria-label="Select mail from ${t}"></button></td>
        <td class="sp-text--ink" style="width: 124px">${t}</td>
        <td class="sp-text--ink">${n}</td>
      </tr>`).join(``)}</tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="sp-context" data-stage-verdict data-part="caption" style="width: 440px; height: 16px; color: var(--sp-muted); font-size: 11px">The box takes the page. Everything past it has to be asked for.</div>
    </div>
  `;let i=e(r,`banner`),a=e(r,`banner-text`),o=e(r,`extend`),s=e(r,`clear`),c=e(r,`cb-all`),l=l=>{i.dataset.scope=l;let u=l!==`none`;for(let{id:n}of t)e(r,`cb-${n}`).setAttribute(`aria-checked`,String(u));for(let{id:n}of t)u?e(r,`row-${n}`).setAttribute(`data-selected`,``):e(r,`row-${n}`).removeAttribute(`data-selected`);c.setAttribute(`aria-checked`,String(u)),a.textContent=l===`all`?`All ${n} conversations matching this label are selected.`:`All 5 on this page are selected.`,o.hidden=l!==`page`,s.hidden=l!==`all`,i.style.visibility=u?`visible`:`hidden`,i.style.opacity=u?`1`:`0`};c.addEventListener(`click`,()=>l(`page`)),o.addEventListener(`click`,()=>l(`all`)),s.addEventListener(`click`,()=>l(`none`))}export{r as mount};