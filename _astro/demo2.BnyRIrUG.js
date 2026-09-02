import{n as e}from"./parts.C-YLuC7Q.js";var t=1e3,n=3604,r=3600,i=e=>String(e).padStart(2,`0`);function a(e){return`${i(Math.floor(e/3600))}:${i(Math.floor(e/60)%60)}:${i(e%60)}`}function o(i,o){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 320px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Slate table lamp</span>
          <span class="sp-text sp-text--ink">64.00</span>
        </div>
        <div class="sp-divider" style="margin: 12px 0"></div>
        <div class="sp-label sp-context">Delivered tomorrow if you order within</div>
        <div data-part="readout" data-subject role="timer" aria-label="Time left to order for delivery tomorrow"
             style="margin-top: 6px; font-size: 30px; font-weight: 600; line-height: 1.1; font-variant-numeric: tabular-nums">
          ${a(n)}
        </div>
        <div class="sp-text sp-context" data-part="consequence" style="margin-top: 6px">
          After the 6pm cutoff the next van leaves on Thursday.
        </div>
        <button class="sp-button sp-context" data-part="basket" type="button" style="width: 100%; margin-top: 14px">Add to basket</button>
      </div>
    </div>
  `;let s=e(i,`readout`),c=e(i,`consequence`),l=n,u=()=>{l=Math.max(0,l-1),s.textContent=a(l),l<r&&s.dataset.zone!==`warn`&&(s.dataset.zone=`warn`,s.style.color=`var(--sp-warn)`,c.textContent=`Under an hour left, then the next van is Thursday.`),l>0&&o.setTimeout(u,t)};o.setTimeout(u,t)}export{o as mount};