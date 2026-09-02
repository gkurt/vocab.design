import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[{name:`indigo`,label:`Indigo`,value:`oklch(0.55 0.19 268)`},{name:`teal`,label:`Teal`,value:`oklch(0.55 0.11 196)`},{name:`crimson`,label:`Crimson`,value:`oklch(0.56 0.19 20)`},{name:`amber`,label:`Amber`,value:`oklch(0.58 0.14 65)`}];function r(r){let i=n.map(({name:e,label:t,value:n})=>`
      <button class="sp-chip" data-part="swatch-${e}">
        <span class="sp-swatch" style="width: 12px; height: 12px; --sp-swatch: ${n}"></span>${t}
      </button>`).join(``);r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" data-part="panel" data-subject data-accent="indigo"
           style="width: 300px; --sp-accent: ${n[0]?.value}; --sp-accent-ink: #ffffff; --sp-accent-soft: color-mix(in oklab, var(--sp-accent) 16%, var(--sp-surface))">
        <div class="sp-row sp-row--between">
          <span class="sp-heading">Weekly digest</span>
          <button class="sp-switch" role="switch" aria-checked="true" data-part="switch"></button>
        </div>
        <p class="sp-text" style="margin: 8px 0 0">Every Monday, the five posts you missed.</p>
        <div class="sp-row" style="margin-top: 12px">
          <span class="sp-chip" data-selected>Product</span>
          <span class="sp-chip">Design</span>
          <span class="sp-chip">Research</span>
        </div>
        <div class="sp-row" style="margin-top: 14px">
          <button class="sp-button" data-part="subscribe">Subscribe</button>
          <button class="sp-button sp-button--quiet" data-part="later">Not now</button>
        </div>
      </div>
      <div class="sp-row sp-context" data-part="swatches">${i}</div>
    </div>
  `;let a=e(r,`panel`),o=n.map(t=>({accent:t,el:e(r,`swatch-${t.name}`)})),s=e=>{let r=n.find(t=>t.name===e);if(r){a.dataset.accent=r.name,a.style.setProperty(`--sp-accent`,r.value);for(let e of o)t(e.el,`data-selected`,e.accent.name===r.name)}};s(`indigo`);for(let e of o)e.el.addEventListener(`click`,()=>s(e.accent.name))}export{r as mount};