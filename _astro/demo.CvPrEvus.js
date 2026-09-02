import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={stem:.088,xHeight:.52,left:.09,right:.4,arch:.088},n={x:1.42,y:1.35},r=96,i=[11,22],a=e=>Math.max(0,e.x1-e.x0)*Math.max(0,e.y1-e.y0),o=(e,t)=>({x0:Math.max(e.x0,t.x0),x1:Math.min(e.x1,t.x1),y0:Math.max(e.y0,t.y0),y1:Math.min(e.y1,t.y1)});function s(e){let t=0;for(let n=1;n<1<<e.length;n++){let r,i=0;for(let t=0;t<e.length;t++){let a=e[t];!(n&1<<t)||!a||(i+=1,r=r?o(r,a):a)}r&&(t+=(i%2==1?1:-1)*a(r))}return t}function c(e,r){let i=t.stem*e,a=t.xHeight*e,o=t.arch*e,s=n.x+t.left*e,c=n.x+t.right*e,l=n.y,u=n.y+a,d=i,f=o;r&&(d=Math.max(1,Math.round(i)),s=Math.round(s),c=Math.round(c+i)-d,l=Math.round(l),u=Math.round(u),f=Math.max(1,Math.round(o)));let p={x0:s,x1:s+d,y0:l,y1:u};return{rects:[p,{x0:c,x1:c+d,y0:l,y1:u},{x0:s,x1:c+d,y0:l,y1:l+f}],stem:p,cols:Math.ceil(c+d)+1,rows:Math.ceil(u)+1}}function l({rects:e,cols:t,rows:n}){let r=[];for(let i=0;i<n;i++)for(let n=0;n<t;n++){let t={x0:n,x1:n+1,y0:i,y1:i+1};r.push(s(e.map(e=>o(e,t))))}return r}function u(e,t){let n=Math.floor((e.stem.y0+e.stem.y1)/2),r=Math.floor(e.stem.x0),i=Math.ceil(e.stem.x1),a=[];for(let o=r;o<i;o++){let r=t[n*e.cols+o]??0;r>.005&&a.push(r.toFixed(2))}return a.join(` + `)}function d(t){let n=(e,t)=>`
    <div class="sp-stack${e===`unhinted`?` sp-context`:``}" style="gap: 6px; flex: 0 0 190px; align-items: center">
      <span class="sp-label" style="white-space: nowrap">${t}</span>
      <div data-part="raster-${e}"${e===`hinted`?` data-subject`:``} data-ppem="${i[0]}"
           style="position: relative; width: ${r}px; height: ${r}px; background: var(--sp-surface);
                  border: 1px solid var(--sp-line); border-radius: 4px; overflow: hidden"></div>
      <span class="sp-chip" data-part="read-${e}" style="cursor: default; white-space: nowrap">stem</span>
    </div>`;t.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Rendered at" data-value="${i[0]}">
            ${i.map(e=>`<button class="sp-segment" data-part="seg-${e}" value="${e}">${e} px</button>`).join(``)}
          </sp-segmented>
        </div>
        <div class="sp-row" data-part="panels" style="gap: 24px; margin-top: 10px; align-items: flex-start">
          ${n(`unhinted`,`unhinted`)}
          ${n(`hinted`,`hinted`)}
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 10px">
          The pixels are drawn, because this machine's rasteriser ignores hinting. Each cell holds the exact
          ink the outline puts there, so the readouts are measured rather than invented.
        </p>
      </div>
    </div>
  `;let a=[`unhinted`,`hinted`].map(n=>({key:n,box:e(t,`raster-${n}`),readout:e(t,`read-${n}`)})),o=e=>{for(let{key:t,box:n,readout:i}of a){let a=c(e,t===`hinted`),o=l(a),s=Math.min(r/a.cols,r/a.rows),d=o.map((e,t)=>{let n=t%a.cols*s,r=Math.floor(t/a.cols)*s;return`<span style="position: absolute; left: ${n.toFixed(2)}px; top: ${r.toFixed(2)}px;
                  width: ${s.toFixed(2)}px; height: ${s.toFixed(2)}px;
                  box-shadow: inset 0 0 0 0.5px var(--sp-line);
                  background: color-mix(in srgb, var(--sp-ink) ${(e*100).toFixed(1)}%, transparent)"></span>`}).join(``),f=a.stem;n.innerHTML=d+`<span data-part="outline-${t}" style="position: absolute;
        left: ${(f.x0*s).toFixed(2)}px; top: ${(f.y0*s).toFixed(2)}px;
        width: ${((f.x1-f.x0)*s).toFixed(2)}px; height: ${((f.y1-f.y0)*s).toFixed(2)}px;
        border: 2px solid var(--sp-accent); border-radius: 1px"></span>`,n.dataset.ppem=String(e),i.textContent=`stem ink: ${u(a,o)}`}};o(i[0]),e(t,`segmented`).addEventListener(`change`,e=>{let t=Number(e.detail);i.some(e=>e===t)&&o(t)})}export{d as mount};