import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{n}from"./measure.DK7AY2_i.js";var r=`he ferry leaves the quay at six, long before the town is properly awake, and by the time the light comes up the harbour is a thin grey line astern. Passengers who make the crossing every week take the same seats without discussing it, and the crew gave up counting them aboard somewhere in the first winter of the service.`,i={none:{css:`float: none; font-size: inherit; line-height: inherit; margin: 0`,read:`no initial: the first letter is ordinary text`},drop:{css:`float: left; font-size: 68px; line-height: 57px; margin: 1px 8px 0 0`,read:`drop cap: the foot lands three lines down`},raised:{css:`float: left; font-size: 46px; line-height: 19.5px; margin: 0 6px 0 0`,read:`raised cap: the foot stands on the first baseline`}},a=e=>e in i,o=26,s=148;function c(c){let l=`display: inline-block; width: 0; height: 0`;c.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Opening letter" data-term="raised" data-part="segmented" data-value="raised">
            <button class="sp-segment" data-part="seg-none" value="none">none</button>
            <button class="sp-segment" data-part="seg-drop" value="drop">drop</button>
            <button class="sp-segment" data-part="seg-raised" value="raised">raised</button>
          </sp-segmented>
        </div>
        <div data-part="page" style="position: relative; height: ${s}px; padding-top: ${o}px; margin-top: 8px">
          <span data-part="guide" aria-hidden="true"
                style="position: absolute; left: 0; right: 0; height: 3px; opacity: 0.5; background: var(--sp-ink)"></span>
          <div class="sp-prose" style="position: relative; max-width: none">
            <p data-part="opening" style="margin: 0"><span
              data-part="cap" data-subject data-mode="raised" data-raised data-pose="[data-raised]"
              style="${i.raised.css}">T<span data-part="cap-foot" aria-hidden="true" style="${l}"></span></span><span
              data-part="line-tick" aria-hidden="true" style="${l}"></span><span class="sp-context">${r}</span></p>
          </div>
        </div>
        <span class="sp-text" data-stage-verdict data-part="readout">${i.raised.read}</span>
      </div>
    </div>
  `;let u=e(c,`page`),d=e(c,`cap`),f=e(c,`guide`),p=e(c,`readout`),m=t=>{let r=n(e(c,t),u);return r.top+r.height},h=m(`line-tick`),g=m(`cap-foot`),_=`${Math.round((h-g)*10)/10}px`;f.style.top=`${Math.round(h)-1}px`,d.style.marginTop=_,e(c,`segmented`).addEventListener(`change`,e=>{let n=e.detail;a(n)&&(d.dataset.mode=n,t(d,`data-raised`,n===`raised`),d.style.cssText=i[n].css,n===`raised`&&(d.style.marginTop=_),p.textContent=i[n].read)})}export{c as mount};