import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{t}from"./motion.B5_YXmsy.js";var n={w:434,h:176},r=33,i=26,a=76;function o(e){let t=e>>>0;return()=>(t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296)}function s(e){return Array.from({length:i},()=>{let t=e()*Math.PI*2,r=.14+e()*.3;return{x:e()*n.w,y:e()*n.h,vx:Math.cos(t)*r,vy:Math.sin(t)*r,r:1.1+e()*1.5}})}var c=Math.min(n.w,n.h)/2;function l(e,t){let r=e()*Math.PI*2,i=t+e()*(c-t),a=i/c,o=.3+a*1.1;return{x:n.w/2+Math.cos(r)*i,y:n.h/2+Math.sin(r)*i,vx:Math.cos(r)*o,vy:Math.sin(r)*o,r:.7+a*1.6}}function u(c,u){c.innerHTML=`
    <div class="sp-app" style="gap: 9px">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Backdrop</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="register" data-axis="Style" data-value="constellation">
            <button class="sp-segment" type="button" data-part="seg-dots" value="dots">Dots</button>
            <button class="sp-segment" type="button" data-part="seg-constellation" value="constellation">Constellation</button>
            <button class="sp-segment" type="button" data-part="seg-starfield" value="starfield">Starfield</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div
            data-part="hero"
            style="position: relative; width: ${n.w}px; height: ${n.h}px; overflow: hidden;
                   border-radius: 6px; background: linear-gradient(142deg, #101a3a, #1d1244 58%, #0e2038);
                   display: flex; align-items: center; justify-content: center"
          >
            <canvas
              data-part="field"
              data-subject
              data-register="constellation"
              aria-hidden="true"
              style="position: absolute; inset: 0; width: ${n.w}px; height: ${n.h}px; pointer-events: none"
            ></canvas>
            <div
              class="sp-context"
              data-part="plate"
              style="position: relative; width: 232px; padding: 13px 16px 15px; text-align: center;
                     border-radius: var(--sp-radius); background: rgb(8 11 27 / 0.66)"
            >
              <span class="sp-heading" data-part="headline" style="font-size: 16px; color: #ffffff">Fieldwork</span>
              <p class="sp-text" style="margin: 5px 0 0; color: rgb(232 236 250 / 0.76)">
                Notes from the coast survey, gathered by the field team.
              </p>
              <button
                class="sp-button sp-button--sm"
                type="button"
                data-part="cta"
                style="margin-top: 11px; background: #ffffff; color: #14183a"
              >Read the report</button>
            </div>
          </div>
        </div>
      </div>

              <span data-stage-verdict data-part="note">Twenty-six agents, linked when they pass close.</span>
      
    </div>
  `;let d=e(c,`field`),f=e(c,`note`),p=c.ownerDocument.defaultView??window,m=Math.min(p.devicePixelRatio||1,2);d.width=Math.round(n.w*m),d.height=Math.round(n.h*m);let h=d.getContext(`2d`),g=t(c),_=o(20260819),v=`constellation`,y=s(_),b,x={dots:`Twenty-six agents wandering, wrapping at the edges.`,constellation:`Twenty-six agents, linked when they pass close.`,starfield:`The same agents, streaming out from one vanishing point.`},S=()=>{if(v===`starfield`){for(let e=0;e<y.length;e++){let t=y[e];t.x+=t.vx,t.y+=t.vy,(t.x<-6||t.x>n.w+6||t.y<-6||t.y>n.h+6)&&(y[e]=l(_,0))}return}for(let e of y)e.x+=e.vx,e.y+=e.vy,e.x<-4&&(e.x=n.w+4),e.x>n.w+4&&(e.x=-4),e.y<-4&&(e.y=n.h+4),e.y>n.h+4&&(e.y=-4)},C=()=>{if(h){if(h.setTransform(m,0,0,m,0,0),h.clearRect(0,0,n.w,n.h),v===`constellation`){h.lineWidth=1;for(let e=0;e<y.length;e++)for(let t=e+1;t<y.length;t++){let n=y[e],r=y[t],i=n.x-r.x,o=n.y-r.y,s=Math.hypot(i,o);s>a||(h.strokeStyle=`rgba(188, 205, 255, ${(1-s/a)*.42})`,h.beginPath(),h.moveTo(n.x,n.y),h.lineTo(r.x,r.y),h.stroke())}}h.fillStyle=`rgba(224, 232, 255, 0.86)`;for(let e of y)h.beginPath(),h.arc(e.x,e.y,e.r,0,Math.PI*2),h.fill()}},w=()=>{S(),C(),b=u.setTimeout(w,r)},T=()=>{u.clearTimeout(b),b=void 0,C(),!g&&(b=u.setTimeout(w,r))};e(c,`register`).addEventListener(`change`,e=>{v=e.detail,d.dataset.register=v,f.textContent=x[v],y=v===`starfield`?Array.from({length:i},()=>l(_,4)):s(_),T()}),T()}export{u as mount};