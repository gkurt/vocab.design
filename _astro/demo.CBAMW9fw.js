import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var r=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,i=e=>{let[t,n,i]=[1,3,5].map(t=>r(Number.parseInt(e.slice(t,t+2),16)/255));return .2126*(t??0)+.7152*(n??0)+.0722*(i??0)},a=(e,t)=>{let n=i(e),r=i(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)},o=3,s=[{key:`light`,name:`Light`,surface:`#FFFFFF`,line:`#DDE1E8`,thumb:`#7E8698`,track:`#EDEFF3`,note:`Close to what the browser would have drawn on its own, which is the case for declaring color-scheme and stopping there.`},{key:`dark`,name:`Dark`,surface:`#23272F`,line:`#464E5C`,thumb:`#7A8394`,track:`#2C313A`,note:`A dark panel inside a light page: the browser cannot know what the bar is sitting on, so the pair is stated.`},{key:`brand`,name:`Brand`,surface:`#FFFFFF`,line:`#DDE1E8`,thumb:`#A9B6FB`,track:`#EDF0FE`,note:`The common failure: a brand tint the eye reads as a decorated gutter rather than as something to grab.`}],c=`light`,l=24,u=e=>s.find(t=>t.key===e)??s[0];function d(r){let i=[100,86,94,72,100,90,66,98,82,100,76,92,100,88,70,96,84,100,74,90],d=i.map((e,t)=>`<span class="sp-line" data-part="line-${t}" style="flex: 0 0 8px; width: ${e}%"></span>`).join(``),f=(e,t)=>`
    <div class="sp-row" style="gap: 6px; height: 18px">
      <span class="sp-label" style="flex: 0 0 38px">${t}</span>
      <span class="sp-swatch" data-part="chip-${e}" style="flex: 0 0 22px; height: 13px;
            box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.4)"></span>
      <span class="sp-text" data-part="hex-${e}" style="font-size: 9.5px; font-variant-numeric: tabular-nums"></span>
    </div>`;r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="${c}" data-axis="Theme">
            ${s.map(e=>`<button class="sp-segment" data-part="seg-${e.key}" value="${e.key}">${e.name}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 14px; margin-top: 11px; align-items: flex-start">
          <div class="sp-stack" style="flex: 0 0 252px; gap: 4px">
            <div data-part="scroller" data-subject data-mode="${c}" data-verdict="pass"
                 style="display: flex; height: 150px; border-radius: 6px; overflow: hidden;
                        box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.5)">
              <div class="sp-stack" data-part="viewport" tabindex="0" aria-label="Release notes"
                   style="flex: 1 1 auto; min-width: 0; gap: 9px; padding: 10px; overflow-y: scroll;
                          scrollbar-width: none; overscroll-behavior: contain">
                ${d}
              </div>
              <div data-part="bar" style="position: relative; flex: 0 0 14px; padding: 3px">
                <div data-part="track" style="position: relative; height: 100%">
                  <div data-part="thumb" style="position: absolute; left: 0; top: 0; width: 8px; height: ${l}px;
                       border-radius: 999px; cursor: grab"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 0; min-width: 0; gap: 4px">
            ${f(`thumb`,`Thumb`)}
            ${f(`track`,`Track`)}
            <span class="sp-text sp-text--ink" data-part="declaration"
                  style="margin-top: 6px; height: 28px; font-size: 9.5px; line-height: 1.45; font-variant-numeric: tabular-nums"></span>
            <span class="sp-row" style="gap: 5px; height: 18px">
              <span class="sp-text" data-part="ratio" style="font-size: 9.5px; font-variant-numeric: tabular-nums"></span>
              <span data-part="mark" style="flex: 0 0 14px; display: flex"></span>
            </span>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin: 8px 0 0; height: 28px; font-size: 10px; line-height: 1.4"></p>
      </div>
    </div>
  `;let p=e(r,`scroller`),m=e(r,`viewport`),h=e(r,`bar`),g=e(r,`track`),_=e(r,`thumb`),v=()=>Math.max(m.scrollHeight-m.clientHeight,0),y=()=>{let e=g.clientHeight,n=v(),r=Math.max(l,Math.round(e*(m.clientHeight/m.scrollHeight))),i=n>0?m.scrollTop/n:0;_.style.height=`${r}px`,_.style.top=`${Math.round(i*(e-r))}px`,t(p,`data-scrolled`,m.scrollTop>8)};m.addEventListener(`scroll`,y);let b=t=>{let s=u(t);if(!s)return;let c=a(s.thumb,s.track),l=c>=o;p.dataset.mode=s.key,p.dataset.verdict=l?`pass`:`low`,m.style.background=s.surface;for(let t=0;t<i.length;t++)e(r,`line-${t}`).style.background=s.line;h.style.background=s.track,_.style.background=s.thumb,e(r,`chip-thumb`).style.setProperty(`--sp-swatch`,s.thumb),e(r,`chip-track`).style.setProperty(`--sp-swatch`,s.track),e(r,`hex-thumb`).textContent=s.thumb,e(r,`hex-track`).textContent=s.track,e(r,`declaration`).textContent=`scrollbar-color: ${s.thumb} ${s.track}`,e(r,`ratio`).textContent=`${c.toFixed(2)}:1 ${l?`clears`:`under`} ${o}:1`,e(r,`mark`).innerHTML=n(l?`check`:`alert`),e(r,`caption`).textContent=s.note};b(c),y(),e(r,`segmented`).addEventListener(`change`,e=>b(e.detail))}export{d as mount};