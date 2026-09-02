import{n as e,t}from"./parts.C-YLuC7Q.js";import{n}from"./measure.DK7AY2_i.js";var r=50,i=150,a=[`position: absolute`,`display: flex`,`align-items: center`,`justify-content: center`,`padding: 0`,`border-radius: 6px`,`cursor: pointer`].join(`; `),o=`position: absolute; white-space: nowrap; font-size: 11px`;function s(s){s.innerHTML=`
    <div class="sp-app" data-subject>
      <div class="sp-frame sp-frame--wide">
        <div class="sp-topbar">
          <span class="sp-heading sp-grow">Aim</span>
          <span class="sp-text" data-part="readout" data-target="none" style="width: 172px; text-align: right">Nothing hit yet</span>
        </div>
        <div class="sp-body" data-part="field" style="position: relative; overflow: hidden; padding: 0">
          <span
            data-part="home"
            style="position: absolute; left: 16px; top: 130px; width: 12px; height: 12px; border-radius: 50%; background: var(--sp-ink)"
          ></span>
          <span class="sp-label" style="${o}; left: 12px; top: 146px">start</span>

          <button
            class="sp-button"
            type="button"
            aria-label="Far small target"
            data-part="far"
            style="${a}; left: 292px; top: 24px; width: 14px; height: 14px"
          ></button>
          <span class="sp-label" data-part="far-note" style="${o}; left: 176px; top: 20px; width: 108px; text-align: right"></span>

          <button
            class="sp-button"
            type="button"
            aria-label="Near large target"
            data-part="near"
            style="${a}; left: 118px; top: 100px; width: 44px; height: 44px"
          ></button>
          <span class="sp-label" data-part="near-note" style="${o}; left: 170px; top: 112px"></span>

          <button
            class="sp-button"
            type="button"
            aria-label="Edge target"
            data-part="edge"
            style="${a}; right: 0; top: 0; bottom: 0; width: 16px; height: auto; border-radius: 0"
          ></button>
          <span class="sp-label" style="${o}; right: 26px; top: 56px; text-align: right">edge: W unbounded</span>
        </div>
      </div>
    </div>
  `;let c=e(s,`readout`),l=e=>{let t=n(e,s);return{x:t.left+t.width/2,y:t.top+t.height/2,w:t.width}},u=l(e(s,`home`)),d=(e,n,r)=>{t(e,`data-hit`,!0),e.style.background=`var(--sp-ink)`,c.dataset.target=r,c.textContent=n};for(let t of[`far`,`near`]){let n=e(s,t),a=l(n),o=Math.hypot(a.x-u.x,a.y-u.y),c=Math.log2(2*o/a.w),f=Math.round(r+i*c),p=`ID ${c.toFixed(1)} bits, about ${f} ms`;e(s,`${t}-note`).innerHTML=`D ${Math.round(o)} px, W ${Math.round(a.w)} px<br />${p}`,n.addEventListener(`click`,()=>d(n,p,t))}let f=e(s,`edge`);f.addEventListener(`click`,()=>d(f,`Edge: ID collapses, no aim`,`edge`))}export{s as mount};