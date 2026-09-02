import{n as e,r as t,t as n}from"./parts.C-YLuC7Q.js";var r={w:320,h:150},i={w:96,h:54},a={x:40,y:32},o=1,s=10,c={x:r.w-i.w,y:r.h-i.h},l={ArrowLeft:{axis:`x`,sign:-1},ArrowRight:{axis:`x`,sign:1},ArrowUp:{axis:`y`,sign:-1},ArrowDown:{axis:`y`,sign:1}},u=`position: absolute; width: 6px; height: 6px; background: var(--sp-accent); border-radius: 1px; opacity: 0`,d=[`left: -3px; top: -3px`,`right: -3px; top: -3px`,`left: -3px; bottom: -3px`,`right: -3px; bottom: -3px`].map(e=>`<span data-part="handle" style="${u}; ${e}"></span>`).join(``);function f(u){u.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 276px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Poster</span>
          <span
            class="sp-text"
            data-part="readout"
            data-size="${o}"
            style="width: 226px; text-align: right; white-space: nowrap; font-variant-numeric: tabular-nums"
          >No selection</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px">
          <div
            data-part="canvas"
            tabindex="0"
            role="group"
            aria-label="Poster canvas"
            style="position: relative; width: ${r.w}px; height: ${r.h}px; border: 1px solid var(--sp-line); border-radius: 6px; background-color: var(--sp-surface); background-image: radial-gradient(var(--sp-line) 1px, transparent 1px); background-size: 10px 10px; background-position: -1px -1px"
          >
            <div
              class="sp-surface"
              data-part="card"
              data-subject
              data-x="${a.x}"
              data-y="${a.y}"
              style="position: absolute; left: 0; top: 0; width: ${i.w}px; height: ${i.h}px; padding: 8px 10px; transform: translate(${a.x}px, ${a.y}px); transition: transform 0.08s linear; cursor: default; user-select: none"
            >
              <span class="sp-heading" style="font-size: 12px">Headline</span>
              <span class="sp-line" style="display: block; width: 60%; margin-top: 7px"></span>
              ${d}
            </div>
          </div>
          <div class="sp-row sp-row--between sp-context" style="width: 100%">
            <span class="sp-row" style="gap: 6px">
              <span class="sp-kbd">Arrow</span>
              <span class="sp-label">${o} px</span>
              <span class="sp-kbd" data-part="key-shift" style="margin-left: 8px">Shift</span>
              <span class="sp-kbd">Arrow</span>
              <span class="sp-label">${s} px</span>
            </span>
            <span class="sp-label" data-part="step" style="width: 92px; text-align: right; font-variant-numeric: tabular-nums">Step ${o} px</span>
          </div>
        </div>
      </div>
    </div>
  `;let f=e(u,`card`),p=e(u,`readout`),m=e(u,`step`),h=e(u,`key-shift`),g={...a},_=!1,v=!1,y=()=>{f.style.transform=`translate(${g.x}px, ${g.y}px)`,f.dataset.x=String(g.x),f.dataset.y=String(g.y);let e=v?s:o;p.dataset.size=String(e),p.textContent=_?`x ${g.x}, y ${g.y} · step ${e} px`:`No selection`,m.textContent=`Step ${e} px`},b=e=>{for(let n of t(u,`handle`))n.style.opacity=e?`1`:`0`},x=()=>{_=!0,n(f,`data-selected`,!0),f.style.boxShadow=`0 0 0 1.5px var(--sp-accent)`,b(!0),y()};f.addEventListener(`click`,x),f.addEventListener(`pointerdown`,x);let S=e=>{v=e,h.style.borderColor=e?`var(--sp-accent)`:``,h.style.color=e?`var(--sp-ink)`:``,n(h,`data-held`,e),y()};u.addEventListener(`keydown`,e=>{e.key===`Shift`&&S(!0);let t=l[e.key];if(!t||!_)return;e.preventDefault();let n=g[t.axis]+t.sign*(e.shiftKey?s:o);g[t.axis]=Math.max(0,Math.min(c[t.axis],n)),y()}),u.addEventListener(`keyup`,e=>{e.key===`Shift`&&S(!1)}),y()}export{f as mount};