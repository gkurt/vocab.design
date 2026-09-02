import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={w:190,h:178},n=66,r=141,i=t.h,a={cover:`cover: the whole overlap, from the card touching the far edge of the scrollport to its trailing edge clearing the near one.`,contain:`contain: only the stretch where the card is wholly inside the scrollport. Shorter than cover by one card at each end.`,entry:`entry: the arriving. It is finished the moment the card is wholly inside, and stays finished for the rest of the scroll.`,exit:`exit: the leaving. It sits at nought until the card starts crossing the near edge, however far the page has scrolled.`},o=e=>e.map(e=>`<span class="sp-line" style="display: block; width: ${e}%; margin-bottom: 9px"></span>`).join(``);function s(s){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="scene" data-range="cover" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Range</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Scope" data-part="range" data-value="cover">
            <button class="sp-segment" type="button" data-part="seg-cover" value="cover">Cover</button>
            <button class="sp-segment" type="button" data-part="seg-contain" value="contain">Contain</button>
            <button class="sp-segment" type="button" data-part="seg-entry" value="entry">Entry</button>
            <button class="sp-segment" type="button" data-part="seg-exit" value="exit">Exit</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; gap: 12px; padding: 12px">
          <div
            class="sp-scroll" data-part="port"
            style="position: relative; flex: 0 0 auto; width: ${t.w}px; height: ${t.h}px;
                   border: 1px solid var(--sp-line); border-radius: 6px; background: var(--sp-surface)"
          >
            <div class="sp-context" style="height: ${r}px; padding: 12px 14px 0">${o([88,72,94,64,80,90])}</div>

            <div
              data-part="card" data-subject data-range="cover" data-at="running" data-progress="50"
              style="height: ${n}px; margin: 0 14px; padding: 10px 12px; display: flex; flex-direction: column;
                     justify-content: center; gap: 9px; border: 1px solid var(--sp-accent); border-radius: 8px;
                     background: var(--sp-accent-soft); transform: scale(0.94); opacity: 0.7; will-change: transform"
            >
              <span class="sp-label sp-text--ink" style="font-size: 12px">Waypoint</span>
              <span style="position: relative; height: 5px; border-radius: 999px; background: var(--sp-surface); overflow: hidden">
                <span data-part="fill" style="display: block; width: 50%; height: 100%; border-radius: 999px; background: var(--sp-accent)"></span>
              </span>
            </div>

            <div class="sp-context" style="height: ${r}px; padding: 12px 14px 0">${o([76,92,68,86,74,90])}</div>
          </div>

          <div
            class="sp-context" data-part="rail"
            style="position: relative; flex: 0 0 auto; width: 22px; height: ${i}px; border-radius: 6px;
                   background: var(--sp-surface); border: 1px solid var(--sp-line); overflow: hidden"
          >
            <span
              data-part="band"
              style="position: absolute; left: 0; right: 0; top: 0; height: 100%; background: var(--sp-sunken);
                     border-top: 2px solid var(--sp-accent); border-bottom: 2px solid var(--sp-accent);
                     border-left: 4px solid var(--sp-accent)"
            ></span>
            <span
              data-part="marker"
              style="position: absolute; left: 0; right: 0; top: 0; height: 3px; margin-top: -1px; background: var(--sp-ink)"
            ></span>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 auto; gap: 6px; min-width: 0">
            <span class="sp-label" style="font-size: 11px">Progress on this range</span>
            <span
              class="sp-text--ink" data-part="progress"
              style="font-size: 24px; font-weight: 600; font-variant-numeric: tabular-nums; line-height: 1.15"
            >50%</span>
            <span class="sp-label sp-text--ink" data-part="state" style="font-size: 12px">running</span>
            <span class="sp-divider" style="margin: 2px 0"></span>
            <span class="sp-text" data-stage-verdict data-part="note" style="height: 76px; font-size: 11px; line-height: 1.45">${a.cover}</span>
          </div>
        </div>
      </div>
    </div>
  `;let c=e(s,`scene`),l=e(s,`port`),u=e(s,`card`),d=e(s,`fill`),f=e(s,`rail`),p=e(s,`band`),m=e(s,`marker`),h=e(s,`progress`),g=e(s,`state`),_=e(s,`note`),v=l.clientHeight,y=u.offsetHeight,b=v+y,x=f.clientHeight,S=`cover`,C=e=>Math.min(Math.max(e,0),1),w=()=>v-(u.offsetTop-l.scrollTop),T=e=>C(S===`entry`?e/y:S===`exit`?(e-v)/y:S===`contain`?(e-y)/(v-y):e/b),E=()=>S===`entry`?[0,y/b*100]:S===`exit`?[v/b*100,100]:S===`contain`?[y/b*100,v/b*100]:[0,100],D=()=>{let e=w(),t=T(e),n=Math.round(t*100);u.style.opacity=String(.45+t*.55),u.style.transform=`scale(${(.88+t*.12).toFixed(3)})`,d.style.width=`${n}%`,u.dataset.range=S,u.dataset.progress=String(n),u.dataset.at=t<=0?`before`:t>=1?`after`:`running`,h.textContent=`${n}%`,g.textContent=t<=0?`not started yet`:t>=1?`already finished`:`running`,m.style.top=`${C(e/b)*(x-3)}px`},O=()=>{let[e,t]=E();p.style.top=`${e}%`,p.style.height=`${t-e}%`,c.dataset.range=S,_.textContent=a[S],D()};l.addEventListener(`scroll`,D),e(s,`range`).addEventListener(`change`,e=>{S=e.detail,O()}),O(),l.scrollTop=r+(y-v)/2,D()}export{s as mount};