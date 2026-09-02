import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import{t as n}from"./motion.B5_YXmsy.js";var r=620;function i(i,a){let o=(e,t,n)=>`
    <div
      data-part="face-${e}"
      class="sp-surface sp-stack"
      style="position: absolute; inset: 0; gap: 8px; padding: 14px; backface-visibility: hidden; ${t}"
    >${n}</div>`;i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 316px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Membership card</span>
        </div>
        <div style="perspective: 900px; height: 150px; margin-top: 12px">
          <div
            data-part="card"
            data-subject
            data-face="front"
            data-state="settled"
            style="position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transform: rotateY(0deg)"
          >
            ${o(`front`,`border: 0; background: var(--sp-accent); color: var(--sp-accent-ink); justify-content: space-between`,`<span class="sp-row sp-row--between">
                 <span style="font-size: 13px; font-weight: 600">Harbour Library</span>
                 ${t(`star`,`sp-icon--filled`)}
               </span>
               <span class="sp-stack" style="gap: 4px">
                 <span style="font-size: 18px; font-weight: 600; letter-spacing: 0.06em">4417 2098</span>
                 <span style="font-size: 12px; opacity: 0.86">Rana Kaur</span>
               </span>`)}
            ${o(`back`,`transform: rotateY(180deg); justify-content: center`,`<span class="sp-row sp-row--between" style="font-size: 13px"><span>Issued</span><span>4 Mar 2024</span></span>
               <span class="sp-row sp-row--between" style="font-size: 13px"><span>Branch</span><span>Quayside</span></span>
               <span class="sp-row sp-row--between" style="font-size: 13px"><span>Loans</span><span>3 of 12</span></span>`)}
          </div>
        </div>
        <div class="sp-row sp-context" style="gap: 6px; margin-top: 12px">
          <button class="sp-button sp-button--sm" type="button" data-part="show-back">Show back</button>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="show-front">Show front</button>
        </div>
      </div>
    </div>
  `;let s=e(i,`card`),c=e(i,`face-front`),l=e(i,`face-back`),u,d=e=>{if(s.dataset.face===e)return;a.clearTimeout(u);for(let e of s.getAnimations())e.cancel();let t=s.style.transform,o=e===`back`?180:0;if(s.style.transform=`rotateY(${o}deg)`,s.dataset.face=e,c.style.pointerEvents=e===`front`?``:`none`,l.style.pointerEvents=e===`back`?``:`none`,n(i)){s.dataset.state=`settled`;return}s.dataset.state=`flipping`,s.animate([{transform:t},{transform:`rotateY(${o}deg)`}],{duration:r,easing:`cubic-bezier(0.3, 0.8, 0.3, 1)`}),u=a.setTimeout(()=>{s.dataset.state=`settled`},680)};l.style.pointerEvents=`none`,e(i,`show-back`).addEventListener(`click`,()=>d(`back`)),e(i,`show-front`).addEventListener(`click`,()=>d(`front`))}export{i as mount};