import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import{n as r}from"./measure.DK7AY2_i.js";var i=202,a=12,o=[{target:`app-new`,text:`Start here. Every report begins as a draft you can throw away.`},{target:`app-filter`,text:`Narrow the list down to the accounts you actually watch.`},{target:`app-row`,text:`Open a report to see who changed what, and when.`}];function s(e,t,n){return`
    <li class="sp-list-item"${n===0?` data-part="app-row"`:``}>
      <span class="sp-grow">${e}</span>
      <span class="sp-text">${t}</span>
    </li>`}function c(c){c.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" data-part="frame" style="height: 288px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Reports</span>
          <button class="sp-icon-button" data-part="app-filter" type="button" aria-label="Filter">${n(`filter`)}</button>
          <button class="sp-button sp-button--sm" data-part="app-new" type="button">New report</button>
        </div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 8px">
          <ul class="sp-list sp-surface">
            ${s(`Q3 revenue`,`9:04`,0)}
            ${s(`Churn by plan`,`Yesterday`,1)}
            ${s(`Trial funnel`,`Monday`,2)}
          </ul>
        </div>

        <div data-part="spot" style="position: absolute; z-index: 1; border-radius: 8px; outline: 2px solid var(--sp-accent); box-shadow: 0 0 0 999px var(--sp-scrim)"></div>
        <div class="sp-surface" data-part="tip" data-subject data-step="1" role="dialog" aria-label="Product tour"
             style="position: absolute; z-index: 2; width: ${i}px; padding: 12px; box-shadow: var(--sp-shadow)">
          <div class="sp-label" data-part="tip-count">Step 1 of ${o.length}</div>
          <p class="sp-text sp-text--ink" data-part="tip-text" style="margin: 6px 0 10px; min-height: 39px">${o[0]?.text??``}</p>
          <div class="sp-row sp-row--between">
            <button class="sp-button sp-button--quiet sp-button--sm" data-part="tip-skip" type="button">Skip</button>
            <button class="sp-button sp-button--sm" data-part="tip-next" type="button">Next</button>
          </div>
        </div>
      </div>
    </div>
  `;let l=e(c,`frame`),u=e(c,`spot`),d=e(c,`tip`),f=e(c,`tip-text`),p=e(c,`tip-count`),m=e(c,`tip-next`),h=n=>{let s=o[n];if(!s)return;let h=r(e(c,s.target),l);u.style.left=`${h.left-4}px`,u.style.top=`${h.top-4}px`,u.style.width=`${h.width+8}px`,u.style.height=`${h.height+8}px`;let g=h.left+h.width/2-i/2;d.style.left=`${Math.min(Math.max(g,a),l.offsetWidth-i-a)}px`,d.style.top=`${h.top+h.height+a}px`,d.dataset.step=String(n+1),p.textContent=`Step ${n+1} of ${o.length}`,f.textContent=s.text;let _=n===o.length-1;t(m,`data-last`,_),m.textContent=_?`Done`:`Next`},g=()=>{u.hidden=!0,d.hidden=!0},_=0;m.addEventListener(`click`,()=>{if(_+1>=o.length)return g();_+=1,h(_)}),e(c,`tip-skip`).addEventListener(`click`,g),h(0)}export{c as mount};