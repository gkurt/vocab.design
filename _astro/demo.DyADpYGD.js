var e=`#101014`,t=`#e5142d`,n=`#1651d4`,r=`#ffd42a`,i=`#fff6d6`,a=`'Arial Narrow', 'Haettenschweiler', 'Oswald', Impact, var(--sp-font)`,o=(()=>{let e=[];for(let t=0;t<24;t++){let n=t%2==0?50:33,r=Math.PI*2*t/24-Math.PI/2;e.push(`${(50+n*Math.cos(r)).toFixed(1)}% ${(50+n*Math.sin(r)).toFixed(1)}%`)}return`polygon(${e.join(`, `)})`})(),s=[[r,t],[n,r],[t,i],[i,n]];function c(n){n.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div data-part="card" data-subject
           style="position: relative; width: 244px; padding: 14px; border: 4px solid ${e}; background-color: ${r}; background-image: radial-gradient(circle, rgb(229 20 45 / 0.5) 1.6px, transparent 1.8px); background-size: 7px 7px; box-shadow: 7px 7px 0 ${e}">

        <div style="display: flex; align-items: flex-start; gap: 12px">
          <span data-part="repeats" aria-hidden="true" style="display: grid; grid-template-columns: repeat(2, 50px); gap: 6px">${s.map(([t,n])=>`
      <span style="position: relative; width: 50px; height: 50px; border: 3px solid ${e}; background: ${t}; overflow: hidden">
        <span style="position: absolute; left: 9px; top: 9px; width: 28px; height: 28px; border-radius: 50%; border: 3px solid ${e}; background: ${n}"></span>
        <span style="position: absolute; left: 20px; top: 20px; width: 8px; height: 8px; border-radius: 50%; background: ${e}"></span>
      </span>`).join(``)}</span>

          <span data-part="burst" style="position: relative; width: 84px; height: 84px; margin-top: 4px; clip-path: ${o}; background: ${e}">
            <span style="position: absolute; inset: 4px; clip-path: ${o}; background: ${t}"></span>
            <span style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; transform: rotate(-8deg); font-family: ${a}; font-size: 22px; font-weight: 700; letter-spacing: 0.04em; color: ${i}; -webkit-text-stroke: 1px ${e}">NEW!</span>
          </span>
        </div>

        <div data-part="balloon"
             style="position: relative; margin-top: 26px; padding: 10px 12px; border: 3px solid ${e}; border-radius: 16px; background: ${i}; font-family: ${a}; font-size: 19px; font-weight: 700; letter-spacing: 0.03em; line-height: 1.15; color: ${e}; text-transform: uppercase">
          It worked on the first try!
          <span data-part="tail" aria-hidden="true"
                style="position: absolute; left: 26px; bottom: -22px; width: 28px; height: 22px; background: ${e}; clip-path: polygon(0 0, 100% 0, 18% 100%)"></span>
          <span aria-hidden="true"
                style="position: absolute; left: 30px; bottom: -16px; width: 20px; height: 16px; background: ${i}; clip-path: polygon(0 0, 100% 0, 20% 100%)"></span>
          <span aria-hidden="true" style="position: absolute; left: 30px; bottom: -3px; width: 20px; height: 3px; background: ${i}"></span>
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 244px; margin: 0; text-align: center">
        Flat primaries, one outline weight, dots doing the shading, motif printed four ways.
      </p>
    </div>
  `}export{c as mount};