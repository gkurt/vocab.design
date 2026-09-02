import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import{t as n}from"./motion.B5_YXmsy.js";var r=460,i=88,a=104,o=[{offset:0,transform:`scale(0.9)`,opacity:0,easing:`cubic-bezier(0.25, 0.9, 0.35, 1)`},{offset:.28,transform:`scale(1)`,opacity:1,easing:`cubic-bezier(0.3, 0, 0.4, 1)`},{offset:.58,transform:`scale(1.045)`,opacity:1,easing:`cubic-bezier(0.3, 0, 0.2, 1)`},{offset:1,transform:`scale(1)`,opacity:1}];function s(s,c){s.innerHTML=`
    <div class="sp-app" style="gap: 9px">
      <div class="sp-frame" style="width: 340px; height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Today</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div
          class="sp-body sp-stack"
          style="align-items: center; justify-content: center; gap: 6px; padding: 10px"
        >
          <div style="position: relative; width: ${a}px; height: ${a}px; flex: 0 0 auto">
            <span
              data-part="medal"
              data-subject
              data-state="settled"
              data-plays="1"
              style="position: absolute; left: ${16/2}px; top: ${16/2}px;
                     width: ${i}px; height: ${i}px; display: flex; align-items: center;
                     justify-content: center; border-radius: 50%; background: var(--sp-accent);
                     color: var(--sp-accent-ink); box-shadow: var(--sp-shadow); will-change: transform"
            ><span style="display: flex; transform: scale(2.3)">${t(`check`)}</span></span>
          </div>
          <span class="sp-heading sp-context" data-part="title" style="font-size: 15px">Streak saved</span>
          <span class="sp-text sp-context" data-part="note" style="text-align: center">
            Fourteen days in a row.
          </span>
        </div>
      </div>
    </div>
  `;let l=e(s,`medal`),u=n(s),d=0,f,p=()=>{c.clearTimeout(f);for(let e of l.getAnimations())e.cancel();if(d+=1,l.dataset.plays=String(d),u){l.dataset.state=`settled`;return}l.dataset.state=`popping`,l.animate(o,{duration:r,fill:`backwards`}),f=c.setTimeout(()=>{l.dataset.state=`settled`},540)};e(s,`replay`).addEventListener(`click`,p),p()}export{s as mount};