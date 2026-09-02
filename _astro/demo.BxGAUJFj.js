import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`'Geist Variable', ui-sans-serif, system-ui, sans-serif`,n=.217,r=.34,i=[{slug:`av`,left:`A`,right:`V`,white:{none:.301,metric:.204,optical:n},optical:-.091},{slug:`to`,left:`T`,right:`o`,white:{none:.318,metric:.271,optical:n},optical:-.157},{slug:`ye`,left:`Y`,right:`e`,white:{none:.305,metric:.26,optical:n},optical:-.131}],a={none:`no kerning: three different gaps`,metric:`the font's own pairs: closer, still uneven`,optical:`measured from the shapes: one gap, three times`},o=e=>e===`none`||e===`metric`||e===`optical`,s=118,c=44;function l(e,t){return t===`optical`?`<span style="font-kerning: none">${e.left}<span style="margin-left: ${e.optical}em">${e.right}</span></span>`:`<span style="font-kerning: ${t===`metric`?`normal`:`none`}">${e.left}${e.right}</span>`}function u(e,n){let i=`optical`,a=Math.round(e.white[i]/r*s);return`
    <div class="sp-stack${n?``:` sp-context`}" style="gap: 7px; align-items: center; width: 130px">
      <div style="height: 58px; display: flex; align-items: center; justify-content: center">
        <span data-part="pair-${e.slug}" ${n?`data-subject data-pose="[data-mode=optical]"`:``} data-mode="${i}"
              style="font-family: ${t}; font-size: ${c}px; line-height: 1.1; white-space: nowrap">${l(e,i)}</span>
      </div>
      <div data-part="gauge-${e.slug}" style="width: ${s}px; height: 8px; border-radius: 999px; background: var(--sp-sunken)">
        <div data-part="bar-${e.slug}" style="width: ${a}px; height: 100%; border-radius: 999px; background: var(--sp-accent);
             transition: width 0.28s var(--sp-ease)"></div>
      </div>
      <span class="sp-label" data-part="value-${e.slug}" style="font-variant-numeric: tabular-nums">${e.white[i].toFixed(3)} em of white</span>
    </div>`}function d(t){t.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="optical" data-axis="Kerning" data-term="optical">
            <button class="sp-segment" data-part="seg-none" value="none">none</button>
            <button class="sp-segment" data-part="seg-metric" value="metric">metric</button>
            <button class="sp-segment" data-part="seg-optical" value="optical">optical</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 10px; justify-content: center; margin-top: 10px">
          ${i.map(e=>u(e,e.slug===`av`)).join(``)}
        </div>
        <span class="sp-chip sp-context" data-stage-verdict data-part="readout" style="cursor: default">${a.optical}</span>
      </div>
    </div>
  `;let n=e(t,`readout`);e(t,`segmented`).addEventListener(`change`,c=>{let u=c.detail;if(o(u)){for(let n of i){let i=e(t,`pair-${n.slug}`);i.dataset.mode=u,i.innerHTML=l(n,u),e(t,`bar-${n.slug}`).style.width=`${Math.round(n.white[u]/r*s)}px`,e(t,`value-${n.slug}`).textContent=`${n.white[u].toFixed(3)} em of white`}n.textContent=a[u]}})}export{d as mount};