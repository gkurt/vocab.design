import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=Array.from({length:12},(e,t)=>t+1),n=Array.from({length:12},(e,t)=>t*5),r=e=>String(e).padStart(2,`0`),i=(e,t,n)=>`<li class="sp-option" role="option" data-part="${e}" aria-selected="${n}" style="text-align: center">${t}</li>`;function a(a){let o=9,s=30,c=`AM`;a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="height: 320px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Book a slot</span>
          <span class="sp-label">Tue 14</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div class="sp-surface" data-part="picker" data-subject style="width: 268px; padding: 12px">
            <div class="sp-row sp-row--between" style="margin-bottom: 10px">
              <span class="sp-label">Start</span>
              <span
                data-part="readout"
                data-time="09:30 AM"
                role="status"
                style="font-size: 19px; font-weight: 600; font-variant-numeric: tabular-nums"
              >09:30 AM</span>
            </div>
            <div class="sp-row" style="align-items: stretch; gap: 8px">
              <ul
                class="sp-listbox sp-listbox--static sp-grow"
                data-part="hours"
                role="listbox"
                aria-label="Hour"
                style="height: 136px; max-height: 136px; overflow: auto; box-shadow: none"
              >${t.map(e=>i(`hour-${e}`,r(e),e===9)).join(``)}</ul>
              <ul
                class="sp-listbox sp-listbox--static sp-grow"
                data-part="minutes"
                role="listbox"
                aria-label="Minute"
                style="height: 136px; max-height: 136px; overflow: auto; box-shadow: none"
              >${n.map(e=>i(`min-${r(e)}`,r(e),e===30)).join(``)}</ul>
            </div>
            <sp-segmented
              class="sp-segmented"
              data-part="meridiem"
              data-axis="Meridiem"
              data-value="am"
              style="display: flex; width: 100%; margin-top: 10px"
            >
              <button class="sp-segment sp-grow" type="button" data-part="seg-am" value="am">AM</button>
              <button class="sp-segment sp-grow" type="button" data-part="seg-pm" value="pm">PM</button>
            </sp-segmented>
          </div>
        </div>
      </div>
    </div>
  `;let l=e(a,`readout`),u=e(a,`hours`),d=e(a,`minutes`),f=(e,t)=>{e.scrollTop=t.offsetTop-e.clientHeight/2+t.offsetHeight/2},p=i=>{for(let n of t)e(a,`hour-${n}`).setAttribute(`aria-selected`,String(n===o));for(let t of n)e(a,`min-${r(t)}`).setAttribute(`aria-selected`,String(t===s));let p=`${r(o)}:${r(s)} ${c}`;l.textContent=p,l.dataset.time=p,i===`hours`&&f(u,e(a,`hour-${o}`)),i===`minutes`&&f(d,e(a,`min-${r(s)}`))};for(let n of t)e(a,`hour-${n}`).addEventListener(`click`,()=>{o=n,p()});for(let t of n)e(a,`min-${r(t)}`).addEventListener(`click`,()=>{s=t,p()});let m=(e,t)=>{e===`hours`?o=(o-1+t+12)%12+1:s=(s+t*5+60)%60,p(e)},h=e=>t=>{let n=t.key;(n===`ArrowDown`||n===`ArrowUp`)&&(t.preventDefault(),m(e,n===`ArrowDown`?1:-1))};u.addEventListener(`keydown`,h(`hours`)),d.addEventListener(`keydown`,h(`minutes`)),e(a,`meridiem`).addEventListener(`change`,e=>{c=e.detail===`pm`?`PM`:`AM`,p()}),f(u,e(a,`hour-${o}`)),f(d,e(a,`min-${r(s)}`))}export{a as mount};