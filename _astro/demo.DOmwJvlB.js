import{n as e}from"./parts.C-YLuC7Q.js";import{r as t}from"./measure.DK7AY2_i.js";var n=[[`Release 4.2`,3],[`Release 4.1`,4],[`Release 4.0`,3],[`Release 3.9`,4],[`Release 3.8`,3]],r=22;function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="height: 264px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Changelog</span>
          <span class="sp-label">5 releases</span>
        </div>
        <div class="sp-body" style="padding: 12px">
          <div class="sp-surface" style="display: flex; height: 100%; overflow: hidden">
            <div
              class="sp-context"
              data-part="viewport"
              tabindex="0"
              aria-label="Changelog"
              style="flex: 1 1 auto; min-width: 0; overflow-y: scroll; scrollbar-width: none;
                     overscroll-behavior: contain; padding: 10px 12px"
            >${n.map(([e,t],n)=>`
      <div style="margin-top: ${n===0?0:14}px">
        <span class="sp-label sp-text--ink">${e}</span>
        <div class="sp-stack" style="gap: 6px; margin-top: 6px">
          ${Array.from({length:t},(e,t)=>`<div class="sp-line" style="width: ${92-t*9}%"></div>`).join(``)}
        </div>
      </div>`).join(``)}</div>
            <div
              data-part="scrollbar"
              data-subject
              data-at="start"
              style="position: relative; flex: 0 0 auto; width: 14px; padding: 3px;
                     background: var(--sp-sunken); border-left: 1px solid var(--sp-line)"
            >
              <div data-part="track" style="position: relative; height: 100%">
                <div
                  data-part="thumb"
                  style="position: absolute; left: 0; top: 0; width: 8px; height: ${r}px;
                         border-radius: 999px; background: var(--sp-muted); cursor: grab"
                ></div>
                <span
                  data-part="track-foot"
                  aria-hidden="true"
                  style="position: absolute; left: 0; right: 0; bottom: 0; height: 20px; pointer-events: none"
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let a=e(i,`viewport`),o=e(i,`scrollbar`),s=e(i,`track`),c=e(i,`thumb`),l=()=>Math.max(a.scrollHeight-a.clientHeight,0),u=()=>{let e=s.clientHeight,t=l(),n=Math.max(r,Math.round(e*(a.clientHeight/a.scrollHeight))),i=t>0?a.scrollTop/t:0;c.style.height=`${n}px`,c.style.top=`${Math.round(i*(e-n))}px`,t<=0?o.dataset.at=`none`:i<=.01?o.dataset.at=`start`:i>=.99?o.dataset.at=`end`:o.dataset.at=`middle`};a.addEventListener(`scroll`,u);let d=null;c.addEventListener(`pointerdown`,e=>{e.isTrusted&&c.setPointerCapture(e.pointerId),d={y:t(e,i).y,top:a.scrollTop}}),c.addEventListener(`pointermove`,e=>{if(!d)return;let n=s.clientHeight-c.clientHeight;if(n<=0)return;let r=(t(e,i).y-d.y)/n;a.scrollTop=Math.min(Math.max(d.top+r*l(),0),l())});let f=()=>{d=null};c.addEventListener(`pointerup`,f),c.addEventListener(`pointercancel`,f),u()}export{i as mount};