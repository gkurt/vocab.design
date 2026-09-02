import{o as e}from"./touch.Bg97t8LB.js";import{n as t}from"./parts.C-YLuC7Q.js";import{t as n}from"./motion.B5_YXmsy.js";var r={w:292,h:148},i=118,a=130,o=.42,s=.82,c=40,l=.06,u=1e3,d={top:26,right:24,bottom:26,left:24},f={rest:{say:`Under the peek mark: nothing has fired`,name:`Nothing lifted`,box:d},peek:{say:`Past the peek mark: the preview lifts`,name:`Peek`,box:d},pop:{say:`Past the pop mark: the message opens fully`,name:`Popped open`,box:{top:6,right:6,bottom:6,left:6}}},p=[{key:`peek`,at:o,name:`peek`,label:`Peek`},{key:`pop`,at:s,name:`pop`,label:`Pop`}],m=[{key:`ana`,name:`Ana Ruiz`,line:78},{key:`dana`,name:`Dana Okafor`,line:88},{key:`ops`,name:`Ops standup`,line:64}],h=`dana`,g=({key:e,name:t,line:n})=>{let r=e===h,i=`data-part="${r?`target`:`row-${e}`}"${r?` data-subject`:``} data-stage="rest" role="button" tabindex="0"`;return`
    <div class="sp-list-item${r?``:` sp-context`}" ${i} style="display: block; padding: 6px 8px; touch-action: none; transition: transform 0.18s var(--sp-ease), background-color 0.18s ease">
      <span class="sp-text sp-text--ink" style="display: block; font-size: 12px; font-weight: 500; line-height: 1.3">${t}</span>
      <span class="sp-line" style="display: block; width: ${n}px; margin-top: 4px"></span>
    </div>`},_=({key:e,at:t,label:n})=>`
  <span
    data-part="mark-${e}"
    style="position: absolute; left: 0; bottom: calc(${(t*100).toFixed(0)}% - 1px); display: flex; align-items: center; width: 26px; height: 2px"
  >
    <span style="flex: 0 0 14px; height: 2px; background: var(--sp-surface)"></span>
    <span data-part="tick-${e}" style="flex: 1 1 auto; height: 2px; border-radius: 1px; background: var(--sp-line)"></span>
  </span>
  <span
    class="sp-label"
    data-part="mark-${e}-label"
    style="position: absolute; left: 30px; bottom: calc(${(t*100).toFixed(0)}% - 7px); font-size: 11px; white-space: nowrap"
  >${n} ${t.toFixed(2)}</span>
`;function v(v,y){v.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-touch style="height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Mail</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px">
          <div class="sp-row" style="gap: 10px; align-items: flex-start">
            <div
              class="sp-surface"
              data-part="scene"
              style="flex: 0 0 auto; display: flex; width: ${r.w}px; height: ${r.h}px; overflow: hidden"
            >
              <div class="sp-list" style="flex: 0 0 ${i}px; padding: 6px; border-right: 1px solid var(--sp-line)">
                ${m.map(g).join(``)}
              </div>

              <div style="position: relative; flex: 1 1 auto; min-width: 0; background: var(--sp-sunken)">
                <span
                  class="sp-label"
                  data-part="idle"
                  style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding: 0 16px; text-align: center; line-height: 1.4; transition: opacity 0.18s"
                >No message selected</span>

                <div
                  class="sp-surface"
                  data-part="preview"
                  data-stage="rest"
                  style="position: absolute; top: ${d.top}px; right: ${d.right}px; bottom: ${d.bottom}px; left: ${d.left}px; display: flex; flex-direction: column; gap: 6px; padding: 10px; overflow: hidden; box-shadow: var(--sp-shadow); opacity: 0; visibility: hidden; transition: top 0.22s var(--sp-ease), right 0.22s var(--sp-ease), bottom 0.22s var(--sp-ease), left 0.22s var(--sp-ease), opacity 0.18s, visibility 0.18s"
                >
                  <span class="sp-label" data-part="stage-name" style="font-size: 11px">${f.peek.name}</span>
                  <span class="sp-heading" data-part="preview-name" style="font-size: 13px; white-space: nowrap">Dana Okafor</span>
                  <span class="sp-line" style="display: block; width: 100%"></span>
                  <span class="sp-line" style="display: block; width: 74%"></span>
                  <div
                    class="sp-row"
                    data-part="actions"
                    style="position: absolute; left: 10px; right: 10px; bottom: 10px; gap: 6px; opacity: 0; visibility: hidden; transition: opacity 0.18s, visibility 0.18s"
                  >
                    <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="reply">Reply</button>
                    <button class="sp-button sp-button--sm" type="button" data-part="archive">Archive</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="sp-stack sp-context" style="width: ${a}px; height: ${r.h}px; gap: 6px">
              <div class="sp-row sp-row--between">
                <span class="sp-label">Force</span>
                <span class="sp-heading" data-part="value" style="font-size: 15px; font-variant-numeric: tabular-nums">0.00</span>
              </div>
              <div style="position: relative; flex: 1 1 auto">
                <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 14px; border-radius: 999px; background: var(--sp-sunken); overflow: hidden">
                  <div
                    data-part="fill"
                    style="position: absolute; left: 0; right: 0; bottom: 0; height: 0%; border-radius: 999px; background: var(--sp-accent); transition: height 0.09s linear"
                  ></div>
                </div>
                ${p.map(_).join(``)}
              </div>
            </div>
          </div>

          <div class="sp-row sp-context" style="width: ${r.w+10+a}px">
            <span class="sp-text" data-part="readout" style="height: 16px; font-size: 12px; white-space: nowrap">${f.rest.say}</span>
          </div>
        </div>
      </div>
    </div>
  `;let b=m.map(e=>({...e,el:t(v,e.key===h?`target`:`row-${e.key}`)})),x=t(v,`preview`),S=t(v,`preview-name`),C=t(v,`actions`),w=t(v,`idle`),T=t(v,`stage-name`),E=t(v,`readout`),D=t(v,`value`),O=t(v,`fill`),k=p.map(e=>({...e,bar:t(v,`mark-${e.key}`),tick:t(v,`tick-${e.key}`),label:t(v,`mark-${e.key}-label`)})),A=n(v),j=0,M=`rest`,N=b.find(e=>e.key===h),P=!1,F,I,L=e=>{E.textContent=e,y.clearTimeout(I),I=y.setTimeout(()=>{E.textContent=f[M].say},u)},R=e=>{E.dataset.last=e.key,L(`Haptic tick at the ${e.name} mark`),A||e.bar.animate([{scale:`1 1`},{scale:`1.15 3`},{scale:`1 1`}],{duration:260,easing:`ease-out`})},z=e=>{if(e===M)return;M=e;let{name:t,box:n}=f[e],r=e!==`rest`,i=e===`pop`;N.el.dataset.stage=e,N.el.style.transform=e===`rest`?`none`:i?`scale(0.94)`:`scale(0.97)`,N.el.style.backgroundColor=r?`var(--sp-accent-soft)`:`transparent`,x.dataset.stage=e,x.style.top=`${n.top}px`,x.style.right=`${n.right}px`,x.style.bottom=`${n.bottom}px`,x.style.left=`${n.left}px`,x.style.opacity=r?`1`:`0`,x.style.visibility=r?`visible`:`hidden`,T.textContent=t,C.style.opacity=i?`1`:`0`,C.style.visibility=i?`visible`:`hidden`,w.style.opacity=r?`0`:`1`,L(f[e].say)},B=e=>{let t=j;j=Math.round(Math.min(1,Math.max(0,e))*100)/100,D.textContent=j.toFixed(2),O.style.height=`${(j*100).toFixed(0)}%`;for(let e of k){let n=j>=e.at;e.tick.style.background=n?`var(--sp-ink)`:`var(--sp-line)`,e.label.style.color=n?`var(--sp-ink)`:`var(--sp-muted)`,n&&t<e.at&&R(e)}j>=s&&(P=!0),z(P?`pop`:j>=o?`peek`:`rest`)},V=()=>{F=void 0,B(j-l),j>0&&(F=y.setTimeout(V,c))},H=()=>{if(y.clearTimeout(F),F=void 0,j!==0){if(A)return B(0);F=y.setTimeout(V,c)}};for(let t of b)e(t.el,y,{onForce:e=>{y.clearTimeout(F),F=void 0,N!==t&&(P=!1,B(0),N=t,S.textContent=t.name),B(e)},onEnd:e=>{P?L(`Released past the pop: the panel stays open`):e>=o&&L(`Released before the pop mark: the peek settles back`),H()}});let U=e=>{P=!1,y.clearTimeout(F),F=void 0,B(0),z(`rest`),L(e)};t(v,`reply`).addEventListener(`click`,()=>U(`Reply opened, and the press is released`)),t(v,`archive`).addEventListener(`click`,()=>U(`Archived, and the press is released`)),z(`rest`),B(0)}export{v as mount};