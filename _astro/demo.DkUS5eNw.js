import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import{n}from"./measure.DK7AY2_i.js";import{t as r}from"./motion.B5_YXmsy.js";var i=1100,a=16,o=[`#e8534f`,`#f2b134`,`#3aa76d`,`#3557e8`,`#c2477f`,`#31b0c6`],s=[[`Pick a workspace name`,!0],[`Invite two teammates`,!0],[`Connect your calendar`,!1]].map(([e,n],r)=>`
    <li class="sp-list-item" style="padding: 7px 4px">
      <span
        data-part="mark-${r+1}"
        style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 18px; height: 18px;
               border-radius: 50%; border: 1px solid var(--sp-line); background: ${n?`var(--sp-accent)`:`transparent`};
               color: var(--sp-accent-ink)"
      >${n?t(`check`):``}</span>
      <span class="sp-grow">${e}</span>
    </li>`).join(``);function c(c,l){c.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 436px; height: 244px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Set up your workspace</span>
          <span class="sp-text" data-part="readout" style="width: 84px; text-align: right; white-space: nowrap">2 of 3 done</span>
        </div>
        <div class="sp-body" style="position: relative; display: flex; align-items: center; justify-content: center">
          <div class="sp-surface sp-context" style="width: 248px; padding: 10px 14px 14px">
            <ul class="sp-list">${s}</ul>
            <button class="sp-button" type="button" data-part="finish" style="width: 100%; margin-top: 10px">Finish setup</button>
          </div>
          <span
            data-part="burst"
            data-subject
            data-burst="idle"
            data-pose="[data-burst=fired]"
            aria-hidden="true"
            style="position: absolute; inset: 0; overflow: hidden; pointer-events: none"
          ></span>
        </div>
      </div>
    </div>
  `;let u=e(c,`burst`),d=e(c,`finish`),f=e(c,`readout`),p=e(c,`mark-3`),m=r(c),h=(e,t)=>{for(let n=0;n<a;n++){let r=-Math.PI/2+(n/15-.5)*2.1+(Math.random()-.5)*.3,a=74+Math.random()*84,s=Math.cos(r)*a,c=Math.sin(r)*a,l=(Math.random()<.5?-1:1)*(220+Math.random()*320),d=5+Math.random()*4,f=document.createElement(`span`);f.dataset.flake=``,f.style.cssText=`position: absolute; left: ${e}px; top: ${t}px; width: ${d.toFixed(1)}px;
        height: ${(d*(1.2+Math.random()*.8)).toFixed(1)}px; border-radius: ${Math.random()<.35?`50%`:`1px`};
        background: ${o[n%o.length]}; will-change: transform`,u.append(f);let p=`translate(calc(-50% + ${(s*.6).toFixed(1)}px), calc(-50% + ${c.toFixed(1)}px)) rotate(${(l*.45).toFixed(0)}deg)`,m=`translate(calc(-50% + ${(s*1.2).toFixed(1)}px), calc(-50% + ${(c*.3+150).toFixed(1)}px)) rotate(${l.toFixed(0)}deg)`;f.animate([{transform:`translate(-50%, -50%) rotate(0deg)`,opacity:1,easing:`cubic-bezier(0.1, 0.75, 0.35, 1)`},{transform:p,offset:.4,easing:`cubic-bezier(0.45, 0, 0.9, 0.75)`},{opacity:1,offset:.8},{transform:m,opacity:0}],{duration:i*(.85+Math.random()*.15),easing:`linear`,fill:`forwards`})}},g=()=>{let e=document.createElement(`span`);e.className=`sp-chip`,e.style.cssText=`position: absolute; right: 14px; top: 14px; font-weight: 600`,e.innerHTML=`${t(`check`)}Done!`,u.append(e)};d.addEventListener(`click`,()=>{if(u.dataset.burst!==`idle`)return;let e=n(d,u),r=e.left+e.width/2,i=e.top+e.height/2;if(u.dataset.burst=`fired`,d.setAttribute(`aria-disabled`,`true`),d.dataset.done=``,f.textContent=`3 of 3 done`,p.style.background=`var(--sp-accent)`,p.innerHTML=t(`check`),m)return g();h(r,i),l.setTimeout(()=>{for(let e of[...u.querySelectorAll(`[data-flake]`)])e.remove();u.dataset.burst=`idle`},1240)})}export{c as mount};