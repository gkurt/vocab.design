import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=2,n=56,r=52,i=76,a=64,o=192,s=[{key:`circle`,label:`circle`,nudge:-2,art:`width: 40px; height: 40px; border-radius: 50%; background: var(--sp-accent)`},{key:`triangle`,label:`triangle`,nudge:-6,subject:!0,art:`width: 44px; height: 40px; clip-path: polygon(50% 0, 100% 100%, 0 100%); background: var(--sp-accent)`},{key:`square`,label:`square`,nudge:0,art:`width: 40px; height: 40px; background: var(--sp-accent)`}],c={metric:`Metric: every bounding box starts on the line, so the round and pointed shapes read as inset.`,optical:`Optical: the round and pointed shapes are pushed past the line until their mass looks level.`},l=e=>e===0?`0`:`${e} px`,u=({key:e,label:t,nudge:o,subject:s,art:c})=>`
  <div style="display: flex; align-items: center; flex: 0 0 auto; height: ${n}px">
    <span class="sp-label sp-context" style="flex: 0 0 auto; width: ${i}px; padding-right: 10px; text-align: right">${t}</span>
    <span style="display: flex; align-items: center; flex: 0 0 auto; width: ${r}px; height: 100%">
      <span
        data-part="shape-${e}"
        ${s?`data-subject data-pose="[data-mode=optical]"`:``}
        data-mode="optical"
        style="flex: 0 0 auto; transform: translateX(${o}px); transition: transform 0.24s var(--sp-ease); ${c}"
      ></span>
    </span>
    <span class="sp-label sp-context" data-part="nudge-${e}" style="flex: 0 0 auto; width: ${a}px; padding-left: 12px; font-variant-numeric: tabular-nums">${l(o)}</span>
  </div>`;function d(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Shapes</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-value="optical" data-axis="Alignment" data-term="optical">
            <button class="sp-segment" type="button" data-part="seg-metric" value="metric">metric</button>
            <button class="sp-segment" type="button" data-part="seg-optical" value="optical">optical</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div data-part="arena" data-mode="optical" style="position: relative; flex: 0 0 auto; width: ${o}px; height: 168px">
            <span
              data-part="guide"
              style="position: absolute; left: ${i-t/2}px; top: 4px; bottom: 4px; width: ${t}px;
                     border-radius: 1px; background: var(--sp-muted); opacity: 0.5"
            ></span>
            ${s.map(u).join(``)}
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="height: 42px; max-width: 428px; text-align: center">${c.optical}</span>
        </div>
      </div>
    </div>
  `;let r=e(n,`arena`),a=e(n,`readout`),d=t=>{let i=c[t];if(i){r.dataset.mode=t;for(let{key:r,nudge:i}of s){let a=t===`optical`?i:0,o=e(n,`shape-${r}`);o.dataset.mode=t,o.style.transform=`translateX(${a}px)`,e(n,`nudge-${r}`).textContent=l(a)}a.textContent=i}};e(n,`switcher`).addEventListener(`change`,e=>d(e.detail))}export{d as mount};