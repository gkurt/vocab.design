import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n=`#f7f4ea`,r=`#1ba5dc`,i=`#00e5ff`,a=e=>[1,3,5].map(t=>Number.parseInt(e.slice(t,t+2),16)),o=e=>`#${e.map(e=>Math.round(e).toString(16).padStart(2,`0`)).join(``)}`,s=((...e)=>o(e.map(a).reduce((e,t)=>e.map((e,n)=>e*(t[n]??0)/255))))(n,r),c=[{key:`cyan`,name:`Cyan`,paint:`background-image:
      linear-gradient(to bottom,
        rgb(27 165 220 / 0.4) 0 12%,
        rgb(27 165 220 / 0.12) 32%,
        rgb(27 165 220 / 0.03) 50%,
        rgb(27 165 220 / 0.42) 56%,
        rgb(27 165 220 / 0.68) 78%,
        rgb(27 165 220 / 0.88) 100%)`},{key:`magenta`,name:`Magenta`,paint:`background-image:
      linear-gradient(to bottom,
        rgb(222 46 140 / 0.05) 0%,
        rgb(222 46 140 / 0.3) 30%,
        rgb(222 46 140 / 0.5) 48%,
        rgb(222 46 140 / 0.14) 57%,
        rgb(222 46 140 / 0.2) 76%,
        rgb(222 46 140 / 0.05) 100%)`},{key:`yellow`,name:`Yellow`,paint:`background-image:
      radial-gradient(circle 66px at 32% 30%,
        rgb(251 233 74 / 0.95) 0 20%,
        rgb(251 233 74 / 0.6) 20% 44%,
        rgb(251 233 74 / 0.24) 44% 72%,
        rgb(251 233 74 / 0.05) 72% 100%),
      linear-gradient(to bottom,
        rgb(251 233 74 / 0.26) 0 38%,
        rgb(251 233 74 / 0.06) 52%,
        rgb(251 233 74 / 0) 58%)`},{key:`key`,name:`Key`,paint:`background-image:
      linear-gradient(to bottom,
        rgb(17 17 17 / 0) 0 53%,
        rgb(17 17 17 / 0.5) 53% 55%,
        rgb(17 17 17 / 0) 55% 80%,
        rgb(17 17 17 / 0.12) 90%,
        rgb(17 17 17 / 0.26) 100%);
      box-shadow: inset 0 0 0 1px rgb(17 17 17 / 0.34)`}],l={all:`Four plates in register. Every ink only ever subtracts, so wherever two of them overlap the sheet gets darker, never brighter.`,cyan:`The cyan plate alone. Density is the only variable a plate has: more ink, less paper showing back through it.`,magenta:`The magenta plate alone. On press this is one pass of one ink, and it can darken the paper but never lighten it.`,yellow:`The yellow plate alone, the weakest absorber of the three, which is why it reads as light rather than as colour.`,key:`The key plate alone: the horizon rule, the keyline and the silhouette. The three colour plates register against this one.`};function u(r){let a=c.map(e=>`
      <span data-part="plate-${e.key}" aria-hidden="true"
            style="position: absolute; inset: 0; mix-blend-mode: multiply; transition: opacity 0.2s linear; ${e.paint}"></span>`).join(``),o=(e,t,n)=>`
    <div class="sp-stack" style="flex: 0 0 auto; gap: 2px">
      <span class="sp-label" style="font-size: 9px; line-height: 1.2">${t}</span>
      <span class="sp-swatch" data-part="${e}" style="width: 54px; height: 20px; --sp-swatch: ${n}"></span>
      <span class="sp-text" data-part="${e}-hex"
            style="font-size: 8.5px; line-height: 1.2; font-variant-numeric: tabular-nums">${n}</span>
    </div>`;r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 13px 18px">
        <sp-segmented data-stage-mode class="sp-segmented" data-axis="Plate" data-term="all" data-part="segmented" data-value="all">
            ${c.map(e=>`<button class="sp-segment" data-part="seg-${e.key}" value="${e.key}">${e.name}</button>`).join(``)}
            <button class="sp-segment" data-part="seg-all" value="all">All</button>
          </sp-segmented>

        <div data-part="sheet" style="margin-top: 10px; height: 124px; padding: 9px; border-radius: 2px;
             background: ${n}; box-shadow: 0 0 0 1px rgb(120 110 84 / 0.28)">
          <span data-part="stack" data-subject data-pose="[data-mode=all]" data-mode="all"
                style="position: relative; display: block; height: 100%; isolation: isolate; background: ${n}">
            ${a}
            <span data-part="sail" aria-hidden="true"
                  style="position: absolute; left: 288px; top: 25px; width: 22px; height: 32px;
                         mix-blend-mode: multiply; transition: opacity 0.2s linear;
                         background: rgb(17 17 17 / 0.82); clip-path: polygon(0 0, 0 100%, 100% 100%)"></span>
            <span data-part="hull" aria-hidden="true"
                  style="position: absolute; left: 280px; top: 57px; width: 38px; height: 5px;
                         mix-blend-mode: multiply; transition: opacity 0.2s linear;
                         background: rgb(17 17 17 / 0.78); border-radius: 0 0 4px 4px"></span>
          </span>
        </div>

        <div class="sp-row sp-context" data-part="gamut"
             style="gap: 14px; justify-content: center; margin-top: 10px; padding: 7px 11px; border-radius: 6px; background: var(--sp-sunken)">
          ${o(`screen`,`Screen`,i)}
          <span data-part="warn" style="display: inline-flex; flex: 0 0 auto; align-items: center; gap: 4px;
                color: var(--sp-warn); font-size: 9px; line-height: 1.2">
            ${t(`alert`)}<span>outside<br>CMYK</span>
          </span>
          ${o(`printed`,`Ink`,s)}
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="note"
           style="margin: 8px 0 0; height: 30px; font-size: 10px; line-height: 1.4">${l.all}</p>
      </div>
    </div>
  `;let u=e(r,`stack`),d=e(r,`note`),f=e(r,`sail`),p=e(r,`hull`),m=t=>{u.dataset.mode=t;for(let n of c){let i=t===`all`||t===n.key;e(r,`plate-${n.key}`).style.opacity=i?`1`:`0`}let n=t===`all`||t===`key`;for(let e of[f,p])e.style.opacity=n?`1`:`0`;d.textContent=l[t]??l.all??``};m(`all`),e(r,`segmented`).addEventListener(`change`,e=>m(e.detail))}export{u as mount};