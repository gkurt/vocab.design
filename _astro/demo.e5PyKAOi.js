import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={w:450,h:196},n={x:124,y:40},r={x:306,y:124},i=8,a={bezier:{d:`M ${n.x} ${n.y} C 215 ${n.y}, 215 ${r.y}, ${r.x} ${r.y}`,place:{x:215,y:82},kind:`mid`,note:`A curve leaves each port along its own axis and reads as one gesture, with a middle a label can sit on.`},step:{d:`M ${n.x} ${n.y} L 152 ${n.y} Q 160 ${n.y} 160 ${n.y+i} L 160 ${r.y-i} Q 160 ${r.y} 168 ${r.y} L ${r.x} ${r.y}`,place:{x:233,y:r.y},kind:`leg`,note:`A staircase turns in right angles only, and its middle falls just past a corner, so the label moves to the longest leg.`},straight:{d:`M ${n.x} ${n.y} L ${r.x} ${r.y}`,place:{x:215,y:82},kind:`mid`,note:`The shortest line is the hardest to follow, and its label needs the paper behind it to stay legible.`}},o=`bezier`;function s(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: auto">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Connector</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="picker" data-axis="Routing" data-value="${o}">
            <button class="sp-segment" type="button" data-part="seg-bezier" value="bezier">curve</button>
            <button class="sp-segment" type="button" data-part="seg-step" value="step">staircase</button>
            <button class="sp-segment" type="button" data-part="seg-straight" value="straight">straight</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="padding: 12px; display: flex; flex-direction: column; gap: 8px">
          <div
            data-part="scene"
            style="position: relative; width: ${t.w}px; height: ${t.h}px; overflow: hidden;
                   background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            <svg aria-hidden="true" viewBox="0 0 ${t.w} ${t.h}"
                 style="position: absolute; left: 0; top: 0; width: ${t.w}px; height: ${t.h}px">
              <path
                data-part="edge"
                data-subject
                data-routing="${o}"
                fill="none"
                stroke="var(--sp-accent)"
                stroke-width="2.6"
                stroke-linecap="round"
                d="${a[o].d}"
              ></path>
            </svg>
            <div class="sp-context" style="position: absolute; left: 0; top: 0; width: ${t.w}px; height: ${t.h}px; pointer-events: none">
              <div class="sp-surface" style="position: absolute; left: 16px; top: 18px; width: 108px; height: 44px; padding: 7px 9px">
                <span class="sp-heading" style="font-size: 12px">Fetch</span>
                <div class="sp-line" style="width: 60%; margin-top: 6px"></div>
              </div>
              <span style="position: absolute; left: ${n.x-5}px; top: ${n.y-5}px; width: 10px; height: 10px;
                           border-radius: 50%; background: var(--sp-accent)"></span>
              <div class="sp-surface" style="position: absolute; left: ${r.x}px; top: ${r.y-22}px; width: 108px; height: 44px; padding: 7px 9px">
                <span class="sp-heading" style="font-size: 12px">Render</span>
                <div class="sp-line" style="width: 45%; margin-top: 6px"></div>
              </div>
              <span style="position: absolute; left: ${r.x-5}px; top: ${r.y-5}px; width: 10px; height: 10px;
                           border-radius: 50%; background: var(--sp-accent)"></span>
            </div>
            <span
              data-part="label"
              data-place="${a[o].kind}"
              style="position: absolute; left: ${a[o].place.x}px; top: ${a[o].place.y}px; transform: translate(-50%, -50%);
                     padding: 1px 6px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 999px;
                     color: var(--sp-muted); font-size: 10px; white-space: nowrap"
            >on error</span>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="note" style="height: 30px; font-size: 11px; line-height: 15px; overflow: hidden">${a[o].note}</span>
        </div>
      </div>
    </div>
  `;let s=e(i,`edge`),c=e(i,`label`),l=e(i,`note`),u=e(i,`picker`),d=e=>{let t=a[e]??a[o];s.setAttribute(`d`,t.d),s.dataset.routing=e,c.style.left=`${t.place.x}px`,c.style.top=`${t.place.y}px`,c.dataset.place=t.kind,l.textContent=t.note};u.addEventListener(`change`,e=>d(e.detail))}export{s as mount};