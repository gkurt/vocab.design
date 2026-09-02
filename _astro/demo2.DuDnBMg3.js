import{n as e,t}from"./parts.C-YLuC7Q.js";var n={key:`cramped`,pad:8,within:4,between:4},r={key:`roomy`,pad:16,within:4,between:22},i=210,a=198;function o({key:e,pad:t,within:n,between:r},o){return`
    <div
      class="sp-surface sp-stack"
      data-part="${e}"
      ${o?`data-subject`:``}
      style="width: ${i}px; height: ${a}px; padding: ${t}px; gap: ${r}px"
    >
      <div class="sp-stack" data-part="${e}-group-1" style="gap: ${n}px">
        <span class="sp-heading">Kestrel</span>
        <span class="sp-text">Berth A1, 18 metres</span>
      </div>
      <div class="sp-stack" data-part="${e}-group-2" style="gap: ${n}px">
        <span class="sp-label">Nightly</span>
        <span class="sp-text sp-text--ink">42.00, water and power</span>
      </div>
      <div class="sp-stack" data-part="${e}-group-3" style="gap: ${n}px">
        <span class="sp-label">Available</span>
        <span class="sp-text sp-text--ink">Tonight until Sunday</span>
      </div>
    </div>`}function s(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 470px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Moorings</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; gap: 18px">
          <div class="sp-stack sp-context" style="gap: 8px">
            ${o(n,!1)}
          </div>
          <div class="sp-stack" style="gap: 8px">
            ${o(r,!0)}
          </div>
        </div>
      </div>
    </div>
  `;for(let n of[`cramped`,`roomy`]){let r=e(i,`${n}-group-1`),a=r.children[0]?.getBoundingClientRect(),o=r.children[1]?.getBoundingClientRect(),s=e(i,`${n}-group-2`).getBoundingClientRect();if(!a||!o)continue;let c=o.top-a.bottom,l=s.top-r.getBoundingClientRect().bottom,u=e(i,n);u.dataset.ratio=c>0?String(Math.round(l/c*10)/10):`0`,t(u,`data-grouped`,c>0&&l>=c*2)}}export{s as mount};