import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{r as n}from"./measure.DK7AY2_i.js";var r={w:396,h:168},i={w:82,h:56},a={x:16,y:36,gapX:12,gapY:8,cols:4},o={x:26,y:18},s={x:200,y:116},c={x1:26,y1:18,x2:200,y2:116},l=[`Tide chart`,`Slipway`,`Ferry log`,`Harbour`,`Moorings`,`Buoys`,`Lights`,`Charts`].map((e,t)=>{let n=t%a.cols,r=Math.floor(t/a.cols),o=a.x+n*(i.w+a.gapX),s=a.y+r*(i.h+a.gapY);return{key:t+1,name:e,x:o,y:s}}),u=l.map(({key:e,name:t,x:n,y:r})=>`
      <div
        class="sp-surface"
        data-part="tile-${e}"
        style="position: absolute; left: ${n}px; top: ${r}px; width: ${i.w}px; height: ${i.h}px; padding: 7px 8px; user-select: none"
      >
        <span class="sp-line" style="display: block; width: 60%; height: 20px; border-radius: 3px"></span>
        <span class="sp-label" style="display: block; margin-top: 6px; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${t}</span>
      </div>`).join(``),d=(e,t)=>`
  <span
    data-part="${e}"
    style="position: absolute; left: ${t.x-6}px; top: ${t.y-6}px; width: 12px; height: 12px; pointer-events: none"
  ></span>`;function f(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 240px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Survey files</span>
          <span class="sp-text" data-part="readout" data-count="0" style="width: 210px; text-align: right; white-space: nowrap">Drag from empty space</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px">
          <div
            data-part="canvas"
            style="position: relative; width: ${r.w}px; height: ${r.h}px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 6px; overflow: hidden; touch-action: none"
          >
            ${u}
            ${d(`start`,o)}
            ${d(`end`,s)}
            <span
              data-part="lasso"
              data-subject
              style="position: absolute; left: 0; top: 0; width: 0; height: 0; border: 1px dashed var(--sp-accent); background: var(--sp-accent-soft); opacity: 0; transition: opacity 0.1s linear; pointer-events: none"
            ></span>
          </div>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Boundary" data-part="hold" data-value="drag">
            <button class="sp-segment" data-part="hold-drag" value="drag" style="padding: 5px 10px">Dragging</button>
            <button class="sp-segment" data-part="hold-on" value="held" style="padding: 5px 10px">Held</button>
          </sp-segmented>
        </div>
      </div>
    </div>
  `;let f=e(a,`canvas`),p=e(a,`lasso`),m=e(a,`readout`),h=e(a,`hold`),g=l.map(t=>({...t,el:e(a,`tile-${t.key}`)})),_,v=new Set,y=e=>{for(let n of g){let r=v.has(n.key);t(n.el,`data-candidate`,r&&!e),t(n.el,`data-selected`,r&&e),n.el.style.boxShadow=r?`0 0 0 1.5px var(--sp-accent)`:``,n.el.style.background=r?`var(--sp-accent-soft)`:``}m.dataset.count=String(v.size)},b=e=>{v.clear();for(let t of g)e.x1<t.x+i.w&&e.x2>t.x&&e.y1<t.y+i.h&&e.y2>t.y&&v.add(t.key)},x=e=>{p.style.left=`${e.x1}px`,p.style.top=`${e.y1}px`,p.style.width=`${e.x2-e.x1}px`,p.style.height=`${e.y2-e.y1}px`,p.style.opacity=`1`},S=e=>n(e,f);f.addEventListener(`pointerdown`,e=>{e.target instanceof HTMLElement&&e.target.closest(`[data-part^="tile-"]`)||(e.isTrusted&&f.setPointerCapture(e.pointerId),_=S(e),v.clear(),y(!0),x({x1:_.x,y1:_.y,x2:_.x,y2:_.y}),m.textContent=`Drawing: nothing caught yet`)}),a.addEventListener(`pointermove`,e=>{if(!_)return;let t=S(e),n={x1:Math.min(_.x,t.x),y1:Math.min(_.y,t.y),x2:Math.max(_.x,t.x),y2:Math.max(_.y,t.y)};x(n),b(n),y(!1),m.textContent=`Holding ${v.size} of ${g.length}`});let C=()=>{_&&(_=void 0,y(!0),m.textContent=`${v.size} of ${g.length} selected`,h.value!==`held`&&(p.style.opacity=`0`))};a.addEventListener(`pointerup`,C),a.addEventListener(`pointercancel`,C),h.addEventListener(`change`,()=>{if(h.value===`held`){x(c),b(c),y(!1),m.textContent=`${v.size} of ${g.length} selected`;return}p.style.opacity=`0`,y(!0),m.textContent=`${v.size} of ${g.length} selected`}),y(!0)}export{f as mount};