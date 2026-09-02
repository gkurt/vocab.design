import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=360,n=1200,r=[{key:`xs`,label:`xs`,min:8,max:12},{key:`s`,label:`s`,min:12,max:18},{key:`m`,label:`m`,min:18,max:28},{key:`l`,label:`l`,min:28,max:44},{key:`xl`,label:`xl`,min:44,max:70},{key:`xxl`,label:`2xl`,min:72,max:116}],i=[{key:`narrow`,width:t},{key:`mid`,width:768},{key:`wide`,width:n}],a=16,o=14;function s(s){let c=r.map(e=>`
      <span class="sp-label" style="height: ${a}px; line-height: ${a}px; font-size: 11px; text-align: right">${e.label}</span>`).join(``),l=r.map(e=>`
      <div
        data-part="band-${e.key}"
        style="width: ${e.min}px; height: ${a}px; border-radius: 3px; background: var(--sp-accent);
               transition: width 0.4s var(--sp-ease)"
      ></div>`).join(``),u=r.map(e=>`
      <span class="sp-label" data-part="value-${e.key}" style="height: ${a}px; line-height: ${a}px; font-size: 11px; text-align: right; font-variant-numeric: tabular-nums">${e.min}px</span>`).join(``);s.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 272px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Viewport</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="viewports" data-axis="Width" data-value="narrow">
            ${i.map(e=>`
              <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}" style="padding: 4px 11px; font-size: 11px">${e.width}px</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; padding: 12px">
          <div style="position: relative; width: 260px; height: ${r.length*a+(r.length-1)*o}px">
            <div class="sp-stack sp-context" style="position: absolute; top: 0; left: 0; width: 26px; gap: ${o}px">${c}</div>

            <div
              data-part="ramp"
              data-subject
              data-viewport="narrow"
              data-moved="rest"
              style="position: absolute; top: 0; left: 36px; display: flex; flex-direction: column; align-items: flex-start;
                     gap: ${o}px; width: fit-content"
            >${l}</div>

            <div class="sp-stack sp-context" style="position: absolute; top: 0; right: 0; width: 54px; gap: ${o}px">${u}</div>
          </div>

          <span class="sp-label sp-context" style="font-size: 11px; letter-spacing: 0.02em">space-m: clamp(1.125rem, 0.857rem + 1.19vw, 1.75rem)</span>
        </div>
      </div>

      <span class="sp-text sp-context" data-stage-verdict data-part="note" role="status" style="width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center"></span>
    </div>
  `;let d=e(s,`ramp`),f=e(s,`note`),p=r.map(t=>e(s,`band-${t.key}`)),m=r.map(t=>e(s,`value-${t.key}`)),h=(e,n)=>{let r=Math.min(Math.max((n-t)/840,0),1);return Math.round(e.min+(e.max-e.min)*r)},g=null,_=e=>{let a=i.find(t=>t.key===e);if(!a)return;let o=r.map(e=>h(e,a.width));for(let[e,t]of p.entries())t.style.width=`${o[e]}px`;for(let[e,t]of m.entries())t.textContent=`${o[e]}px`;d.dataset.viewport=a.key;let s=g?o.filter((e,t)=>e!==g?.[t]).length:0;d.dataset.moved=g?s===o.length?`all`:s>0?`some`:`none`:`rest`,f.textContent=a.width<=t?`At ${a.width}px every step sits on its floor, and none of them goes lower.`:a.width>=n?`At ${a.width}px every step sits at its ceiling, and none of them goes higher.`:`At ${a.width}px every step is part way up its own ramp, none of them stepped.`,g=o};e(s,`viewports`).addEventListener(`change`,e=>_(e.detail)),_(`narrow`)}export{s as mount};