import{n as e}from"./parts.C-YLuC7Q.js";var t=96,n=8,r=2,i=[`linear-gradient(150deg, #24303d, #4a7290)`,`linear-gradient(150deg, #4a7290, #8fb8c9)`,`linear-gradient(150deg, #d8c39a, #9c7c53)`,`linear-gradient(150deg, #b6603f, #e8b17a)`,`linear-gradient(150deg, #2f4a3a, #7fa06a)`,`linear-gradient(150deg, #7fa06a, #d9d7a6)`,`linear-gradient(150deg, #5b4a7a, #9d84c4)`,`linear-gradient(150deg, #1e222c, #57606f)`],a=e=>`${Math.floor(e/60)}:${String(Math.round(e)%60).padStart(2,`0`)}`,o=e=>e/t*100,s=e=>Math.min(t,Math.max(0,Math.round(e))),c=e=>i[Math.min(i.length-1,Math.floor(e/t*i.length))]??i[0],l=e=>o(e)<33?`start`:o(e)<70?`mid`:`end`,u=(e,t)=>`<span data-part="${t}" aria-hidden="true" style="position: absolute; left: ${e}%; bottom: -1px; width: 7px; height: 7px; translate: -50% 0; rotate: 45deg; border-radius: 1px; background: var(--sp-surface); border: 1px solid var(--sp-line); pointer-events: none"></span>`;function d(d){let f=i.map(e=>`<span style="flex: 1 1 0; background: ${e}"></span>`).join(``);d.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Reel 3 rough cut</span>
          <span class="sp-text" data-part="readout" style="width: 190px; text-align: right">${a(t)}, 24 fps</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 12px">
          <div class="sp-row sp-context" style="gap: 12px">
            <div
              data-part="preview"
              style="flex: 0 0 auto; width: 152px; height: 86px; border-radius: var(--sp-radius); border: 1px solid var(--sp-line); background: ${c(n)}"
            ></div>
            <div class="sp-stack" style="gap: 4px">
              <span class="sp-heading" data-part="timecode" style="font-variant-numeric: tabular-nums">${a(n)}</span>
              <span class="sp-label" data-part="frames" style="width: 150px">0 frames previewed</span>
            </div>
          </div>
          <div
            data-part="timeline"
            data-subject
            data-at="${l(n)}"
            data-mode="idle"
            style="position: relative; width: 400px; height: 46px; touch-action: none; cursor: ew-resize"
          >
            <div
              data-part="strip"
              style="position: absolute; inset: 0; display: flex; overflow: hidden; border-radius: 6px; border: 1px solid var(--sp-line)"
            >${f}</div>
            ${u(12,`cut-a`)}
            ${u(52,`cut-b`)}
            ${u(92,`cut-c`)}
            <span
              data-part="playhead"
              role="slider"
              tabindex="0"
              aria-label="Playhead"
              aria-valuemin="0"
              aria-valuemax="${t}"
              aria-valuenow="${n}"
              aria-valuetext="${a(n)}"
              style="position: absolute; top: -6px; bottom: -6px; left: ${o(n)}%; width: 2px; translate: -1px 0; background: var(--sp-ink); cursor: grab"
            >
              <span
                aria-hidden="true"
                style="position: absolute; top: -4px; left: 1px; width: 12px; height: 12px; translate: -50% 0; rotate: 45deg; border-radius: 2px; background: var(--sp-ink)"
              ></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  `;let p=e(d,`timeline`),m=e(d,`strip`),h=e(d,`playhead`),g=e(d,`preview`),_=e(d,`timecode`),v=e(d,`frames`),y=e(d,`readout`),b=n,x,S=0,C=()=>{h.style.left=`${o(b)}%`,h.setAttribute(`aria-valuenow`,String(b)),h.setAttribute(`aria-valuetext`,a(b)),p.dataset.at=l(b),_.textContent=a(b),g.style.background=c(b)},w=(e,t)=>{p.dataset.mode=e,y.textContent=t},T=e=>{let n=m.getBoundingClientRect();return n.width===0?b:s((e-n.left)/n.width*t)},E=e=>{let t=m.getBoundingClientRect();return t.left+o(e)/100*t.width};p.addEventListener(`pointerdown`,e=>{if(e.isTrusted&&p.setPointerCapture(e.pointerId),S=0,v.textContent=`0 frames previewed`,e.target===h||h.contains(e.target)){x=e.clientX-E(b),w(`grab`,`Holding the playhead`);return}x=0,b=T(e.clientX),C(),w(`seek`,`Seeked to ${a(b)}: one jump`)}),d.addEventListener(`pointermove`,e=>{if(x===void 0)return;let t=T(e.clientX-x);t!==b&&(b=t,S+=1,v.textContent=`${S} frame${S===1?``:`s`} previewed`,C(),w(`scrub`,`Scrubbing: previewing at ${a(b)}`))});let D=()=>{x!==void 0&&(x=void 0,p.dataset.mode===`grab`?w(`idle`,`Held at ${a(b)}: nothing moved`):p.dataset.mode===`scrub`&&w(`scrub`,`Scrubbed to ${a(b)}`))};d.addEventListener(`pointerup`,D),d.addEventListener(`pointercancel`,D),h.addEventListener(`keydown`,e=>{let n={ArrowRight:r,ArrowUp:r,ArrowLeft:-2,ArrowDown:-2}[e.key],i=b;if(n!==void 0)i=s(b+n);else if(e.key===`Home`)i=0;else if(e.key===`End`)i=t;else return;e.preventDefault(),i!==b&&(b=i,C(),w(`scrub`,`Stepped to ${a(b)}`))})}export{d as mount};