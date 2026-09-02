import{n as e,t}from"./parts.C-YLuC7Q.js";var n=80,r=[{title:`Fuel berth closed`,date:`2 Nov`,body:`The fuel berth is out of service while the delivery line is replaced.`},{title:`Dredging, inner basin`,date:`6 Nov`,body:`The inner basin is being dredged to 2.4 metres; expect the survey launch on station.`},{title:`Winter mooring fees`,date:`14 Nov`,body:`Winter rates apply from the first of December and are billed by the month, not the season.`},{title:`Pontoon C resurfacing`,date:`19 Nov`,body:`Pontoon C is closed to foot traffic while the decking boards are lifted and relaid.`},{title:`Night entry lights`,date:`23 Nov`,body:`The leading lights on the north wall now show a fixed red until the sector lamp is repaired.`},{title:`Slipway booking change`,date:`28 Nov`,body:`Slipway slots are booked by the tide rather than the hour for the rest of the winter.`}],i=2;function a(a){let o=r.map((e,t)=>`
      <div
        class="sp-surface${t===i?``:` sp-context`}"
        data-part="row-${t+1}"
        data-state="${t===i?`focus`:`context`}"
        ${t===i?`data-subject`:``}
        role="button"
        aria-pressed="${t===i}"
        style="overflow: hidden; padding: 3px 10px; cursor: pointer;
               background: var(--sp-${t===i?`surface`:`sunken`});
               flex: ${t===i?`0 0 ${n}px`:`1 1 0`};
               transition: flex-basis 0.3s var(--sp-ease), flex-grow 0.3s var(--sp-ease), background-color 0.3s ease"
      >
        <div class="sp-row" style="gap: 8px">
          <span
            class="sp-label"
            data-part="title-${t+1}"
            style="font-size: 11px; line-height: 1.3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
                   color: var(--sp-${t===i?`ink`:`muted`}); font-weight: ${t===i?600:500}"
          >${e.title}</span>
          <span class="sp-grow"></span>
          <span class="sp-label" style="flex: 0 0 auto; font-size: 10px; line-height: 1.3">${e.date}</span>
        </div>
        <div class="sp-stack" data-part="detail-${t+1}" style="gap: 7px; margin-top: 7px"${t===i?``:` hidden`}>
          <span class="sp-text" style="font-size: 11px; line-height: 1.4">${e.body}</span>
          <div class="sp-line" style="width: 62%"></div>
        </div>
      </div>`).join(``);a.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 276px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Harbour notices</span>
          <span class="sp-label" data-part="readout" role="status" style="flex: 0 0 auto; font-size: 11px; white-space: nowrap">In full detail: ${r[i]?.title}</span>
        </div>

        <div class="sp-body" style="padding: 12px">
          <div data-part="column" style="display: flex; flex-direction: column; gap: 4px; height: 100%">${o}</div>
        </div>
      </div>
    </div>
  `;let s=r.map((t,n)=>e(a,`row-${n+1}`)),c=r.map((t,n)=>e(a,`title-${n+1}`)),l=r.map((t,n)=>e(a,`detail-${n+1}`)),u=e(a,`readout`),d=e=>{for(let[r,i]of s.entries()){let a=r===e;i.dataset.state=a?`focus`:`context`,i.setAttribute(`aria-pressed`,String(a)),i.classList.toggle(`sp-context`,!a),i.style.background=`var(--sp-${a?`surface`:`sunken`})`,i.style.flex=a?`0 0 ${n}px`:`1 1 0`,t(i,`data-subject`,a);let o=c[r];o&&(o.style.color=`var(--sp-${a?`ink`:`muted`})`,o.style.fontWeight=a?`600`:`500`);let s=l[r];s&&t(s,`hidden`,!a)}u.textContent=`In full detail: ${r[e]?.title}`};for(let[e,t]of s.entries())t.addEventListener(`click`,()=>d(e));d(i)}export{a as mount};