import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{r as n}from"./measure.DK7AY2_i.js";var r={w:400,h:168},i={w:126,h:52},a={x:140,y:100},o={x:32,y:108},s=8,c=[{key:`tide`,x:32,y:14,w:126,h:58,title:`Tide times`},{key:`ferry`,x:246,y:14,w:126,h:58,title:`Ferry times`}],l={x:[`left`,`centre`,`right`],y:[`top`,`middle`,`bottom`]};function u(e,t){let n=e===`x`?i.w:i.h,r=[t,t+n/2,t+n],a;for(let t of c){let n=e===`x`?t.x:t.y,i=e===`x`?t.w:t.h;for(let o of[n,n+i/2,n+i])for(let[n,i]of r.entries()){let r=o-i;Math.abs(r)>s||(!a||Math.abs(r)<Math.abs(a.delta))&&(a={line:o,delta:r,kind:l[e][n]??`edge`,box:t})}}return a}var d=c.map(({key:e,x:t,y:n,w:r,h:i,title:a})=>`
    <div
      class="sp-surface sp-context"
      data-part="neighbour-${e}"
      style="position: absolute; left: ${t}px; top: ${n}px; width: ${r}px; height: ${i}px; padding: 8px 10px"
    >
      <span class="sp-heading" style="font-size: 12px">${a}</span>
      <span class="sp-line" style="display: block; width: 64%; margin-top: 8px"></span>
    </div>`).join(``);function f(s){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 276px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Board</span>
          <span class="sp-text" data-part="readout" style="width: 304px; text-align: right; white-space: nowrap">Drag the card near a neighbour</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px">
          <div data-part="canvas" style="position: relative; width: ${r.w}px; height: ${r.h}px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 6px; overflow: hidden">
            ${d}
            <!-- Where the script drops the card. An anchor carries no paint: a drawn mark
                 would annotate the choreography rather than the term (SPEC §5). -->
            <span
              data-part="target"
              aria-hidden="true"
              style="position: absolute; left: 94px; top: 129px; width: 10px; height: 10px; pointer-events: none"
            ></span>
            <div
              class="sp-surface"
              data-part="card"
              data-x="${a.x}"
              data-y="${a.y}"
              data-snapped="none"
              style="position: absolute; left: 0; top: 0; width: ${i.w}px; height: ${i.h}px; padding: 8px 10px; transform: translate(${a.x}px, ${a.y}px); cursor: grab; touch-action: none; user-select: none"
            >
              <span class="sp-heading" style="font-size: 12px">Slipway notes</span>
              <span class="sp-line" style="display: block; width: 52%; margin-top: 7px"></span>
            </div>
            <span
              data-part="guide-v"
              data-subject
              style="position: absolute; top: 0; height: ${r.h}px; width: 2px; left: 0; background: var(--sp-accent); opacity: 0; transition: opacity 0.1s linear; pointer-events: none"
            ></span>
            <span
              data-part="guide-h"
              style="position: absolute; left: 0; width: ${r.w}px; height: 2px; top: 0; background: var(--sp-accent); opacity: 0; transition: opacity 0.1s linear; pointer-events: none"
            ></span>
            <span
              data-part="badge"
              style="position: absolute; left: 0; top: 0; padding: 1px 5px; border-radius: 4px; background: var(--sp-accent); color: var(--sp-accent-ink); font-size: 11px; font-variant-numeric: tabular-nums; opacity: 0; transition: opacity 0.1s linear; pointer-events: none"
            >0</span>
          </div>
          <div class="sp-row sp-context" style="gap: 8px">
            <sp-segmented data-stage-mode class="sp-segmented" data-axis="Guides" data-part="hold" data-value="drag">
              <button class="sp-segment" data-part="hold-drag" value="drag" style="padding: 5px 10px">While dragging</button>
              <button class="sp-segment" data-part="hold-on" value="held" style="padding: 5px 10px">Held for inspection</button>
            </sp-segmented>
          </div>
        </div>
      </div>
    </div>
  `;let c=e(s,`card`),l=e(s,`guide-v`),f=e(s,`guide-h`),p=e(s,`badge`),m=e(s,`readout`),h=e(s,`hold`),g={...a},_,v=(e,t)=>{e.style.opacity=t?`1`:`0`},y=e=>g.y>=e.y+e.h?Math.round(g.y-(e.y+e.h)):g.y+i.h<=e.y?Math.round(e.y-(g.y+i.h)):0,b=(e,t)=>{if(c.style.transform=`translate(${g.x}px, ${g.y}px)`,c.dataset.x=String(Math.round(g.x)),c.dataset.y=String(Math.round(g.y)),c.dataset.snapped=e?e.kind:`none`,v(l,!!e),v(f,!!t),v(p,!!e),e){l.style.left=`${e.line-1}px`;let t=y(e.box);p.textContent=String(t),p.style.left=`${e.line+8}px`,p.style.top=`${Math.min(r.h-20,Math.max(4,g.y-t/2-9))}px`}t&&(f.style.top=`${t.line-1}px`)},x=()=>{v(l,!1),v(f,!1),v(p,!1)};c.addEventListener(`pointerdown`,e=>{e.isTrusted&&c.setPointerCapture(e.pointerId),_={...n(e,s),from:{...g}},c.style.cursor=`grabbing`,c.style.boxShadow=`var(--sp-shadow)`,t(c,`data-lifted`,!0),m.textContent=`Dragging: nothing lines up yet`}),s.addEventListener(`pointermove`,e=>{let t=_;if(!t)return;let a=n(e,s);g.x=Math.max(0,Math.min(r.w-i.w,t.from.x+a.x-t.x)),g.y=Math.max(0,Math.min(r.h-i.h,t.from.y+a.y-t.y));let o=u(`x`,g.x),c=u(`y`,g.y);o&&(g.x+=o.delta),c&&(g.y+=c.delta),b(o,c),m.textContent=o?`Aligned: ${o.kind} edges, ${y(o.box)} px apart`:`Dragging: nothing lines up yet`});let S=()=>{_&&(_=void 0,c.style.cursor=`grab`,c.style.boxShadow=``,t(c,`data-lifted`,!1),h.value!==`held`&&(x(),m.textContent=`Dropped on the ${c.dataset.snapped} alignment`))};s.addEventListener(`pointerup`,S),s.addEventListener(`pointercancel`,S),h.addEventListener(`change`,()=>{if(h.value===`held`){g.x=o.x,g.y=o.y;let e=u(`x`,o.x);b(e,u(`y`,o.y)),e&&(m.textContent=`Aligned: ${e.kind} edges, ${y(e.box)} px apart`);return}x(),m.textContent=`Guides live only while a hand is moving something`})}export{f as mount};