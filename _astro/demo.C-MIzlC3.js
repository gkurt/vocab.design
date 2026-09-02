import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{t}from"./motion.B5_YXmsy.js";var n=356,r=62,i=4,a=96,o=286,s=900,c=700,l=[`none`,`forwards`,`backwards`,`both`],u=e=>e===`backwards`||e===`both`,d=e=>e===`forwards`||e===`both`;function f(f,p){let m=l.map(e=>`<button class="sp-segment" data-part="seg-${e}" value="${e}">${e}</button>`).join(``),h=(e,t)=>`
    <span style="position: absolute; left: ${i+e}px; top: 0; bottom: 0; width: 1px; background: var(--sp-line)"></span>
    <span class="sp-label" style="position: absolute; left: ${i+e}px; top: 41px; font-size: 10px">${t}</span>`;f.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" data-part="scene" data-fill="none" data-phase="rest" data-rest="own" style="width: 400px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Animation</span>
          <button class="sp-button sp-button--sm" type="button" data-part="play">Play</button>
        </div>

        <div style="position: relative; width: ${n}px; height: 56px; margin-top: 14px">
          <div
            style="position: absolute; inset: 0 0 18px 0; border-radius: var(--sp-radius); background: var(--sp-sunken)"
          ></div>
          <div class="sp-context">
            ${h(0,`own style`)}
            ${h(a,`first frame`)}
            ${h(o,`last frame`)}
          </div>
          <span
            class="sp-surface"
            data-part="tile"
            data-subject
            style="position: absolute; top: ${i}px; left: ${i}px; display: flex; align-items: center;
                   justify-content: center; width: ${r}px; height: 30px;
                   border-color: var(--sp-accent); background: var(--sp-accent-soft); font-size: 11px;
                   font-weight: 600; transform: translateX(0)"
          >Sheet</span>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 12px; min-height: 20px">
          <span class="sp-label">${s} ms delay, ${c} ms run</span>
          <span class="sp-label sp-text--ink" data-part="readout" style="flex: 0 0 196px; text-align: right">
            idle
          </span>
        </div>

        <div class="sp-row sp-context" style="margin-top: 10px">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="picker" data-axis="Fill" data-value="none">${m}</sp-segmented>
        </div>
      </div>
    </div>
  `;let g=e(f,`scene`),_=e(f,`tile`),v=e(f,`readout`),y=[],b=()=>g.dataset.fill??`none`,x=e=>{if(g.dataset.phase=e,e===`rest`){g.dataset.rest=`own`,v.textContent=`idle`;return}if(e===`delay`){v.textContent=u(b())?`delay, first frame held`:`delay`;return}if(e===`running`){v.textContent=`running`;return}let t=d(b());g.dataset.rest=t?`keyframe`:`own`,v.textContent=t?`finished, last frame held`:`finished`};e(f,`picker`).addEventListener(`change`,e=>{for(let e of _.getAnimations())e.cancel();for(let e of y)p.clearTimeout(e);y.length=0,g.dataset.fill=e.detail,_.style.transform=`translateX(0)`,x(`rest`)}),e(f,`play`).addEventListener(`click`,()=>{for(let e of y)p.clearTimeout(e);y.length=0;for(let e of _.getAnimations())e.cancel();if(t(f)){_.style.transform=`translateX(${d(b())?o:0}px)`,x(`after`);return}_.style.transform=`translateX(0)`,g.dataset.rest=`own`,x(`delay`),_.animate([{transform:`translateX(${a}px)`},{transform:`translateX(${o}px)`}],{delay:s,duration:c,easing:`cubic-bezier(0.2, 0, 0, 1)`,fill:b()}),y.push(p.setTimeout(()=>x(`running`),s)),y.push(p.setTimeout(()=>x(`after`),1640))})}export{f as mount};