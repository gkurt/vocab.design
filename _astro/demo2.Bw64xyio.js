import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[{key:`overview`,label:`Overview`},{key:`berths`,label:`Berths`},{key:`tides`,label:`Tides`}],r={overview:`
    <div data-part="view-overview">
      <span class="sp-heading">Overview</span>
      <div class="sp-row" style="gap: 8px; margin-top: 10px">
        <div class="sp-surface" style="flex: 1 1 0; padding: 8px 10px">
          <div class="sp-label">Occupied</div>
          <div class="sp-heading" style="margin-top: 2px">38</div>
        </div>
        <div class="sp-surface" style="flex: 1 1 0; padding: 8px 10px">
          <div class="sp-label">Free</div>
          <div class="sp-heading" style="margin-top: 2px">11</div>
        </div>
      </div>
      <div class="sp-stack" style="margin-top: 12px">${(e=>e.map(e=>`<div class="sp-line" style="width: ${e}%"></div>`).join(``))([92,78,84])}</div>
    </div>`,berths:`
    <div data-part="view-berths">
      <span class="sp-heading">Berths</span>
      <ul class="sp-list" style="margin-top: 6px">
        <li class="sp-list-item"><span class="sp-grow">A1 Kestrel</span><span class="sp-text">18 m</span></li>
        <li class="sp-list-item"><span class="sp-grow">A2 Marlin</span><span class="sp-text">12 m</span></li>
        <li class="sp-list-item"><span class="sp-grow">B4 Petrel</span><span class="sp-text">9 m</span></li>
        <li class="sp-list-item"><span class="sp-grow">C7 Gannet</span><span class="sp-text">22 m</span></li>
      </ul>
    </div>`,tides:`
    <div data-part="view-tides">
      <span class="sp-heading">Tides</span>
      <div class="sp-stack" style="margin-top: 10px; gap: 10px">
        <div class="sp-surface" style="padding: 9px 10px">
          <div class="sp-label">High water</div>
          <div class="sp-text sp-text--ink" style="margin-top: 2px">04:12 and 16:38</div>
        </div>
        <div class="sp-surface" style="padding: 9px 10px">
          <div class="sp-label">Low water</div>
          <div class="sp-text sp-text--ink" style="margin-top: 2px">10:25 and 22:51</div>
        </div>
      </div>
    </div>`};function i(i,a){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="shell" data-subject data-view="overview" data-loads="1" style="height: 266px">
        <div class="sp-topbar" data-part="topbar">
          <span class="sp-heading sp-grow">Harbour office</span>
          <span class="sp-avatar">JK</span>
        </div>
        <div class="sp-row" style="flex: 1 1 auto; min-height: 0; gap: 0; align-items: stretch">
          <nav data-part="rail" aria-label="Sections" style="flex: 0 0 118px; padding: 10px 8px; border-right: 1px solid var(--sp-line)">
            <ul class="sp-nav">${n.map(({key:e,label:t})=>`<li><span class="sp-nav-item" data-part="nav-${e}"${e===`overview`?` data-current`:``}>${t}</span></li>`).join(``)}</ul>
          </nav>
          <main class="sp-context" data-part="view" style="flex: 1 1 auto; min-width: 0; padding: 12px; background: var(--sp-sunken); overflow: hidden">
            ${r.overview}
          </main>
        </div>
        <div class="sp-row sp-row--between" data-part="footer" style="flex: 0 0 auto; padding: 7px 12px; border-top: 1px solid var(--sp-line)">
          <span class="sp-label">Shell up <span data-part="uptime" style="display: inline-block; min-width: 30px; font-variant-numeric: tabular-nums">0:00</span></span>
          <span class="sp-label">views loaded <span data-part="loads" style="font-variant-numeric: tabular-nums">1</span></span>
        </div>
      </div>
    </div>
  `;let o=e(i,`shell`),s=e(i,`view`),c=e(i,`loads`),l=e(i,`uptime`),u=n.map(({key:t})=>[t,e(i,`nav-${t}`)]);for(let[e,n]of u)n.addEventListener(`click`,()=>{if(o.dataset.view!==e){o.dataset.view=e,o.dataset.loads=String(Number(o.dataset.loads)+1),c.textContent=o.dataset.loads,s.innerHTML=r[e];for(let[,e]of u)t(e,`data-current`,e===n)}});let d=0,f=()=>{d++,l.textContent=`${Math.floor(d/60)}:${String(d%60).padStart(2,`0`)}`,a.setTimeout(f,1e3)};a.setTimeout(f,1e3)}export{i as mount};