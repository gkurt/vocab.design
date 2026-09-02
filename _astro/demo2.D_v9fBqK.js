import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={none:0,three:3,six:6},n=2,r=8,i=10,a={none:`Both cards cost eight cups. The welcome card just does not start the reader at nothing.`,three:`Three cups bought. Five to go on either card, and the welcome card reads half filled.`,six:`Six cups bought. Two to go on either card, and the welcome card is at eight of ten.`},o=[`width: 18px`,`height: 18px`,`border-radius: 50%`,`border: 2px dashed var(--sp-line)`,`background: transparent`,`transition: background-color 0.3s var(--sp-ease), border-color 0.3s var(--sp-ease)`].join(`; `),s=(e,t)=>Array.from({length:t},(t,n)=>`<span data-slot="${e}" data-i="${n}" style="${o}"></span>`).join(``);function c(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 214px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Kestrel Coffee</span>
          <span class="sp-label" style="font-size: 11px">Loyalty</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">

          <div style="display: flex; align-items: stretch; gap: 10px; flex: 0 0 auto">

            <div class="sp-surface sp-context" data-part="plain" data-filled="0"
                 style="flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; gap: 8px; padding: 10px">
              <div class="sp-row sp-row--between" style="height: 18px">
                <span class="sp-heading" style="font-size: 12px">Plain card</span>
                <span class="sp-text" data-part="plain-count" style="font-size: 11px">0 of ${r}</span>
              </div>
              <div class="sp-grid" style="grid-template-columns: repeat(5, 18px); gap: 7px">${s(`plain`,r)}</div>
              <span class="sp-label" style="height: 12px; font-size: 10px">One stamp per cup</span>
            </div>

            <div class="sp-surface" data-part="endowed" data-subject data-filled="2"
                 style="flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; gap: 8px; padding: 10px">
              <div class="sp-row sp-row--between" style="height: 18px">
                <span class="sp-heading" style="font-size: 12px">Welcome card</span>
                <span class="sp-text sp-text--ink" data-part="endowed-count" style="font-size: 11px">${n} of ${i}</span>
              </div>
              <div class="sp-grid" style="grid-template-columns: repeat(5, 18px); gap: 7px">${s(`endowed`,i)}</div>
              <span class="sp-label" style="height: 12px; font-size: 10px">The first two stamps are on us</span>
            </div>

          </div>

          <div class="sp-surface sp-context sp-row" data-part="remaining" data-left="8"
               style="flex: 0 0 auto; height: 30px; justify-content: center; padding: 0 10px">
            <span class="sp-text sp-text--ink" data-part="remaining-text" style="font-size: 12px">8 more cups on either card</span>
          </div>

        </div>
      </div>
              <span class="sp-text" data-stage-verdict data-part="note" style="width: 264px; height: 34px; font-size: 11px">${a.none}</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-axis="Cups" data-part="pick" data-value="none">
          <button class="sp-segment" data-part="pick-none" value="none" style="padding: 5px 9px; font-size: 12px">0 bought</button>
          <button class="sp-segment" data-part="pick-three" value="three" style="padding: 5px 9px; font-size: 12px">3 bought</button>
          <button class="sp-segment" data-part="pick-six" value="six" style="padding: 5px 9px; font-size: 12px">6 bought</button>
        </sp-segmented>
      
    </div>
  `;let c=e(o,`plain`),l=e(o,`endowed`),u=e(o,`plain-count`),d=e(o,`endowed-count`),f=e(o,`remaining`),p=e(o,`remaining-text`),m=e(o,`note`),h=e=>[...o.querySelectorAll(`[data-slot="${e}"]`)],g=(e,t)=>{if(e.dataset.state=t,t===`earned`){e.style.background=`var(--sp-accent)`,e.style.borderColor=`var(--sp-accent)`,e.style.borderStyle=`solid`;return}if(t===`given`){e.style.background=`radial-gradient(circle at center, var(--sp-accent) 0 3.5px, var(--sp-accent-soft) 3.5px)`,e.style.borderColor=`var(--sp-accent)`,e.style.borderStyle=`solid`;return}e.style.background=`transparent`,e.style.borderColor=`var(--sp-line)`,e.style.borderStyle=`dashed`},_=e=>{let o=t[e];h(`plain`).forEach((e,t)=>{g(e,t<o?`earned`:`empty`)}),h(`endowed`).forEach((e,t)=>{g(e,t<n?`given`:t<n+o?`earned`:`empty`)});let s=r-o;c.dataset.filled=String(o),l.dataset.filled=String(n+o),u.textContent=`${o} of ${r}`,d.textContent=`${n+o} of ${i}`,f.dataset.left=String(s),p.textContent=s===1?`1 more cup on either card`:`${s} more cups on either card`,m.textContent=a[e]};e(o,`pick`).addEventListener(`change`,e=>{_(e.detail)}),_(`none`)}export{c as mount};