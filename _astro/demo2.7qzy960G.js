import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./motion.B5_YXmsy.js";var r=1500,i=400,a=[[`4.2.0`,`Ferry times now honour the local timezone`],[`4.1.6`,`Fixed the harbour map losing its pins on rotate`],[`4.1.5`,`Faster first paint on the timetable`],[`4.1.4`,`Saved routes survive a cold start`],[`4.1.3`,`Corrected the Kalkan berth number`],[`4.1.2`,`Offline notice no longer covers the search field`],[`4.1.1`,`Tide chart labels read in dark mode`],[`4.1.0`,`Seat holds show the time remaining`],[`4.0.9`,`Fewer duplicate departure alerts`],[`4.0.8`,`Boarding passes export as PDF`]];function o(o,s){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 256px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Release notes</span>
          <span class="sp-text" data-part="readout" data-at="room" style="width: 130px; text-align: right">Room to scroll</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">
          <div data-part="panel" style="position: relative; flex: 1 1 auto; min-height: 0">
            <div class="sp-scroll sp-surface" data-part="scroller" style="height: 100%">
              <ul class="sp-list" style="padding: 4px 6px">${a.map(([e,t])=>`
      <li class="sp-list-item">
        <span class="sp-label" style="width: 42px">${e}</span>
        <span class="sp-grow sp-text sp-text--ink">${t}</span>
      </li>`).join(``)}</ul>
            </div>
            <div
              data-part="glow"
              data-subject
              style="position: absolute; left: 1px; right: 1px; bottom: 1px; height: 26px; border-radius: 0 0 var(--sp-radius) var(--sp-radius); background: radial-gradient(120% 100% at 50% 100%, var(--sp-accent), transparent 70%); opacity: 0; visibility: hidden; transition: opacity 0.2s, visibility 0.2s; pointer-events: none"
            ></div>
          </div>
        </div>
      </div>
    </div>
  `;let c=e(o,`scroller`),l=e(o,`panel`),u=e(o,`glow`),d=e(o,`readout`),f,p=!1,m=e=>{t(u,`data-open`,e),u.style.opacity=e?`0.55`:`0`,u.style.visibility=e?`visible`:`hidden`},h=()=>{p||(p=!0,d.dataset.at=`end`,d.textContent=`End of list`,m(!0),s.clearTimeout(f),f=s.setTimeout(()=>m(!1),r),!n(o)&&l.animate([{transform:`translateY(0)`},{transform:`translateY(-12px)`,offset:.35},{transform:`translateY(0)`}],{duration:i,easing:`ease-out`}))},g=()=>{p&&(p=!1,d.dataset.at=`room`,d.textContent=`Room to scroll`,s.clearTimeout(f),m(!1))};c.addEventListener(`scroll`,()=>{c.scrollHeight-c.clientHeight-c.scrollTop<=2?h():g()})}export{o as mount};