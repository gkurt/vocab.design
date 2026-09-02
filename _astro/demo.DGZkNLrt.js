import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import{n as r}from"./measure.DK7AY2_i.js";import{t as i}from"./motion.B5_YXmsy.js";var a=.34,o=900,s=1700,c=40,l=Math.round(s/c),u=37,d=(e,t,n=!1)=>`
  <li
    class="sp-list-item"
    data-part="row-${e}"
    style="position: relative; height: ${u}px"
  >
    <span
      class="sp-checkbox"
      data-part="box-${e}"
      ${n?`data-checked`:``}
      aria-hidden="true"
      style="cursor: default"
    ></span>
    <span
      class="sp-grow"
      data-part="text-${e}"
      data-value="${t}"
      style="${n?`text-decoration: line-through; color: var(--sp-muted)`:``}"
    >${t}</span>
    <span style="flex: 0 0 auto; display: flex; justify-content: flex-end; width: 84px">
      <span class="sp-chip" data-part="mark-${e}" hidden style="cursor: default"></span>
    </span>
  </li>`;function f(s,f){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 448px; height: 292px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Kitchen remodel</span>
          <span class="sp-label">To-dos</span>
        </div>
        <div class="sp-body sp-stack" style="gap: 10px">
          <div class="sp-surface" data-part="card" style="position: relative; padding: 6px 8px">
            <div
              data-part="wash-layer"
              style="position: absolute; inset: 0; z-index: 0; pointer-events: none"
            >
              <div
                data-part="wash"
                data-subject
                data-wash="clear"
                data-on="tile"
                style="position: absolute; left: 0; top: 0; width: 0; height: ${u}px;
                       border-radius: 6px; background: var(--sp-warn); opacity: 0"
              ></div>
            </div>
            <ul class="sp-list sp-context" style="position: relative; z-index: 1">
              ${d(`handles`,`Order the cabinet handles`,!0)}
              ${d(`tile`,`Pick tile for the backsplash`)}
              ${d(`electrician`,`Book the electrician`)}
              ${d(`template`,`Confirm the countertop template`)}
            </ul>
          </div>
          <div class="sp-row sp-context" style="gap: 8px">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="rename">
              Ana renames one
            </button>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="check">
              Ravi checks one off
            </button>
          </div>
          <p class="sp-text sp-context" data-stage-verdict data-part="legend" style="margin: 0">
            Colour says where; the chip says what.
          </p>
        </div>
      </div>
    </div>
  `;let p=e(s,`wash-layer`),m=e(s,`wash`),h={tile:e(s,`row-tile`),electrician:e(s,`row-electrician`)},g=new Map,_=()=>{for(let[e,t]of Object.entries(h)){let n=r(t,p);g.set(e,{left:n.left,top:n.top,width:n.width,height:n.height})}},v=e=>{let t=g.get(e);return t&&t.width>2&&t.height>2?t:(_(),g.get(e)??{left:0,top:0,width:0,height:u})},y=e=>{let t=v(e);m.style.left=`${t.left}px`,m.style.top=`${t.top}px`,m.style.width=`${t.width}px`,m.style.height=`${t.height}px`,m.dataset.on=e};_(),y(`tile`);let b,x=()=>{let e=0,t=()=>{if(e+=1,e>=l){m.style.opacity=`0`,m.dataset.wash=`clear`;return}let n=1-e/l;m.style.opacity=String(a*n**1.6),m.dataset.wash=`fading`,b=f.setTimeout(t,c)};b=f.setTimeout(t,o)},S=e=>{f.clearTimeout(b),y(e),m.style.opacity=String(a),m.dataset.wash=`full`,i(s)||x()},C=(t,r,i)=>{let a=e(s,`mark-${t}`);a.innerHTML=`${n(i)}<span>${r}</span>`,a.hidden=!1};e(s,`rename`).addEventListener(`click`,()=>{let t=e(s,`text-tile`),n=`Pick tile for the backsplash (slate)`;t.textContent=n,t.dataset.value=n,C(`tile`,`Edited`,`pencil`),h.tile.dataset.changed=``,S(`tile`)}),e(s,`check`).addEventListener(`click`,()=>{let n=e(s,`text-electrician`);n.style.textDecoration=`line-through`,n.style.color=`var(--sp-muted)`,t(e(s,`box-electrician`),`data-checked`,!0),C(`electrician`,`Done`,`check`),h.electrician.dataset.changed=``,S(`electrician`)})}export{f as mount};