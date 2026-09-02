import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={w:450,h:232},n={x:62,y:2,w:326,h:150},r={w:214,h:42,gap:14},i=[{key:`grid`,label:`Grid`},{key:`single`,label:`Single`},{key:`info`,label:`Info`}],a=(e,t,n,r)=>`<span style="position: absolute; left: ${e}px; top: ${t}px; width: ${n}px; height: ${r}px; border-radius: 5px; background: var(--sp-sunken)"></span>`;function o(o){let s=n.x+(n.w-r.w)/2,c=n.y+n.h+r.gap;o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Photos, in the room</span>
        </div>

        <div class="sp-body" style="background: linear-gradient(160deg, var(--sp-sunken), var(--sp-bg) 70%)">
          <div
            data-part="scene"
            data-gaze
            data-view="grid"
            style="position: relative; width: ${t.w}px; height: ${t.h}px"
          >
            <div
              class="sp-surface sp-context"
              data-part="window"
              style="position: absolute; left: ${n.x}px; top: ${n.y}px; width: ${n.w}px; height: ${n.h}px;
                     display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 10px 24px rgb(16 24 40 / 0.2)"
            >
              <div class="sp-row" style="flex: 0 0 auto; gap: 8px; padding: 6px 10px; border-bottom: 1px solid var(--sp-line)">
                <span class="sp-heading" style="font-size: 12px">Harbour, June</span>
                <span class="sp-label sp-grow" style="font-size: 10.5px; text-align: right">24 photos</span>
              </div>

              <div style="position: relative; flex: 1 1 auto">
                <span data-part="view-grid" style="position: absolute; inset: 10px">
                  ${a(0,0,96,44)}${a(104,0,96,44)}${a(208,0,96,44)}
                  ${a(0,52,96,44)}${a(104,52,96,44)}${a(208,52,96,44)}
                </span>

                <span data-part="view-single" hidden style="position: absolute; inset: 10px">
                  ${a(0,0,200,96)}
                  <span class="sp-stack" style="position: absolute; left: 212px; top: 2px; gap: 3px">
                    <span class="sp-label" style="font-size: 10px">Taken</span>
                    <span style="font-size: 11.5px">14 June, 07:12</span>
                  </span>
                </span>

                <span data-part="view-info" hidden class="sp-stack" style="position: absolute; inset: 10px; gap: 7px">
                  <span class="sp-row sp-row--between" style="gap: 12px"><span class="sp-label" style="font-size: 10.5px">Camera</span><span style="font-size: 11.5px">Coastal 35</span></span>
                  <div class="sp-divider"></div>
                  <span class="sp-row sp-row--between" style="gap: 12px"><span class="sp-label" style="font-size: 10.5px">Place</span><span style="font-size: 11.5px">Falmouth harbour</span></span>
                  <div class="sp-divider"></div>
                  <span class="sp-row sp-row--between" style="gap: 12px"><span class="sp-label" style="font-size: 10.5px">Shared with</span><span style="font-size: 11.5px">Coastal team</span></span>
                </span>
              </div>
            </div>

            <div
              data-part="ornament"
              data-subject
              style="position: absolute; left: ${s}px; top: ${c}px; width: ${r.w}px; height: ${r.h}px;
                     display: flex; align-items: center; justify-content: center; padding: 0 8px; border: 1px solid var(--sp-line);
                     border-radius: 999px; background: var(--sp-surface); box-shadow: 0 14px 28px rgb(16 24 40 / 0.26)"
            >
              <sp-segmented class="sp-segmented" data-part="views" data-value="grid" data-axis="View" aria-label="Window view">
                ${i.map(e=>`
                  <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}" style="padding: 4px 11px; font-size: 12px; white-space: nowrap">${e.label}</button>`).join(``)}
              </sp-segmented>
            </div>

          </div>
        </div>
      </div>
    </div>
  `;let l=e(o,`scene`),u=e(o,`views`),d=t=>{l.dataset.view=t;for(let n of i)e(o,`view-${n.key}`).toggleAttribute(`hidden`,n.key!==t)};u.addEventListener(`change`,e=>d(e.detail)),d(`grid`)}export{o as mount};