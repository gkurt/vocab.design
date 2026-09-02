import{n as e}from"./parts.C-YLuC7Q.js";var t=[{key:`a`,hex:`#1D63D2`,pos:0},{key:`b`,hex:`#C0459B`,pos:50},{key:`c`,hex:`#F2B23A`,pos:100}],n=[25,50,75],r=10,i=(e,t,n)=>Math.min(n,Math.max(t,e)),a=e=>Math.round(e/5)*5;function o(o){let s=t.map(e=>({...e}));o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Stops</span>
          <span class="sp-text sp-text--ink" data-part="readout" style="width: 150px; text-align: right; font-size: 12px">&nbsp;</span>
        </div>

        <div style="margin-top: 12px">
          <div data-part="strip" style="height: 64px; border-radius: var(--sp-radius)"></div>
          <div data-part="rail" style="position: relative; height: 24px; margin-top: 14px">${s.map(({key:e,hex:t,pos:n})=>`
      <button data-part="stop-${e}" data-pos="${n}" ${e===`b`?`data-subject`:``} type="button" aria-label="Stop ${e}"
              style="position: absolute; left: ${n}%; top: -20px; translate: -50% 0; display: flex; flex-direction: column;
                     align-items: center; gap: 0; padding: 0; border: 0; background: transparent; cursor: grab; touch-action: none">
        <span style="width: 2px; height: 18px; background: var(--sp-ink)"></span>
        <span data-part="knob-${e}"
              style="width: 18px; height: 18px; border-radius: 50%; border: 2px solid var(--sp-surface);
                     box-shadow: 0 0 0 1px var(--sp-ink); background: ${t}"></span>
      </button>`).join(``)}</div>
          <div class="sp-context" style="position: relative; height: 14px">${n.map(e=>`
      <span class="sp-label" data-part="tick-${e}" style="position: absolute; left: ${e}%; translate: -50% 0; font-size: 11px">${e}%</span>`).join(``)}</div>
        </div>

      </div>
    </div>
  `;let c=e(o,`strip`),l=e(o,`rail`),u=e(o,`readout`),d=s.map(t=>({stop:t,el:e(o,`stop-${t.key}`)})),f=`b`,p=()=>{c.style.background=`linear-gradient(90deg, ${s.map(e=>`${e.hex} ${e.pos}%`).join(`, `)})`;for(let{stop:t,el:n}of d)n.style.left=`${t.pos}%`,n.dataset.pos=String(t.pos),t.key===f?n.setAttribute(`data-selected`,``):n.removeAttribute(`data-selected`),e(o,`knob-${t.key}`).style.boxShadow=t.key===f?`0 0 0 2px var(--sp-ink)`:`0 0 0 1px var(--sp-ink)`;let t=s.find(e=>e.key===f);u.textContent=t?`${t.hex} at ${t.pos}%`:``};p();let m,h=e=>{let t=m;if(!t)return;let n=l.getBoundingClientRect();if(n.width===0)return;let o=s.indexOf(t),c=o===0?0:(s[o-1]?.pos??0)+r,u=o===s.length-1?100:(s[o+1]?.pos??100)-r;t.pos=i(a((e.clientX-n.left)/n.width*100),c,u),p()};for(let{stop:e,el:t}of d)t.addEventListener(`pointerdown`,n=>{f=e.key,m=e,n.isTrusted&&t.setPointerCapture(n.pointerId),p(),h(n)});o.addEventListener(`pointermove`,h);let g=()=>{m=void 0};o.addEventListener(`pointerup`,g),o.addEventListener(`pointercancel`,g)}export{o as mount};