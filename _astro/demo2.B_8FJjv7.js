import{n as e,t}from"./parts.C-YLuC7Q.js";import{r as n}from"./measure.DK7AY2_i.js";var r={w:450,h:196},i={w:150,h:150,y:22},a=[58,92,126],o=26,s={number:{name:`Number`,hue:`#8b93a1`,diamond:!1},color:{name:`Color`,hue:`#d9a52f`,diamond:!1},vector:{name:`Vector`,hue:`#8a72e0`,diamond:!0}},c=[{id:`fac`,label:`Fac`,type:`number`,row:0},{id:`color`,label:`Color`,type:`color`,row:1},{id:`vector`,label:`Vector`,type:`vector`,row:2}],l=[{id:`normal`,label:`Normal`,type:`vector`,row:0},{id:`strength`,label:`Strength`,type:`number`,row:1},{id:`height`,label:`Height`,type:`number`,row:2}],u=14,d=286,f=e=>({x:u+i.w,y:i.y+a[e.row]}),p=e=>({x:d,y:i.y+a[e.row]}),m={rest:`Every port declares a type. A wire lands only where its own type is accepted.`,refused:`Refused: a Color output has nothing a Number port could read.`,linked:`Vector into Vector, so the wire lands and the connection is made.`};function h(e,t){let n=s[e.type],r=t===`out`?f(e):p(e),i=n.diamond?`border-radius: 3px; transform: rotate(45deg)`:`border-radius: 50%`,a=t===`out`?n.hue:`var(--sp-surface)`;return`<span data-part="port-${t}-${e.id}" data-type="${e.type}" data-side="${t}"
                style="position: absolute; left: ${r.x-8}px; top: ${r.y-8}px; width: 16px; height: 16px;
                       box-sizing: border-box; background: ${a}; border: 3px solid ${n.hue}; ${i}; cursor: crosshair"></span>`}function g(e,t){let n=Math.max(46,Math.abs(t.x-e.x)*.55);return`M ${e.x} ${e.y} C ${e.x+n} ${e.y}, ${t.x-n} ${t.y}, ${t.x} ${t.y}`}function _(_){_.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: auto">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Material</span>
          ${Object.keys(s).map(e=>{let t=s[e],n=t.diamond?`border-radius: 2px; transform: rotate(45deg)`:`border-radius: 50%`;return`<span class="sp-row" style="gap: 5px">
                <span style="width: 10px; height: 10px; background: ${t.hue}; ${n}"></span>
                <span class="sp-label" style="font-size: 10px">${t.name}</span>
              </span>`}).join(``)}
        </div>
        <div class="sp-body" style="padding: 12px; display: flex; flex-direction: column; gap: 8px">
          <div
            data-part="scene"
            style="position: relative; width: ${r.w}px; height: ${r.h}px; overflow: hidden;
                   background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            <svg aria-hidden="true" viewBox="0 0 ${r.w} ${r.h}"
                 style="position: absolute; left: 0; top: 0; width: ${r.w}px; height: ${r.h}px">
              <g data-part="wires" fill="none" stroke-width="3" stroke-linecap="round"></g>
              <path data-part="pull" fill="none" stroke-width="3" stroke-linecap="round" stroke-dasharray="7 6" opacity="0" d="M 0 0"></path>
            </svg>
            <div class="sp-surface" data-part="node-noise"
                 style="position: absolute; left: ${u}px; top: ${i.y}px; width: ${i.w}px; height: ${i.h}px;
                        padding: 8px 0 0; box-shadow: var(--sp-shadow)">
              <span class="sp-heading" style="display: block; padding: 0 10px; font-size: 12px">Noise</span>
              <span class="sp-label" style="display: block; padding: 2px 10px 0; font-size: 10px">outputs</span>
            </div>
            ${c.map(e=>`
              <span class="sp-text sp-text--ink" style="position: absolute; left: ${u}px; top: ${i.y+a[e.row]-9}px;
                           width: ${i.w-14}px; text-align: right; font-size: 11px; line-height: 18px">${e.label}</span>
              ${h(e,`out`)}`).join(``)}
            <div class="sp-surface" data-part="node-bump"
                 style="position: absolute; left: ${d}px; top: ${i.y}px; width: ${i.w}px; height: ${i.h}px;
                        padding: 8px 0 0; box-shadow: var(--sp-shadow)">
              <span class="sp-heading" style="display: block; padding: 0 10px; font-size: 12px">Bump</span>
              <span class="sp-label" style="display: block; padding: 2px 10px 0; font-size: 10px">inputs</span>
            </div>
            ${l.map(e=>`
              <span class="sp-text sp-text--ink" style="position: absolute; left: 300px; top: ${i.y+a[e.row]-9}px;
                           width: ${i.w-14}px; font-size: 11px; line-height: 18px">${e.label}</span>
              ${h(e,`in`)}`).join(``)}
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="verdict" data-state="rest" style="height: 19px; font-size: 11px; overflow: hidden">${m.rest}</span>
        </div>
      </div>
    </div>
  `;let v=e(_,`scene`),y=e(_,`wires`),b=e(_,`pull`),x=e(_,`verdict`),S=e=>[...v.querySelectorAll(`[data-side="${e}"]`)],C=[{from:c[0],to:l[2]}],w=()=>{y.innerHTML=C.map(({from:e,to:t})=>`<path data-part="wire-${e.id}-${t.id}" d="${g(f(e),p(t))}" stroke="${s[e.type].hue}"></path>`).join(``)},T=e=>{x.dataset.state=e,x.textContent=m[e],x.style.color=e===`refused`?`var(--sp-warn)`:``},E=e=>{for(let t of S(`in`)){let n=e!==null&&t.dataset.type===e;t.style.boxShadow=n?`0 0 0 5px color-mix(in srgb, ${s[t.dataset.type].hue} 30%, transparent)`:``}},D=()=>{for(let e of S(`in`))t(e,`data-refused`,!1),e.style.borderColor=s[e.dataset.type].hue},O=null;for(let e of S(`out`))e.addEventListener(`pointerdown`,t=>{t.isTrusted&&e.setPointerCapture(t.pointerId),O=c.find(t=>`port-out-${t.id}`===e.dataset.part)??null,O&&(D(),b.setAttribute(`stroke`,s[O.type].hue),b.setAttribute(`d`,g(f(O),n(t,v))),b.style.opacity=`1`,E(O.type))});v.addEventListener(`pointermove`,e=>{O&&b.setAttribute(`d`,g(f(O),n(e,v)))});let k=r=>{if(!O)return;let i=n(r,v),a=l.find(e=>Math.hypot(p(e).x-i.x,p(e).y-i.y)<=o);if(a&&a.type===O.type)C.some(({to:e})=>e.id===a.id)||C.push({from:O,to:a}),w(),T(`linked`);else if(a){let n=e(_,`port-in-${a.id}`);t(n,`data-refused`,!0),n.style.borderColor=`var(--sp-warn)`,T(`refused`)}O=null,b.style.opacity=`0`,b.setAttribute(`d`,`M 0 0`),E(null)};v.addEventListener(`pointerup`,k),v.addEventListener(`pointercancel`,k),e(_,`port-in-normal`).setAttribute(`data-subject`,``),w()}export{_ as mount};