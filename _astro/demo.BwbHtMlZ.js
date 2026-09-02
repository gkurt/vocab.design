import{n as e,t}from"./parts.C-YLuC7Q.js";var n={gateway:`#6f7bdc`,auth:`#a06ee0`,cart:`#2f9560`,pricing:`#b8762f`,inventory:`#2b8a9e`},r=420,i=[{key:`root`,name:`GET /checkout`,service:`gateway`,depth:0,start:0,dur:420},{key:`auth`,name:`auth.verify`,service:`auth`,depth:1,start:6,dur:34},{key:`cart`,name:`cart.load`,service:`cart`,depth:1,start:44,dur:52},{key:`price`,name:`pricing.quote`,service:`pricing`,depth:1,start:100,dur:52},{key:`inv`,name:`inventory.check`,service:`inventory`,depth:1,start:250,dur:162},{key:`db`,name:`db.query`,service:`inventory`,depth:2,start:262,dur:138}],a=[0,100,200,300,400],o=22,s=150,c={start:152,end:250},l=e=>`${(e/r*100).toFixed(3)}%`;function u(e){let t=e.key===`inv`?` data-subject`:``,r=e.key===`inv`?`<span
           data-part="gap"
           style="position: absolute; left: ${l(c.start)}; width: ${l(c.end-c.start)}; top: 4px; height: 14px;
                  display: flex; align-items: center; justify-content: center; border: 1px dashed var(--sp-line);
                  border-radius: 3px; font-size: 9px; color: var(--sp-muted)"
         >98 ms</span>`:``;return`
    <button
      type="button"
      data-part="row-${e.key}"
      style="display: flex; align-items: center; gap: 8px; width: 100%; height: ${o}px; padding: 0 4px; margin: 0;
             border: 0; border-radius: 4px; background: transparent; color: inherit; font: inherit; text-align: left; cursor: pointer"
    >
      <span style="display: flex; align-items: center; gap: 6px; flex: 0 0 auto; width: ${s}px; padding-left: ${e.depth*10}px">
        <span aria-hidden="true" style="flex: 0 0 auto; width: 7px; height: 7px; border-radius: 50%; background: ${n[e.service]}"></span>
        <span style="flex: 1 1 auto; min-width: 0; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${e.name}</span>
        <span class="sp-label" style="flex: 0 0 auto; width: 36px; font-size: 10px; text-align: right">${e.dur} ms</span>
      </span>
      <span style="position: relative; flex: 1 1 auto; height: ${o}px">
        ${r}
        <span
          data-part="bar-${e.key}"${t}
          style="position: absolute; left: ${l(e.start)}; width: ${l(e.dur)}; top: 6px; height: 10px;
                 border-radius: 3px; background: ${n[e.service]}"
        ></span>
      </span>
    </button>`}function d(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 292px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Trace 4f1c9a</span>
          <span class="sp-label" style="font-size: 11px">GET /checkout &middot; 420 ms</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; justify-content: center; gap: 10px; padding: 12px">
          <div class="sp-surface" data-part="waterfall" style="padding: 6px 10px 8px">
            <div style="position: relative; display: flex; align-items: flex-end; gap: 8px; height: 16px; border-bottom: 1px solid var(--sp-line)">
              <span class="sp-label" style="flex: 0 0 auto; width: ${s}px; font-size: 10px">6 spans</span>
              <span data-part="axis" style="position: relative; flex: 1 1 auto; height: 14px">
                ${a.map((e,t)=>{let n=t===0?`0`:t===a.length-1?`-100%`:`-50%`;return`<span style="position: absolute; left: ${l(e)}; bottom: 0; transform: translateX(${n}); font-size: 9px; color: var(--sp-muted)">${e}</span>`}).join(``)}
              </span>
            </div>
            <div data-part="rows" style="padding-top: 4px">${i.map(u).join(``)}</div>
          </div>

          <div class="sp-surface" data-part="detail" data-span="root" style="flex: 0 0 auto; height: 58px; padding: 8px 10px">
            <div class="sp-row" style="gap: 6px">
              <span data-part="detail-dot" aria-hidden="true" style="flex: 0 0 auto; width: 7px; height: 7px; border-radius: 50%; background: ${n.gateway}"></span>
              <span class="sp-text sp-text--ink sp-grow" data-part="detail-name" style="font-size: 12px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">GET /checkout</span>
            </div>
            <div class="sp-row" style="gap: 16px; margin-top: 6px">
              <span class="sp-label" style="font-size: 10px">service <span data-part="detail-service" style="color: var(--sp-ink)">gateway</span></span>
              <span class="sp-label" style="font-size: 10px">start <span data-part="detail-start" style="color: var(--sp-ink)">0 ms</span></span>
              <span class="sp-label" style="font-size: 10px">duration <span data-part="detail-dur" style="color: var(--sp-ink)">420 ms</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let o=e(r,`detail`),c=e(r,`detail-dot`),d=e(r,`detail-name`),f=e(r,`detail-service`),p=e(r,`detail-start`),m=e(r,`detail-dur`),h=a=>{o.dataset.span=a.key,c.style.background=n[a.service],d.textContent=a.name,f.textContent=a.service,p.textContent=`${a.start} ms`,m.textContent=`${a.dur} ms`;for(let n of i){let i=e(r,`row-${n.key}`),o=n.key===a.key;t(i,`data-selected`,o),i.style.background=o?`var(--sp-accent-soft)`:`transparent`}};for(let t of i)e(r,`row-${t.key}`).addEventListener(`click`,()=>h(t));h(i[0])}export{d as mount};