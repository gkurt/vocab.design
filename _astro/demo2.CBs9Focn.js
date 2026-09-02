import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n=[`Amira in Leeds`,`Tom in Bristol`,`Sana in Derby`,`Ray in Hull`],r=350,i=2200,a=700,o={fabricated:{rating:`4.8`,count:`1,284 reviews`},genuine:{rating:`4.2`,count:`2 reviews`}},s={fabricated:`Twelve hundred reviews claimed, two on file, and the buyers are four names on a timer.`,genuine:`The count is the number of reviews that exist, and no strangers are announced.`},c=[[`JM`,`J. Mercer`,`Comfortable on the road, noisy on gravel.`],[`PD`,`P. Doyle`,`Sizing runs small. Ordered a half size up.`]].map(([e,t,n])=>`
    <div class="sp-row" style="gap: 8px; align-items: flex-start">
      <span class="sp-avatar" style="width: 22px; height: 22px; font-size: 10px">${e}</span>
      <span class="sp-stack" style="gap: 2px">
        <span class="sp-text sp-text--ink" style="font-size: 11px; font-weight: 500">${t}</span>
        <span class="sp-text" style="font-size: 11px">${n}</span>
      </span>
    </div>`).join(``),l=Array.from({length:5},()=>t(`star`,`sp-icon--filled`)).join(``);function u(t,u){t.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 244px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Cascade Trail Runner</span>
          <span class="sp-text">129.00</span>
        </div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface" style="display: flex; flex-direction: column; gap: 8px; padding: 10px">
            <div class="sp-row" style="gap: 8px">
              <span class="sp-row" data-part="stars" style="gap: 1px; color: var(--sp-muted)">${l}</span>
              <span class="sp-text sp-text--ink" data-part="rating" style="font-size: 12px; font-weight: 600">${o.fabricated.rating}</span>
              <span
                class="sp-text"
                data-part="review-count"
                data-subject
                data-mode="fabricated"
                data-pose="[data-mode=fabricated]"
                style="font-size: 12px"
              >${o.fabricated.count}</span>
            </div>
            <div class="sp-divider"></div>
            ${c}
          </div>
        </div>
        <div
          class="sp-context"
          data-part="activity"
          style="position: absolute; left: 12px; bottom: 12px; display: flex; align-items: center; gap: 8px;
                 padding: 7px 10px; background: var(--sp-surface); border: 1px solid var(--sp-line);
                 border-radius: var(--sp-radius); box-shadow: var(--sp-shadow); font-size: 11px;
                 opacity: 0; visibility: hidden; transition: opacity 0.24s var(--sp-ease), visibility 0.24s"
        >
          <span class="sp-avatar" data-part="activity-mark" style="width: 20px; height: 20px; font-size: 9px">A</span>
          <span data-part="activity-text">Amira in Leeds just bought this</span>
        </div>
      </div>
              <span class="sp-text" data-stage-verdict data-part="verdict" style="font-size: 11px; width: 292px">${s.fabricated}</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="fabricated" data-axis="Fake social proof" data-term="fabricated">
          <button class="sp-segment" data-part="mode-fabricated" value="fabricated">With</button>
          <button class="sp-segment" data-part="mode-genuine" value="genuine">Without</button>
        </sp-segmented>
      
    </div>
  `;let d=e(t,`review-count`),f=e(t,`rating`),p=e(t,`activity`),m=e(t,`activity-text`),h=e(t,`activity-mark`),g=e(t,`verdict`),_=`fabricated`,v=0,y,b=e=>{p.style.opacity=e?`1`:`0`,p.style.visibility=e?`visible`:`hidden`},x=e=>{if(e){let e=n[v%n.length]??n[0];v+=1,m.textContent=`${e} just bought this`,h.textContent=e.slice(0,1)}b(e),y=u.setTimeout(()=>x(!e),e?i:a)};e(t,`mode`).addEventListener(`change`,e=>{if(_=e.detail===`genuine`?`genuine`:`fabricated`,d.dataset.mode=_,d.textContent=o[_].count,f.textContent=o[_].rating,g.textContent=s[_],u.clearTimeout(y),y=void 0,_===`genuine`){b(!1);return}y=u.setTimeout(()=>x(!0),r)}),y=u.setTimeout(()=>x(!0),r)}export{u as mount};