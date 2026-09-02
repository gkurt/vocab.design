import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import{t as n}from"./motion.B5_YXmsy.js";var r=780,i=(e,t=1)=>`translateX(${e}px) rotate(90deg) scale(${t})`,a=[{offset:0,transform:i(0),opacity:1,easing:`ease-out`},{offset:.22,transform:i(-7,.88),easing:`ease-in`},{offset:.5,opacity:1},{offset:.62,transform:i(34),opacity:0},{offset:.66,transform:i(0)},{offset:.74,opacity:0},{offset:1,opacity:1}],o=[{offset:0,transform:i(0),opacity:1,easing:`ease-in`},{offset:.5,opacity:1},{offset:.62,transform:i(34),opacity:0},{offset:.66,transform:i(0)},{offset:.74,opacity:0},{offset:1,opacity:1}];function s(s,c){let l=(e,n,r)=>`
    <div class="sp-stack${r?``:` sp-context`}" style="flex: 1 1 0; gap: 8px; align-items: flex-start">
      <button
        class="sp-button"
        type="button"
        data-part="${e}"
        ${r?`data-subject`:``}
        style="display: inline-flex; align-items: center; gap: 9px; overflow: hidden"
      >
        Send
        <span data-part="${e}-glyph" style="display: flex; transform: ${i(0)}">${t(`share`)}</span>
      </button>
      <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 600">${n}</span>
    </div>`;s.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" data-part="panel" style="width: 372px">
        <div class="sp-row" style="align-items: flex-start; gap: 20px">
          ${l(`send`,`With anticipation`,!0)}
          ${l(`cold`,`Without`,!1)}
        </div>
      </div>
    </div>
  `;let u=e(s,`panel`),d,f=(t,i)=>{let a=e(s,`${t}-glyph`);for(let e of a.getAnimations())e.cancel();if(c.clearTimeout(d),u.removeAttribute(`data-settled`),u.setAttribute(`data-running`,``),n(s)){u.removeAttribute(`data-running`),u.setAttribute(`data-settled`,``);return}a.animate(i,{duration:r}),d=c.setTimeout(()=>{u.removeAttribute(`data-running`),u.setAttribute(`data-settled`,``)},840)};e(s,`send`).addEventListener(`click`,()=>f(`send`,a)),e(s,`cold`).addEventListener(`click`,()=>f(`cold`,o))}export{s as mount};