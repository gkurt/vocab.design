import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=8,n=176,r=(e,n)=>`calc(((100% - ${(e-1)*t}px) / ${e} + ${t}px) * ${n})`,i=(e,n)=>`calc((100% - ${(e-1)*t}px) / ${e} * ${n} + ${t*(n-1)}px)`,a=[{key:`four`,label:`4 columns`},{key:`six`,label:`6 columns`}],o={four:{columns:4,blocks:[{key:`feature`,start:1,count:2},{key:`notes`,start:3,count:1},{key:`ad`,start:4,count:1}]},six:{columns:6,blocks:[{key:`feature`,start:1,count:3},{key:`notes`,start:4,count:2},{key:`ad`,start:6,count:1}]}},s={four:`Blocks on the 4-column rhythm, with the 6-column lines still drawn.`,six:`On the 6-column rhythm now, and the shared centre line has not moved.`},c=`display: flex; flex-direction: column; gap: 6px; padding: 8px 10px; overflow: hidden`;function l(l){let u=Array.from({length:4},()=>`<div style="background: var(--sp-accent); opacity: 0.12; border-radius: 2px"></div>`).join(``),d=Array.from({length:5},(e,t)=>`<div style="position: absolute; top: 0; bottom: 0; left: calc(${r(6,t+1)} - 5px); width: 2px; background: var(--sp-accent); opacity: 0.45"></div>`).join(``),f=[{key:`feature`,label:`Feature`},{key:`notes`,label:`Notes`},{key:`ad`,label:`Ad`}].map(e=>`
      <div
        class="sp-surface sp-context"
        data-part="block-${e.key}"
        data-rhythm="four"
        style="${c}; position: absolute; top: 24px; height: 128px; left: 0; width: 0;
               transition: left 340ms var(--sp-ease), width 340ms var(--sp-ease)"
      >
        <span class="sp-label" style="color: var(--sp-ink); font-size: 11px; white-space: nowrap">${e.label}</span>
        <div class="sp-line" style="width: 80%; height: 6px"></div>
      </div>`).join(``);l.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 252px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Home page</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="rhythms" data-axis="Rhythm" data-value="four">
            ${a.map(e=>`
              <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}" style="padding: 4px 9px; font-size: 11px; white-space: nowrap">${e.label}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-body" style="padding: 12px 20px">
          <div style="position: relative; height: ${n}px">
            <div class="sp-context" data-part="grid-four" style="position: absolute; inset: 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: ${t}px; pointer-events: none">${u}</div>

            <div data-part="content" style="position: absolute; inset: 0">${f}</div>

            <div class="sp-context" data-part="grid-six" style="position: absolute; inset: 0; pointer-events: none; z-index: 3">${d}</div>

            <div
              data-part="shared"
              data-subject
              style="position: absolute; top: 0; bottom: 0; left: calc(50% - 2px); width: 4px; z-index: 4;
                     background: var(--sp-accent); border-radius: 2px"
            ></div>
          </div>
        </div>
      </div>

      <span class="sp-text sp-context" data-stage-verdict data-part="note" role="status" style="width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center">${s.four}</span>
    </div>
  `;let p=e(l,`note`),m=t=>{let n=o[t];if(n){for(let a of n.blocks){let o=e(l,`block-${a.key}`);o.dataset.rhythm=t,o.style.left=r(n.columns,a.start-1),o.style.width=i(n.columns,a.count)}p.textContent=s[t]??``}};e(l,`rhythms`).addEventListener(`change`,e=>m(e.detail)),m(`four`)}export{l as mount};