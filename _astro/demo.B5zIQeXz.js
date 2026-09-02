import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";import{n,r}from"./measure.DK7AY2_i.js";var i={w:320,h:132},a=18,o=44,s={x:284,y:14},c={x:238,y:14},l={x:s.x+a/2,y:s.y+a/2},u=e=>`
  <span
    data-part="${e}"
    style="position: absolute; left: -13px; top: -13px; right: -13px; bottom: -13px; border-radius: 8px; border: 1px dashed transparent"
  ></span>`,d=(e,t,n)=>`
  <span
    data-part="${e}"
    style="position: absolute; left: ${t-7}px; top: ${n-7}px; width: 14px; height: 14px; pointer-events: none"
  ></span>`;function f(f){f.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 202px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Album</span>
          <span class="sp-text" data-part="readout" style="width: 262px; text-align: right; white-space: nowrap">No taps yet</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 12px">
          <div
            class="sp-surface"
            data-part="card"
            data-mode="drawn"
            style="position: relative; width: ${i.w}px; height: ${i.h}px; padding: 14px"
          >
            <div class="sp-context">
              <span class="sp-heading" style="font-size: 13px">Harbour at dusk</span>
              <div class="sp-stack" style="margin-top: 10px; gap: 8px; width: 200px">
                <div class="sp-line" style="width: 88%"></div>
                <div class="sp-line" style="width: 62%"></div>
              </div>
            </div>

            <button
              class="sp-icon-button sp-context"
              type="button"
              data-part="more"
              aria-label="More actions"
              style="position: absolute; left: ${c.x}px; top: ${c.y}px; width: ${a}px; height: ${a}px; border-radius: 4px"
            >
              ${u(`slop-more`)}
              <span style="position: relative; z-index: 1; display: flex">${t(`meatball`,`sp-icon--dots`)}</span>
            </button>

            <button
              class="sp-icon-button"
              type="button"
              data-part="add"
              data-subject
              data-hit="none"
              aria-label="Add to album"
              style="position: absolute; left: ${s.x}px; top: ${s.y}px; width: ${a}px; height: ${a}px; border-radius: 4px"
            >
              ${u(`slop-add`)}
              <span data-part="glyph" style="position: relative; z-index: 1; display: flex">${t(`plus`)}</span>
            </button>

            <span style="position: absolute; inset: 0; pointer-events: none">
              ${d(`dot-art`,l.x,l.y)}
              ${d(`dot-slop`,l.x-15,l.y+13)}
              ${d(`dot-miss`,l.x,l.y+38)}
            </span>
          </div>

          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Show" data-part="mode" data-value="drawn">
            <button class="sp-segment" type="button" data-part="mode-drawn" value="drawn" style="padding: 5px 10px">the ${a} px drawn</button>
            <button class="sp-segment" type="button" data-part="mode-area" value="area" style="padding: 5px 10px">the ${o} px that answer</button>
          </sp-segmented>
        </div>
      </div>
    </div>
  `;let p=e(f,`card`),m=e(f,`add`),h=e(f,`glyph`),g=e(f,`readout`),_=e(f,`mode`),v=p.getRootNode(),y=(e,t)=>v.elementFromPoint?v.elementFromPoint(e,t):document.elementFromPoint(e,t),b=(e,t)=>{m.dataset.hit=e,g.textContent=t};p.addEventListener(`click`,e=>{let i=n(m,p),o=r(e,p),s=(e,t)=>Math.max(0,Math.abs(e-t)-a/2),c=Math.round(Math.max(s(o.x,i.left+i.width/2),s(o.y,i.top+i.height/2))),l=y(e.clientX,e.clientY);if(!l||!m.contains(l))return b(`none`,`${c} px out: past the region`);if(m.setAttribute(`data-added`,``),h.innerHTML=t(`check`),c===0)return b(`artwork`,`On the glyph: added to the album`);b(`slop`,`${c} px outside the glyph: added anyway`)}),_.addEventListener(`change`,()=>{let t=_.value!==`area`;p.dataset.mode=t?`drawn`:`area`;for(let n of[`slop-add`,`slop-more`]){let r=e(f,n);r.style.borderColor=t?`transparent`:`var(--sp-accent)`,r.style.background=t?``:`var(--sp-accent-soft)`}})}export{f as mount};