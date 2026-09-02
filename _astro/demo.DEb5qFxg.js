import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=[{key:`car`,label:`Car`},{key:`van`,label:`Van`},{key:`bike`,label:`Motorcycle`}],r=[{key:`yes`,label:`Yes`},{key:`no`,label:`No`}],i={split:`One question a screen. There is nothing to choose between, and an error here can only be about the thing being asked.`,all:`The same three questions on one screen. The reader picks an order, and a complaint now has to say which field it means.`},a={1:`2`,2:`3`,3:`review`,review:`review`},o=`Not answered`,s=`font-size: 11px; padding: 2px 9px`;function c(c){let l=`split`,u=`1`,d=``,f=``,p=``,m=(e,t,n,r,i)=>`
    <button class="sp-chip" type="button" role="radio" aria-checked="${String(i)}" ${i?`data-selected`:``}
            data-part="${e}" data-pick="${t}" data-key="${n}" style="${s}">${r}</button>`,h=e=>`
    <div class="sp-stack sp-context" style="flex: 0 0 auto; gap: 4px">
      <span class="sp-label" data-part="progress" data-step="${e}">Question ${e} of 3</span>
      <div class="sp-progress" style="--sp-value: ${Math.round(e/3*100)}%"><div class="sp-progress-fill"></div></div>
    </div>`,g=(e,t,n,r)=>`
    ${h(e)}
    <div class="sp-stack" style="flex: 1 1 auto; min-height: 0; gap: 8px">
      <span class="sp-heading" style="font-size: 15px">${t}</span>
      ${n}
      <span class="sp-text sp-context" style="font-size: 11px">${r}</span>
    </div>
    <button class="sp-button sp-button--sm" type="button" data-part="continue" style="flex: 0 0 auto; align-self: flex-start">Continue</button>`,_={1:()=>g(1,`What is the registration number?`,`<input class="sp-input" type="text" data-part="field" data-field="reg" value="${d}" spellcheck="false"
                autocomplete="off" aria-label="Registration number" style="font-size: 12px; padding: 5px 8px" />`,`It is on the front of the vehicle, and on the log book.`),2:()=>g(2,`What type of vehicle is it?`,`<div class="sp-row sp-row--wrap" style="gap: 6px">${n.map(e=>m(`q2-${e.key}`,`type`,e.key,e.label,e.key===f)).join(``)}</div>`,`Pick the one it is registered as, not the one it is used as.`),3:()=>g(3,`Is it insured for business use?`,`<div class="sp-row sp-row--wrap" style="gap: 6px">${r.map(e=>m(`q3-${e.key}`,`business`,e.key,e.label,e.key===p)).join(``)}</div>`,`Answer for the cover you hold today, not the cover you are about to buy.`),review:()=>`
      <span class="sp-heading" style="flex: 0 0 auto; font-size: 14px">Check your answers</span>
      <ul class="sp-list" style="flex: 1 1 auto; min-height: 0">
        ${[{name:`reg`,label:`Registration`,value:d||o},{name:`type`,label:`Type`,value:n.find(e=>e.key===f)?.label??o},{name:`business`,label:`Business use`,value:r.find(e=>e.key===p)?.label??o}].map(({name:e,label:t,value:n})=>`
              <li class="sp-row" data-part="answer-${e}" data-value="${n}" style="gap: 8px; padding: 5px 0; border-top: 1px solid var(--sp-line)">
                <span class="sp-label" style="flex: 0 0 96px">${t}</span>
                <span class="sp-text sp-text--ink sp-grow" style="min-width: 0; font-size: 12px">${n}</span>
              </li>`).join(``)}
      </ul>
      <span class="sp-text sp-context" style="flex: 0 0 auto; font-size: 11px">
        Three screens answered, one screen to read them back on.
      </span>`},v=(e,t)=>`
    <div class="sp-stack" style="flex: 0 0 auto; gap: 3px">
      <span class="sp-label" style="font-size: 11px">${e}</span>
      ${t}
    </div>`,y=()=>`
    <div style="display: flex; flex-direction: column; gap: 4px; height: 100%">
      ${v(`Registration number`,`<input class="sp-input" type="text" data-part="all-reg" data-field="reg" value="${d}" spellcheck="false"
                autocomplete="off" aria-label="Registration number" style="font-size: 12px; padding: 3px 8px" />`)}
      ${v(`Vehicle type`,`<div class="sp-row sp-row--wrap" data-part="all-type" style="gap: 6px">${n.map(e=>m(`all-type-${e.key}`,`type`,e.key,e.label,e.key===f)).join(``)}</div>`)}
      ${v(`Insured for business use`,`<div class="sp-row sp-row--wrap" data-part="all-business" style="gap: 6px">${r.map(e=>m(`all-business-${e.key}`,`business`,e.key,e.label,e.key===p)).join(``)}</div>`)}
      <button class="sp-button sp-button--sm" type="button" data-part="continue"
              style="flex: 0 0 auto; align-self: flex-start; margin-top: auto; font-size: 12px; padding: 4px 10px">Continue</button>
    </div>`;c.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 16px">
        <div class="sp-row sp-row--between sp-context" style="height: 30px">
          <span class="sp-label">Register a vehicle</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="split" data-axis="Built" data-term="split">
            <button class="sp-segment" data-part="seg-split" value="split" style="font-size: 12px; padding: 5px 10px">One per page</button>
            <button class="sp-segment" data-part="seg-all" value="all" style="font-size: 12px; padding: 5px 10px">All at once</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="form" data-subject data-pose="[data-mode=split]:not([data-q=review])" data-mode="split" data-q="1"
             style="display: flex; flex-direction: column; gap: 8px; height: 188px; margin-top: 8px; padding: 10px 14px; overflow: hidden"></div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-case="split" style="margin: 8px 0 0; height: 32px; font-size: 11px"></p>
      </div>
    </div>
  `;let b=e(c,`form`),x=e(c,`caption`),S=()=>{b.dataset.mode=l,b.dataset.q=l===`all`?`all`:u,b.innerHTML=l===`all`?y():_[u](),x.dataset.case=l,x.textContent=i[l]};b.addEventListener(`input`,e=>{let t=e.target;t.dataset.field===`reg`&&(d=t.value)}),b.addEventListener(`click`,e=>{let n=e.target,r=n.closest(`[data-pick]`);if(r){let e=r.dataset.key??``;r.dataset.pick===`type`?f=e:p=e;for(let e of b.querySelectorAll(`[data-pick="${r.dataset.pick}"]`)){let n=e===r;e.setAttribute(`aria-checked`,String(n)),t(e,`data-selected`,n)}return}!n.closest(`[data-part=continue]`)||l===`all`||(u=a[u],S())}),e(c,`segmented`).addEventListener(`change`,e=>{l=e.detail===`all`?`all`:`split`,l===`split`&&(u=`1`),S()}),S()}export{c as mount};