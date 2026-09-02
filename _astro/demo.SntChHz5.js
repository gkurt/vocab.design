import{n as e}from"./parts.C-YLuC7Q.js";import{i as t,r as n}from"./measure.DK7AY2_i.js";var r=`<svg class="sp-icon" viewBox="0 0 24 24" aria-hidden="true">
  <circle cx="17.4" cy="6.6" r="2.9"/>
  <path d="M15.4 8.6 6.5 17.5V20h2.5l8.9-8.9"/>
</svg>`,i=[{from:`#ffd166`,to:`#f7936b`},{from:`#f7936b`,to:`#ef476f`},{from:`#ef476f`,to:`#8d4a8f`},{from:`#8d4a8f`,to:`#3f5aa6`},{from:`#3f5aa6`,to:`#118ab2`}],a=`#9aa3b2`,o=e=>[1,3,5].map(t=>Number.parseInt(e.slice(t,t+2),16)),s=e=>`#${e.map(e=>Math.round(e).toString(16).padStart(2,`0`)).join(``)}`,c=(e,t,n)=>{let r=o(e),i=o(t);return s(r.map((e,t)=>e+((i[t]??e)-e)*n))},l=(e,t,n)=>Math.min(n,Math.max(t,e)),u=({from:e,to:t},n)=>`
  <div data-part="band-${n+1}" style="flex: 1 1 0; background: linear-gradient(90deg, ${e}, ${t})"></div>`;function d(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 284px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Poster study</span>
          <span class="sp-label" style="font-size: 12px">Sky layer</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; gap: 12px">
          <div
            data-part="art"
            style="position: relative; display: flex; flex-direction: column; height: 150px; border: 1px solid var(--sp-line);
                   border-radius: 6px; overflow: hidden"
          >
            ${i.map(u).join(``)}
            <span
              data-part="sun"
              data-solid="#ffe9a3"
              style="position: absolute; left: 330px; top: 14px; width: 44px; height: 44px; border-radius: 50%; background: #ffe9a3"
            ></span>
            <span
              data-part="cloud"
              data-solid="#ffd9c2"
              style="position: absolute; left: 34px; top: 66px; width: 96px; height: 10px; border-radius: 5px; background: #ffd9c2"
            ></span>
            <span
              data-part="loupe"
              aria-hidden="true"
              style="position: absolute; left: 50%; top: 50%; width: 52px; height: 52px; translate: -50% -50%; border-radius: 50%;
                     border: 3px solid var(--sp-surface); box-shadow: 0 2px 8px rgb(16 24 40 / 0.35); overflow: hidden;
                     pointer-events: none; opacity: 0; visibility: hidden; transition: opacity 0.12s, visibility 0.12s"
            >
              <span
                style="position: absolute; inset: 0; background-image:
                  repeating-linear-gradient(90deg, rgb(0 0 0 / 0.13) 0 1px, transparent 1px 13px),
                  repeating-linear-gradient(180deg, rgb(0 0 0 / 0.13) 0 1px, transparent 1px 13px)"
              ></span>
              <span
                style="position: absolute; left: 50%; top: 50%; width: 13px; height: 13px; translate: -50% -50%;
                       box-shadow: inset 0 0 0 2px var(--sp-surface)"
              ></span>
            </span>
          </div>

          <div class="sp-row" style="gap: 10px">
            <span class="sp-label sp-context">Fill</span>
            <div
              class="sp-row sp-context"
              data-part="field"
              data-from="typed"
              style="gap: 8px; padding: 4px 8px; border: 1px solid var(--sp-line); border-radius: 6px; background: var(--sp-surface)"
            >
              <span
                data-part="swatch"
                style="width: 20px; height: 20px; border-radius: 4px; background: ${a}; box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.14)"
              ></span>
              <span data-part="hex" style="font-size: 12px; font-variant-numeric: tabular-nums">${a.toUpperCase()}</span>
            </div>
            <button
              class="sp-icon-button"
              type="button"
              data-part="dropper"
              data-subject
              data-armed="false"
              aria-pressed="false"
              aria-label="Eyedropper"
              style="width: 30px; height: 30px"
            >${r}</button>
          </div>

          <span
            class="sp-label sp-context"
            data-stage-verdict data-part="hint"
            data-mode="idle"
            role="status"
            style="height: 15px; font-size: 11px; line-height: 15px; white-space: nowrap; overflow: hidden"
          >The fill was typed in. Take the eyedropper to sample the poster instead.</span>
        </div>
      </div>
    </div>
  `;let s=e(o,`art`),d=e(o,`loupe`),f=e(o,`dropper`),p=e(o,`field`),m=e(o,`swatch`),h=e(o,`hex`),g=e(o,`hint`),_=!1,v=(e,t)=>{g.dataset.mode=e,g.textContent=t},y=e=>{_=e,f.dataset.armed=String(e),f.setAttribute(`aria-pressed`,String(e)),e?f.setAttribute(`data-open`,``):f.removeAttribute(`data-open`),f.style.boxShadow=e?`inset 0 0 0 1px var(--sp-accent)`:`none`,s.style.cursor=e?`crosshair`:`default`,e||(d.style.opacity=`0`,d.style.visibility=`hidden`)},b=e=>{let r=e.target?.closest(`[data-solid]`);if(r instanceof HTMLElement)return{hex:r.dataset.solid??a,from:r.dataset.part??`shape`};let o=t(s),u=n(e,s),d=l(u.x,0,o.width),f=l(u.y,0,o.height),p=l(Math.floor(f/o.height*i.length),0,i.length-1),m=i[p];return m?{hex:c(m.from,m.to,d/o.width),from:`band-${p+1}`}:{hex:a,from:`sky`}},x=(e,r)=>{let i=t(s),a=n(e,s);d.style.left=`${l(a.x,28,i.width-28)}px`,d.style.top=`${l(a.y,28,i.height-28)}px`,d.style.background=r,d.style.opacity=`1`,d.style.visibility=`visible`};f.addEventListener(`click`,()=>{y(!0),v(`armed`,`Sampling. Move over the poster, then click to keep the colour.`)}),s.addEventListener(`pointermove`,e=>{if(!_)return;let{hex:t}=b(e);x(e,t),v(`preview`,`Sampling ${t.toUpperCase()}. Click to keep it.`)}),s.addEventListener(`click`,e=>{if(!_)return;let{hex:t,from:n}=b(e);m.style.background=t,h.textContent=t.toUpperCase(),p.dataset.from=n,y(!1),v(`kept`,`Kept ${t.toUpperCase()}, read off the poster rather than typed.`)}),o.addEventListener(`keydown`,e=>{e.key!==`Escape`||!_||(y(!1),v(`idle`,`Sampling cancelled. The fill kept the colour it had.`))}),y(!1)}export{d as mount};