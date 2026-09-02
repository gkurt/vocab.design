import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=[{lines:[46,100,74]},{lines:[52,96,68]},{lines:[42,100,80]},{lines:[56,92,64]}],n=[{key:`zigzag`,label:`alternating`},{key:`aligned`,label:`all left`}],r=400;function i(i){let a=t.map((e,t)=>`
      <div
        data-part="row-${t+1}"
        data-side="left"
        style="display: flex; flex-direction: row; align-items: center; gap: 12px; height: 46px; padding: 8px 10px;
               background: var(--sp-surface); border-radius: 6px"
      >
        <div
          data-part="picture-${t+1}"
          style="flex: 0 0 auto; width: 76px; height: 30px; border-radius: 4px;
                 background: var(--sp-accent-soft); border: 1px solid var(--sp-accent)"
        ></div>
        <div class="sp-stack" style="flex: 1 1 auto; min-width: 0; gap: 4px">
          <div style="width: ${e.lines[0]}%; height: 7px; border-radius: 4px; background: color-mix(in oklab, var(--sp-ink) 55%, transparent)"></div>
          <div class="sp-line" style="width: ${e.lines[1]}%; height: 6px"></div>
          <div class="sp-line" style="width: ${e.lines[2]}%; height: 6px"></div>
        </div>
      </div>`).join(``);i.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 266px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Rows</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="modes" data-axis="Pattern" data-term="zigzag" data-value="zigzag">
            ${n.map(e=>`
              <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}" style="padding: 4px 10px; font-size: 11px">${e.label}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; align-items: flex-start; justify-content: center; padding: 12px">
          <div
            data-part="stack"
            data-subject
            data-pattern="alternating"
            data-pose="[data-pattern=alternating]"
            style="display: flex; flex-direction: column; gap: 8px; width: ${r}px"
          >${a}</div>
        </div>
      </div>

      <span class="sp-text sp-context" data-stage-verdict data-part="note" role="status" style="width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center"></span>
    </div>
  `;let o=e(i,`stack`),s=e(i,`note`),c=t.map((t,n)=>e(i,`row-${n+1}`)),l=t.map((t,n)=>e(i,`picture-${n+1}`)),u=e=>{let t=e===`zigzag`;for(let[e,n]of c.entries())n.style.flexDirection=t&&e%2==1?`row-reverse`:`row`;let n=l.map((e,t)=>{let n=c[t];if(!n)return`left`;let r=n.getBoundingClientRect(),i=e.getBoundingClientRect(),a=i.left+i.width/2>r.left+r.width/2?`right`:`left`;return n.dataset.side=a,a}),r=n.every((e,t)=>t===0||e!==n[t-1]),i=n.every(e=>e===n[0]);o.dataset.pattern=r?`alternating`:i?`aligned`:`mixed`,s.textContent=r?`Each row starts on the side the row above it finished.`:`Four pictures hard left, and the run reads as one list.`};e(i,`modes`).addEventListener(`change`,e=>u(e.detail)),u(`zigzag`)}export{i as mount};