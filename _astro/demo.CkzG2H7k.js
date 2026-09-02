import{n as e,t}from"./parts.C-YLuC7Q.js";var n=18,r=18,i=3,a=21,o=17,s=Array.from({length:n},(e,t)=>`<span
       data-cell="${t}"
       style="flex: 0 0 auto; width: ${r}px; height: 26px; border-radius: 4px; background: var(--sp-sunken); transition: background-color 0.1s linear"
     ></span>`).join(``);function c(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 230px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Line editor</span>
          <span
            class="sp-text"
            data-part="readout"
            data-source="none"
            style="width: 218px; text-align: right; white-space: nowrap; font-variant-numeric: tabular-nums"
          >No repeats yet</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 14px">
          <div
            class="sp-surface"
            data-part="track"
            data-subject
            data-index="0"
            data-phase="idle"
            role="application"
            aria-label="Line editor track: hold ArrowRight to repeat"
            tabindex="0"
            style="position: relative; display: flex; gap: ${i}px; padding: 8px; overflow: hidden"
          >
            ${s}
            <span
              data-part="caret"
              style="position: absolute; left: 6px; top: 6px; width: 3px; height: 30px; border-radius: 2px; background: var(--sp-accent); transform: translateX(0px); transition: transform 0.07s linear"
            ></span>
          </div>
          <div class="sp-stack sp-context" style="gap: 6px">
            <div class="sp-row" style="gap: 6px">
              <span
                data-part="phase-delay"
                style="display: flex; align-items: center; justify-content: center; width: 128px; height: 24px; border-radius: 5px; background: var(--sp-sunken); font-size: 11px; font-weight: 500; color: var(--sp-muted)"
              >Initial delay</span>
              <span
                data-part="phase-rate"
                class="sp-grow"
                style="display: flex; align-items: center; justify-content: center; height: 24px; border-radius: 5px; background: var(--sp-sunken); font-size: 11px; font-weight: 500; color: var(--sp-muted)"
              >Repeat rate</span>
            </div>
          </div>
          <div class="sp-row sp-context" style="gap: 6px">
            <span class="sp-kbd">ArrowRight</span>
            <span class="sp-label">Move by one, hold to repeat</span>
          </div>
        </div>
      </div>
    </div>
  `;let r=e(n,`track`),c=e(n,`caret`),l=e(n,`readout`),u=e(n,`phase-delay`),d=e(n,`phase-rate`),f=[...n.querySelectorAll(`[data-cell]`)],p=0,m=0,h=()=>{for(let[e,t]of f.entries())t.style.background=e<p?`var(--sp-accent-soft)`:`var(--sp-sunken)`;c.style.transform=`translateX(${p*a}px)`,r.dataset.index=String(p)},g=(e,t)=>{e.style.background=t?`var(--sp-accent)`:`var(--sp-sunken)`,e.style.color=t?`var(--sp-accent-ink)`:`var(--sp-muted)`},_=e=>{r.dataset.phase=e,g(u,e===`delay`),g(d,e===`repeating`)},v=(e,t)=>{l.dataset.source=e,l.textContent=t},y=()=>{p=Math.min(o,p+1),h()};n.addEventListener(`keydown`,e=>{if(e.key===`ArrowRight`){if(e.preventDefault(),!e.repeat){m=0,t(r,`data-ran`,!1),p>=o&&(p=-1),y(),_(`delay`),v(`key`,`One press, one step`);return}m+=1,y(),m>=3&&t(r,`data-ran`,!0),_(`repeating`),v(`key`,`Held: 1 press, ${m} repeats`)}}),n.addEventListener(`keyup`,e=>{e.key===`ArrowRight`&&(_(`idle`),m>0&&v(`key`,`Released: 1 press, ${m} repeats`))}),_(`idle`),h()}export{c as mount};