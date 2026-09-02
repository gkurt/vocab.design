import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import{t as r}from"./motion.B5_YXmsy.js";var i={w:380,h:258},a=40,o={w:i.w-2,h:i.h-2-a},s={w:108,h:84},c=[17,135,253],l=[19,113],u={left:24,top:16,width:330,height:o.h-32},d=.33,f=520,p=`cubic-bezier(0.3, 0.9, 0.3, 1)`,m=[{key:`a`,title:`Low tide`,note:`Barmouth`,fill:`linear-gradient(140deg, #3f6cd1, #6f4fd6)`,col:0,row:0},{key:`b`,title:`Dune fence`,note:`Ynyslas`,fill:`linear-gradient(140deg, #d1913f, #b8503c)`,col:1,row:0},{key:`c`,title:`Slate steps`,note:`Blaenau`,fill:`linear-gradient(140deg, #4b6b63, #22343a)`,col:2,row:0},{key:`d`,title:`Long harbour`,note:`Porthmadog`,fill:`linear-gradient(140deg, #7a4fb0, #33306e)`,col:0,row:1},{key:`e`,title:`Gorse bank`,note:`Rhinogydd`,fill:`linear-gradient(140deg, #c8ab3a, #6a7a2c)`,col:1,row:1},{key:`f`,title:`Estuary light`,note:`Mawddach`,fill:`linear-gradient(140deg, #3b8ca8, #1c4468)`,col:2,row:1}];function h(e){return`translate(${c[e.col]+s.w/2-(u.left+u.width/2)}px, ${l[e.row]+s.h/2-(u.top+u.height/2)}px) scale(${d})`}function g(o,d){o.innerHTML=`
    <div class="sp-app" style="gap: 9px">
      <div class="sp-frame" style="width: ${i.w}px; height: ${i.h}px">
        <div class="sp-topbar sp-context" style="height: ${a}px">
          <span class="sp-heading sp-grow">Coast</span>
          <span class="sp-label" data-part="readout">grid</span>
        </div>
        <div class="sp-body" data-part="body" style="position: relative; padding: 0; overflow: hidden">
          ${m.map(e=>`
    <button
      type="button"
      class="sp-context"
      data-part="thumb-${e.key}"
      aria-label="${e.title}"
      style="position: absolute; left: ${c[e.col]}px; top: ${l[e.row]}px; width: ${s.w}px;
             height: ${s.h}px; padding: 0; border: 0; border-radius: 6px; background: ${e.fill};
             cursor: pointer; opacity: 1; transition: opacity 260ms linear"
    ></button>`).join(``)}

          <div class="sp-scrim" data-part="scrim"></div>

          <div
            data-part="view"
            data-subject
            data-from="a"
            data-state="settled"
            style="position: absolute; left: ${u.left}px; top: ${u.top}px; width: ${u.width}px;
                   height: ${u.height}px; overflow: hidden; border-radius: 10px; background: var(--sp-surface);
                   box-shadow: var(--sp-shadow); opacity: 0; visibility: hidden;
                   transform: ${h(m[0])}"
          >
            <div data-part="view-hero" style="height: 94px; background: ${m[0].fill}"></div>
            <div style="padding: 11px 14px; display: flex; flex-direction: column; gap: 6px">
              <span class="sp-heading" data-part="view-title">Low tide</span>
              <span class="sp-text" data-part="view-note" style="margin: 0">Barmouth, an hour before dark.</span>
            </div>
            <button
              class="sp-icon-button"
              type="button"
              data-part="close"
              aria-label="Back to the grid"
              style="position: absolute; right: 6px; top: 6px; color: #ffffff; background: rgb(12 16 34 / 0.42)"
            >${n(`close`)}</button>
          </div>
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 380px; margin: 0; text-align: center">
        Two surfaces, not one: the grid waits under the view it opened.
      </p>
    </div>
  `;let g=e(o,`view`),_=e(o,`view-hero`),v=e(o,`view-title`),y=e(o,`view-note`),b=e(o,`scrim`),x=e(o,`readout`),S=r(o),C,w=m[0],T=(e,t)=>{for(let e of g.getAnimations())e.cancel();if(S)return;let n={transform:e,opacity:0},r={transform:`none`,opacity:1};g.animate(t?[n,r]:[r,n],{duration:f,easing:p})},E=n=>{g.dataset.open===void 0&&(d.clearTimeout(C),w=n,_.style.background=n.fill,v.textContent=n.title,y.textContent=`${n.note}, an hour before dark.`,g.dataset.from=n.key,g.dataset.state=`moving`,g.dataset.open=``,g.style.transform=`none`,g.style.opacity=`1`,g.style.visibility=`visible`,t(b,`data-open`,!0),e(o,`thumb-${n.key}`).style.opacity=`0`,x.textContent=n.title.toLowerCase(),T(h(n),!0),C=d.setTimeout(()=>{g.dataset.state=`settled`},620))},D=()=>{if(g.dataset.open===void 0)return;d.clearTimeout(C);let n=h(w);g.removeAttribute(`data-open`),g.dataset.state=`moving`,g.style.transform=n,g.style.opacity=`0`,t(b,`data-open`,!1),e(o,`thumb-${w.key}`).style.opacity=`1`,x.textContent=`grid`,T(n,!1),C=d.setTimeout(()=>{g.style.visibility=`hidden`,g.dataset.state=`settled`},620)};for(let t of m)e(o,`thumb-${t.key}`).addEventListener(`click`,()=>E(t));e(o,`close`).addEventListener(`click`,D)}export{g as mount};