import{n as e}from"./parts.C-YLuC7Q.js";import{i as t,r as n}from"./measure.DK7AY2_i.js";var r={half:.46,full:.88},i=`height 0.26s var(--sp-ease)`;function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" data-part="screen" style="width: 260px; height: 300px">
        <div class="sp-topbar sp-context" data-part="screen-top"><span class="sp-heading sp-grow">Nearby</span></div>
        <div class="sp-body sp-context" style="padding: 12px 12px 0">
          <ul class="sp-list">
            <li class="sp-list-item"><span class="sp-avatar">BB</span><span class="sp-grow">Blue Bottle</span><span class="sp-text">0.2 mi</span></li>
            <li class="sp-list-item"><span class="sp-avatar">KA</span><span class="sp-grow">Kaffa Roast</span><span class="sp-text">0.4 mi</span></li>
            <li class="sp-list-item" data-part="screen-mid"><span class="sp-avatar">TC</span><span class="sp-grow">The Cabin</span><span class="sp-text">0.6 mi</span></li>
          </ul>
        </div>
        <div
          class="sp-surface"
          data-part="sheet"
          data-state="half"
          role="dialog"
          aria-label="Blue Bottle"
          style="position: absolute; left: 0; right: 0; bottom: 0; height: 46%; border-radius: 14px 14px 0 0; border-bottom: 0; transition: ${i}"
        >
          <div
            data-part="handle-area"
            style="display: flex; align-items: center; justify-content: center; height: 22px; touch-action: none; cursor: grab"
          >
            <button
              type="button"
              data-part="grabber"
              data-subject
              aria-label="Resize sheet"
              style="width: 36px; height: 5px; padding: 0; border: 0; border-radius: 999px; background: var(--sp-line); cursor: grab"
            ></button>
          </div>
          <div class="sp-stack sp-context" style="gap: 8px; padding: 4px 14px 14px">
            <div class="sp-row sp-row--between">
              <span class="sp-heading">Blue Bottle</span>
              <span class="sp-text">Open till 6</span>
            </div>
            <span class="sp-text">Coffee bar, 24 Wharf Road. Seats twelve, takes cards only.</span>
            <div class="sp-divider"></div>
            <div class="sp-row sp-row--between"><span class="sp-label">Walk</span><span class="sp-text">4 min</span></div>
            <div class="sp-row sp-row--between"><span class="sp-label">Busy</span><span class="sp-text">Quiet right now</span></div>
          </div>
        </div>
      </div>
    </div>
  `;let o=e(a,`screen`),s=e(a,`sheet`),c=e(a,`handle-area`),l,u=e=>{s.style.height=`${r[e]*100}%`,s.dataset.state=e},d=e=>{let t=o.getBoundingClientRect().height;return Math.abs(e-r.half*t)<=Math.abs(e-r.full*t)?`half`:`full`};c.addEventListener(`pointerdown`,e=>{e.isTrusted&&c.setPointerCapture(e.pointerId),l=n(e,s).y,s.style.transition=`none`}),a.addEventListener(`pointermove`,e=>{if(l===void 0)return;let i=t(o).height,a=Math.min(Math.max(i-(n(e,o).y-l),40),r.full*i);s.style.height=`${a}px`});let f=()=>{l!==void 0&&(l=void 0,s.style.transition=i,u(d(s.getBoundingClientRect().height)))};a.addEventListener(`pointerup`,f),a.addEventListener(`pointercancel`,f),e(a,`grabber`).addEventListener(`keydown`,e=>{if(e.key===`ArrowUp`)u(`full`);else if(e.key===`ArrowDown`)u(`half`);else return;e.preventDefault()})}export{a as mount};