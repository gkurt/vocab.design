var e=`#fef7ff`,t=`#6750a4`,n=`#d0bcff`,r=`#eaddff`,i=`#f6edff`,a=`#ffd8e4`,o=[[4,.135],[6,.1],[9,.055]];function s(e,t,n,r,i){let a=r*14,o=[];for(let s=0;s<a;s++){let c=s/a*Math.PI*2,l=n*(1+i*Math.cos(r*c));o.push(`${(e+Math.cos(c)*l).toFixed(2)},${(t+Math.sin(c)*l).toFixed(2)}`)}return`M${o.join(`L`)}Z`}function c(e,t,n,r){return`
    <div class="sp-stack" style="flex: 0 0 136px; gap: 5px; align-items: stretch">
      <div data-part="${e}"
           style="position: relative; width: 136px; height: 134px; overflow: hidden; border-radius: 18px 6px 18px 6px;
                  background: ${n}">
        ${r}
      </div>
      <span class="sp-label" style="color: var(--sp-ink); font-size: 12px">${t}</span>
    </div>`}function l(l){let u=`
    <div style="position: absolute; inset: 10px; display: flex; flex-direction: column; gap: 8px">
      <svg data-part="morph" viewBox="0 0 116 36" width="116" height="36" role="presentation" style="display: block">
        ${o.map(([e,r],i)=>{let a=i===o.length-1?t:n;return`<g data-part="morph-${i+1}" transform="translate(${2+i*38} 0)">
        <path d="${s(18,18,15.5,e,r)}" fill="${a}"/>
      </g>`}).join(``)}
      </svg>
      <div class="sp-row" data-part="radii" style="gap: 7px; margin-top: 2px">
        <span aria-hidden="true" style="width: 32px; height: 32px; border-radius: 26px 8px 26px 8px; background: ${a}"></span>
        <span aria-hidden="true" style="width: 32px; height: 32px; border-radius: 50% 50% 8px 50%; background: #e8def8"></span>
        <span aria-hidden="true" style="width: 32px; height: 32px; border-radius: 10px; background: ${n}"></span>
      </div>
    </div>`,d=`
    <div style="position: absolute; inset: 10px; display: flex; flex-direction: column; gap: 6px">
      <span aria-hidden="true" data-part="field-primary"
            style="height: 32px; border-radius: 16px 6px 16px 6px; background: ${t}"></span>
      <span aria-hidden="true" data-part="field-container"
            style="height: 26px; border-radius: 6px 16px 6px 16px; background: ${r}"></span>
      <span aria-hidden="true" data-part="field-tertiary"
            style="height: 20px; border-radius: 12px; background: ${a}"></span>
      <div class="sp-row" data-part="ramp" style="gap: 4px; margin-top: auto">
        <span aria-hidden="true" style="flex: 1 1 0; height: 12px; border-radius: 6px; background: #21005d"></span>
        <span aria-hidden="true" style="flex: 1 1 0; height: 12px; border-radius: 6px; background: #4f378b"></span>
        <span aria-hidden="true" style="flex: 1 1 0; height: 12px; border-radius: 6px; background: ${t}"></span>
        <span aria-hidden="true" style="flex: 1 1 0; height: 12px; border-radius: 6px; background: ${n}"></span>
        <span aria-hidden="true" style="flex: 1 1 0; height: 12px; border-radius: 6px; background: ${i}"></span>
      </div>
    </div>`,f=`
    <div data-part="fragment" data-subject
         style="position: absolute; inset: 8px; display: flex; flex-direction: column; gap: 6px; padding: 8px;
                border-radius: 22px 10px 22px 10px; background: ${e}; color: #1d1b20;
                box-shadow: 0 3px 10px rgb(29 27 32 / 0.16)">
      <span data-part="fragment-heading" style="font-size: 15px; font-weight: 700; letter-spacing: -0.2px; line-height: 1.15">
        Today
      </span>
      <span aria-hidden="true" data-part="fragment-card"
            style="display: block; height: 20px; border-radius: 12px 5px 12px 5px; background: ${r}"></span>
      <span aria-hidden="true"
            style="display: block; height: 12px; border-radius: 5px 12px 5px 12px; background: ${a}"></span>
      <button type="button" data-part="fragment-action"
              style="margin-top: auto; width: 100%; padding: 8px 0 9px; border: 0; border-radius: 18px 7px 18px 7px;
                     background: ${t}; color: #ffffff; font: inherit; font-size: 13px; font-weight: 700;
                     line-height: 1.1; cursor: pointer">
        Start
      </button>
    </div>`;l.innerHTML=`
    <div class="sp-app" data-loop="keep" style="gap: 9px">
      <div class="sp-window" style="width: 466px; padding: 11px 14px 13px">
        <span class="sp-heading" data-part="heading" style="display: block; margin-bottom: 9px">Material 3 Expressive</span>

        <div class="sp-row" data-part="tour" style="gap: 13px; align-items: flex-start; justify-content: center">
          <div class="sp-context">
            ${c(`tile-shape`,`Shape`,i,u)}
          </div>
          <div class="sp-context">
            ${c(`tile-colour`,`Colour`,e,d)}
          </div>
          ${c(`tile-applied`,`Applied`,i,f)}
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 466px; margin: 0; text-align: center">
        A vendor design language with a version number, announced in May 2025.
      </p>
    </div>
  `}export{l as mount};