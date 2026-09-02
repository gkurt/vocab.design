var e={w:416,h:196},t={r:62,spread:34,cx:138,cy:98},n=[{key:`red`,name:`Red`,color:`#FF0000`,angle:-90},{key:`green`,name:`Green`,color:`#00FF00`,angle:150},{key:`blue`,name:`Blue`,color:`#0000FF`,angle:30}],r=[{key:`yellow`,color:`#FFFF00`,text:`R + G`},{key:`cyan`,color:`#00FFFF`,text:`G + B`},{key:`magenta`,color:`#FF00FF`,text:`B + R`},{key:`white`,color:`#FFFFFF`,text:`R + G + B`}],i=e=>({x:t.cx+Math.cos(e*Math.PI/180)*t.spread,y:t.cy+Math.sin(e*Math.PI/180)*t.spread});function a(){let e=n.map(e=>i(e.angle)),r=[];for(let n=0;n<360;n+=3){let i=Math.cos(n*Math.PI/180),a=Math.sin(n*Math.PI/180),o=1/0;for(let n of e){let e=t.cx-n.x,r=t.cy-n.y,s=i*e+a*r,c=e*e+r*r-t.r*t.r;o=Math.min(o,-s+Math.sqrt(Math.max(0,s*s-c)))}r.push(`${(t.cx+i*o).toFixed(2)} ${(t.cy+a*o).toFixed(2)}`)}return`M ${r.join(` L `)} Z`}function o(o){o.innerHTML=`
    <div class="sp-app" style="gap: 8px">
      <div class="sp-window" style="width: 452px; padding: 12px 18px 14px">
        <div data-part="field"
             style="position: relative; width: ${e.w}px; height: ${e.h}px; margin-top: 7px;
                    border-radius: 6px; background: #000000; isolation: isolate; overflow: hidden">
          ${n.map(e=>{let n=i(e.angle);return`
      <div data-part="light-${e.key}" aria-hidden="true"
           style="position: absolute; left: ${(n.x-t.r).toFixed(2)}px; top: ${(n.y-t.r).toFixed(2)}px;
                  width: ${t.r*2}px; height: ${t.r*2}px; border-radius: 50%;
                  background: ${e.color}; mix-blend-mode: screen"></div>`}).join(``)}
          <svg width="${e.w}" height="${e.h}" aria-hidden="true"
               style="position: absolute; left: 0; top: 0; mix-blend-mode: screen; pointer-events: none">
            <path data-part="overlap" data-subject d="${a()}" fill="#FFFFFF"></path>
          </svg>
          <div class="sp-stack sp-context" data-part="legend"
               style="position: absolute; right: 18px; top: 50%; transform: translateY(-50%); gap: 10px">
            ${r.map(e=>`
    <div class="sp-row" data-part="legend-${e.key}" style="gap: 8px">
      <span style="flex: 0 0 auto; width: 14px; height: 14px; border-radius: 4px; background: ${e.color}"></span>
      <span style="font-size: 11px; font-variant-numeric: tabular-nums; color: #D7DCE6; white-space: nowrap">${e.text}</span>
    </div>`).join(``)}
          </div>
        </div>
      </div>
    </div>
  `}export{o as mount};