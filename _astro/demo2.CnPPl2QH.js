import{n as e}from"./parts.C-YLuC7Q.js";import{r as t}from"./measure.DK7AY2_i.js";var n={w:450,h:226},r={w:104,h:48},i=22,a=[{id:`a`,label:`Source`,kind:`reads a folder`,x:12,y:88,input:!1,output:!0},{id:`b`,label:`Filter`,kind:`drops duplicates`,x:168,y:22,input:!0,output:!0},{id:`c`,label:`Resize`,kind:`fits to 800px`,x:168,y:152,input:!0,output:!0},{id:`d`,label:`Sink`,kind:`writes a bucket`,x:330,y:88,input:!0,output:!1}],o=[[`a`,`b`],[`a`,`c`],[`b`,`d`]],s=e=>a.find(t=>t.id===e),c=e=>({x:s(e).x+r.w,y:s(e).y+r.h/2}),l=e=>({x:s(e).x,y:s(e).y+r.h/2});function u(e,t){let n=Math.max(38,Math.abs(t.x-e.x)*.5);return`M ${e.x} ${e.y} C ${e.x+n} ${e.y}, ${t.x-n} ${t.y}, ${t.x} ${t.y}`}function d(s){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: auto">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Import pipeline</span>
          <span class="sp-label" data-part="count" data-links="${o.length}" style="font-size: 11px">${o.length} links</span>
        </div>
        <div class="sp-body" style="padding: 12px">
          <div
            data-part="graph"
            data-subject
            data-links="${o.length}"
            role="application"
            aria-label="Import pipeline graph"
            style="position: relative; width: ${n.w}px; height: ${n.h}px; overflow: hidden;
                   background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius);
                   background-image: radial-gradient(circle, var(--sp-line) 1.3px, transparent 1.5px);
                   background-size: 24px 24px; background-position: 6px 6px"
          >
            <svg data-part="wires" aria-hidden="true" viewBox="0 0 ${n.w} ${n.h}"
                 style="position: absolute; left: 0; top: 0; width: ${n.w}px; height: ${n.h}px">
              <g data-part="wire-group" fill="none" stroke="var(--sp-accent)" stroke-width="2.4" stroke-linecap="round"></g>
              <path data-part="pull" fill="none" stroke="var(--sp-accent)" stroke-width="2.4" stroke-linecap="round"
                    stroke-dasharray="6 5" opacity="0" d="M 0 0"></path>
            </svg>
            ${a.map(e=>`
              <div
                class="sp-surface"
                data-part="node-${e.id}"
                style="position: absolute; left: ${e.x}px; top: ${e.y}px; width: ${r.w}px; height: ${r.h}px;
                       padding: 7px 9px; box-shadow: var(--sp-shadow)"
              >
                <span class="sp-heading" style="font-size: 12px">${e.label}</span>
                <div class="sp-text" style="margin-top: 2px; font-size: 10px; line-height: 1.3">${e.kind}</div>
              </div>
              ${e.input?`<span data-part="port-${e.id}-in" data-side="in" data-node="${e.id}"
                        style="position: absolute; left: ${l(e.id).x-7}px; top: ${l(e.id).y-7}px;
                               width: 14px; height: 14px; border-radius: 50%; box-sizing: border-box;
                               background: var(--sp-surface); border: 2.5px solid var(--sp-accent); cursor: crosshair"></span>`:``}
              ${e.output?`<span data-part="port-${e.id}-out" data-side="out" data-node="${e.id}"
                        style="position: absolute; left: ${c(e.id).x-7}px; top: ${c(e.id).y-7}px;
                               width: 14px; height: 14px; border-radius: 50%; box-sizing: border-box;
                               background: var(--sp-accent); border: 2.5px solid var(--sp-accent); cursor: crosshair"></span>`:``}`).join(``)}
          </div>
        </div>
      </div>
    </div>
  `;let d=e(s,`graph`),f=e(s,`wire-group`),p=e(s,`pull`),m=e(s,`count`),h=[...d.querySelectorAll(`[data-side="in"]`)],g=e=>{for(let t of h)t.style.boxShadow=e?`0 0 0 4px var(--sp-accent-soft)`:``},_=[...o],v=()=>{f.innerHTML=_.map(([e,t])=>`<path data-part="wire-${e}-${t}" d="${u(c(e),l(t))}"></path>`).join(``),d.dataset.links=String(_.length),m.dataset.links=String(_.length),m.textContent=`${_.length} links`},y=e=>h.find(t=>{let n=l(t.dataset.node??``);return Math.hypot(n.x-e.x,n.y-e.y)<=i}),b=null;for(let e of d.querySelectorAll(`[data-side="out"]`))e.addEventListener(`pointerdown`,n=>{n.isTrusted&&e.setPointerCapture(n.pointerId),b=e.dataset.node??null;let r=t(n,d);p.setAttribute(`d`,u(c(b??``),r)),p.style.opacity=`1`,g(!0)});d.addEventListener(`pointermove`,e=>{b&&p.setAttribute(`d`,u(c(b),t(e,d)))});let x=e=>{if(!b)return;let n=y(t(e,d))?.dataset.node;n&&n!==b&&!_.some(([e,t])=>e===b&&t===n)&&(_.push([b,n]),v()),b=null,p.style.opacity=`0`,p.setAttribute(`d`,`M 0 0`),g(!1)};d.addEventListener(`pointerup`,x),d.addEventListener(`pointercancel`,x),v()}export{d as mount};