import{n as e}from"./parts.C-YLuC7Q.js";var t=[`Mo`,`Tu`,`We`,`Th`,`Fr`,`Sa`,`Su`],n=[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`,`Sun`],r=`April 2025`,i=[[{n:31,out:!0},{n:1},{n:2},{n:3},{n:4},{n:5},{n:6}],[{n:7},{n:8},{n:9},{n:10},{n:11},{n:12},{n:13}],[{n:14},{n:15},{n:16},{n:17},{n:18},{n:19},{n:20}],[{n:21},{n:22},{n:23},{n:24},{n:25},{n:26},{n:27}],[{n:28},{n:29},{n:30},{n:1,out:!0},{n:2,out:!0},{n:3,out:!0},{n:4,out:!0}]],a=(e,t)=>{if(e.out)return`<button class="sp-day" type="button" role="gridcell" data-outside aria-disabled="true" tabindex="-1" style="width: 28px">${e.n}</button>`;let r=`${n[t]} ${e.n} April 2025`;return`<button
    class="sp-day"
    type="button"
    role="gridcell"
    data-part="day-${e.n}"
    data-n="${e.n}"
    aria-selected="false"
    aria-label="${r}"
    style="width: 28px"
  >${e.n}</button>`},o=(e,t)=>e===null?`Pick the first night`:t===null?`${e} April to …`:`${e} to ${t} April, ${t-e} nights`;function s(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Stay dates</span>
          <span class="sp-label">Casa del Faro</span>
        </div>
        <div class="sp-body" style="display: flex; gap: 12px; padding: 12px">
          <div class="sp-stack sp-context" style="width: 118px; flex: 0 0 auto; gap: 6px">
            <span class="sp-label">Presets</span>
            <button class="sp-chip" type="button" data-part="preset" style="justify-content: center">This week</button>
            <button class="sp-chip" type="button" style="justify-content: center">Next weekend</button>
            <p class="sp-text" style="margin: 4px 0 0; font-size: 12px">The rate changes at the weekend.</p>
          </div>
          <div
            class="sp-surface"
            data-part="panel"
            data-subject
            data-range="none"
            role="group"
            aria-label="Stay dates"
            style="flex: 1 1 auto; padding: 10px 12px"
          >
            <span class="sp-label sp-text--ink" id="vd-drp-month">${r}</span>
            <div
              class="sp-grid"
              data-part="grid"
              role="grid"
              aria-labelledby="vd-drp-month"
              style="grid-template-columns: repeat(7, 28px); gap: 3px 0; margin-top: 6px; justify-content: center"
            >
              <div role="row" style="display: contents">${t.map(e=>`<span class="sp-label" role="columnheader" style="width: 28px; text-align: center; font-size: 11px">${e}</span>`).join(``)}</div>
              ${i.map(e=>`<div role="row" style="display: contents">${e.map(a).join(``)}</div>`).join(``)}
            </div>
            <div class="sp-divider" style="margin: 8px 0"></div>
            <span
              class="sp-text"
              data-part="readout"
              role="status"
              style="display: block; height: 18px; white-space: nowrap"
            ></span>
          </div>
        </div>
      </div>
    </div>
  `;let s=e(n,`panel`),c=e(n,`grid`),l=e(n,`readout`),u=[...c.querySelectorAll(`button[data-n]`)],d=null,f=null,p=e=>{let t=f??(e!==null&&d!==null&&e>d?e:null),n=d!==null&&t!==null?Math.min(d,t):0,r=d!==null&&t!==null?Math.max(d,t):-1;for(let e of u){let i=Number(e.dataset.n),a=i===d||i===f,o=i>n&&i<r,s=f===null&&i===t;if(e.setAttribute(`aria-selected`,String(a)),!a&&(o||s)){e.dataset.inRange=``,e.style.background=`var(--sp-accent-soft)`,e.style.borderRadius=s?`0 6px 6px 0`:`0`;continue}delete e.dataset.inRange,e.style.removeProperty(`background`),e.style.removeProperty(`border-radius`)}d===null?s.dataset.range=`none`:f===null?s.dataset.range=`start`:s.dataset.range=`complete`,l.textContent=o(d,f)},m=e=>{d===null||f!==null||e<d?(d=e,f=null):e>d&&(f=e),p(null)};for(let e of u)e.addEventListener(`click`,()=>m(Number(e.dataset.n)));c.addEventListener(`pointerover`,e=>{if(d===null||f!==null)return;let t=e.target.closest(`button[data-n]`);t&&p(Number(t.dataset.n))}),e(n,`preset`).addEventListener(`click`,()=>{d=7,f=13,p(null)}),p(null)}export{s as mount};