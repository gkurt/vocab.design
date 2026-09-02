import{n as e}from"./parts.C-YLuC7Q.js";var t=200,n=32,r=82,i=5,a=e=>`${Math.floor(e/60)}:${String(Math.round(e)%60).padStart(2,`0`)}`,o=e=>e/t*100,s=e=>Math.min(t,Math.max(0,Math.round(e))),c=e=>o(e)<33?`start`:o(e)<66?`mid`:`end`,l=(e,t)=>`<span data-part="chapter-${t}" aria-hidden="true" style="position: absolute; left: ${e}%; top: 50%; width: 2px; height: 10px; translate: -50% -50%; border-radius: 1px; background: var(--sp-surface)"></span>`;function u(u){u.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Lecture 4 recording</span>
          <span class="sp-text">${a(t)}</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div
            class="sp-context"
            data-part="poster"
            style="display: flex; align-items: center; justify-content: center; flex: 1 1 auto; border-radius: var(--sp-radius); background: linear-gradient(140deg, #3d4450, #1f232b)"
          >
            <span data-part="frame" style="color: #e8eaef; font-size: 12px; font-variant-numeric: tabular-nums">Frame at ${a(n)}</span>
          </div>
          <div class="sp-stack" style="position: relative; gap: 6px">
            <div
              class="sp-slider"
              data-part="scrubber"
              data-subject
              data-at="${c(n)}"
              style="--sp-to: ${o(n)}%; --sp-at: ${o(n)}%; touch-action: none"
            >
              <div class="sp-slider-track" data-part="track">
                <div
                  data-part="buffered"
                  style="position: absolute; top: 0; bottom: 0; left: 0; width: ${r}%; border-radius: inherit; background: var(--sp-muted); opacity: 0.42"
                ></div>
                <div class="sp-slider-fill"></div>
                ${l(30,1)}
                ${l(74,2)}
                <div
                  class="sp-slider-thumb"
                  data-part="playhead"
                  role="slider"
                  tabindex="0"
                  aria-label="Seek"
                  aria-valuemin="0"
                  aria-valuemax="${t}"
                  aria-valuenow="${n}"
                  aria-valuetext="${a(n)}"
                ></div>
              </div>
            </div>
            <div class="sp-row sp-row--between sp-context">
              <span class="sp-text" data-part="readout" style="width: 44px; font-variant-numeric: tabular-nums">${a(n)}</span>
              <span class="sp-text" style="width: 44px; text-align: right; font-variant-numeric: tabular-nums">${a(t)}</span>
            </div>
            <div
              class="sp-surface"
              data-part="preview"
              hidden
              style="position: absolute; bottom: 30px; left: ${o(n)}%; translate: -50% 0; padding: 3px 7px; font-size: 11px; box-shadow: var(--sp-shadow); font-variant-numeric: tabular-nums"
            >${a(n)}</div>
          </div>
        </div>
      </div>
    </div>
  `;let d=e(u,`scrubber`),f=e(u,`track`),p=e(u,`playhead`),m=e(u,`readout`),h=e(u,`frame`),g=e(u,`preview`),_=n,v,y=()=>{let e=`${o(_)}%`;d.style.setProperty(`--sp-to`,e),d.style.setProperty(`--sp-at`,e),d.dataset.at=c(_),p.setAttribute(`aria-valuenow`,String(_)),p.setAttribute(`aria-valuetext`,a(_)),m.textContent=a(_),h.textContent=`Frame at ${a(_)}`,g.style.left=e,g.textContent=a(_)},b=e=>{let n=f.getBoundingClientRect();return n.width===0?_:s((e-n.left)/n.width*t)},x=e=>{let t=f.getBoundingClientRect();return t.left+o(e)/100*t.width};d.addEventListener(`pointerdown`,e=>{e.isTrusted&&d.setPointerCapture(e.pointerId),e.target===p?v=e.clientX-x(_):(v=0,_=b(e.clientX),y()),g.hidden=!1}),u.addEventListener(`pointermove`,e=>{if(v===void 0)return;let t=b(e.clientX-v);t!==_&&(_=t,y())});let S=()=>{v!==void 0&&(v=void 0,g.hidden=!0)};u.addEventListener(`pointerup`,S),u.addEventListener(`pointercancel`,S),p.addEventListener(`keydown`,e=>{let n={ArrowRight:i,ArrowUp:i,ArrowLeft:-5,ArrowDown:-5}[e.key],r=_;if(n!==void 0)r=s(_+n);else if(e.key===`Home`)r=0;else if(e.key===`End`)r=t;else return;e.preventDefault(),r!==_&&(_=r,y())})}export{u as mount};