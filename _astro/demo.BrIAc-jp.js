import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[{name:`FTSE 100`,change:`+0.4%`,up:!0},{name:`Brent crude`,change:`78.10`,up:!0},{name:`Cocoa`,change:`-2.1%`,up:!1},{name:`Copper`,change:`+1.1%`,up:!0},{name:`Gold`,change:`2,318.40`,up:!0},{name:`Yen`,change:`-0.3%`,up:!1}];function r(r){let i=n.map(e=>`
      <span class="sp-row" style="gap: 6px">
        <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 600; white-space: nowrap">${e.name}</span>
        <span class="sp-text" style="font-size: 12px; white-space: nowrap; color: ${e.up?`var(--sp-accent)`:`var(--sp-muted)`}">${e.change}</span>
      </span>`).join(``),a=e=>`<div class="sp-marquee-group"${e?` aria-hidden="true"`:``}>${i}</div>`;r.innerHTML=`
    <div class="sp-app" data-loop="keep">
      <div class="sp-frame sp-frame--wide" style="height: 232px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Markets</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 12px">
          <div
            class="sp-marquee sp-surface"
            data-part="strip"
            data-subject
            data-hover-driven
            style="flex: 0 0 auto; height: 34px; align-items: center; --sp-marquee-time: 16s; --sp-marquee-gap: 28px"
          >
            <div class="sp-marquee-track" data-part="track">${a(!1)}${a(!0)}</div>
          </div>
          <div class="sp-stack sp-context" data-part="page" style="flex: 1 1 auto; gap: 9px">
            <span class="sp-label">Overnight</span>
            <span class="sp-line" style="width: 96%"></span>
            <span class="sp-line" style="width: 88%"></span>
            <span class="sp-line" style="width: 92%"></span>
            <span class="sp-line" style="width: 54%"></span>
          </div>
        </div>
      </div>
    </div>
  `;let o=e(r,`strip`);o.addEventListener(`pointerenter`,()=>t(o,`data-paused`,!0)),o.addEventListener(`pointerleave`,()=>t(o,`data-paused`,!1))}export{r as mount};