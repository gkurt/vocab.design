import{n as e}from"./parts.C-YLuC7Q.js";import{n as t}from"./measure.DK7AY2_i.js";import{t as n}from"./motion.B5_YXmsy.js";var r=700,i=78;function a(a,o){let s=(e,t,n)=>`
    <div class="sp-stack sp-context" style="gap: 6px; flex: 0 0 auto">
      <span class="sp-label" style="font-size: 11px">Slot ${t}</span>
      <div
        data-part="slot-${e}"
        style="width: ${n}px; height: ${i}px; border: 1px dashed var(--sp-line); border-radius: 10px;
               background: var(--sp-sunken); cursor: pointer"
      ></div>
    </div>`,c=(e,t)=>`
    <div class="sp-row" style="gap: 8px">
      <span class="sp-label" style="width: 46px; flex: 0 0 auto">${t}</span>
      <span class="sp-text" style="font-size: 12px; white-space: nowrap" data-part="value-${e}">not measured yet</span>
    </div>`;a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 402px">
        <div class="sp-row" style="align-items: flex-end; gap: 20px">
          ${s(`a`,`A`,128)}
          ${s(`b`,`B`,190)}
        </div>
        <div class="sp-stack sp-context" data-part="readout" data-phase="idle" style="gap: 3px; margin-top: 14px; min-height: 76px">
          ${c(`first`,`First`)}
          ${c(`last`,`Last`)}
          ${c(`invert`,`Invert`)}
          ${c(`play`,`Play`)}
        </div>
      </div>
    </div>
  `;let l=e(a,`readout`),u={a:e(a,`slot-a`),b:e(a,`slot-b`)},d=document.createElement(`div`);d.setAttribute(`data-part`,`card`),d.setAttribute(`data-subject`,``),d.textContent=`Card`,d.style.cssText=`width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
    border-radius: 10px; background: var(--sp-accent); color: var(--sp-accent-ink); font-size: 13px; font-weight: 600;
    transform-origin: top left`,u.a.append(d);let f=(t,n)=>{e(a,`value-${t}`).textContent=n},p,m=e=>{if(d.parentElement===e)return;o.clearTimeout(p);for(let e of d.getAnimations())e.cancel();d.style.transform=`none`;let i=t(d,a);e.append(d);let s=t(d,a),c=i.left-s.left,u=i.top-s.top,m=i.width/s.width,h=i.height/s.height,g=`translate(${c.toFixed(1)}px, ${u.toFixed(1)}px) scale(${m.toFixed(3)}, ${h.toFixed(3)})`;if(f(`first`,`${Math.round(i.width)} x ${Math.round(i.height)} at x ${Math.round(i.left)}`),f(`last`,`${Math.round(s.width)} x ${Math.round(s.height)} at x ${Math.round(s.left)}`),f(`invert`,g),n(a)){f(`play`,`skipped, reduced motion`),l.dataset.phase=`done`;return}f(`play`,`${r} ms of transform, no layout`),l.dataset.phase=`playing`,d.animate([{transform:g},{transform:`none`}],{duration:r,easing:`cubic-bezier(0.2, 0.8, 0.3, 1)`}),p=o.setTimeout(()=>{l.dataset.phase=`done`},760)};u.a.addEventListener(`click`,()=>m(u.a)),u.b.addEventListener(`click`,()=>m(u.b))}export{a as mount};