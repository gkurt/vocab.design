import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=Array.from({length:12},(e,t)=>t*30),r=210,i=e=>`oklch(0.68 0.15 ${(e%360+360)%360})`,a=n.map((e,t)=>`${i(e)} ${t*30}deg ${(t+1)*30}deg`).join(`, `),o=[{offset:0,role:`Base`},{offset:120,role:`Third, +120`},{offset:180,role:`Opposite, +180`},{offset:240,role:`Third, +240`}],s={single:[0],complement:[0,180],triad:[0,120,240]},c=56,l=150;function u(u){u.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 372px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Scheme" data-part="segmented" data-value="single">
            <button class="sp-segment" data-part="seg-single" value="single">Single</button>
            <button class="sp-segment" data-part="seg-complement" value="complement">Complement</button>
            <button class="sp-segment" data-part="seg-triad" value="triad">Triad</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 18px; margin-top: 14px; align-items: flex-start">
          <div data-part="wheel" data-subject data-hue="${r}" data-scheme="single"
               style="position: relative; flex: 0 0 auto; width: ${l}px; height: ${l}px; border-radius: 50%;
                      --cw-base: ${r}deg; background: conic-gradient(from -15deg, ${a})">
            ${n.map(e=>{let t=e*Math.PI/180;return`
      <button data-part="pick-${e}" aria-label="hue ${e}"
              style="position: absolute; left: ${l/2+c*Math.sin(t)}px; top: ${l/2-c*Math.cos(t)}px; width: 24px; height: 24px; padding: 0; border: 0;
                     border-radius: 50%; translate: -50% -50%; cursor: pointer; background: transparent;
                     box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.4)"></button>`}).join(``)}${o.map(({offset:e})=>`
      <div data-part="spoke-${e}" style="position: absolute; inset: 0; rotate: calc(var(--cw-base, 0deg) + ${e}deg)">
        <span style="position: absolute; left: 50%; top: ${l/2-c}px; bottom: 50%; width: 2px; translate: -50% 0;
                     background: var(--sp-surface)"></span>
        <span data-part="mark-${e}"
              style="position: absolute; left: 50%; top: ${l/2-c}px; width: 22px; height: 22px; translate: -50% -50%;
                     border: 3px solid var(--sp-surface); border-radius: 50%; background: ${i(r+e)}"></span>
      </div>`).join(``)}
          </div>

          <div class="sp-stack sp-context" data-part="readout" style="gap: 10px; width: 160px; height: ${l}px">
            <span class="sp-label">Palette</span>
            ${o.slice(0,3).map((e,t)=>`
      <div class="sp-row" data-part="read-${t}" style="gap: 8px" ${t===0?``:`hidden`}>
        <span class="sp-swatch" data-part="read-swatch-${t}" style="width: 20px; height: 20px; border-radius: 50%; --sp-swatch: ${i(r)}"></span>
        <span class="sp-grow sp-text sp-text--ink" data-part="read-role-${t}">Base</span>
        <span class="sp-text" data-part="read-angle-${t}" style="width: 46px; text-align: right">H ${r}</span>
      </div>`).join(``)}
          </div>
        </div>
      </div>
    </div>
  `;let d=e(u,`wheel`),f=n.map(t=>({angle:t,el:e(u,`pick-${t}`)})),p=(n,r)=>{let a=s[r]??s.single??[0];d.dataset.hue=String(n),d.dataset.scheme=r,d.style.setProperty(`--cw-base`,`${n}deg`);for(let t of o){let r=a.includes(t.offset);e(u,`spoke-${t.offset}`).toggleAttribute(`hidden`,!r),e(u,`mark-${t.offset}`).style.background=i(n+t.offset)}o.slice(0,3).forEach((t,r)=>{let s=a[r];if(e(u,`read-${r}`).toggleAttribute(`hidden`,s===void 0),s===void 0)return;let c=o.find(e=>e.offset===s);e(u,`read-swatch-${r}`).style.setProperty(`--sp-swatch`,i(n+s)),e(u,`read-role-${r}`).textContent=c?.role??`Base`,e(u,`read-angle-${r}`).textContent=`H ${(n+s)%360}`});for(let e of f)t(e.el,`data-selected`,e.angle===n)};p(r,`single`);for(let e of f)e.el.addEventListener(`click`,()=>p(e.angle,d.dataset.scheme??`single`));e(u,`segmented`).addEventListener(`change`,e=>p(Number(d.dataset.hue??r),e.detail))}export{u as mount};