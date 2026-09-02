import{n as e}from"./parts.C-YLuC7Q.js";import{r as t}from"./measure.DK7AY2_i.js";var n=8,r=6,i={width:68,height:56},a=8,o=8,s={width:n*i.width+56+16,height:r*i.height+40+16},c={width:296,height:194},l=128,u=Math.round(s.height*l/s.width),d=l/s.width,f={width:Math.round(c.width*d),height:Math.round(c.height*d)},p={column:6,row:4},m=(e,t)=>`${t<.34?`n`:t>.66?`s`:`m`}${e<.34?`w`:e>.66?`e`:`m`}`;function h(e){let t=Array.from({length:48},(t,r)=>{let i=r%n,a=Math.floor(r/n),o=i===p.column&&a===p.row;return`<div style="display: flex; align-items: center; justify-content: center; background: ${o?`var(--sp-accent)`:`var(--sp-surface)`}; border: 1px solid var(--sp-line); border-radius: 4px">${e?`<span class="sp-label" style="font-size: 10px; color: ${o?`var(--sp-accent-ink)`:`var(--sp-muted)`}">${String.fromCharCode(65+i)}${a+1}</span>`:``}</div>`}).join(``);return`
    <div
      style="display: grid; grid-template-columns: repeat(${n}, ${i.width}px); grid-auto-rows: ${i.height}px;
             gap: ${o}px; padding: ${a}px; width: ${s.width}px; height: ${s.height}px; background: var(--sp-sunken)"
    >${t}</div>`}function g(n){n.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 284px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Harbour plan</span>
          <span class="sp-label" data-part="readout" role="status" style="font-size: 11px">Berth ${String.fromCharCode(65+p.column)}${p.row+1} is the one under survey</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: flex-start; gap: 12px; padding: 12px">
          <div
            class="sp-context"
            data-part="detail"
            data-at="nw"
            tabindex="0"
            aria-label="Harbour plan, detail"
            style="flex: 0 0 auto; width: ${c.width}px; height: ${c.height}px; overflow: auto; scrollbar-width: none;
                   overscroll-behavior: contain; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >${h(!0)}</div>

          <div
            data-part="overview"
            data-subject
            data-at="nw"
            role="group"
            aria-label="Overview"
            style="flex: 0 0 auto; display: flex; flex-direction: column; gap: 7px; width: 142px; padding: 8px;
                   background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            <span class="sp-label" style="color: var(--sp-ink)">Overview</span>
            <div
              data-part="map"
              style="position: relative; width: 130px; height: ${u+2}px; overflow: hidden; border-radius: 4px; border: 1px solid var(--sp-line)"
            >
              <div aria-hidden="true" style="position: absolute; top: 0; left: 0; transform: scale(${d}); transform-origin: top left">${h(!1)}</div>
              <div
                data-part="box"
                role="slider"
                aria-label="Visible area"
                style="position: absolute; top: 0; left: 0; width: ${f.width}px; height: ${f.height}px; cursor: grab;
                       background: color-mix(in srgb, var(--sp-accent) 18%, transparent); border: 2px solid var(--sp-accent);
                       border-radius: 3px; touch-action: none"
              ></div>
              <span data-part="corner-nw" aria-hidden="true" style="position: absolute; left: ${Math.round(f.width/2)}px; top: ${Math.round(f.height/2)}px; width: 4px; height: 4px; translate: -50% -50%; pointer-events: none"></span>
              <span data-part="corner-se" aria-hidden="true" style="position: absolute; left: ${l-Math.round(f.width/2)}px; top: ${u-Math.round(f.height/2)}px; width: 4px; height: 4px; translate: -50% -50%; pointer-events: none"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let r=e(n,`detail`),i=e(n,`overview`),a=e(n,`box`),o=()=>Math.max(r.scrollWidth-r.clientWidth,0),s=()=>Math.max(r.scrollHeight-r.clientHeight,0),g=l-f.width,_=u-f.height,v=()=>{let e=o()>0?r.scrollLeft/o():0,t=s()>0?r.scrollTop/s():0;a.style.left=`${Math.round(e*g)}px`,a.style.top=`${Math.round(t*_)}px`;let n=m(e,t);i.dataset.at=n,r.dataset.at=n};r.addEventListener(`scroll`,v);let y=null;a.addEventListener(`pointerdown`,e=>{y={...t(e,n),left:r.scrollLeft,top:r.scrollTop},a.style.cursor=`grabbing`,e.isTrusted&&a.setPointerCapture(e.pointerId)}),a.addEventListener(`pointermove`,e=>{if(!y)return;let i=t(e,n);g>0&&(r.scrollLeft=y.left+(i.x-y.x)/g*o()),_>0&&(r.scrollTop=y.top+(i.y-y.y)/_*s())});let b=()=>{y&&(y=null,a.style.cursor=`grab`)};a.addEventListener(`pointerup`,b),a.addEventListener(`pointercancel`,b),v()}export{g as mount};