import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=1900,r=1300,i=[{tag:`Chapter one`,title:`Reef habitats`},{tag:`Chapter two`,title:`Tide pools`},{tag:`Chapter three`,title:`Kelp forests`}],a=[1284,1291,1276,1302,1288],o={none:`Both panels move for longer than five seconds and neither was asked for. That is the whole of what criterion 2.2.2 is about.`,pause:`One visible control that really stops everything. The criterion asks for an escape, not for a transport bar.`,both:`Hide is the third escape and the honest one for a figure that keeps refreshing: the reader deletes the movement rather than freezing it.`};function s(s,c){let l=i.map((e,t)=>`<span data-part="dot-${t+1}" style="width: 6px; height: 6px; border-radius: 50%; background: var(--sp-line)"></span>`).join(``);s.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 10px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-grow"></span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="offered" data-axis="Controls offered" data-value="pause">
            <button class="sp-segment" type="button" data-part="seg-none" value="none"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">No control</button>
            <button class="sp-segment" type="button" data-part="seg-pause" value="pause"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Pause</button>
            <button class="sp-segment" type="button" data-part="seg-both" value="both"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Pause and hide</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="scene" data-motion="running"
             style="margin-top: 8px; padding: 10px; display: flex; flex-direction: column; gap: 9px">
          <div class="sp-row" data-part="moving" style="height: 96px; gap: 10px; align-items: stretch">
            <div class="sp-surface sp-context" data-part="reel"
                 style="flex: 1 1 auto; min-width: 0; overflow: hidden; display: flex; flex-direction: column;
                        background: var(--sp-sunken)">
              <div class="sp-row" data-part="track" data-index="0"
                   style="flex: 1 1 auto; gap: 0; align-items: stretch; translate: 0 0;
                          transition: translate 0.34s var(--sp-ease)">${i.map(({tag:e,title:t})=>`
      <div class="sp-stack" style="flex: 0 0 100%; gap: 5px; padding: 9px 11px">
        <span class="sp-label" style="font-size: 9.5px">${e}</span>
        <span class="sp-heading" style="font-size: 13px">${t}</span>
        <div class="sp-line" style="width: 82%"></div>
        <div class="sp-line" style="width: 58%"></div>
      </div>`).join(``)}</div>
              <div class="sp-row" data-part="dots" style="justify-content: center; gap: 5px; padding-bottom: 7px">${l}</div>
            </div>

            <div class="sp-surface sp-context" data-part="figure"
                 style="flex: 0 0 132px; padding: 9px 11px; display: flex; flex-direction: column; gap: 3px;
                        background: var(--sp-sunken)">
              <span class="sp-label" style="font-size: 9.5px">Watching now</span>
              <span class="sp-text--ink" data-part="count"
                    style="font-size: 24px; font-weight: 600; line-height: 1.15">${a[0]}</span>
              <span class="sp-label" data-part="refresh" style="font-size: 9.5px">Refreshing every second</span>
            </div>
          </div>

          <div class="sp-surface sp-context" data-part="blanked" hidden
               style="height: 96px; display: flex; align-items: center; justify-content: center;
                      background: var(--sp-sunken)">
            <span class="sp-text" style="font-size: 11.5px">Hidden. Nothing in this region moves.</span>
          </div>

          <div class="sp-row" style="height: 28px; gap: 8px">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="pause" data-subject
                    style="width: 76px; justify-content: center; font-size: 11.5px">Pause</button>
            <button class="sp-button sp-button--quiet sp-button--sm sp-context" type="button" data-part="hide" hidden
                    style="width: 68px; justify-content: center; font-size: 11.5px; color: var(--sp-muted)">Hide</button>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-offered="pause"
           style="margin: 8px 0 0; height: 30px; font-size: 11px; line-height: 1.35">${o.pause}</p>
      </div>
    </div>
  `;let u=e(s,`scene`),d=e(s,`track`),f=e(s,`moving`),p=e(s,`blanked`),m=e(s,`count`),h=e(s,`refresh`),g=e(s,`pause`),_=e(s,`hide`),v=e(s,`caption`),y=i.map((t,n)=>e(s,`dot-${n+1}`)),b=0,x=0,S=!1,C=!1,w,T,E=()=>{d.dataset.index=String(b),d.style.translate=`${b*-100}% 0`,y.forEach((e,n)=>{t(e,`data-current`,n===b),e.style.background=n===b?`var(--sp-accent)`:`var(--sp-line)`})},D=()=>{b=(b+1)%i.length,E(),w=c.setTimeout(D,n)},O=()=>{x=(x+1)%a.length,m.textContent=String(a[x]),T=c.setTimeout(O,r)},k=()=>{c.clearTimeout(w),c.clearTimeout(T),w=void 0,T=void 0},A=()=>{k(),w=c.setTimeout(D,n),T=c.setTimeout(O,r)},j=()=>{let e=C?`hidden`:S?`paused`:`running`;u.dataset.motion=e,t(f,`hidden`,C),t(p,`hidden`,!C),g.textContent=S?`Play`:`Pause`,h.textContent=S?`Held at this reading`:`Refreshing every second`,C||S?k():A()},M=e=>{S=!1,C=!1,t(g,`hidden`,e===`none`),t(_,`hidden`,e!==`both`),v.dataset.offered=e,v.textContent=o[e],j()};E(),M(`pause`),g.addEventListener(`click`,()=>{S=!S,j()}),_.addEventListener(`click`,()=>{C=!0,j()}),e(s,`offered`).addEventListener(`change`,e=>{M(e.detail)})}export{s as mount};