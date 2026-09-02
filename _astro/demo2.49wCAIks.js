var e=`oak`,t=[{part:`lower`,label:`lowercase`,text:e,caps:`normal`,width:96},{part:`caps`,label:`caps`,text:e.toUpperCase(),caps:`normal`,width:112},{part:`small`,label:`small caps`,text:e,caps:`small-caps`,width:98},{part:`petite`,label:`petite caps`,text:e,caps:`petite-caps`,width:98}];function n(e){let n=(e,t,n)=>`<span data-part="${e}" style="position: absolute; left: 0; width: 404px; height: 2px; ${t}; background: ${n}"></span>`;e.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">font-variant-caps</span>
          <span class="sp-label">Junicode 42</span>
        </div>
        <div data-part="samples" style="position: relative; height: 82px; margin-top: 14px; font-family: 'Junicode', 'Source Serif 4 Variable', Georgia, serif;
             font-size: 42px; line-height: 1.1">
          <span style="position: absolute; left: 0; bottom: 10px; width: 404px"><i class="sp-context" style="position: relative; display: inline-block; width: 0; height: 0; vertical-align: baseline">${n(`rule-cap`,`bottom: calc(0.663em - 1px); bottom: calc(1cap - 1px)`,`color-mix(in oklab, var(--sp-accent) 35%, transparent)`)+n(`rule-x`,`bottom: calc(1ex - 1px)`,`color-mix(in oklab, var(--sp-ink) 22%, transparent)`)}</i>${t.map(({part:e,text:t,caps:n,width:r})=>`<span data-part="cell-${e}" style="display: inline-block; width: ${r}px; vertical-align: baseline"><span data-part="run-${e}"${e===`petite`?` data-subject`:``} style="position: relative; font-variant-caps: ${n}">${t}</span></span>`).join(``)}</span>
        </div>
        <div class="sp-context" data-part="labels" style="white-space: nowrap; font-size: 0">${t.map(({part:e,label:t,width:n})=>`<span class="sp-label" data-part="label-${e}" style="display: inline-block; width: ${n}px">${t}</span>`).join(``)}</div>
      </div>
    </div>
  `}export{n as mount};