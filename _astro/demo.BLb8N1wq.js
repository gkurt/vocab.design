import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n={bg:`#FFFFFF`,mark:`#14161A`,head:`#000000`,body:`#3A3A3A`,safeBg:`#E8ECF4`,safePlate:`#2F57D8`,safeMark:`#FFFFFF`,safeInk:`#0E0E0E`},r={partial:{bg:`#121212`,mark:`#14161A`,head:`#F2F2F2`,body:`#3A3A3A`,safeBg:`#E8ECF4`,safePlate:`#2F57D8`,safeMark:`#FFFFFF`,safeInk:`#0E0E0E`},full:{bg:`#0F1114`,mark:`#14161A`,head:`#EDEFF2`,body:`#C9CCD1`,safeBg:`#262C38`,safePlate:`#2F57D8`,safeMark:`#FFFFFF`,safeInk:`#F0F1F3`}},i={partial:`Grounds flipped and the declared fills kept, so the grey copy stayed dark on a dark ground.`,full:`Every declared colour inverted, so the copy came with it. Image pixels never do, so the bare mark did not.`},a={partial:`Inverted, partial`,full:`Inverted, full`},o=`partial`,s=(e,t)=>Number.parseInt(e.slice(t,t+2),16)/255,c=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,l=e=>.2126*c(s(e,1))+.7152*c(s(e,3))+.0722*c(s(e,5)),u=(e,t)=>{let[n,r]=[l(e),l(t)].sort((e,t)=>t-e);return((n??0)+.05)/((r??0)+.05)},d={"--c-bg":`bg`,"--c-mark":`mark`,"--c-head":`head`,"--c-body":`body`,"--c-safe-bg":`safeBg`,"--c-safe-plate":`safePlate`,"--c-safe-mark":`safeMark`,"--c-safe-ink":`safeInk`},f=e=>Object.entries(d).map(([t,n])=>`${t}: ${e[n]}`).join(`; `),p=e=>`mark ${u(e.mark,e.bg).toFixed(1)}:1 · copy ${u(e.body,e.bg).toFixed(1)}:1`;function m(s){let c=(e,n,r=!1)=>`
    <div class="${r?``:`sp-context `}sp-stack" style="flex: 1 1 0; min-width: 0; gap: 5px">
      <div data-part="${e}" ${r?`data-subject`:``}
           style="${f(n)}; padding: 9px; border-radius: var(--sp-radius);
                  border: 1px solid var(--sp-line); background: var(--c-bg)">
        <div data-part="${e}-bare">
          <div class="sp-row" style="gap: 7px">
            <span style="display: flex; color: var(--c-mark)">${t(`inbox`)}</span>
            <span style="font-size: 11px; font-weight: 600; color: var(--c-head)">Northwind</span>
          </div>
          <p style="margin: 5px 0 0; font-size: 10.5px; line-height: 1.35; color: var(--c-body)">Your March statement is ready.</p>
        </div>
        <div data-part="${e}-plated" style="margin-top: 9px; padding: 7px; border-radius: 6px; background: var(--c-safe-bg)">
          <div class="sp-row" style="gap: 7px">
            <span style="display: flex; align-items: center; justify-content: center; width: 24px; height: 24px;
                         border-radius: 6px; background: var(--c-safe-plate); color: var(--c-safe-mark)">${t(`inbox`)}</span>
            <span style="font-size: 11px; font-weight: 600; color: var(--c-safe-ink)">Northwind</span>
          </div>
          <p style="margin: 5px 0 0; font-size: 10.5px; line-height: 1.35; color: var(--c-safe-ink)">Your March statement is ready.</p>
        </div>
      </div>
      <span class="sp-label" data-part="${e}-name" style="font-size: 10px">${r?a[o]:`As authored`}</span>
      <span class="sp-text" data-part="${e}-reading" style="font-size: 10px">${p(n)}</span>
    </div>`;s.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 440px; padding: 13px 18px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="What the client does" data-value="${o}">
            <button class="sp-segment" data-part="seg-partial" value="partial">Partial invert</button>
            <button class="sp-segment" data-part="seg-full" value="full">Full invert</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 11px; align-items: flex-start">
          ${c(`authored`,n)}
          ${c(`inverted`,r[o]??n,!0)}
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="note" style="margin: 9px 0 0; height: 32px; font-size: 12px; line-height: 1.35">${i[o]}</p>
      </div>
    </div>
  `;let l=e(s,`inverted`),m=e(s,`inverted-name`),h=e(s,`inverted-reading`),g=e(s,`note`),_=e=>{let t=r[e];if(t){l.dataset.mode=e,l.dataset.mark=u(t.mark,t.bg)<3?`lost`:`kept`,l.dataset.copy=u(t.body,t.bg)<3?`lost`:`kept`;for(let[e,n]of Object.entries(d))l.style.setProperty(e,t[n]);m.textContent=a[e]??e,h.textContent=p(t),g.textContent=i[e]??``}};_(o),e(s,`segmented`).addEventListener(`change`,e=>_(e.detail))}export{m as mount};