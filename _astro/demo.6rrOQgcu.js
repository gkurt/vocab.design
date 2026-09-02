var e=`#e9e7e0`,t=`#191813`,n=`#c9c6bd`,r=`#c3c0b7`,i=`#6d6a62`,a=`#48463f`,o=`'Iowan Old Style', 'Palatino Linotype', Palatino, Georgia, serif`,s=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5],c=(e,t,n,r)=>r*Math.max(0,1-Math.abs(e-t)/n);function l(e,t){let n=50-c(e,70,34,9)-c(e,18,22,6);if(t>62-c(e,44,30,16)-c(e,112,34,22))return .95;if(t>n)return .45;let r=Math.hypot(e-120,t-16);if(r<13)return Math.hypot(e-115,t-12)<4.5?.32:.03+.18*(r/13)**3;let i=r<23?.11*(1-(r-13)/10):0;return Math.max(0,.42*(1-t/54)-i)+.04}function u(){let e=[];for(let t=0;t*4<76;t++)for(let n=0;n*4<160;n++){let r=n*4,i=t*4,a=((s[t%4*4+n%4]??0)+.5)/16;l(r+4/2,i+4/2)>a&&e.push(`M${r} ${i}h4v4h-4z`)}return e.join(``)}function d(e,t,n,r){return`
    <span aria-hidden="true"
          style="position: absolute; left: 0; top: ${e}px; width: ${t}%; height: ${r}px; background: ${n}"></span>`}function f(e,t){return`
    <span class="sp-stack" style="flex: 1 1 0; gap: 3px; align-items: center">
      <span aria-hidden="true" style="width: 100%; height: 26px; background: ${e}; border: 1px solid ${n}"></span>
      <span class="sp-label" style="font-size: 9px">${t}</span>
    </span>`}function p(s){s.innerHTML=`
    <div class="sp-app" style="gap: 9px">
      <div class="sp-row" style="align-items: stretch; gap: 12px">

        <div data-part="device"
             style="flex: 0 0 auto; width: 206px; padding: 11px 11px 0; background: #2f2e2b; border-radius: 10px">

          <div data-part="screen" data-subject
               style="display: flex; flex-direction: column; width: 184px; height: 218px; padding: 10px 11px 8px;
                      background: ${e}; color: ${t}; border: 1px solid #cfccc3">

            <span data-part="running-head"
                  style="font-size: 7.5px; letter-spacing: 0.16em; text-indent: 0.16em; color: ${i}">THE WEATHER MACHINE</span>
            <span aria-hidden="true" style="height: 1px; margin: 5px 0 8px; background: ${n}"></span>

            <svg data-part="art" viewBox="0 0 160 76" width="162" height="76" aria-hidden="true"
                 shape-rendering="crispEdges" style="display: block; flex: 0 0 auto; margin: 0 -1px">
              <path d="${u()}" fill="${t}"/>
            </svg>

            <span data-part="headline" style="margin-top: 9px; font-family: ${o}; font-size: 13px; font-weight: 700">
              Chapter Three
            </span>
            <p data-part="body"
               style="height: 46px; margin: 5px 0 0; overflow: hidden; font-family: ${o}; font-size: 8.5px;
                      line-height: 1.75; text-align: justify">
              It had been running since before the town had a name, and nobody now alive remembered switching it on.
            </p>

            <span aria-hidden="true" style="height: 1px; margin-top: auto; background: ${n}"></span>
            <span class="sp-row sp-row--between" data-part="pager" style="margin-top: 5px; font-size: 8px; color: ${i}">
              <span>Paged</span><span data-part="folio">37 of 214</span>
            </span>
          </div>

          <div class="sp-row sp-row--between sp-context" data-part="keys" style="padding: 6px 2px 7px">
            <span aria-hidden="true" style="width: 34px; height: 8px; border-radius: 4px; background: ${a}"></span>
            <span aria-hidden="true" style="width: 34px; height: 8px; border-radius: 4px; background: ${a}"></span>
          </div>
        </div>

        <div class="sp-stack sp-context" style="flex: 0 0 214px; gap: 10px; justify-content: center">

          <div class="sp-surface" data-part="ghost-exhibit" style="padding: 9px 10px 10px">
            <span class="sp-label" style="display: block">Refresh ghosting</span>
            <div data-part="ghost-screen"
                 style="position: relative; height: 72px; margin-top: 6px; padding: 7px 8px; overflow: hidden;
                        background: ${e}; border: 1px solid ${n}">
              <span data-part="ghost-residue" aria-hidden="true" style="position: absolute; left: 8px; right: 8px; top: 7px; height: 44px">
                ${d(8,72,r,3)}${d(19,96,r,3)}${d(30,61,r,3)}${d(41,88,r,3)}
              </span>
              <span data-part="ghost-page" aria-hidden="true" style="position: absolute; left: 8px; right: 8px; top: 7px; height: 44px">
                ${d(2,100,t,4)}${d(13,92,t,4)}${d(24,97,t,4)}${d(35,46,t,4)}
              </span>
            </div>
          </div>

          <div class="sp-surface" data-part="levels" style="padding: 9px 10px 10px">
            <span class="sp-label" style="display: block">Grey levels</span>
            <div class="sp-row" style="gap: 6px; margin-top: 6px">
              ${f(e,`Paper`)}${f(`#b3b0a8`,`Light`)}${f(`#6b6961`,`Dark`)}${f(t,`Ink`)}
            </div>
          </div>
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 432px; margin: 0; text-align: center">
        Reflective ink, not light: warm ground, one ink colour, hairlines instead of shadows, pages instead of scrolling.
      </p>
    </div>
  `}export{p as mount};