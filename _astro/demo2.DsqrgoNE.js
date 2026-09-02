import{n as e,t}from"./parts.C-YLuC7Q.js";import{n,r}from"./measure.DK7AY2_i.js";var i={w:300,h:148},a=30,o=4,s=4,c=40,l=30,u=8,d=[`Charter the ferry`,`Book the slipway`,`Print tide tables`,`Order buoy paint`,`Service the winch`,`Renew the moorings`,`Chase the harbour permit`,`Repaint the lights`,`File the survey`],f={x:i.w/2,y:i.h-14},p=d.map((e,t)=>`
    <li
      class="sp-surface"
      data-part="row-${t+1}"
      data-key="${t+1}"
      style="display: flex; align-items: center; gap: 8px; flex: 0 0 auto; height: ${a}px; margin-bottom: ${o}px; padding: 0 8px; font-size: 12px; cursor: grab; touch-action: none; user-select: none"
    >
      <span aria-hidden="true" style="flex: 0 0 auto; width: 10px; height: 10px; border-radius: 3px; background: var(--sp-line)"></span>
      <span class="sp-grow" style="min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">${e}</span>
      <span class="sp-label">${t+1}</span>
    </li>`).join(``);function m(m,h){m.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 254px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Backlog</span>
          <span class="sp-text" data-part="readout" data-drop="none" style="flex: 0 0 auto; width: 344px; text-align: right; white-space: nowrap">${d.length} tasks</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div style="position: relative; width: ${i.w}px; height: ${i.h}px">
            <div
              class="sp-scroll sp-surface"
              data-part="list"
              data-subject
              data-autoscroll="idle"
              data-moved="no"
              style="position: absolute; inset: 0; background: var(--sp-sunken)"
            >
              <ul class="sp-list" data-part="rows" style="position: relative; padding: ${s}px; gap: 0">
                ${p}
                <span
                  data-part="marker"
                  style="position: absolute; left: 6px; right: 6px; top: 0; height: 2px; border-radius: 1px; background: var(--sp-accent); opacity: 0"
                ></span>
              </ul>
            </div>
            <div class="sp-context" style="position: absolute; inset: 0; pointer-events: none">
              <span
                data-part="zone"
                style="position: absolute; left: 0; right: 0; bottom: 0; height: ${c}px; border-top: 1px dashed var(--sp-muted); background: rgb(127 132 145 / 0.22); border-bottom-left-radius: var(--sp-radius); border-bottom-right-radius: var(--sp-radius)"
              ></span>
              <!-- An unpainted anchor for the scripted stroke: a drawn stop point would annotate
                   the choreography rather than the term (SPEC §5). -->
              <span
                data-part="drop-dot"
                style="position: absolute; left: ${f.x-5}px; top: ${f.y-5}px; width: 10px; height: 10px"
              ></span>
            </div>
          </div>
        </div>
        <div class="sp-topbar sp-context" style="gap: 10px; border-bottom: 0; border-top: 1px solid var(--sp-line)">
          <span class="sp-label" style="width: 40px">Scroll</span>
          <div class="sp-progress" data-part="ruler" style="width: 96px"><div class="sp-progress-fill" style="--sp-value: 0%; transition: none"></div></div>
        </div>
      </div>
    </div>
  `;let g=e(m,`list`),_=e(m,`rows`),v=e(m,`marker`),y=e(m,`readout`),b=e(m,`ruler`).firstElementChild,x=d.map((t,n)=>e(m,`row-${n+1}`)),S,C=0,w,T=new Set,E,D=()=>Math.max(1,g.scrollHeight-g.clientHeight),O=(e,t)=>{y.dataset.drop=e,y.textContent=t},k=()=>{b.style.setProperty(`--sp-value`,`${g.scrollTop/D()*100}%`),g.dataset.moved=g.scrollTop>1?`yes`:`no`},A=()=>[..._.querySelectorAll(`[data-key]`)],j=e=>{let t=Math.max(0,Math.min(i.h-1,e)),r=A(),a=r[0];for(let e of r)n(e,g).top<=t&&(a=e);return a},M=()=>{E=j(C),E&&(v.style.top=`${E.offsetTop+a+o/2-1}px`,v.style.opacity=`1`)},N=e=>{h.clearTimeout(w),w=void 0,g.dataset.autoscroll=e},P=()=>{if(!S)return N(`idle`);let e=u+16*Math.min(1,Math.max(0,(C-(i.h-c))/c)),n=g.scrollTop;if(g.scrollTop=Math.min(D(),n+e),k(),M(),g.scrollTop===n)return N(`end`);t(g,`data-ran`,!0),O(`running`,`Scrolling at ${Math.round(e)} px a tick`),w=h.setTimeout(P,l)},F=e=>{if(C=r({clientX:0,clientY:e},g).y,M(),C<i.h-c){g.dataset.autoscroll!==`idle`&&N(`idle`),O(`holding`,`Above the band: the list holds still`);return}g.dataset.autoscroll!==`running`&&g.dataset.autoscroll!==`end`&&(g.dataset.autoscroll=`running`,P())};for(let e of x)e.addEventListener(`pointerdown`,n=>{n.isTrusted&&e.setPointerCapture(n.pointerId),S=e,T=new Set(A().filter(e=>e.offsetTop+a>g.scrollTop&&e.offsetTop<g.scrollTop+i.h)),e.style.opacity=`0.45`,t(e,`data-dragging`,!0),F(n.clientY)});m.addEventListener(`pointermove`,e=>{S&&F(e.clientY)});let I=()=>{if(!S)return;N(`idle`);let e=S;S=void 0,e.style.opacity=``,t(e,`data-dragging`,!1),v.style.opacity=`0`,E&&E!==e&&E.after(e);let n=E??e,r=d[Number(n.dataset.key??1)-1]??``,i=!T.has(n);O(i?`far`:`near`,i?`Dropped after "${r}", which was off screen`:`Dropped after "${r}", already on screen`)};m.addEventListener(`pointerup`,I),m.addEventListener(`pointercancel`,I),k()}export{m as mount};