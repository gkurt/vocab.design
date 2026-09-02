import{n as e}from"./parts.C-YLuC7Q.js";import{i as t,r as n}from"./measure.DK7AY2_i.js";var r={half:.46,full:.9},i=`height 0.26s var(--sp-ease), transform 0.3s var(--sp-ease), visibility 0.3s`;function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" data-part="screen" style="width: 264px; height: 300px">
        <div class="sp-topbar sp-context" data-part="screen-top">
          <span class="sp-heading sp-grow">Nearby</span>
          <span class="sp-text">Open now</span>
        </div>
        <div class="sp-body sp-context" style="padding: 12px">
          <ul class="sp-list">
            <li class="sp-list-item"><span class="sp-avatar">BB</span><span class="sp-grow">Blue Bottle</span><span class="sp-text">0.2 mi</span></li>
            <li class="sp-list-item"><span class="sp-avatar">KA</span><span class="sp-grow">Kaffa Roast</span><span class="sp-text">0.4 mi</span></li>
          </ul>
          <button class="sp-button sp-button--sm" type="button" data-part="open" style="margin-top: 12px">Show details</button>
        </div>
        <div class="sp-scrim" data-part="scrim"></div>
        <div
          class="sp-surface"
          data-part="sheet"
          data-subject
          data-state="closed"
          role="dialog"
          aria-label="Blue Bottle"
          style="position: absolute; left: 0; right: 0; bottom: 0; height: ${r.half*100}%; display: flex; flex-direction: column; overflow: hidden; border-radius: 16px 16px 0 0; border-bottom: 0; box-shadow: var(--sp-shadow); transform: translateY(100%); visibility: hidden; transition: ${i}"
        >
          <div
            data-part="handle-area"
            style="display: flex; flex: 0 0 auto; align-items: center; justify-content: center; height: 22px; touch-action: none; cursor: grab"
          >
            <span data-part="grabber" style="width: 36px; height: 5px; border-radius: 999px; background: var(--sp-line)"></span>
          </div>
          <div
            class="sp-stack"
            style="flex: 1 1 auto; min-height: 0; overflow-y: auto; scrollbar-width: thin; scrollbar-gutter: stable; gap: 8px; padding: 4px 10px 14px 14px"
          >
            <div class="sp-row sp-row--between">
              <span class="sp-heading">Blue Bottle</span>
              <span class="sp-text">Open till 6</span>
            </div>
            <span class="sp-text">Coffee bar, 24 Wharf Road. Seats twelve, takes cards only.</span>
            <div class="sp-divider"></div>
            <div class="sp-row sp-row--between"><span class="sp-label">Walk</span><span class="sp-text">4 min</span></div>
            <div class="sp-row sp-row--between"><span class="sp-label">Busy</span><span class="sp-text">Quiet right now</span></div>
            <div class="sp-row sp-row--between"><span class="sp-label">Rating</span><span class="sp-text">4.6 from 212</span></div>
          </div>
        </div>
      </div>
    </div>
  `;let o=e(a,`screen`),s=e(a,`sheet`),c=e(a,`scrim`),l=e(a,`handle-area`),u,d=e=>{s.style.height=`${r[e]*100}%`,s.dataset.state=e},f=()=>{c.setAttribute(`data-open`,``),s.style.visibility=`visible`,s.style.transform=`translateY(0)`,d(`half`)},p=()=>{u=void 0,c.removeAttribute(`data-open`),s.style.transition=i,s.style.transform=`translateY(100%)`,s.style.visibility=`hidden`,s.dataset.state=`closed`},m=e=>{let n=t(o).height;return Math.abs(e-r.half*n)<=Math.abs(e-r.full*n)?`half`:`full`};e(a,`open`).addEventListener(`click`,f),c.addEventListener(`click`,p),l.addEventListener(`pointerdown`,e=>{s.dataset.state!==`closed`&&(e.isTrusted&&l.setPointerCapture(e.pointerId),u=n(e,s).y,s.style.transition=`none`)}),a.addEventListener(`pointermove`,e=>{if(u===void 0)return;let i=t(o).height,a=n(e,o),c=Math.min(Math.max(i-(a.y-u),40),r.full*i);s.style.height=`${c}px`});let h=()=>{u!==void 0&&(u=void 0,s.style.transition=i,d(m(t(s).height)))};a.addEventListener(`pointerup`,h),a.addEventListener(`pointercancel`,h),a.addEventListener(`keydown`,e=>{e.key===`Escape`&&p()})}export{a as mount};