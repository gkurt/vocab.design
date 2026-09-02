var e=[{key:`display`,label:`regular 34px`,size:34,weight:400,style:`normal`},{key:`regular`,label:`regular 21px`,size:21,weight:400,style:`normal`},{key:`italic`,label:`italic 21px`,size:21,weight:400,style:`italic`},{key:`bold`,label:`bold 21px`,size:21,weight:700,style:`normal`},{key:`small`,label:`regular 13px`,size:13,weight:400,style:`normal`}];function t(t){t.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 440px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">One typeface</span>
          <span class="sp-label">five fonts</span>
        </div>
        <div class="sp-stack" data-part="specimen" data-subject style="gap: 7px; margin-top: 12px">
          ${e.map(({key:e,label:t,size:n,weight:r,style:i})=>`
      <div class="sp-row" style="gap: 14px; align-items: baseline">
        <span class="sp-label sp-context" style="width: 92px; flex: 0 0 auto">${t}</span>
        <span data-part="font-${e}" style="font-family: Georgia, 'Times New Roman', 'Liberation Serif', 'DejaVu Serif', serif; font-size: ${n}px; font-weight: ${r};
              font-style: ${i}; line-height: 1.25">Handgloves</span>
      </div>`).join(``)}
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 10px">
          The design is one thing, shared by every row. A font is one size and one style of it.
        </p>
      </div>
    </div>
  `}export{t as mount};