import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={w:450,h:176},n={w:54,h:24},r=[{id:`a`,label:`Ingest`},{id:`b`,label:`Clean`},{id:`c`,label:`Enrich`},{id:`d`,label:`Join`},{id:`e`,label:`Report`},{id:`f`,label:`Alert`}],i=[[`a`,`b`],[`a`,`c`],[`b`,`d`],[`c`,`d`],[`d`,`e`],[`d`,`f`]],a={dropped:{at:{a:{x:206,y:36},b:{x:66,y:110},c:{x:326,y:52},d:{x:156,y:146},e:{x:388,y:132},f:{x:58,y:36}},note:`Placed by hand, one node at a time. Nothing about the picture says which way the work flows.`},layered:{at:{a:{x:45,y:88},b:{x:165,y:46},c:{x:165,y:130},d:{x:285,y:88},e:{x:405,y:46},f:{x:405,y:130}},note:`Layered ranks each node by what it depends on, so every edge points the same way. The arrangement for a flow.`},radial:{at:{a:{x:97,y:88},b:{x:185,y:147},c:{x:329,y:124},d:{x:225,y:88},e:{x:329,y:52},f:{x:185,y:29}},note:`Radial puts the busiest node at the centre and its neighbours on a ring. The arrangement for a hub.`},force:{at:{a:{x:65,y:136},b:{x:142,y:72},c:{x:163,y:157},d:{x:254,y:89},e:{x:345,y:21},f:{x:367,y:106}},note:`Force-directed lets edges pull and nodes push apart until it settles. The arrangement for a mesh with no direction.`}},o=`layered`,s=e=>e in a?e:o,c=`0.5s var(--sp-ease)`;function l(l){l.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: auto">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Arrange</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="picker" data-value="${o}" data-axis="Layout">
            <button class="sp-segment" type="button" data-part="seg-dropped" value="dropped">by hand</button>
            <button class="sp-segment" type="button" data-part="seg-layered" value="layered">layered</button>
            <button class="sp-segment" type="button" data-part="seg-radial" value="radial">radial</button>
            <button class="sp-segment" type="button" data-part="seg-force" value="force">force</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="padding: 12px; display: flex; flex-direction: column; gap: 8px">
          <div
            data-part="graph"
            data-subject
            data-pose=":not([data-layout=dropped])"
            data-layout="${o}"
            role="img"
            aria-label="Six node pipeline graph"
            style="position: relative; width: ${t.w}px; height: ${t.h}px; overflow: hidden;
                   background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            ${i.map(([e,t])=>`
              <span data-part="edge-${e}-${t}" aria-hidden="true"
                    style="position: absolute; height: 2px; background: var(--sp-line); transform-origin: 0 50%;
                           transition: left ${c}, top ${c}, width ${c}, transform ${c}"></span>`).join(``)}
            ${r.map(e=>`
              <span class="sp-chip" data-part="node-${e.id}"
                    style="position: absolute; width: ${n.w}px; height: ${n.h}px; justify-content: center;
                           padding: 0; font-size: 10px; transition: left ${c}, top ${c}">${e.label}</span>`).join(``)}
          </div>
          <div class="sp-stack sp-context" style="gap: 2px">
            <span class="sp-text" data-stage-verdict data-part="note" style="height: 30px; font-size: 11px; line-height: 15px; overflow: hidden"></span>
            <span class="sp-label" data-part="cost" data-moved="0" style="height: 15px; font-size: 11px; overflow: hidden"></span>
          </div>
        </div>
      </div>
    </div>
  `;let u=e(l,`graph`),d=e(l,`note`),f=e(l,`cost`),p=e(l,`picker`),m=o,h=(t,o)=>{let c=s(t),p=a[c],h=a[m].at,g=r.filter(e=>{let t=h[e.id],n=p.at[e.id];return Math.hypot(t.x-n.x,t.y-n.y)>2}).length;for(let t of r){let r=p.at[t.id],i=e(l,`node-${t.id}`);i.style.left=`${r.x-n.w/2}px`,i.style.top=`${r.y-n.h/2}px`}for(let[t,n]of i){let r=p.at[t],i=p.at[n],a=e(l,`edge-${t}-${n}`);a.style.left=`${r.x}px`,a.style.top=`${r.y-1}px`,a.style.width=`${Math.hypot(i.x-r.x,i.y-r.y)}px`,a.style.transform=`rotate(${Math.atan2(i.y-r.y,i.x-r.x)*180/Math.PI}deg)`}u.dataset.layout=c,d.textContent=p.note,f.dataset.moved=String(o?g:0),f.textContent=`${o?g:0} of ${r.length} nodes moved`,m=c};p.addEventListener(`change`,e=>h(e.detail,!0)),h(o,!1)}export{l as mount};