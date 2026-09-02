import{n as e,r as t}from"./parts.C-YLuC7Q.js";var n=25,r=35,i=196,a=[{id:`mon`,label:`Today &middot; Mon 14`,events:[{id:`review`,time:`9:30`,title:`Design review`,length:`45 min`,next:!0},{id:`client`,time:`13:00`,title:`Client call`,length:`30 min`},{id:`retro`,time:`16:00`,title:`Retro`,length:`1 hr`}]},{id:`tue`,label:`Tue 15`,events:[]},{id:`wed`,label:`Wed 16`,events:[{id:`deploy`,time:`11:00`,title:`Deploy`,length:`30 min`},{id:`oneone`,time:`15:00`,title:`1:1 with Sam`,length:`30 min`}]},{id:`thu`,label:`Thu 17`,events:[{id:`workshop`,time:`10:00`,title:`Workshop`,length:`2 hr`},{id:`interview`,time:`14:00`,title:`Interview`,length:`45 min`}]},{id:`fri`,label:`Fri 18`,events:[{id:`talk`,time:`12:00`,title:`Lunch talk`,length:`1 hr`}]}],o=e=>e.label.replace(/^Today &middot; /,``),s=e=>`
  <li
    data-part="ev-${e.id}"
    style="display: flex; align-items: center; gap: 9px; height: ${r}px; padding: 0 10px; border-top: 1px solid var(--sp-line)"
  >
    <span style="flex: 0 0 auto; width: 42px; text-align: right; font-size: 12px; color: var(--sp-muted); font-variant-numeric: tabular-nums">${e.time}</span>
    <span aria-hidden="true" style="flex: 0 0 auto; width: 3px; height: 18px; border-radius: 2px; background: var(--sp-accent)"></span>
    <span class="sp-grow" style="font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${e.title}</span>
    ${e.next?`<span class="sp-chip" data-part="next-chip" data-selected style="flex: 0 0 auto; padding: 1px 7px; font-size: 10px">Next</span>`:`<span style="flex: 0 0 auto; font-size: 11px; color: var(--sp-muted); white-space: nowrap">${e.length}</span>`}
  </li>`,c=a.map(e=>`
    <li>
      <h3
        class="sp-label"
        data-part="day-${e.id}"
        data-day="${e.id}"
        style="position: sticky; top: 0; z-index: 1; margin: 0; height: ${n}px; padding: 0 10px;
               background: var(--sp-sunken); border-top: 1px solid var(--sp-line); font-size: 11px; line-height: ${n}px"
      >${e.label}</h3>
      <ul style="margin: 0; padding: 0; list-style: none">
        ${e.events.length?e.events.map(s).join(``):`<li
                 data-part="empty-day"
                 style="display: flex; align-items: center; height: 34px; padding: 0 10px 0 54px; border-top: 1px solid var(--sp-line);
                        font-size: 12px; color: var(--sp-muted)"
               >Nothing scheduled</li>`}
      </ul>
    </li>`).join(``);function l(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 400px; height: 306px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Agenda</span>
          <span
            class="sp-label"
            data-part="header-day"
            style="flex: 0 0 auto; width: 92px; text-align: right; white-space: nowrap"
          >${o(a[0])}</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center">
          <ul
            class="sp-surface sp-scroll"
            data-part="agenda"
            data-subject
            data-top-day="mon"
            aria-label="Agenda"
            style="position: relative; flex: 0 0 auto; width: 374px; height: ${i}px; margin: 0; padding: 0; list-style: none"
          >${c}</ul>
        </div>
      </div>
    </div>
  `;let r=e(n,`agenda`),s=e(n,`header-day`),l=a.map(t=>({day:t,el:e(n,`day-${t.id}`)})),u=()=>{let e=l[0];for(let t of l)t.el.offsetTop<=r.scrollTop+1&&(e=t);if(e){r.dataset.topDay=e.day.id,s.textContent=o(e.day);for(let r of t(n,`day-${e.day.id}`))r.setAttribute(`data-current`,``);for(let t of l)t.day.id!==e.day.id&&t.el.removeAttribute(`data-current`)}};r.addEventListener(`scroll`,u),u()}export{l as mount};