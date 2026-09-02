import{n as e,t}from"./parts.C-YLuC7Q.js";import{i as n,r}from"./measure.DK7AY2_i.js";var i=[{name:`Harbour survey`,meta:`Edited 2 days ago`,lines:[96,88,74]},{name:`Tide tables`,meta:`Edited yesterday`,lines:[92,70,84]},{name:`Ferry timings`,meta:`Edited in March`,lines:[88,94,66]},{name:`Lighthouse log`,meta:`Edited in March`,lines:[90,76,82]}],a=140,o=250;function s(s){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 460px; height: 262px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Field library</span><span class="sp-label">4 documents</span></div>
        <div class="sp-row" data-part="split" data-subject data-state="free" style="flex: 1 1 auto; gap: 0; min-height: 0; align-items: stretch">
          <ul class="sp-list sp-scroll" data-part="list" style="width: 150px; flex: 0 0 auto; padding: 6px">${i.map((e,t)=>`
      <li class="sp-list-item" data-part="item-${t+1}" style="cursor: pointer">
        <span class="sp-grow" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">${e.name}</span>
      </li>`).join(``)}</ul>
          <div
            data-part="divider"
            role="separator"
            aria-orientation="vertical"
            aria-label="Resize list"
            tabindex="0"
            style="width: 5px; flex: 0 0 auto; background: var(--sp-line); cursor: col-resize; touch-action: none"
          ></div>
          <section class="sp-grow" data-part="detail" style="padding: 12px 14px; background: var(--sp-sunken)">
            <div class="sp-heading" data-part="detail-title"></div>
            <div class="sp-label" data-part="detail-meta" style="margin-top: 4px"></div>
            <div class="sp-stack" data-part="detail-body" style="margin-top: 12px"></div>
          </section>
        </div>
      </div>
    </div>
  `;let c=e(s,`split`),l=e(s,`list`),u=e(s,`detail-title`),d=e(s,`detail-meta`),f=e(s,`detail-body`),p=i.map((t,n)=>e(s,`item-${n+1}`)),m=e=>{let t=Math.min(Math.max(e,a),o);l.style.width=`${t}px`,c.dataset.state=t<=140.5?`min`:t>=249.5?`max`:`free`},h=e=>{let n=i[e];n&&(p.forEach((n,r)=>{t(n,`data-selected`,r===e)}),u.textContent=n.name,d.textContent=n.meta,f.innerHTML=n.lines.map(e=>`<div class="sp-line" style="width: ${e}%"></div>`).join(``))};p.forEach((e,t)=>{e.addEventListener(`click`,()=>h(t))}),h(0);let g=e(s,`divider`),_=!1;g.addEventListener(`pointerdown`,e=>{e.isTrusted&&g.setPointerCapture(e.pointerId),_=!0}),s.addEventListener(`pointermove`,e=>{_&&m(r(e,c).x)});let v=()=>{_=!1};s.addEventListener(`pointerup`,v),s.addEventListener(`pointercancel`,v),g.addEventListener(`keydown`,e=>{(e.key===`ArrowLeft`||e.key===`ArrowRight`)&&(m(n(l).width+(e.key===`ArrowRight`?20:-20)),e.preventDefault())})}export{s as mount};