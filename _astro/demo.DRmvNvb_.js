import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=240,n=168,r=40320,i={dominant:`#ffffff`,secondary:`#46557f`,accent:`#e2543a`},a=`#eef0f5`,o=[{key:`header`,box:`left: 0; top: 0`,w:240,h:26,radius:`0`,roles:{balanced:`secondary`,shout:`accent`}},{key:`sidebar`,box:`left: 0; top: 26px`,w:42,h:142,radius:`0`,roles:{balanced:`secondary`,shout:`secondary`}},{key:`panel`,box:`left: 54px; top: 38px`,w:150,h:34,radius:`6px`,roles:{balanced:`dominant`,shout:`accent`}},{key:`chip`,box:`left: 54px; top: 84px`,w:84,h:22,radius:`999px`,roles:{balanced:`accent`,shout:`accent`}},{key:`cta`,box:`left: 54px; top: 128px`,w:80,h:28,radius:`7px`,roles:{balanced:`accent`,shout:`accent`}}],s=e=>{let t=0,n=0;for(let r of o){let i=r.roles[e];i===`secondary`&&(t+=r.w*r.h),i===`accent`&&(n+=r.w*r.h)}let i=Math.round(t/r*100),a=Math.round(n/r*100);return{dominant:100-i-a,secondary:i,accent:a}},c={balanced:`Sixty percent quiet, thirty percent structure, ten percent accent. Two small things are the only red on the screen.`,shout:`The same three colours, different amounts. With the accent on nearly forty percent of the surface it points at nothing.`},l=[`dominant`,`secondary`,`accent`],u={dominant:`Dominant`,secondary:`Secondary`,accent:`Accent`};function d(r){let d=s(`balanced`),f=o.map(e=>`<span data-part="${e.key}" style="position: absolute; ${e.box}; width: ${e.w}px; height: ${e.h}px;
                  border-radius: ${e.radius}; background: ${i[e.roles.balanced]}"></span>`).join(``),p=l.map(e=>`
      <div class="sp-row" style="gap: 7px; height: 18px">
        <span class="sp-swatch" style="flex: 0 0 auto; width: 10px; height: 10px; border-radius: 3px;
              box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.4); --sp-swatch: ${i[e]}"></span>
        <span class="sp-text" style="flex: 1 1 auto; font-size: 11px">${u[e]}</span>
        <span class="sp-text sp-text--ink" data-part="pct-${e}" style="font-size: 11px;
              font-variant-numeric: tabular-nums">${d[e]}%</span>
      </div>`).join(``);r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 438px; padding: 13px 18px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="balanced" data-axis="Mix" data-term="balanced">
            <button class="sp-segment" data-part="seg-balanced" value="balanced">60 30 10</button>
            <button class="sp-segment" data-part="seg-shout" value="shout">Accent heavy</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 14px; margin-top: 12px; align-items: flex-start">
          <div data-part="screen" data-subject data-pose="[data-mix=balanced]" data-mix="balanced"
               style="position: relative; flex: 0 0 auto; width: ${t}px; height: ${n}px; border-radius: 8px;
                      overflow: hidden; background: ${a}">
            ${f}
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 auto; min-width: 0; gap: 8px">
            <span class="sp-label">Ink on the page</span>
            <div data-part="bar" style="display: flex; height: 15px; border-radius: 999px; overflow: hidden;
                 box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.4)">
              ${l.map(e=>`<span data-part="bar-${e}" style="width: ${d[e]}%; background: ${i[e]};
                                 transition: width 0.32s var(--sp-ease)"></span>`).join(``)}
            </div>
            ${p}
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mix="balanced"
           style="margin: 9px 0 0; height: 28px; font-size: 10.5px; line-height: 1.35">${c.balanced}</p>
      </div>
    </div>
  `;let m=e(r,`screen`),h=e(r,`caption`),g=t=>{let n=t===`shout`?`shout`:`balanced`,a=s(n);m.dataset.mix=n;for(let t of o)e(r,t.key).style.background=i[t.roles[n]];for(let t of l)e(r,`bar-${t}`).style.width=`${a[t]}%`,e(r,`pct-${t}`).textContent=`${a[t]}%`;h.dataset.mix=n,h.textContent=c[n]};g(`balanced`),e(r,`segmented`).addEventListener(`change`,e=>g(e.detail))}export{d as mount};