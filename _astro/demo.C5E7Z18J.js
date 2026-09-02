import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=[`Standup`,`Design`,`Admin`,`Focus`,`1:1`,`Review`,`Interview`,`Retro`,`Planning`,`Support`,`Demo`,`Travel`],n=[`Standup`,`Design`,`Focus`,`Review`,`1:1`,`Hiring`,`Planning`,`Admin`],r=[`Meeting`,`Focus`,`Review`,`Admin`],i=[0,1,7,2,4,3,5,3,6,7,3,7],a=[0,0,3,1,0,2,0,2,0,3,2,3],o={4:{codes:r,of:e=>a[e]??0},8:{codes:n,of:e=>i[e]??0},12:{codes:t,of:e=>e}},s=`4`,c=[{name:`Mon`,events:[0,1,2]},{name:`Tue`,events:[3,4]},{name:`Wed`,events:[5,6,7]},{name:`Thu`,events:[8,9]},{name:`Fri`,events:[10,11]}],l=[`Standup`,`Design sync`,`Inbox`,`Deep work`,`1:1 Ana`,`Design review`,`Interview`,`Retro`,`Roadmap`,`Support`,`Demo`,`Offsite`],u=5,d=(e,t)=>`oklch(0.74 0.14 ${Math.round(e*360/t)+22})`,f=`#15181e`,p=26;function m(t){t.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 448px; padding: 12px 12px 11px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label" style="color: var(--sp-ink)">Team week</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Palette size" data-part="codes" data-value="${s}">
            <button class="sp-segment" type="button" data-part="seg-4" value="4" style="font-size: 11px; padding: 4px 10px">4 codes</button>
            <button class="sp-segment" type="button" data-part="seg-8" value="8" style="font-size: 11px; padding: 4px 10px">8 codes</button>
            <button class="sp-segment" type="button" data-part="seg-12" value="12" style="font-size: 11px; padding: 4px 10px">12 codes</button>
          </sp-segmented>
        </div>

        <div class="sp-row" data-part="week" style="align-items: flex-start; gap: 6px; margin-top: 10px">${c.map(e=>`
      <div class="sp-stack" style="flex: 1 1 0; min-width: 0; gap: 5px">
        <span class="sp-label" style="font-size: 10px">${e.name}</span>
        <div class="sp-stack" style="gap: 5px; height: 88px">
          ${e.events.map(e=>`
                <span data-part="mark-${e}" data-fine="${e}"
                      ${e===u?`data-subject`:``}
                      style="display: flex; align-items: center; flex: 0 0 auto; height: ${p}px; padding: 0 7px;
                             border-radius: 5px; background: ${d(0,4)}; color: ${f}; font-size: 10px;
                             font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${l[e]}</span>`).join(``)}
        </div>
      </div>`).join(``)}</div>

        <div class="sp-divider" style="margin-top: 10px"></div>

        <div class="sp-row sp-row--wrap sp-context" data-part="key"
             style="align-content: flex-start; gap: 4px 10px; height: 36px; margin-top: 8px"></div>

        <div class="sp-row sp-context" style="justify-content: flex-end; height: 15px; margin-top: 6px">
          <span class="sp-text sp-text--ink" data-part="readout" data-codes="${s}" style="font-size: 11px"></span>
        </div>
      </div>
    </div>
  `;let n=e(t,`week`),r=e(t,`key`),i=e(t,`readout`),a=e=>{let a=o[e];if(!a)return;let s=a.codes.length;for(let e of t.querySelectorAll(`[data-fine]`)){let t=Number(e.dataset.fine),n=a.of(t);e.dataset.code=String(n),e.style.background=d(n,s)}r.innerHTML=a.codes.map((e,t)=>`
          <span class="sp-row" style="gap: 4px; flex: 0 0 auto">
            <span class="sp-swatch" style="width: 9px; height: 9px; border-radius: 3px; --sp-swatch: ${d(t,s)}"></span>
            <span class="sp-label" style="font-size: 10px">${e}</span>
          </span>`).join(``),n.dataset.codes=e,i.dataset.codes=e,i.textContent=`${s} codes · hues ${Math.round(360/s)}° apart`};a(s),e(t,`codes`).addEventListener(`change`,e=>{a(e.detail)})}export{m as mount};