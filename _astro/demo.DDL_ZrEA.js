import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=[`Mo`,`Tu`,`We`,`Th`,`Fr`,`Sa`,`Su`],i=[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`,`Sun`],a=`April 2025`,o=9,s=[[{n:31,out:!0},{n:1},{n:2},{n:3},{n:4},{n:5},{n:6}],[{n:7},{n:8},{n:9},{n:10},{n:11},{n:12},{n:13}],[{n:14},{n:15},{n:16},{n:17},{n:18},{n:19},{n:20}],[{n:21},{n:22},{n:23},{n:24},{n:25},{n:26},{n:27}],[{n:28},{n:29},{n:30},{n:1,out:!0},{n:2,out:!0},{n:3,out:!0},{n:4,out:!0}]],c=(e,t)=>{let n=`${i[t]} ${e.n} Apr 2025`;if(e.out)return`<button class="sp-day" type="button" role="gridcell" data-outside aria-disabled="true" tabindex="-1">${e.n}</button>`;let r=e.n===o?` data-today`:``;return`<button class="sp-day" type="button" role="gridcell" aria-selected="false" data-part="day-${e.n}" data-when="${n}" aria-label="${n}"${r}>${e.n}</button>`};function l(i){let o=r.map(e=>`<span class="sp-label" role="columnheader" style="text-align: center; font-size: 11px">${e}</span>`).join(``),l=s.map(e=>`<div role="row" style="display: contents">${e.map(c).join(``)}</div>`).join(``);i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="height: 300px">
        <div class="sp-topbar">
          <span class="sp-label sp-context" style="width: 52px">Delivery</span>
          <input
            class="sp-input"
            type="text"
            data-part="field"
            style="width: 176px"
            placeholder="Pick a date"
            aria-label="Delivery date"
          />
          <button
            class="sp-icon-button"
            type="button"
            data-part="trigger"
            aria-expanded="false"
            aria-haspopup="dialog"
            aria-label="Choose a date"
          >${n(`calendar`)}</button>
        </div>
        <div class="sp-body sp-context">
          <div class="sp-stack">
            <div class="sp-surface sp-row" style="padding: 10px">
              <span class="sp-grow sp-text sp-text--ink">Two crates of oranges</span>
              <span class="sp-text">£38</span>
            </div>
            <div class="sp-surface sp-row" style="padding: 10px">
              <span class="sp-grow sp-text sp-text--ink">Delivery</span>
              <span class="sp-text">£6</span>
            </div>
            <p class="sp-text" style="margin: 0">Slots differ by day of the week.</p>
          </div>
        </div>
        <div
          class="sp-popover"
          data-part="calendar"
          data-subject
          role="dialog"
          aria-label="Choose a delivery date"
          style="top: 60px; left: 75px; --sp-arrow-x: 196px"
        >
          <div class="sp-row sp-row--between">
            <span class="sp-label sp-text--ink" id="vd-dp-month">${a}</span>
          </div>
          <div
            class="sp-grid"
            data-part="grid"
            role="grid"
            aria-labelledby="vd-dp-month"
            style="grid-template-columns: repeat(7, 28px); gap: 2px 4px; margin-top: 8px"
          >
            <div role="row" style="display: contents">${o}</div>
            ${l}
          </div>
        </div>
      </div>
    </div>
  `;let u=e(i,`calendar`),d=e(i,`trigger`),f=e(i,`grid`),p=e(i,`field`),m=[...f.querySelectorAll(`button[data-when]`)],h=e=>{t(u,`data-open`,e),d.setAttribute(`aria-expanded`,String(e))};d.addEventListener(`click`,()=>h(!0));for(let e of m)e.addEventListener(`click`,()=>{for(let t of m)t.setAttribute(`aria-selected`,String(t===e));let t=e.dataset.when??``;p.value=t,p.setAttribute(`data-picked`,t),h(!1)});i.addEventListener(`pointerdown`,e=>{let t=e.target;!u.contains(t)&&!d.contains(t)&&h(!1)}),i.addEventListener(`keydown`,e=>{e.key===`Escape`&&h(!1)})}export{l as mount};