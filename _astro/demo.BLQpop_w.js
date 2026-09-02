import{n as e}from"./parts.C-YLuC7Q.js";import{r as t}from"./measure.DK7AY2_i.js";var n=[[82,74,90,66,88,58],[96,96,96,70],[86,92,60,78,94,68,84],[72,88,64,90,76],[80,94,62,86,70,90]],r=n.flatMap((e,t)=>[{w:44,head:!0},...e.map(e=>({w:e})),...t===n.length-1?[]:[{w:0,blank:!0}]]),i=8,a=8;function o(n){let o=r.map(e=>{let t=`height: ${i}px; margin-bottom: ${a}px`;if(e.blank)return`<div style="${t}"></div>`;let n=e.head?`border-radius: 4px; background: var(--sp-accent)`:`border-radius: 4px; background: var(--sp-line)`;return`<div style="${t}; width: ${e.w}%; ${n}"></div>`}).join(``),s=r.map(e=>{if(e.blank)return`<span></span>`;let t=e.head?`background: var(--sp-accent)`:`background: var(--sp-muted); opacity: 0.55`;return`<span style="align-self: center; height: 3px; width: ${e.w}%; border-radius: 2px; ${t}"></span>`}).join(``);n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">harbour-survey.md</span>
          <span class="sp-label">${r.length} lines</span>
        </div>
        <div class="sp-body" style="padding: 12px">
          <div class="sp-surface" style="display: flex; height: 100%; overflow: hidden">
            <div
              class="sp-context"
              data-part="viewport"
              tabindex="0"
              aria-label="Harbour survey"
              style="flex: 1 1 auto; min-width: 0; overflow-y: scroll; scrollbar-width: none;
                     overscroll-behavior: contain; padding: 10px 12px"
            >${o}</div>
            <div
              data-part="minimap"
              data-subject
              data-at="start"
              role="group"
              aria-label="Document map"
              style="position: relative; flex: 0 0 auto; width: 64px; padding: 6px 5px;
                     background: var(--sp-sunken); border-left: 1px solid var(--sp-line); cursor: pointer"
            >
              <div
                data-part="map"
                style="position: relative; display: grid; grid-template-rows: repeat(${r.length}, 1fr); gap: 1px; height: 100%"
              >
                ${s}
                <span data-part="map-top" aria-hidden="true" style="position: absolute; left: 0; right: 0; top: 0; height: 26px; pointer-events: none"></span>
                <span data-part="map-foot" aria-hidden="true" style="position: absolute; left: 0; right: 0; bottom: 0; height: 26px; pointer-events: none"></span>
                <div
                  data-part="slab"
                  style="position: absolute; left: -4px; right: -4px; top: 0; height: 60px; border-radius: 3px;
                         background: color-mix(in srgb, var(--sp-accent) 16%, transparent);
                         border: 1px solid var(--sp-accent); cursor: grab"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let c=e(n,`viewport`),l=e(n,`minimap`),u=e(n,`map`),d=e(n,`slab`),f=()=>Math.max(c.scrollHeight-c.clientHeight,0),p=0,m=()=>{let e=u.clientHeight,t=c.clientHeight/c.scrollHeight;p=Math.min(e,Math.round(e*t));let n=f(),r=n>0?c.scrollTop/n:0;d.style.height=`${p}px`,d.style.top=`${Math.round(r*(e-p))}px`,n<=0?l.dataset.at=`none`:r<=.02?l.dataset.at=`start`:r>=.98?l.dataset.at=`end`:l.dataset.at=`middle`};c.addEventListener(`scroll`,m);let h=null;d.addEventListener(`pointerdown`,e=>{e.isTrusted&&d.setPointerCapture(e.pointerId),h={y:t(e,n).y,top:c.scrollTop}}),d.addEventListener(`pointermove`,e=>{if(!h)return;let r=u.clientHeight-p;if(r<=0)return;let i=(t(e,n).y-h.y)/r;c.scrollTop=Math.min(Math.max(h.top+i*f(),0),f())});let g=()=>{h=null};d.addEventListener(`pointerup`,g),d.addEventListener(`pointercancel`,g),l.addEventListener(`click`,e=>{if(e.target===d)return;let t=u.getBoundingClientRect();if(t.height<=0)return;let n=(e.clientY-t.top)/t.height*c.scrollHeight-c.clientHeight/2;c.scrollTop=Math.min(Math.max(n,0),f())}),m()}export{o as mount};