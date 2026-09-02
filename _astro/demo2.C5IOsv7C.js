import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=8,n=8,r=420,i=200,a=180,o=[{key:`wide`,label:`wide`,width:r,heights:[a,a,a]},{key:`medium`,label:`medium`,width:300,heights:[114,114,58]},{key:`narrow`,label:`narrow`,width:190,heights:[54,54,54]}],s=[{label:`Filters`,lines:[100,72]},{label:`Results`,lines:[92,100]},{label:`Details`,lines:[100,66]}];function c(a){let c=s.map((e,t)=>`
      <div
        data-part="col-${t+1}"
        ${t===s.length-1?`data-subject data-drop="inline"`:`class="sp-context"`}
        style="display: flex; flex-direction: column; gap: 6px; flex: 0 0 auto; overflow: hidden; padding: 6px 8px;
               background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 6px"
      >
        <div class="sp-row" style="gap: 6px">
          <span style="display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 16px; height: 16px;
                       border-radius: 4px; background: var(--sp-accent); color: var(--sp-accent-ink); font-size: 10px; font-weight: 600">${t+1}</span>
          <span class="sp-label" style="color: var(--sp-ink); font-size: 11px; white-space: nowrap">${e.label}</span>
        </div>
        <div class="sp-stack" style="gap: 4px">
          ${e.lines.map(e=>`<div class="sp-line" style="width: ${e}%; height: 6px"></div>`).join(``)}
        </div>
      </div>`).join(``);a.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 256px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Viewport</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="viewports" data-axis="Width" data-value="wide">
            ${o.map(e=>`
              <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}" style="padding: 4px 10px; font-size: 11px">${e.label}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; align-items: flex-start; justify-content: center; padding: 12px">
          <div style="display: flex; justify-content: center; width: ${r}px; height: ${i}px">
            <div
              data-part="viewport"
              data-rows="one"
              style="display: flex; flex-wrap: wrap; align-content: flex-start; gap: ${t}px; width: ${r}px; height: ${i}px;
                     padding: ${n}px; background: var(--sp-sunken); border: 2px dashed var(--sp-line); border-radius: var(--sp-radius)"
            >${c}</div>
          </div>
        </div>
      </div>

      <span class="sp-text sp-context" data-stage-verdict data-part="note" role="status" style="width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center"></span>
    </div>
  `;let l=e(a,`viewport`),u=e(a,`note`),d=s.map((t,n)=>e(a,`col-${n+1}`)),f=d[s.length-1],p=e=>{let n=o.find(t=>t.key===e);if(!n||!f)return;let r=n.width-16-4,i=n.key===`wide`?3:n.key===`medium`?2:1,a=Math.floor(i===3?(r-16)/3:i===2?(r-t)/2:r);l.style.width=`${n.width}px`;for(let[e,t]of d.entries())t.style.width=`${e<i?a:r}px`,t.style.height=`${n.heights[e]}px`;let c=d.map(e=>Math.round(e.offsetTop)),p=new Set(c).size;f.dataset.drop=c[s.length-1]===c[0]?`inline`:`below`,l.dataset.rows=p===1?`one`:p===2?`two`:`three`,u.textContent=p===1?`${n.width}px: all three columns share the row, in order.`:p===2?`${n.width}px: the third column has dropped below the other two.`:`${n.width}px: one column per row, still numbered one to three.`};e(a,`viewports`).addEventListener(`change`,e=>p(e.detail)),p(`wide`)}export{c as mount};