import{n as e}from"./parts.C-YLuC7Q.js";var t=4,n=`#141a33`,r=`#f4f2e8`,i=`#6d7398`,a=`#5ddc7a`,o=`#5aa9f0`,s=`#e8455f`,c=[`.XX.XX.`,`XXXXXXX`,`XXXXXXX`,`.XXXXX.`,`..XXX..`,`...X...`];function l(e,n){let r=[];return e.forEach((e,i)=>{[...e].forEach((e,a)=>{e===`X`&&r.push(`${a*t}px ${i*t}px 0 0 ${n}`)})}),r.join(`, `)}function u(e,t,n){return Array.from({length:t},(t,r)=>`<span style="width: 8px; height: 8px; background: ${r<e?n:`#2b3358`}"></span>`).join(``)}var d=[1,2,3,2,1].map(e=>`<span style="width: ${e*t}px; height: ${t}px; background: ${r}"></span>`).join(``),f=[[`item`,`ITEM`],[`magic`,`MAGIC`],[`flee`,`FLEE`]];function p(p){let m=f.map(([e,n])=>`
      <div data-part="row-${e}" data-row="${e}" role="button" tabindex="-1"
           style="display: flex; align-items: center; gap: 8px; padding: ${t}px 8px; cursor: pointer">
        <span data-part="caret-${e}" aria-hidden="true"
              style="display: flex; flex-direction: column; align-items: flex-start; width: 12px; opacity: ${+(e===`item`)}">${d}</span>
        <span>${n}</span>
      </div>`).join(``);p.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div data-part="panel" data-subject
           style="position: relative; width: 288px; padding: 16px; margin: ${t}px; background: ${n}; color: ${r}; font-family: ui-monospace, 'Courier New', monospace; font-size: 13px; letter-spacing: 0.12em; line-height: 1.1; box-shadow: 0 -${t}px 0 0 ${r}, 0 ${t}px 0 0 ${r}, -${t}px 0 0 0 ${r}, ${t}px 0 0 0 ${r}">

        <div style="display: flex; align-items: flex-start; gap: 16px">
          <div style="flex: 1 1 auto; min-width: 0">
            <div data-part="name" style="font-size: 12px; color: ${i}">RANGER</div>
            <div style="display: flex; align-items: center; gap: 8px; margin-top: 8px">
              <span style="width: 24px; font-size: 11px; color: ${i}">HP</span>
              <span data-part="hp" style="display: flex; gap: ${t/2}px">${u(7,10,a)}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px; margin-top: 8px">
              <span style="width: 24px; font-size: 11px; color: ${i}">MP</span>
              <span data-part="mp" style="display: flex; gap: ${t/2}px">${u(4,10,o)}</span>
            </div>
          </div>

          <span data-part="sprite" aria-hidden="true"
                style="flex: 0 0 auto; width: ${t}px; height: ${t}px; margin: ${t}px 24px 20px ${t}px; background: transparent; box-shadow: ${l(c,s)}"></span>
        </div>

        <div data-part="menu" style="margin-top: 12px; padding-top: 8px; border-top: ${t}px solid #2b3358">${m}</div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 288px; margin: 0; text-align: center">
        One four pixel unit for every edge, meters made of cells, and a sprite kept at the size it was drawn.
      </p>
    </div>
  `;let h=new Map(f.map(([t])=>[t,e(p,`caret-${t}`)])),g=t=>{for(let[e,n]of h)n.style.opacity=e===t?`1`:`0`;for(let[n]of f){let r=e(p,`row-${n}`),i=n===t;r.toggleAttribute(`data-selected`,i),r.style.background=i?`#2b3358`:`transparent`}};for(let[t]of f)e(p,`row-${t}`).addEventListener(`click`,()=>g(t));g(`item`)}export{p as mount};