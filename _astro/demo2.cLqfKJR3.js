import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n=560,r=360,i=[{name:`Meridian`,fares:9},{name:`Kestrel Air`,fares:14},{name:`Nordwind`,fares:6},{name:`Costa Sul`,fares:11}],a=i.reduce((e,t)=>e+t.fares,0);function o(o,s){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 276px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Lisbon, 12 to 19 May</span>
          <button class="sp-button sp-button--sm" data-part="search">Search</button>
        </div>
        <div class="sp-body" style="padding: 12px 14px">
          <div class="sp-surface" style="position: relative; height: 100%; padding: 10px 12px; display: flex; flex-direction: column; gap: 8px">
            <div class="sp-stack" data-part="worklist" data-subject data-mode="transparent" data-state="idle" data-pose="[data-mode=transparent]" style="gap: 6px">
              ${i.map((e,n)=>`
      <div class="sp-row" data-part="src-${n+1}" data-state="pending" style="gap: 9px">
        <span data-part="tick-${n+1}" style="flex: 0 0 16px; color: var(--sp-accent); opacity: 0; transition: opacity 0.2s var(--sp-ease)">${t(`check`)}</span>
        <span class="sp-text sp-text--ink sp-grow">${e.name}</span>
        <span class="sp-text" data-part="note-${n+1}" style="flex: 0 0 78px; text-align: right">queued</span>
      </div>`).join(``)}
            </div>
            <span class="sp-text sp-text--ink" data-part="result" hidden>${a} fares from ${i.length} carriers</span>
            <div class="sp-row sp-context" data-part="silent-wait" hidden style="position: absolute; inset: 0; justify-content: center; gap: 10px">
              <span class="sp-pulse" style="width: 14px; height: 14px; border-radius: 50%; background: var(--sp-muted)"></span>
              <span class="sp-text">Searching</span>
            </div>
          </div>
        </div>
        <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="transparent" data-axis="Wait" data-term="transparent">
          <button class="sp-segment" data-part="seg-transparent" value="transparent">Show the work</button>
          <button class="sp-segment" data-part="seg-silent" value="silent">Silent</button>
        </sp-segmented>
      </div>
    </div>
  `;let c=e(o,`worklist`),l=e(o,`result`),u=e(o,`silent-wait`),d=i.map((t,n)=>({source:t,row:e(o,`src-${n+1}`),tick:e(o,`tick-${n+1}`),note:e(o,`note-${n+1}`)})),f=[],p=()=>{for(let e of f)s.clearTimeout(e);f.length=0,c.dataset.state=`idle`,l.hidden=!0,u.hidden=!0;for(let e of d)e.row.dataset.state=`pending`,e.note.textContent=`queued`,e.tick.style.opacity=`0`},m=e=>{p(),c.dataset.mode=e;for(let t of d)t.row.hidden=e===`silent`};e(o,`mode`).addEventListener(`change`,e=>{m(e.detail)}),e(o,`search`).addEventListener(`click`,()=>{p();let e=c.dataset.mode===`transparent`;c.dataset.state=`running`,u.hidden=e,d.forEach((t,r)=>{e&&(f.push(s.setTimeout(()=>{t.row.dataset.state=`checking`,t.note.textContent=`checking`},r*n)),f.push(s.setTimeout(()=>{t.row.dataset.state=`done`,t.note.textContent=`${t.source.fares} fares`,t.tick.style.opacity=`1`},(r+1)*n)))}),f.push(s.setTimeout(()=>{c.dataset.state=`done`,u.hidden=!0,l.hidden=!1},i.length*n+r))})}export{o as mount};