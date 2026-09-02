import{n as e,t}from"./parts.C-YLuC7Q.js";import{n}from"./measure.DK7AY2_i.js";var r=`Every workspace starts on the free tier, and the plans page compares what each tier includes before you upgrade from billing settings.`.split(` `),i=8,a=10,o=28,s=40,c=e=>`
  <button
    type="button"
    data-part="handle-${e}"
    data-edge="${e}"
    ${e===`end`?`data-subject`:``}
    style="position: absolute; left: 0; top: 0; width: ${o}px; height: ${s}px; padding: 0; border: 0; background: transparent; cursor: ew-resize; touch-action: none"
  >
    <span style="position: absolute; left: 13px; top: 8px; width: 2px; height: 24px; background: var(--sp-accent)"></span>
    <span
      style="position: absolute; left: 8px; top: ${e===`start`?0:28}px; width: 12px; height: 12px; border-radius: 50%; background: var(--sp-accent)"
    ></span>
  </button>`;function l(l,u){l.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 225px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Notes</span>
          <span class="sp-text" data-part="readout" style="width: 272px; text-align: right; white-space: nowrap">Edited 4 minutes ago</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface" data-part="page" style="position: relative; height: 122px; padding: 18px 14px">
            <div
              class="sp-context"
              data-part="text"
              style="display: flex; flex-wrap: wrap; row-gap: 4px; width: 340px; margin: 0 auto; font-size: 13px; line-height: 1.55; user-select: none"
            >${r.map((e,t)=>`
      <span
        data-part="word-${t}"
        data-index="${t}"
        style="padding: 2px 4px 2px 0; border-radius: 3px"
      >${e}</span>`).join(``)}</div>
            ${c(`start`)}${c(`end`)}
          </div>
          <div class="sp-row sp-context" style="gap: 10px; justify-content: flex-end">
            <span class="sp-label" data-part="count" style="width: 96px; text-align: right">3 words</span>
          </div>
        </div>
      </div>
    </div>
  `;let d=e(l,`page`),f=e(l,`readout`),p=e(l,`count`),m={start:e(l,`handle-start`),end:e(l,`handle-end`)},h=r.map((t,n)=>e(l,`word-${n}`)),g=i,_=a,v=null,y=e=>{f.textContent=e},b=()=>{for(let[e,n]of h.entries()){let r=e>=g&&e<=_;t(n,`data-selected`,r),n.style.background=r?`var(--sp-accent-soft)`:``}let e=h[g],r=h[_],i=e&&n(e,d),a=r&&n(r,d);i&&(m.start.style.left=`${i.left-o/2}px`,m.start.style.top=`${i.top+i.height/2-s/2}px`),a&&(m.end.style.left=`${a.left+a.width-4-o/2}px`,m.end.style.top=`${a.top+a.height/2-s/2}px`);let c=_-g+1;p.textContent=`${c} word${c===1?``:`s`}`,d.dataset.from=String(g),d.dataset.to=String(_)},x=(e,t)=>{let n=0,r=1/0;for(let[i,a]of h.entries()){let o=a.getBoundingClientRect(),s=Math.max(o.left-e,0,e-o.right),c=Math.max(o.top-t,0,t-o.bottom),l=s*s+c*c;l<r&&(r=l,n=i)}return n},S=(e,t)=>{e===`start`?g=Math.min(t,_):_=Math.max(t,g),b(),y(`${e===`start`?`Start`:`End`} grip on ${r[e===`start`?g:_]}`)};for(let e of[`start`,`end`])m[e].addEventListener(`pointerdown`,n=>{n.preventDefault(),n.isTrusted&&m[e].setPointerCapture(n.pointerId),v=e,t(d,`data-dragging`,!0),y(`Holding the ${e} grip`)});l.addEventListener(`pointermove`,e=>{v&&S(v,x(e.clientX,e.clientY))});let C=e=>{if(!v)return;let n=v;v=null,t(d,`data-dragging`,!1),S(n,x(e.clientX,e.clientY));let i=_-g+1;y(`${i} word${i===1?``:`s`} selected: ${r[g]} to ${r[_]}`)};l.addEventListener(`pointerup`,C),l.addEventListener(`pointercancel`,C),b(),u.setTimeout(b,90)}export{l as mount};