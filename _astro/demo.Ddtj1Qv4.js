import{n as e,r as t,t as n}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{n as r}from"./measure.DK7AY2_i.js";var i=444,a=186,o={repeated:[[`How to configure `,`billing alerts`],[`How to configure `,`single sign-on`],[`How to configure `,`webhook retries`],[`How to configure `,`audit log export`],[`How to configure `,`IP allow lists`]],front:[[`Billing alerts`,`: how to configure`],[`Single sign-on`,`: how to configure`],[`Webhook retries`,`: how to configure`],[`Audit log export`,`: how to configure`],[`IP allow lists`,`: how to configure`]]},s={repeated:`Same opening on every line: the first fixation lands mid line, on the word that differs.`,front:`Front-loaded: the fixations return to a flush column at the left edge.`};function c(c){let l=(e,t)=>`
    <div data-part="row" style="position: relative; display: flex; align-items: center; height: 24px; font-size: 13px; white-space: nowrap">
      <span data-part="lead">${e}</span><span data-part="tail">${t}</span>
    </div>`;c.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">List copy</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Wording" data-term="repeated" data-part="switcher" data-value="repeated">
            <button class="sp-segment" type="button" data-part="seg-same" value="repeated">same opening</button>
            <button class="sp-segment" type="button" data-part="seg-front" value="front">front-loaded</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div data-part="page" style="position: relative; flex: 0 0 auto; width: ${i}px; height: ${a}px; overflow: hidden; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)">
            <div class="sp-context" style="padding: 14px 16px">
              <div class="sp-row sp-row--between" style="margin-bottom: 8px">
                <span class="sp-label">Configuration guides</span>
                <span class="sp-label">5 articles</span>
              </div>
              <div data-part="list">
                ${o.repeated.map(([e,t])=>l(e,t)).join(``)}
              </div>
            </div>
            <div
              data-part="skipped"
              style="position: absolute; pointer-events: none; border: 1px dashed var(--sp-warn); border-radius: 6px"
            >
              <span class="sp-label" style="position: absolute; left: 0; right: 0; bottom: -18px; text-align: center">skipped</span>
            </div>
            <div data-part="trace" data-subject data-pose="[data-mode=repeated]" data-mode="repeated" style="position: absolute; pointer-events: none"></div>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" data-mode="repeated" style="height: 40px; max-width: 434px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;let u=e(c,`page`),d=e(c,`list`),f=e(c,`trace`),p=e(c,`skipped`),m=e(c,`readout`),h=e=>{let i=t(d,`lead`),a=t(d,`tail`),o=(e===`repeated`?a:i).map((e,t)=>{let n=r(e,u),i=r(a[t]??e,u);return{left:n.left,width:n.width,mid:i.top+i.height/2}}),s=Math.min(...o.map(e=>e.left)),c=Math.max(...o.map(e=>e.left+e.width)),l=Math.min(...o.map(e=>e.mid)),m=Math.max(...o.map(e=>e.mid));f.style.left=`${s-7}px`,f.style.top=`${l-9}px`,f.style.width=`${c-s+14}px`,f.style.height=`${m-l+18}px`,f.innerHTML=o.map(({left:e,width:t,mid:n})=>{let r=e-(s-7),i=n-(l-9);return`
          <span style="position: absolute; left: ${r}px; top: ${i-4.5}px; width: ${t}px; height: 9px; border-radius: 5px; background: var(--sp-accent); opacity: 0.34"></span>
          <span style="position: absolute; left: ${r-5}px; top: ${i-5}px; width: 10px; height: 10px; border-radius: 50%; background: var(--sp-accent)"></span>`}).join(``);let h=i[0]?r(i[0],u).left:0;n(p,`hidden`,e!==`repeated`),p.style.left=`${h-6}px`,p.style.top=`${l-13}px`,p.style.width=`${s-h+2}px`,p.style.height=`${m-l+26}px`},g=e=>{d.innerHTML=o[e].map(([e,t])=>l(e,t)).join(``),f.dataset.mode=e,m.dataset.mode=e,m.textContent=s[e],h(e)};e(c,`switcher`).addEventListener(`change`,e=>g(e.detail)),g(`repeated`)}export{c as mount};