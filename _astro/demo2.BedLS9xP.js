import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=144,r=150,i=[{no:`01`,title:`Cormorant Bay`,lines:[`94%`,`86%`,`78%`]},{no:`02`,title:`Salt Pier`,lines:[`88%`,`92%`,`70%`]},{no:`03`,title:`Longstone Light`,lines:[`91%`,`74%`,`84%`]},{no:`04`,title:`Bell Rock`,lines:[`82%`,`90%`,`66%`]}],a={hijacked:`The wheel is answered with a fixed distance the page chose, whatever was asked for.`,native:`The counter-example: the browser keeps the gesture and moves exactly as far as it was pushed.`};function o(o,s){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 230px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Field Guide</span>
          <span class="sp-label" style="font-size: 11px">Chapter two</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">

          <div
            class="sp-scroll"
            data-part="region"
            data-subject
            data-mode="hijacked"
            data-pose="[data-mode=hijacked]"
            data-panel="0"
            style="flex: 0 0 auto; height: ${n}px; overflow-x: hidden; background: var(--sp-surface); border-radius: var(--sp-radius)"
          >${i.map(({no:e,title:t,lines:r},a)=>`
      <section
        data-part="panel-${a}"
        style="height: ${n}px; display: flex; flex-direction: column; gap: 8px; padding: 14px 16px;
               border-bottom: ${a===i.length-1?`0`:`1px solid var(--sp-line)`}"
      >
        <span class="sp-label" style="font-size: 11px">${e} / 04</span>
        <span class="sp-heading" style="font-size: 14px">${t}</span>
        <div class="sp-stack" style="gap: 7px">
          ${r.map(e=>`<span class="sp-line" style="width: ${e}"></span>`).join(``)}
        </div>
      </section>`).join(``)}</div>

          <div class="sp-row sp-context" data-part="dots" style="flex: 0 0 auto; height: 12px; gap: 6px; justify-content: center">${i.map((e,t)=>`<span data-part="dot-${t}" style="width: 7px; height: 7px; border-radius: 50%"></span>`).join(``)}</div>

        </div>
      </div>
              <span class="sp-text" data-stage-verdict data-part="note" style="width: 282px; font-size: 11px">${a.hijacked}</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="hijacked" data-axis="Scrolling" data-term="hijacked">
          <button class="sp-segment" data-part="mode-hijacked" value="hijacked" style="padding: 5px 10px">Hijacked</button>
          <button class="sp-segment" data-part="mode-native" value="native" style="padding: 5px 10px">Native</button>
        </sp-segmented>
      
    </div>
  `;let c=e(o,`region`),l=e(o,`note`),u=i.map((t,n)=>e(o,`dot-${n}`)),d=0,f,p=!1,m=e=>{c.dataset.panel=String(e);for(let[n,r]of u.entries())t(r,`data-current`,n===e),r.style.background=n===e?`var(--sp-ink)`:`var(--sp-line)`},h=e=>{Math.abs(c.scrollTop-e)<.5||(p=!0,c.scrollTop=e)},g=()=>Math.max(0,Math.min(i.length-1,Math.round(c.scrollTop/n))),_=()=>{f=void 0;let e=Math.round(c.scrollTop-d);if(e!==0){if(c.dataset.mode===`hijacked`){let t=Number(c.dataset.panel??`0`),r=Math.max(0,Math.min(i.length-1,t+(e>0?1:-1)));h(r*n),d=r*n,m(r),c.dataset.obeyed=`false`;return}d=c.scrollTop,m(g()),c.dataset.obeyed=`true`}};c.addEventListener(`scroll`,()=>{if(p){p=!1;return}s.clearTimeout(f),f=s.setTimeout(_,r)}),e(o,`mode`).addEventListener(`change`,e=>{let t=e.detail===`native`?`native`:`hijacked`;s.clearTimeout(f),f=void 0,c.dataset.mode=t,delete c.dataset.obeyed;let r=g();h(r*n),d=r*n,m(r),l.textContent=a[t]}),m(0)}export{o as mount};