import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=340,r=8,i=8,a=2,o=440,s=156,c=176,l=[{key:`narrow`,label:`narrow`,width:200,note:`200px: below the smallest breakpoint, so the grid stacks.`},{key:`medium`,label:`medium`,width:268,note:`268px: three fluid columns, still short of the 340px cap.`},{key:`wide`,label:`wide`,width:360,note:`360px: the grid has just reached its cap, margins at zero.`},{key:`extra`,label:`extra wide`,width:o,note:`440px: the grid holds at 340px and the margin takes the rest.`}],u=`'head' 'c1' 'c2' 'c3' 'foot'`,d=`'head head head' 'c1 c2 c3' 'foot foot foot'`,f=[`Berths`,`Tides`,`Fuel`],p=(e,t)=>`
  <div
    data-part="card-${e+1}"
    style="grid-area: c${e+1}; display: flex; flex-direction: column; gap: 3px; overflow: hidden; min-width: 0;
           padding: 4px 6px; border-radius: 5px; background: var(--sp-surface); border: 1px solid var(--sp-line)"
  >
    <span style="flex: 0 0 auto; font-size: 10px; font-weight: 500; line-height: 1.2; white-space: nowrap">${t}</span>
    <span style="flex: 0 0 auto; width: 84%; height: 5px; border-radius: 3px; background: var(--sp-accent-soft)"></span>
    <span data-part="card-${e+1}-extra" style="flex: 0 0 auto; width: 62%; height: 5px; border-radius: 3px; background: var(--sp-line)"></span>
  </div>`,m=(e,t)=>`
  <div
    data-part="${e}"
    class="sp-context"
    style="grid-area: ${e}; display: flex; align-items: center; overflow: hidden; min-height: 0; padding: 0 7px;
           border-radius: 5px; background: var(--sp-surface); border: 1px solid var(--sp-line)"
  >
    <span class="sp-label" style="font-size: 10px; white-space: nowrap">${t}</span>
  </div>`,h=e=>`
  <div
    data-part="margin-${e}"
    class="sp-context"
    style="flex: 0 0 auto; width: 0; border-radius: 4px;
           background: repeating-linear-gradient(45deg, var(--sp-line) 0 2px, transparent 2px 7px)"
  ></div>`;function g(g){g.innerHTML=`
    <div class="sp-app" style="gap: 8px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 254px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Viewport</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="sizes" data-value="extra" data-axis="Width">
            ${l.map(e=>`
              <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}"
                      style="padding: 4px 8px; font-size: 11px; white-space: nowrap">${e.label}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; padding: 12px">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; width: ${o}px">
            <div data-part="cap" class="sp-context" style="position: relative; width: ${n}px; height: 14px">
              <span style="position: absolute; left: 0; right: 0; top: 6px; height: 2px; background: var(--sp-line)"></span>
              <span style="position: absolute; left: 0; top: 2px; width: 2px; height: 10px; background: var(--sp-line)"></span>
              <span style="position: absolute; right: 0; top: 2px; width: 2px; height: 10px; background: var(--sp-line)"></span>
              <span
                class="sp-label"
                style="position: absolute; left: 50%; top: 0; transform: translateX(-50%); padding: 0 5px; background: var(--sp-sunken);
                       font-size: 10px; line-height: 14px; white-space: nowrap"
              >cap ${n}px</span>
            </div>

            <div style="display: flex; justify-content: center; width: ${o}px; height: ${c}px">
              <div
                data-part="viewport"
                style="display: flex; align-items: stretch; justify-content: center; width: ${o}px; height: ${c}px;
                       padding: ${i}px; background: var(--sp-sunken); border: ${a}px dashed var(--sp-line);
                       border-radius: var(--sp-radius)"
              >
                ${h(`left`)}
                <div
                  data-part="grid"
                  data-subject
                  data-cap="held"
                  data-flow="columns"
                  style="display: grid; grid-template-areas: ${d}; grid-template-columns: 1fr 1fr 1fr;
                         grid-template-rows: 24px 94px 22px; gap: ${r}px; flex: 0 0 auto; width: ${n}px; height: ${s}px"
                >
                  ${m(`head`,`Harbour`)}
                  ${f.map((e,t)=>p(t,e)).join(``)}
                  ${m(`foot`,`Notices`)}
                </div>
                ${h(`right`)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="sp-row sp-context" data-part="readout" style="width: 452px; justify-content: center; gap: 8px">
        ${[`page`,`grid`,`margin`].map(e=>`
          <span
            data-part="val-${e}"
            style="display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 108px; height: 20px;
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
  `;let _=e(g,`viewport`),v=e(g,`grid`),y=e(g,`note`),b=[e(g,`margin-left`),e(g,`margin-right`)],x=f.map((t,n)=>e(g,`card-${n+1}`)),S=f.map((t,n)=>e(g,`card-${n+1}-extra`)),C={page:e(g,`val-page`),grid:e(g,`val-grid`),margin:e(g,`val-margin`)},w=e=>{let r=l.find(t=>t.key===e);if(!r)return;let i=r.width-16-4,a=Math.min(i,n),o=r.key===`narrow`;_.style.width=`${r.width}px`,v.style.width=`${a}px`,v.style.gridTemplateAreas=o?u:d,v.style.gridTemplateColumns=o?`1fr`:`1fr 1fr 1fr`,v.style.gridTemplateRows=o?`20px 28px 28px 28px 20px`:`24px 94px 22px`;for(let e of S)t(e,`hidden`,o);for(let e of b)e.style.width=`${Math.max(0,Math.round((i-a)/2))}px`;let s=v.offsetWidth,c=new Set(x.map(e=>Math.round(e.offsetTop)));v.dataset.cap=s>=339?`held`:`under`,v.dataset.flow=c.size===1?`columns`:`stacked`;let f=b[0]?.offsetWidth??0;C.page.textContent=`page ${r.width}px`,C.grid.textContent=`grid ${s}px`,C.margin.textContent=`margins ${f}px`,y.textContent=r.note};e(g,`sizes`).addEventListener(`change`,e=>w(e.detail)),w(`extra`)}export{g as mount};