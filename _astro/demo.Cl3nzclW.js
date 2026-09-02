import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=5,i=[`Not rated`,`1 star`,`2 stars`,`3 stars`,`4 stars`,`5 stars`];function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 300px">
        <div class="sp-row sp-context" style="gap: 10px">
          <div class="sp-swatch" style="width: 40px; height: 40px; --sp-swatch: var(--sp-sunken)"></div>
          <div class="sp-stack" style="gap: 6px; flex: 1 1 auto">
            <span class="sp-heading">Aurora headphones</span>
            <div class="sp-line" style="width: 64%"></div>
          </div>
        </div>
        <div class="sp-divider" style="margin: 14px 0"></div>
        <span class="sp-label sp-context">How would you rate these?</span>
        <div class="sp-row sp-row--between" style="margin-top: 8px">
          <div class="sp-row" data-part="stars" data-subject role="radiogroup" aria-label="Rate these headphones" style="gap: 0">
            ${Array.from({length:r},(e,t)=>`
      <button
        class="sp-icon-button"
        type="button"
        data-part="star-${t+1}"
        role="radio"
        aria-checked="false"
        aria-label="${i[t+1]}"
        style="width: 26px; height: 26px"
      >${n(`star`)}</button>`).join(``)}
          </div>
          <span
            class="sp-text sp-context"
            data-part="readout"
            data-value="0"
            role="status"
            style="width: 76px; text-align: right"
          >Not rated</span>
        </div>
      </div>
    </div>
  `;let o=e(a,`stars`),s=e(a,`readout`),c=Array.from({length:r},(t,n)=>e(a,`star-${n+1}`)),l=0,u=0,d=()=>{let e=u||l;c.forEach((n,r)=>{let i=r<e;t(n,`data-filled`,i),n.setAttribute(`aria-checked`,String(r+1===l)),n.style.color=i?`var(--sp-accent)`:``,n.querySelector(`svg`)?.classList.toggle(`sp-icon--filled`,i)}),s.dataset.value=String(l),s.textContent=i[l]??`Not rated`},f=e=>{l=e,d()};c.forEach((e,t)=>{e.addEventListener(`click`,()=>f(t+1)),e.addEventListener(`pointerover`,()=>{u=t+1,d()})}),o.addEventListener(`pointerleave`,()=>{u=0,d()}),o.addEventListener(`keydown`,e=>{let t=e.key===`ArrowRight`||e.key===`ArrowUp`?1:e.key===`ArrowLeft`||e.key===`ArrowDown`?-1:0;t!==0&&(e.preventDefault(),f(Math.min(r,Math.max(0,l+t))))}),d()}export{a as mount};