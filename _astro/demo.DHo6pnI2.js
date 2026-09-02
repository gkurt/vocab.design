import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=[{key:`search`,label:`Site search`,forced:0},{key:`name`,label:`Full name`,forced:3},{key:`email`,label:`Email`,forced:1},{key:`phone`,label:`Phone`,forced:2}],r={forced:`Three fields carry tabindex 1 to 3, so Tab visits them before the site search above them. This is the mistake.`,source:`Every control is tabindex 0, so the sequence is the source order and the search box comes first again.`},i=`display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 18px; height: 18px;border-radius: 50%; background: var(--sp-accent-soft); color: var(--sp-ink); font-size: 11px; font-weight: 600`;function a(a){let o=e=>`
    <div class="sp-row" data-part="row-${e.key}" style="gap: 6px; height: 30px">
      <span aria-hidden="true" data-part="badge-${e.key}" style="${i}"></span>
      <label class="sp-label" for="vd-pt-${e.key}" style="flex: 0 0 56px">${e.label}</label>
      <input class="sp-input sp-grow" id="vd-pt-${e.key}" data-part="stop-${e.key}" autocomplete="off" />
    </div>`,s=e=>`
    <div class="sp-row" data-part="line-${e.key}"
         style="gap: 6px; height: 20px; padding: 0 4px; margin: 0 -4px; border-radius: 4px">
      <span data-part="rank-${e.key}" class="sp-text sp-text--ink"
            style="flex: 0 0 12px; font-size: 11px; font-weight: 600"></span>
      <span class="sp-text sp-grow" style="font-size: 11px; white-space: nowrap">${e.label}</span>
      <span class="sp-text" data-part="attr-${e.key}" style="font-size: 10px; white-space: nowrap"></span>
    </div>`,[c,...l]=n;a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 14px 16px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="forced" data-axis="Built with" data-term="forced">
            <button class="sp-segment" data-part="seg-forced" value="forced">tabindex 1 to 3</button>
            <button class="sp-segment" data-part="seg-source" value="source">tabindex 0</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="margin-top: 10px; gap: 12px; align-items: flex-start">
          <div class="sp-grow">
            <div class="sp-context">${c?o(c):``}</div>
            <div class="sp-surface" data-part="form" data-subject data-pose="[data-mode=forced]" data-mode="forced"
                 style="margin-top: 8px; padding: 10px 12px">
              <span class="sp-label">Contact form</span>
              <div class="sp-stack" style="margin-top: 6px; gap: 6px">${l.map(o).join(``)}</div>
            </div>
          </div>

          <div class="sp-surface sp-context" style="flex: 0 0 160px; padding: 10px 12px">
            <span class="sp-label">Tab visits</span>
            <div style="margin-top: 6px">${n.map(s).join(``)}</div>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="next"
                    style="margin-top: 8px; width: 100%">Next stop</button>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-case="forced"
           style="margin: 10px 0 0; height: 34px; font-size: 11px">${r.forced}</p>
      </div>
    </div>
  `;let u=e(a,`form`),d=e(a,`caption`),f=`forced`,p=0,m=()=>f===`source`?n:[...n.filter(e=>e.forced>0).sort((e,t)=>e.forced-t.forced),...n.filter(e=>e.forced===0)],h=()=>{let r=m();for(let i of n){let n=r.indexOf(i)+1,o=f===`forced`?i.forced:0;e(a,`badge-${i.key}`).textContent=String(n),e(a,`rank-${i.key}`).textContent=String(n),e(a,`attr-${i.key}`).textContent=`tabindex ${o}`,e(a,`stop-${i.key}`).setAttribute(`tabindex`,String(o));let s=r[p]===i,c=e(a,`line-${i.key}`);t(c,`data-current`,s),c.style.background=s?`var(--sp-accent-soft)`:`transparent`,t(e(a,`stop-${i.key}`),`data-sim-focus`,s)}},g=e=>{f=e,p=0,u.dataset.mode=e,d.dataset.case=e,d.textContent=r[e],h()};g(`forced`),e(a,`next`).addEventListener(`click`,()=>{p=Math.min(p+1,n.length-1),h()}),e(a,`segmented`).addEventListener(`change`,e=>{g(e.detail===`source`?`source`:`forced`)})}export{a as mount};