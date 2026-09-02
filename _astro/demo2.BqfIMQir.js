import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=8,r={width:200,height:160},i=`repeating-linear-gradient(to right, var(--sp-accent) 0 1px, transparent 1px ${n}px), repeating-linear-gradient(to bottom, var(--sp-accent) 0 1px, transparent 1px ${n}px)`,a={on:`Padding 16, avatar 32, gaps 8: every edge on the left lands on a rule.`,off:`With the rules hidden, both panels look equally deliberate.`},o={snapped:{pad:16,gap:8,block:16,foot:16,avatar:32,button:32},drift:{pad:13,gap:6,block:19,foot:13,avatar:30,button:29}};function s(s){let c=(e,t)=>{let n=o[e];return`
      <div
        data-part="${e}"
        ${t}
        style="position: relative; width: ${r.width}px; height: ${r.height}px; padding: ${n.pad}px; background: var(--sp-surface); box-shadow: inset 0 0 0 1px var(--sp-line); border-radius: var(--sp-radius); overflow: hidden"
      >
        <div class="sp-row" style="gap: ${n.gap}px; align-items: flex-start">
          <span class="sp-avatar" style="width: ${n.avatar}px; height: ${n.avatar}px">KE</span>
          <span class="sp-stack sp-grow" style="gap: ${n.gap}px">
            <div class="sp-line" style="width: 88%"></div>
            <div class="sp-line" style="width: 62%"></div>
          </span>
        </div>
        <div class="sp-stack" style="gap: ${n.gap}px; margin-top: ${n.block}px">
          <div class="sp-line" style="width: 96%"></div>
          <div class="sp-line" style="width: 78%"></div>
        </div>
        <div class="sp-row" style="margin-top: ${n.foot}px">
          <span class="sp-button sp-button--sm" style="height: ${n.button}px; display: inline-flex; align-items: center; cursor: default">Open</span>
        </div>
        <div
          data-part="rules-${e}"
          style="position: absolute; inset: 0; pointer-events: none; opacity: 0.42; background-image: ${i}"
        ></div>
      </div>`};s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">${n}px rules</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-axis="Grid" data-value="on">
            <button class="sp-segment" type="button" data-part="seg-on" value="on">drawn</button>
            <button class="sp-segment" type="button" data-part="seg-off" value="off">hidden</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 12px 16px">
          <div class="sp-row" style="align-items: flex-start; gap: 24px">
            <div class="sp-stack" style="gap: 6px; align-items: flex-start">
              ${c(`snapped`,`data-subject`)}
            </div>
            <div class="sp-stack sp-context" style="gap: 6px; align-items: flex-start">
              ${c(`drift`,``)}
            </div>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="height: 22px; max-width: 448px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;let l=[e(s,`rules-snapped`),e(s,`rules-drift`)],u=e(s,`readout`),d=e=>{let n=a[e];if(n){for(let n of l)t(n,`hidden`,e!==`on`);u.textContent=n}};e(s,`switcher`).addEventListener(`change`,e=>d(e.detail)),d(`on`)}export{s as mount};