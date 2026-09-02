import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./motion.B5_YXmsy.js";var n=`SIGNAL`,r=`text-shadow: 2px 0 rgb(255 32 86 / 0.9), -2px 0 rgb(0 224 255 / 0.9)`,i={a:-5,b:4},a=[{a:-16,b:13},{a:9,b:-11},{a:-21,b:6},{a:4,b:-18},{a:-9,b:10},i],o=70;function s(s,c){let l=(e,t,i)=>`
    <span data-part="${e}" aria-hidden="true"
          style="position: absolute; inset: 0; clip-path: inset(${t}); translate: ${i}px 0; ${r}">${n}</span>`;s.innerHTML=`
    <div class="sp-app" style="padding: 0">
      <div class="sp-context" data-part="screen" aria-hidden="true"
           style="position: absolute; inset: 0; background-image: repeating-linear-gradient(to bottom, rgb(255 255 255 / 0.05) 0 1px, transparent 1px 3px), radial-gradient(circle at 50% 40%, #1d2230, #0b0d13 78%)"></div>

      <div data-part="title" data-subject
           style="position: relative; width: 236px; height: 56px; font-size: 46px; font-weight: 800; letter-spacing: 0.05em; line-height: 56px; text-align: center; color: #eef1f7; ${r}">
        ${n}
        ${l(`band-top`,`14% 0 62% 0`,i.a)}
        ${l(`band-low`,`58% 0 16% 0`,i.b)}
      </div>

      <div class="sp-context" style="position: relative; display: flex; flex-direction: column; align-items: center; gap: 8px">
        <div data-part="readout" style="height: 16px; font-size: 11px; font-weight: 600; letter-spacing: 0.22em; color: #ff6a8a; opacity: 0; transition: opacity 0.2s var(--sp-ease)">
          SIGNAL LOST
        </div>
        <button class="sp-button sp-button--sm" data-part="corrupt" type="button">Corrupt</button>
      </div>
    </div>
  `;let u=e(s,`band-top`),d=e(s,`band-low`),f=e(s,`readout`),p=[],m=e=>{u.style.translate=`${e.a}px 0`,d.style.translate=`${e.b}px 0`};e(s,`corrupt`).addEventListener(`click`,()=>{f.style.opacity=`1`;for(let e of p)c.clearTimeout(e);if(p=[],t(s)){m(i);return}p=a.map((e,t)=>c.setTimeout(()=>m(e),t*o))})}export{s as mount};