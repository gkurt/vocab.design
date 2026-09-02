import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=[{key:`1`,at:`0:04`,seconds:4,speaker:`MARA`,line:`You kept it, all this time.`},{key:`2`,at:`0:11`,seconds:11,speaker:`JUN`,line:`I kept all of them. The kettle is on.`},{key:`3`,at:`0:18`,seconds:18,speaker:``,line:`[kettle clicks off]`},{key:`4`,at:`0:24`,seconds:24,speaker:`MARA`,line:`Then read this one first.`}],r=32,i=`var(--sp-accent-soft)`;function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-context" data-part="player" style="gap: 10px">
          <div style="flex: 0 0 auto; width: 84px; height: 48px; border-radius: 5px;
                      background: linear-gradient(160deg, #2b3550 0%, #465a7d 62%, #6d7f9c 100%)"></div>
          <div class="sp-grow">
            <span class="sp-label" style="display: block">Kitchen scene, 0:32</span>
            <div class="sp-progress" data-part="progress" style="margin-top: 6px; --sp-value: 0%">
              <div class="sp-progress-fill"></div>
            </div>
          </div>
          <span class="sp-text sp-text--ink" data-part="clock" data-at="0:00"
                style="flex: 0 0 auto; font-size: 12px; font-variant-numeric: tabular-nums">0:00</span>
        </div>

        <div class="sp-surface" data-part="panel" data-subject style="margin-top: 10px; padding: 6px 6px 8px">
          <span class="sp-label" style="display: block; padding: 2px 6px 4px">Transcript</span>
          <ul class="sp-list" data-part="passages" style="gap: 2px">
            ${n.map(e=>`
    <li class="sp-row" data-part="entry-${e.key}" data-at="${e.at}"
        style="gap: 8px; align-items: baseline; padding: 5px 6px; border-radius: 5px">
      <button class="sp-button sp-button--quiet sp-button--sm" type="button" data-part="time-${e.key}"
              style="flex: 0 0 auto; padding: 1px 5px; font-size: 11px; color: var(--sp-accent)">${e.at}</button>
      <span class="sp-text sp-text--ink" data-part="text-${e.key}" style="font-size: 12px; line-height: 1.4">
        ${e.speaker?`<b style="font-weight: 600">${e.speaker}:</b> `:``}${e.line}
      </span>
    </li>`).join(``)}
          </ul>
        </div>

        <div class="sp-row sp-context" style="margin-top: 10px; gap: 8px">
          <div class="sp-row sp-grow sp-surface" style="gap: 6px; padding: 0 8px">
            ${t(`search`)}
            <input class="sp-input" type="text" data-part="search" spellcheck="false" aria-label="Search the transcript"
                   placeholder="Search the transcript" style="border: 0; background: transparent; padding-left: 0" />
          </div>
          <span class="sp-text sp-text--ink" data-part="hits" data-count="0"
                style="flex: 0 0 96px; text-align: right; font-size: 11px; white-space: nowrap">Nothing searched</span>
        </div>
      </div>
    </div>
  `;let o=e(a,`clock`),s=e(a,`progress`),c=e(a,`search`),l=e(a,`hits`),u=n.map(t=>({entry:t,el:e(a,`entry-${t.key}`)})),d=e=>{o.dataset.at=e.at,o.textContent=e.at,s.style.setProperty(`--sp-value`,`${e.seconds/r*100}%`);for(let t of u){let n=t.entry===e;n?t.el.dataset.current=``:delete t.el.dataset.current,t.el.style.boxShadow=n?`inset 2px 0 0 var(--sp-accent)`:``}};for(let{entry:t}of u)e(a,`time-${t.key}`).addEventListener(`click`,()=>d(t));c.addEventListener(`input`,()=>{let e=c.value.trim().toLowerCase(),t=0;for(let n of u){let r=`${n.entry.speaker} ${n.entry.line}`.toLowerCase();e.length>0&&r.includes(e)?(t+=1,n.el.dataset.hit=``,n.el.style.background=i):(delete n.el.dataset.hit,n.el.style.background=``)}l.dataset.count=String(t),l.textContent=e.length===0?`Nothing searched`:`${t} passage${t===1?``:`s`}`})}export{a as mount};