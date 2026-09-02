import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{t}from"./motion.B5_YXmsy.js";var n=`M13 3H27A10 10 0 0 1 37 13V27A10 10 0 0 1 27 37H13A10 10 0 0 1 3 27V13A10 10 0 0 1 13 3Z`,r=`M6.5 20A13.5 13.5 0 1 1 33.5 20A13.5 13.5 0 1 1 6.5 20`,i=`M13.2 20.4L18.2 25.6L27.4 14.6`,a=`#3f6cd1`,o=40,s=30,c=128,l={x1:s,x2:60,x3:90},u=1150,d=[{offset:0,transform:`rotate(0deg) scale(1)`,easing:`cubic-bezier(0.3, 0, 0.4, 1)`},{offset:.22,transform:`rotate(-13deg) scale(1.04)`,easing:`cubic-bezier(0.3, 0, 0.4, 1)`},{offset:.5,transform:`rotate(10deg) scale(1.02)`,easing:`cubic-bezier(0.3, 0, 0.4, 1)`},{offset:.76,transform:`rotate(-5deg) scale(1)`,easing:`cubic-bezier(0.3, 0, 0.4, 1)`},{offset:1,transform:`rotate(0deg) scale(1)`}],f=(e,t,n,r)=>`
  <div class="sp-stack${r?` sp-context`:``}" style="gap: 6px; align-items: center">
    <div
      class="sp-surface"
      style="width: ${c}px; height: ${c}px; display: flex; align-items: center; justify-content: center; overflow: hidden"
    >${n}</div>
    <span class="sp-label" style="font-size: 12px; color: var(--sp-ink)">${e}</span>
    <span class="sp-label" style="font-size: 11px">${t}</span>
  </div>`;function p(c,p){let m=l.x2;c.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 278px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Badge</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="scale" data-value="x2" data-axis="Scale">
            <button class="sp-segment" type="button" data-part="seg-x1" value="x1">1x</button>
            <button class="sp-segment" type="button" data-part="seg-x2" value="x2">2x</button>
            <button class="sp-segment" type="button" data-part="seg-x3" value="x3">3x</button>
          </sp-segmented>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>

        <div class="sp-body sp-stack" style="align-items: center; justify-content: center; gap: 10px">
          <div class="sp-row" data-part="scene" data-scale="x2" style="gap: 18px; align-items: flex-start">
            ${f(`Raster export`,`badge.png, ${s} px`,`<canvas
                 data-part="raster" width="${s}" height="${s}"
                 style="width: ${m}px; height: ${m}px; transform-origin: 50% 70%;
                        transition: width 220ms var(--sp-ease), height 220ms var(--sp-ease)"
               ></canvas>`,!0)}
            ${f(`Vector animation`,`badge.json, vector`,`<svg
                 data-part="vector" data-subject data-state="settled" data-plays="0"
                 viewBox="0 0 ${o} ${o}" aria-hidden="true"
                 style="width: ${m}px; height: ${m}px; display: block; transform-origin: 50% 70%;
                        transition: width 220ms var(--sp-ease), height 220ms var(--sp-ease)"
               >
                 <path d="${n}" fill="${a}"></path>
                 <path d="${r}" fill="none" stroke="#ffffff" stroke-width="1.2" opacity="0.75"></path>
                 <path d="${i}" fill="none" stroke="#ffffff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"></path>
               </svg>`,!1)}
          </div>
          <span class="sp-label sp-context" data-part="say" style="font-size: 12px">Preview: ${m} px</span>
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 460px; margin: 0; text-align: center">
        One export is pixels and gets soft. One is shapes and does not.
      </p>
    </div>
  `;let h=e(c,`scene`),g=e(c,`raster`),_=e(c,`vector`),v=e(c,`say`),y=t(c),b=0,x,S=[],C=g.getContext(`2d`);C&&(C.scale(s/o,s/o),C.fillStyle=a,C.fill(new Path2D(n)),C.strokeStyle=`rgb(255 255 255 / 0.75)`,C.lineWidth=1.2,C.stroke(new Path2D(r)),C.strokeStyle=`#ffffff`,C.lineWidth=3.4,C.lineCap=`round`,C.lineJoin=`round`,C.stroke(new Path2D(i)));let w=e=>{let t=l[e];for(let e of[g,_])e.style.width=`${t}px`,e.style.height=`${t}px`;h.dataset.scale=e,v.textContent=`Preview: ${t} px`};e(c,`replay`).addEventListener(`click`,()=>{if(p.clearTimeout(x),b+=1,_.dataset.plays=String(b),y){_.dataset.state=`settled`;return}_.dataset.state=`playing`;for(let e of S)e.cancel();S=[g,_].map(e=>e.animate(d,{duration:u,easing:`linear`})),x=p.setTimeout(()=>{_.dataset.state=`settled`},1230)}),e(c,`scale`).addEventListener(`change`,e=>{w(e.detail)})}export{p as mount};