import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n={w:340,h:252},r=40,i={w:n.w-2,h:n.h-2-r},a=560,o=[`left`,`top`,`width`,`height`,`border-radius`].map(e=>`${e} ${a}ms var(--sp-ease)`).join(`, `),s=56,c={left:10,top:74,width:i.w-20,height:s,radius:8},l={left:0,top:0,width:i.w,height:i.h,radius:0},u={left:8,top:8,width:40,height:40,radius:6},d={left:0,top:0,width:i.w,height:84,radius:0},f=e=>`left: ${e.left}px; top: ${e.top}px; width: ${e.width}px; height: ${e.height}px; border-radius: ${e.radius}px`;function p(i,a){let p=(e,t,n,r)=>`
    <div
      class="sp-surface sp-context"
      style="position: absolute; left: 10px; top: ${e}px; width: ${c.width}px; height: ${s}px;
             display: flex; align-items: center; gap: 8px; padding: 8px"
    >
      <span style="flex: 0 0 40px; height: 40px; border-radius: 6px; background: ${r}"></span>
      <span class="sp-stack" style="gap: 5px; min-width: 0">
        <span class="sp-heading" style="font-size: 13px">${t}</span>
        <span class="sp-label" style="font-size: 11px">${n}</span>
      </span>
    </div>`;i.innerHTML=`
    <div class="sp-app" style="gap: 9px">
      <div class="sp-frame" style="width: ${n.w}px; height: ${n.h}px">
        <div class="sp-topbar sp-context" style="height: ${r}px">
          <span class="sp-heading sp-grow">Trails</span>
          <span class="sp-label" data-part="readout">list</span>
        </div>
        <div class="sp-body" data-part="body" style="position: relative; padding: 0; overflow: hidden">
          ${p(10,`Cwm Idwal`,`4.2 km, rough`,`linear-gradient(135deg, #7c8798, #4c5765)`)}
          ${p(138,`Nant Ffrancon`,`9.8 km, easy`,`linear-gradient(135deg, #93867a, #61574d)`)}

          <div
            data-part="container"
            data-subject
            data-mode="compact"
            data-state="settled"
            style="position: absolute; overflow: hidden; background: var(--sp-surface); border: 1px solid var(--sp-line);
                   box-shadow: var(--sp-shadow); ${f(c)}; transition: ${o}"
          >
            <span
              data-part="thumb"
              style="position: absolute; background: linear-gradient(135deg, #3f6cd1, #7b4fd6); ${f(u)};
                     transition: ${o}"
            ></span>

            <button
              type="button"
              data-part="open"
              style="position: absolute; left: 0; top: 0; width: ${c.width}px; height: ${s}px;
                     display: flex; align-items: center; padding: 8px 8px 8px 56px; gap: 8px; border: 0;
                     background: transparent; font: inherit; color: var(--sp-ink); text-align: left; cursor: pointer;
                     opacity: 1; transition: opacity 180ms linear 200ms"
            >
              <span class="sp-stack" style="gap: 5px; min-width: 0">
                <span class="sp-heading" style="font-size: 13px">Glyder Fach</span>
                <span class="sp-label" style="font-size: 11px">6.5 km, scramble</span>
              </span>
            </button>

            <div
              data-part="detail"
              style="position: absolute; left: 0; top: ${d.height}px; width: ${l.width}px;
                     padding: 12px 14px; display: flex; flex-direction: column; gap: 8px;
                     opacity: 0; visibility: hidden; transition: opacity 220ms linear, visibility 220ms linear"
            >
              <span class="sp-heading" data-part="detail-title">Glyder Fach</span>
              <span class="sp-text" style="margin: 0">
                6.5 km over the Cantilever and back down the miners track. Scramble grade one.
              </span>
              <span class="sp-line" style="width: 62%"></span>
            </div>

            <button
              class="sp-icon-button"
              type="button"
              data-part="close"
              aria-label="Back to the list"
              style="position: absolute; left: 6px; top: 6px; color: #ffffff; background: rgb(12 16 34 / 0.42);
                     opacity: 0; visibility: hidden; transition: opacity 220ms linear, visibility 220ms linear"
            >${t(`chevronLeft`)}</button>
          </div>
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 340px; margin: 0; text-align: center">
        One box, two rectangles: the row is the screen.
      </p>
    </div>
  `;let m=e(i,`container`),h=e(i,`thumb`),g=e(i,`open`),_=e(i,`detail`),v=e(i,`close`),y=e(i,`readout`),b,x=e=>{if(e===(m.dataset.mode===`detail`))return;a.clearTimeout(b);let t=e?l:c,n=e?d:u;for(let[e,r]of[[m,t],[h,n]])e.style.left=`${r.left}px`,e.style.top=`${r.top}px`,e.style.width=`${r.width}px`,e.style.height=`${r.height}px`,e.style.borderRadius=`${r.radius}px`;m.dataset.mode=e?`detail`:`compact`,m.dataset.state=`moving`,m.style.borderColor=e?`transparent`:`var(--sp-line)`,g.style.opacity=e?`0`:`1`,g.style.transitionDelay=e?`0ms`:`240ms`,g.style.pointerEvents=e?`none`:`auto`;for(let t of[_,v])t.style.opacity=e?`1`:`0`,t.style.visibility=e?`visible`:`hidden`,t.style.transitionDelay=e?`260ms`:`0ms`;y.textContent=e?`detail`:`list`,b=a.setTimeout(()=>{m.dataset.state=`settled`},660)};g.addEventListener(`click`,()=>x(!0)),v.addEventListener(`click`,()=>x(!1))}export{p as mount};