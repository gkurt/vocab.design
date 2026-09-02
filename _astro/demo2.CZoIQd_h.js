import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{t}from"./motion.B5_YXmsy.js";var n=1600,r=9,i={from:96,to:216},a={from:[74,99,231],to:[190,88,58]},o=40,s={min:10,max:34},c=e=>e/8,l=(e,t,n)=>e+(t-e)*n,u=e=>`rgb(${e[0]}, ${e[1]}, ${e[2]})`,d=e=>a.from.map((t,n)=>Math.round(l(t,a.to[n]??t,e)));function f(f,p){let m=e=>`
    <span
      data-part="tile-${e+1}"
      style="position: relative; display: flex; align-items: flex-end; justify-content: center; flex: 0 0 auto;
             width: ${o}px; height: ${o}px; border: 1px solid var(--sp-line); border-radius: 5px;
             background: var(--sp-surface); overflow: hidden"
    >
      <span
        data-part="bar-${e+1}"
        style="width: 18px; height: ${s.min}px; border-radius: 3px 3px 0 0; background: var(--sp-accent)"
      ></span>
      <span
        data-part="glyph-${e+1}"
        hidden
        style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
               font-size: 17px; font-weight: 600"
      >a</span>
    </span>`;f.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="scene" data-mode="number" data-state="rested" style="height: 284px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Property</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Value type" data-part="mode" data-value="number">
            <button class="sp-segment" type="button" data-part="seg-number" value="number">Number</button>
            <button class="sp-segment" type="button" data-part="seg-color" value="color">Colour</button>
            <button class="sp-segment" type="button" data-part="seg-keyword" value="keyword">Keyword</button>
          </sp-segmented>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px">
          <div data-part="lane" style="position: relative; width: 400px; height: 52px">
            <div
              data-part="card"
              data-subject
              style="position: absolute; left: 0; top: 4px; display: flex; align-items: center; width: ${i.to}px;
                     height: 44px; padding: 0 14px; border-radius: 8px; background: var(--sp-accent); color: var(--sp-accent-ink);
                     font-size: 15px; font-weight: 600; letter-spacing: 0.01em; white-space: nowrap; overflow: hidden"
            >handoff</div>
          </div>

          <div class="sp-stack sp-context" style="gap: 4px; width: 400px">
            <div class="sp-row" data-part="track" style="gap: 5px">
              ${Array.from({length:r},(e,t)=>m(t)).join(``)}
            </div>
            <div class="sp-row sp-row--between">
              <span class="sp-label" style="font-size: 11px">0%</span>
              <span class="sp-label" style="font-size: 11px">50%</span>
              <span class="sp-label" style="font-size: 11px">100%</span>
            </div>
          </div>

          <div class="sp-stack sp-context" data-part="readout" style="gap: 2px; width: 400px; height: 56px">
            <span class="sp-label" data-part="property" style="font-size: 11px">width</span>
            <span class="sp-text sp-text--ink" data-part="claim" style="font-size: 12px; line-height: 1.35">${i.from}px to ${i.to}px</span>
          </div>
        </div>
      </div>
    </div>
  `;let h=e(f,`scene`),g=e(f,`card`),_=e(f,`property`),v=e(f,`claim`),y=Array.from({length:r},(t,n)=>({box:e(f,`tile-${n+1}`),bar:e(f,`bar-${n+1}`),glyph:e(f,`glyph-${n+1}`)})),b=t(f),x=`number`,S,C,w=()=>{y.forEach((e,t)=>{let n=c(t);if(e.bar.hidden=x!==`number`,e.glyph.hidden=x!==`keyword`,e.box.style.background=x===`color`?u(d(n)):`var(--sp-surface)`,x===`number`){let t=l(i.from,i.to,n),r=s.min+(t-i.from)/(i.to-i.from)*(s.max-s.min);e.bar.style.height=`${Math.round(r)}px`}x===`keyword`&&(e.glyph.style.textTransform=n>=.5?`uppercase`:`lowercase`)});let e=Math.round(l(i.from,i.to,.5));_.textContent=x===`number`?`width`:x===`color`?`background-color`:`text-transform`,v.textContent=x===`number`?`${i.from}px to ${i.to}px, 50% at ${e}px`:x===`color`?`${u(a.from)} to ${u(a.to)}, 50% at ${u(d(.5))}`:`lowercase to uppercase, switching at 50%`},T=()=>{g.style.color=x===`color`?`#ffffff`:`var(--sp-accent-ink)`},E=()=>{T(),g.style.width=`${i.to}px`,g.style.backgroundColor=x===`color`?u(a.to):`var(--sp-accent)`,g.style.textTransform=x===`keyword`?`uppercase`:`lowercase`},D=()=>{T(),g.style.width=x===`number`?`${i.from}px`:`${i.to}px`,g.style.backgroundColor=x===`color`?u(a.from):`var(--sp-accent)`,g.style.textTransform=`lowercase`},O=()=>x===`number`?[{width:`${i.from}px`},{width:`${i.to}px`}]:x===`color`?[{backgroundColor:u(a.from)},{backgroundColor:u(a.to)}]:[{textTransform:`lowercase`},{textTransform:`uppercase`}],k=()=>{S?.cancel(),S=void 0,E(),h.dataset.state=`rested`},A=()=>{if(p.clearTimeout(C),S?.cancel(),w(),b)return k();D(),h.dataset.state=`running`,S=g.animate(O(),{duration:n,easing:`linear`,fill:`forwards`}),C=p.setTimeout(k,1660)};e(f,`mode`).addEventListener(`change`,e=>{x=e.detail,h.dataset.mode=x,A()}),e(f,`replay`).addEventListener(`click`,A),A()}export{f as mount};