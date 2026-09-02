import{n as e}from"./parts.C-YLuC7Q.js";import{i as t,n}from"./measure.DK7AY2_i.js";var r=`<svg class="sp-icon" viewBox="0 0 24 24" aria-hidden="true">
  <path d="M10.6 13.4a3.4 3.4 0 0 0 5 .4l2.5-2.5a3.4 3.4 0 0 0-4.8-4.8l-1.4 1.4"/>
  <path d="M13.4 10.6a3.4 3.4 0 0 0-5-.4l-2.5 2.5a3.4 3.4 0 0 0 4.8 4.8l1.4-1.4"/>
</svg>`,i=`The tide was out by six and the mud flats ran the length of the harbour wall. Two boats lay on their sides near the slipway, and a heron worked the channel until the light failed. The wind held off the water all afternoon.`.split(` `),a=(e,t,n)=>Math.max(t,Math.min(n,e)),o=(e,t,n,r)=>`
  <button class="sp-icon-button" type="button" data-part="${e}" aria-pressed="false" aria-label="${t}"
    style="width: 28px; height: 28px; font: inherit; font-size: 14px; ${r}">${n}</button>`;function s(s){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 252px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Draft: field notes</span>
          <span class="sp-label" style="font-size: 12px">Saved</span>
        </div>

        <div class="sp-body">
          <div class="sp-surface" data-part="page" style="position: relative; height: 100%; padding: 14px 16px; overflow: hidden">
            <span class="sp-heading sp-context" style="display: block; font-size: 13px">Notes on the east basin</span>
            <p
              class="sp-prose sp-context"
              data-part="prose"
              style="margin: 8px 0 0; --sp-measure: 100%; font-size: 13px; line-height: 1.5"
            >${i.map((e,t)=>`<span data-part="w-${t}" style="border-radius: 3px">${e}</span>`).join(` `)}</p>

            <div data-part="away" style="position: absolute; left: 0; right: 0; bottom: 0; height: 56px"></div>

            <div
              class="sp-row sp-surface"
              data-part="bar"
              data-subject
              data-place="above"
              style="position: absolute; left: 0; top: 0; gap: 4px; padding: 4px; box-shadow: var(--sp-shadow);
                     opacity: 0; visibility: hidden; translate: 0 3px;
                     transition: opacity 0.14s, visibility 0.14s, translate 0.14s var(--sp-ease)"
            >
              ${o(`btn-bold`,`Bold`,`B`,`font-weight: 700`)}
              ${o(`btn-italic`,`Italic`,`I`,`font-style: italic`)}
              <button class="sp-icon-button" type="button" data-part="btn-link" aria-pressed="false" aria-label="Link" style="width: 28px; height: 28px">${r}</button>
              <button class="sp-button sp-button--quiet sp-button--sm" type="button" data-part="btn-clear" style="padding: 5px 8px; font-size: 12px">Clear</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let c=e(s,`page`),l=e(s,`bar`),u=i.map((t,n)=>e(s,`w-${n}`)),d={bold:e(s,`btn-bold`),italic:e(s,`btn-italic`),link:e(s,`btn-link`)},f=t(l),p=f.width,m=f.height,h=-1,g=-1,_=!1,v=(e,t)=>{let n=0,r=1/0;return u.forEach((i,a)=>{let o=i.getBoundingClientRect(),s=Math.max(o.left-e,0,e-o.right),c=Math.max(o.top-t,0,t-o.bottom)*4+s;c<r&&(r=c,n=a)}),n},y=()=>{if(h<0||g<0)return[];let e=Math.min(h,g),t=Math.max(h,g);return u.slice(e,t+1)},b=()=>{let e=new Set(y());for(let t of u)t.style.background=e.has(t)?`var(--sp-accent-soft)`:`transparent`},x=()=>{let e=y()[0];d.bold.setAttribute(`aria-pressed`,String(e?.dataset.bold===`on`)),d.italic.setAttribute(`aria-pressed`,String(e?.dataset.italic===`on`)),d.link.setAttribute(`aria-pressed`,String(e?.dataset.linked===`on`))},S=()=>{l.removeAttribute(`data-open`),l.style.opacity=`0`,l.style.visibility=`hidden`,l.style.translate=`0 3px`},C=()=>{let e=y();if(e.length===0)return S();let t=e.map(e=>n(e,c)),r=Math.min(...t.map(e=>e.left)),i=Math.max(...t.map(e=>e.left+e.width)),o=Math.min(...t.map(e=>e.top)),s=Math.max(...t.map(e=>e.top+e.height)),u=o-m-8,d=u<4;l.dataset.place=d?`below`:`above`,l.style.top=`${d?s+8:u}px`,l.style.left=`${a((r+i)/2-p/2,4,c.offsetWidth-p-4)}px`,l.setAttribute(`data-open`,``),l.style.opacity=`1`,l.style.visibility=`visible`,l.style.translate=`0 0`};c.addEventListener(`pointerdown`,e=>{let t=e;if(!t.target?.closest(`[data-part=bar]`)){if(t.target?.closest(`[data-part=away]`)){h=-1,g=-1,b(),S();return}S(),h=v(t.clientX,t.clientY),g=h,_=!0,t.isTrusted&&c.setPointerCapture(t.pointerId),b()}}),c.addEventListener(`pointermove`,e=>{if(!_)return;let t=e,n=v(t.clientX,t.clientY);n!==g&&(g=n,b())});let w=e=>{if(!_)return;_=!1;let t=e;g=v(t.clientX,t.clientY),b(),x(),C()};c.addEventListener(`pointerup`,w),c.addEventListener(`pointercancel`,w);let T=(e,t)=>{for(let n of y())t?n.dataset[e]=`on`:delete n.dataset[e],e===`bold`&&(n.style.fontWeight=t?`650`:``),e===`italic`&&(n.style.fontStyle=t?`italic`:``),e===`linked`&&(n.style.textDecoration=t?`underline`:``,n.style.textUnderlineOffset=t?`2px`:``);x()};d.bold.addEventListener(`click`,()=>T(`bold`,!0)),d.italic.addEventListener(`click`,()=>T(`italic`,!0)),d.link.addEventListener(`click`,()=>T(`linked`,!0)),e(s,`btn-clear`).addEventListener(`click`,()=>{T(`bold`,!1),T(`italic`,!1),T(`linked`,!1)}),b(),S()}export{s as mount};