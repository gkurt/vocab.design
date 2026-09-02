var e={w:416,h:196},t={r:62,spread:34,cx:138,cy:98},n=[{key:`cyan`,name:`Cyan`,color:`#12B0E8`,angle:-90},{key:`magenta`,name:`Magenta`,color:`#E8298C`,angle:150},{key:`yellow`,name:`Yellow`,color:`#FBE712`,angle:30}],r=e=>[0,1,2].map(t=>Number.parseInt(e.slice(1+t*2,3+t*2),16));function i(...e){return`#${[0,1,2].map(t=>e.reduce((e,n)=>e*r(n)[t]/255,255)).map(e=>Math.round(e).toString(16).padStart(2,`0`)).join(``).toUpperCase()}`}var[a,o,s]=[n[0].color,n[1].color,n[2].color],c=[{key:`blue`,color:i(a,o),text:`C + M`},{key:`green`,color:i(a,s),text:`C + Y`},{key:`red`,color:i(o,s),text:`M + Y`},{key:`sludge`,color:i(a,o,s),text:`C + M + Y`}],l=e=>({x:t.cx+Math.cos(e*Math.PI/180)*t.spread,y:t.cy+Math.sin(e*Math.PI/180)*t.spread});function u(){let e=n.map(e=>l(e.angle)),r=[];for(let n=0;n<360;n+=3){let i=Math.cos(n*Math.PI/180),a=Math.sin(n*Math.PI/180),o=1/0;for(let n of e){let e=t.cx-n.x,r=t.cy-n.y,s=i*e+a*r,c=e*e+r*r-t.r*t.r;o=Math.min(o,-s+Math.sqrt(Math.max(0,s*s-c)))}r.push(`${(t.cx+i*o).toFixed(2)} ${(t.cy+a*o).toFixed(2)}`)}return`M ${r.join(` L `)} Z`}function d(r){r.innerHTML=`
    <div class="sp-app" style="gap: 8px">
      <div class="sp-window" style="width: 452px; padding: 14px 18px">
        <div data-part="field"
             style="position: relative; width: ${e.w}px; height: ${e.h}px;
                    border-radius: 6px; background: #FFFFFF; isolation: isolate; overflow: hidden;
                    box-shadow: inset 0 0 0 1px rgb(16 24 40 / 0.14)">
          ${n.map(e=>{let n=l(e.angle);return`
      <div data-part="ink-${e.key}" aria-hidden="true"
           style="position: absolute; left: ${(n.x-t.r).toFixed(2)}px; top: ${(n.y-t.r).toFixed(2)}px;
                  width: ${t.r*2}px; height: ${t.r*2}px; border-radius: 50%;
                  background: ${e.color}; mix-blend-mode: multiply"></div>`}).join(``)}
          <svg width="${e.w}" height="${e.h}" aria-hidden="true"
               style="position: absolute; left: 0; top: 0; pointer-events: none">
            <path data-part="overlap" data-subject d="${u()}" fill="${i(a,o,s)}"></path>
          </svg>
          <div class="sp-stack sp-context" data-part="legend"
               style="position: absolute; right: 18px; top: 50%; transform: translateY(-50%); gap: 10px">
            ${c.map(e=>`
    <div class="sp-row" data-part="legend-${e.key}" style="gap: 8px">
      <span style="flex: 0 0 auto; width: 14px; height: 14px; border-radius: 4px; background: ${e.color}"></span>
      <span style="font-size: 11px; font-variant-numeric: tabular-nums; color: #3A3F49; white-space: nowrap">${e.text}</span>
    </div>`).join(``)}
          </div>
        </div>
      </div>
    </div>
  `}export{d as mount};