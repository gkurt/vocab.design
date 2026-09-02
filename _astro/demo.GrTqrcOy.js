import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`'Vollkorn', Georgia, serif`,n=30,r=2,i=404,a=`1867`,o=`0123456789`,s=e=>e===`lining`||e===`oldstyle`,c={oldstyle:`The 1 sits on the x-height rule, the 8 and the 6 rise past it, and the 7 hangs below the baseline.`,lining:`Every numeral is drawn to one height, and the number reads as capitals dropped into the sentence.`};function l(l){let u=(e,t,n,a=!1)=>`<span data-part="${e}" style="position: absolute; left: 0; width: ${i}px; height: ${r}px; ${t}; ${a?`border-top: ${r}px dashed ${n}`:`background: ${n}`}"></span>`;l.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="oldstyle" data-axis="Figure style" data-term="oldstyle">
          <button class="sp-segment" data-part="seg-lining" value="lining">lining</button>
          <button class="sp-segment" data-part="seg-oldstyle" value="oldstyle">oldstyle</button>
        </sp-segmented>
        <div style="display: flex; align-items: center; height: 62px; margin-top: 6px">
          <p data-part="sentence" style="margin: 0; font-family: ${t}; font-size: ${n}px; line-height: 1; white-space: nowrap"
            ><i class="sp-context" data-part="rules" style="position: relative; display: inline-block; width: 0; height: 0; vertical-align: baseline">${u(`rule-cap`,`bottom: calc(0.7em - 1px); bottom: calc(1cap - 1px)`,`color-mix(in oklab, var(--sp-accent) 35%, transparent)`)+u(`rule-x`,`bottom: calc(1ex - 1px)`,`color-mix(in oklab, var(--sp-accent) 35%, transparent)`)+u(`rule-base`,`bottom: 0`,`color-mix(in oklab, var(--sp-ink) 22%, transparent)`,!0)}</i
            ><span style="position: relative">In the winter of </span><span data-part="year" data-subject data-pose="[data-figures=oldstyle]"
              data-figures="oldstyle" style="position: relative">${a}</span></p>
        </div>
        <div class="sp-row sp-context" style="margin-top: 4px; height: 40px">
          <span data-part="set" data-figures="oldstyle"
                style="font-family: ${t}; font-size: 22px; letter-spacing: 0.06em">${o}</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 6px">${c.oldstyle}</p>
      </div>
    </div>
  `;let d=e(l,`year`),f=e(l,`set`),p=e(l,`caption`);e(l,`segmented`).addEventListener(`change`,e=>{let t=e.detail;if(s(t)){for(let e of[d,f])e.dataset.figures=t,e.style.fontVariantNumeric=t===`lining`?`lining-nums`:`normal`;p.textContent=c[t]}})}export{l as mount};