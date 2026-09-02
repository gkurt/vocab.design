import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n=e=>[Number.parseInt(e.slice(1,3),16),Number.parseInt(e.slice(3,5),16),Number.parseInt(e.slice(5,7),16)],r=(e,t,n)=>[n*e[0]+(1-n)*t[0],n*e[1]+(1-n)*t[1],n*e[2]+(1-n)*t[2]],i=e=>{let t=e/255;return t<=.03928?t/12.92:((t+.055)/1.055)**2.4},a=([e,t,n])=>.2126*i(e)+.7152*i(t)+.0722*i(n),o=(e,t)=>{let n=a(e),r=a(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)},s=4.5,c=[{key:`high`,label:`High emphasis`,alpha:.87},{key:`medium`,label:`Medium emphasis`,alpha:.6},{key:`disabled`,label:`Disabled`,alpha:.38}],l=[{key:`white`,name:`Surface: white`,bg:`#FFFFFF`,opacityInk:`#000000`,tokens:{high:`#14171C`,medium:`#4A505C`,disabled:`#9AA0AC`},ratioInk:`#14171C`},{key:`brand`,name:`Surface: brand`,bg:`#3E56C4`,opacityInk:`#FFFFFF`,tokens:{high:`#FFFFFF`,medium:`#E2E7FD`,disabled:`#9AA6E8`},ratioInk:`#FFFFFF`}],u=`opacity`;function d(i){let a=(e,t)=>{let n=e.key===`brand`&&t.key===`medium`;return`
      <div class="sp-row" data-part="row-${e.key}-${t.key}" style="height: 36px; gap: 8px">
        <span data-part="text-${e.key}-${t.key}" ${n?`data-subject data-pose="[data-technique=opacity]"`:``}
              style="flex: 0 0 auto; font-size: 12px; white-space: nowrap">${t.label}</span>
        <span class="sp-grow"></span>
        <span class="sp-row" style="gap: 4px; flex: 0 0 auto; color: ${e.ratioInk}">
          <span data-part="ratio-${e.key}-${t.key}" style="font-size: 11px; font-variant-numeric: tabular-nums"></span>
          <span data-part="mark-${e.key}-${t.key}" style="display: flex; width: 16px"></span>
        </span>
      </div>`};i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 13px 18px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Built from" data-term="opacity" data-part="segmented" data-value="${u}">
            <button class="sp-segment" data-part="seg-opacity" value="opacity">Opacity</button>
            <button class="sp-segment" data-part="seg-tokens" value="tokens">Tokens</button>
          </sp-segmented>
        </div>

        <div class="sp-row" data-part="cards" style="gap: 12px; margin-top: 10px; align-items: flex-start">
          ${l.map(e=>`
    <div ${e.key===`white`?`class="sp-context"`:``} data-part="card-${e.key}" data-technique="${u}"
         style="flex: 0 0 202px; height: 150px; padding: 11px 13px; border-radius: 10px; background: ${e.bg};
                box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.35)">
      <div style="font-size: 10.5px; font-weight: 600; height: 18px; color: ${e.ratioInk}; opacity: 0.7">${e.name}</div>
      ${c.map(t=>a(e,t)).join(``)}
    </div>`).join(``)}
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin: 10px 0 0; height: 46px; font-size: 10.5px; line-height: 1.4">
          Each ratio is measured against the surface that run is painted on, alpha composited first. AA asks 4.5:1 of
          body text; disabled text is exempt, so it is marked rather than failed.
        </p>
      </div>
    </div>
  `;let d=a=>{let u=a===`tokens`;for(let d of l){let l=n(d.bg);e(i,`card-${d.key}`).dataset.technique=a;for(let f of c){let c=u?d.tokens[f.key]:d.opacityInk,p=u?1:f.alpha,m=e(i,`text-${d.key}-${f.key}`);m.style.color=c,m.style.opacity=String(p),m.dataset.technique=a;let h=o(r(n(c),l,p),l),g=f.key===`disabled`?`exempt`:h>=s?`pass`:`fail`;e(i,`row-${d.key}-${f.key}`).dataset.verdict=g,e(i,`ratio-${d.key}-${f.key}`).textContent=`${h.toFixed(2)}:1`,e(i,`mark-${d.key}-${f.key}`).innerHTML=t(g===`exempt`?`minus`:g===`pass`?`check`:`alert`)}}};d(u),e(i,`segmented`).addEventListener(`change`,e=>d(e.detail))}export{d as mount};