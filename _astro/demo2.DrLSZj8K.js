import{n as e,r as t,t as n}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{n as r}from"./measure.DK7AY2_i.js";var i=444,a=202,o=[[`What you need`,[`96%`,`88%`]],[`Fees and deposits`,[`92%`,`78%`]],[`After you apply`,[`90%`,`84%`]]],s={subheads:`The headings get read. The paragraphs between them do not.`,flat:`Take the subheadings out and the same page gets scanned as an F.`},c=e=>`<div class="sp-line" data-part="line" style="width: ${e}; height: 8px"></div>`,l={subheads:()=>`
    <span class="sp-heading" data-part="head" style="align-self: flex-start; font-size: 13px">Applying for a berth</span>
    ${o.map(([e,t])=>`
      <span class="sp-heading" data-part="head" style="align-self: flex-start; font-size: 12px; margin-top: 4px">${e}</span>
      ${t.map(c).join(``)}`).join(``)}`,flat:()=>`
    <span class="sp-heading" data-part="head" style="align-self: flex-start; font-size: 13px">Applying for a berth</span>
    ${[`98%`,`94%`,`96%`,`86%`,`92%`,`78%`,`90%`,`96%`,`88%`,`92%`,`74%`].map(c).join(``)}`};function u(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Page structure</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Version" data-part="switcher" data-value="subheads">
            <button class="sp-segment" type="button" data-part="seg-subheads" value="subheads">subheadings</button>
            <button class="sp-segment" type="button" data-part="seg-flat" value="flat">none</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div data-part="page" style="position: relative; flex: 0 0 auto; width: ${i}px; height: ${a}px; overflow: hidden; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)">
            <div class="sp-context" data-part="view" style="display: flex; flex-direction: column; gap: 5px; padding: 10px 16px"></div>
            <div data-part="bands" data-subject style="position: absolute; pointer-events: none"></div>
            <div data-part="fshape" hidden style="position: absolute; pointer-events: none"></div>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="height: 22px; max-width: 434px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;let c=e(o,`page`),u=e(o,`view`),d=e(o,`bands`),f=e(o,`fshape`),p=e(o,`readout`),m=(e,t,n,r)=>`<span style="position: absolute; left: ${e}px; top: ${t}px; width: ${n}px; height: ${r}px; border-radius: ${Math.min(n,r)/2}px; background: var(--sp-accent); opacity: 0.34"></span>`,h=(e,t)=>`<span style="position: absolute; left: ${e-5}px; top: ${t-5}px; width: 10px; height: 10px; border-radius: 50%; background: var(--sp-accent)"></span>`,g=e=>e.map(e=>{let t=r(e,c);return{x:t.left,y:t.top,w:t.width,h:t.height}}),_=(e,t,n)=>{let r=Math.min(...t.map(e=>e.x))-8,i=Math.min(...t.map(e=>e.y))-8,a=Math.max(...t.map(e=>e.x+e.w))+8,o=Math.max(...t.map(e=>e.y+e.h))+8;e.style.left=`${r}px`,e.style.top=`${i}px`,e.style.width=`${a-r}px`,e.style.height=`${o-i}px`,e.innerHTML=n(r,i)},v=()=>{let e=g(t(u,`head`));_(d,e,(t,n)=>e.map(({x:e,y:r,w:i,h:a})=>{let o=r+a/2-n;return m(e-t-4,o-6,i+8,12)+h(e-t,o)}).join(``))},y=()=>{let e=g([...t(u,`head`),...t(u,`line`)]),n=e[0],r=e[1],i=e[e.length-1];!n||!r||!i||_(f,e,(e,t)=>{let a=n.x-e,o=n.y+n.h/2-t,s=r.y+r.h/2-t,c=i.y+i.h/2-t;return m(a-4,o-5,n.w+8,11)+m(a-4,s-5,r.w*.72,11)+m(a-5,o,11,c-o)+h(a,o)+h(a,c)})},b=e=>{u.innerHTML=l[e](),p.textContent=s[e],n(d,`hidden`,e!==`subheads`),n(f,`hidden`,e!==`flat`),e===`subheads`?v():y()};e(o,`switcher`).addEventListener(`change`,e=>b(e.detail)),b(`subheads`)}export{u as mount};