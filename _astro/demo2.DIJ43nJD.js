import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";import{r}from"./measure.DK7AY2_i.js";var i=[{key:`tide`,title:`Tide, wide`,length:`0:42`},{key:`ferry`,title:`Ferry leaving`,length:`1:08`},{key:`slip`,title:`Slipway, close`,length:`0:26`},{key:`bell`,title:`Bell buoy`,length:`0:55`}],a=new Map(i.map(e=>[e.key,e.title])),o=34,s=5,c=6,l=39,u={x:26,y:17},d={x:104,y:78},f=`slip`,p={drag:`The copy lasts exactly as long as the gesture. Hold one to look at it.`,held:`Held: the copy that follows the pointer, and the faint slot it came from.`},m=`
  <span style="display: flex; align-items: center; color: var(--sp-muted)">
    <span style="display: flex">${n(`kebab`,`sp-icon--dots`)}</span>
    <span style="display: flex; margin-left: -9px">${n(`kebab`,`sp-icon--dots`)}</span>
  </span>`;function h(n){let h=i.map(({key:e,title:t,length:n},r)=>`
      <li
        class="sp-list-item sp-surface sp-context"
        data-part="row-${e}"
        data-key="${e}"
        data-index="${r}"
        style="height: ${o}px; padding: 0 8px; border-top: 0; border-radius: 6px; transition: opacity 0.12s linear"
      >
        <button
          class="sp-icon-button"
          type="button"
          data-part="grip-${e}"
          aria-label="Move ${t}"
          style="width: 24px; height: 24px; cursor: grab; touch-action: none"
        >${m}</button>
        <span class="sp-text sp-text--ink sp-grow" style="min-width: 0">${t}</span>
        <span class="sp-label">${n}</span>
      </li>`).join(``);n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 252px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Shot list</span>
          <span class="sp-text" data-part="readout" style="width: 250px; text-align: right; white-space: nowrap; overflow: hidden">
            Drag a shot by its grip
          </span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px">
          <div
            data-part="list"
            data-order="${i.map(e=>e.key).join(`-`)}"
            style="position: relative; width: 100%; padding: ${c}px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            <ul class="sp-list" data-part="rows" style="gap: ${s}px; margin: 0; padding: 0">${h}</ul>
            <div
              class="sp-surface sp-row"
              data-part="preview"
              data-subject
              data-carrying=""
              style="position: absolute; left: 0; top: 0; width: 210px; height: ${o}px; gap: 10px; padding: 0 10px;
                     box-shadow: var(--sp-shadow); rotate: -1.5deg; pointer-events: none; opacity: 0; visibility: hidden;
                     transition: opacity 0.12s linear, visibility 0.12s"
            >
              <span class="sp-text sp-text--ink sp-grow" data-part="preview-title" style="min-width: 0">Slipway, close</span>
              <span class="sp-label" data-part="preview-count" style="font-size: 10px">1 item</span>
            </div>
          </div>
        </div>
      </div>
              <span class="sp-text" data-stage-verdict data-part="note" style="width: 252px; font-size: 11px">${p.drag}</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-part="hold" data-axis="Preview" data-value="drag">
          <button class="sp-segment" data-part="hold-drag" value="drag" style="padding: 5px 10px">While dragging</button>
          <button class="sp-segment" data-part="hold-on" value="held" style="padding: 5px 10px">Held for inspection</button>
        </sp-segmented>
      
    </div>
  `;let g=e(n,`list`),_=e(n,`rows`),v=e(n,`preview`),y=e(n,`preview-title`),b=e(n,`readout`),x=e(n,`note`),S=e(n,`hold`),C=()=>[..._.children],w=(e,n)=>{e&&(t(e,`data-lifted`,n),e.style.opacity=n?`0.34`:``,e.style.borderStyle=n?`dashed`:``)},T=(e,t)=>{if(!t){v.dataset.carrying=``,v.style.opacity=`0`,v.style.visibility=`hidden`;return}v.dataset.carrying=e,y.textContent=a.get(e)??``,v.style.translate=`${t.x}px ${t.y}px`,v.style.opacity=`0.86`,v.style.visibility=`visible`},E=()=>{let e=C();e.forEach((e,t)=>{e.dataset.index=String(t)}),g.dataset.order=e.map(e=>e.dataset.key).join(`-`)},D=e=>Math.max(0,Math.min(i.length,Math.round((e-c)/l))),O=()=>{for(let{key:t}of i)w(e(n,`row-${t}`),t===f);T(f,d),b.textContent=`Carrying ${a.get(f)}`,x.textContent=p.held},k;for(let{key:t,title:a}of i){let i=e(n,`grip-${t}`);i.addEventListener(`pointerdown`,o=>{o.isTrusted&&i.setPointerCapture(o.pointerId);let s=e(n,`row-${t}`),c=r(o,g);k={row:s,key:t},w(s,!0),T(t,{x:c.x-u.x,y:c.y-u.y}),b.textContent=`Carrying ${a}`})}n.addEventListener(`pointermove`,e=>{let t=k;if(!t)return;let n=r(e,g);T(t.key,{x:n.x-u.x,y:n.y-u.y});let i=D(n.y),o=C()[i-1],s=a.get(o?.dataset.key??``);b.textContent=i===0||!s?`Would land at the top`:`Would land under ${s}`});let A=e=>{let t=k;if(!t)return;k=void 0,w(t.row,!1);let n=D(r(e,g).y),i=C()[n];if(i!==t.row&&(i?_.insertBefore(t.row,i):_.append(t.row)),E(),S.value===`held`){O();return}T(t.key,void 0),b.textContent=`Dropped into slot ${C().indexOf(t.row)+1}`};n.addEventListener(`pointerup`,A),n.addEventListener(`pointercancel`,A),S.addEventListener(`change`,()=>{if(S.value===`held`){O();return}for(let{key:t}of i)w(e(n,`row-${t}`),!1);T(``,void 0),b.textContent=`Drag a shot by its grip`,x.textContent=p.drag})}export{h as mount};