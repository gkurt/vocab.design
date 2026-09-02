import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=3,n=10,r=434,i=176,a=414/t,o=[56,38,74,44,30,62],s=[{key:`lanes`,label:`lanes`},{key:`rows`,label:`equal rows`}],c={lanes:`Lanes stay strict; each item drops into whichever lane is shortest.`,rows:`Equal rows instead: every item starts on a row line, and the space shows.`};function l(l){let u=e=>e===1?`<div data-part="lane" data-subject data-free data-pose="[data-free]"
            style="position: absolute; top: 0; bottom: 0; left: ${e*148}px; width: ${a}px;
                   background: color-mix(in oklab, var(--sp-accent) 18%, transparent); border-radius: 3px"></div>`:`<div class="sp-context" data-part="lane-${e+1}"
            style="position: absolute; top: 0; bottom: 0; left: ${e*148}px; width: ${a}px;
                   background: color-mix(in oklab, var(--sp-accent) 18%, transparent); border-radius: 3px"></div>`,d=o.map((e,t)=>`
      <div
        class="sp-surface sp-context"
        data-part="item-${t+1}"
        data-place="lane"
        style="position: absolute; display: flex; flex-direction: column; gap: 5px; overflow: hidden;
               width: ${a}px; padding: 6px 8px; left: 0; top: 0; height: ${e}px;
               transition: left 360ms var(--sp-ease), top 360ms var(--sp-ease), height 360ms var(--sp-ease)"
      >
        <span class="sp-label" style="color: var(--sp-ink); font-size: 11px; white-space: nowrap">Item ${t+1}</span>
        ${e>=44?`<div class="sp-line" style="width: 76%; height: 6px"></div>`:``}
      </div>`).join(``);l.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 252px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">${t} lanes, six items</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="modes" data-axis="Packing" data-term="lanes" data-value="lanes">
            ${s.map(e=>`
              <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}" style="padding: 4px 9px; font-size: 11px; white-space: nowrap">${e.label}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-body" style="padding: 12px 20px">
          <div data-part="canvas" style="position: relative; width: ${r}px; height: ${i}px">
            ${Array.from({length:t},(e,t)=>u(t)).join(``)}
            ${d}
          </div>
        </div>
      </div>

      <span class="sp-text sp-context" data-stage-verdict data-part="note" role="status" style="width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center">${c.lanes}</span>
    </div>
  `;let f=e(l,`lane`),p=e(l,`note`),m=o.map((t,n)=>e(l,`item-${n+1}`)),h=e=>{let r=e===`lanes`;r?f.dataset.free=``:delete f.dataset.free;let i=Array.from({length:t},()=>0);for(let[e,a]of m.entries())if(r){let t=i.indexOf(Math.min(...i));a.style.left=`${t*148}px`,a.style.top=`${i[t]??0}px`,a.style.height=`${o[e]}px`,i[t]=(i[t]??0)+(o[e]??0)+n,a.dataset.place=`lane`,a.dataset.lane=String(t+1)}else{let n=e%t,r=Math.floor(e/t);a.style.left=`${n*148}px`,a.style.top=`${r*93}px`,a.style.height=`${o[e]}px`,a.dataset.place=`row`,a.dataset.lane=String(n+1)}p.textContent=c[e]??``};e(l,`modes`).addEventListener(`change`,e=>h(e.detail)),h(`lanes`)}export{l as mount};