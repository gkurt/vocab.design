import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=8,r=5,i=19,a={left:1.15,right:4.5,lean:.24},o=[{key:`subpixel`,label:`subpixel`,css:`subpixel-antialiased`,read:`subpixel-antialiased: each stripe shaded on its own`},{key:`grayscale`,label:`antialiased`,css:`antialiased`,read:`antialiased: the whole pixel shaded grey`}],s=`Handgloves`,c=e=>Math.min(1,Math.max(0,e));function l(e,t,n){let r=a.left+a.lean*n,i=a.right+a.lean*n;return c((Math.min(t,i)-Math.max(e,r))/(t-e))}function u(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Smoothing" data-value="subpixel">
            ${o.map(e=>`<button class="sp-segment" data-part="seg-${e.key}" value="${e.key}">${e.label}</button>`).join(``)}
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 20px; margin-top: 12px; align-items: flex-start">
          <div class="sp-stack sp-context" style="gap: 12px; flex: 1 1 auto; min-width: 0">
            ${o.map(e=>`
    <div class="sp-stack" data-part="sample-${e.key}" style="gap: 2px">
      <span class="sp-row" style="gap: 6px; height: 16px">
        <span class="sp-label" style="white-space: nowrap">${e.css}</span>
        <span class="sp-label" data-part="tag-${e.key}" style="white-space: nowrap; color: var(--sp-accent)"
              ${e.key===o[0]?.key?``:`hidden`}>&#x2192; magnified</span>
      </span>
      <span style="font-size: 19px; line-height: 1.3; -webkit-font-smoothing: ${e.css}">${s}</span>
    </div>`).join(``)}
          </div>
          <div class="sp-stack" style="gap: 6px; flex: 0 0 auto; align-items: center">
            <div data-part="patch" data-subject data-mode="subpixel"
                 style="position: relative; width: 152px; height: 95px;
                        background: #ffffff; border-radius: 3px; overflow: hidden"></div>
            <span class="sp-label sp-context" style="white-space: nowrap">one stem edge, magnified</span>
          </div>
        </div>
        <div class="sp-row sp-context" style="height: 30px; margin-top: 10px">
          <span class="sp-chip" data-part="readout" style="cursor: default; white-space: nowrap">${o[0]?.read??``}</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 4px">
          The two lines are real: greyscale genuinely lays down less ink on this machine. The magnified pixels
          are drawn, because a screenshot keeps no record of the colour stripes that made it.
        </p>
      </div>
    </div>
  `;let c=e(a,`patch`),u=e(a,`readout`),d=s=>{let d=[];for(let e=0;e<r;e++)for(let t=0;t<n;t++){let n=[0,1,2].map(n=>l(t+n/3,t+(n+1)/3,e)),r=(n[0]??0)+(n[1]??0)+(n[2]??0),a=(s.key===`grayscale`?[r/3,r/3,r/3]:n).map(e=>Math.round(255*(1-e))).join(`,`),o=e===2&&t===1?` data-part="pixel-edge"`:``;d.push(`<span${o} style="position: absolute; left: ${t*i}px; top: ${e*i}px;
          width: ${i}px; height: ${i}px; background: rgb(${a});
          box-shadow: inset 0 0 0 0.5px rgb(0 0 0 / 0.16)"></span>`)}c.innerHTML=d.join(``),c.dataset.mode=s.key,u.textContent=s.read;for(let n of o)t(e(a,`tag-${n.key}`),`hidden`,n.key!==s.key)};d(o[0]),e(a,`segmented`).addEventListener(`change`,e=>{let t=o.find(t=>t.key===e.detail);t&&d(t)})}export{u as mount};