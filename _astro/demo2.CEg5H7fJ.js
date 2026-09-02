import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=130,n=10,r=10,i=[{key:`wide`,label:`wide`,width:430},{key:`medium`,label:`medium`,width:320},{key:`narrow`,label:`narrow`,width:170}],a=[{title:`Charts`,lines:[86,58]},{title:`Alerts`,lines:[72,64]},{title:`Exports`,lines:[80,52]}],o=[`one`,`two`,`three`];function s(s){let c=a.map((e,n)=>`
      <div
        class="sp-surface"
        data-part="card-${n+1}"
        style="flex: 0 1 ${t}px; min-width: 0; padding: 8px 10px"
      >
        <span class="sp-label" style="display: block; color: var(--sp-ink); font-weight: 600; font-size: 12px; line-height: 1.25">${e.title}</span>
        <div class="sp-stack" style="gap: 4px; margin-top: 6px">
          ${e.lines.map(e=>`<div class="sp-line" style="width: ${e}%; height: 6px"></div>`).join(``)}
        </div>
      </div>`).join(``);s.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 272px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Container is</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="widths" data-axis="Width" data-value="wide">
            ${i.map(e=>`
              <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}" style="padding: 4px 11px; font-size: 11px">${e.label}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; align-items: flex-start; justify-content: center; padding: 12px">
          <div style="width: ${i[0]?.width}px; height: 100%">
            <div
              data-part="row"
              data-subject
              data-width="wide"
              data-rows="one"
              data-orphan="natural"
              style="display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: flex-start; gap: ${n}px;
                     width: ${i[0]?.width}px; padding: ${r}px;
                     background: var(--sp-accent-soft); border-radius: var(--sp-radius)"
            >${c}</div>
          </div>
        </div>
      </div>

      <span class="sp-text sp-context" data-stage-verdict data-part="note" role="status" style="width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center"></span>
    </div>
  `;let l=e(s,`row`),u=e(s,`note`),d=a.map((t,n)=>e(s,`card-${n+1}`)),f=e=>{let t=i.find(t=>t.key===e);if(!t)return;l.style.width=`${t.width}px`,l.dataset.width=t.key;let n=d.map(e=>Math.round(e.offsetTop)),r=new Set(n).size,s=d[0],c=d[d.length-1],f=c&&n.filter(e=>e===n[n.length-1]).length===1,p=!!f&&!!s&&!!c&&c.offsetWidth>s.offsetWidth+1;l.dataset.rows=o[r-1]??`three`,l.dataset.orphan=p?`stretched`:`natural`,r===1?u.textContent=`${t.width}px wide: all three cards share one line.`:r===a.length?u.textContent=`${t.width}px wide: one card per line, and none of them stretched.`:f?u.textContent=`${t.width}px wide: the last card is alone, and stays ${Math.round(c?.offsetWidth??0)}px.`:u.textContent=`${t.width}px wide: ${r} lines, every card at its own size.`};e(s,`widths`).addEventListener(`change`,e=>f(e.detail)),f(`wide`)}export{s as mount};