import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=170,r=320,i=`A kestrel hovers by holding its head still while the wind moves the rest of the bird.`.split(` `),a={staged:`The tokens land in the transcript as they arrive, and the region stays busy while they do. One announcement at the end: the reply is finished, and how long it is.`,naive:`The region announces every token, so the reader hears the start of a sentence over and over and never reaches the end of one.`};function o(o,s){let c=(e,t)=>`<span data-part="w-${t+1}" style="opacity: 0; transition: opacity 0.12s linear">${e}</span>`,l=e=>`
    <p class="sp-text sp-text--ink" data-part="line-${e}"
       style="margin: 0; height: 15px; font-size: 11px; line-height: 15px; white-space: nowrap; overflow: hidden;
              opacity: 0; transition: opacity 0.14s ease"></p>`;o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="staged" data-axis="Spoken" data-term="staged" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-staged" value="staged"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Staged</button>
            <button class="sp-segment" type="button" data-part="seg-naive" value="naive"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Every token</button>
          </sp-segmented>
        </div>

        <p class="sp-text sp-context" style="margin: 9px 0 0; font-size: 11px; text-align: right">You asked: how does a kestrel hover?</p>

        <div class="sp-surface" data-part="region" data-subject data-mode="staged" data-pose="[data-mode=staged]"
             role="status" aria-live="polite" aria-busy="true" style="margin-top: 5px; padding: 8px 10px">
          <div class="sp-row sp-row--between sp-context" style="gap: 10px; height: 14px">
            <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">Assistant</span>
            <span class="sp-label sp-pending" data-part="status"
                  style="flex: 0 0 auto; font-size: 10px">generating</span>
          </div>
          <p class="sp-text sp-text--ink" data-part="reply"
             style="margin: 3px 0 0; height: 34px; font-size: 12px; line-height: 16px">${i.map(c).join(` `)}<span class="sp-caret" data-part="caret"></span></p>
        </div>

        <div class="sp-surface sp-context" style="margin-top: 9px; padding: 8px 10px">
          <div class="sp-row sp-row--between" style="gap: 10px; height: 14px">
            <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">Screen reader</span>
            <span class="sp-label" data-part="count" data-said="none"
                  style="flex: 0 0 auto; font-size: 10px">Spoken 0 times</span>
          </div>
          <div class="sp-stack" style="gap: 0; margin-top: 3px; height: 45px">
            ${l(1)}${l(2)}${l(3)}
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="staged"
           style="margin: 8px 0 0; height: 30px; font-size: 11px; line-height: 1.35">${a.staged}</p>
      </div>
    </div>
  `;let u=e(o,`region`),d=e(o,`status`),f=e(o,`caret`),p=e(o,`count`),m=e(o,`caption`),h=i.map((t,n)=>e(o,`w-${n+1}`)),g=[e(o,`line-1`),e(o,`line-2`),e(o,`line-3`)],_=[],v=0,y=()=>{v+=1,p.textContent=`Spoken ${v} time${v===1?``:`s`}`,p.dataset.said=v===1?`one`:`many`},b=e=>{let t=(v-1)%3,n=g[(t+2)%3];n?.textContent&&(n.setAttribute(`data-cut`,``),n.style.textDecoration=`line-through`,n.style.color=`var(--sp-muted)`);let r=g[t];r&&(r.textContent=e,r.style.opacity=`1`,r.style.textDecoration=`none`,r.style.color=``,r.removeAttribute(`data-cut`))},x=e=>{for(let e of _)s.clearTimeout(e);_=[],v=0,u.dataset.mode=e,t(u,`data-quiet`,e===`staged`),e===`staged`?u.setAttribute(`aria-busy`,`true`):u.removeAttribute(`aria-busy`),d.textContent=`generating`,d.classList.add(`sp-pending`),p.textContent=`Spoken 0 times`,p.dataset.said=`none`,m.dataset.mode=e,m.textContent=a[e];for(let e of h)e.style.opacity=`0`;f.style.opacity=`1`,h[0]?.before(f);for(let e of g)e.textContent=``,e.style.opacity=`0`,e.removeAttribute(`data-cut`),e.style.textDecoration=`none`,e.style.color=``;i.forEach((t,r)=>{_.push(s.setTimeout(()=>{let t=h[r];t&&(t.style.opacity=`1`,t.after(f)),e!==`staged`&&(y(),b(`“${i.slice(0,r+1).slice(-4).join(` `)}”`))},(r+1)*n))}),_.push(s.setTimeout(()=>{t(u,`data-quiet`,!1),d.textContent=`complete`,d.classList.remove(`sp-pending`),f.style.opacity=`0`,e===`staged`&&(u.setAttribute(`aria-busy`,`false`),y(),b(`“Reply complete, ${i.length} words. A kestrel hovers by holding its head still…”`))},i.length*n+r))};e(o,`mode`).addEventListener(`change`,e=>{x(e.detail)}),x(`staged`)}export{o as mount};