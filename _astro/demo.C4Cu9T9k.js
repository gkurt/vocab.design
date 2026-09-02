import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=(e,t)=>Number.parseInt(e.slice(t,t+2),16)/255,n=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,r=e=>.2126*n(t(e,1))+.7152*n(t(e,3))+.0722*n(t(e,5)),i=e=>e>.008856?116*Math.cbrt(e)-16:903.3*e,a=[{key:`white`,name:`White`,hex:`#FFFFFF`},{key:`green`,name:`Green`,hex:`#00FF00`},{key:`grey`,name:`Grey 50%`,hex:`#808080`},{key:`red`,name:`Red`,hex:`#FF0000`},{key:`blue`,name:`Blue`,hex:`#0000FF`}],o=[{key:`y`,label:`Luminance Y`,ticks:[`0`,`0.25`,`0.5`,`0.75`,`1`],at:e=>r(e),read:e=>`Y ${r(e).toFixed(3)}`,note:`Grey 50% lands near a fifth of the way along, on top of pure red. Half the channel value is nowhere near half the light.`},{key:`lstar`,label:`Lightness L*`,ticks:[`0`,`25`,`50`,`75`,`100`],at:e=>i(r(e))/100,read:e=>`L* ${i(r(e)).toFixed(1)}`,note:`The same five colours rescaled to perception. Grey 50% now sits in the middle, which is the number a person would have guessed.`}],s=`y`,c=`repeating-linear-gradient(to right, var(--sp-line) 0 1px, transparent 1px 25%),
               linear-gradient(to left, var(--sp-line) 0 1px, transparent 1px)`;function l(t){let n=o.find(e=>e.key===s)??o[0];if(!n)return;let r=n.ticks.map((e,t)=>{let r=t===0?`0`:t===n.ticks.length-1?`-100%`:`-50%`;return`<span class="sp-text" data-part="tick-${t}"
                    style="position: absolute; left: ${t*25}%; transform: translateX(${r});
                           font-size: 10px; line-height: 1">${e}</span>`}).join(``),i=a.map(e=>`
      <div class="sp-row" style="gap: 10px; height: 22px">
        <span class="sp-text" style="flex: 0 0 58px; font-size: 11px; color: var(--sp-ink)">${e.name}</span>
        <span style="position: relative; flex: 1 1 auto; height: 20px; background-image: ${c}">
          <span class="sp-swatch" data-part="chip-${e.key}"
                style="position: absolute; top: 2px; left: ${(n.at(e.hex)*100).toFixed(2)}%; width: 16px; height: 16px;
                       transform: translateX(-50%); border-radius: 4px; transition: left 0.35s var(--sp-ease);
                       box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.5); --sp-swatch: ${e.hex}"></span>
        </span>
        <span class="sp-text" data-part="value-${e.key}"
              style="flex: 0 0 52px; text-align: right; font-size: 11px; font-variant-numeric: tabular-nums">${n.read(e.hex)}</span>
      </div>`).join(``);t.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 448px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="${s}" data-axis="Scale" data-term="y">
            ${o.map(e=>`<button class="sp-segment" data-part="seg-${e.key}" value="${e.key}">${e.label}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div data-part="scale" data-subject data-pose="[data-axis=y]" data-axis="${s}"
             style="margin-top: 12px; padding: 8px 10px 10px; border-radius: var(--sp-radius);
                    border: 1px solid var(--sp-line); background: var(--sp-surface)">
          <div class="sp-row" style="gap: 10px; height: 14px">
            <span style="flex: 0 0 58px"></span>
            <span data-part="ticks" style="position: relative; flex: 1 1 auto; height: 12px">${r}</span>
            <span style="flex: 0 0 52px"></span>
          </div>
          ${i}
        </div>

        <div class="sp-row sp-context" style="margin-top: 10px">
          <span class="sp-text" style="font-size: 11px; color: var(--sp-ink)">Y = 0.2126 R + 0.7152 G + 0.0722 B</span>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="note"
           style="margin: 7px 0 0; height: 30px; font-size: 11px; line-height: 1.4">${n.note}</p>
      </div>
    </div>
  `;let l=e(t,`scale`),u=e(t,`note`),d=n=>{let r=o.find(e=>e.key===n);if(r){l.dataset.axis=n,r.ticks.forEach((n,r)=>{e(t,`tick-${r}`).textContent=n});for(let n of a)e(t,`chip-${n.key}`).style.left=`${(r.at(n.hex)*100).toFixed(2)}%`,e(t,`value-${n.key}`).textContent=r.read(n.hex);u.textContent=r.note}};d(s),e(t,`segmented`).addEventListener(`change`,e=>d(e.detail))}export{l as mount};