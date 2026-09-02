import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={default:{verb:`Submit`,helper:`Enter value`,failure:`Invalid input`,caption:`What a control says when nobody wrote it. Every one of these is correct, generic, and read on every single visit to the screen.`},authored:{verb:`Send invite`,helper:`They get a link that works for 7 days.`,failure:`That address is missing the part after the @.`,caption:`The verb names what happens, the line states the rule before it is broken, and the failure says what to do next. Same screen, same components.`}};function n(n){let r=e=>`<div class="sp-surface" style="padding: 8px 9px">${e}</div>`;n.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 456px; padding: 11px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="default" data-axis="Strings">
            <button class="sp-segment" data-part="seg-default" value="default"
                    style="padding: 5px 10px; font-size: 12px; white-space: nowrap">The defaults</button>
            <button class="sp-segment" data-part="seg-authored" value="authored"
                    style="padding: 5px 10px; font-size: 12px; white-space: nowrap">Written</button>
          </sp-segmented>
        </div>

        <div class="sp-stack" style="margin-top: 9px; gap: 8px">
          ${r(`<div class="sp-row" style="justify-content: flex-end; gap: 8px">
               <button class="sp-button sp-button--quiet sp-button--sm sp-context" type="button">Cancel</button>
               <button class="sp-button sp-button--sm" data-part="action" type="button">
                 <span data-part="verb" data-subject data-set="default">${t.default.verb}</span>
               </button>
             </div>`)}
          ${r(`<div class="sp-field sp-context" style="gap: 3px">
               <label class="sp-label" for="mc-team" style="font-size: 11px">Team name</label>
               <input class="sp-input" id="mc-team" type="text" value="Northwind" readonly
                      style="font-size: 12px; padding: 4px 8px" />
             </div>
             <div data-part="slot-helper" style="padding-top: 4px">
               <span class="sp-text" data-part="helper" data-set="default"
                     style="display: block; font-size: 11.5px">${t.default.helper}</span>
             </div>`)}
          ${r(`<div data-part="slot-failure">
               <span class="sp-text sp-text--ink" data-part="failure" data-set="default" role="status"
                     style="display: block; font-size: 11.5px">${t.default.failure}</span>
             </div>`)}
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-set="default"
           style="margin: 9px 0 0; height: 34px; font-size: 11px">${t.default.caption}</p>
      </div>
    </div>
  `;let i=e(n,`action`),a=e(n,`verb`),o=e(n,`helper`),s=e(n,`failure`),c=e(n,`caption`),l=e(n,`slot-helper`),u=e(n,`slot-failure`),d=(e,n,r)=>{let i=0;for(let a of Object.values(t))e.textContent=r(a),i=Math.max(i,n.offsetHeight);n.style.height=`${i}px`},f=0;for(let e of Object.values(t))a.textContent=e.verb,f=Math.max(f,i.offsetWidth);i.style.minWidth=`${f}px`,d(o,l,e=>e.helper),d(s,u,e=>e.failure);let p=e=>{let n=t[e];for(let[t,r]of[[a,n.verb],[o,n.helper],[s,n.failure],[c,n.caption]])t.dataset.set=e,t.textContent=r};p(`default`),e(n,`segmented`).addEventListener(`change`,e=>{p(e.detail)})}export{n as mount};