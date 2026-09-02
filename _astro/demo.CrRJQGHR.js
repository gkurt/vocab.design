var e=72,t=e/2,n=21,r=`rgb(120 132 160 / 0.34)`,i=[`#a5b6ff`,`#6b8afd`,`#4358c4`],a=[`#ffd79a`,`#f2b45c`,`#c98a35`],o=[`#8fdfd6`,`#43b9ad`,`#2c8880`];function s(r,i,a,[o,s,c],l){let u=(e,t)=>`<span style="position: absolute; inset: 0; background: ${e}; clip-path: polygon(${t})"></span>`;return`
    <span data-part="${l}" style="position: absolute; left: ${r}px; top: ${i}px; width: ${e}px; height: ${42+a}px">
      ${u(c,`${e}px ${n}px, ${e}px ${n+a}px, ${t}px ${42+a}px, ${t}px 42px`)}
      ${u(s,`0 ${n}px, ${t}px 42px, ${t}px ${42+a}px, 0 ${n+a}px`)}
      ${u(o,`${t}px 0, ${e}px ${n}px, ${t}px 42px, 0 ${n}px`)}
    </span>`}function c(e){e.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div data-part="frame"
           style="position: relative; width: 300px; height: 212px; overflow: hidden; background: #fbfcfe;
                  border: 1px solid #dfe2e8; border-radius: 8px">

        <span class="sp-context" data-part="grid" aria-hidden="true"
              style="position: absolute; inset: 0; background-image: ${[`repeating-linear-gradient(30deg, ${r} 0 1px, transparent 1px ${t/2}px)`,`repeating-linear-gradient(-30deg, ${r} 0 1px, transparent 1px ${t/2}px)`,`repeating-linear-gradient(90deg, ${r} 0 1px, transparent 1px ${t}px)`].join(`, `)}"></span>

        <span data-part="scene" data-subject aria-hidden="true"
              style="position: absolute; left: 38px; top: 30px; width: 224px; height: 152px">
          ${s(106,0,38,o,`block-back`)}
          ${s(0,34,38,i,`block-base`)}
          ${s(0,8,26,a,`block-stacked`)}
          ${s(152,72,38,o,`block-front`)}
        </span>

        <span class="sp-label sp-context" data-part="legend"
              style="position: absolute; left: 10px; bottom: 8px">30 degrees, no vanishing point</span>
      </div>
    </div>
  `}export{c as mount};