import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import{r}from"./measure.DK7AY2_i.js";var i=[{key:`mail`,title:`Answer the mail`,meta:`Today`},{key:`plants`,title:`Water the plants`,meta:`Today`},{key:`van`,title:`Wash the van`,meta:`Sat`},{key:`bins`,title:`Sort the bins`,meta:`Sat`}],a=40,o=4,s=6,c=44,l=`translate 0.16s var(--sp-ease)`;function u(u){let d=`
    <span style="display: flex; align-items: center; color: var(--sp-muted)">
      <span style="display: flex">${n(`kebab`,`sp-icon--dots`)}</span>
      <span style="display: flex; margin-left: -9px">${n(`kebab`,`sp-icon--dots`)}</span>
    </span>`,f=i.map(({key:e,title:t,meta:n},r)=>`
      <li
        class="sp-list-item sp-surface"
        data-part="row-${e}"
        data-key="${e}"
        data-index="${r}"
        style="height: ${a}px; padding: 0 8px; border-top: 0; border-radius: 6px"
      >
        <button
          class="sp-icon-button"
          type="button"
          data-part="grip-${e}"
          aria-label="Reorder ${t}"
          style="width: 26px; height: 26px; cursor: grab; touch-action: none"
        >${d}</button>
        <span class="sp-text sp-text--ink sp-grow" style="min-width: 0">${t}</span>
        <span class="sp-label">${n}</span>
      </li>`).join(``);u.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Weekly plan</span>
          <span class="sp-text">Drag to reorder</span>
        </div>
        <div class="sp-body">
          <ul
            class="sp-list"
            data-part="list"
            data-subject
            data-order="${i.map(e=>e.key).join(`-`)}"
            style="gap: ${o}px; padding: ${s}px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >${f}</ul>
        </div>
      </div>
    </div>
  `;let p=e(u,`list`),m=()=>[...p.children],h=()=>{let e=m();e.forEach((e,t)=>{e.dataset.index=String(t)}),p.dataset.order=e.map(e=>e.dataset.key).join(`-`)},g=e=>{let t=r({clientX:0,clientY:e},p).y-s;return Math.max(0,Math.min(i.length-1,Math.floor(t/c)))},_;for(let{key:n}of i){let r=e(u,`grip-${n}`);r.addEventListener(`pointerdown`,i=>{i.isTrusted&&r.setPointerCapture(i.pointerId);let a=e(u,`row-${n}`),o=m();for(let e of o)e.style.transition=l;a.style.transition=`none`,a.style.position=`relative`,a.style.zIndex=`1`,a.style.boxShadow=`var(--sp-shadow)`,t(a,`data-lifted`,!0);let s=o.indexOf(a);_={row:a,from:s,startY:i.clientY,slot:s}})}u.addEventListener(`pointermove`,e=>{let t=_;t&&(t.slot=g(e.clientY),t.row.style.translate=`0 ${e.clientY-t.startY}px`,m().forEach((e,n)=>{if(e===t.row)return;let r=0;n>t.from&&n<=t.slot?r=-44:n<t.from&&n>=t.slot&&(r=c),e.style.translate=r===0?``:`0 ${r}px`}))});let v=()=>{let e=_;if(!e)return;_=void 0;for(let e of m())e.style.transition=`none`,e.style.translate=``;e.row.style.position=``,e.row.style.zIndex=``,e.row.style.boxShadow=``,t(e.row,`data-lifted`,!1);let n=m()[e.slot];n&&n!==e.row&&(e.slot<e.from?p.insertBefore(e.row,n):n.after(e.row)),h()};u.addEventListener(`pointerup`,v),u.addEventListener(`pointercancel`,v)}export{u as mount};