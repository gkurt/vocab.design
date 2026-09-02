import{n as e}from"./parts.C-YLuC7Q.js";var t=600,n=[{key:`espresso`,name:`Espresso, 250 g`,price:18},{key:`filter`,name:`Filter blend, 500 g`,price:22}];function r(r,i){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Roastery</span>
          <span class="sp-chip" data-part="cart">Cart: 0 items</span>
        </div>
        <ul class="sp-list sp-context" style="margin-top: 8px">${n.map(e=>`
      <li class="sp-list-item">
        <span class="sp-grow">${e.name}</span>
        <span class="sp-label">$${e.price}</span>
        <button class="sp-button sp-button--sm" type="button" data-part="add-${e.key}">Add</button>
      </li>`).join(``)}</ul>
        <div style="height: 20px; margin-top: 12px">
          <p class="sp-text sp-text--ink" role="status" data-part="status" data-state="idle" data-subject style="margin: 0"></p>
        </div>
        <p class="sp-text" data-stage-announce data-part="heard" data-state="idle"
           style="margin: 10px 0 0; height: 20px; line-height: 20px">Nothing announced yet</p>
      </div>
    </div>
  `;let a=e(r,`status`),o=e(r,`heard`),s=e(r,`cart`),c=0,l=0,u;for(let d of n)e(r,`add-${d.key}`).addEventListener(`click`,()=>{c+=1,l+=d.price,s.textContent=`Cart: ${c} item${c===1?``:`s`}`;let e=`${d.name.split(`,`)[0]} added. Cart: ${c}, $${l}.`;a.dataset.state=`updated`,a.textContent=e,i.clearTimeout(u),o.dataset.state=`queued`,u=i.setTimeout(()=>{o.dataset.state=`spoken`,o.textContent=`“${e}”`},t)})}export{r as mount};