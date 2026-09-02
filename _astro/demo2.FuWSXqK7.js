import{n as e,r as t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{t as n}from"./motion.B5_YXmsy.js";var r={drop:`transform, staggered: the letters arrive one after another`,swell:`one variation axis: wght travelling 200 to 800`,stutter:`position in hard steps, with no easing at all`},i=`drop`,a=55,o=[{x:5,opacity:.5},{x:-4,opacity:1},{x:4,opacity:.45},{x:-2,opacity:1},{x:1,opacity:.6},{x:0,opacity:1}],s=58,c=200,l=800,u=300,d=78;function f(f,p){f.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Motion" data-part="segmented" data-value="drop">
            <button class="sp-segment" data-part="seg-drop" value="drop">drop</button>
            <button class="sp-segment" data-part="seg-swell" value="swell">swell</button>
            <button class="sp-segment" data-part="seg-stutter" value="stutter">stutter</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="justify-content: center; height: ${d}px; margin-top: 8px">
          <p data-part="phrase" data-subject data-mode="drop"
             style="margin: 0; width: ${u}px; font-size: 28px; line-height: 1.34; font-weight: 500">Type can <span
             data-part="word-drop" style="display: inline-block">${[...i].map((e,t)=>`<span data-part="drop-letter" data-i="${t}" style="display: inline-block">${e}</span>`).join(``)}</span>,<br><span
             data-part="word-stutter" style="display: inline-block">stutter</span>, or <span
             data-part="word-swell" style="display: inline-block; font-weight: ${l}">swell.</span></p>
        </div>
      </div>
      <p data-stage-verdict data-part="read" data-mode="drop"></p>
    </div>
  `;let m=e(f,`phrase`),h=e(f,`word-swell`),g=e(f,`word-stutter`),_=t(f,`drop-letter`),v=e(f,`read`),y=[],b=(e,t)=>y.push(p.setTimeout(t,e)),x=()=>{for(let e of y)p.clearTimeout(e);y=[];for(let e of _)e.style.transition=`none`,e.style.transitionDelay=`0ms`,e.style.translate=`0 0`,e.style.opacity=`1`;h.style.transition=`none`,h.style.fontWeight=String(l),g.style.translate=`0 0`,g.style.opacity=`1`},S=e=>{let t=r[e];if(t&&(m.dataset.mode=e,v.dataset.mode=e,v.textContent=t,x(),!n(f))){if(e===`drop`){for(let e of _)e.style.translate=`0 -26px`,e.style.opacity=`0`;b(40,()=>{for(let e of _)e.style.transition=`translate 0.46s cubic-bezier(0.2, 1.5, 0.4, 1), opacity 0.26s linear`,e.style.transitionDelay=`${Number(e.dataset.i??0)*a}ms`,e.style.translate=`0 0`,e.style.opacity=`1`});return}if(e===`swell`){h.style.fontWeight=String(c),b(40,()=>{h.style.transition=`font-weight 0.62s var(--sp-ease)`,h.style.fontWeight=String(l)});return}o.forEach((e,t)=>{b(t*s,()=>{g.style.translate=`${e.x}px 0`,g.style.opacity=String(e.opacity)})})}};S(`drop`),e(f,`segmented`).addEventListener(`change`,e=>S(e.detail))}export{f as mount};