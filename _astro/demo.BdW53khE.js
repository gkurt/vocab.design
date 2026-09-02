import{n as e,t}from"./parts.C-YLuC7Q.js";var n=208,r=120,i=104,a=104,o=84,s=10,c=[{from:0,to:70,zone:`ok`,word:`Nominal`,color:`var(--sp-accent)`},{from:70,to:88,zone:`warn`,word:`Elevated`,color:`var(--sp-warn)`},{from:88,to:100,zone:`critical`,word:`Critical`,color:`#d0473a`}],l=c[2],u=[35,72,94],d=35,f=e=>(180+e*1.8)*Math.PI/180,p=(e,t)=>[i+t*Math.cos(f(e)),a+t*Math.sin(f(e))],m=(e,t,n)=>{let[r,i]=p(e,n),[a,o]=p(t,n);return`M ${r.toFixed(2)} ${i.toFixed(2)} A ${n} ${n} 0 0 1 ${a.toFixed(2)} ${o.toFixed(2)}`},h=e=>c.find(t=>e<=t.to)??l,g=e=>e*1.8-90;function _(l){let f=c.map(e=>`
      <path
        d="${m(e.from,e.to,o)}"
        fill="none"
        stroke="${e.color}"
        stroke-opacity="0.32"
        stroke-width="${s}"
      />`).join(``),_=Array.from({length:21},(e,t)=>{let n=t*5,r=n%25==0,[i,a]=p(n,o-s/2-3),[c,l]=p(n,r?63:70);return`<line
        x1="${i.toFixed(2)}" y1="${a.toFixed(2)}" x2="${c.toFixed(2)}" y2="${l.toFixed(2)}"
        stroke="var(--sp-muted)" stroke-width="${r?2:1.2}" stroke-linecap="round"
      />`}).join(``),v=u.map(e=>`
      <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="set-${e}">${e}%</button>`).join(``),y=h(d);l.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Cluster health</span>
          <span class="sp-label">node-04</span>
        </div>
        <div class="sp-body sp-stack" style="gap: 14px; align-items: center; justify-content: center">
          <div
            data-part="gauge"
            data-subject
            data-value="${d}"
            data-zone="${y.zone}"
            role="meter"
            aria-label="Disk pressure"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow="${d}"
            style="display: flex; flex-direction: column; align-items: center; gap: 2px"
          >
            <svg viewBox="0 0 ${n} ${r}" width="${n}" height="${r}" aria-hidden="true" style="display: block">
              <path d="${m(0,100,o)}" fill="none" stroke="var(--sp-sunken)" stroke-width="${s}" />
              ${f}
              ${_}
              <text x="20" y="117" text-anchor="middle" fill="var(--sp-muted)" font-size="10">0</text>
              <text x="188" y="117" text-anchor="middle" fill="var(--sp-muted)" font-size="10">100</text>
              <g
                data-part="needle"
                style="transform-box: view-box; transform-origin: ${i}px ${a}px;
                       transform: rotate(${g(d)}deg); transition: transform 0.5s var(--sp-ease)"
              >
                <line x1="${i}" y1="${a}" x2="${i}" y2="46" stroke="var(--sp-ink)" stroke-width="3" stroke-linecap="round" />
              </g>
              <circle cx="${i}" cy="${a}" r="6" fill="var(--sp-ink)" />
              <circle cx="${i}" cy="${a}" r="2.4" fill="var(--sp-surface)" />
            </svg>
            <div class="sp-row" style="gap: 8px; justify-content: center">
              <span
                data-part="readout"
                style="font-size: 22px; font-weight: 600; font-variant-numeric: tabular-nums; line-height: 1.1"
              >${d}%</span>
              <span
                data-part="status"
                style="width: 76px; font-size: 12px; font-weight: 600; color: ${y.color}"
              >${y.word}</span>
            </div>
          </div>
          <div class="sp-row sp-context" style="gap: 8px; justify-content: center">${v}</div>
        </div>
      </div>
    </div>
  `;let b=e(l,`gauge`),x=e(l,`needle`),S=e(l,`readout`),C=e(l,`status`),w=n=>{let r=h(n);b.dataset.value=String(n),b.dataset.zone=r.zone,b.setAttribute(`aria-valuenow`,String(n)),x.style.transform=`rotate(${g(n)}deg)`,S.textContent=`${n}%`,C.textContent=r.word,C.style.color=r.color;for(let r of u)t(e(l,`set-${r}`),`data-selected`,r===n)};for(let t of u)e(l,`set-${t}`).addEventListener(`click`,()=>w(t));w(d)}export{_ as mount};