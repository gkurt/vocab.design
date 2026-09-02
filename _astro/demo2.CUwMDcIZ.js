import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./motion.B5_YXmsy.js";var n=192,r=132,i=40,a=28,o=12,s=128,c=-80,l=900,u=70,d=32,f=120-a/2,p=160,m=26,h=`cubic-bezier(0.4, 0, 0.2, 1)`,g=`cubic-bezier(0, 0, 0.2, 1)`,_=`cubic-bezier(0.8, 0, 0.6, 1)`;function v(v,y){let b=e=>`
    <svg width="${n}" height="${r}" viewBox="0 0 ${n} ${r}" aria-hidden="true" style="display: block">
      <path d="${e}" fill="none" stroke="var(--sp-muted)" stroke-width="1.6" stroke-dasharray="5 5" opacity="0.65" />
      <circle cx="${d}" cy="${f}" r="3" fill="var(--sp-muted)" />
      <circle cx="${p}" cy="${m}" r="3" fill="var(--sp-muted)" />
    </svg>`,x=e=>`
    <span
      class="sp-surface"
      style="display: flex; align-items: center; justify-content: center; width: ${i}px; height: ${a}px;
             border-color: var(--sp-accent); background: var(--sp-accent-soft); font-size: 10px; font-weight: 600"
    >${e}</span>`;v.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" data-part="scene" data-state="rest" style="width: 440px">
        <div class="sp-row sp-context" style="justify-content: flex-end">
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>

        <div class="sp-row" style="gap: 12px; align-items: flex-start; margin-top: 12px">
          <div class="sp-stack sp-context" style="gap: 5px">
            <span class="sp-label sp-text--ink" style="font-size: 11px">Straight</span>
            <div
              data-part="lane-line"
              style="position: relative; width: ${n}px; height: ${r}px; border-radius: 6px;
                     background: var(--sp-sunken); overflow: hidden"
            >
              ${b(`M ${d} ${f} L ${p} ${m}`)}
              <span
                data-part="card-line"
                style="position: absolute; left: ${o}px; top: 92px;
                       translate: 0 0; transition: translate ${l}ms ${h} ${u}ms"
              >${x(`Card`)}</span>
            </div>
          </div>

          <div class="sp-stack" style="gap: 5px">
            <span class="sp-label sp-text--ink" style="font-size: 11px">Arc</span>
            <div
              data-part="lane-arc"
              data-subject
              style="position: relative; width: ${n}px; height: ${r}px; border-radius: 6px;
                     background: var(--sp-sunken); overflow: hidden"
            >
              ${b(`M ${d} ${f} Q ${d} ${m} ${p} ${m}`)}
              <span
                data-part="card-arc-x"
                style="position: absolute; left: ${o}px; top: 92px;
                       transform: translateX(0); transition: transform ${l}ms ${_} ${u}ms"
              ><span
                  data-part="card-arc-y"
                  style="display: block; transform: translateY(0); transition: transform ${l}ms ${g} ${u}ms"
                >${x(`Card`)}</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let S=e(v,`scene`),C=e(v,`card-line`),w=e(v,`card-arc-x`),T=e(v,`card-arc-y`),E,D=e=>{C.style.translate=e?`${s}px ${c}px`:`0 0`,w.style.transform=`translateX(${e?s:0}px)`,T.style.transform=`translateY(${e?c:0}px)`},O=()=>{if(y.clearTimeout(E),t(v)){D(!0),S.dataset.state=`landed`;return}for(let e of[C,w,T])e.style.transition=`none`;D(!1),C.offsetWidth,C.style.transition=`translate ${l}ms ${h} ${u}ms`,w.style.transition=`transform ${l}ms ${_} ${u}ms`,T.style.transition=`transform ${l}ms ${g} ${u}ms`,D(!0),S.dataset.state=`travelling`,E=y.setTimeout(()=>{S.dataset.state=`landed`},1030)};e(v,`replay`).addEventListener(`click`,O),O()}export{v as mount};