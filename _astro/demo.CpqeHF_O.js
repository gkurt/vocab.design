import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";import{r}from"./measure.DK7AY2_i.js";var i=[{key:`tide`,title:`Tide Song`},{key:`ferry`,title:`Ferry Lights`},{key:`slip`,title:`Slipway`},{key:`harbour`,title:`Harbour Bell`}],a=new Map(i.map(e=>[e.key,e.title])),o=38,s=4,c=6,l=42,u=2,d=e=>c+e*l-s/2-2,f=`
  <span style="display: flex; align-items: center; color: var(--sp-muted)">
    <span style="display: flex">${n(`kebab`,`sp-icon--dots`)}</span>
    <span style="display: flex; margin-left: -9px">${n(`kebab`,`sp-icon--dots`)}</span>
  </span>`;function p(n){let p=i.map(({key:e,title:t},n)=>`
      <li
        class="sp-list-item sp-surface sp-context"
        data-part="row-${e}"
        data-key="${e}"
        data-index="${n}"
        style="height: ${o}px; padding: 0 8px; border-top: 0; border-radius: 6px"
      >
        <button
          class="sp-icon-button"
          type="button"
          data-part="grip-${e}"
          aria-label="Move ${t}"
          style="width: 26px; height: 26px; cursor: grab; touch-action: none"
        >${f}</button>
        <span class="sp-text sp-text--ink sp-grow" style="min-width: 0">${t}</span>
        <span class="sp-label">3:0${n+1}</span>
      </li>`).join(``);n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 292px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Playlist</span>
          <span class="sp-text" data-part="readout" style="width: 250px; text-align: right; white-space: nowrap">Drag a track by its grip</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px">
          <div
            data-part="list"
            data-order="${i.map(e=>e.key).join(`-`)}"
            style="position: relative; width: 100%; padding: ${c}px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            <ul class="sp-list" data-part="rows" style="gap: ${s}px; margin: 0; padding: 0">${p}</ul>
            <span
              data-part="indicator"
              data-subject
              data-slot="0"
              style="position: absolute; left: ${c}px; right: ${c}px; top: ${d(0)}px; height: 4px; border-radius: 2px; background: var(--sp-accent); opacity: 0; transition: opacity 0.1s linear, top 0.1s linear; pointer-events: none"
            >
              <span
                style="position: absolute; left: -4px; top: -4px; width: 12px; height: 12px; border-radius: 50%; border: 3px solid var(--sp-accent); background: var(--sp-surface)"
              ></span>
            </span>
          </div>
          <div class="sp-row sp-context" style="gap: 8px">
            <sp-segmented data-stage-mode class="sp-segmented" data-part="hold" data-axis="Indicator" data-value="drag">
              <button class="sp-segment" data-part="hold-drag" value="drag" style="padding: 5px 10px">While dragging</button>
              <button class="sp-segment" data-part="hold-on" value="held" style="padding: 5px 10px">Held for inspection</button>
            </sp-segmented>
          </div>
        </div>
      </div>
    </div>
  `;let m=e(n,`list`),h=e(n,`rows`),g=e(n,`indicator`),_=e(n,`readout`),v=e(n,`hold`),y=()=>[...h.children],b=(e,t)=>{g.dataset.slot=String(e),g.style.top=`${d(e)}px`,g.style.opacity=t?`1`:`0`},x=()=>{let e=y();e.forEach((e,t)=>{e.dataset.index=String(t)}),m.dataset.order=e.map(e=>e.dataset.key).join(`-`)},S=e=>Math.max(0,Math.min(i.length,Math.round((e-c)/l))),C;for(let{key:a,title:o}of i){let i=e(n,`grip-${a}`);i.addEventListener(`pointerdown`,s=>{s.isTrusted&&i.setPointerCapture(s.pointerId);let c=e(n,`row-${a}`),l=y().indexOf(c);c.style.position=`relative`,c.style.zIndex=`1`,c.style.boxShadow=`var(--sp-shadow)`,t(c,`data-lifted`,!0),C={row:c,from:l,startY:r(s,m).y},b(l,!0),_.textContent=`Carrying ${o}`})}n.addEventListener(`pointermove`,e=>{let t=C;if(!t)return;let n=r(e,m).y;t.row.style.translate=`0 ${n-t.startY}px`;let i=S(n);b(i,!0);let o=y()[i-1],s=a.get(o?.dataset.key??``);_.textContent=i===0||!s?`Drops above the first track`:`Drops below ${s}`});let w=()=>{let e=C;if(!e)return;C=void 0,e.row.style.translate=``,e.row.style.position=``,e.row.style.zIndex=``,e.row.style.boxShadow=``,t(e.row,`data-lifted`,!1);let n=Number(g.dataset.slot??0),r=y()[n];if(r!==e.row&&(r?h.insertBefore(e.row,r):h.append(e.row)),x(),v.value===`held`){b(u,!0),_.textContent=`Drop line held`;return}b(n,!1),_.textContent=`Dropped into slot ${n+1}`};n.addEventListener(`pointerup`,w),n.addEventListener(`pointercancel`,w),v.addEventListener(`change`,()=>{if(v.value===`held`){b(u,!0),_.textContent=`Drop line held`;return}b(u,!1),_.textContent=`Drag a track by its grip`})}export{p as mount};