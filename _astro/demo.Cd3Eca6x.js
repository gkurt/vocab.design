import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./motion.B5_YXmsy.js";var n={w:458,h:204},r={w:11,h:14,size:13},i=Math.floor(n.w/r.w),a=Math.ceil(n.h/r.h)+1,o=9,s=70,c=46,l=`ｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎ0123456789`.split(``),u=`#DCFFE8`,d=[64,226,122],f=`#04070A`;function p(e){let t=e>>>0;return()=>(t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296)}function m(m,h){m.innerHTML=`
    <div class="sp-app" style="gap: 9px">
      <div class="sp-frame sp-frame--wide" data-part="window"
           style="height: 244px; background: ${f}; border-color: rgb(64 226 122 / 0.3)">
        <div class="sp-topbar sp-context" data-part="titlebar"
             style="background: #080D12; border-bottom-color: rgb(64 226 122 / 0.22)">
          <span class="sp-grow" data-part="title"
                style="font-family: ui-monospace, monospace; font-size: 11px; letter-spacing: 0.04em;
                       color: #57E37E">construct / feed 09</span>
          <span style="font-family: ui-monospace, monospace; font-size: 11px; color: #3E8F5A">${i} cols</span>
        </div>
        <div style="position: relative; flex: 1 1 auto; min-height: 0; background: ${f}">
          <canvas data-part="field" data-subject aria-hidden="true"
                  style="position: absolute; left: 0; top: 0; width: ${n.w}px; height: ${n.h}px;
                         pointer-events: none"></canvas>
          <div class="sp-context" data-part="plate"
               style="position: absolute; left: 14px; bottom: 14px; padding: 7px 11px; border-radius: 5px;
                      background: #05090D; box-shadow: inset 0 0 0 1px rgb(64 226 122 / 0.34)">
            <span data-part="plate-line"
                  style="font-family: ui-monospace, monospace; font-size: 11px; color: #9BFFBC">
              feed 09 &middot; decode stable
            </span>
          </div>
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption"
         style="max-width: 458px; margin: 0; text-align: center; font-size: 10px">
        Each column falls at its own speed, the head near white and the trail fading back over nine cells.
      </p>
    </div>
  `;let g=e(m,`field`),_=m.ownerDocument.defaultView??window,v=Math.min(_.devicePixelRatio||1,2);g.width=Math.round(n.w*v),g.height=Math.round(n.h*v);let y=g.getContext(`2d`),b=p(19990331),x=()=>l[Math.floor(b()*l.length)],S=Array.from({length:i},()=>({head:-b()*a,speed:.45+b()*.95,cells:Array.from({length:a},x)})),C=()=>{for(let e of S){let t=Math.floor(e.head);e.head+=e.speed;let n=Math.floor(e.head);for(let r=t+1;r<=n;r++)r>=0&&r<a&&(e.cells[r]=x());e.head-o>a&&(e.head=-b()*a*.7,e.speed=.45+b()*.95)}},w=()=>{if(y){y.setTransform(-v,0,0,v,n.w*v,0),y.fillStyle=f,y.fillRect(0,0,n.w,n.h),y.font=`${r.size}px ui-monospace, monospace`,y.textBaseline=`top`;for(let e=0;e<S.length;e++){let t=S[e],n=e*r.w+3;for(let e=0;e<=o;e++){let i=Math.floor(t.head)-e;i<0||i>=a||(e===0?y.fillStyle=u:y.fillStyle=`rgba(${d[0]}, ${d[1]}, ${d[2]}, ${Math.max(.05,.76-e*.082)})`,y.fillText(t.cells[i],n,i*r.h))}}}};for(let e=0;e<c;e++)C();if(w(),t(m))return;let T=()=>{C(),w(),h.setTimeout(T,s)};h.setTimeout(T,s)}export{m as mount};