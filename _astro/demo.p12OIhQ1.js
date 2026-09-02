import{n as e}from"./parts.C-YLuC7Q.js";var t=[`#d08a3d`,`#cd7444`,`#c9963b`,`#d2794f`,`#bd8248`,`#d59a55`],n=1240,r=[{key:`all`,name:`all stacks`,depth:0,x:0,w:100,hue:t[0]},{key:`render`,name:`render()`,depth:1,x:0,w:62,hue:t[1]},{key:`layout`,name:`layout()`,depth:1,x:62,w:24,hue:t[2]},{key:`gc`,name:`gc()`,depth:1,x:86,w:14,hue:t[3]},{key:`paint`,name:`paint()`,depth:2,x:0,w:40,hue:t[4]},{key:`styles`,name:`styles()`,depth:2,x:40,w:22,hue:t[5]},{key:`reflow`,name:`reflow()`,depth:2,x:62,w:24,hue:t[0]},{key:`mark`,name:`mark()`,depth:2,x:86,w:14,hue:t[1]},{key:`raster`,name:`raster()`,depth:3,x:0,w:36,hue:t[2]},{key:`match`,name:`match()`,depth:3,x:40,w:14,hue:t[3]},{key:`measure`,name:`measure()`,depth:3,x:62,w:18,hue:t[4]},{key:`encode`,name:`encode()`,depth:4,x:0,w:8,hue:t[5]},{key:`hash`,name:`hash()`,depth:4,x:40,w:12,hue:t[0]},{key:`text`,name:`text()`,depth:4,x:62,w:10,hue:t[1]},{key:`crc`,name:`crc()`,depth:5,x:0,w:4,hue:t[2]},{key:`intern`,name:`intern()`,depth:5,x:40,w:10,hue:t[3]},{key:`utf8`,name:`utf8()`,depth:6,x:40,w:8,hue:t[4]}],i=7,a=17,o=e=>Math.round(e/100*n);function s(e){let t=e.w>=12?`${e.name}`:``;return`
    <button
      type="button"
      data-part="frame-${e.key}"
      style="position: absolute; left: ${e.x}%; width: calc(${e.w}% - 1px); top: 0; height: 15px; padding: 0 4px; margin: 0;
             display: flex; align-items: center; border: 0; border-radius: 2px; background: ${e.hue}; color: #241503;
             font: inherit; font-size: 9px; line-height: 1; white-space: nowrap; overflow: hidden; text-align: left; cursor: pointer;
             box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.28)"
    >${t}</button>`}function c(t){t.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 292px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">worker.cpuprofile</span>
          <span class="sp-label" style="font-size: 11px">1.24 s &middot; stacks merged</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; justify-content: center; gap: 8px; padding: 10px">
          <div class="sp-surface" data-part="flame" data-subject style="padding: 5px 6px">
            ${Array.from({length:i},(e,t)=>`<div style="position: relative; height: ${a}px">${r.filter(e=>e.depth===t).map(s).join(``)}</div>`).join(``)}
          </div>

          <div class="sp-surface" data-part="readout" data-frame="all" style="flex: 0 0 auto; height: 50px; padding: 7px 10px">
            <div class="sp-row" style="gap: 8px">
              <span class="sp-text sp-text--ink sp-grow" data-part="readout-name" style="font-size: 12px; font-weight: 600">all stacks</span>
              <span class="sp-label" data-part="readout-share" style="font-size: 11px; color: var(--sp-ink)">100% of samples</span>
            </div>
            <div class="sp-row" style="gap: 14px; margin-top: 5px">
              <span class="sp-label" style="font-size: 10px">width <span data-part="readout-ms" style="color: var(--sp-ink)">1240 ms</span></span>
              <span class="sp-label" style="font-size: 10px">depth <span data-part="readout-depth" style="color: var(--sp-ink)">0</span></span>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;let n=e(t,`readout`),c=e(t,`readout-name`),l=e(t,`readout-share`),u=e(t,`readout-ms`),d=e(t,`readout-depth`),f=i=>{n.dataset.frame=i.key,c.textContent=i.name,l.textContent=`${i.w}% of samples`,u.textContent=`${o(i.w)} ms`,d.textContent=String(i.depth);for(let n of r){let r=e(t,`frame-${n.key}`),a=n.key===i.key;a?r.setAttribute(`data-active`,``):r.removeAttribute(`data-active`),r.style.boxShadow=a?`inset 0 0 0 2px var(--sp-ink)`:`inset 0 0 0 1px rgb(255 255 255 / 0.28)`}};for(let n of r){let r=e(t,`frame-${n.key}`);r.addEventListener(`pointerenter`,()=>f(n)),r.addEventListener(`click`,()=>f(n))}f(r[0])}export{c as mount};