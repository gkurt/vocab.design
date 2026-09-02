import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";import{n as r}from"./measure.DK7AY2_i.js";import{t as i}from"./motion.B5_YXmsy.js";var a=620,o=260,s=14,c=[`#e8534f`,`#f2b134`,`#3aa76d`,`#3557e8`,`#c2477f`],l=[`squash`,`overshoot`,`sparks`,`count`,`flash`,`settle`],u=l.map(e=>`
    <span
      class="sp-chip"
      data-part="resp-${e}"
      style="flex: 0 0 auto; white-space: nowrap; font-size: 11px; padding: 2px 8px"
    >${e}</span>`).join(``);function d(d,f){d.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 468px; height: 200px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Post</span>
        </div>
        <div class="sp-body" data-part="scene" data-mode="juicy" data-stack="0" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px">
          <div class="sp-row sp-context" style="gap: 8px; align-items: center">
            <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="juicy" data-axis="Feedback" data-term="juicy">
              <button class="sp-segment" data-part="seg-plain" value="plain">Plain</button>
              <button class="sp-segment" data-part="seg-juicy" value="juicy">Juicy</button>
            </sp-segmented>
          </div>

          <div style="position: relative; width: 300px; height: 92px">
            <span data-part="sparks" aria-hidden="true" style="position: absolute; inset: 0; overflow: hidden; pointer-events: none"></span>
            <button
              class="sp-button"
              type="button"
              data-part="like"
              data-subject
              data-mode="juicy"
              data-pose="[data-mode=juicy]"
              style="position: absolute; left: 50%; top: 26px; transform: translateX(-50%); width: 162px;
                     display: inline-flex; align-items: center; justify-content: center; gap: 8px; white-space: nowrap;
                     transition: background-color ${o}ms var(--sp-ease)"
            >
              ${n(`heart`,`sp-icon--filled`)}
              <span>Like</span>
              <span data-part="count" style="width: 26px; text-align: right; font-variant-numeric: tabular-nums">18</span>
            </button>
          </div>
        </div>
      </div>
      <div class="sp-row sp-context" data-part="legend" style="gap: 6px; justify-content: center">${u}</div>
      <p data-stage-verdict data-part="readout" data-mode="juicy">Juicy: one press, six responses.</p>
    </div>
  `;let p=e(d,`scene`),m=e(d,`like`),h=e(d,`sparks`),g=e(d,`count`),_=e(d,`readout`),v=l.map(t=>e(d,`resp-${t}`)),y=i(d),b=`juicy`,x=18,S,C=e=>{for(let[n,r]of v.entries()){let i=e.includes(l[n]??``);t(r,`data-lit`,i),r.style.background=i?`var(--sp-accent)`:``,r.style.borderColor=i?`var(--sp-accent)`:``,r.style.color=i?`var(--sp-accent-ink)`:``}p.dataset.stack=String(e.length)},w=e=>{b=e,p.dataset.mode=e,m.dataset.mode=e,_.dataset.mode=e,C([]),_.textContent=e===`juicy`?`Juicy: one press, six responses.`:`Plain: one press, one response.`},T=(e,t)=>{for(let n=0;n<s;n++){let r=-Math.PI/2+(n/13-.5)*2.6,i=34+Math.random()*30,o=document.createElement(`span`);o.dataset.spark=``,o.style.cssText=`position: absolute; left: ${e}px; top: ${t}px; width: 6px; height: 6px;
        border-radius: 50%; background: ${c[n%c.length]}`,h.append(o),o.animate([{transform:`translate(-50%, -50%) scale(0.4)`,opacity:1},{transform:`translate(calc(-50% + ${(Math.cos(r)*i).toFixed(1)}px), calc(-50% + ${(Math.sin(r)*i).toFixed(1)}px)) scale(1)`,opacity:0}],{duration:a*(.7+Math.random()*.3),easing:`cubic-bezier(0.15, 0.8, 0.3, 1)`,fill:`forwards`})}};m.addEventListener(`click`,()=>{let e=r(m,h),n=e.left+e.width/2,i=e.top+e.height/2;x+=1,g.textContent=String(x),t(g,`data-bumped`,!0),f.clearTimeout(S);let o=b===`plain`?[`count`]:y?[`count`,`flash`]:[`squash`,`overshoot`,`sparks`,`count`,`flash`,`settle`];o.includes(`flash`)&&(m.style.backgroundColor=`var(--sp-warn)`),o.includes(`sparks`)&&(T(n,i),m.animate([{transform:`translateX(-50%) scale(1)`},{transform:`translateX(-50%) scale(0.9, 0.86)`,offset:.12},{transform:`translateX(-50%) scale(1.12, 1.1)`,offset:.42},{transform:`translateX(-50%) scale(0.97, 0.99)`,offset:.68},{transform:`translateX(-50%) scale(1.02, 1)`,offset:.86},{transform:`translateX(-50%) scale(1)`}],{duration:a,easing:`ease-out`}),g.animate([{transform:`translateY(0) scale(1)`},{transform:`translateY(-7px) scale(1.2)`,offset:.35},{transform:`translateY(0) scale(1)`}],{duration:a*.7,easing:`ease-out`})),C(o),_.textContent=o.length===1?`1 response from one press`:`${o.length} responses from one press`,S=f.setTimeout(()=>{m.style.backgroundColor=``,t(g,`data-bumped`,!1);for(let e of[...h.querySelectorAll(`[data-spark]`)])e.remove()},740)}),e(d,`mode`).addEventListener(`change`,e=>w(e.detail)),w(`juicy`)}export{d as mount};