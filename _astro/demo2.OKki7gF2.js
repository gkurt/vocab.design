import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`#0c0e13`,n={modular:{slot:{left:12,top:82,width:166,height:42,form:`large`},temp:{left:24,top:136,width:52,height:52,form:`medium`},battery:{left:114,top:136,width:52,height:52,form:`medium`},time:{left:12,top:34,align:`left`},date:!0,size:`166 by 42`,note:`A wide slot, so the same complication can afford its icon, its name and its full figure.`},circular:{slot:{left:16,top:104,width:52,height:52,form:`medium`},temp:{left:69,top:104,width:52,height:52,form:`medium`},battery:{left:122,top:104,width:52,height:52,form:`medium`},time:{left:12,top:40,align:`center`},date:!0,size:`52 by 52`,note:`A round slot the size of a coin: the ring and an abbreviated figure survive, the name does not.`},corner:{slot:{left:14,top:14,width:34,height:34,form:`small`},temp:{left:142,top:14,width:34,height:34,form:`small`},battery:{left:142,top:166,width:34,height:34,form:`small`},time:{left:12,top:88,align:`center`},date:!1,size:`34 by 34`,note:`A corner grants a ring and nothing else, so the figure has to be readable as an arc alone.`}},r=(e,n,r,i,a)=>`
  <span
    style="position: relative; flex: 0 0 auto; width: ${e}px; height: ${e}px; border-radius: 50%;
           background: conic-gradient(var(--sp-accent) 0 ${n}%, rgb(255 255 255 / 0.16) ${n}% 100%)"
  >
    <span style="position: absolute; inset: ${Math.max(3,Math.round(e*.11))}px; border-radius: 50%; background: ${t}"></span>
    ${i?`<span ${a?`data-part="comp-value"`:``} style="position: absolute; inset: 0; display: flex; align-items: center;
             justify-content: center; font-size: ${e>44?12:10}px; font-weight: 600; font-variant-numeric: tabular-nums">${r}</span>`:``}
  </span>`,i=(e,t,n,i,a,o)=>e===`large`?`<span style="display: flex; align-items: center; gap: 10px; width: 100%; height: 100%; padding: 0 12px;
              border-radius: 12px; background: rgb(255 255 255 / 0.07)">
        ${r(26,a,n,!1,o)}
        <span style="display: flex; flex-direction: column; gap: 1px; min-width: 0">
          <span style="font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--sp-muted)">${t}</span>
          <span ${o?`data-part="comp-value"`:``} style="font-size: 15px; font-weight: 600; font-variant-numeric: tabular-nums">${i}</span>
        </span>
      </span>`:e===`medium`?r(52,a,n,!0,o):r(34,a,n,!1,o),a=(e,t)=>{e.style.left=`${t.left}px`,e.style.top=`${t.top}px`,e.style.width=`${t.width}px`,e.style.height=`${t.height}px`};function o(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 276px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Watch face</span>
          <span class="sp-label" style="font-size: 12px">Step count from Trails</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; gap: 18px">
          <div
            data-part="face"
            data-family="modular"
            style="position: relative; flex: 0 0 auto; width: 190px; height: 214px; border-radius: 42px; background: ${t};
                   box-shadow: 0 0 0 5px #2a2e36, var(--sp-shadow); overflow: hidden;
                   --sp-accent: #6ea8ff; --sp-ink: #f3f5f9; --sp-muted: #9aa3b2;
                   --sp-context-accent: #8e97a5; --sp-context-accent-soft: #262b34; color: #f3f5f9"
          >
            <span
              class="sp-context"
              data-part="date"
              style="position: absolute; left: 12px; top: 12px; font-size: 10px; letter-spacing: 0.08em; color: var(--sp-muted)"
            >TUE 12</span>
            <span
              class="sp-context"
              data-part="time"
              style="position: absolute; left: 12px; top: 34px; width: 166px; font-size: 36px; font-weight: 600;
                     font-variant-numeric: tabular-nums; line-height: 1.1"
            >10:09</span>

            <span data-part="comp" data-subject data-size="large" style="position: absolute; display: flex"></span>
            <span class="sp-context" data-part="comp-temp" style="position: absolute; display: flex"></span>
            <span class="sp-context" data-part="comp-battery" style="position: absolute; display: flex"></span>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 auto; min-width: 0; gap: 10px">
            <sp-segmented data-stage-mode class="sp-segmented" data-axis="Face" data-part="picker" data-value="modular" style="align-self: flex-start">
              <button class="sp-segment" type="button" data-part="seg-modular" value="modular" style="padding: 4px 9px; font-size: 12px">Modular</button>
              <button class="sp-segment" type="button" data-part="seg-circular" value="circular" style="padding: 4px 9px; font-size: 12px">Circular</button>
              <button class="sp-segment" type="button" data-part="seg-corner" value="corner" style="padding: 4px 9px; font-size: 12px">Corner</button>
            </sp-segmented>

            <div class="sp-row sp-row--between">
              <span class="sp-label">Slot granted</span>
              <span class="sp-text sp-text--ink" data-part="slot-size" style="font-size: 12px; font-variant-numeric: tabular-nums">166 by 42</span>
            </div>
            <p class="sp-text" data-stage-verdict data-part="note" style="margin: 0; height: 48px; font-size: 11px; line-height: 1.45">${n.modular?.note??``}</p>
          </div>
        </div>
      </div>
    </div>
  `;let o=e(r,`face`),s=e(r,`comp`),c=e(r,`comp-temp`),l=e(r,`comp-battery`),u=e(r,`time`),d=e(r,`date`),f=e(r,`note`),p=t=>{let p=n[t]??n.modular;p&&(a(s,p.slot),s.dataset.size=p.slot.form,s.innerHTML=i(p.slot.form,`Steps`,`7.4K`,`7,420`,62,!0),a(c,p.temp),c.innerHTML=i(p.temp.form,`Temp`,`18°`,`18°C`,44,!1),a(l,p.battery),l.innerHTML=i(p.battery.form,`Battery`,`81%`,`81%`,81,!1),u.style.left=`${p.time.left}px`,u.style.top=`${p.time.top}px`,u.style.textAlign=p.time.align,d.hidden=!p.date,o.dataset.family=t,e(r,`slot-size`).textContent=p.size,f.textContent=p.note)};e(r,`picker`).addEventListener(`change`,e=>p(e.detail)),p(`modular`)}export{o as mount};