import{n as e,t}from"./parts.C-YLuC7Q.js";var n=2600,r=[{wash:`linear-gradient(160deg, #24406e, #7d5aa6 55%, #d98f6a)`,caption:`Left the quay at six`},{wash:`linear-gradient(160deg, #17544a, #46937c 52%, #cfd489)`,caption:`Channel was flat all morning`},{wash:`linear-gradient(160deg, #6b2f3f, #c26a5c 55%, #f0c184)`,caption:`Fog came in past the light`},{wash:`linear-gradient(160deg, #1d2340, #4a5a94 55%, #a8b6dc)`,caption:`Back before the tide turned`}],i=e=>`
  <span data-part="bar-${e}" style="flex: 1 1 0; height: 3px; border-radius: 999px; background: rgb(255 255 255 / 0.32); overflow: hidden">
    <span data-part="fill-${e}" style="display: block; width: 0; height: 100%; border-radius: inherit; background: #ffffff"></span>
  </span>`;function a(a,o){a.innerHTML=`
    <div class="sp-app">
      <div data-part="viewer" data-subject data-touch
           style="position: relative; width: 178px; height: 252px; border-radius: 14px; overflow: hidden; color: #ffffff; touch-action: none; background: ${r[0]?.wash}">
        <div class="sp-row" data-part="bars" style="position: absolute; top: 8px; left: 8px; right: 8px; gap: 4px">
          ${r.map((e,t)=>i(t+1)).join(``)}
        </div>
        <div class="sp-row" style="position: absolute; top: 20px; left: 10px; right: 10px; gap: 8px">
          <span class="sp-avatar" style="width: 24px; height: 24px; background: rgb(255 255 255 / 0.26); color: #ffffff">R</span>
          <span class="sp-grow" style="font-size: 12px; font-weight: 500">rosa.at.sea</span>
          <span style="font-size: 11px; opacity: 0.8">4h</span>
        </div>
        <span data-part="caption" style="position: absolute; left: 12px; right: 12px; bottom: 14px; font-size: 13px; line-height: 1.4">${r[0]?.caption}</span>
        <button data-part="prev" type="button" aria-label="Previous card"
                style="position: absolute; top: 40px; left: 0; bottom: 0; width: 36%; border: 0; background: transparent"></button>
        <button data-part="next" type="button" aria-label="Next card"
                style="position: absolute; top: 40px; right: 0; bottom: 0; width: 64%; border: 0; background: transparent"></button>
      </div>
    </div>
  `;let s=e(a,`viewer`),c=e(a,`caption`),l=r.map((t,n)=>e(a,`bar-${n+1}`)),u=r.map((t,n)=>e(a,`fill-${n+1}`)),d=r.length-1,f=0,p=!1,m=n,h=0,g,_;function v(){o.clearTimeout(_),_=void 0}function y(e){m=e,h=performance.now(),o.clearTimeout(g),v(),f<d&&(g=o.setTimeout(()=>x(f+1),e));let t=u[f];t&&(_=o.setTimeout(()=>{_=void 0,t.style.transition=`width ${e}ms linear`,t.style.width=`100%`},0))}function b(){o.clearTimeout(g),g=void 0,v(),m=Math.max(0,m-(performance.now()-h));let e=u[f];if(!e)return;let t=getComputedStyle(e).width;e.style.transition=`none`,e.style.width=t}function x(e){f=e;let i=r[e];i&&(s.style.background=i.wash,c.textContent=i.caption),l.forEach((n,r)=>{t(n,`data-current`,r===e),t(n,`data-seen`,r<e);let i=u[r];i&&(i.style.transition=`none`,i.style.width=r<e?`100%`:`0`)}),o.clearTimeout(g),g=void 0,v(),m=n,p||y(n)}e(a,`next`).addEventListener(`click`,()=>{f<d&&x(f+1)}),e(a,`prev`).addEventListener(`click`,()=>{f>0&&x(f-1)});let S=e=>{e!==p&&(p=e,t(s,`data-paused`,e),e?b():y(m))};s.addEventListener(`pointerdown`,()=>S(!0));for(let e of[`pointerup`,`pointercancel`,`pointerleave`])s.addEventListener(e,()=>S(!1));x(0)}export{a as mount};