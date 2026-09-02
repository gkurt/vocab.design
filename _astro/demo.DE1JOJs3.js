var e=[{key:`sessions`,label:`Sessions`,value:`94k`,delta:`+18%`,points:[38,41,39,44,48,45,52,50,57,55,61,64,60,68,71,67,74,78,75,82,86,83,90,94]},{key:`latency`,label:`Latency`,value:`29 ms`,delta:`2 spikes`,points:[28,31,29,33,30,88,34,29,32,30,35,31,28,33,96,37,30,29,34,31,27,33,30,29]},{key:`errors`,label:`Errors`,value:`4`,delta:`steady`,points:[4,5,4,4,5,4,4,4,5,4,4,5,4,4,4,5,4,4,4,4,5,4,4,4]},{key:`signups`,label:`Signups`,value:`76`,delta:`recovered`,points:[62,60,58,55,50,44,38,33,29,26,25,27,31,36,42,49,55,60,64,67,70,72,74,76]}],t=(e,t)=>({x:3+t/(e.length-1)*84,y:19-(Math.min(100,Math.max(0,e[t]??0))-0)/100*16}),n=(e,n)=>{let r=[];for(let n=0;n<e.points.length;n+=1){let{x:i,y:a}=t(e.points,n);r.push(`${i.toFixed(1)},${a.toFixed(1)}`)}let i=t(e.points,e.points.length-1);return`
    <svg
      class="${n?``:`sp-context`}"
      data-part="spark-${e.key}"
      ${n?`data-subject`:``}
      viewBox="0 0 90 22"
      width="90"
      height="22"
      role="img"
      aria-label="${e.label} over the last 30 days"
      style="display: block; flex: 0 0 auto; overflow: visible; color: var(--sp-accent)"
    >
      <polyline points="${r.join(` `)}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" />
      <circle cx="${i.x.toFixed(1)}" cy="${i.y.toFixed(1)}" r="2.1" fill="currentColor" />
    </svg>`};function r(t){t.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Traffic</span>
          <span class="sp-label">Last 30 days</span>
        </div>
        <div class="sp-body">
          <div class="sp-surface sp-stack" data-part="panel" style="gap: 0; padding: 6px 12px">${e.map(e=>`
      <div class="sp-row" data-part="row-${e.key}" style="gap: 12px; height: 34px">
        <span class="sp-text sp-text--ink sp-context sp-grow" data-part="label-${e.key}">${e.label}</span>
        ${n(e,e.key===`sessions`)}
        <span
          class="sp-text sp-text--ink sp-context"
          data-part="value-${e.key}"
          style="width: 54px; text-align: right; font-weight: 600; font-variant-numeric: tabular-nums"
        >${e.value}</span>
        <span class="sp-text sp-context" data-part="delta-${e.key}" style="width: 62px; text-align: right; font-size: 12px">${e.delta}</span>
      </div>`).join(``)}</div>
          <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin: 10px 2px 0; font-size: 12px">
            One shared range across all four rows, so a flat line means flat.
          </p>
        </div>
      </div>
    </div>
  `}export{r as mount};