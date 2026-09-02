import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[`a`,`b`,`c`],r=[`Q1`,`Q2`,`Q3`],i=[{key:`1`,region:`North`,values:[`4120`,`4380`,`4510`]},{key:`2`,region:`South`,values:[`2870`,`2940`,`3105`]},{key:`3`,region:`East`,values:[`1960`,`2080`,`1240`]},{key:`4`,region:`West`,values:[`3340`,`3290`,`3475`]}],a=(e,t)=>`${e.toUpperCase()}${t+1}`;function o(o){let s=i.map((e,t)=>`
      <tr role="row" data-part="row-${e.key}">
        <td role="rowheader" style="width: 118px; color: var(--sp-ink)">${e.region}</td>
        ${n.map((n,r)=>`
          <td
            role="gridcell"
            tabindex="-1"
            data-part="cell-${n}${t+1}"
            data-value="${e.values[r]}"
            style="position: relative; width: 102px; text-align: right; font-variant-numeric: tabular-nums"
          ><span data-part="text-${n}${t+1}">${e.values[r]}</span></td>`).join(``)}
      </tr>`).join(``);o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 258px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Forecast</span>
          <span class="sp-label" data-part="ref" data-cell="A1" style="width: 24px; text-align: right">A1</span>
          <span class="sp-label" data-part="mode" data-value="ready" style="width: 50px; text-align: right">Ready</span>
        </div>
        <div class="sp-body">
          <div class="sp-surface" style="padding: 3px">
            <table class="sp-table" data-part="grid" data-subject role="grid" aria-label="Regional forecast" style="--sp-cell-pad: 6px 9px">
              <thead>
                <tr role="row">
                  <td style="width: 118px"></td>
                  ${r.map(e=>`<th role="columnheader" style="width: 102px; text-align: right">${e}</th>`).join(``)}
                </tr>
              </thead>
              <tbody>${s}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;let c=e(o,`ref`),l=e(o,`mode`),u=(t,n)=>e(o,`cell-${t}${n+1}`),d=o.ownerDocument.createElement(`input`);d.className=`sp-input`,d.dataset.part=`editor`,d.setAttribute(`aria-label`,`Cell value`),d.hidden=!0,d.style.cssText=`position: absolute; inset: 0; width: auto; padding: 0 8px; border-radius: 3px; border-color: var(--sp-accent); text-align: right; font-variant-numeric: tabular-nums`,u(`a`,0).append(d);let f=`a`,p=0,m=!1,h=()=>{for(let[e]of i.entries())for(let r of n){let n=u(r,e),i=r===f&&e===p;n.tabIndex=i?0:-1,t(n,`data-active`,i),t(n,`data-sim-focus`,i)}c.dataset.cell=a(f,p),c.textContent=a(f,p),l.dataset.value=m?`editing`:`ready`,l.textContent=m?`Editing`:`Ready`},g=()=>{m=!1,d.hidden=!0,d.value=``},_=()=>{u(f,p).append(d),d.value=``,d.hidden=!1,m=!0,h()},v=()=>{if(!m)return;let t=d.value.trim();t!==``&&(u(f,p).dataset.value=t,e(o,`text-${f}${p+1}`).textContent=t),g(),h()},y=(e,t)=>{v(),f=e,p=Math.min(Math.max(t,0),i.length-1),h()},b=(e,t)=>{let r=Math.min(Math.max(n.indexOf(f)+e,0),n.length-1);y(n[r],p+t)};for(let[e]of i.entries())for(let t of n)u(t,e).addEventListener(`click`,()=>{m&&t===f&&e===p||y(t,e)});o.addEventListener(`keydown`,e=>{if(m){if(e.key===`Enter`)v();else if(e.key===`Escape`)g(),h();else return;e.preventDefault();return}if(e.key===`ArrowRight`)b(1,0);else if(e.key===`ArrowLeft`)b(-1,0);else if(e.key===`ArrowDown`)b(0,1);else if(e.key===`ArrowUp`)b(0,-1);else if(e.key===`Home`)y(`a`,p);else if(e.key===`End`)y(`c`,p);else if(e.key===`Enter`||e.key===`F2`)_();else return;e.preventDefault()}),h()}export{o as mount};