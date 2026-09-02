import{n as e}from"./parts.C-YLuC7Q.js";var t=[{key:`news`,label:`News`,order:1,col:1,row:1},{key:`films`,label:`Films`,order:2,col:3,row:1,rows:2},{key:`music`,label:`Music`,order:3,col:1,row:3},{key:`live`,label:`Live`,order:4,col:2,row:1},{key:`games`,label:`Games`,order:5,col:1,row:2},{key:`kids`,label:`Kids`,order:6,col:2,row:3},{key:`store`,label:`Store`,order:7,col:3,row:3}],n={ArrowRight:{dir:`right`},ArrowLeft:{dir:`left`},ArrowUp:{dir:`up`},ArrowDown:{dir:`down`}},r={right:(e,t)=>t.left>=e.right-4,left:(e,t)=>t.right<=e.left+4,down:(e,t)=>t.top>=e.bottom-4,up:(e,t)=>t.bottom<=e.top+4},i={right:(e,t)=>t.bottom>e.top+4&&t.top<e.bottom-4,left:(e,t)=>t.bottom>e.top+4&&t.top<e.bottom-4,down:(e,t)=>t.right>e.left+4&&t.left<e.right-4,up:(e,t)=>t.right>e.left+4&&t.left<e.right-4},a={right:(e,t)=>t.left-e.right+o(e.top,e.bottom,t.top,t.bottom),left:(e,t)=>e.left-t.right+o(e.top,e.bottom,t.top,t.bottom),down:(e,t)=>t.top-e.bottom+o(e.left,e.right,t.left,t.right),up:(e,t)=>e.top-t.bottom+o(e.left,e.right,t.left,t.right)};function o(e,t,n,r){return Math.max(0,n-t,e-r)}var s={none:`Seven cards, and the number on each is its place in the source. Press an arrow and watch which card the ring goes to.`,diverge:`Direction and sequence disagree here: the ring went to the nearest card that way, not to the next one in the source.`,agree:`Here the two happen to agree, which is exactly why the disagreements above survive a tab-through and reach the television.`};function c(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <span class="sp-label sp-context" style="display: block">Channels</span>

        <div class="sp-grid" data-part="grid" role="grid" aria-label="Channels" tabindex="0"
             style="margin-top: 10px; position: relative; grid-template-columns: repeat(3, 1fr);
                    grid-auto-rows: 44px; gap: 8px">
          ${t.map(({key:e,label:t,order:n,col:r,row:i,rows:a})=>`
    <div class="sp-surface" data-part="tile-${e}" data-order="${n}"
         style="grid-column: ${r}; grid-row: ${i} / span ${a??1}; position: relative;
                display: flex; align-items: center; justify-content: center;
                background: var(--sp-sunken)">
      <span style="font-size: 12px; font-weight: 500">${t}</span>
      <span class="sp-label sp-context"
            style="position: absolute; top: 3px; left: 5px; font-size: 9px; line-height: 1">${n}</span>
    </div>`).join(``)}
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-agree="none"
           style="margin: 9px 0 0; height: 32px; font-size: 11px; line-height: 1.35">${s.none}</p>
      </div>
    </div>
  `;let c=e(o,`caption`),l=t.map(t=>e(o,`tile-${t.key}`)),u=e=>({left:e.offsetLeft,right:e.offsetLeft+e.offsetWidth,top:e.offsetTop,bottom:e.offsetTop+e.offsetHeight}),d=0,f=(e,n)=>{let r=t[d],i=t[e],a=l[e],o=l[d];if(!r||!i||!a||!o||(o.removeAttribute(`data-sim-focus`),o.removeAttribute(`data-subject`),a.setAttribute(`data-sim-focus`,``),a.setAttribute(`data-subject`,``),d=e,!n))return;let u=n===`ArrowRight`||n===`ArrowDown`?1:-1,f=t[t.indexOf(r)+u]?.order===i.order;c.dataset.at=i.key,c.dataset.agree=f?`yes`:`no`,c.textContent=f?s.agree:s.diverge},p=e=>{let t=n[e]?.dir,o=l[d];if(!t||!o)return;let s=u(o),c=l.map((e,t)=>({index:t,box:u(e)})).filter(({index:e,box:n})=>e!==d&&r[t](s,n)),p=c.filter(({box:e})=>i[t](s,e)),m=p.length>0?p:c;if(m.length===0)return;let h=m.reduce((e,n)=>a[t](s,n.box)<a[t](s,e.box)?n:e);f(h.index,e)};o.addEventListener(`keydown`,e=>{e.key in n&&(p(e.key),e.preventDefault())}),f(0)}export{c as mount};