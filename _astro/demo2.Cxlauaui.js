var e=`#2f2c33`,t=`#8d8a93`,n=`'Segoe Print', 'Bradley Hand', 'Comic Sans MS', 'Chalkboard SE', cursive`;function r(e){let t=e*2654435761>>>0;return e=>(t=t*1664525+1013904223>>>0,(t/4294967296-.5)*e*2)}function i(e,t,n,r){let i=[{x:1.5+n(r),y:1.5+n(r)},{x:e-1.5+n(r),y:1.5+n(r)},{x:e-1.5+n(r),y:t-1.5+n(r)},{x:1.5+n(r),y:t-1.5+n(r)}],a=i[0];if(!a)return``;let o=`M${a.x.toFixed(1)} ${a.y.toFixed(1)}`;for(let e=0;e<i.length;e++){let t=i[e],a=i[(e+1)%i.length];if(!t||!a)continue;let s=(t.x+a.x)/2+n(r*1.8),c=(t.y+a.y)/2+n(r*1.8);o+=` Q${s.toFixed(1)} ${c.toFixed(1)} ${a.x.toFixed(1)} ${a.y.toFixed(1)}`}return o}function a(t,n,a,o={}){let s=o.amount??1.6,c=o.stroke??e,l=r(a),u=[];if(o.fill)for(let e=-n;e<t;e+=6){let r=e+l(1.4),i=e+n+l(1.4);u.push(`M${Math.max(2,r).toFixed(1)} ${n-2} L${Math.min(t-2,i).toFixed(1)} 2`)}return`
    <svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" aria-hidden="true"
         style="position: absolute; left: 0; top: 0; overflow: visible; pointer-events: none">
      ${o.fill?`<path d="${u.join(` `)}" fill="none" stroke="${c}" stroke-width="1.1" opacity="0.42"/>`:``}
      <path d="${i(t,n,l,s)}" fill="none" stroke="${c}" stroke-width="1.7" stroke-linecap="round"/>
      <path d="${i(t,n,l,s)}" fill="none" stroke="${c}" stroke-width="1.2" stroke-linecap="round" opacity="0.62"/>
    </svg>`}function o(e,n){let i=r(n),a=`M2 5`;for(let t=10;t<=e-4;t+=9)a+=` Q${(t-4).toFixed(1)} ${(5+i(2.6)).toFixed(1)} ${t} ${(5+i(1.2)).toFixed(1)}`;return`<svg viewBox="0 0 ${e} 10" width="${e}" height="10" aria-hidden="true" style="display: block">
      <path d="${a}" fill="none" stroke="${t}" stroke-width="1.6" stroke-linecap="round"/>
    </svg>`}function s(r){r.innerHTML=`
    <div class="sp-app" style="gap: 9px">
      <div class="sp-window" style="width: 466px; padding: 12px 14px 14px">
        <div class="sp-row" data-part="tour" style="gap: 14px; align-items: flex-start; justify-content: center">
          ${`
    <div data-part="sketch-card" class="sp-stack"
         style="position: relative; flex: 0 0 auto; width: 262px; height: 194px; gap: 9px; padding: 13px 15px 15px;
                background: #fffdf6; color: ${e}; font-family: ${n}; rotate: -0.9deg">
      ${a(262,194,11,{amount:2.4})}

      <div style="position: relative">
        <span data-part="sketch-heading" style="font-size: 16px; font-weight: 700; letter-spacing: 0.01em">New task</span>
        <span style="position: absolute; left: -2px; top: 19px; width: 92px">${o(92,3)}</span>
      </div>

      <div class="sp-stack" style="gap: 4px; margin-top: 5px">
        <span style="font-size: 11px; color: ${t}">Title</span>
        <span data-part="sketch-field" style="position: relative; display: block; width: 230px; height: 30px; padding: 10px 8px 0">
          ${a(230,30,27,{amount:1.5})}
          <span style="position: relative; display: block; width: 128px">${o(128,41)}</span>
        </span>
      </div>

      <span class="sp-row" data-part="sketch-check" style="gap: 8px">
        <span style="position: relative; display: inline-block; width: 17px; height: 17px">
          ${a(17,17,59,{amount:1.3})}
          <svg viewBox="0 0 17 17" width="17" height="17" aria-hidden="true" style="position: absolute; left: 3px; top: -3px; overflow: visible">
            <path d="M2 9.5 6.4 14 15.5 1.5" fill="none" stroke="${e}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <span style="font-size: 12px">Remind me</span>
      </span>

      <span class="sp-row" style="gap: 12px; margin-top: 2px">
        <button type="button" data-part="sketch-button" data-subject
                style="position: relative; width: 86px; height: 31px; padding: 0; border: 0; background: transparent;
                       color: ${e}; font: inherit; font-family: ${n}; font-size: 13px; font-weight: 700; cursor: pointer">
          ${a(86,31,73,{amount:1.8,fill:!0})}
          <span style="position: relative">Add</span>
        </button>
        <span style="font-size: 12px; color: ${t}">Cancel</span>
      </span>
    </div>`}
          
    <div class="sp-stack sp-context" data-part="finished" style="flex: 0 0 auto; width: 158px; gap: 9px">
      <div class="sp-surface" style="padding: 11px 12px 13px">
        <div class="sp-stack" style="gap: 9px">
          <span class="sp-heading" style="font-size: 13px">New task</span>
          <span class="sp-field">
            <span class="sp-label" style="font-size: 11px">Title</span>
            <span class="sp-input" style="display: block; color: var(--sp-muted); font-size: 12px">Buy paper</span>
          </span>
          <span class="sp-row" style="gap: 8px">
            <span class="sp-checkbox" data-checked aria-hidden="true"></span>
            <span style="font-size: 12px">Remind me</span>
          </span>
          <span class="sp-row" style="gap: 10px">
            <span class="sp-button sp-button--sm">Add</span>
            <span class="sp-text" style="font-size: 12px">Cancel</span>
          </span>
        </div>
      </div>
    </div>
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 466px; margin: 0; text-align: center">
        The wobble is the claim: nothing here is settled, so argue with the structure and not the colour.
      </p>
    </div>
  `}export{s as mount};