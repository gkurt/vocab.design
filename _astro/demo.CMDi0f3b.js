import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{t}from"./motion.B5_YXmsy.js";var n=434,r=44,i=4,a=380,o=70,s={slow:1500,brisk:800},c=(e,t,a,o)=>`
  <div class="sp-stack${o?``:` sp-context`}" data-part="lane-${e}" style="gap: 6px">
    <div class="sp-row sp-row--between">
      <span class="sp-label sp-text--ink" style="font-size: 12px">${t}</span>
      <span class="sp-label" data-part="say-${e}" style="font-size: 11px; width: 200px; text-align: right">${a}</span>
    </div>
    <div
      data-part="track-${e}"
      style="position: relative; width: ${n}px; height: 26px; border-radius: 999px;
             background: var(--sp-surface); border: 1px solid var(--sp-line)"
    >
      <span
        data-part="${e}" ${o?`data-subject `:``}data-pace="slow" data-heading="out"
        style="position: absolute; left: ${i}px; top: 4px; width: ${r}px; height: 18px; border-radius: 999px;
               background: var(--sp-accent); transform: translateX(0px); will-change: transform"
      ></span>
    </div>
  </div>`;function l(n,r){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="scene" data-pace="slow" style="height: 256px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Loop</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Pace" data-part="pace" data-value="slow">
            <button class="sp-segment" type="button" data-part="seg-slow" value="slow">Slow</button>
            <button class="sp-segment" type="button" data-part="seg-brisk" value="brisk">Brisk</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; justify-content: center; gap: 18px; padding: 14px 12px">
          ${c(`restart`,`normal`,`restarts at frame one`,!1)}
          ${c(`yoyo`,`alternate`,`plays back the way it came`,!0)}
          <span
            class="sp-text sp-context" data-stage-verdict data-part="note"
            style="height: 34px; font-size: 12px; line-height: 1.4"
          >Both cross in 1500 ms. Only the top lane has a jump in it with no frames inside.</span>
        </div>
      </div>
    </div>
  `;let i=e(n,`scene`),l=e(n,`restart`),u=e(n,`yoyo`),d=e(n,`say-restart`),f=e(n,`say-yoyo`),p=e(n,`note`),m=t(n),h=`slow`,g=[],_=(e,t)=>{g.push(r.setTimeout(e,t))},v=()=>{for(let e of g)r.clearTimeout(e);g=[]},y=(e,t,n)=>{e.style.transition=n>0?`transform ${n}ms linear`:`none`,e.style.transform=`translateX(${t}px)`},b=e=>{let t=s[h];u.dataset.heading=e?`out`:`back`,f.textContent=e?`playing forwards`:`playing backwards`,y(u,e?a:0,t),_(()=>b(!e),t)},x=e=>{let t=()=>{let t=s[h]-(e?o:0);l.dataset.heading=`out`,d.textContent=`playing forwards`,y(l,a,t),_(()=>x(!0),t)};if(!e)return t();l.dataset.heading=`cut`,d.textContent=`cut back to frame one`,y(l,0,0),_(t,o)},S=()=>{v();for(let e of[l,u])e.dataset.pace=h,e.dataset.heading=`out`,y(e,0,0);p.textContent=`Both cross in ${s[h]} ms. Only the top lane has a jump in it with no frames inside.`,_(()=>{b(!0),x(!1)},o)},C=()=>{for(let e of[l,u])e.dataset.pace=h,e.dataset.heading=`out`,y(e,a,0);d.textContent=`loop held`,f.textContent=`loop held`,p.textContent=`Reduced motion: neither loop runs, so both tiles rest on their last frame.`};e(n,`pace`).addEventListener(`change`,e=>{if(h=e.detail,i.dataset.pace=h,m)return C();S()}),m?C():S()}export{l as mount};