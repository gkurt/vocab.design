import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{i as n}from"./measure.DK7AY2_i.js";var r=420,i=184,a=20,o=34,s=30,c=4,l=[`Admissions`,`Term dates`,`Fees and funding`,`Open days`],u=[`Library`,`Careers`,`Give`],d=[`Courses`,`Research`,`People`,`News`];function f(f){f.innerHTML=`
    <div class="sp-app" style="gap: 8px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 240px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Subsite page</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Universal bar" data-part="modes" data-value="with">
            <button class="sp-segment" type="button" data-part="seg-with" value="with"
                    style="padding: 4px 10px; font-size: 11px; white-space: nowrap">with bar</button>
            <button class="sp-segment" type="button" data-part="seg-without" value="without"
                    style="padding: 4px 10px; font-size: 11px; white-space: nowrap">without</button>
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; padding: 12px">
          <div
            data-part="page"
            style="display: flex; flex-direction: column; overflow: hidden; width: ${r}px; height: ${i}px;
                   background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 5px"
          >
            <div
              data-part="universal"
              data-subject
              style="display: flex; align-items: center; gap: 10px; flex: 0 0 auto; height: ${a}px; padding: 0 8px;
                     background: var(--sp-sunken); border-bottom: 1px solid var(--sp-line)"
            >
              <span style="flex: 1 1 auto; min-width: 0; font-size: 9px; font-weight: 600; color: var(--sp-accent); white-space: nowrap">Northgate University</span>
              ${u.map(e=>`<span style="flex: 0 0 auto; font-size: 9px; color: var(--sp-muted); white-space: nowrap">${e}</span>`).join(``)}
            </div>

            <div
              data-part="global"
              class="sp-context"
              style="display: flex; align-items: center; gap: 10px; flex: 0 0 auto; height: ${o}px; padding: 0 8px;
                     border-bottom: 1px solid var(--sp-line)"
            >
              <span style="flex: 0 0 auto; font-size: 11px; font-weight: 600; white-space: nowrap">School of Marine Science</span>
              <span class="sp-grow"></span>
              ${d.map(e=>`<span class="sp-nav-item" style="flex: 0 0 auto; padding: 2px 5px; font-size: 10px; white-space: nowrap">${e}</span>`).join(``)}
            </div>

            <div
              data-part="content"
              class="sp-context"
              data-fold="clipped"
              style="display: flex; flex-direction: column; gap: ${c}px; flex: 1 1 auto; min-height: 0; overflow: hidden;
                     padding: 8px; background: var(--sp-bg)"
            >
              ${l.map((e,t)=>`
                <div
                  data-part="row-${t+1}"
                  style="display: flex; align-items: center; flex: 0 0 auto; height: ${s}px; padding: 0 8px; border-radius: 5px;
                         background: var(--sp-surface); border: 1px solid var(--sp-line)"
                >
                  <span style="font-size: 10px; white-space: nowrap">${e}</span>
                </div>`).join(``)}
            </div>
          </div>
        </div>
      </div>

      <div class="sp-row sp-context" data-part="readout" style="width: 452px; justify-content: center; gap: 8px">
        ${[`bar`,`content`,`rows`].map(e=>`
          <span
            data-part="val-${e}"
            style="display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 138px; height: 20px;
                   border-radius: 5px; background: var(--sp-sunken); color: var(--sp-muted); font-size: 11px; white-space: nowrap"
          ></span>`).join(``)}
      </div>

      <span
        class="sp-text sp-context"
        data-stage-verdict data-part="note"
        role="status"
        style="display: block; width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center"
      ></span>
    </div>
  `;let p=e(f,`universal`),m=e(f,`content`),h=e(f,`note`),g=l.map((t,n)=>e(f,`row-${n+1}`)),_={bar:e(f,`val-bar`),content:e(f,`val-content`),rows:e(f,`val-rows`)},v=e=>{let r=e===`with`;t(p,`hidden`,!r);let i=m.getBoundingClientRect(),o=g.filter(e=>e.getBoundingClientRect().bottom<=i.bottom+1).length;m.dataset.fold=m.scrollHeight>m.clientHeight+1?`clipped`:`clear`,_.bar.textContent=r?`universal bar ${a}px`:`universal bar removed`,_.content.textContent=`content ${Math.round(n(m).height)}px`,_.rows.textContent=`rows ${o} of ${g.length}`,h.textContent=r?`Two bars: the parent org above, the subsite's own nav below.`:`Bar removed: 20px back, and no route to the parent org.`};e(f,`modes`).addEventListener(`change`,e=>v(e.detail)),v(`with`)}export{f as mount};