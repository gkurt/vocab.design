import{n as e}from"./parts.C-YLuC7Q.js";import{r as t}from"./measure.DK7AY2_i.js";var n=`M 66 88 C 84 44, 100 40, 110 62 C 120 84, 108 96, 98 88 C 88 80, 108 56, 134 56 C 158 56, 146 90, 166 90 C 184 90, 184 60, 202 60 C 218 60, 208 92, 228 90 C 250 88, 246 52, 266 54 C 284 56, 276 92, 296 90 C 320 88, 316 48, 340 54 C 356 58, 348 90, 368 84 C 384 79, 392 68, 404 62`,r=64,i=`0 0 450 118`,a=`56 34 358 70`,o=(e,t,n)=>Math.max(t,Math.min(n,e));function s(s){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 250px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Delivery receipt</span>
          <span class="sp-label" style="font-size: 12px">Step 3 of 3</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">
          <span class="sp-label sp-context">Sign to confirm you received two parcels</span>

          <div
            class="sp-surface"
            data-part="pad"
            data-subject
            data-state="empty"
            style="position: relative; width: 450px; height: 118px; background: var(--sp-surface); overflow: hidden;
                   touch-action: none; cursor: crosshair"
          >
            <span data-part="baseline" style="position: absolute; left: 30px; right: 30px; top: 82px; height: 2px; background: var(--sp-line)"></span>
            <span
              data-part="cross"
              aria-hidden="true"
              style="position: absolute; left: 32px; top: 66px; font-size: 13px; line-height: 1; color: var(--sp-muted)"
            >&#10005;</span>
            <span
              data-stage-verdict data-part="hint"
              style="position: absolute; left: 0; right: 0; top: 44px; text-align: center; font-size: 11px; color: var(--sp-muted)"
            >Draw your signature above the line</span>

            <svg data-part="sheet" viewBox="${i}" width="450" height="118" aria-hidden="true" style="position: absolute; inset: 0">
              <path
                data-part="ink"
                d="${n}"
                fill="none"
                stroke="var(--sp-ink)"
                stroke-width="2.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span data-part="pad-start" style="position: absolute; left: 56px; top: 74px; width: 16px; height: 16px"></span>
            <span data-part="pad-mid-a" style="position: absolute; left: 142px; top: 46px; width: 16px; height: 16px"></span>
            <span data-part="pad-mid-b" style="position: absolute; left: 222px; top: 90px; width: 16px; height: 16px"></span>
            <span data-part="pad-mid-c" style="position: absolute; left: 312px; top: 50px; width: 16px; height: 16px"></span>
            <span data-part="pad-end" style="position: absolute; left: 396px; top: 74px; width: 16px; height: 16px"></span>

            <span class="sp-chip" data-part="stamp" hidden style="position: absolute; right: 8px; top: 8px; font-size: 11px; cursor: default">Captured</span>
          </div>

          <div class="sp-row sp-row--between sp-context" style="margin-top: 2px">
            <span class="sp-label" data-part="status" role="status" style="font-size: 11px">Nothing captured yet</span>
            <div class="sp-row" style="gap: 8px">
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="btn-clear" aria-disabled="true">Clear</button>
              <button class="sp-button sp-button--sm" type="button" data-part="btn-done" aria-disabled="true">Done</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let c=e(s,`pad`),l=e(s,`sheet`),u=e(s,`baseline`),d=e(s,`cross`),f=e(s,`hint`),p=e(s,`stamp`),m=e(s,`status`),h=e(s,`btn-clear`),g=e(s,`btn-done`),_=s.querySelector(`[data-part=ink]`);if(!(_ instanceof SVGPathElement))return;let v=_.getTotalLength();_.style.strokeDasharray=String(v);let y=0,b=!1,x={empty:`Nothing captured yet`,signed:`Stroke captured, 1 path`,captured:`Signed by A. Mensah, 12 August`},S=e=>{c.dataset.state=e;let t=e===`captured`,n=e===`empty`;l.setAttribute(`viewBox`,t?a:i),u.hidden=t,d.hidden=t,f.hidden=!n,p.hidden=!t,c.style.cursor=t?`default`:`crosshair`,h.setAttribute(`aria-disabled`,String(n)),g.setAttribute(`aria-disabled`,String(e!==`signed`)),m.textContent=x[e]??``},C=e=>{y=o(e,0,1),_.style.strokeDashoffset=String(v*(1-y))},w=e=>(t(e,c).x-r)/340;c.addEventListener(`pointerdown`,e=>{e.isTrusted&&c.setPointerCapture(e.pointerId),C(0),S(`empty`),b=!0,C(w(e))}),s.addEventListener(`pointermove`,e=>{b&&(C(w(e)),y>.02&&c.dataset.state===`empty`&&S(`signed`))});let T=()=>{b&&(b=!1,S(y>.02?`signed`:`empty`))};s.addEventListener(`pointerup`,T),s.addEventListener(`pointercancel`,T),g.addEventListener(`click`,()=>{c.dataset.state===`signed`&&(C(1),S(`captured`))}),h.addEventListener(`click`,()=>{C(0),S(`empty`)}),C(0),S(`empty`)}export{s as mount};