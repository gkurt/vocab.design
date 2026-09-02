import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{t}from"./motion.B5_YXmsy.js";var n={w:432,h:64},r=240,i=1.14,a=1500,o=[{ms:1050,ease:`cubic-bezier(0.4, 0, 1, 1)`},{ms:1500,ease:`linear`},{ms:1950,ease:`cubic-bezier(0, 0, 0.2, 1)`}],s=2030,c=60,l={slide:`One transform on the card carries all three parts. Loose, each part keeps its own timing and the group comes apart.`,scale:`Scaling the parent spreads its parts apart, because they are inside it. Loose, each part scales about its own centre.`},u=[`FM`,`HL`,`RS`],d=(e,t)=>`
  <span
    data-part="${t}"
    style="display: flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 8px;
           background: var(--sp-accent-soft); color: var(--sp-ink); font-size: 11px; font-weight: 600;
           transform-origin: 50% 50%; will-change: transform"
  >${u[e]}</span>`,f=(e,t,r)=>`
  <div class="sp-stack${r?` sp-context`:``}" style="flex: 0 0 auto; gap: 6px">
    <span class="sp-label" style="font-size: 11px">${e}</span>
    <div
      style="position: relative; width: ${n.w}px; height: ${n.h}px; border-radius: 8px;
             background: var(--sp-surface); border: 1px solid var(--sp-line); overflow: hidden"
    >${t}</div>
  </div>`;function p(n,p){let m=u.map((e,t)=>`
    <span
      style="position: absolute; left: ${16+t*42}px; top: 15px"
    >${d(t,`loose-${t+1}`)}</span>`).join(``),h=`
    <div
      data-part="card" data-subject data-move="slide" data-state="posed"
      style="position: absolute; left: 6px; top: 5px; display: flex; align-items: center; gap: 8px; padding: 10px;
             border: 1px solid var(--sp-line); border-radius: 10px; background: var(--sp-sunken);
             transform-origin: 0% 50%; will-change: transform"
    >${u.map((e,t)=>d(t,`child-${t+1}`)).join(``)}</div>`;n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="scene" data-move="slide" style="height: 286px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Move</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="move" data-axis="Transform" data-value="slide">
            <button class="sp-segment" type="button" data-part="seg-slide" value="slide">Slide</button>
            <button class="sp-segment" type="button" data-part="seg-scale" value="scale">Scale</button>
          </sp-segmented>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; justify-content: center; gap: 10px; padding: 12px">
          ${f(`Loose`,m,!0)}
          ${f(`Parented`,h,!1)}
          <span
            class="sp-text sp-context" data-stage-verdict data-part="note"
            style="flex: 0 0 auto; height: 30px; font-size: 12px; line-height: 1.3"
          >${l.slide}</span>
        </div>
      </div>
    </div>
  `;let g=e(n,`scene`),_=e(n,`card`),v=e(n,`note`),y=u.map((t,r)=>e(n,`loose-${r+1}`)),b=t(n),x=`slide`,S,C,w=()=>x===`scale`?`translateX(${r}px) scale(${i})`:`translateX(${r}px)`,T=(e,t)=>{_.style.transition=t>0?`transform ${a}ms cubic-bezier(0.4, 0, 0.2, 1)`:`none`,_.style.transform=e===`end`?w():`translateX(0) scale(1)`;for(let[n,r]of y.entries()){let i=o[n]??o[0];i&&(r.style.transition=t>0?`transform ${i.ms}ms ${i.ease}`:`none`,r.style.transform=e===`end`?w():`translateX(0) scale(1)`)}},E=()=>{if(p.clearTimeout(S),p.clearTimeout(C),g.dataset.move=x,_.dataset.move=x,v.textContent=l[x],b){T(`end`,0),_.dataset.state=`posed`;return}T(`start`,0),_.dataset.state=`neutral`,S=p.setTimeout(()=>{T(`end`,a),_.dataset.state=`moving`,C=p.setTimeout(()=>{_.dataset.state=`posed`},s)},c)};e(n,`move`).addEventListener(`change`,e=>{x=e.detail,E()}),e(n,`replay`).addEventListener(`click`,E),E()}export{p as mount};