import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=120,n=61,r=62,i=38,a=13,o=e=>e*Math.PI/180,s=e=>e*180/Math.PI,c=e=>({x:n+i*Math.cos(o(e)),y:r+i*Math.sin(o(e))}),l=(e,t)=>{let n=c(e),r=c(t),a=((t-e)%360+360)%360;return`M ${n.x.toFixed(1)} ${n.y.toFixed(1)} A ${i} ${i} 0 ${+(a>180)} 1 ${r.x.toFixed(1)} ${r.y.toFixed(1)}`},u=-s(Math.asin(9/i)),d={c:{open:[52,-52],closed:[25,-25],bar:!1},e:{open:[62,u],closed:[28,u],bar:!0}};function f(e,t){let n=d[e];if(!n)throw Error(`no letterform for "${e}"`);let[r,i]=n[t],a=c(r),o=c(i),u=l(r,i+(i<r?360:0)),f=n.bar?`M ${24 .toFixed(1)} ${53 .toFixed(1)} L ${o.x.toFixed(1)} ${o.y.toFixed(1)}`:``,p=o.x-a.x,m=o.y-a.y,h=Math.hypot(p,m);return{path:`${u} ${f}`,x:(a.x+o.x)/2,y:(a.y+o.y)/2,span:h,tilt:s(Math.atan2(m,p))-90,share:Math.round(h/76*100)}}function p(n){let r=(e,n)=>`
    <div class="sp-stack${e===`closed`?` sp-context`:``}" style="gap: 4px; align-items: center; width: 176px">
      <div class="sp-row" style="gap: 8px; height: 18px">
        <span class="sp-label">${n}</span>
        <span class="sp-label" data-part="read-${e}"
              style="color: var(--sp-ink); font-variant-numeric: tabular-nums; width: 56px"></span>
      </div>
      <div style="position: relative; width: ${t}px; height: ${t}px">
        <svg viewBox="0 0 ${t} ${t}" width="${t}" height="${t}" aria-hidden="true"
             style="display: block; overflow: visible">
          <path data-part="glyph-${e}" fill="none" stroke="currentColor" stroke-width="${a}" stroke-linecap="round" d=""></path>
        </svg>
        <span data-part="gap-${e}"${e===`open`?` data-subject`:``}
              style="position: absolute; width: 15px; border-radius: 9px;
                     background: color-mix(in oklab, var(--sp-accent) 30%, transparent);
                     translate: -50% -50%; rotate: 0deg"></span>
      </div>
    </div>
  `;n.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="c" data-axis="Letter">
            <button class="sp-segment" data-part="seg-c" value="c">c</button>
            <button class="sp-segment" data-part="seg-e" value="e">e</button>
          </sp-segmented>
        </div>
        <div class="sp-row" data-part="pair" data-letter="c" style="gap: 18px; justify-content: center; margin-top: 6px">
          ${r(`closed`,`Closed`)}
          ${r(`open`,`Open`)}
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 8px">
          One ring, one stem width, two ways of ending it. The tint is the aperture: narrow it far enough
          and the c reads as an o long before the reader notices why.
        </p>
      </div>
    </div>
  `;let i=e(n,`pair`),o=t=>{if(d[t]){i.dataset.letter=t;for(let r of[`closed`,`open`]){let i=f(t,r);e(n,`glyph-${r}`).setAttribute(`d`,i.path);let a=e(n,`gap-${r}`);a.style.left=`${i.x.toFixed(1)}px`,a.style.top=`${i.y.toFixed(1)}px`,a.style.height=`${i.span.toFixed(1)}px`,a.style.rotate=`${i.tilt.toFixed(1)}deg`,a.dataset.letter=t,e(n,`read-${r}`).textContent=`gap ${i.share}%`}}};o(`c`),e(n,`segmented`).addEventListener(`change`,e=>o(e.detail))}export{p as mount};