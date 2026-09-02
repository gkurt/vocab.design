import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=[`2025-04`,`2025-05`],r=[`January`,`February`,`March`,`April`,`May`,`June`,`July`,`August`,`September`,`October`,`November`,`December`],i=[`Mo`,`Tu`,`We`,`Th`,`Fr`,`Sa`,`Su`],a=[`Monday`,`Tuesday`,`Wednesday`,`Thursday`,`Friday`,`Saturday`,`Sunday`],o=`2025-04-09`;function s(e){let[t,n]=e.split(`-`).map(Number),r=new Date(Date.UTC(t,n-1,1)),i=new Date(r);return i.setUTCDate(1-(r.getUTCDay()+6)%7),Array.from({length:35},(t,n)=>{let r=new Date(i);r.setUTCDate(i.getUTCDate()+n);let a=r.toISOString().slice(0,10);return{iso:a,day:r.getUTCDate(),outside:!a.startsWith(e)}})}var c=e=>{let[t,n]=e.split(`-`).map(Number);return`${r[n-1]} ${t}`},l=(e,t,n)=>`${a[t]} ${e.day} ${c(n)}`;function u(u){let d=i.map((e,t)=>`<span class="sp-label" role="columnheader" aria-label="${a[t]}" style="text-align: center; font-size: 11px">${e}</span>`).join(``);u.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 300px; height: 340px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Studio booking</span></div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface" data-part="calendar" data-subject style="padding: 10px 12px 12px">
            <div class="sp-row sp-row--between">
              <button class="sp-icon-button" type="button" data-part="nav-prev" aria-label="Previous month">${t(`chevronLeft`)}</button>
              <span
                class="sp-label sp-text--ink"
                data-part="month"
                data-month="${n[0]}"
                id="vd-cal-month"
                aria-live="polite"
                style="width: 110px; text-align: center"
              >${c(n[0])}</span>
              <button class="sp-icon-button" type="button" data-part="nav-next" aria-label="Next month">${t(`chevronRight`)}</button>
            </div>
            <div
              class="sp-grid"
              data-part="grid"
              role="grid"
              aria-labelledby="vd-cal-month"
              style="grid-template-columns: repeat(7, 28px); gap: 2px 4px; margin-top: 6px"
            >
              <div role="row" style="display: contents">${d}</div>
              <div data-part="weeks" style="display: contents"></div>
            </div>
          </div>
          <div class="sp-row sp-row--between">
            <span class="sp-label">Session</span>
            <span class="sp-text sp-text--ink" data-part="chosen" data-chosen="" style="width: 120px; text-align: right">No day chosen</span>
          </div>
        </div>
      </div>
    </div>
  `;let f=e(u,`weeks`),p=e(u,`month`),m=e(u,`nav-prev`),h=e(u,`nav-next`),g=e(u,`chosen`),_=0,v=``,y=``,b=()=>{let e=n[_],t=s(e),r=t.filter(e=>!e.outside);r.some(e=>e.iso===y)||(y=(r.find(e=>e.iso===v)??r[0])?.iso??``),p.textContent=c(e),p.dataset.month=e,f.innerHTML=Array.from({length:5},(n,r)=>`<div role="row" style="display: contents">${t.slice(r*7,r*7+7).map((t,n)=>{if(t.outside)return`<button class="sp-day" type="button" role="gridcell" data-outside aria-disabled="true" tabindex="-1">${t.day}</button>`;let r=[t.iso===o?` data-today aria-current="date"`:``,t.iso===v?` aria-selected="true"`:` aria-selected="false"`].join(``);return`<button
          class="sp-day"
          type="button"
          role="gridcell"
          data-part="day-${t.iso}"
          data-iso="${t.iso}"
          tabindex="${t.iso===y?0:-1}"
          aria-label="${l(t,n,e)}"${r}
        >${t.day}</button>`}).join(``)}</div>`).join(``);for(let[e,t]of[[m,_===0],[h,_===n.length-1]])e.setAttribute(`aria-disabled`,String(t))},x=e=>{v=e,y=e;let[t,n,i]=e.split(`-`).map(Number);g.textContent=`${i} ${r[n-1]?.slice(0,3)} ${t}`,g.dataset.chosen=e,b()},S=e=>{let t=Math.min(n.length-1,Math.max(0,e));t!==_&&(_=t,b())};m.addEventListener(`click`,()=>S(_-1)),h.addEventListener(`click`,()=>S(_+1)),f.addEventListener(`click`,e=>{let t=e.target.closest(`[data-iso]`);t&&x(t.dataset.iso)}),f.addEventListener(`keydown`,t=>{let r=s(n[_]).filter(e=>!e.outside),i=r.findIndex(e=>e.iso===y),a={ArrowRight:1,ArrowLeft:-1,ArrowDown:7,ArrowUp:-7}[t.key];if(a!==void 0){let n=r[Math.min(r.length-1,Math.max(0,i+a))];if(!n)return;t.preventDefault(),y=n.iso,b(),t.isTrusted&&e(u,`day-${y}`).focus();return}if(t.key===`Enter`||t.key===` `){t.preventDefault(),y&&x(y);return}if(t.key===`PageDown`)S(_+1);else if(t.key===`PageUp`)S(_-1);else return;t.preventDefault()}),b()}export{u as mount};