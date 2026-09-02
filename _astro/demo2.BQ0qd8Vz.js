import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import{n as r}from"./measure.DK7AY2_i.js";var i=350,a=8,o={share:`Share`,star:`Add to favourites`,trash:`Move to trash`};function s(s,c){s.innerHTML=`
    <div class="sp-app" data-loop="keep">
      <div class="sp-frame" style="height: 200px">
        <div class="sp-topbar">
          <span class="sp-heading sp-grow sp-context">Draft note</span>
          <span class="sp-row sp-context">
            <button class="sp-icon-button" data-part="share" aria-label="Share">${n(`share`)}</button>
            <button class="sp-icon-button" data-part="star" aria-label="Add to favourites">${n(`star`)}</button>
            <button class="sp-icon-button" data-part="trash" aria-label="Move to trash">${n(`trash`)}</button>
          </span>
        </div>
        <div class="sp-body sp-context" data-part="page">
          <div class="sp-stack">
            <div class="sp-line" style="width: 90%"></div>
            <div class="sp-line" style="width: 74%"></div>
            <div class="sp-line" style="width: 82%"></div>
          </div>
        </div>
        <span class="sp-tooltip" data-part="tooltip" data-subject role="tooltip" id="tip"></span>
      </div>
    </div>
  `;let l=s.querySelector(`.sp-frame`),u=e(s,`tooltip`),d,f,p=e=>{let t=r(e,l),n=t.left+t.width/2,i=l.offsetWidth-u.offsetWidth-a,o=Math.min(Math.max(n-u.offsetWidth/2,a),i);u.style.left=`${o}px`,u.style.top=`${t.top+t.height+6}px`,u.style.setProperty(`--sp-arrow-x`,`${n-o}px`)},m=(e,n)=>{d=void 0,u.textContent=o[e]??``,u.dataset.for=e,p(n),f?.removeAttribute(`aria-describedby`),n.setAttribute(`aria-describedby`,`tip`),f=n,t(u,`data-open`,!0)},h=()=>{f?.removeAttribute(`aria-describedby`),f=void 0,t(u,`data-open`,!1)},g=e=>{d?.name===e&&(c.clearTimeout(d.timer),d=void 0),u.dataset.for===e&&h()};for(let t of Object.keys(o)){let n=e(s,t);n.addEventListener(`pointerenter`,()=>{c.clearTimeout(d?.timer),d={name:t,timer:c.setTimeout(()=>m(t,n),i)}}),n.addEventListener(`focus`,()=>m(t,n)),n.addEventListener(`pointerleave`,()=>g(t)),n.addEventListener(`blur`,()=>g(t))}s.addEventListener(`keydown`,e=>{e.key===`Escape`&&h()})}export{s as mount};