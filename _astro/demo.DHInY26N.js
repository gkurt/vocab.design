import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=14,n=16,r=8,i={w:91,h:104},a=1.15,o=[{x0:3.2,y0:13.6,x1:7,y1:2.6},{x0:10.8,y0:13.6,x1:7,y1:2.6},{x0:4.6,y0:9.9,x1:9.4,y1:9.9}],s=[{key:`fit`,scale:1,cx:t/2,cy:n/2,read:`1x: 224 texels, 6.5 px each`},{key:`close`,scale:3,cx:4,cy:11.4,read:`3x: 224 texels, 19.5 px each`}],c=(e,t=0,n=1)=>Math.min(n,Math.max(t,e));function l(e,t,n){let r=n.x1-n.x0,i=n.y1-n.y0,a=c(((e-n.x0)*r+(t-n.y0)*i)/(r*r+i*i)),o=n.x0+a*r,s=n.y0+a*i;return Math.hypot(e-o,t-s)}function u(e,t){let n=1/0;for(let r of o)n=Math.min(n,l(e,t,r));return n-a}var d=(()=>{let e=[];for(let i=0;i<n;i++)for(let n=0;n<t;n++)e.push(c(.5-u(n+.5,i+.5)/r));return e})();function f(e,n){let r=c(e-.5,0,13),i=c(n-.5,0,15),a=Math.floor(r),o=Math.floor(i),s=Math.min(13,a+1),l=Math.min(15,o+1),u=r-a,f=i-o,p=d[o*t+a]??0,m=d[o*t+s]??0,h=d[l*t+a]??0,g=d[l*t+s]??0;return(p*(1-u)+m*u)*(1-f)+(h*(1-u)+g*u)*f}function p(e){let[t,n,r]=(getComputedStyle(e).color.match(/[\d.]+/g)??[`35`,`38`,`43`]).map(Number);return[t??35,n??38,r??43]}function m(a){let o=(e,t,n)=>`
    <div class="sp-stack${n?``:` sp-context`}" style="gap: 6px; flex: 0 0 124px; align-items: center">
      <span class="sp-label" style="white-space: nowrap">${t}</span>
      <div data-part="tile-${e}"${n?` data-subject`:``} data-zoom="${s[0]?.key}"
           style="position: relative; width: ${i.w}px; height: ${i.h}px; overflow: hidden;
                  background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 4px">
        <canvas data-part="canvas-${e}" style="position: absolute; image-rendering: pixelated"></canvas>
      </div>
    </div>`;a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Magnification" data-value="${s[0]?.key}">
            ${s.map(e=>`<button class="sp-segment" data-part="seg-${e.key}" value="${e.key}">${e.scale}x</button>`).join(``)}
          </sp-segmented>
        </div>
        <div class="sp-row" data-part="tiles" style="gap: 12px; margin-top: 10px; justify-content: center">
          ${o(`bitmap`,`bitmap of coverage`,!1)}
          ${o(`field`,`the distance field`,!0)}
          ${o(`output`,`thresholded per pixel`,!1)}
        </div>
        <div class="sp-row sp-context" style="height: 30px; margin-top: 8px; justify-content: center">
          <span class="sp-chip" data-part="readout" style="cursor: default; white-space: nowrap">${s[0]?.read??``}</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 4px">
          Brightness in the middle tile is distance to the edge, so interpolating it returns a distance rather
          than a blur. Magnify, and the texture is still those texels while the threshold is recomputed per pixel.
        </p>
      </div>
    </div>
  `;let l=[`bitmap`,`field`,`output`].map(t=>({key:t,box:e(a,`tile-${t}`),canvas:e(a,`canvas-${t}`)})),u=e(a,`readout`),m=p(a),h=(e,r)=>{e.width=t,e.height=n;let i=e.getContext(`2d`);if(!i)return;let a=i.createImageData(t,n);for(let e=0;e<d.length;e++){let t=d[e]??0,n=e*4;if(r===`field`){let e=Math.round(255*t);a.data[n]=e,a.data[n+1]=e,a.data[n+2]=e,a.data[n+3]=255}else a.data[n]=m[0],a.data[n+1]=m[1],a.data[n+2]=m[2],a.data[n+3]=t>=.5?255:0}i.putImageData(a,0,0)},g=(e,n)=>{let a=i.w*2,o=i.h*2;e.width=a,e.height=o;let s=e.getContext(`2d`);if(!s)return;let l=s.createImageData(a,o),u=i.w/t*n.scale*2,d=1.4/(r*u);for(let e=0;e<o;e++)for(let t=0;t<a;t++){let r=c(.5+(f(n.cx+(t-a/2)/u,n.cy+(e-o/2)/u)-.5)/d),i=(e*a+t)*4;l.data[i]=m[0],l.data[i+1]=m[1],l.data[i+2]=m[2],l.data[i+3]=Math.round(255*r)}s.putImageData(l,0,0)},_=(e,r,a)=>{if(!a){e.style.width=`${i.w}px`,e.style.height=`${i.h}px`,e.style.left=`0px`,e.style.top=`0px`;return}let o=i.w*r.scale,s=i.h*r.scale;e.style.width=`${o}px`,e.style.height=`${s}px`,e.style.left=`${i.w/2-r.cx/t*o}px`,e.style.top=`${i.h/2-r.cy/n*s}px`},v=e=>{for(let{key:t,box:n,canvas:r}of l)t===`output`?g(r,e):h(r,t===`field`?`field`:`bitmap`),_(r,e,t!==`output`),n.dataset.zoom=e.key;u.textContent=e.read};v(s[0]),e(a,`segmented`).addEventListener(`change`,e=>{let t=s.find(t=>t.key===e.detail);t&&v(t)})}export{m as mount};